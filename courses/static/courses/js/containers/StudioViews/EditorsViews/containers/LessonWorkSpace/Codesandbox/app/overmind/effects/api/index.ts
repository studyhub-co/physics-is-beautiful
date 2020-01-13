import { Sandbox } from '../../../../common/types'
import { SandboxAPIResponse } from './types'
import { transformSandbox } from '../utils/sandbox'

import { camelizeKeys, decamelizeKeys } from 'humps'
import apiFactory, { Api, ApiConfig } from './apiFactory';

import { API_PREFIX } from '../../../../../../../../../../actions/studio'

let api: Api;

export default {
  initialize(config: ApiConfig) {
    api = apiFactory(config);
  },
  async getSandbox(id: string): Promise<Sandbox> {
      // const sandbox = await api.get<SandboxAPIResponse>(`/sandboxes/${id}`);

    // Mock for sandbox from server
      const sandbox = JSON.parse(JSON.stringify({"data":
          {
            "version":66,
            "user_liked":false,
            "git":null,
            "external_resources":[],
            "npm_dependencies":{"react-dom":"16.0.0","react":"16.0.0"},
            "is_sse":false,
            "team":null,
            "entry":"src/index.js",
            "updated_at":"2019-05-28T11:33:39",
            "original_git":null,
            "author":null,
            "screenshot_url":"https://screenshots.codesandbox.io/new.png",
            "view_count":4020046,
            "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
            "picks":[],
            "like_count":1226,
            "template":"create-react-app",
            "description":null,
            "privacy":0,
            "preview_secret":null,
            "fork_count":0,
            "custom_template":null,
            "forked_template":null,
            "is_frozen":false,
            "owned":false,
            "room_id":null,
            "id":"new",
            "modules":[{
              "updated_at":"2019-05-28T11:33:39",
              "title":"package.json",
              "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
              "shortid":"ZGQK6",
              "is_binary":false,
              "inserted_at":"2018-02-07T14:00:44",
              "id":"dd3f0f6a-4555-457f-b2af-963bf00f9172",
              "directory_shortid":null,
              "code":"{\n  \"name\": \"new\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"keywords\": [],\n  \"main\": \"src/index.js\",\n  \"dependencies\": {\n    \"react\": \"16.8.6\",\n    \"react-dom\": \"16.8.6\",\n    \"react-scripts\": \"3.0.1\"\n  },\n  \"devDependencies\": {\n    \"typescript\": \"3.3.3\"\n  },\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test --env=jsdom\",\n    \"eject\": \"react-scripts eject\"\n  },\n  \"browserslist\": [\">0.2%\", \"not dead\", \"not ie <= 11\", \"not op_mini all\"]\n}\n"
            },
              {"updated_at":"2018-06-09T22:04:48",
                "title":"index.js",
                "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"wRo98","is_binary":false,
                "inserted_at":"2017-04-01T14:30:32",
                "id":"928871a1-bbdc-425c-ace2-0b302b14a58a",
                "directory_shortid":"GXOoy",
                "code":"import React from \"react\";\nimport ReactDOM from \"react-dom\";\n\nimport \"./styles.css\";\n\nfunction App() {\n  return (\n    <div className=\"App\">\n      <h1>Hello CodeSandbox</h1>\n      <h2>Start editing to see some magic happen!</h2>\n    </div>\n  );\n}\n\nconst rootElement = document.getElementById(\"root\");\nReactDOM.render(<App />, rootElement);\n"},{"updated_at":"2018-06-09T22:03:25","title":"styles.css","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"qZyB7","is_binary":false,"inserted_at":"2018-06-09T21:51:56","id":"9224aee8-b579-4f68-8a8c-e647098f50cc","directory_shortid":"GXOoy","code":".App {\n  font-family: sans-serif;\n  text-align: center;\n}\n"},{"updated_at":"2018-02-07T14:06:13","title":"index.html","source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f","shortid":"BA1N","is_binary":false,"inserted_at":"2017-04-08T15:19:04","id":"9c54d8d0-5a0e-4e5f-8794-3092757733ee","directory_shortid":"rgkK4","code":"<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\t<meta name=\"theme-color\" content=\"#000000\">\n\t<!--\n      manifest.json provides metadata used when your web app is added to the\n      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n    -->\n\t<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">\n\t<link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n\t<!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n\t<title>React App</title>\n</head>\n\n<body>\n\t<noscript>\n\t\tYou need to enable JavaScript to run this app.\n\t</noscript>\n\t<div id=\"root\"></div>\n\t<!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n</body>\n\n</html>"}
                ],
            "directories":[
              {"updated_at":"2018-02-07T14:00:49",
              "title":"src",
              "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
              "shortid":"GXOoy",
              "inserted_at":"2018-02-07T14:00:49",
              "id":"d27aefca-c15c-41a1-b9d5-bd362fdd7f19",
              "directory_shortid":null},
              {"updated_at":"2018-02-07T14:04:34","title":"public",
              "source_id":"6bd39aa7-9800-45fb-9487-c915634d8d4f",
              "shortid":"rgkK4",
              "inserted_at":"2018-02-07T14:04:34",
              "id":"859f77fe-8e09-4efb-bd44-f66ea4f949e4",
              "directory_shortid":null}],
            "collection":false,
            "title":null,
            "original_git_commit_sha":null,
            "tags":[],
            "alias":null,
            "forked_from_sandbox":null}})
      )['data']

      // We need to add client side properties for tracking
      return transformSandbox(camelizeKeys(sandbox));
    },

  async forkSandbox(id: string, body?: unknown): Promise<Sandbox> {
    // const url = id.includes('/')
    //   ? `/sandboxes/fork/${id}`
    //   : `/sandboxes/${id}/fork`;

    // console.trace();

    const url = `/studio/material-problem-type/${id}/fork/`;

    const sandbox = await api.post<SandboxAPIResponse>(url, body || {});
    return transformSandbox(sandbox);
  },

};