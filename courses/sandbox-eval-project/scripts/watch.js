/* eslint-disable */

let chalk = require('chalk');
let fs = require('fs');
let path = require('path');
let filesize = require('filesize');
let gzipSize = require('gzip-size').sync;
let rimrafSync = require('rimraf').sync;
let webpack = require('webpack');
let config = require('../config/webpack.dev');
let paths = require('../config/paths');
let recursive = require('recursive-readdir');
let stripAnsi = require('strip-ansi');

// Input: /User/dan/app/build/static/js/main.82be8.js
// Output: /static/js/main.js
function removeFileNameHash(fileName) {
  return fileName
    .replace(paths.appBuild, '')
    .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}

// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel(currentSize, previousSize) {
  let FIFTY_KILOBYTES = 1024 * 50;
  let difference = currentSize - previousSize;
  let fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red(`+${fileSize}`);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow(`+${fileSize}`);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  } else {
    return '';
  }
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
recursive(paths.appBuild, (err, fileNames) => {
  let previousSizeMap = (fileNames || [])
    .filter(fileName => /\.(js|css)$/.test(fileName))
    .reduce((memo, fileName) => {
      let contents = fs.readFileSync(fileName);
      let key = removeFileNameHash(fileName);
      memo[key] = gzipSize(contents);
      return memo;
    }, {});

  // Remove all content but keep the directory so that
  // if you're in it, you don't end up in Trash
  rimrafSync(`${paths.appBuild}/*`);

  // Start the webpack build
  build(previousSizeMap);
});

// Print a detailed summary of build files.
function printFileSizes(stats, previousSizeMap) {
  let assets = stats
    .toJson()
    .assets.filter(asset => /\.(js|css)$/.test(asset.name))
    .map(asset => {
      try {
        let fileContents = fs.readFileSync(`${paths.appBuild}/${asset.name}`);
        let size = gzipSize(fileContents);
        let previousSize = previousSizeMap[removeFileNameHash(asset.name)];
        let difference = getDifferenceLabel(size, previousSize);
        return {
          folder: path.join('build', path.dirname(asset.name)),
          name: path.basename(asset.name),
          size,
          sizeLabel: filesize(size) + (difference ? ` (${difference})` : ''),
        };
      } catch (e) {
        return {
          folder: path.join('build', path.dirname(asset.name)),
          name: path.basename(asset.name),
          error: e,
        };
      }
    });
  assets.sort((a, b) => b.size - a.size);
  let longestSizeLabelLength = Math.max.apply(
    null,
    assets.map(a => (a.error ? 'ERROR'.length : stripAnsi(a.sizeLabel).length))
  );
  assets.forEach(asset => {
    let sizeLabel = asset.sizeLabel;
    let sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      let rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }

    if (asset.error) {
      console.log(
        `  ERROR  ${chalk.dim(asset.folder + path.sep)}${chalk.cyan(
          asset.name
        )}`
      );
    } else {
      console.log(
        `  ${sizeLabel}  ${chalk.dim(asset.folder + path.sep)}${chalk.cyan(
          asset.name
        )}`
      );
    }
  });
}

// Create the production build and print the deployment instructions.
function build(previousSizeMap) {
  console.log(
    `Creating a ${
      process.env.NODE_ENV === 'production' ? 'production' : 'development'
    } build...`
  );
  let compiler = webpack(config);
  const start = Date.now();
  compiler.watch({}, (err, stats) => {
     if (err) {
    console.error(err);
    return;
  }

  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }));
  });
}
