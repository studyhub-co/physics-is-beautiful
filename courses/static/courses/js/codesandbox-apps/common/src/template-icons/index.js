import React, { useMemo } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
var SVGIcon = _ref => {
  var {
    scale = 1,
    width = 32,
    height = 32,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["scale", "width", "height", "children"]);

  return React.createElement("svg", _extends({
    width: scale * width,
    height: scale * height,
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), children);
};

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}
var AdonisIcon = _ref => {
  var props = _extends$1({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M28 32H4C1.7909 32 0 30.2091 0 28V4C0 1.7909 1.7909 0 4 0H28C30.2091 0 32 1.7909 32 4V28C32 30.2091 30.2091 32 28 32Z",
    fill: "#241651"
  }), React.createElement("path", {
    d: "M28 26.6663H6.6664L17.333 5.33301L28 26.6663ZM8.8241 25.3333H25.8423L17.333 8.31471L8.8241 25.3333Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 6.6667L20 22.6667H4",
    fill: "white"
  }));
};
var AdonisIconDark = _ref2 => {
  var props = _extends$1({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.8734 7.06324L9.61961 0.555557L0 19.7948H6.50764L4.50359 23.8029H27.5618L16.0327 0.744736L12.8734 7.06324ZM7.50406 19.7948H19.2392L13.3717 8.05967L15.9015 3L25.8029 22.8029H6.00001L7.50406 19.7948Z",
    fill: "black"
  }));
};
var AdonisIconLight = _ref3 => {
  var props = _extends$1({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.8734 7.06324L9.61961 0.555557L0 19.7948H6.50764L4.50359 23.8029H27.5618L16.0327 0.744736L12.8734 7.06324ZM7.50406 19.7948H19.2392L13.3717 8.05967L15.9015 3L25.8029 22.8029H6.00001L7.50406 19.7948Z",
    fill: "white"
  }));
};

function _extends$2() {
  _extends$2 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$2.apply(this, arguments);
}
var AngularIcon = _ref => {
  var props = _extends$2({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16 3.84003L4.08321 8.08963L5.90081 23.8464L16 29.44L26.0992 23.8464L27.9168 8.08963L16 3.84003Z",
    fill: "#DD0031"
  }), React.createElement("path", {
    d: "M16 3.84003V6.68163V6.66883V19.6352V29.44L26.0992 23.8464L27.9168 8.08963L16 3.84003Z",
    fill: "#C3002F"
  }), React.createElement("path", {
    d: "M16 6.66882L8.5504 23.3728H11.328L12.8256 19.6352H19.1488L20.6464 23.3728H23.424L16 6.66882ZM18.176 17.3312H13.824L16 12.096L18.176 17.3312Z",
    fill: "white"
  }));
};
var AngularIconDark = _ref2 => {
  var props = _extends$2({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.9168 2.8288V0L23.8336 4.2496L22.016 20.0064L11.9168 25.6V15.7952H15.0656L16.5632 19.5328H19.3408L11.9168 2.8288ZM11.9168 13.4912V8.256L14.0928 13.4912H11.9168Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.9168 2.8288V0L0 4.2496L1.8176 20.0064L11.9168 25.6V15.7952H8.74239L7.24479 19.5328H4.46719L11.9168 2.8288ZM11.9168 8.25601V8.256L9.74079 13.4912H11.9168V8.25601Z",
    fill: "black",
    fillOpacity: "0.6"
  }));
};
var AngularIconLight = _ref3 => {
  var props = _extends$2({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.9168 2.8288V0L23.8336 4.2496L22.016 20.0064L11.9168 25.6V15.7952H15.0656L16.5632 19.5328H19.3408L11.9168 2.8288ZM11.9168 13.4912V8.256L14.0928 13.4912H11.9168Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.9168 2.8288V0L0 4.2496L1.8176 20.0064L11.9168 25.6V15.7952H8.74239L7.24479 19.5328H4.46719L11.9168 2.8288ZM11.9168 8.25601V8.256L9.74079 13.4912H11.9168V8.25601Z",
    fill: "white",
    fillOpacity: "0.6"
  }));
};

/* Template icons use <linearGradient/>, <radialGradient/>, <filter/>,
 * <clipPath/> and potentially other svg definitions which require
 * a global identifier that is referenced through `"url(#defId)"`
 *
 * We need a unique global identifier to avoid name collision when
 * an icon is rendered more than once.
 * https://github.com/codesandbox/codesandbox-templates/issues/4
 */

var counter = 0;
/** Renerate a unique identifier on every mount of a component
 *
 * That is achieved by the useMemo's second argument [] which says, execute
 * the function and return new value on every mount
 */

var useUniqueId = () => useMemo(() => ++counter, []);

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$3.apply(this, arguments);
}
var ApolloIcon = _ref => {
  var props = _extends$3({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z",
    fill: "#0F2B49"
  }), React.createElement("path", {
    d: "M19.2731 21.1308H22.0792L17.5996 9.505H14.497L10.0174 21.1308H12.8237L13.5558 19.1615H17.7884L17.0222 16.9824H14.2353L16.0482 11.98L19.2731 21.1308ZM28.5266 12.5234C28.4268 12.1643 28.0559 11.9533 27.6953 12.0535C27.336 12.1533 27.1255 12.5254 27.2253 12.8846C27.5069 13.8987 27.6496 14.9469 27.6496 16.0001C27.6496 22.4237 22.4236 27.6495 16 27.6495C9.5764 27.6495 4.3505 22.4237 4.3505 16C4.3505 9.5763 9.5764 4.3504 16 4.3504C18.7211 4.3504 21.3542 5.3171 23.4323 7.0373C23.3515 7.2303 23.3065 7.442 23.3065 7.6642C23.3065 8.5615 24.0339 9.2889 24.9313 9.2889C25.8285 9.2889 26.556 8.5615 26.556 7.6642C26.556 6.7669 25.8286 6.0395 24.9313 6.0395C24.7585 6.0395 24.5922 6.067 24.436 6.117C22.096 4.1229 19.099 3 16 3C8.8318 3 3 8.8318 3 16C3 23.1682 8.8318 29 16 29C23.1682 29 29 23.1682 29 16C29 14.8248 28.8408 13.6549 28.5266 12.5234Z",
    fill: "white"
  }));
};
var ApolloIconLight = _ref2 => {
  var props = _extends$3({}, _ref2);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#clip_".concat(id, ")")
  }, React.createElement("path", {
    d: "M17.5248 19.5256H20.5468L15.7226 7.00535H12.3813L7.55707 19.5256H10.5793L11.3677 17.4048H15.9259L15.1008 15.058H12.0995L14.0519 9.67083L17.5248 19.5256ZM27.4902 10.2559C27.3828 9.86917 26.9834 9.64199 26.595 9.74984C26.2081 9.85724 25.9814 10.258 26.0888 10.6449C26.3921 11.737 26.5457 12.8658 26.5457 14.0001C26.5457 20.9178 20.9177 26.5456 13.9999 26.5456C7.08216 26.5456 1.45425 20.9178 1.45425 14.0001C1.45425 7.08217 7.08216 1.45426 13.9999 1.45426C16.9304 1.45426 19.766 2.49529 22.0039 4.34789C21.9169 4.55571 21.8685 4.78375 21.8685 5.02307C21.8685 5.9894 22.6519 6.77275 23.6182 6.77275C24.5845 6.77275 25.3679 5.9894 25.3679 5.02307C25.3679 4.05674 24.5845 3.27339 23.6182 3.27339C23.4322 3.27339 23.2531 3.30303 23.0849 3.35684C20.5649 1.20926 17.3373 0 13.9999 0C6.28033 0 -0.00012207 6.28034 -0.00012207 14.0001C-0.00012207 21.7197 6.28033 28 13.9999 28C21.7196 28 28 21.7197 28 14.0001C28 12.7344 27.8286 11.4746 27.4902 10.2559Z",
    fill: "white"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "clip_".concat(id)
  }, React.createElement("rect", {
    width: "28",
    height: "28",
    fill: "white"
  }))));
};
var ApolloIconDark = _ref3 => {
  var props = _extends$3({}, _ref3);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#clip_".concat(id, ")")
  }, React.createElement("path", {
    d: "M17.5248 19.5256H20.5468L15.7226 7.00535H12.3813L7.55707 19.5256H10.5793L11.3677 17.4048H15.9259L15.1008 15.058H12.0995L14.0519 9.67083L17.5248 19.5256ZM27.4902 10.2559C27.3828 9.86917 26.9834 9.64199 26.595 9.74984C26.2081 9.85724 25.9814 10.258 26.0888 10.6449C26.3921 11.737 26.5457 12.8658 26.5457 14.0001C26.5457 20.9178 20.9177 26.5456 13.9999 26.5456C7.08216 26.5456 1.45425 20.9178 1.45425 14.0001C1.45425 7.08217 7.08216 1.45426 13.9999 1.45426C16.9304 1.45426 19.766 2.49529 22.0039 4.34789C21.9169 4.55571 21.8685 4.78375 21.8685 5.02307C21.8685 5.9894 22.6519 6.77275 23.6182 6.77275C24.5845 6.77275 25.3679 5.9894 25.3679 5.02307C25.3679 4.05674 24.5845 3.27339 23.6182 3.27339C23.4322 3.27339 23.2531 3.30303 23.0849 3.35684C20.5649 1.20926 17.3373 0 13.9999 0C6.28033 0 -0.00012207 6.28034 -0.00012207 14.0001C-0.00012207 21.7197 6.28033 28 13.9999 28C21.7196 28 28 21.7197 28 14.0001C28 12.7344 27.8286 11.4746 27.4902 10.2559Z",
    fill: "black"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "clip_".concat(id)
  }, React.createElement("rect", {
    width: "28",
    height: "28",
    fill: "white"
  }))));
};

function _extends$4() {
  _extends$4 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$4.apply(this, arguments);
}
var AureliaIcon = _ref => {
  var props = _extends$4({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M20.8856 5.75526L17.9255 7.73085L14.8761 3.16098L17.8362 1.18539L20.8856 5.75526Z",
    fill: "url(#Aurelia_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M23.2921 19.4841L28.3497 27.0629L22.3249 31.0835L17.2674 23.5046L16.385 22.1826L22.4099 18.162L23.2921 19.4841Z",
    fill: "url(#Aurelia_Paint1_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M15.7038 24.5479L16.8173 26.2165L12.2315 29.2768L10.2356 26.2861L11.2375 25.6175L14.8215 23.2258L15.7038 24.5479Z",
    fill: "url(#Aurelia_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M25.7976 15.9013L27.0838 15.0429L29.0796 18.0337L26.1192 20.0092L25.0056 18.3407L26.6798 17.2234L25.7976 15.9013ZM25.0056 18.3407L24.1234 17.0185L25.7976 15.9013L26.6798 17.2234L25.0056 18.3407Z",
    fill: "url(#Aurelia_Paint3_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M5.03971 16.33L4.03798 16.9986L0.98834 12.4287L5.57414 9.36847L7.71174 12.5718L4.12779 14.9635L7.71174 12.5718L8.62378 13.9385L5.03971 16.33Z",
    fill: "url(#Aurelia_Paint4_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M16.2121 8.87448L10.1872 12.8951L9.27531 11.5284L4.26505 4.02056L10.29 -3.05176e-05L15.3002 7.50781L16.2121 8.87448Z",
    fill: "url(#Aurelia_Paint5_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M19.5998 6.61389L17.9256 7.73103L17.0136 6.36448L14.876 3.16116L17.8364 1.18558L20.8861 5.75544L19.5998 6.61389Z",
    fill: "url(#Aurelia_Paint6_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M12.1198 26.9397L11.2375 25.6175L14.8215 23.2258L15.7038 24.5479L12.1198 26.9397Z",
    fill: "#714896"
  }), React.createElement("path", {
    d: "M25.0056 18.3407L24.1234 17.0185L25.7976 15.9013L26.6798 17.2234L25.0056 18.3407Z",
    fill: "#6F4795"
  }), React.createElement("path", {
    d: "M5.03971 16.33L4.12779 14.9635L7.71174 12.5717L8.62378 13.9384L5.03971 16.33Z",
    fill: "#88519F"
  }), React.createElement("path", {
    d: "M17.9256 7.731L17.0136 6.36444L18.6879 5.24718L19.5998 6.61385L17.9256 7.731Z",
    fill: "#85509E"
  }), React.createElement("path", {
    d: "M23.2921 19.4841L17.2674 23.5046L16.385 22.1826L22.4099 18.162L23.2921 19.4841Z",
    fill: "#8D166A"
  }), React.createElement("path", {
    d: "M15.3002 7.50781L16.2121 8.87449L10.1872 12.8951L9.27531 11.5284L15.3002 7.50781Z",
    fill: "#A70D6F"
  }), React.createElement("path", {
    d: "M3.33087 6.41579L4.46806 8.11989L2.76396 9.25707L1.62677 7.55297L3.33087 6.41579Z",
    fill: "#9E61AD"
  }), React.createElement("path", {
    d: "M9.47203 26.8447L10.6092 28.5488L8.90512 29.686L7.76794 27.9819L9.47203 26.8447Z",
    fill: "#8053A3"
  }), React.createElement("path", {
    d: "M4.98907 28.5609L4.76837e-06 21.0239L26.6621 3.19113L31.8937 10.6078L4.98907 28.5609Z",
    fill: "url(#Aurelia_Paint7_Linear_".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Aurelia_Paint0_Linear_".concat(id),
    x1: "-8.44944",
    y1: "-6.25533",
    x2: "31.5107",
    y2: "22.1375",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#C06FBB"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#6E4D9B"
  })), React.createElement("linearGradient", {
    id: "Aurelia_Paint1_Linear_".concat(id),
    x1: "25.1127",
    y1: "28.4365",
    x2: "2.94525",
    y2: "4.40661",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#6E4D9B"
  }), React.createElement("stop", {
    offset: "0.14",
    stopColor: "#77327A"
  }), React.createElement("stop", {
    offset: "0.29",
    stopColor: "#B31777"
  }), React.createElement("stop", {
    offset: "0.84",
    stopColor: "#CD0F7E"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#ED2C89"
  })), React.createElement("linearGradient", {
    id: "Aurelia_Paint2_Linear_".concat(id),
    x1: "-5.04782",
    y1: "-18.7438",
    x2: "22.9903",
    y2: "31.4743",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#C06FBB"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#6E4D9B"
  })), React.createElement("linearGradient", {
    id: "Aurelia_Paint3_Linear_".concat(id),
    x1: "-16.576",
    y1: "-8.14625",
    x2: "29.2528",
    y2: "29.2176",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#C06FBB"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#6E4D9B"
  })), React.createElement("linearGradient", {
    id: "Aurelia_Paint4_Linear_".concat(id),
    x1: "-9.7085",
    y1: "-8.25145",
    x2: "32.9166",
    y2: "29.3871",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#C06FBB"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#6E4D9B"
  })), React.createElement("linearGradient", {
    id: "Aurelia_Paint5_Linear_".concat(id),
    x1: "27.094",
    y1: "29.0225",
    x2: "4.87304",
    y2: "4.84826",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#6E4D9B"
  }), React.createElement("stop", {
    offset: "0.14",
    stopColor: "#77327A"
  }), React.createElement("stop", {
    offset: "0.29",
    stopColor: "#B31777"
  }), React.createElement("stop", {
    offset: "0.84",
    stopColor: "#CD0F7E"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#ED2C89"
  })), React.createElement("linearGradient", {
    id: "Aurelia_Paint6_Linear_".concat(id),
    x1: "-8.44865",
    y1: "-7.89477",
    x2: "32.1246",
    y2: "26.8809",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#C06FBB"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#6E4D9B"
  })), React.createElement("linearGradient", {
    id: "Aurelia_Paint7_Linear_".concat(id),
    x1: "3.66889",
    y1: "25.9358",
    x2: "23.0417",
    y2: "1.65607",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#6E4D9B"
  }), React.createElement("stop", {
    offset: "0.14",
    stopColor: "#77327A"
  }), React.createElement("stop", {
    offset: "0.53",
    stopColor: "#B31777"
  }), React.createElement("stop", {
    offset: "0.79",
    stopColor: "#CD0F7E"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#ED2C89"
  }))));
};
var AureliaIconDark = _ref2 => {
  var props = _extends$4({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.169 8.30349L9.53175 12.0654L3.99063 3.76189L9.62788 0L15.169 8.30349ZM3.77815 15.9049L8.06889 13.0416L5.21548 8.76569L0.924744 11.629L3.77815 15.9049ZM27.2085 16.8733L25.3412 14.075L22.5712 15.9235L24.4386 18.7218L27.2085 16.8733ZM26.5256 25.3216L20.968 16.9934L15.3307 20.7553L20.8885 29.0835L26.5256 25.3216ZM13.8679 21.7314L15.7352 24.5297L11.4445 27.3931L9.57703 24.5948L13.8679 21.7314ZM16.7722 7.23361L19.5422 5.38514L16.6888 1.10931L13.9188 2.95778L16.7722 7.23361ZM3.11654 6.00299L4.18056 7.59744L2.58611 8.66146L1.52209 7.06701L3.11654 6.00299ZM8.86258 25.1174L9.92659 26.7119L8.33214 27.7759L7.26813 26.1814L8.86258 25.1174ZM4.66805 26.7232L0 19.6712L24.9466 2.98584L29.8415 9.92534L4.66805 26.7232Z",
    fill: "black"
  }));
};
var AureliaIconLight = _ref3 => {
  var props = _extends$4({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.169 8.30349L9.53175 12.0654L3.99063 3.76189L9.62788 0L15.169 8.30349ZM3.77815 15.9049L8.06889 13.0416L5.21548 8.76569L0.924744 11.629L3.77815 15.9049ZM27.2085 16.8733L25.3412 14.075L22.5712 15.9235L24.4386 18.7218L27.2085 16.8733ZM26.5256 25.3216L20.968 16.9934L15.3307 20.7553L20.8885 29.0835L26.5256 25.3216ZM13.8679 21.7314L15.7352 24.5297L11.4445 27.3931L9.57703 24.5948L13.8679 21.7314ZM16.7722 7.23361L19.5422 5.38514L16.6888 1.10931L13.9188 2.95778L16.7722 7.23361ZM3.11654 6.00299L4.18056 7.59744L2.58611 8.66146L1.52209 7.06701L3.11654 6.00299ZM8.86258 25.1174L9.92659 26.7119L8.33214 27.7759L7.26813 26.1814L8.86258 25.1174ZM4.66805 26.7232L0 19.6712L24.9466 2.98584L29.8415 9.92534L4.66805 26.7232Z",
    fill: "white"
  }));
};

function _extends$5() {
  _extends$5 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$5.apply(this, arguments);
}
var CordovaIcon = _ref => {
  var props = _extends$5({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M26.9987 27.2005L24.8997 31.5855L23.4543 26.1252L26.9987 27.2005Z",
    fill: "#7F8082"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.67126 27.2005L9.10034 31.5855L10.5457 26.1252L7.67126 27.2005Z",
    fill: "#7F8082"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.00106 12.7051L1 12.7067L3.97898 31.5855H9.10034L8.68195 27.2005H11.3096L11.6443 31.5855H22.3724L22.7071 27.2005H25.3181L24.8997 31.5855H30.0544L33 12.7067L32.9989 12.7051H1.00107H1.00106Z",
    fill: "url(#Cordova_Paint0_Linear_".concat(id, ")"),
    stroke: "#D6D6D6",
    strokeWidth: "0.1",
    strokeLinejoin: "round"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.321 24.3105L9.8614 18.5391L9.75309 6.8824L6.86423 12.7051L8.321 24.3105Z",
    fill: "url(#Cordova_Paint1_Ladial_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19.3835 5.74055H25.7673L25.6362 19.8505H18.8912L19.3835 5.74055Z",
    fill: "#293441"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.7658 5.74934L8.54779 5.75318L8.69511 19.8002H15.0258L14.7658 5.74934Z",
    fill: "#293441"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.19137 18.5391L8.32104 24.3106H25.7297L24.6949 18.5803L9.19137 18.5391Z",
    fill: "#2D3948"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M25.7298 24.3106L24.218 18.5802L24.2748 6.84549L27.1996 12.7048L25.7298 24.3106Z",
    fill: "url(#Cordova_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.33428 24.3106L9.8614 18.5391L9.75309 6.8824L6.8644 12.7048L8.33428 24.3106Z",
    fill: "url(#Cordova_Paint3_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.1132 9.0016L14.688 21.2551H19.1654L19.8867 9.0016H14.1132Z",
    fill: "#2D3B48"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M32.9989 12.7051L25.6813 1H8.28396L1.00107 12.7051H6.86444L9.73752 6.90509H14.4616L14.1132 9.0016H19.8867L19.5815 6.84156H24.287L27.1996 12.7051H32.9989Z",
    fill: "url(#Cordova_Paint4_Linear_".concat(id, ")"),
    stroke: "#D6D6D6",
    strokeWidth: "0.1",
    strokeLinejoin: "round"
  }), React.createElement("path", {
    opacity: "0.449",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19.5815 6.84157L24.327 6.8455L27.1996 12.7051L25.7297 24.3106L14.688 24.3106L20.3953 12.7051L19.5815 6.84157Z",
    fill: "#363F49"
  }), React.createElement("path", {
    opacity: "0.3",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20.3953 12.7051L14.688 24.3106L8.321 24.3105L6.86423 12.7051H20.3953Z",
    fill: "url(#Cordova_Paint5_Linear_".concat(id, ")")
  }), React.createElement("path", {
    opacity: "0.2",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.73752 6.90509H14.4616L14.1132 9.0016H19.8867L20.3953 12.7051H6.86423L9.73752 6.90509Z",
    fill: "url(#Cordova_Paint6_Linear_".concat(id, ")")
  }), React.createElement("g", {
    opacity: "0.8",
    filter: "url(#filter0_f_".concat(id, ")")
  }, React.createElement("path", {
    d: "M21.748 20.5026C22.1968 20.5026 22.5607 19.2126 22.5607 17.6212C22.5607 16.0299 22.1968 14.7398 21.748 14.7398C21.2991 14.7398 20.9353 16.0299 20.9353 17.6212C20.9353 19.2126 21.2991 20.5026 21.748 20.5026Z",
    fill: "#05F0FF"
  })), React.createElement("g", {
    opacity: "0.9",
    filter: "url(#filter1_f_".concat(id, ")")
  }, React.createElement("path", {
    d: "M21.748 20.2149C22.0968 20.2149 22.3796 19.0728 22.3796 17.6638C22.3796 16.2549 22.0968 15.1127 21.748 15.1127C21.3991 15.1127 21.1163 16.2549 21.1163 17.6638C21.1163 19.0728 21.3991 20.2149 21.748 20.2149Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M21.748 20.2149C22.0968 20.2149 22.3796 19.0728 22.3796 17.6638C22.3796 16.2549 22.0968 15.1127 21.748 15.1127C21.3991 15.1127 21.1163 16.2549 21.1163 17.6638C21.1163 19.0728 21.3991 20.2149 21.748 20.2149Z",
    stroke: "#06EFFE",
    strokeWidth: "0.917749",
    strokeLinecap: "round"
  })), React.createElement("g", {
    opacity: "0.9",
    filter: "url(#filter2_f_".concat(id, ")")
  }, React.createElement("path", {
    d: "M21.748 20.0301C22.0968 20.0301 22.3796 18.9739 22.3796 17.6709C22.3796 16.368 22.0968 15.3118 21.748 15.3118C21.3991 15.3118 21.1163 16.368 21.1163 17.6709C21.1163 18.9739 21.3991 20.0301 21.748 20.0301Z",
    fill: "#FEFFFF"
  }), React.createElement("path", {
    d: "M21.748 20.0301C22.0968 20.0301 22.3796 18.9739 22.3796 17.6709C22.3796 16.368 22.0968 15.3118 21.748 15.3118C21.3991 15.3118 21.1163 16.368 21.1163 17.6709C21.1163 18.9739 21.3991 20.0301 21.748 20.0301Z",
    stroke: "#06EFFE",
    strokeWidth: "0.954358",
    strokeLinecap: "round"
  })), React.createElement("g", {
    opacity: "0.8",
    filter: "url(#filter3_f_".concat(id, ")")
  }, React.createElement("path", {
    d: "M12.5549 20.9093C13.0037 20.9093 13.3676 19.6192 13.3676 18.0279C13.3676 16.4365 13.0037 15.1465 12.5549 15.1465C12.106 15.1465 11.7422 16.4365 11.7422 18.0279C11.7422 19.6192 12.106 20.9093 12.5549 20.9093Z",
    fill: "#05F0FF"
  })), React.createElement("g", {
    opacity: "0.9",
    filter: "url(#filter4_f_".concat(id, ")")
  }, React.createElement("path", {
    d: "M12.5549 20.6216C12.9037 20.6216 13.1865 19.4794 13.1865 18.0705C13.1865 16.6615 12.9037 15.5194 12.5549 15.5194C12.206 15.5194 11.9232 16.6615 11.9232 18.0705C11.9232 19.4794 12.206 20.6216 12.5549 20.6216Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M12.5549 20.6216C12.9037 20.6216 13.1865 19.4794 13.1865 18.0705C13.1865 16.6615 12.9037 15.5194 12.5549 15.5194C12.206 15.5194 11.9232 16.6615 11.9232 18.0705C11.9232 19.4794 12.206 20.6216 12.5549 20.6216Z",
    stroke: "#06EFFE",
    strokeWidth: "0.917749",
    strokeLinecap: "round"
  })), React.createElement("g", {
    opacity: "0.9",
    filter: "url(#filter5_f_".concat(id, ")")
  }, React.createElement("path", {
    d: "M12.5549 20.4367C12.9037 20.4367 13.1865 19.3805 13.1865 18.0776C13.1865 16.7747 12.9037 15.7184 12.5549 15.7184C12.206 15.7184 11.9232 16.7747 11.9232 18.0776C11.9232 19.3805 12.206 20.4367 12.5549 20.4367Z",
    fill: "#FEFFFF"
  }), React.createElement("path", {
    d: "M12.5549 20.4367C12.9037 20.4367 13.1865 19.3805 13.1865 18.0776C13.1865 16.7747 12.9037 15.7184 12.5549 15.7184C12.206 15.7184 11.9232 16.7747 11.9232 18.0776C11.9232 19.3805 12.206 20.4367 12.5549 20.4367Z",
    stroke: "#06EFFE",
    strokeWidth: "0.954358",
    strokeLinecap: "round"
  })), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.73752 6.9051H14.4616L14.1132 9.0016H19.8867L19.5815 6.84157L24.327 6.8455L27.1996 12.7051L25.7298 24.3106L8.321 24.3105L6.86423 12.7052L9.73752 6.9051Z",
    stroke: "#D6D6D6",
    strokeWidth: "0.1",
    strokeLinejoin: "round"
  }), React.createElement("g", {
    opacity: "0.343"
  }, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M27.1517 12.7051H6.85004Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M27.1517 12.7051H6.85004",
    stroke: "white",
    strokeWidth: "0.1"
  })), React.createElement("defs", null, React.createElement("filter", {
    id: "filter0_f_".concat(id),
    x: "16.35",
    y: "10.1545",
    width: "10.796",
    height: "14.9334",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), React.createElement("feGaussianBlur", {
    stdDeviation: "2.29265",
    result: "effect1_foregroundBlur"
  })), React.createElement("filter", {
    id: "filter1_f_".concat(id),
    x: "18.4148",
    y: "12.373",
    width: "6.66627",
    height: "10.5816",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), React.createElement("feGaussianBlur", {
    stdDeviation: "1.1101",
    result: "effect1_foregroundBlur"
  })), React.createElement("filter", {
    id: "filter2_f_".concat(id),
    x: "18.3956",
    y: "12.592",
    width: "6.70467",
    height: "10.1578",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), React.createElement("feGaussianBlur", {
    stdDeviation: "1.1101",
    result: "effect1_foregroundBlur"
  })), React.createElement("filter", {
    id: "filter3_f_".concat(id),
    x: "7.15687",
    y: "10.5612",
    width: "10.796",
    height: "14.9334",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), React.createElement("feGaussianBlur", {
    stdDeviation: "2.29265",
    result: "effect1_foregroundBlur"
  })), React.createElement("filter", {
    id: "filter4_f_".concat(id),
    x: "9.22173",
    y: "12.7797",
    width: "6.66627",
    height: "10.5816",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), React.createElement("feGaussianBlur", {
    stdDeviation: "1.1101",
    result: "effect1_foregroundBlur"
  })), React.createElement("filter", {
    id: "filter5_f_".concat(id),
    x: "9.20252",
    y: "12.9987",
    width: "6.70467",
    height: "10.1578",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), React.createElement("feGaussianBlur", {
    stdDeviation: "1.1101",
    result: "effect1_foregroundBlur"
  })), React.createElement("linearGradient", {
    id: "Cordova_Paint0_Linear_".concat(id),
    x1: "29.785",
    y1: "31.0194",
    x2: "1.02308",
    y2: "12.489",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#ACACAC"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#E9E9E9"
  })), React.createElement("radialGradient", {
    id: "Cordova_Paint1_Ladial_".concat(id),
    cx: "0",
    cy: "0",
    r: "1",
    gradientUnits: "userSpaceOnUse",
    gradientTransform: "translate(8.41501 23.834) rotate(-85.4139) scale(17.0431 8.73272)"
  }, React.createElement("stop", {
    stopColor: "#25303B"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#25303B",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Cordova_Paint2_Linear_".concat(id),
    x1: "25.7298",
    y1: "23.7018",
    x2: "24.3138",
    y2: "6.88238",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#24303A"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#394958"
  })), React.createElement("linearGradient", {
    id: "Cordova_Paint3_Linear_".concat(id),
    x1: "8.33428",
    y1: "23.7018",
    x2: "9.75027",
    y2: "6.88238",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#24303A"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#394958"
  })), React.createElement("linearGradient", {
    id: "Cordova_Paint4_Linear_".concat(id),
    x1: "28.0683",
    y1: "5.16446",
    x2: "4.37751",
    y2: "7.54103",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#E5E5E5"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "white"
  })), React.createElement("linearGradient", {
    id: "Cordova_Paint5_Linear_".concat(id),
    x1: "12.5608",
    y1: "12.7051",
    x2: "12.5608",
    y2: "24.3106",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "white"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "white",
    stopOpacity: "0.531707"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "white",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Cordova_Paint6_Linear_".concat(id),
    x1: "13.6297",
    y1: "12.7051",
    x2: "13.6297",
    y2: "6.90509",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "white"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "white",
    stopOpacity: "0"
  }))));
};
var CordovaIconLight = _ref2 => {
  var props = _extends$5({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M22.8248 2.84375L28.9991 12.72L29 12.7213L26.5146 28.6502H22.1653L22.5184 24.9504H20.3153L20.033 28.6502H10.9811L10.6987 24.9504H8.48164L8.83466 28.6502H4.51352L2 12.7213L2.0009 12.72L8.14584 2.84375H22.8248ZM6.94812 12.72L7.17097 12.72L7.0625 12.9386L8.29762 22.6907L8.29154 22.731H22.9801L24.2204 12.9386L24.1112 12.72L24.1059 12.72L21.6484 7.77257H17.6782L17.9356 9.5951H13.0643L13.3582 7.82617H9.37228L6.94812 12.72ZM12.4341 17.9315C12.9863 17.9315 13.434 16.9678 13.434 15.779C13.434 14.5902 12.9863 13.6265 12.4341 13.6265C11.8817 13.6265 11.434 14.5902 11.434 15.779C11.434 16.9678 11.8817 17.9315 12.4341 17.9315ZM21.0277 15.779C21.0277 16.9678 20.5801 17.9315 20.0277 17.9315C19.4755 17.9315 19.0277 16.9678 19.0277 15.779C19.0277 14.5902 19.4755 13.6265 20.0277 13.6265C20.5801 13.6265 21.0277 14.5902 21.0277 15.779Z",
    fill: "white"
  }));
};
var CordovaIconDark = _ref3 => {
  var props = _extends$5({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M22.8248 2.84375L28.9991 12.72L29 12.7213L26.5146 28.6502H22.1653L22.5184 24.9504H20.3153L20.033 28.6502H10.9811L10.6987 24.9504H8.48164L8.83466 28.6502H4.51352L2 12.7213L2.0009 12.72L8.14584 2.84375H22.8248ZM6.94812 12.72L7.17097 12.72L7.0625 12.9386L8.29762 22.6907L8.29154 22.731H22.9801L24.2204 12.9386L24.1112 12.72L24.1059 12.72L21.6484 7.77257H17.6782L17.9356 9.5951H13.0643L13.3582 7.82617H9.37228L6.94812 12.72ZM12.4341 17.9315C12.9863 17.9315 13.434 16.9678 13.434 15.779C13.434 14.5902 12.9863 13.6265 12.4341 13.6265C11.8817 13.6265 11.434 14.5902 11.434 15.779C11.434 16.9678 11.8817 17.9315 12.4341 17.9315ZM21.0277 15.779C21.0277 16.9678 20.5801 17.9315 20.0277 17.9315C19.4755 17.9315 19.0277 16.9678 19.0277 15.779C19.0277 14.5902 19.4755 13.6265 20.0277 13.6265C20.5801 13.6265 21.0277 14.5902 21.0277 15.779Z",
    fill: "black"
  }));
};

function _extends$6() {
  _extends$6 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$6.apply(this, arguments);
}
var CxJSIcon = _ref => {
  var props = _extends$6({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M9.81333 10.8444H3.59111L6.72 16.2489L9.81333 10.8444Z",
    fill: "url(#CxJS_Paint0_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.2933 10.8444H16.0711L19.1644 16.2489L22.2933 10.8444Z",
    fill: "url(#CxJS_Paint1_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M3.59111 10.8444L0.462219 16.2489H6.72L3.59111 10.8444Z",
    fill: "url(#CxJS_Paint2_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.2933 10.8444L19.1645 16.2489H25.4222L22.2933 10.8444Z",
    fill: "url(#CxJS_Paint3_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M12.9422 5.44H6.72001L9.81334 10.8444L12.9422 5.44Z",
    fill: "url(#CxJS_Paint4_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M31.6444 5.44H25.4222L28.5511 10.8444L31.6444 5.44Z",
    fill: "url(#CxJS_Paint5_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M6.72 5.44L3.59111 10.8444H9.81333L6.72 5.44Z",
    fill: "url(#CxJS_Paint6_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M12.9422 5.44L9.81332 10.8444H16.0711L12.9422 5.44Z",
    fill: "url(#CxJS_Paint7_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M19.1644 5.44L16.0711 10.8444H22.2933L19.1644 5.44Z",
    fill: "url(#CxJS_Paint8_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.2933 10.8444H28.5511L25.4222 16.2489L22.2933 10.8444Z",
    fill: "url(#CxJS_Paint9_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M25.4222 5.44L28.5511 10.8444H22.2933L25.4222 5.44Z",
    fill: "url(#CxJS_Paint10_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.2933 21.6533H16.0711L19.1644 16.2489L22.2933 21.6533Z",
    fill: "url(#CxJS_Paint11_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.2933 21.6533L19.1645 16.2489H25.4222L22.2933 21.6533Z",
    fill: "url(#CxJS_Paint12_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M19.1644 27.0578L16.0711 21.6533H22.2933L19.1644 27.0578Z",
    fill: "url(#CxJS_Paint13_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.2933 21.6533H28.5511L25.4222 16.2489L22.2933 21.6533Z",
    fill: "url(#CxJS_Paint14_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M25.4222 27.0578L28.5511 21.6533H22.2933L25.4222 27.0578Z",
    fill: "url(#CxJS_Paint15_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M0.462219 16.2489L3.59111 21.6533L6.72 16.2489H0.462219Z",
    fill: "url(#CxJS_Paint16_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M3.59111 21.6533H9.81333L6.72 16.2489L3.59111 21.6533Z",
    fill: "url(#CxJS_Paint17_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M3.59111 21.6533L6.72 27.0578L9.81333 21.6533H3.59111Z",
    fill: "url(#CxJS_Paint18_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M9.81332 21.6533L12.9422 27.0578L16.0711 21.6533H9.81332Z",
    fill: "url(#CxJS_Paint19_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M6.72001 27.0578H12.9422L9.81334 21.6533L6.72001 27.0578Z",
    fill: "url(#CxJS_Paint20_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M25.4222 27.0578H31.6444L28.5511 21.6533L25.4222 27.0578Z",
    fill: "url(#CxJS_Paint21_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M12.9323 5.44001L16.0612 10.8445L19.1545 5.44001L12.9323 5.44001Z",
    fill: "url(#CxJS_Paint22_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M12.933 27.05L16.0619 21.6455L19.1552 27.05H12.933Z",
    fill: "url(#CxJS_Paint23_Linear_".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "CxJS_Paint0_lLnear_".concat(id),
    x1: "3.59182",
    y1: "13.5395",
    x2: "9.82791",
    y2: "13.5395",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#8AB1D5"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#70A3CD"
  }), React.createElement("stop", {
    offset: "0.685",
    stopColor: "#5798C6"
  }), React.createElement("stop", {
    offset: "0.871",
    stopColor: "#3F90C1"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#358DBF"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint1_lLnear_".concat(id),
    x1: "16.064",
    y1: "13.5395",
    x2: "22.3001",
    y2: "13.5395",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#D171AD"
  }), React.createElement("stop", {
    offset: "0.417",
    stopColor: "#CE60A1"
  }), React.createElement("stop", {
    offset: "0.506",
    stopColor: "#CD5B9F"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B83D8A"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint2_lLnear_".concat(id),
    x1: "0.473597",
    y1: "13.5395",
    x2: "6.71004",
    y2: "13.5395",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#84A4C2"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#6892B6"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#2F75A0"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint3_lLnear_".concat(id),
    x1: "24.6958",
    y1: "13.4819",
    x2: "18.3374",
    y2: "13.9203",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#D171AD"
  }), React.createElement("stop", {
    offset: "0.417",
    stopColor: "#CE60A1"
  }), React.createElement("stop", {
    offset: "0.506",
    stopColor: "#CD5B9F"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B83D8A"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint4_lLnear_".concat(id),
    x1: "6.71005",
    y1: "8.13903",
    x2: "12.9461",
    y2: "8.13903",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#8FCCD5"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#5BBAC7"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#00AAB9"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint5_lLnear_".concat(id),
    x1: "25.4183",
    y1: "8.13903",
    x2: "31.6544",
    y2: "8.13903",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#832F75"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#BB87BC"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint6_lLnear_".concat(id),
    x1: "3.59182",
    y1: "8.13903",
    x2: "9.82791",
    y2: "8.13903",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#77B2C6"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#349AB4"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#0089A6"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint7_lLnear_".concat(id),
    x1: "9.8279",
    y1: "8.13903",
    x2: "16.064",
    y2: "8.13903",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#B1DAE0"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#82C7D1"
  }), React.createElement("stop", {
    offset: "0.578",
    stopColor: "#7AC4CF"
  }), React.createElement("stop", {
    offset: "0.827",
    stopColor: "#64BCC9"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#5BBAC7"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint8_lLnear_".concat(id),
    x1: "16.064",
    y1: "8.13903",
    x2: "22.3001",
    y2: "8.13903",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#AC2F92"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#D970AC"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint9_lLnear_".concat(id),
    x1: "25.4183",
    y1: "15.3643",
    x2: "25.4183",
    y2: "11.0887",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.011",
    stopColor: "#BB6CAC"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#973A87"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint10_Linear_".concat(id),
    x1: "22.3001",
    y1: "8.13903",
    x2: "28.5362",
    y2: "8.13903",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#973A87"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#BB6CAC"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint11_Linear_".concat(id),
    x1: "16.064",
    y1: "18.9404",
    x2: "22.3001",
    y2: "18.9404",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#D171AD"
  }), React.createElement("stop", {
    offset: "0.417",
    stopColor: "#CE60A1"
  }), React.createElement("stop", {
    offset: "0.506",
    stopColor: "#CD5B9F"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B83D8A"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint12_Linear_".concat(id),
    x1: "19.6089",
    y1: "18.9404",
    x2: "23.568",
    y2: "18.9404",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#D171AD"
  }), React.createElement("stop", {
    offset: "0.417",
    stopColor: "#CE60A1"
  }), React.createElement("stop", {
    offset: "0.506",
    stopColor: "#CD5B9F"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B83D8A"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint13_Linear_".concat(id),
    x1: "16.064",
    y1: "24.341",
    x2: "22.3001",
    y2: "24.341",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#AC2F92"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#D970AC"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint14_Linear_".concat(id),
    x1: "22.3001",
    y1: "18.9404",
    x2: "28.5362",
    y2: "18.9404",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#973A87"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#BB6CAC"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint15_Linear_".concat(id),
    x1: "22.3001",
    y1: "24.341",
    x2: "28.5362",
    y2: "24.341",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#973A87"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#BB6CAC"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint16_Linear_".concat(id),
    x1: "0.473597",
    y1: "18.9404",
    x2: "6.71004",
    y2: "18.9404",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#5080B1"
  }), React.createElement("stop", {
    offset: "0.143",
    stopColor: "#477BAE"
  }), React.createElement("stop", {
    offset: "0.38",
    stopColor: "#2A6FA5"
  }), React.createElement("stop", {
    offset: "0.584",
    stopColor: "#00639B"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#004E8C"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint17_Linear_".concat(id),
    x1: "3.59182",
    y1: "18.9404",
    x2: "9.82791",
    y2: "18.9404",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#84A4C2"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#6892B6"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#2F75A0"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint18_Linear_".concat(id),
    x1: "3.59182",
    y1: "24.341",
    x2: "9.82791",
    y2: "24.341",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#77B2C6"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#349AB4"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#0089A6"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint19_Linear_".concat(id),
    x1: "9.8279",
    y1: "24.341",
    x2: "16.064",
    y2: "24.341",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#B1DAE0"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#82C7D1"
  }), React.createElement("stop", {
    offset: "0.578",
    stopColor: "#7AC4CF"
  }), React.createElement("stop", {
    offset: "0.827",
    stopColor: "#64BCC9"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#5BBAC7"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint20_Linear_".concat(id),
    x1: "6.71005",
    y1: "24.341",
    x2: "12.9461",
    y2: "24.341",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#8FCCD5"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#5BBAC7"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#00AAB9"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint21_Linear_".concat(id),
    x1: "25.4183",
    y1: "24.341",
    x2: "31.6544",
    y2: "24.341",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#832F75"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#BB87BC"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint22_Linear_".concat(id),
    x1: "19.1616",
    y1: "8.14543",
    x2: "12.9255",
    y2: "8.14543",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#AC2F92"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#D970AC"
  })), React.createElement("linearGradient", {
    id: "CxJS_Paint23_Linear_".concat(id),
    x1: "19.1623",
    y1: "24.3623",
    x2: "12.9262",
    y2: "24.3623",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#AC2F92"
  }), React.createElement("stop", {
    offset: "0.989",
    stopColor: "#D970AC"
  }))));
};
var CxJSIconDark = _ref2 => {
  var props = _extends$6({}, _ref2);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#clip_".concat(id, ")")
  }, React.createElement("path", {
    d: "M5.81984 0H11.6066L14.5165 5.02623H8.69669L5.81984 10.0524L8.69669 15.0787H14.5165L11.6066 20.1049H5.81984L0 10.0524L5.81984 0Z",
    fill: "black",
    fillOpacity: "0.4"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.5973 0L14.5073 5.02622L17.3841 0H11.5973ZM23.2132 0H29L26.1232 5.02621L23.2132 10.0524L26.1232 15.0787H20.3033L17.3934 20.1049L14.5165 15.0787L17.3934 10.0524L14.5165 5.02621L17.3934 0L20.3033 5.02621L23.2132 0ZM14.5079 15.0714L11.598 20.0976H17.3848L14.5079 15.0714ZM26.1232 15.0787L29 20.1049H23.2132L20.3033 15.0787H26.1232Z",
    fill: "black"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "clip_".concat(id)
  }, React.createElement("rect", {
    width: "29",
    height: "21",
    fill: "white"
  }))));
};
var CxJSIconLight = _ref3 => {
  var props = _extends$6({}, _ref3);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#clip_".concat(id, ")")
  }, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11 0L13.91 5.02622L16.7868 0H11ZM22.6159 0H28.4027L25.5259 5.02621L22.6159 10.0524L25.5259 15.0787H19.706L16.7961 20.1049L13.9192 15.0787L16.7961 10.0524L13.9192 5.02621L16.7961 0L19.706 5.02621L22.6159 0ZM13.9106 15.0714L11.0007 20.0976H16.7875L13.9106 15.0714ZM25.5259 15.0787L28.4027 20.1049H22.6159L19.706 15.0787H25.5259Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M4.81984 0H10.6066L13.5165 5.02623H7.69669L4.81984 10.0524L7.69669 15.0787H13.5165L10.6066 20.1049H4.81984L-1 10.0524L4.81984 0Z",
    fill: "white",
    fillOpacity: "0.4"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "clip_".concat(id)
  }, React.createElement("rect", {
    width: "29",
    height: "21",
    fill: "white"
  }))));
};

function _extends$7() {
  _extends$7 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$7.apply(this, arguments);
}
var CycleJSIcon = _ref => {
  var props = _extends$7({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M31.995 24.79C31.98 25.115 31.89 25.435 31.725 25.725L28.695 30.975C28.33 31.61 27.655 32 26.925 32H10.11C9.38 32 8.705 31.61 8.34 30.98L0.275 17.025C0.09 16.705 0 16.355 0 16C0 15.645 0.07 15.275 0.285 14.915L8.345 1.02C8.71 0.39 9.385 0 10.11 0H26.925C27.655 0 28.33 0.39 28.695 1.02C28.695 1.02 31.61 5.795 31.82 6.135C32.03 6.475 31.995 6.905 31.995 7.255C31.995 7.555 31.91 7.965 31.83 8.29C31.75 8.615 29.31 18.505 29.31 18.505L23.985 7.18H13.07L7.96 16L13.07 24.82H23.98L31.995 24.79Z",
    fill: "url(#CycleJS_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M28.105 15.995L31.805 23.84C32.09 24.445 32.06 25.15 31.725 25.73L23.985 24.825L28.105 15.995Z",
    fill: "url(#CycleJS_Paint1_Linear_".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "CycleJS_Paint0_Linear_".concat(id),
    x1: "9.33814",
    y1: "31.8692",
    x2: "27.6747",
    y2: "0.114831",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.4147",
    stopColor: "#51D3D9"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#C8FF8C"
  })), React.createElement("linearGradient", {
    id: "CycleJS_Paint1_Linear_".concat(id),
    x1: "26.7193",
    y1: "26.3984",
    x2: "32.9073",
    y2: "19.1344",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.4147",
    stopColor: "#51D3D9"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#5A919B"
  }))));
};
var CycleJSIconLight = _ref2 => {
  var props = _extends$7({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M24.9961 19.3672C24.9844 19.6211 24.9141 19.8711 24.7852 20.0977L22.418 24.1992C22.1328 24.6953 21.6055 25 21.0352 25H7.89844C7.32812 25 6.80078 24.6953 6.51562 24.2031L0.214844 13.3008C0.0703125 13.0508 0 12.7773 0 12.5C0 12.2227 0.0546875 11.9336 0.222656 11.6523L6.51953 0.796875C6.80469 0.304688 7.33203 0 7.89844 0H21.0352C21.6055 0 22.1328 0.304688 22.418 0.796875C22.418 0.796875 24.6953 4.52734 24.8594 4.79297C25.0234 5.05859 24.9961 5.39453 24.9961 5.66797C24.9961 5.90234 24.9297 6.22266 24.8672 6.47656C24.8047 6.73047 22.8984 14.457 22.8984 14.457L18.7383 5.60938H10.2109L6.21875 12.5L10.2109 19.3906H18.7344L24.9961 19.3672Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M21.957 12.4961L24.8477 18.625C25.0703 19.0976 25.0469 19.6484 24.7852 20.1015L18.7383 19.3945L21.957 12.4961Z",
    fill: "white",
    fillOpacity: "0.6"
  }));
};
var CycleJSIconDark = _ref3 => {
  var props = _extends$7({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M24.9961 19.3672C24.9844 19.6211 24.9141 19.8711 24.7852 20.0977L22.418 24.1992C22.1328 24.6953 21.6055 25 21.0352 25H7.89844C7.32812 25 6.80078 24.6953 6.51562 24.2031L0.214844 13.3008C0.0703125 13.0508 0 12.7773 0 12.5C0 12.2227 0.0546875 11.9336 0.222656 11.6523L6.51953 0.796875C6.80469 0.304688 7.33203 0 7.89844 0H21.0352C21.6055 0 22.1328 0.304688 22.418 0.796875C22.418 0.796875 24.6953 4.52734 24.8594 4.79297C25.0234 5.05859 24.9961 5.39453 24.9961 5.66797C24.9961 5.90234 24.9297 6.22266 24.8672 6.47656C24.8047 6.73047 22.8984 14.457 22.8984 14.457L18.7383 5.60938H10.2109L6.21875 12.5L10.2109 19.3906H18.7344L24.9961 19.3672Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M21.957 12.4961L24.8477 18.625C25.0703 19.0976 25.0469 19.6484 24.7852 20.1015L18.7383 19.3945L21.957 12.4961Z",
    fill: "black",
    fillOpacity: "0.6"
  }));
};

function _extends$8() {
  _extends$8 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$8.apply(this, arguments);
}
var D3Icon = _ref => {
  var props = _extends$8({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M31.9503 22.9594C31.9647 22.8201 31.975 22.6793 31.983 22.538C31.9927 22.3706 21.9094 12.8035 21.9094 12.8035H21.6683C21.6683 12.8035 31.8886 23.584 31.9503 22.9594Z",
    fill: "url(#D3_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M10.4374 19.6407C10.424 19.67 10.4107 19.6994 10.397 19.7287C10.3827 19.7594 10.368 19.7901 10.3533 19.8204C10.0319 20.4906 14.8531 25.2038 15.2409 24.6313C15.2586 24.606 15.2763 24.5793 15.2939 24.5539C15.3136 24.5239 15.3329 24.4953 15.3523 24.4652C15.6624 23.9944 10.5751 19.3346 10.4374 19.6407Z",
    fill: "url(#D3_Paint1_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M17.2502 26.2685C17.2366 26.2985 17.1395 26.4626 17.0508 26.5493C17.0358 26.5793 21.7574 31.2618 21.7574 31.2618H22.1825C22.1828 31.2618 17.7504 26.4666 17.2502 26.2685Z",
    fill: "url(#D3_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M31.9897 22.4529C31.7689 27.3478 27.7193 31.2618 22.7717 31.2618H22.1028L17.1619 26.3942C17.5683 25.821 17.9461 25.2272 18.2826 24.608H22.7717C24.1915 24.608 25.3469 23.4533 25.3469 22.0328C25.3469 20.613 24.1915 19.4576 22.7717 19.4576H20.1152C20.3176 18.3876 20.4283 17.2843 20.4283 16.1556C20.4283 15.0095 20.3156 13.8905 20.1058 12.8035H21.756L31.9607 22.8584C31.9727 22.7237 31.9823 22.589 31.9897 22.4529ZM2.6842 1H0V7.65382H2.6842C7.37238 7.65382 11.1869 11.4674 11.1869 16.1556C11.1869 17.431 10.9025 18.6417 10.397 19.7287L15.2939 24.5539C16.9018 22.1482 17.8418 19.2599 17.8418 16.1556C17.8418 7.79886 11.0419 1 2.6842 1Z",
    fill: "url(#D3_Paint3_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.7717 1H11.9022C14.557 2.62086 16.7554 4.91927 18.2532 7.65382H22.7717C24.1915 7.65382 25.3469 8.80852 25.3469 10.229C25.3469 11.6491 24.1915 12.8038 22.7717 12.8038H21.7564L31.961 22.8587C31.985 22.586 32 22.3116 32 22.0328C32 19.7897 31.1951 17.7321 29.8586 16.1306C31.1951 14.5297 32 12.4717 32 10.229C32 5.14034 27.8607 1 22.7717 1Z",
    fill: "url(#D3_Paint4_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.1028 31.2618H11.9799C14.0175 30.0034 15.7791 28.3422 17.1619 26.3942L22.1028 31.2618ZM15.2939 24.5539L10.3974 19.7287C9.04459 22.636 6.09664 24.658 2.6842 24.658H0V31.3111H2.6842C7.93723 31.3111 12.5737 28.6243 15.2939 24.5539Z",
    fill: "url(#D3_Paint5_Linear_".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "D3_Paint0_Linear_".concat(id),
    x1: "13.1446",
    y1: "3.3525",
    x2: "32.107",
    y2: "23.8456",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#F9A03C"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#F7974E"
  })), React.createElement("linearGradient", {
    id: "D3_Paint1_Linear_".concat(id),
    x1: "-2.68057",
    y1: "7.04542",
    x2: "15.3337",
    y2: "24.5271",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#F9A03C"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#F7974E"
  })), React.createElement("linearGradient", {
    id: "D3_Paint2_Linear_".concat(id),
    x1: "5.59879",
    y1: "13.1877",
    x2: "21.3725",
    y2: "31.7735",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#F9A03C"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#F7974E"
  })), React.createElement("linearGradient", {
    id: "D3_Paint3_Linear_".concat(id),
    x1: "3.62722",
    y1: "0.448723",
    x2: "24.8095",
    y2: "30.006",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#F26D58"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#F9A03C"
  })), React.createElement("linearGradient", {
    id: "D3_Paint4_Linear_".concat(id),
    x1: "15.0864",
    y1: "1.84332",
    x2: "37.07",
    y2: "15.1247",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#B84E51"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#F68E48"
  })), React.createElement("linearGradient", {
    id: "D3_Paint5_Linear_".concat(id),
    x1: "10.3848",
    y1: "22.4467",
    x2: "10.6824",
    y2: "36.8164",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#F9A03C"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#F7974E"
  }))));
};
var D3IconDark = _ref2 => {
  var props = _extends$8({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M29.9911 21.3708C29.801 25.5866 26.3132 28.9575 22.0521 28.9575H21.476L17.2206 24.7653C17.5707 24.2716 17.8961 23.7602 18.1858 23.2269H22.0521C23.2749 23.2269 24.27 22.2324 24.27 21.009C24.27 19.7862 23.2749 18.7911 22.0521 18.7911H19.7642C19.9385 17.8696 20.0338 16.9193 20.0338 15.9472C20.0338 14.9602 19.9367 13.9964 19.7561 13.0602H21.1773L29.9661 21.7201C29.9765 21.604 29.9848 21.488 29.9911 21.3708ZM4.75168 2.89444H2.43991V8.62506H4.75168C8.78939 8.62506 12.0747 11.9095 12.0747 15.9472C12.0747 17.0457 11.8297 18.0884 11.3944 19.0246L15.6119 23.1804C16.9966 21.1084 17.8062 18.6208 17.8062 15.9472C17.8062 8.74998 11.9498 2.89444 4.75168 2.89444Z",
    fill: "black",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    d: "M22.0521 2.89444H12.6907C14.9772 4.29041 16.8706 6.26992 18.1606 8.62506H22.0521C23.2749 8.62506 24.27 9.61956 24.27 10.8429C24.27 12.066 23.2749 13.0605 22.0521 13.0605H21.1776L29.9664 21.7203C29.9871 21.4854 30 21.2491 30 21.009C30 19.0772 29.3068 17.305 28.1558 15.9257C29.3068 14.5469 30 12.7745 30 10.8429C30 6.46032 26.435 2.89444 22.0521 2.89444Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M21.476 28.9575H12.7576C14.5125 27.8737 16.0297 26.443 17.2206 24.7653L21.476 28.9575ZM15.6119 23.1803L11.3947 19.0246C10.2296 21.5285 7.69065 23.2699 4.75168 23.2699H2.43991V29H4.75168C9.27587 29 13.2691 26.6859 15.6119 23.1803Z",
    fill: "black"
  }));
};
var D3IconLight = _ref3 => {
  var props = _extends$8({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M29.9911 21.3708C29.801 25.5866 26.3132 28.9575 22.0521 28.9575H21.476L17.2206 24.7653C17.5707 24.2716 17.8961 23.7602 18.1858 23.2269H22.0521C23.2749 23.2269 24.27 22.2324 24.27 21.009C24.27 19.7862 23.2749 18.7911 22.0521 18.7911H19.7642C19.9385 17.8696 20.0338 16.9193 20.0338 15.9472C20.0338 14.9602 19.9367 13.9964 19.7561 13.0602H21.1773L29.9661 21.7201C29.9765 21.604 29.9848 21.488 29.9911 21.3708ZM4.75168 2.89444H2.43991V8.62506H4.75168C8.78939 8.62506 12.0747 11.9095 12.0747 15.9472C12.0747 17.0457 11.8297 18.0884 11.3944 19.0246L15.6119 23.1804C16.9966 21.1084 17.8062 18.6208 17.8062 15.9472C17.8062 8.74998 11.9498 2.89444 4.75168 2.89444Z",
    fill: "white",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    d: "M22.0521 2.89444H12.6907C14.9772 4.29041 16.8706 6.26992 18.1606 8.62506H22.0521C23.2749 8.62506 24.27 9.61956 24.27 10.8429C24.27 12.066 23.2749 13.0605 22.0521 13.0605H21.1776L29.9664 21.7203C29.9871 21.4854 30 21.2491 30 21.009C30 19.0772 29.3068 17.305 28.1558 15.9257C29.3068 14.5469 30 12.7745 30 10.8429C30 6.46032 26.435 2.89444 22.0521 2.89444Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M21.476 28.9575H12.7576C14.5125 27.8737 16.0297 26.443 17.2206 24.7653L21.476 28.9575ZM15.6119 23.1803L11.3947 19.0246C10.2296 21.5285 7.69065 23.2699 4.75168 23.2699H2.43991V29H4.75168C9.27587 29 13.2691 26.6859 15.6119 23.1803Z",
    fill: "white"
  }));
};

function _extends$9() {
  _extends$9 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$9.apply(this, arguments);
}
var DocusaurusIcon = _ref => {
  var props = _extends$9({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M29.5385 7.70647H15.7539V13.286H29.5385V7.70647Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M3.28205 25.9218C2.06802 25.9218 1.01038 25.261 0.442585 24.2808C0.16279 24.7639 0 25.3234 0 25.9218C0 27.7345 1.46937 29.2039 3.28205 29.2039H6.5641V25.9218H3.28205Z",
    fill: "#3ECC5F"
  }), React.createElement("path", {
    d: "M18.0481 8.58868L29.5385 7.87056V6.22954C29.5385 4.41686 28.069 2.94749 26.2565 2.94749H11.4873L11.077 2.23692C10.8945 1.92103 10.4388 1.92103 10.2565 2.23692L9.84623 2.94749L9.43597 2.23692C9.25349 1.92103 8.79777 1.92103 8.61546 2.23692L8.2052 2.94749L7.79494 2.23692C7.61246 1.92103 7.15675 1.92103 6.97443 2.23692L6.56417 2.94749C6.56056 2.94749 6.55712 2.94798 6.55351 2.94798L5.87379 2.26843C5.61599 2.01063 5.17587 2.12845 5.08134 2.48078L4.85685 3.31836L4.00467 3.08993C3.65234 2.99557 3.33004 3.31787 3.42456 3.67019L3.65283 4.52238L2.81542 4.74671C2.46309 4.84123 2.3451 5.28152 2.6029 5.53932L3.28245 6.21904C3.28245 6.22248 3.28212 6.22593 3.28212 6.22954L2.57139 6.63979C2.25566 6.82211 2.25566 7.27799 2.57139 7.46031L3.28212 7.87056L2.57139 8.28082C2.25566 8.46314 2.25566 8.91902 2.57139 9.10133L3.28212 9.51159L2.57139 9.92185C2.25566 10.1042 2.25566 10.56 2.57139 10.7424L3.28212 11.1526L2.57139 11.5629C2.25566 11.7452 2.25566 12.2011 2.57139 12.3834L3.28212 12.7936L2.57139 13.2039C2.25566 13.3862 2.25566 13.8421 2.57139 14.0244L3.28212 14.4347L2.57139 14.8449C2.25566 15.0272 2.25566 15.4831 2.57139 15.6654L3.28212 16.0757L2.57139 16.4859C2.25566 16.6683 2.25566 17.1241 2.57139 17.3065L3.28212 17.7167L2.57139 18.127C2.25566 18.3093 2.25566 18.7652 2.57139 18.9475L3.28212 19.3577L2.57139 19.768C2.25566 19.9503 2.25566 20.4062 2.57139 20.5885L3.28212 20.9988L2.57139 21.409C2.25566 21.5913 2.25566 22.0472 2.57139 22.2295L3.28212 22.6398L2.57139 23.05C2.25566 23.2324 2.25566 23.6882 2.57139 23.8706L3.28212 24.2808L2.57139 24.6911C2.25566 24.8734 2.25566 25.3293 2.57139 25.5116L3.28212 25.9218C3.28212 27.7345 4.7515 29.2039 6.56417 29.2039H26.2565C28.069 29.2039 29.5385 27.7345 29.5385 25.9218V12.7936L18.0481 12.0755C17.1275 12.0179 16.4103 11.2545 16.4103 10.3321C16.4103 9.40968 17.1275 8.64628 18.0481 8.58868Z",
    fill: "#3ECC5F"
  }), React.createElement("path", {
    d: "M22.9744 29.2039H27.8974V22.6398H22.9744V29.2039Z",
    fill: "#3ECC5F"
  }), React.createElement("path", {
    d: "M31.1795 25.1013C31.1435 25.1013 31.1092 25.1074 31.0746 25.1118C31.0684 25.0872 31.0625 25.0624 31.0556 25.0378C31.352 24.9141 31.5602 24.622 31.5602 24.2808C31.5602 23.8276 31.1929 23.4603 30.7397 23.4603C30.5529 23.4603 30.3828 23.5253 30.2448 23.6303C30.2265 23.6118 30.2083 23.5934 30.1898 23.5752C30.2927 23.438 30.3557 23.2696 30.3557 23.085C30.3557 22.6317 29.9884 22.2645 29.5352 22.2645C29.1963 22.2645 28.9055 22.4701 28.7805 22.7635C28.7562 22.7566 28.7317 22.7509 28.7074 22.7446C28.7119 22.71 28.7179 22.6757 28.7179 22.6398C28.7179 22.1865 28.3507 21.8193 27.8974 21.8193C27.4442 21.8193 27.0769 22.1865 27.0769 22.6398C27.0769 22.6757 27.083 22.71 27.0874 22.7446C27.0631 22.7509 27.0387 22.7566 27.0144 22.7635C26.8893 22.4701 26.5986 22.2645 26.2597 22.2645C25.8064 22.2645 25.4392 22.6317 25.4392 23.085C25.4392 23.2696 25.5022 23.438 25.6051 23.5752C24.9951 24.1712 24.6154 25.0017 24.6154 25.9218C24.6154 27.7345 26.0847 29.2039 27.8974 29.2039C29.43 29.2039 30.7134 28.152 31.0746 26.7318C31.1092 26.7363 31.1435 26.7424 31.1795 26.7424C31.6327 26.7424 32 26.3751 32 25.9218C32 25.4686 31.6327 25.1013 31.1795 25.1013Z",
    fill: "#44D860"
  }), React.createElement("path", {
    d: "M24.6154 19.3577H29.5384V16.0757H24.6154V19.3577Z",
    fill: "#3ECC5F"
  }), React.createElement("path", {
    d: "M31.1795 18.127C31.4061 18.127 31.5897 17.9433 31.5897 17.7167C31.5897 17.4901 31.4061 17.3065 31.1795 17.3065C31.1616 17.3065 31.1444 17.3096 31.1271 17.3117C31.1238 17.2994 31.1211 17.2871 31.1176 17.2748C31.2656 17.2129 31.3698 17.0667 31.3698 16.8962C31.3698 16.6696 31.1862 16.4859 30.9596 16.4859C30.8662 16.4859 30.781 16.5183 30.7121 16.5709C30.7031 16.5616 30.6939 16.5524 30.6845 16.5434C30.7361 16.4749 30.7676 16.3906 30.7676 16.2982C30.7676 16.0717 30.5839 15.888 30.3573 15.888C30.1878 15.888 30.0424 15.9908 29.9799 16.1376C29.8392 16.0983 29.6917 16.0757 29.5384 16.0757C28.6323 16.0757 27.8974 16.8105 27.8974 17.7167C27.8974 18.6229 28.6323 19.3577 29.5384 19.3577C29.6917 19.3577 29.8392 19.3351 29.9799 19.2959C30.0424 19.4426 30.1878 19.5455 30.3573 19.5455C30.5839 19.5455 30.7676 19.3617 30.7676 19.1352C30.7676 19.0428 30.7361 18.9585 30.6845 18.89C30.6939 18.881 30.7031 18.8718 30.7121 18.8625C30.781 18.9152 30.8662 18.9475 30.9596 18.9475C31.1862 18.9475 31.3698 18.7639 31.3698 18.5372C31.3698 18.3667 31.2656 18.2205 31.1176 18.1586C31.1211 18.1465 31.1238 18.134 31.1271 18.1217C31.1444 18.1239 31.1616 18.127 31.1795 18.127Z",
    fill: "#44D860"
  }), React.createElement("path", {
    d: "M9.84615 8.28083C9.61952 8.28083 9.43589 8.0972 9.43589 7.87057C9.43589 7.19184 8.88385 6.6398 8.20512 6.6398C7.52639 6.6398 6.97435 7.19184 6.97435 7.87057C6.97435 8.0972 6.79072 8.28083 6.5641 8.28083C6.33747 8.28083 6.15384 8.0972 6.15384 7.87057C6.15384 6.73941 7.07396 5.81929 8.20512 5.81929C9.33628 5.81929 10.2564 6.73941 10.2564 7.87057C10.2564 8.0972 10.0728 8.28083 9.84615 8.28083Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M16.4103 29.2039H26.2564C28.0691 29.2039 29.5385 27.7345 29.5385 25.9218V14.4347H19.6923C17.8796 14.4347 16.4103 15.904 16.4103 17.7167V29.2039Z",
    fill: "#FFFF50"
  }), React.createElement("path", {
    d: "M27.0801 19.5218H18.8686C18.7779 19.5218 18.7045 19.4485 18.7045 19.3577C18.7045 19.267 18.7779 19.1936 18.8686 19.1936H27.0801C27.1709 19.1936 27.2442 19.267 27.2442 19.3577C27.2442 19.4485 27.1709 19.5218 27.0801 19.5218Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M27.0801 22.8039H18.8686C18.7779 22.8039 18.7045 22.7305 18.7045 22.6398C18.7045 22.549 18.7779 22.4757 18.8686 22.4757H27.0801C27.1709 22.4757 27.2442 22.549 27.2442 22.6398C27.2442 22.7305 27.1709 22.8039 27.0801 22.8039Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M27.0801 26.0859H18.8686C18.7779 26.0859 18.7045 26.0126 18.7045 25.9218C18.7045 25.8311 18.7779 25.7577 18.8686 25.7577H27.0801C27.1709 25.7577 27.2442 25.8311 27.2442 25.9218C27.2442 26.0126 27.1709 26.0859 27.0801 26.0859Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M27.0801 17.9113H18.8686C18.7779 17.9113 18.7045 17.8377 18.7045 17.7472C18.7045 17.6564 18.7779 17.5831 18.8686 17.5831H27.0801C27.1709 17.5831 27.2442 17.6564 27.2442 17.7472C27.2442 17.8377 27.1709 17.9113 27.0801 17.9113Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M27.0801 21.1629H18.8686C18.7779 21.1629 18.7045 21.0895 18.7045 20.9988C18.7045 20.908 18.7779 20.8347 18.8686 20.8347H27.0801C27.1709 20.8347 27.2442 20.908 27.2442 20.9988C27.2442 21.0895 27.1709 21.1629 27.0801 21.1629Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M27.0801 24.4449H18.8686C18.7779 24.4449 18.7045 24.3716 18.7045 24.2808C18.7045 24.1901 18.7779 24.1167 18.8686 24.1167H27.0801C27.1709 24.1167 27.2442 24.1901 27.2442 24.2808C27.2442 24.3716 27.1709 24.4449 27.0801 24.4449Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M29.5385 9.28369C29.5365 9.28369 29.5349 9.28271 29.5329 9.28287C29.0258 9.3001 28.7859 9.80734 28.5742 10.2549C28.3533 10.7224 28.1825 11.0266 27.9025 11.0174C27.5925 11.0063 27.4153 10.6561 27.2276 10.2854C27.012 9.85986 26.7658 9.37707 26.249 9.39512C25.7492 9.41218 25.5084 9.85362 25.2961 10.243C25.0701 10.6579 24.9164 10.9101 24.6198 10.8985C24.3036 10.887 24.1356 10.6023 23.9411 10.2727C23.7243 9.9058 23.4737 9.49325 22.967 9.50736C22.4757 9.52427 22.2343 9.89875 22.0213 10.2294C21.796 10.579 21.6381 10.792 21.3378 10.7793C21.014 10.7677 20.8468 10.5315 20.6533 10.258C20.436 9.95061 20.1912 9.60271 19.6859 9.61961C19.2054 9.63602 18.964 9.94273 18.7512 10.2133C18.549 10.47 18.3912 10.6732 18.0572 10.6604C17.9666 10.6567 17.8906 10.7278 17.8874 10.8185C17.8839 10.909 17.9548 10.9851 18.0454 10.9886C18.5405 11.0051 18.7912 10.693 19.009 10.4163C19.2021 10.1708 19.3689 9.95897 19.6971 9.94782C20.0131 9.93436 20.1613 10.1308 20.3855 10.4475C20.5983 10.7485 20.8399 11.0898 21.326 11.1074C21.8352 11.1244 22.0802 10.7439 22.2971 10.4071C22.4911 10.1062 22.6585 9.8464 22.9781 9.83541C23.2724 9.82441 23.4325 10.0569 23.6584 10.4395C23.8712 10.8 24.1123 11.2085 24.608 11.2265C25.1208 11.2442 25.3685 10.7964 25.5843 10.4002C25.7712 10.0576 25.9476 9.73383 26.2602 9.72316C26.5544 9.71627 26.7079 9.9849 26.9348 10.4337C27.1468 10.8527 27.3873 11.3273 27.8907 11.3455C27.9001 11.3458 27.9093 11.346 27.9185 11.346C28.4213 11.346 28.6599 10.8414 28.8711 10.3952C29.058 9.99967 29.2349 9.62699 29.5385 9.6119V9.28369Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M13.1282 29.2039H19.6923V22.6398H13.1282V29.2039Z",
    fill: "#3ECC5F"
  }), React.createElement("path", {
    d: "M22.9744 25.1013C22.9384 25.1013 22.9041 25.1074 22.8695 25.1118C22.8633 25.0872 22.8574 25.0624 22.8505 25.0378C23.1468 24.9141 23.3551 24.622 23.3551 24.2808C23.3551 23.8276 22.9878 23.4603 22.5346 23.4603C22.3478 23.4603 22.1776 23.5253 22.0396 23.6303C22.0214 23.6118 22.0032 23.5934 21.9847 23.5752C22.0875 23.438 22.1506 23.2696 22.1506 23.085C22.1506 22.6317 21.7833 22.2645 21.3301 22.2645C20.9912 22.2645 20.7004 22.4701 20.5753 22.7635C20.5511 22.7566 20.5266 22.7509 20.5023 22.7446C20.5067 22.71 20.5128 22.6757 20.5128 22.6398C20.5128 22.1865 20.1456 21.8193 19.6923 21.8193C19.2391 21.8193 18.8718 22.1865 18.8718 22.6398C18.8718 22.6757 18.8779 22.71 18.8823 22.7446C18.858 22.7509 18.8336 22.7566 18.8093 22.7635C18.6842 22.4701 18.3934 22.2645 18.0546 22.2645C17.6013 22.2645 17.2341 22.6317 17.2341 23.085C17.2341 23.2696 17.2971 23.438 17.4 23.5752C16.79 24.1712 16.4103 25.0017 16.4103 25.9218C16.4103 27.7345 17.8796 29.2039 19.6923 29.2039C21.2249 29.2039 22.5083 28.152 22.8695 26.7318C22.9041 26.7363 22.9384 26.7424 22.9744 26.7424C23.4276 26.7424 23.7949 26.3751 23.7949 25.9218C23.7949 25.4686 23.4276 25.1013 22.9744 25.1013Z",
    fill: "#44D860"
  }), React.createElement("path", {
    d: "M13.1282 19.3577H19.6923V16.0757H13.1282V19.3577Z",
    fill: "#3ECC5F"
  }), React.createElement("path", {
    d: "M21.3333 18.127C21.5599 18.127 21.7436 17.9433 21.7436 17.7167C21.7436 17.4901 21.5599 17.3065 21.3333 17.3065C21.3154 17.3065 21.2982 17.3096 21.281 17.3117C21.2777 17.2994 21.2749 17.2871 21.2715 17.2748C21.4195 17.2129 21.5237 17.0667 21.5237 16.8962C21.5237 16.6696 21.34 16.4859 21.1134 16.4859C21.02 16.4859 20.9349 16.5183 20.866 16.5709C20.8569 16.5616 20.8477 16.5524 20.8384 16.5434C20.8899 16.4749 20.9214 16.3906 20.9214 16.2982C20.9214 16.0717 20.7378 15.888 20.5112 15.888C20.3416 15.888 20.1963 15.9908 20.1337 16.1376C19.9931 16.0983 19.8456 16.0757 19.6923 16.0757C18.7861 16.0757 18.0513 16.8105 18.0513 17.7167C18.0513 18.6229 18.7861 19.3577 19.6923 19.3577C19.8456 19.3577 19.9931 19.3351 20.1337 19.2959C20.1963 19.4426 20.3416 19.5455 20.5112 19.5455C20.7378 19.5455 20.9214 19.3617 20.9214 19.1352C20.9214 19.0428 20.8899 18.9585 20.8384 18.89C20.8477 18.881 20.8569 18.8718 20.866 18.8625C20.9349 18.9152 21.02 18.9475 21.1134 18.9475C21.34 18.9475 21.5237 18.7639 21.5237 18.5372C21.5237 18.3667 21.4195 18.2205 21.2715 18.1586C21.2749 18.1465 21.2777 18.134 21.281 18.1217C21.2982 18.1239 21.3154 18.127 21.3333 18.127Z",
    fill: "#44D860"
  }), React.createElement("path", {
    d: "M22.9744 6.02441C22.9481 6.02441 22.9202 6.02113 22.8939 6.01621C22.8677 6.01129 22.8413 6.00308 22.8168 5.99323C22.7922 5.98339 22.7692 5.97026 22.7461 5.95549C22.7248 5.94072 22.7036 5.92267 22.6837 5.90462C22.6658 5.88493 22.6478 5.86523 22.633 5.84226C22.6183 5.81929 22.6051 5.79631 22.5951 5.7717C22.5854 5.74708 22.5772 5.72082 22.5723 5.69457C22.5674 5.66831 22.5641 5.64041 22.5641 5.61416C22.5641 5.5879 22.5674 5.56 22.5723 5.53375C22.5772 5.50749 22.5854 5.48288 22.5951 5.45662C22.6051 5.432 22.6183 5.40903 22.633 5.38605C22.6478 5.36472 22.6658 5.34339 22.6837 5.3237C22.7036 5.30564 22.7248 5.28759 22.7461 5.27282C22.7692 5.25806 22.7922 5.24493 22.8168 5.23508C22.8413 5.22523 22.8677 5.21703 22.8939 5.21211C22.9465 5.20062 23.0006 5.20062 23.0548 5.21211C23.0809 5.21703 23.1073 5.22523 23.1319 5.23508C23.1563 5.24493 23.1795 5.25806 23.2025 5.27282C23.2238 5.28759 23.245 5.30564 23.2648 5.3237C23.2829 5.34339 23.3009 5.36472 23.3157 5.38605C23.3305 5.40903 23.3436 5.432 23.3534 5.45662C23.3633 5.48288 23.3715 5.50749 23.3764 5.53375C23.3812 5.56 23.3846 5.5879 23.3846 5.61416C23.3846 5.72246 23.3401 5.82913 23.2648 5.90462C23.245 5.92267 23.2238 5.94072 23.2025 5.95549C23.1795 5.97026 23.1563 5.98339 23.1319 5.99323C23.1073 6.00308 23.0809 6.01129 23.0548 6.01621C23.0285 6.02113 23.0006 6.02441 22.9744 6.02441Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M26.2564 5.81928C26.1481 5.81928 26.0431 5.77497 25.9658 5.69948C25.9479 5.67979 25.9298 5.65846 25.9151 5.63712C25.9003 5.61415 25.8872 5.59117 25.8772 5.56656C25.8675 5.54194 25.8593 5.51569 25.8544 5.48943C25.8494 5.46317 25.8462 5.43528 25.8462 5.40902C25.8462 5.30071 25.8905 5.19569 25.9658 5.11856C25.9856 5.10051 26.0068 5.08245 26.0281 5.06769C26.0513 5.05292 26.0743 5.03979 26.0989 5.02994C26.1233 5.0201 26.1497 5.01189 26.176 5.00697C26.2285 4.99548 26.2843 4.99548 26.3368 5.00697C26.3629 5.01189 26.3893 5.0201 26.4139 5.02994C26.4384 5.03979 26.4615 5.05292 26.4845 5.06769C26.5058 5.08245 26.527 5.10051 26.5469 5.11856C26.6222 5.19569 26.6667 5.30071 26.6667 5.40902C26.6667 5.43528 26.6632 5.46317 26.6585 5.48943C26.6535 5.51569 26.6453 5.54194 26.6355 5.56656C26.624 5.59117 26.6125 5.61415 26.5977 5.63712C26.583 5.65846 26.5649 5.67979 26.5469 5.69948C26.527 5.71753 26.5058 5.73558 26.4845 5.75035C26.4615 5.76512 26.4384 5.77825 26.4139 5.7881C26.3893 5.79794 26.3629 5.80615 26.3368 5.81107C26.3106 5.81599 26.2827 5.81928 26.2564 5.81928Z",
    fill: "black"
  }));
};
var DocusaurusIconLight = _ref2 => {
  var props = _extends$9({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M27.8462 8.88674L17.7921 9.51509C16.9865 9.56549 16.359 10.2335 16.359 11.0406C16.359 11.8477 16.9865 12.5157 17.7921 12.5661L27.8462 13.1944V15.2927C27.8666 15.2904 27.8881 15.2893 27.9107 15.2893C28.0448 15.2893 28.1739 15.3091 28.297 15.3434C28.3517 15.215 28.4789 15.125 28.6272 15.125C28.8255 15.125 28.9862 15.2858 28.9862 15.484C28.9862 15.5648 28.9586 15.6386 28.9135 15.6985C28.9217 15.7064 28.9298 15.7144 28.9377 15.7226C28.998 15.6765 29.0725 15.6482 29.1542 15.6482C29.3525 15.6482 29.5132 15.8089 29.5132 16.0072C29.5132 16.1564 29.422 16.2843 29.2925 16.3385L29.2956 16.3503L29.2973 16.3569L29.3008 16.3708L29.3114 16.3694L29.3115 16.3694C29.3231 16.3678 29.3346 16.3662 29.3466 16.3662C29.5449 16.3662 29.7056 16.5269 29.7056 16.7252C29.7056 16.9235 29.5449 17.0841 29.3466 17.0841C29.3352 17.0841 29.3242 17.0827 29.3133 17.0812L29.3115 17.081H29.3114L29.3008 17.0795L29.2973 17.0931V17.0932C29.2958 17.0995 29.2942 17.1057 29.2925 17.1119C29.422 17.166 29.5132 17.2939 29.5132 17.4431C29.5132 17.6414 29.3525 17.8021 29.1542 17.8021C29.0725 17.8021 28.998 17.7738 28.9377 17.7277C28.9298 17.7359 28.9217 17.7439 28.9135 17.7518C28.9586 17.8117 28.9862 17.8855 28.9862 17.9664C28.9862 18.1645 28.8255 18.3253 28.6272 18.3253C28.4789 18.3253 28.3517 18.2353 28.297 18.1069C28.1739 18.1412 28.0448 18.1611 27.9107 18.1611C27.888 18.1517 27.8665 18.1417 27.8462 18.1311V19.1657C28.1328 19.2599 28.3397 19.5297 28.3397 19.8479C28.3397 19.8727 28.3364 19.8966 28.3331 19.9205L28.3306 19.9397L28.3503 19.9447C28.365 19.9483 28.3798 19.952 28.3945 19.9562C28.5039 19.6995 28.7583 19.5195 29.0548 19.5195C29.4514 19.5195 29.7728 19.8409 29.7728 20.2375C29.7728 20.399 29.7176 20.5464 29.6276 20.6664C29.6438 20.6823 29.6598 20.6984 29.6757 20.7146C29.7965 20.6227 29.9454 20.5659 30.1088 20.5659C30.5054 20.5659 30.8267 20.8872 30.8267 21.2838C30.8267 21.5824 30.6445 21.8379 30.3852 21.9462C30.3896 21.962 30.3936 21.9779 30.3975 21.9938L30.4018 22.011L30.421 22.0084C30.4449 22.0051 30.4688 22.0018 30.4936 22.0018C30.8902 22.0018 31.2115 22.3231 31.2115 22.7197C31.2115 23.1163 30.8902 23.4377 30.4936 23.4377C30.4688 23.4377 30.4449 23.4344 30.421 23.4311L30.4018 23.4285C30.0919 24.6471 29.006 25.5558 27.6994 25.5905C27.3192 26.7311 26.2428 27.5534 24.9744 27.5534H19.2308H13.4872H7.74365H7.74359H4.87179C3.2857 27.5534 2 26.2677 2 24.6816C2 24.1579 2.14244 23.6684 2.38726 23.2457C2.88408 24.1034 3.80952 24.6816 4.87179 24.6816H4.87186L4.24997 24.3226C3.9737 24.1631 3.9737 23.7642 4.24997 23.6047L4.87186 23.2457L4.24997 22.8867C3.9737 22.7272 3.9737 22.3283 4.24997 22.1688L4.87186 21.8098L4.24997 21.4508C3.9737 21.2913 3.9737 20.8924 4.24997 20.7329L4.87186 20.3739L4.24997 20.0149C3.9737 19.8554 3.9737 19.4565 4.24997 19.297L4.87186 18.938L4.24997 18.5791C3.9737 18.4195 3.9737 18.0206 4.24997 17.8611L4.87186 17.5021L4.24997 17.1432C3.9737 16.9836 3.9737 16.5847 4.24997 16.4252L4.87186 16.0662L4.24997 15.7073C3.9737 15.5477 3.9737 15.1488 4.24997 14.9893L4.87186 14.6303L4.24997 14.2714C3.9737 14.1118 3.9737 13.7129 4.24997 13.5534L4.87186 13.1944L4.24997 12.8355C3.9737 12.6759 3.9737 12.277 4.24997 12.1175L4.87186 11.7585L4.24997 11.3996C3.9737 11.24 3.9737 10.8411 4.24997 10.6816L4.87186 10.3226L4.24997 9.96367C3.9737 9.80414 3.9737 9.40525 4.24997 9.24572L4.87186 8.88674L4.24997 8.52777C3.9737 8.36824 3.9737 7.96935 4.24997 7.80982L4.87186 7.45085L4.87214 7.44166L4.27754 6.84691C4.05196 6.62133 4.1552 6.23608 4.46349 6.15337L5.19623 5.95708L4.99649 5.21142C4.91379 4.90313 5.1958 4.62112 5.50408 4.70369L6.24974 4.90356L6.44618 4.17068C6.52888 3.86239 6.91399 3.7593 7.13957 3.98488L7.73432 4.57948L7.73899 4.57927L7.74365 4.57905L8.10263 3.95731C8.26216 3.6809 8.6609 3.6809 8.82058 3.95731L9.17955 4.57905L9.53852 3.95731C9.69805 3.6809 10.0968 3.6809 10.2565 3.95731L10.6154 4.57905L10.9744 3.95731C11.134 3.6809 11.5327 3.6809 11.6924 3.95731L12.0513 4.57905H24.9744C26.5604 4.57905 27.8462 5.86475 27.8462 7.45085V8.88674ZM20.6581 27.1731C21.3214 26.7911 21.8173 26.1511 22.0108 25.3904L22.03 25.393C22.0539 25.3963 22.0778 25.3996 22.1026 25.3996C22.4992 25.3996 22.8205 25.0782 22.8205 24.6816C22.8205 24.285 22.4992 23.9637 22.1026 23.9637C22.0778 23.9637 22.0539 23.967 22.03 23.9703L22.03 23.9703L22.0108 23.9729L22.0065 23.9557L22.0064 23.9554L22.0064 23.9552C22.0025 23.9395 21.9986 23.9237 21.9942 23.9081C22.2535 23.7998 22.4357 23.5442 22.4357 23.2457C22.4357 22.8491 22.1143 22.5278 21.7177 22.5278C21.5543 22.5278 21.4054 22.5846 21.2847 22.6765L21.2842 22.676L21.2841 22.6759C21.2683 22.6599 21.2526 22.644 21.2366 22.6283C21.3266 22.5082 21.3817 22.3609 21.3817 22.1994C21.3817 21.8028 21.0604 21.4814 20.6638 21.4814C20.3673 21.4814 20.1128 21.6613 20.0034 21.9181C19.9888 21.9139 19.9741 21.9102 19.9594 21.9066L19.9593 21.9065L19.9395 21.9016L19.9421 21.8824C19.9454 21.8585 19.9487 21.8346 19.9487 21.8098C19.9487 21.4132 19.6274 21.0919 19.2308 21.0919C18.8342 21.0919 18.5128 21.4132 18.5128 21.8098H18.4006C18.2727 21.6122 18.0505 21.4814 17.7977 21.4814C17.5448 21.4814 17.3224 21.6122 17.1945 21.8098H16V17.938H19.2267H19.2308C19.3649 17.938 19.494 17.9182 19.617 17.8839C19.6717 18.0123 19.7989 18.1023 19.9473 18.1023C20.1456 18.1023 20.3062 17.9415 20.3062 17.7433C20.3062 17.6625 20.2787 17.5887 20.2336 17.5288C20.2418 17.5209 20.2498 17.5129 20.2577 17.5047C20.318 17.5508 20.3925 17.5791 20.4742 17.5791C20.6725 17.5791 20.8332 17.4184 20.8332 17.2201C20.8332 17.0709 20.742 16.9429 20.6125 16.8888L20.6151 16.8792L20.6174 16.8701L20.6208 16.8565L20.6315 16.8579C20.643 16.8595 20.6547 16.8611 20.6667 16.8611C20.865 16.8611 21.0256 16.7004 21.0256 16.5021C21.0256 16.3038 20.865 16.1432 20.6667 16.1432C20.6547 16.1432 20.643 16.1447 20.6315 16.1463L20.6208 16.1477C20.6197 16.1435 20.6186 16.1393 20.6176 16.135C20.616 16.1285 20.6143 16.1219 20.6125 16.1154C20.742 16.0613 20.8332 15.9334 20.8332 15.7842C20.8332 15.5859 20.6725 15.4252 20.4742 15.4252C20.3925 15.4252 20.318 15.4535 20.2577 15.4996L20.2454 15.487L20.2336 15.4755C20.2787 15.4156 20.3062 15.3418 20.3062 15.2609C20.3062 15.0628 20.1456 14.902 19.9473 14.902C19.7989 14.902 19.6717 14.992 19.617 15.1204C19.494 15.086 19.3649 15.0662 19.2308 15.0662H16.8663C17.3839 14.5612 18.0915 14.25 18.8718 14.25H27.4872V15.8713C27.4808 15.9983 27.4834 16.1414 27.4872 16.2957V24.3013C27.4872 25.8874 26.2015 27.1731 24.6154 27.1731H20.6581ZM10.2564 8.88675C10.2564 9.08505 10.4171 9.24572 10.6154 9.24572C10.8137 9.24572 10.9744 9.08505 10.9744 8.88675C10.9744 7.89699 10.1692 7.09188 9.17948 7.09188C8.18972 7.09188 7.38461 7.89699 7.38461 8.88675C7.38461 9.08505 7.54529 9.24572 7.74358 9.24572C7.94188 9.24572 8.10256 9.08505 8.10256 8.88675C8.10256 8.29286 8.58559 7.80983 9.17948 7.80983C9.77337 7.80983 10.2564 8.29286 10.2564 8.88675ZM19.4072 7.26418C19.4302 7.26849 19.4546 7.27136 19.4776 7.27136C19.5005 7.27136 19.5249 7.26849 19.5479 7.26418C19.5708 7.25987 19.5939 7.25269 19.6154 7.24408C19.6368 7.23546 19.657 7.22398 19.6772 7.21105C19.6958 7.19813 19.7143 7.18234 19.7317 7.16654C19.7976 7.10049 19.8365 7.00716 19.8365 6.91239C19.8365 6.88941 19.8335 6.865 19.8294 6.84203C19.825 6.81905 19.8179 6.79752 19.8093 6.77454C19.8006 6.753 19.7892 6.7329 19.7762 6.7128C19.7633 6.69413 19.7475 6.67546 19.7317 6.65823C19.7143 6.64244 19.6958 6.62664 19.6772 6.61372C19.657 6.6008 19.6368 6.58931 19.6154 6.5807C19.5939 6.57208 19.5708 6.5649 19.5479 6.56059C19.5005 6.55054 19.4532 6.55054 19.4072 6.56059C19.3842 6.5649 19.3611 6.57208 19.3397 6.5807C19.3182 6.58931 19.2981 6.6008 19.2778 6.61372C19.2592 6.62664 19.2406 6.64244 19.2233 6.65823C19.2076 6.67546 19.1918 6.69413 19.1789 6.7128C19.166 6.7329 19.1545 6.753 19.1457 6.77454C19.1373 6.79752 19.1301 6.81905 19.1258 6.84203C19.1215 6.865 19.1186 6.88941 19.1186 6.91239C19.1186 6.93536 19.1215 6.95977 19.1258 6.98275C19.1301 7.00572 19.1373 7.0287 19.1457 7.05023C19.1545 7.07177 19.166 7.09187 19.1789 7.11198C19.1915 7.13157 19.2068 7.14844 19.2221 7.16524L19.2233 7.16654C19.2406 7.18234 19.2592 7.19813 19.2778 7.21105C19.2981 7.22398 19.3182 7.23546 19.3397 7.24408C19.3611 7.25269 19.3842 7.25987 19.4072 7.26418ZM22.3494 7.09187C22.2546 7.09187 22.1627 7.0531 22.0951 6.98705C22.0794 6.96982 22.0636 6.95115 22.0507 6.93248C22.0378 6.91238 22.0263 6.89228 22.0175 6.87074C22.009 6.8492 22.0019 6.82623 21.9976 6.80325C21.9933 6.78028 21.9904 6.75587 21.9904 6.73289C21.9904 6.63812 22.0291 6.54622 22.0951 6.47874C22.1124 6.46294 22.131 6.44715 22.1496 6.43422C22.1699 6.4213 22.19 6.40981 22.2115 6.4012C22.2329 6.39258 22.256 6.3854 22.279 6.3811C22.3249 6.37105 22.3738 6.37105 22.4197 6.3811C22.4425 6.3854 22.4657 6.39258 22.4872 6.4012C22.5086 6.40981 22.5288 6.4213 22.5489 6.43422C22.5676 6.44715 22.5861 6.46294 22.6035 6.47874C22.6694 6.54622 22.7083 6.63812 22.7083 6.73289C22.7083 6.75587 22.7053 6.78028 22.7011 6.80325C22.6968 6.82623 22.6897 6.8492 22.681 6.87074C22.671 6.89228 22.6609 6.91238 22.648 6.93248C22.6351 6.95115 22.6193 6.96982 22.6035 6.98705C22.5861 7.00284 22.5676 7.01864 22.5489 7.03156C22.5288 7.04448 22.5086 7.05597 22.4872 7.06458C22.4657 7.0732 22.4425 7.08038 22.4197 7.08469C22.3967 7.08899 22.3723 7.09187 22.3494 7.09187ZM27.8439 10.1229C27.8446 10.123 27.8454 10.1232 27.8462 10.1232V10.4104C27.5805 10.4236 27.4257 10.7497 27.2622 11.0958L27.2619 11.0963C27.0772 11.4866 26.8684 11.9277 26.4286 11.9277C26.4206 11.9277 26.4126 11.9276 26.4044 11.9273C25.9638 11.9114 25.7535 11.4961 25.568 11.1295C25.3694 10.7368 25.2351 10.5017 24.9777 10.5078C24.7043 10.5171 24.55 10.8 24.3866 11.0996L24.3862 11.1002C24.1974 11.4468 23.9807 11.8387 23.532 11.8232C23.0983 11.8074 22.8873 11.4501 22.7011 11.1347V11.1345C22.5035 10.7998 22.3633 10.5964 22.1059 10.606C21.8262 10.6156 21.6797 10.8429 21.51 11.1062L21.5098 11.1065L21.5098 11.1065C21.32 11.4011 21.1056 11.7339 20.6602 11.7189C20.2349 11.7036 20.0235 11.4049 19.8373 11.1416C19.6412 10.8644 19.5115 10.6926 19.2349 10.7043C18.9478 10.7141 18.8019 10.8995 18.6329 11.1143C18.4423 11.3564 18.2229 11.6295 17.7897 11.615C17.7105 11.612 17.6484 11.5453 17.6514 11.4662C17.6543 11.3868 17.7208 11.3246 17.8001 11.3278C18.0904 11.3389 18.2287 11.1635 18.404 10.9409L18.4073 10.9367C18.5935 10.6999 18.8048 10.4315 19.2252 10.4172C19.6662 10.4024 19.8804 10.7053 20.0703 10.9737L20.0705 10.974L20.0716 10.9757C20.2409 11.2151 20.3873 11.4217 20.6706 11.4319C20.9333 11.443 21.0715 11.2566 21.2686 10.9507C21.455 10.6614 21.6662 10.3337 22.0961 10.3189C22.5395 10.3066 22.7588 10.6676 22.9485 10.9886C23.1186 11.277 23.2657 11.5261 23.5424 11.5362C23.8018 11.5464 23.9364 11.3257 24.1341 10.9627C24.3199 10.6219 24.5305 10.2357 24.9679 10.2207C25.4201 10.2049 25.6355 10.6274 25.8241 10.9997L25.8243 11.0001C25.9885 11.3243 26.1436 11.6305 26.4147 11.6403C26.6597 11.6483 26.8092 11.3821 27.0024 10.973L27.0025 10.9729L27.0026 10.9728C27.1878 10.5813 27.3977 10.1376 27.8413 10.1225C27.8419 10.1224 27.8425 10.1225 27.843 10.1226C27.8433 10.1227 27.8436 10.1228 27.8439 10.1229ZM22.0769 17.5H25.9231C25.9656 17.5 26 17.388 26 17.25C26 17.1118 25.9656 17 25.9231 17H22.0769C22.0344 17 22 17.1118 22 17.25C22 17.388 22.0344 17.5 22.0769 17.5ZM22.0769 18.5H25.9231C25.9656 18.5 26 18.388 26 18.25C26 18.1118 25.9656 18 25.9231 18H22.0769C22.0344 18 22 18.1118 22 18.25C22 18.388 22.0344 18.5 22.0769 18.5ZM25.9231 21.5H22.0769C22.0344 21.5 22 21.388 22 21.25C22 21.1118 22.0344 21 22.0769 21H25.9231C25.9656 21 26 21.1118 26 21.25C26 21.388 25.9656 21.5 25.9231 21.5ZM18.1537 19.5H25.8463C25.9313 19.5 26 19.388 26 19.25C26 19.1118 25.9313 19 25.8463 19H18.1537C18.0687 19 18 19.1118 18 19.25C18 19.388 18.0687 19.5 18.1537 19.5ZM25.8655 20.5H19.1345C19.0601 20.5 19 20.3883 19 20.25C19 20.1118 19.0601 20 19.1345 20H25.8655C25.9399 20 26 20.1118 26 20.25C26 20.3883 25.9399 20.5 25.8655 20.5Z",
    fill: "white"
  }));
};
var DocusaurusIconDark = _ref3 => {
  var props = _extends$9({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M27.8462 8.88674L17.7921 9.51509C16.9865 9.56549 16.359 10.2335 16.359 11.0406C16.359 11.8477 16.9865 12.5157 17.7921 12.5661L27.8462 13.1944V15.2927C27.8666 15.2904 27.8881 15.2893 27.9107 15.2893C28.0448 15.2893 28.1739 15.3091 28.297 15.3434C28.3517 15.215 28.4789 15.125 28.6272 15.125C28.8255 15.125 28.9862 15.2858 28.9862 15.484C28.9862 15.5648 28.9586 15.6386 28.9135 15.6985C28.9217 15.7064 28.9298 15.7144 28.9377 15.7226C28.998 15.6765 29.0725 15.6482 29.1542 15.6482C29.3525 15.6482 29.5132 15.8089 29.5132 16.0072C29.5132 16.1564 29.422 16.2843 29.2925 16.3385L29.2956 16.3503L29.2973 16.3569L29.3008 16.3708L29.3114 16.3694L29.3115 16.3694C29.3231 16.3678 29.3346 16.3662 29.3466 16.3662C29.5449 16.3662 29.7056 16.5269 29.7056 16.7252C29.7056 16.9235 29.5449 17.0841 29.3466 17.0841C29.3352 17.0841 29.3242 17.0827 29.3133 17.0812L29.3115 17.081H29.3114L29.3008 17.0795L29.2973 17.0931V17.0932C29.2958 17.0995 29.2942 17.1057 29.2925 17.1119C29.422 17.166 29.5132 17.2939 29.5132 17.4431C29.5132 17.6414 29.3525 17.8021 29.1542 17.8021C29.0725 17.8021 28.998 17.7738 28.9377 17.7277C28.9298 17.7359 28.9217 17.7439 28.9135 17.7518C28.9586 17.8117 28.9862 17.8855 28.9862 17.9664C28.9862 18.1645 28.8255 18.3253 28.6272 18.3253C28.4789 18.3253 28.3517 18.2353 28.297 18.1069C28.1739 18.1412 28.0448 18.1611 27.9107 18.1611C27.888 18.1517 27.8665 18.1417 27.8462 18.1311V19.1657C28.1328 19.2599 28.3397 19.5297 28.3397 19.8479C28.3397 19.8727 28.3364 19.8966 28.3331 19.9205L28.3306 19.9397L28.3503 19.9447C28.365 19.9483 28.3798 19.952 28.3945 19.9562C28.5039 19.6995 28.7583 19.5195 29.0548 19.5195C29.4514 19.5195 29.7728 19.8409 29.7728 20.2375C29.7728 20.399 29.7176 20.5464 29.6276 20.6664C29.6438 20.6823 29.6598 20.6984 29.6757 20.7146C29.7965 20.6227 29.9454 20.5659 30.1088 20.5659C30.5054 20.5659 30.8267 20.8872 30.8267 21.2838C30.8267 21.5824 30.6445 21.8379 30.3852 21.9462C30.3896 21.962 30.3936 21.9779 30.3975 21.9938L30.4018 22.011L30.421 22.0084C30.4449 22.0051 30.4688 22.0018 30.4936 22.0018C30.8902 22.0018 31.2115 22.3231 31.2115 22.7197C31.2115 23.1163 30.8902 23.4377 30.4936 23.4377C30.4688 23.4377 30.4449 23.4344 30.421 23.4311L30.4018 23.4285C30.0919 24.6471 29.006 25.5558 27.6994 25.5905C27.3192 26.7311 26.2428 27.5534 24.9744 27.5534H19.2308H13.4872H7.74365H7.74359H4.87179C3.2857 27.5534 2 26.2677 2 24.6816C2 24.1579 2.14244 23.6684 2.38726 23.2457C2.88408 24.1034 3.80952 24.6816 4.87179 24.6816H4.87186L4.24997 24.3226C3.9737 24.1631 3.9737 23.7642 4.24997 23.6047L4.87186 23.2457L4.24997 22.8867C3.9737 22.7272 3.9737 22.3283 4.24997 22.1688L4.87186 21.8098L4.24997 21.4508C3.9737 21.2913 3.9737 20.8924 4.24997 20.7329L4.87186 20.3739L4.24997 20.0149C3.9737 19.8554 3.9737 19.4565 4.24997 19.297L4.87186 18.938L4.24997 18.5791C3.9737 18.4195 3.9737 18.0206 4.24997 17.8611L4.87186 17.5021L4.24997 17.1432C3.9737 16.9836 3.9737 16.5847 4.24997 16.4252L4.87186 16.0662L4.24997 15.7073C3.9737 15.5477 3.9737 15.1488 4.24997 14.9893L4.87186 14.6303L4.24997 14.2714C3.9737 14.1118 3.9737 13.7129 4.24997 13.5534L4.87186 13.1944L4.24997 12.8355C3.9737 12.6759 3.9737 12.277 4.24997 12.1175L4.87186 11.7585L4.24997 11.3996C3.9737 11.24 3.9737 10.8411 4.24997 10.6816L4.87186 10.3226L4.24997 9.96367C3.9737 9.80414 3.9737 9.40525 4.24997 9.24572L4.87186 8.88674L4.24997 8.52777C3.9737 8.36824 3.9737 7.96935 4.24997 7.80982L4.87186 7.45085L4.87214 7.44166L4.27754 6.84691C4.05196 6.62133 4.1552 6.23608 4.46349 6.15337L5.19623 5.95708L4.99649 5.21142C4.91379 4.90313 5.1958 4.62112 5.50408 4.70369L6.24974 4.90356L6.44618 4.17068C6.52888 3.86239 6.91399 3.7593 7.13957 3.98488L7.73432 4.57948L7.73899 4.57927L7.74365 4.57905L8.10263 3.95731C8.26216 3.6809 8.6609 3.6809 8.82058 3.95731L9.17955 4.57905L9.53852 3.95731C9.69805 3.6809 10.0968 3.6809 10.2565 3.95731L10.6154 4.57905L10.9744 3.95731C11.134 3.6809 11.5327 3.6809 11.6924 3.95731L12.0513 4.57905H24.9744C26.5604 4.57905 27.8462 5.86475 27.8462 7.45085V8.88674ZM20.6581 27.1731C21.3214 26.7911 21.8173 26.1511 22.0108 25.3904L22.03 25.393C22.0539 25.3963 22.0778 25.3996 22.1026 25.3996C22.4992 25.3996 22.8205 25.0782 22.8205 24.6816C22.8205 24.285 22.4992 23.9637 22.1026 23.9637C22.0778 23.9637 22.0539 23.967 22.03 23.9703L22.03 23.9703L22.0108 23.9729L22.0065 23.9557L22.0064 23.9554L22.0064 23.9552C22.0025 23.9395 21.9986 23.9237 21.9942 23.9081C22.2535 23.7998 22.4357 23.5442 22.4357 23.2457C22.4357 22.8491 22.1143 22.5278 21.7177 22.5278C21.5543 22.5278 21.4054 22.5846 21.2847 22.6765L21.2842 22.676L21.2841 22.6759C21.2683 22.6599 21.2526 22.644 21.2366 22.6283C21.3266 22.5082 21.3817 22.3609 21.3817 22.1994C21.3817 21.8028 21.0604 21.4814 20.6638 21.4814C20.3673 21.4814 20.1128 21.6613 20.0034 21.9181C19.9888 21.9139 19.9741 21.9102 19.9594 21.9066L19.9593 21.9065L19.9395 21.9016L19.9421 21.8824C19.9454 21.8585 19.9487 21.8346 19.9487 21.8098C19.9487 21.4132 19.6274 21.0919 19.2308 21.0919C18.8342 21.0919 18.5128 21.4132 18.5128 21.8098H18.4006C18.2727 21.6122 18.0505 21.4814 17.7977 21.4814C17.5448 21.4814 17.3224 21.6122 17.1945 21.8098H16V17.938H19.2267H19.2308C19.3649 17.938 19.494 17.9182 19.617 17.8839C19.6717 18.0123 19.7989 18.1023 19.9473 18.1023C20.1456 18.1023 20.3062 17.9415 20.3062 17.7433C20.3062 17.6625 20.2787 17.5887 20.2336 17.5288C20.2418 17.5209 20.2498 17.5129 20.2577 17.5047C20.318 17.5508 20.3925 17.5791 20.4742 17.5791C20.6725 17.5791 20.8332 17.4184 20.8332 17.2201C20.8332 17.0709 20.742 16.9429 20.6125 16.8888L20.6151 16.8792L20.6174 16.8701L20.6208 16.8565L20.6315 16.8579C20.643 16.8595 20.6547 16.8611 20.6667 16.8611C20.865 16.8611 21.0256 16.7004 21.0256 16.5021C21.0256 16.3038 20.865 16.1432 20.6667 16.1432C20.6547 16.1432 20.643 16.1447 20.6315 16.1463L20.6208 16.1477C20.6197 16.1435 20.6186 16.1393 20.6176 16.135C20.616 16.1285 20.6143 16.1219 20.6125 16.1154C20.742 16.0613 20.8332 15.9334 20.8332 15.7842C20.8332 15.5859 20.6725 15.4252 20.4742 15.4252C20.3925 15.4252 20.318 15.4535 20.2577 15.4996L20.2454 15.487L20.2336 15.4755C20.2787 15.4156 20.3062 15.3418 20.3062 15.2609C20.3062 15.0628 20.1456 14.902 19.9473 14.902C19.7989 14.902 19.6717 14.992 19.617 15.1204C19.494 15.086 19.3649 15.0662 19.2308 15.0662H16.8663C17.3839 14.5612 18.0915 14.25 18.8718 14.25H27.4872V15.8713C27.4808 15.9983 27.4834 16.1414 27.4872 16.2957V24.3013C27.4872 25.8874 26.2015 27.1731 24.6154 27.1731H20.6581ZM10.2564 8.88675C10.2564 9.08505 10.4171 9.24572 10.6154 9.24572C10.8137 9.24572 10.9744 9.08505 10.9744 8.88675C10.9744 7.89699 10.1692 7.09188 9.17948 7.09188C8.18972 7.09188 7.38461 7.89699 7.38461 8.88675C7.38461 9.08505 7.54529 9.24572 7.74358 9.24572C7.94188 9.24572 8.10256 9.08505 8.10256 8.88675C8.10256 8.29286 8.58559 7.80983 9.17948 7.80983C9.77337 7.80983 10.2564 8.29286 10.2564 8.88675ZM19.4072 7.26418C19.4302 7.26849 19.4546 7.27136 19.4776 7.27136C19.5005 7.27136 19.5249 7.26849 19.5479 7.26418C19.5708 7.25987 19.5939 7.25269 19.6154 7.24408C19.6368 7.23546 19.657 7.22398 19.6772 7.21105C19.6958 7.19813 19.7143 7.18234 19.7317 7.16654C19.7976 7.10049 19.8365 7.00716 19.8365 6.91239C19.8365 6.88941 19.8335 6.865 19.8294 6.84203C19.825 6.81905 19.8179 6.79752 19.8093 6.77454C19.8006 6.753 19.7892 6.7329 19.7762 6.7128C19.7633 6.69413 19.7475 6.67546 19.7317 6.65823C19.7143 6.64244 19.6958 6.62664 19.6772 6.61372C19.657 6.6008 19.6368 6.58931 19.6154 6.5807C19.5939 6.57208 19.5708 6.5649 19.5479 6.56059C19.5005 6.55054 19.4532 6.55054 19.4072 6.56059C19.3842 6.5649 19.3611 6.57208 19.3397 6.5807C19.3182 6.58931 19.2981 6.6008 19.2778 6.61372C19.2592 6.62664 19.2406 6.64244 19.2233 6.65823C19.2076 6.67546 19.1918 6.69413 19.1789 6.7128C19.166 6.7329 19.1545 6.753 19.1457 6.77454C19.1373 6.79752 19.1301 6.81905 19.1258 6.84203C19.1215 6.865 19.1186 6.88941 19.1186 6.91239C19.1186 6.93536 19.1215 6.95977 19.1258 6.98275C19.1301 7.00572 19.1373 7.0287 19.1457 7.05023C19.1545 7.07177 19.166 7.09187 19.1789 7.11198C19.1915 7.13157 19.2068 7.14844 19.2221 7.16524L19.2233 7.16654C19.2406 7.18234 19.2592 7.19813 19.2778 7.21105C19.2981 7.22398 19.3182 7.23546 19.3397 7.24408C19.3611 7.25269 19.3842 7.25987 19.4072 7.26418ZM22.3494 7.09187C22.2546 7.09187 22.1627 7.0531 22.0951 6.98705C22.0794 6.96982 22.0636 6.95115 22.0507 6.93248C22.0378 6.91238 22.0263 6.89228 22.0175 6.87074C22.009 6.8492 22.0019 6.82623 21.9976 6.80325C21.9933 6.78028 21.9904 6.75587 21.9904 6.73289C21.9904 6.63812 22.0291 6.54622 22.0951 6.47874C22.1124 6.46294 22.131 6.44715 22.1496 6.43422C22.1699 6.4213 22.19 6.40981 22.2115 6.4012C22.2329 6.39258 22.256 6.3854 22.279 6.3811C22.3249 6.37105 22.3738 6.37105 22.4197 6.3811C22.4425 6.3854 22.4657 6.39258 22.4872 6.4012C22.5086 6.40981 22.5288 6.4213 22.5489 6.43422C22.5676 6.44715 22.5861 6.46294 22.6035 6.47874C22.6694 6.54622 22.7083 6.63812 22.7083 6.73289C22.7083 6.75587 22.7053 6.78028 22.7011 6.80325C22.6968 6.82623 22.6897 6.8492 22.681 6.87074C22.671 6.89228 22.6609 6.91238 22.648 6.93248C22.6351 6.95115 22.6193 6.96982 22.6035 6.98705C22.5861 7.00284 22.5676 7.01864 22.5489 7.03156C22.5288 7.04448 22.5086 7.05597 22.4872 7.06458C22.4657 7.0732 22.4425 7.08038 22.4197 7.08469C22.3967 7.08899 22.3723 7.09187 22.3494 7.09187ZM27.8439 10.1229C27.8446 10.123 27.8454 10.1232 27.8462 10.1232V10.4104C27.5805 10.4236 27.4257 10.7497 27.2622 11.0958L27.2619 11.0963C27.0772 11.4866 26.8684 11.9277 26.4286 11.9277C26.4206 11.9277 26.4126 11.9276 26.4044 11.9273C25.9638 11.9114 25.7535 11.4961 25.568 11.1295C25.3694 10.7368 25.2351 10.5017 24.9777 10.5078C24.7043 10.5171 24.55 10.8 24.3866 11.0996L24.3862 11.1002C24.1974 11.4468 23.9807 11.8387 23.532 11.8232C23.0983 11.8074 22.8873 11.4501 22.7011 11.1347V11.1345C22.5035 10.7998 22.3633 10.5964 22.1059 10.606C21.8262 10.6156 21.6797 10.8429 21.51 11.1062L21.5098 11.1065L21.5098 11.1065C21.32 11.4011 21.1056 11.7339 20.6602 11.7189C20.2349 11.7036 20.0235 11.4049 19.8373 11.1416C19.6412 10.8644 19.5115 10.6926 19.2349 10.7043C18.9478 10.7141 18.8019 10.8995 18.6329 11.1143C18.4423 11.3564 18.2229 11.6295 17.7897 11.615C17.7105 11.612 17.6484 11.5453 17.6514 11.4662C17.6543 11.3868 17.7208 11.3246 17.8001 11.3278C18.0904 11.3389 18.2287 11.1635 18.404 10.9409L18.4073 10.9367C18.5935 10.6999 18.8048 10.4315 19.2252 10.4172C19.6662 10.4024 19.8804 10.7053 20.0703 10.9737L20.0705 10.974L20.0716 10.9757C20.2409 11.2151 20.3873 11.4217 20.6706 11.4319C20.9333 11.443 21.0715 11.2566 21.2686 10.9507C21.455 10.6614 21.6662 10.3337 22.0961 10.3189C22.5395 10.3066 22.7588 10.6676 22.9485 10.9886C23.1186 11.277 23.2657 11.5261 23.5424 11.5362C23.8018 11.5464 23.9364 11.3257 24.1341 10.9627C24.3199 10.6219 24.5305 10.2357 24.9679 10.2207C25.4201 10.2049 25.6355 10.6274 25.8241 10.9997L25.8243 11.0001C25.9885 11.3243 26.1436 11.6305 26.4147 11.6403C26.6597 11.6483 26.8092 11.3821 27.0024 10.973L27.0025 10.9729L27.0026 10.9728C27.1878 10.5813 27.3977 10.1376 27.8413 10.1225C27.8419 10.1224 27.8425 10.1225 27.843 10.1226C27.8433 10.1227 27.8436 10.1228 27.8439 10.1229ZM22.0769 17.5H25.9231C25.9656 17.5 26 17.388 26 17.25C26 17.1118 25.9656 17 25.9231 17H22.0769C22.0344 17 22 17.1118 22 17.25C22 17.388 22.0344 17.5 22.0769 17.5ZM22.0769 18.5H25.9231C25.9656 18.5 26 18.388 26 18.25C26 18.1118 25.9656 18 25.9231 18H22.0769C22.0344 18 22 18.1118 22 18.25C22 18.388 22.0344 18.5 22.0769 18.5ZM25.9231 21.5H22.0769C22.0344 21.5 22 21.388 22 21.25C22 21.1118 22.0344 21 22.0769 21H25.9231C25.9656 21 26 21.1118 26 21.25C26 21.388 25.9656 21.5 25.9231 21.5ZM18.1537 19.5H25.8463C25.9313 19.5 26 19.388 26 19.25C26 19.1118 25.9313 19 25.8463 19H18.1537C18.0687 19 18 19.1118 18 19.25C18 19.388 18.0687 19.5 18.1537 19.5ZM25.8655 20.5H19.1345C19.0601 20.5 19 20.3883 19 20.25C19 20.1118 19.0601 20 19.1345 20H25.8655C25.9399 20 26 20.1118 26 20.25C26 20.3883 25.9399 20.5 25.8655 20.5Z",
    fill: "black"
  }));
};

function _extends$a() {
  _extends$a = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$a.apply(this, arguments);
}
var DoczIcon = _ref => {
  var props = _extends$a({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M10.8331 5.90909H30.1488C30.1326 4.36669 28.9595 3.26447 27.5141 3.26447H8.19835C9.6438 3.26447 10.8169 4.36669 10.8331 5.90909Z",
    fill: "#E2D9C5"
  }), React.createElement("path", {
    d: "M24.8688 5.87615C24.8688 4.43374 26.0486 3.26447 27.5041 3.26447H8.1891C6.7336 3.26447 5.55373 4.43374 5.55373 5.87615V27.3306H22.2334C23.6889 27.3306 24.8688 26.1613 24.8688 24.7189V5.87615Z",
    fill: "#F2EBDA"
  }), React.createElement("path", {
    d: "M24.4436 3.2654C22.984 3.2654 21.8008 4.44268 21.8008 5.89497V24.8669C21.8008 26.3191 20.6175 27.4964 19.1579 27.4964H22.3669C23.8265 27.4964 25.0098 26.3191 25.0098 24.8669V5.89497C25.0098 4.44268 26.193 3.2654 27.6526 3.2654H24.4436Z",
    fill: "#E2D9C5"
  }), React.createElement("path", {
    d: "M19.6658 24.7103H0.296005C0.312242 26.3352 1.48859 27.4964 2.9381 27.4964H22.3079C20.8583 27.4963 19.6821 26.3352 19.6658 24.7103Z",
    fill: "#E2D9C5"
  }), React.createElement("path", {
    d: "M18.2479 19.9256C18.783 18.2708 19.2641 16.5807 20.4008 15.2897C22.8837 12.47 27.8609 11.6416 31.4711 11.7341C30.3415 12.662 29.3568 13.6005 28.2157 14.829C26.9363 16.2063 24.1449 18.0391 22.8015 18.4501C20.7093 19.0903 19.7413 19.1973 18.2479 19.9256Z",
    fill: "#DDA064"
  }), React.createElement("path", {
    d: "M18.2479 19.9256C18.783 18.2696 27.8609 11.6357 31.4711 11.7282C30.3415 12.6568 29.3568 13.596 28.2157 14.8254C26.9363 16.2037 24.1449 18.0378 22.8015 18.4491C20.7093 19.0897 19.7413 19.1967 18.2479 19.9256Z",
    fill: "#B57947"
  }), React.createElement("path", {
    d: "M23.0083 7.89256C23.0083 7.67341 22.7998 7.49586 22.5427 7.49586H12.6309C12.3737 7.49586 12.1653 7.67347 12.1653 7.89256C12.1653 8.11165 12.3737 8.28925 12.6309 8.28925H22.5426C22.7997 8.28925 23.0083 8.11165 23.0083 7.89256Z",
    fill: "#1F2D3D"
  }), React.createElement("path", {
    d: "M8.42619 8.28925H10.0862C10.3581 8.28925 10.5785 8.11165 10.5785 7.89256C10.5785 7.67347 10.3581 7.49586 10.0862 7.49586H8.42619C8.15429 7.49586 7.93388 7.67347 7.93388 7.89256C7.93388 8.11165 8.15423 8.28925 8.42619 8.28925Z",
    fill: "#1F2D3D"
  }), React.createElement("path", {
    d: "M8.40085 21.7769C8.14294 21.7769 7.93388 21.9545 7.93388 22.1735C7.93388 22.3927 8.14294 22.5702 8.40085 22.5702H13.2851C13.543 22.5702 13.7521 22.3926 13.7521 22.1735C13.7521 21.9544 13.543 21.7769 13.2851 21.7769H8.40085Z",
    fill: "#1F2D3D"
  }), React.createElement("path", {
    d: "M15.8678 17.9422C15.8678 17.723 15.6545 17.5455 15.3914 17.5455H8.41021C8.14714 17.5455 7.93388 17.7231 7.93388 17.9422C7.93388 18.1613 8.14714 18.3388 8.41021 18.3388H15.3914C15.6545 18.3388 15.8678 18.1612 15.8678 17.9422Z",
    fill: "#1F2D3D"
  }), React.createElement("path", {
    d: "M19.3058 13.1818C19.3058 12.9627 19.0918 12.7851 18.8278 12.7851H8.41188C8.14788 12.7851 7.93388 12.9627 7.93388 13.1818C7.93388 13.4009 8.14788 13.5785 8.41188 13.5785H18.8278C19.0918 13.5786 19.3058 13.401 19.3058 13.1818Z",
    fill: "#1F2D3D"
  }), React.createElement("path", {
    d: "M24.9682 19.0931C24.7116 19.0931 24.5035 19.3037 24.5035 19.5636V25.2649C24.5035 26.4684 23.5365 27.4474 22.3479 27.4474H22.2894C21.074 27.4474 20.1476 26.4392 20.1345 25.1023C20.1319 24.8442 19.9246 24.6364 19.6698 24.6364H6.22791V6.12356C6.22791 4.92002 7.19494 3.94099 8.38352 3.94099H25.3836C25.3699 3.95509 25.3571 3.96989 25.3437 3.9843C25.3275 4.0018 25.3111 4.0191 25.2952 4.0369C25.2784 4.05577 25.2623 4.07514 25.246 4.09445C25.2303 4.11295 25.2145 4.13125 25.1993 4.15012C25.1835 4.16968 25.1684 4.18974 25.153 4.20968C25.1382 4.22899 25.1232 4.24811 25.1088 4.26779C25.094 4.28798 25.0799 4.3086 25.0656 4.32917C25.0516 4.34935 25.0373 4.36941 25.0237 4.38991C25.01 4.41066 24.9969 4.43185 24.9838 4.45298C24.9706 4.47398 24.9572 4.49479 24.9445 4.51611C24.9317 4.53755 24.9197 4.55943 24.9075 4.58118C24.8953 4.60281 24.8828 4.62431 24.8711 4.64632C24.8594 4.66832 24.8485 4.69083 24.8373 4.71321C24.8261 4.73553 24.8145 4.75766 24.8039 4.78022C24.7932 4.80292 24.7833 4.82605 24.7731 4.849C24.763 4.87188 24.7525 4.89457 24.7429 4.9177C24.7332 4.94109 24.7244 4.96491 24.7152 4.98854C24.7062 5.01187 24.6968 5.035 24.6883 5.05857C24.6796 5.08277 24.6719 5.10741 24.6638 5.13192C24.656 5.15549 24.6477 5.17881 24.6404 5.20263C24.6327 5.22771 24.6261 5.25322 24.6191 5.27861C24.6125 5.30231 24.6054 5.32582 24.5994 5.34977C24.5927 5.3761 24.5872 5.4028 24.5812 5.42939C24.5759 5.45277 24.5701 5.47603 24.5654 5.4996C24.5598 5.52724 24.5554 5.55521 24.5506 5.5831C24.5466 5.60617 24.542 5.62899 24.5386 5.65219C24.5341 5.68197 24.5309 5.71212 24.5272 5.74215C24.5246 5.76384 24.5214 5.78528 24.5192 5.8071C24.5158 5.8407 24.5138 5.87468 24.5115 5.90859C24.5103 5.92721 24.5083 5.9457 24.5074 5.96439C24.5048 6.01711 24.5034 6.07021 24.5034 6.12362V6.28154V10.2996C24.5034 10.5595 24.7114 10.7701 24.9681 10.7701C25.2247 10.7701 25.4328 10.5594 25.4328 10.2996V6.75203H30.213C30.3371 6.75203 30.456 6.70182 30.5432 6.61261C30.6305 6.52334 30.679 6.40247 30.6777 6.2769C30.6593 4.40872 29.3334 3 27.5884 3H8.38333C6.6822 3 5.29827 4.40126 5.29827 6.12362V24.6364H0.464657C0.340636 24.6364 0.221691 24.6866 0.134449 24.7758C0.047145 24.8651 -0.00127475 24.986 2.55278e-05 25.1115C0.0183532 26.9797 1.34432 28.3884 3.08434 28.3884H22.2894H22.3479C24.049 28.3884 25.433 26.9872 25.433 25.2648V19.5635C25.433 19.3037 25.2249 19.0931 24.9682 19.0931ZM25.4566 5.80114C25.4587 5.78678 25.4613 5.77255 25.4637 5.75832C25.4671 5.73826 25.4705 5.7182 25.4744 5.69826C25.4774 5.68309 25.4807 5.66805 25.484 5.653C25.4881 5.63432 25.4922 5.6157 25.4967 5.59721C25.5006 5.58166 25.5047 5.56618 25.5088 5.55075C25.5136 5.53314 25.5185 5.51552 25.5236 5.49809C25.5283 5.4823 25.5332 5.46662 25.5382 5.45101C25.5435 5.43434 25.5491 5.41779 25.5548 5.40124C25.5604 5.38525 25.566 5.36927 25.572 5.35347C25.5778 5.33786 25.5839 5.32243 25.5901 5.30695C25.5966 5.29065 25.6031 5.27441 25.6101 5.2583C25.6162 5.24395 25.6227 5.22978 25.6291 5.21561C25.6367 5.19887 25.6443 5.18201 25.6523 5.16552C25.6582 5.15323 25.6646 5.1412 25.6708 5.12903C25.68 5.11098 25.689 5.09293 25.6987 5.07518C25.7024 5.06829 25.7065 5.06164 25.7102 5.05481C25.7532 4.97789 25.8003 4.90366 25.8518 4.83288C25.8523 4.83219 25.8527 4.83157 25.8532 4.83088C25.8698 4.80818 25.887 4.78593 25.9044 4.76386C25.9071 4.76035 25.9098 4.75678 25.9126 4.75327C25.9296 4.73195 25.9472 4.71108 25.965 4.69045C25.9683 4.68663 25.9715 4.68274 25.9749 4.67892C25.993 4.65823 26.0115 4.63798 26.0304 4.61798C26.0335 4.61472 26.0365 4.6114 26.0396 4.60814C26.0592 4.5877 26.0791 4.56758 26.0995 4.54789C26.1017 4.5457 26.104 4.5435 26.1063 4.54125C26.1278 4.52069 26.1495 4.5005 26.1718 4.48081C26.1726 4.48012 26.1734 4.4795 26.1741 4.47881C26.4587 4.22786 26.8089 4.05088 27.1954 3.97804C27.1956 3.97797 27.1958 3.97797 27.196 3.97791C27.2277 3.97195 27.2596 3.96669 27.2917 3.96217C27.2937 3.96192 27.2956 3.96167 27.2975 3.96142C27.3282 3.95716 27.359 3.95352 27.39 3.95058C27.3947 3.95014 27.3995 3.94989 27.4043 3.94951C27.4327 3.947 27.4612 3.94487 27.4899 3.94349C27.5065 3.94274 27.5232 3.94262 27.5399 3.94218C27.5579 3.94174 27.5758 3.94092 27.5938 3.94092C28.6603 3.94092 29.5043 4.71735 29.704 5.81092H25.4557C25.4559 5.80772 25.4562 5.8044 25.4566 5.80114ZM3.08428 27.4474C2.0178 27.4474 1.1738 26.671 0.974117 25.5774H5.76315H19.2375C19.2438 25.6262 19.2513 25.6744 19.2595 25.7223C19.2622 25.7383 19.2656 25.754 19.2686 25.77C19.2744 25.8017 19.2803 25.8333 19.287 25.8646C19.291 25.8833 19.2955 25.9017 19.2997 25.9203C19.3061 25.9484 19.3126 25.9766 19.3198 26.0044C19.3247 26.0239 19.3301 26.0432 19.3354 26.0625C19.3426 26.0889 19.3499 26.1153 19.3577 26.1415C19.3635 26.1611 19.3697 26.1806 19.3759 26.2C19.3839 26.2255 19.3923 26.2508 19.4009 26.2759C19.4075 26.2953 19.4142 26.3146 19.4212 26.3338C19.4303 26.3588 19.4396 26.3835 19.4492 26.408C19.4565 26.4267 19.4638 26.4454 19.4713 26.4639C19.4816 26.4888 19.4922 26.5134 19.5029 26.5379C19.5106 26.5555 19.5182 26.5732 19.5262 26.5907C19.538 26.6164 19.5503 26.6417 19.5627 26.6669C19.5703 26.6826 19.5777 26.6984 19.5856 26.714C19.6007 26.7436 19.6165 26.7728 19.6324 26.8019C19.6382 26.8125 19.6437 26.8232 19.6496 26.8337C19.6717 26.8731 19.6945 26.9118 19.7181 26.9499C19.7236 26.9588 19.7295 26.9674 19.7351 26.9762C19.7535 27.0054 19.7721 27.0343 19.7914 27.0627C19.8003 27.0758 19.8096 27.0885 19.8186 27.1015C19.8352 27.1252 19.8518 27.1488 19.869 27.172C19.8794 27.1859 19.89 27.1994 19.9005 27.2132C19.9171 27.2348 19.9338 27.2564 19.9509 27.2774C19.9622 27.2913 19.9736 27.3049 19.9851 27.3186C20.0022 27.3391 20.0195 27.3592 20.0371 27.3792C20.0489 27.3926 20.0609 27.4058 20.073 27.419C20.0816 27.4284 20.0899 27.4382 20.0986 27.4474H3.08428Z",
    fill: "#1F2D3D"
  }), React.createElement("path", {
    d: "M31.9996 11.6717C31.9995 11.6663 31.9994 11.6608 31.9992 11.6553C31.9973 11.6111 31.9893 11.5685 31.9758 11.5282C31.9752 11.5262 31.975 11.5241 31.9743 11.5222C31.9737 11.5205 31.9727 11.519 31.9722 11.5174C31.9647 11.4968 31.9561 11.4768 31.946 11.4576C31.9448 11.4552 31.9433 11.453 31.9421 11.4507C31.9327 11.4337 31.9224 11.4175 31.9111 11.4019C31.9087 11.3986 31.9064 11.3952 31.9039 11.3919C31.8915 11.3756 31.878 11.3602 31.8635 11.3457C31.8604 11.3425 31.857 11.3395 31.8538 11.3365C31.8402 11.3235 31.8258 11.3112 31.8106 11.2999C31.8086 11.2984 31.8067 11.2967 31.8046 11.2952C31.7876 11.2829 31.7696 11.272 31.7509 11.262C31.7473 11.26 31.7437 11.2583 31.7401 11.2564C31.7211 11.2469 31.7016 11.2382 31.6812 11.2313C31.6811 11.2312 31.681 11.2311 31.6809 11.2311C31.6606 11.2243 31.6396 11.2191 31.6182 11.2149C31.6134 11.2139 31.6087 11.2131 31.6039 11.2124C31.5825 11.2088 31.5608 11.2062 31.5385 11.2057C27.5744 11.1039 22.4054 12.0506 19.7921 15.0104C18.6484 16.3058 18.1206 17.9491 17.6103 19.5383C17.5686 19.6684 17.5268 19.7984 17.4847 19.9282C17.483 19.9337 17.4813 19.9392 17.4797 19.9448L16.679 22.7661C16.6081 23.0159 16.7548 23.2756 17.0066 23.346C17.0495 23.358 17.0928 23.3636 17.1353 23.3636C17.3421 23.3636 17.5323 23.2281 17.5911 23.0208L18.3337 20.4041C19.2415 19.982 19.9725 19.7846 20.9599 19.5182C21.4721 19.3799 22.0526 19.2234 22.7551 19.009C24.2739 18.5455 27.1875 16.6066 28.5284 15.1669C29.7011 13.9077 30.688 12.9719 31.828 12.038C31.8293 12.0369 31.8303 12.0356 31.8317 12.0345C31.8483 12.0205 31.864 12.0057 31.8786 11.9896C31.8795 11.9886 31.8804 11.9877 31.8813 11.9867C31.8956 11.9707 31.9086 11.9534 31.9207 11.9353C31.9229 11.932 31.925 11.9287 31.9272 11.9253C31.9499 11.8894 31.9678 11.8504 31.9802 11.8088C31.9814 11.8049 31.9825 11.801 31.9836 11.797C31.9891 11.7766 31.9936 11.7558 31.9964 11.7344C31.9965 11.7335 31.9965 11.7327 31.9965 11.7318C31.9983 11.7173 31.9996 11.7025 32 11.6876C32.0001 11.6822 31.9996 11.677 31.9996 11.6717ZM20.5049 15.6298C21.6076 14.3808 23.2978 13.4393 25.5285 12.8316C26.128 12.6683 26.7615 12.5327 27.4144 12.4258C25.7554 13.224 24.1691 14.2237 23.2827 14.8112C21.8521 15.7594 20.3078 16.9096 19.1674 17.9325C19.5048 17.0844 19.9128 16.3004 20.5049 15.6298ZM27.8325 14.5289C26.5275 15.9301 23.7089 17.7344 22.4766 18.1103C21.7889 18.3201 21.2164 18.4747 20.7112 18.611C20.2541 18.7343 19.8383 18.8467 19.4271 18.9762C19.6111 18.8014 19.8267 18.6054 20.0809 18.3854C21.1039 17.5001 22.4279 16.5084 23.809 15.593C26.2003 14.0081 28.3643 12.8955 29.952 12.4132C29.2625 13.0433 28.5843 13.7217 27.8325 14.5289Z",
    fill: "#1F2D3D"
  }));
};
var DoczIconDark = _ref2 => {
  var props = _extends$a({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M11.156 6.53977H29.2645C29.2493 5.09377 28.1495 4.06043 26.7944 4.06043H8.68594C10.0411 4.06043 11.1408 5.09377 11.156 6.53977Z",
    fill: "black",
    fillOpacity: "0.8"
  }), React.createElement("path", {
    d: "M19.4367 24.1659H1.2775C1.29273 25.6892 2.39556 26.7778 3.75447 26.7778H21.9137C20.5547 26.7778 19.4519 25.6892 19.4367 24.1659Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M27.25 3.8125C25.8824 3.8125 24.7738 4.95123 24.7738 6.35596V24.7065C24.7738 26.1113 23.6651 27.25 22.2975 27.25H6.625V6.35596C6.625 4.95123 7.73363 3.8125 9.10124 3.8125H27.25ZM22.1337 8.02737C22.3748 8.02737 22.5703 8.19382 22.5703 8.39927C22.5703 8.60467 22.3748 8.77117 22.1337 8.77117H12.8415C12.6004 8.77117 12.405 8.60467 12.405 8.39927C12.405 8.19387 12.6004 8.02737 12.8415 8.02737H22.1337ZM8.89956 8.77117H10.4558C10.7107 8.77117 10.9174 8.60467 10.9174 8.39927C10.9174 8.19387 10.7107 8.02737 10.4558 8.02737H8.89956C8.64465 8.02737 8.43802 8.19387 8.43802 8.39927C8.43802 8.60467 8.64459 8.77117 8.89956 8.77117ZM8.43802 21.7877C8.43802 21.5823 8.63401 21.4158 8.8758 21.4158H13.4548C13.6966 21.4158 13.8926 21.5823 13.8926 21.7877C13.8926 21.9931 13.6966 22.1596 13.4548 22.1596H8.8758C8.63401 22.1596 8.43802 21.9932 8.43802 21.7877ZM15.876 17.8208C15.876 17.6153 15.6761 17.4489 15.4295 17.4489H8.88457C8.63794 17.4489 8.43802 17.6154 8.43802 17.8208C8.43802 18.0262 8.63794 18.1927 8.88457 18.1927H15.4295C15.676 18.1927 15.876 18.0262 15.876 17.8208ZM18.651 12.9861C18.8985 12.9861 19.0992 13.1525 19.0992 13.358C19.0992 13.5634 18.8985 13.7299 18.651 13.7299H8.88614C8.63864 13.7299 8.43802 13.5634 8.43802 13.358C8.43802 13.1526 8.63864 12.9861 8.88614 12.9861H18.651Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M24.4077 18.8998C24.1671 18.8998 23.9721 19.0973 23.9721 19.3409V24.6858C23.9721 25.8141 23.0655 26.732 21.9512 26.732H21.8963C20.7569 26.732 19.8884 25.7867 19.8761 24.5334C19.8737 24.2915 19.6793 24.0966 19.4404 24.0966H6.83867V6.74084C6.83867 5.61252 7.74526 4.69467 8.85955 4.69467H24.7971C24.7843 4.7079 24.7722 4.72177 24.7597 4.73529C24.7445 4.75168 24.7291 4.7679 24.7143 4.7846C24.6985 4.80229 24.6834 4.82045 24.6681 4.83855C24.6534 4.85589 24.6386 4.87305 24.6243 4.89074C24.6095 4.90908 24.5954 4.92788 24.581 4.94657C24.567 4.96467 24.553 4.9826 24.5395 5.00105C24.5257 5.01998 24.5124 5.03932 24.499 5.05859C24.4858 5.07752 24.4725 5.09632 24.4597 5.11554C24.4469 5.135 24.4346 5.15486 24.4223 5.17467C24.4099 5.19436 24.3974 5.21387 24.3855 5.23385C24.3735 5.25395 24.3623 5.27446 24.3508 5.29486C24.3394 5.31513 24.3277 5.33529 24.3167 5.35592C24.3057 5.37655 24.2954 5.39765 24.2849 5.41863C24.2744 5.43956 24.2636 5.4603 24.2536 5.48146C24.2436 5.50274 24.2344 5.52442 24.2248 5.54593C24.2153 5.56739 24.2055 5.58866 24.1965 5.61035C24.1874 5.63227 24.1791 5.6546 24.1705 5.67676C24.162 5.69862 24.1533 5.72031 24.1453 5.74241C24.1371 5.7651 24.1299 5.78819 24.1223 5.81117C24.115 5.83327 24.1072 5.85513 24.1004 5.87747C24.0932 5.90098 24.087 5.9249 24.0804 5.9487C24.0742 5.97092 24.0676 5.99296 24.0619 6.01541C24.0557 6.04009 24.0505 6.06513 24.0448 6.09005C24.0399 6.11197 24.0345 6.13377 24.03 6.15587C24.0248 6.18179 24.0207 6.208 24.0162 6.23416C24.0125 6.25579 24.0082 6.27718 24.0049 6.29893C24.0007 6.32684 23.9977 6.35511 23.9943 6.38326C23.9918 6.4036 23.9888 6.4237 23.9867 6.44415C23.9836 6.47565 23.9817 6.50751 23.9795 6.5393C23.9784 6.55676 23.9765 6.5741 23.9757 6.59161C23.9732 6.64104 23.9719 6.69082 23.9719 6.74089V6.88894V10.6558C23.9719 10.8995 24.167 11.0969 24.4076 11.0969C24.6482 11.0969 24.8432 10.8995 24.8432 10.6558V7.33003H29.3247C29.441 7.33003 29.5525 7.28295 29.6343 7.19932C29.7161 7.11563 29.7615 7.00231 29.7603 6.88459C29.7431 5.13318 28.5 3.8125 26.8641 3.8125H8.85937C7.26456 3.8125 5.96713 5.12618 5.96713 6.74089V24.0966H1.43562C1.31935 24.0966 1.20784 24.1437 1.12605 24.2273C1.0442 24.311 0.998809 24.4243 1.00002 24.5421C1.01721 26.2935 2.2603 27.6142 3.89157 27.6142H21.8963H21.9512C23.546 27.6142 24.8434 26.3005 24.8434 24.6858V19.3408C24.8434 19.0972 24.6483 18.8998 24.4077 18.8998ZM24.8656 6.43857C24.8676 6.42511 24.87 6.41177 24.8723 6.39843C24.8754 6.37962 24.8786 6.36081 24.8822 6.34212C24.885 6.3279 24.8882 6.3138 24.8912 6.29969C24.8951 6.28218 24.899 6.26472 24.9032 6.24738C24.9068 6.23281 24.9106 6.21829 24.9145 6.20383C24.919 6.18732 24.9236 6.1708 24.9284 6.15446C24.9327 6.13965 24.9373 6.12496 24.942 6.11033C24.947 6.09469 24.9523 6.07918 24.9577 6.06366C24.9629 6.04867 24.9682 6.03369 24.9737 6.01888C24.9792 6.00424 24.9849 5.98978 24.9907 5.97527C24.9968 5.95999 25.0029 5.94476 25.0094 5.92966C25.0152 5.9162 25.0213 5.90292 25.0273 5.88963C25.0344 5.87394 25.0415 5.85813 25.049 5.84268C25.0546 5.83116 25.0606 5.81987 25.0664 5.80847C25.075 5.79154 25.0834 5.77462 25.0925 5.75798C25.096 5.75152 25.0998 5.74529 25.1034 5.73888C25.1436 5.66677 25.1878 5.59718 25.236 5.53083C25.2365 5.53018 25.2369 5.52959 25.2374 5.52895C25.2529 5.50767 25.269 5.48681 25.2853 5.46612C25.2879 5.46283 25.2904 5.45948 25.2931 5.45619C25.309 5.43621 25.3255 5.41663 25.3422 5.3973C25.3452 5.39371 25.3483 5.39007 25.3514 5.38648C25.3684 5.36709 25.3858 5.34811 25.4035 5.32936C25.4064 5.3263 25.4092 5.32319 25.4122 5.32013C25.4305 5.30097 25.4492 5.2821 25.4682 5.26365C25.4704 5.26159 25.4725 5.25954 25.4747 5.25742C25.4948 5.23814 25.5152 5.21922 25.5361 5.20076C25.5368 5.20012 25.5375 5.19953 25.5382 5.19888C25.805 4.96362 26.1334 4.7977 26.4957 4.72941C26.4959 4.72935 26.4961 4.72935 26.4963 4.72929C26.5259 4.72371 26.5559 4.71877 26.586 4.71454C26.5878 4.7143 26.5896 4.71407 26.5914 4.71383C26.6201 4.70984 26.6491 4.70643 26.6781 4.70367C26.6825 4.70325 26.687 4.70302 26.6915 4.70267C26.7181 4.70032 26.7448 4.69832 26.7718 4.69702C26.7873 4.69632 26.803 4.6962 26.8187 4.69579C26.8355 4.69538 26.8523 4.69462 26.8692 4.69462C27.869 4.69462 28.6603 5.42251 28.8475 6.44774H24.8647C24.8649 6.44474 24.8652 6.44163 24.8656 6.43857ZM3.89151 26.732C2.89169 26.732 2.10044 26.0041 1.91324 24.9789H6.40296H19.0351C19.0411 25.0245 19.0481 25.0697 19.0558 25.1146C19.0583 25.1297 19.0615 25.1444 19.0643 25.1594C19.0698 25.1891 19.0753 25.2188 19.0816 25.248C19.0853 25.2656 19.0895 25.2829 19.0935 25.3003C19.0995 25.3267 19.1056 25.3531 19.1123 25.3791C19.1169 25.3974 19.122 25.4155 19.1269 25.4336C19.1337 25.4584 19.1405 25.4831 19.1479 25.5076C19.1533 25.526 19.1591 25.5443 19.1649 25.5625C19.1724 25.5864 19.1803 25.6101 19.1883 25.6337C19.1945 25.6519 19.2009 25.67 19.2074 25.6879C19.2159 25.7113 19.2247 25.7345 19.2337 25.7575C19.2405 25.775 19.2473 25.7926 19.2544 25.8099C19.264 25.8332 19.2739 25.8563 19.284 25.8793C19.2912 25.8958 19.2983 25.9124 19.3058 25.9287C19.3168 25.9528 19.3284 25.9766 19.34 26.0003C19.3472 26.015 19.3541 26.0298 19.3615 26.0443C19.3757 26.0721 19.3905 26.0995 19.4054 26.1267C19.4108 26.1367 19.416 26.1468 19.4215 26.1566C19.4422 26.1935 19.4636 26.2298 19.4858 26.2656C19.4909 26.2739 19.4964 26.2819 19.5017 26.2902C19.5189 26.3175 19.5364 26.3447 19.5544 26.3713C19.5628 26.3836 19.5715 26.3955 19.58 26.4077C19.5955 26.4299 19.6111 26.452 19.6272 26.4737C19.6369 26.4868 19.6468 26.4995 19.6567 26.5123C19.6723 26.5326 19.6879 26.5528 19.704 26.5726C19.7145 26.5856 19.7253 26.5984 19.736 26.6112C19.752 26.6304 19.7683 26.6493 19.7848 26.668C19.7958 26.6806 19.8071 26.693 19.8184 26.7053C19.8265 26.7141 19.8343 26.7233 19.8425 26.732H3.89151Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M30.9996 11.9422C30.9995 11.9371 30.9994 11.932 30.9993 11.9269C30.9975 11.8854 30.99 11.8455 30.9774 11.8077C30.9768 11.8058 30.9765 11.8039 30.9759 11.802C30.9753 11.8005 30.9745 11.7991 30.9739 11.7976C30.9669 11.7783 30.9589 11.7595 30.9494 11.7415C30.9482 11.7393 30.9469 11.7372 30.9457 11.735C30.9369 11.7191 30.9272 11.7039 30.9166 11.6893C30.9144 11.6862 30.9123 11.683 30.91 11.6799C30.8983 11.6646 30.8856 11.6502 30.8721 11.6366C30.8691 11.6336 30.866 11.6308 30.863 11.6279C30.8502 11.6157 30.8367 11.6043 30.8225 11.5937C30.8206 11.5923 30.8188 11.5907 30.8169 11.5893C30.8009 11.5777 30.784 11.5675 30.7665 11.5581C30.7631 11.5563 30.7598 11.5546 30.7563 11.5529C30.7385 11.544 30.7203 11.5358 30.7012 11.5293C30.701 11.5293 30.7009 11.5292 30.7008 11.5292C30.6818 11.5227 30.6621 11.5179 30.642 11.5139C30.6376 11.513 30.6332 11.5123 30.6287 11.5116C30.6086 11.5083 30.5882 11.5058 30.5674 11.5053C26.851 11.4099 22.005 12.2975 19.5551 15.0723C18.4828 16.2867 17.9881 17.8273 17.5097 19.3172C17.4705 19.4391 17.4314 19.561 17.3919 19.6827C17.3903 19.6878 17.3887 19.693 17.3872 19.6982L16.6366 22.3432C16.5701 22.5774 16.7076 22.8209 16.9437 22.8869C16.9839 22.8981 17.0245 22.9034 17.0643 22.9034C17.2582 22.9034 17.4365 22.7764 17.4916 22.582L18.1878 20.1288C19.0389 19.7331 19.7242 19.548 20.6499 19.2983C21.1301 19.1687 21.6743 19.0219 22.3329 18.8209C23.7568 18.3864 26.4883 16.5687 27.7454 15.219C28.8448 14.0385 29.77 13.1612 30.8388 12.2856C30.84 12.2846 30.8409 12.2834 30.8422 12.2823C30.8578 12.2692 30.8725 12.2553 30.8862 12.2402C30.887 12.2393 30.8879 12.2385 30.8887 12.2376C30.9021 12.2225 30.9143 12.2063 30.9256 12.1894C30.9277 12.1863 30.9297 12.1831 30.9317 12.18C30.953 12.1463 30.9698 12.1098 30.9814 12.0708C30.9826 12.0671 30.9836 12.0634 30.9846 12.0597C30.9898 12.0405 30.994 12.021 30.9966 12.001C30.9967 12.0001 30.9967 11.9994 30.9968 11.9986C30.9984 11.9849 30.9996 11.9711 31 11.9572C31.0001 11.9521 30.9997 11.9472 30.9996 11.9422ZM20.2233 15.653C21.2571 14.482 22.8417 13.5994 24.9329 13.0296C25.495 12.8765 26.0889 12.7494 26.701 12.6492C25.1457 13.3975 23.6586 14.3347 22.8275 14.8855C21.4863 15.7744 20.0386 16.8527 18.9694 17.8117C19.2858 17.0166 19.6683 16.2816 20.2233 15.653ZM27.093 14.6208C25.8695 15.9344 23.2271 17.626 22.0718 17.9784C21.4271 18.1751 20.8904 18.32 20.4168 18.4478C19.9883 18.5634 19.5984 18.6687 19.2129 18.7902C19.3854 18.6263 19.5875 18.4426 19.8259 18.2363C20.7849 17.4063 22.0262 16.4766 23.3209 15.6184C25.5628 14.1326 27.5916 13.0896 29.08 12.6374C28.4336 13.2281 27.7978 13.8641 27.093 14.6208Z",
    fill: "black"
  }));
};
var DoczIconLight = _ref3 => {
  var props = _extends$a({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M11.156 6.53977H29.2645C29.2493 5.09377 28.1495 4.06043 26.7944 4.06043H8.68594C10.0411 4.06043 11.1408 5.09377 11.156 6.53977Z",
    fill: "white",
    fillOpacity: "0.8"
  }), React.createElement("path", {
    d: "M19.4367 24.1659H1.2775C1.29273 25.6892 2.39556 26.7778 3.75447 26.7778H21.9137C20.5547 26.7778 19.4519 25.6892 19.4367 24.1659Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M27.25 3.8125C25.8824 3.8125 24.7738 4.95123 24.7738 6.35596V24.7065C24.7738 26.1113 23.6651 27.25 22.2975 27.25H6.625V6.35596C6.625 4.95123 7.73363 3.8125 9.10124 3.8125H27.25ZM22.1337 8.02737C22.3748 8.02737 22.5703 8.19382 22.5703 8.39927C22.5703 8.60467 22.3748 8.77117 22.1337 8.77117H12.8415C12.6004 8.77117 12.405 8.60467 12.405 8.39927C12.405 8.19387 12.6004 8.02737 12.8415 8.02737H22.1337ZM8.89956 8.77117H10.4558C10.7107 8.77117 10.9174 8.60467 10.9174 8.39927C10.9174 8.19387 10.7107 8.02737 10.4558 8.02737H8.89956C8.64465 8.02737 8.43802 8.19387 8.43802 8.39927C8.43802 8.60467 8.64459 8.77117 8.89956 8.77117ZM8.43802 21.7877C8.43802 21.5823 8.63401 21.4158 8.8758 21.4158H13.4548C13.6966 21.4158 13.8926 21.5823 13.8926 21.7877C13.8926 21.9931 13.6966 22.1596 13.4548 22.1596H8.8758C8.63401 22.1596 8.43802 21.9932 8.43802 21.7877ZM15.876 17.8208C15.876 17.6153 15.6761 17.4489 15.4295 17.4489H8.88457C8.63794 17.4489 8.43802 17.6154 8.43802 17.8208C8.43802 18.0262 8.63794 18.1927 8.88457 18.1927H15.4295C15.676 18.1927 15.876 18.0262 15.876 17.8208ZM18.651 12.9861C18.8985 12.9861 19.0992 13.1525 19.0992 13.358C19.0992 13.5634 18.8985 13.7299 18.651 13.7299H8.88614C8.63864 13.7299 8.43802 13.5634 8.43802 13.358C8.43802 13.1526 8.63864 12.9861 8.88614 12.9861H18.651Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M24.4077 18.8998C24.1671 18.8998 23.9721 19.0973 23.9721 19.3409V24.6858C23.9721 25.8141 23.0655 26.732 21.9512 26.732H21.8963C20.7569 26.732 19.8884 25.7867 19.8761 24.5334C19.8737 24.2915 19.6793 24.0966 19.4404 24.0966H6.83867V6.74084C6.83867 5.61252 7.74526 4.69467 8.85955 4.69467H24.7971C24.7843 4.7079 24.7722 4.72177 24.7597 4.73529C24.7445 4.75168 24.7291 4.7679 24.7143 4.7846C24.6985 4.80229 24.6834 4.82045 24.6681 4.83855C24.6534 4.85589 24.6386 4.87305 24.6243 4.89074C24.6095 4.90908 24.5954 4.92788 24.581 4.94657C24.567 4.96467 24.553 4.9826 24.5395 5.00105C24.5257 5.01998 24.5124 5.03932 24.499 5.05859C24.4858 5.07752 24.4725 5.09632 24.4597 5.11554C24.4469 5.135 24.4346 5.15486 24.4223 5.17467C24.4099 5.19436 24.3974 5.21387 24.3855 5.23385C24.3735 5.25395 24.3623 5.27446 24.3508 5.29486C24.3394 5.31513 24.3277 5.33529 24.3167 5.35592C24.3057 5.37655 24.2954 5.39765 24.2849 5.41863C24.2744 5.43956 24.2636 5.4603 24.2536 5.48146C24.2436 5.50274 24.2344 5.52442 24.2248 5.54593C24.2153 5.56739 24.2055 5.58866 24.1965 5.61035C24.1874 5.63227 24.1791 5.6546 24.1705 5.67676C24.162 5.69862 24.1533 5.72031 24.1453 5.74241C24.1371 5.7651 24.1299 5.78819 24.1223 5.81117C24.115 5.83327 24.1072 5.85513 24.1004 5.87747C24.0932 5.90098 24.087 5.9249 24.0804 5.9487C24.0742 5.97092 24.0676 5.99296 24.0619 6.01541C24.0557 6.04009 24.0505 6.06513 24.0448 6.09005C24.0399 6.11197 24.0345 6.13377 24.03 6.15587C24.0248 6.18179 24.0207 6.208 24.0162 6.23416C24.0125 6.25579 24.0082 6.27718 24.0049 6.29893C24.0007 6.32684 23.9977 6.35511 23.9943 6.38326C23.9918 6.4036 23.9888 6.4237 23.9867 6.44415C23.9836 6.47565 23.9817 6.50751 23.9795 6.5393C23.9784 6.55676 23.9765 6.5741 23.9757 6.59161C23.9732 6.64104 23.9719 6.69082 23.9719 6.74089V6.88894V10.6558C23.9719 10.8995 24.167 11.0969 24.4076 11.0969C24.6482 11.0969 24.8432 10.8995 24.8432 10.6558V7.33003H29.3247C29.441 7.33003 29.5525 7.28295 29.6343 7.19932C29.7161 7.11563 29.7615 7.00231 29.7603 6.88459C29.7431 5.13318 28.5 3.8125 26.8641 3.8125H8.85937C7.26456 3.8125 5.96713 5.12618 5.96713 6.74089V24.0966H1.43562C1.31935 24.0966 1.20784 24.1437 1.12605 24.2273C1.0442 24.311 0.998809 24.4243 1.00002 24.5421C1.01721 26.2935 2.2603 27.6142 3.89157 27.6142H21.8963H21.9512C23.546 27.6142 24.8434 26.3005 24.8434 24.6858V19.3408C24.8434 19.0972 24.6483 18.8998 24.4077 18.8998ZM24.8656 6.43857C24.8676 6.42511 24.87 6.41177 24.8723 6.39843C24.8754 6.37962 24.8786 6.36081 24.8822 6.34212C24.885 6.3279 24.8882 6.3138 24.8912 6.29969C24.8951 6.28218 24.899 6.26472 24.9032 6.24738C24.9068 6.23281 24.9106 6.21829 24.9145 6.20383C24.919 6.18732 24.9236 6.1708 24.9284 6.15446C24.9327 6.13965 24.9373 6.12496 24.942 6.11033C24.947 6.09469 24.9523 6.07918 24.9577 6.06366C24.9629 6.04867 24.9682 6.03369 24.9737 6.01888C24.9792 6.00424 24.9849 5.98978 24.9907 5.97527C24.9968 5.95999 25.0029 5.94476 25.0094 5.92966C25.0152 5.9162 25.0213 5.90292 25.0273 5.88963C25.0344 5.87394 25.0415 5.85813 25.049 5.84268C25.0546 5.83116 25.0606 5.81987 25.0664 5.80847C25.075 5.79154 25.0834 5.77462 25.0925 5.75798C25.096 5.75152 25.0998 5.74529 25.1034 5.73888C25.1436 5.66677 25.1878 5.59718 25.236 5.53083C25.2365 5.53018 25.2369 5.52959 25.2374 5.52895C25.2529 5.50767 25.269 5.48681 25.2853 5.46612C25.2879 5.46283 25.2904 5.45948 25.2931 5.45619C25.309 5.43621 25.3255 5.41663 25.3422 5.3973C25.3452 5.39371 25.3483 5.39007 25.3514 5.38648C25.3684 5.36709 25.3858 5.34811 25.4035 5.32936C25.4064 5.3263 25.4092 5.32319 25.4122 5.32013C25.4305 5.30097 25.4492 5.2821 25.4682 5.26365C25.4704 5.26159 25.4725 5.25954 25.4747 5.25742C25.4948 5.23814 25.5152 5.21922 25.5361 5.20076C25.5368 5.20012 25.5375 5.19953 25.5382 5.19888C25.805 4.96362 26.1334 4.7977 26.4957 4.72941C26.4959 4.72935 26.4961 4.72935 26.4963 4.72929C26.5259 4.72371 26.5559 4.71877 26.586 4.71454C26.5878 4.7143 26.5896 4.71407 26.5914 4.71383C26.6201 4.70984 26.6491 4.70643 26.6781 4.70367C26.6825 4.70325 26.687 4.70302 26.6915 4.70267C26.7181 4.70032 26.7448 4.69832 26.7718 4.69702C26.7873 4.69632 26.803 4.6962 26.8187 4.69579C26.8355 4.69538 26.8523 4.69462 26.8692 4.69462C27.869 4.69462 28.6603 5.42251 28.8475 6.44774H24.8647C24.8649 6.44474 24.8652 6.44163 24.8656 6.43857ZM3.89151 26.732C2.89169 26.732 2.10044 26.0041 1.91324 24.9789H6.40296H19.0351C19.0411 25.0245 19.0481 25.0697 19.0558 25.1146C19.0583 25.1297 19.0615 25.1444 19.0643 25.1594C19.0698 25.1891 19.0753 25.2188 19.0816 25.248C19.0853 25.2656 19.0895 25.2829 19.0935 25.3003C19.0995 25.3267 19.1056 25.3531 19.1123 25.3791C19.1169 25.3974 19.122 25.4155 19.1269 25.4336C19.1337 25.4584 19.1405 25.4831 19.1479 25.5076C19.1533 25.526 19.1591 25.5443 19.1649 25.5625C19.1724 25.5864 19.1803 25.6101 19.1883 25.6337C19.1945 25.6519 19.2009 25.67 19.2074 25.6879C19.2159 25.7113 19.2247 25.7345 19.2337 25.7575C19.2405 25.775 19.2473 25.7926 19.2544 25.8099C19.264 25.8332 19.2739 25.8563 19.284 25.8793C19.2912 25.8958 19.2983 25.9124 19.3058 25.9287C19.3168 25.9528 19.3284 25.9766 19.34 26.0003C19.3472 26.015 19.3541 26.0298 19.3615 26.0443C19.3757 26.0721 19.3905 26.0995 19.4054 26.1267C19.4108 26.1367 19.416 26.1468 19.4215 26.1566C19.4422 26.1935 19.4636 26.2298 19.4858 26.2656C19.4909 26.2739 19.4964 26.2819 19.5017 26.2902C19.5189 26.3175 19.5364 26.3447 19.5544 26.3713C19.5628 26.3836 19.5715 26.3955 19.58 26.4077C19.5955 26.4299 19.6111 26.452 19.6272 26.4737C19.6369 26.4868 19.6468 26.4995 19.6567 26.5123C19.6723 26.5326 19.6879 26.5528 19.704 26.5726C19.7145 26.5856 19.7253 26.5984 19.736 26.6112C19.752 26.6304 19.7683 26.6493 19.7848 26.668C19.7958 26.6806 19.8071 26.693 19.8184 26.7053C19.8265 26.7141 19.8343 26.7233 19.8425 26.732H3.89151Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M30.9996 11.9422C30.9995 11.9371 30.9994 11.932 30.9993 11.9269C30.9975 11.8854 30.99 11.8455 30.9774 11.8077C30.9768 11.8058 30.9765 11.8039 30.9759 11.802C30.9753 11.8005 30.9745 11.7991 30.9739 11.7976C30.9669 11.7783 30.9589 11.7595 30.9494 11.7415C30.9482 11.7393 30.9469 11.7372 30.9457 11.735C30.9369 11.7191 30.9272 11.7039 30.9166 11.6893C30.9144 11.6862 30.9123 11.683 30.91 11.6799C30.8983 11.6646 30.8856 11.6502 30.8721 11.6366C30.8691 11.6336 30.866 11.6308 30.863 11.6279C30.8502 11.6157 30.8367 11.6043 30.8225 11.5937C30.8206 11.5923 30.8188 11.5907 30.8169 11.5893C30.8009 11.5777 30.784 11.5675 30.7665 11.5581C30.7631 11.5563 30.7598 11.5546 30.7563 11.5529C30.7385 11.544 30.7203 11.5358 30.7012 11.5293C30.701 11.5293 30.7009 11.5292 30.7008 11.5292C30.6818 11.5227 30.6621 11.5179 30.642 11.5139C30.6376 11.513 30.6332 11.5123 30.6287 11.5116C30.6086 11.5083 30.5882 11.5058 30.5674 11.5053C26.851 11.4099 22.005 12.2975 19.5551 15.0723C18.4828 16.2867 17.9881 17.8273 17.5097 19.3172C17.4705 19.4391 17.4314 19.561 17.3919 19.6827C17.3903 19.6878 17.3887 19.693 17.3872 19.6982L16.6366 22.3432C16.5701 22.5774 16.7076 22.8209 16.9437 22.8869C16.9839 22.8981 17.0245 22.9034 17.0643 22.9034C17.2582 22.9034 17.4365 22.7764 17.4916 22.582L18.1878 20.1288C19.0389 19.7331 19.7242 19.548 20.6499 19.2983C21.1301 19.1687 21.6743 19.0219 22.3329 18.8209C23.7568 18.3864 26.4883 16.5687 27.7454 15.219C28.8448 14.0385 29.77 13.1612 30.8388 12.2856C30.84 12.2846 30.8409 12.2834 30.8422 12.2823C30.8578 12.2692 30.8725 12.2553 30.8862 12.2402C30.887 12.2393 30.8879 12.2385 30.8887 12.2376C30.9021 12.2225 30.9143 12.2063 30.9256 12.1894C30.9277 12.1863 30.9297 12.1831 30.9317 12.18C30.953 12.1463 30.9698 12.1098 30.9814 12.0708C30.9826 12.0671 30.9836 12.0634 30.9846 12.0597C30.9898 12.0405 30.994 12.021 30.9966 12.001C30.9967 12.0001 30.9967 11.9994 30.9968 11.9986C30.9984 11.9849 30.9996 11.9711 31 11.9572C31.0001 11.9521 30.9997 11.9472 30.9996 11.9422ZM20.2233 15.653C21.2571 14.482 22.8417 13.5994 24.9329 13.0296C25.495 12.8765 26.0889 12.7494 26.701 12.6492C25.1457 13.3975 23.6586 14.3347 22.8275 14.8855C21.4863 15.7744 20.0386 16.8527 18.9694 17.8117C19.2858 17.0166 19.6683 16.2816 20.2233 15.653ZM27.093 14.6208C25.8695 15.9344 23.2271 17.626 22.0718 17.9784C21.4271 18.1751 20.8904 18.32 20.4168 18.4478C19.9883 18.5634 19.5984 18.6687 19.2129 18.7902C19.3854 18.6263 19.5875 18.4426 19.8259 18.2363C20.7849 17.4063 22.0262 16.4766 23.3209 15.6184C25.5628 14.1326 27.5916 13.0896 29.08 12.6374C28.4336 13.2281 27.7978 13.8641 27.093 14.6208Z",
    fill: "white"
  }));
};

function _extends$b() {
  _extends$b = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$b.apply(this, arguments);
}
var DojoIcon = _ref => {
  var props = _extends$b({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Dojo_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M3.88722 19.2806C3.91241 19.3211 3.93759 19.3605 3.96387 19.3999C4.35327 19.9534 4.80765 20.4581 5.31728 20.9034C6.50419 21.876 7.99188 22.4066 9.52642 22.4046C9.62059 22.4046 9.71805 22.4046 9.8155 22.3969C10.8817 22.3111 11.9269 22.0522 12.9099 21.6304C12.4697 21.7011 12.0252 21.7417 11.5795 21.752C10.8224 21.7528 10.0735 21.5946 9.38138 21.2875C8.68929 20.9804 8.06944 20.5313 7.56201 19.9693C6.3042 19.978 5.0565 19.7442 3.88722 19.2806Z",
    fill: "url(#Dojo_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M9.52643 9.10045C10.6718 9.09991 11.7979 9.3953 12.7955 9.95799C13.7931 10.5207 14.6284 11.3316 15.2204 12.3121C14.5335 11.6894 13.6984 11.2532 12.7949 11.0452C11.8914 10.8372 10.9497 10.8643 10.0597 11.124C11.2729 11.712 12.9395 12.161 15.227 12.3175C15.227 12.3175 15.1175 10.1396 12.3274 9.0019C8.43692 7.41526 7.88394 7.73062 6.89845 6.08813C6.89845 6.08813 6.57762 7.73062 7.78211 9.3315C8.35079 9.17775 8.93734 9.10006 9.52643 9.10045Z",
    fill: "#F15A24"
  }), React.createElement("path", {
    d: "M12.3274 9.0019C10.9959 8.4544 10.0553 8.13795 9.35451 7.88501C9.53216 8.33093 9.77457 8.74822 10.0739 9.12344C11.1229 9.20965 12.1364 9.54366 13.0311 10.098C13.9258 10.6523 14.6762 11.4112 15.2204 12.3121C14.3854 11.5536 13.334 11.0753 12.2135 10.9444C13.1402 11.4979 14.1209 11.9554 15.1404 12.3099L15.2269 12.3175C15.2269 12.3175 15.1109 10.1396 12.3274 9.0019Z",
    fill: "#ED1C24"
  }), React.createElement("path", {
    d: "M15.2204 12.3165H15.2335C15.2762 12.0788 15.5379 10.1987 13.418 8.55187C10.2568 6.10129 9.63592 5.86915 9.48809 4.5683C9.23397 5.0807 9.09072 5.64092 9.0677 6.21242C9.04469 6.78392 9.14241 7.35384 9.3545 7.88502C10.0553 8.13797 10.997 8.4577 12.3274 9.00191C15.1109 10.1396 15.2269 12.3175 15.2269 12.3175L15.2204 12.3165Z",
    fill: "#C1272D"
  }), React.createElement("path", {
    d: "M24.8278 10.1747C26.0152 10.1736 27.1631 10.6013 28.0602 11.3792C29.199 11.447 30.1856 11.8982 30.8459 12.5431C30.8459 12.5431 28.1862 8.67891 23.4952 10.2853C23.0734 10.4361 22.6695 10.6329 22.2907 10.8722C23.0576 10.414 23.9345 10.1729 24.8278 10.1747Z",
    fill: "url(#Dojo_Paint1_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M24.8278 10.1746C23.9363 10.1735 23.0613 10.4146 22.2962 10.8721C22.3411 10.8437 22.3871 10.8174 22.432 10.79C18.6422 13.0227 14.0005 19.8784 7.5609 19.9649C8.06833 20.5269 8.68818 20.976 9.38027 21.2831C10.0724 21.5902 10.8213 21.7484 11.5784 21.7476C12.0241 21.7373 12.4686 21.6967 12.9088 21.626C17.0983 19.9003 21.1213 15.7722 22.9477 13.7717C24.6373 11.9157 26.4988 11.2849 28.0602 11.3802C27.1632 10.602 26.0153 10.1738 24.8278 10.1746Z",
    fill: "url(#Dojo_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M15.0452 23.4646C14.9604 23.7426 14.9154 24.0313 14.9116 24.3219C14.911 24.6562 14.9616 24.9885 15.0616 25.3074C15.0064 24.9091 15.0511 24.5032 15.1918 24.1265C15.3325 23.7497 15.5647 23.4139 15.8675 23.1492C15.8741 23.124 15.8806 23.0999 15.8883 23.0747C16.1021 22.3746 16.5659 21.7775 17.1914 21.3972H17.1782C16.9797 21.4613 16.7849 21.5363 16.5946 21.6217C16.2251 21.8081 15.8972 22.0675 15.6309 22.3842C15.3646 22.701 15.1653 23.0685 15.0452 23.4646Z",
    fill: "url(#Dojo_Paint3_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M32 16.1632C32.0018 14.8623 31.595 13.5938 30.8371 12.5366C30.1801 11.896 29.1946 11.4481 28.0602 11.3802C28.5987 11.8435 29.0306 12.4178 29.3264 13.0636C29.6222 13.7094 29.7748 14.4115 29.7739 15.1218C29.7739 16.7829 29.1716 18.6816 27.2182 19.7033C24.3712 21.1914 20.012 20.4829 17.1815 21.4016H17.1935C16.5681 21.78 16.1035 22.3751 15.8883 23.0737C15.8806 23.0988 15.8741 23.1229 15.8675 23.1481C16.6975 22.421 18.3334 21.8976 21.5242 22.3083C23.804 22.6017 25.614 22.6816 27.1689 22.236C28.6728 21.9081 29.9946 21.0177 30.8634 19.7471C31.6033 18.6985 32.0004 17.4465 32 16.1632Z",
    fill: "url(#Dojo_Paint4_Linear_".concat(id, ")")
  }), React.createElement("path", {
    opacity: "0.49",
    d: "M32 16.1632C32.0018 14.8623 31.595 13.5938 30.8371 12.5366C30.1801 11.896 29.1946 11.4481 28.0602 11.3802C28.5987 11.8435 29.0306 12.4178 29.3264 13.0636C29.6222 13.7094 29.7748 14.4115 29.7739 15.1218C29.7739 16.7829 29.1716 18.6816 27.2182 19.7033C24.3712 21.1914 20.012 20.4829 17.1815 21.4016H17.1935C16.5681 21.78 16.1035 22.3751 15.8883 23.0737C15.8806 23.0988 15.8741 23.1229 15.8675 23.1481C16.6975 22.421 18.3334 21.8976 21.5242 22.3083C23.804 22.6017 25.614 22.6816 27.1689 22.236C28.6728 21.9081 29.9946 21.0177 30.8634 19.7471C31.6033 18.6985 32.0004 17.4465 32 16.1632Z",
    fill: "url(#Dojo_Paint5_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M17.8746 26.8185C17.1259 26.589 16.4968 26.0754 16.1223 25.3876C15.7477 24.6999 15.6574 23.8928 15.8708 23.1393V23.1514C15.5681 23.4159 15.336 23.7516 15.1954 24.1282C15.0547 24.5047 15.0098 24.9103 15.0649 25.3085C15.2206 25.7907 15.4934 26.2269 15.859 26.5778C16.2245 26.9288 16.6713 27.1837 17.1595 27.3198C17.6476 27.4558 18.1619 27.4687 18.6562 27.3573C19.1506 27.246 19.6096 27.0138 19.9923 26.6816C19.327 26.985 18.5735 27.0337 17.8746 26.8185Z",
    fill: "url(#Dojo_Paint6_Linear_".concat(id, ")")
  }), React.createElement("g", {
    style: {
      mixBlendMode: "screen"
    }
  }, React.createElement("path", {
    d: "M18.9149 26.6017C19.2258 25.6972 20.2289 24.3022 21.3052 24.9406C21.3052 24.9406 22.1812 25.4333 22.3641 24.0471C22.3641 24.0471 23.0211 27.309 19.8598 27.1995C19.8598 27.1995 20.5716 26.6794 20.5639 26.1451C20.5639 26.1396 19.8117 26.6039 18.9149 26.6017Z",
    fill: "#2DB5F9"
  })), React.createElement("g", {
    style: {
      mixBlendMode: "screen"
    }
  }, React.createElement("path", {
    d: "M20.1774 24.6067C20.4895 24.4479 20.7851 24.2869 21.36 24.5431C21.8067 24.7413 22.3685 23.9661 21.8823 23.274C21.8823 23.274 21.914 23.9891 21.3348 23.9825C20.7555 23.9759 20.4347 24.2278 20.1774 24.6067Z",
    fill: "#5FD2FF"
  })), React.createElement("path", {
    d: "M23.3529 14.225C22.5962 15.2565 21.4859 16.1205 21.3556 16.3318C21.2253 16.5431 21.5746 17.2275 22.0947 17.2768C22.6148 17.326 22.2152 17.0786 22.1714 16.8388C22.1276 16.599 22.3258 16.9921 22.9433 16.899C23.5609 16.8059 22.7243 16.5782 22.7769 16.265C22.8294 15.9518 23.4711 15.3605 23.7252 14.7649C23.9792 14.1692 24.4139 14.7649 24.1916 15.2302C24.1029 15.4142 24.8968 14.7112 24.496 14.1747C24.0953 13.6381 23.7941 13.6228 23.3529 14.225ZM21.1935 16.4807C21.084 16.5902 20.7555 16.8278 20.7555 16.8278C20.7555 16.8278 21.0775 17.2746 21.4914 17.2658C21.4914 17.2658 21.5801 17.2231 21.452 17.0917C21.3238 16.9603 21.164 16.5596 21.1935 16.4807Z",
    fill: "#219058"
  }), React.createElement("path", {
    d: "M10.0597 11.124C8.97894 10.6017 8.26281 9.96986 7.7843 9.33148C6.78179 9.60321 5.85686 10.106 5.08361 10.7995C4.31035 11.493 3.71027 12.3579 3.33144 13.3251C2.95262 14.2922 2.80557 15.3346 2.90208 16.3688C2.9986 17.403 3.33599 18.4002 3.88723 19.2806C5.05647 19.7425 6.30377 19.9749 7.56092 19.9649C6.94447 19.2841 6.51114 18.4578 6.30159 17.5636C6.09204 16.6694 6.11316 15.7366 6.36296 14.8528C6.61276 13.9689 7.08304 13.1631 7.72967 12.5109C8.3763 11.8586 9.17806 11.3814 10.0597 11.124Z",
    fill: "url(#Dojo_Paint7_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M10.0739 9.12347C10.3695 9.54943 11.2171 10.2853 12.2157 10.9455C13.3355 11.0758 14.3863 11.5537 15.2204 12.3121C14.6763 11.4111 13.926 10.6521 13.0313 10.0978C12.1365 9.54344 11.1229 9.2095 10.0739 9.12347Z",
    fill: "#F7B852"
  }), React.createElement("path", {
    d: "M10.0739 9.12346C9.89324 9.10813 9.71038 9.10046 9.52642 9.10046C8.93843 9.10036 8.353 9.17805 7.78539 9.33151C8.2639 9.96989 8.98987 10.6017 10.0608 11.124C10.5541 10.9795 11.0655 10.9057 11.5795 10.905C11.7922 10.905 12.0046 10.9178 12.2157 10.9433C11.216 10.2852 10.3685 9.54941 10.0739 9.12346Z",
    fill: "#FF8431"
  }), React.createElement("path", {
    d: "M13.764 10.6378C13.7991 10.6378 12.9515 9.87131 11.9759 9.57019C12.4073 10.386 12.7763 10.6378 13.764 10.6378Z",
    fill: "#FFFB69"
  }), React.createElement("path", {
    d: "M11.8828 7.16341C12.2161 7.36616 12.5362 7.58999 12.8409 7.83354C12.9176 7.89157 12.7041 7.31342 12.4577 7.20392C12.2731 7.13933 12.0746 7.12534 11.8828 7.16341ZM13.0643 7.99998C13.3937 8.20907 13.7114 8.43607 14.0159 8.67997C14.0936 8.73581 13.8845 8.15875 13.6392 8.04706C13.4551 7.98069 13.2567 7.96444 13.0643 7.99998ZM14.1779 8.81903C14.3801 9.00685 14.5535 9.22343 14.6926 9.46179C14.7309 9.51764 14.7024 9.08292 14.5579 8.96029C14.4462 8.87996 14.315 8.83116 14.1779 8.81903Z",
    fill: "#C1272D"
  }), React.createElement("path", {
    d: "M9.05118 19.3605C9.02052 19.2653 9.39391 19.1415 9.48918 19.1415C9.67131 19.1713 9.84758 19.2297 10.0115 19.3145C9.7831 19.3993 9.54305 19.4484 9.29974 19.4602C9.21075 19.445 9.12601 19.411 9.05118 19.3605ZM10.3958 19.043C10.363 18.9696 10.6521 18.8415 10.7309 18.8295C10.8811 18.8374 11.029 18.8696 11.1689 18.9247C10.9921 19.0127 10.8031 19.0736 10.6083 19.1054C10.5338 19.0999 10.4614 19.0786 10.3958 19.043ZM11.5204 18.6302C11.4875 18.5721 11.7142 18.4418 11.7777 18.4243C11.9002 18.4181 12.0229 18.4314 12.1412 18.4637C12.0043 18.5526 11.8543 18.6194 11.6967 18.6619C11.6363 18.6638 11.5763 18.653 11.5204 18.6302ZM12.415 18.2239C12.381 18.1736 12.5781 18.0378 12.634 18.017C12.7456 18.0033 12.8586 18.007 12.9691 18.0279C12.8502 18.1186 12.7179 18.1902 12.5771 18.2404C12.5225 18.246 12.4673 18.2404 12.415 18.2239ZM13.2494 17.7673C13.2165 17.7246 13.3808 17.5976 13.43 17.5768C13.5261 17.5591 13.6244 17.5565 13.7213 17.5691C13.6227 17.6535 13.512 17.7226 13.3928 17.7739C13.345 17.7814 13.2963 17.7791 13.2494 17.7673ZM7.70325 19.4689C7.68792 19.3594 8.10401 19.2981 8.21023 19.3091C8.39767 19.3717 8.57396 19.4638 8.73254 19.5817C8.47501 19.6341 8.21096 19.6467 7.94962 19.619C7.8579 19.5868 7.77396 19.5356 7.70325 19.4689Z",
    fill: "#44C688"
  }), React.createElement("path", {
    d: "M7.95838 6.89409C8.24855 7.22258 8.9373 7.44158 8.9373 7.44158C8.9373 7.44158 8.77305 7.05943 8.80042 6.33236C8.80042 6.30717 7.95838 6.31922 7.81493 5.62828C7.78537 5.49031 7.66492 6.5623 7.95838 6.89409Z",
    fill: "#C1272D"
  }), React.createElement("path", {
    d: "M5.0961 22.835C5.10785 22.7225 5.14317 22.6137 5.19977 22.5158C5.25638 22.4179 5.33298 22.333 5.42459 22.2667C5.43335 22.2601 5.44211 22.2568 5.45087 22.2513C5.38194 22.2351 5.3121 22.223 5.24173 22.2152C4.23872 22.0652 3.98468 22.663 3.92774 23.3332C3.92576 23.3697 3.92576 23.4062 3.92774 23.4427C4.04169 23.241 4.21082 23.0761 4.41527 22.9673C4.61971 22.8585 4.85097 22.8103 5.08186 22.8284L5.0961 22.835Z",
    fill: "#F15A24"
  }), React.createElement("path", {
    d: "M6.3181 22.617C5.32166 22.0115 4.76103 21.9677 4.53874 23.6628C4.53874 23.6628 5.58774 22.8328 6.08377 23.3813C6.62141 23.9781 7.35506 23.4284 6.96962 23.0802C6.77609 22.895 6.55661 22.739 6.3181 22.617Z",
    fill: "#F15A24"
  }), React.createElement("path", {
    d: "M5.90419 22.813C5.33917 23.1897 5.34027 24.0755 5.34027 24.0755C5.34027 24.0755 6.37175 23.5171 6.29072 23.17C6.27503 23.076 6.22854 22.99 6.15856 22.9253C6.08858 22.8607 5.99909 22.8212 5.90419 22.813ZM1.20449 15.8467C1.30062 15.7843 1.40899 15.7432 1.52231 15.7262C1.63563 15.7092 1.75128 15.7167 1.86148 15.7481C1.8716 15.7515 1.88147 15.7555 1.89105 15.7602C1.86016 15.6963 1.8258 15.6342 1.78812 15.574C1.27785 14.698 0.652614 14.8732 0.0963585 15.2455C0.0635088 15.2674 0.033944 15.2904 0.00437927 15.3145C0.23354 15.2767 0.468738 15.3053 0.682179 15.3969C0.89562 15.4884 1.07838 15.6392 1.20887 15.8314C1.20812 15.8366 1.20665 15.8418 1.20449 15.8467Z",
    fill: "#F15A24"
  }), React.createElement("path", {
    d: "M2.27757 16.8891C1.91513 15.4514 1.62058 14.8952 0.232132 15.8894C0.232132 15.8894 1.42239 15.5467 1.55817 17.2395C1.62277 18.0411 2.39145 18.2009 2.38269 17.6775C2.38638 17.411 2.35096 17.1454 2.27757 16.8891Z",
    fill: "#F15A24"
  }), React.createElement("path", {
    d: "M1.77061 16.1193C1.11361 15.9628 0.456619 16.5672 0.456619 16.5672C0.456619 16.5672 1.47277 16.5322 1.5965 17.1486C1.66987 17.4979 1.77061 16.1193 1.77061 16.1193Z",
    fill: "#F15A24"
  }), React.createElement("path", {
    d: "M22.9477 13.7717C23.5868 13.0297 24.3552 12.4098 25.2154 11.9419C26.0422 11.504 27.216 11.2324 27.9244 11.2674L28.196 11.5007L28.0536 11.4886C27.0922 11.4254 26.1309 11.6141 25.2647 12.0361C24.394 12.4702 23.6091 13.0582 22.9477 13.7717Z",
    fill: "#29B36E"
  }), React.createElement("path", {
    d: "M28.0252 11.2751C28.5537 11.3243 29.0712 11.457 29.5582 11.6682C30.0415 11.8732 30.4801 12.1708 30.8492 12.5442C30.4602 12.2019 30.0083 11.9386 29.5188 11.769C29.0893 11.6332 28.6466 11.5433 28.1982 11.5007L27.9223 11.2675L28.0252 11.2751Z",
    fill: "#6FD191"
  }), React.createElement("path", {
    d: "M15.9299 22.951C16.0753 22.8478 16.2275 22.7545 16.3854 22.6718C16.4949 22.617 16.6044 22.5623 16.7238 22.5196C16.8431 22.4769 16.9559 22.4352 17.072 22.3958C17.5416 22.2551 18.0252 22.1663 18.5141 22.1308C19.4838 22.0682 20.4574 22.1068 21.4191 22.2458C22.3738 22.3864 23.3349 22.4785 24.2989 22.5218C25.2614 22.5524 26.2349 22.4955 27.1689 22.2403C26.2393 22.513 25.2636 22.5896 24.2978 22.5776C23.3308 22.5534 22.3656 22.4803 21.406 22.3586C20.4518 22.2394 19.4877 22.2196 18.5294 22.2995C18.0543 22.3422 17.5854 22.4374 17.1311 22.5831C17.0216 22.6225 16.9121 22.6586 16.8026 22.7079C16.6939 22.7523 16.5875 22.8024 16.484 22.8579C16.278 22.9681 16.0849 23.1007 15.908 23.2532L15.8303 23.3211C15.8547 23.1955 15.888 23.0719 15.9299 22.951Z",
    fill: "#C83AD7"
  }), React.createElement("path", {
    d: "M10.2392 11.5543C9.3085 11.7602 9.45195 12.4993 9.45195 12.4993C9.45195 12.4993 9.7465 12.1434 11.3682 11.9518C10.9821 11.8489 10.6046 11.716 10.2392 11.5543Z",
    fill: "#C1272D"
  }), React.createElement("path", {
    d: "M15.0616 25.3096C15.0313 25.1044 15.0272 24.8961 15.0496 24.6898C15.0914 24.2686 15.2309 23.8629 15.4569 23.505C15.5741 23.3256 15.7107 23.1597 15.8642 23.0101L15.931 22.9488C15.931 22.9488 15.839 23.2444 15.8281 23.3167C15.7429 23.4054 15.6639 23.4997 15.5916 23.5992C15.3463 23.9214 15.1794 24.2963 15.1043 24.6942C15.063 24.8966 15.0486 25.1035 15.0616 25.3096Z",
    fill: "#FBA9FF"
  }), React.createElement("path", {
    d: "M7.34409 19.965C6.81521 19.3835 6.36955 18.4583 6.18121 17.5921C6.08054 17.1362 6.04004 16.6691 6.06076 16.2026L6.08047 15.8544L6.13194 15.5095C6.14855 15.3945 6.17121 15.2804 6.19982 15.1678C6.22282 15.0541 6.25243 14.9419 6.28852 14.8317C6.41789 14.3865 6.60645 13.9608 6.84915 13.5659C6.96773 13.3696 7.0979 13.1805 7.23897 12.9998L7.45797 12.737C7.53133 12.6483 7.61784 12.5716 7.69777 12.4884C8.02624 12.1663 8.39416 11.887 8.79276 11.6573C9.19133 11.4317 9.61509 11.2538 10.0553 11.1273C9.62241 11.2644 9.20713 11.4519 8.81795 11.6858C8.43121 11.9249 8.07619 12.2119 7.76128 12.5399C7.68573 12.6242 7.60251 12.7019 7.53243 12.7906L7.32 13.0556C7.18671 13.2381 7.06423 13.4282 6.95318 13.625C6.72868 14.0166 6.55744 14.4364 6.44401 14.8733C6.41225 14.9812 6.38702 15.0909 6.36845 15.2018C6.34393 15.3102 6.32529 15.4199 6.31261 15.5303L6.27538 15.8588L6.26552 16.1949C6.25954 16.6429 6.31181 17.0898 6.42101 17.5243C6.63737 18.3953 7.07141 19.197 7.68244 19.8544L7.7799 19.9639C7.7799 19.9639 7.42512 19.9705 7.34409 19.965Z",
    fill: "#FF737D"
  }), React.createElement("path", {
    d: "M12.9088 21.626C12.4313 21.7322 11.9439 21.7876 11.4547 21.7914C10.9614 21.7774 10.4722 21.6968 10.0005 21.5516C9.52596 21.4103 9.06812 21.218 8.63509 20.9778C8.19647 20.7372 7.79577 20.4332 7.44594 20.0755L7.3441 19.966C7.3441 19.966 7.6934 19.966 7.7821 19.9573C8.07424 20.2672 8.40552 20.5378 8.76759 20.7621C9.17392 21.0168 9.60681 21.2265 10.0586 21.3873C10.5102 21.5541 10.9825 21.6584 11.4624 21.6972C11.9457 21.7235 12.4304 21.6997 12.9088 21.626Z",
    fill: "#FFF4C0"
  })), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Dojo_Paint0_Linear_".concat(id),
    x1: "8.39858",
    y1: "22.2579",
    x2: "8.39858",
    y2: "19.7339",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#FFFA8F"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#FB784B"
  })), React.createElement("linearGradient", {
    id: "Dojo_Paint1_Linear_".concat(id),
    x1: "27.205",
    y1: "11.1864",
    x2: "28.1358",
    y2: "10.4199",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#5BCB99"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#85A8E8"
  })), React.createElement("linearGradient", {
    id: "Dojo_Paint2_Linear_".concat(id),
    x1: "9.58116",
    y1: "20.4369",
    x2: "38.5984",
    y2: "5.38076",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#34E28B"
  }), React.createElement("stop", {
    offset: "1"
  })), React.createElement("linearGradient", {
    id: "Dojo_Paint3_Linear_".concat(id),
    x1: "14.9116",
    y1: "23.354",
    x2: "17.1935",
    y2: "23.354",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#C297FF"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#AE31BB"
  })), React.createElement("linearGradient", {
    id: "Dojo_Paint4_Linear_".concat(id),
    x1: "5.60964",
    y1: "34.3466",
    x2: "34.4626",
    y2: "11.8445",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", null), React.createElement("stop", {
    offset: "1",
    stopColor: "#D23DE2"
  })), React.createElement("linearGradient", {
    id: "Dojo_Paint5_Linear_".concat(id),
    x1: "26.9543",
    y1: "9.91515",
    x2: "25.7859",
    y2: "13.8571",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", null), React.createElement("stop", {
    offset: "1",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Dojo_Paint6_Linear_".concat(id),
    x1: "16.2737",
    y1: "25.1716",
    x2: "24.4785",
    y2: "27.158",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#2DB5F9"
  }), React.createElement("stop", {
    offset: "1"
  })), React.createElement("linearGradient", {
    id: "Dojo_Paint7_Linear_".concat(id),
    x1: "9.8604",
    y1: "4.51133",
    x2: "4.4402",
    y2: "19.4032",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", null), React.createElement("stop", {
    offset: "0.21",
    stopColor: "#48080A"
  }), React.createElement("stop", {
    offset: "0.42",
    stopColor: "#891014"
  }), React.createElement("stop", {
    offset: "0.61",
    stopColor: "#BC151B"
  }), React.createElement("stop", {
    offset: "0.78",
    stopColor: "#E01A21"
  }), React.createElement("stop", {
    offset: "0.91",
    stopColor: "#F71C24"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#FF1D25"
  })), React.createElement("clipPath", {
    id: "Dojo_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var styles = {
  mixBlendMode: "screen"
};
var DojoIconLight = _ref2 => {
  var props = _extends$b({}, _ref2);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Dojo_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M3.88722 19.2806C3.91241 19.3211 3.93759 19.3605 3.96387 19.3999C4.35327 19.9534 4.80765 20.4581 5.31728 20.9034C6.50419 21.876 7.99188 22.4066 9.52642 22.4046C9.62059 22.4046 9.71805 22.4046 9.8155 22.3969C10.8817 22.3111 11.9269 22.0522 12.9099 21.6304C12.4697 21.7011 12.0252 21.7417 11.5795 21.752C10.8224 21.7528 10.0735 21.5946 9.38138 21.2875C8.68929 20.9804 8.06944 20.5313 7.56201 19.9693C6.3042 19.978 5.0565 19.7442 3.88722 19.2806Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M9.52643 9.10045C10.6718 9.09991 11.7979 9.3953 12.7955 9.95799C13.7931 10.5207 14.6284 11.3316 15.2204 12.3121C14.5335 11.6894 13.6984 11.2532 12.7949 11.0452C11.8914 10.8372 10.9497 10.8643 10.0597 11.124C11.2729 11.712 12.9395 12.161 15.227 12.3175C15.227 12.3175 15.1175 10.1396 12.3274 9.0019C8.43692 7.41526 7.88394 7.73062 6.89845 6.08813C6.89845 6.08813 6.57762 7.73062 7.78211 9.3315C8.35079 9.17775 8.93734 9.10006 9.52643 9.10045Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M12.3274 9.0019C10.9959 8.4544 10.0553 8.13795 9.35451 7.88501C9.53216 8.33093 9.77457 8.74822 10.0739 9.12344C11.1229 9.20965 12.1364 9.54366 13.0311 10.098C13.9258 10.6523 14.6762 11.4112 15.2204 12.3121C14.3854 11.5536 13.334 11.0753 12.2135 10.9444C13.1402 11.4979 14.1209 11.9554 15.1404 12.3099L15.2269 12.3175C15.2269 12.3175 15.1109 10.1396 12.3274 9.0019Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M15.2204 12.3165H15.2335C15.2762 12.0788 15.5379 10.1987 13.418 8.55187C10.2568 6.10129 9.63592 5.86915 9.48809 4.5683C9.23397 5.0807 9.09072 5.64092 9.0677 6.21242C9.04469 6.78392 9.14241 7.35384 9.3545 7.88502C10.0553 8.13797 10.997 8.4577 12.3274 9.00191C15.1109 10.1396 15.2269 12.3175 15.2269 12.3175L15.2204 12.3165Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M24.8278 10.1747C26.0152 10.1736 27.1631 10.6013 28.0602 11.3792C29.199 11.447 30.1856 11.8982 30.8459 12.5431C30.8459 12.5431 28.1862 8.67891 23.4952 10.2853C23.0734 10.4361 22.6695 10.6329 22.2907 10.8722C23.0576 10.414 23.9345 10.1729 24.8278 10.1747Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M24.8278 10.1746C23.9363 10.1735 23.0613 10.4146 22.2962 10.8721C22.3411 10.8437 22.3871 10.8174 22.432 10.79C18.6422 13.0227 14.0005 19.8784 7.5609 19.9649C8.06833 20.5269 8.68818 20.976 9.38027 21.2831C10.0724 21.5902 10.8213 21.7484 11.5784 21.7476C12.0241 21.7373 12.4686 21.6967 12.9088 21.626C17.0983 19.9003 21.1213 15.7722 22.9477 13.7717C24.6373 11.9157 26.4988 11.2849 28.0602 11.3802C27.1632 10.602 26.0153 10.1738 24.8278 10.1746Z",
    fill: "white"
  }), React.createElement("path", {
    opacity: "0.49",
    d: "M32 16.1632C32.0018 14.8623 31.595 13.5938 30.8371 12.5366C30.1801 11.896 29.1946 11.4481 28.0602 11.3802C28.5987 11.8435 29.0306 12.4178 29.3264 13.0636C29.6222 13.7094 29.7748 14.4115 29.7739 15.1218C29.7739 16.7829 29.1716 18.6816 27.2182 19.7033C24.3712 21.1914 20.012 20.4829 17.1815 21.4016H17.1935C16.5681 21.78 16.1035 22.3751 15.8883 23.0737C15.8806 23.0988 15.8741 23.1229 15.8675 23.1481C16.6975 22.421 18.3334 21.8976 21.5242 22.3083C23.804 22.6017 25.614 22.6816 27.1689 22.236C28.6728 21.9081 29.9946 21.0177 30.8634 19.7471C31.6033 18.6985 32.0004 17.4465 32 16.1632Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M15.0452 23.4646C14.9604 23.7426 14.9154 24.0313 14.9116 24.3219C14.911 24.6562 14.9616 24.9885 15.0616 25.3074C15.0064 24.9091 15.0511 24.5032 15.1918 24.1265C15.3325 23.7497 15.5647 23.4139 15.8675 23.1492C15.8741 23.124 15.8806 23.0999 15.8883 23.0747C16.1021 22.3746 16.5659 21.7775 17.1914 21.3972H17.1782C16.9797 21.4613 16.7849 21.5363 16.5946 21.6217C16.2251 21.8081 15.8972 22.0675 15.6309 22.3842C15.3646 22.701 15.1653 23.0685 15.0452 23.4646Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M17.8746 26.8185C17.1259 26.589 16.4968 26.0754 16.1223 25.3876C15.7477 24.6999 15.6574 23.8928 15.8708 23.1393V23.1514C15.5681 23.4159 15.336 23.7516 15.1954 24.1282C15.0547 24.5047 15.0098 24.9103 15.0649 25.3085C15.2206 25.7907 15.4934 26.2269 15.859 26.5778C16.2245 26.9288 16.6713 27.1837 17.1595 27.3198C17.6476 27.4558 18.1619 27.4687 18.6562 27.3573C19.1506 27.246 19.6096 27.0138 19.9923 26.6816C19.327 26.985 18.5735 27.0337 17.8746 26.8185Z",
    fill: "white"
  }), React.createElement("g", {
    style: styles
  }, React.createElement("g", {
    style: styles
  }, React.createElement("path", {
    d: "M18.9149 26.6017C19.2258 25.6972 20.2289 24.3022 21.3052 24.9406C21.3052 24.9406 22.1812 25.4333 22.3641 24.0471C22.3641 24.0471 23.0211 27.309 19.8598 27.1995C19.8598 27.1995 20.5716 26.6794 20.5639 26.1451C20.5639 26.1396 19.8117 26.6039 18.9149 26.6017Z",
    fill: "white"
  }))), React.createElement("g", {
    style: styles
  }, React.createElement("g", {
    style: styles
  }, React.createElement("path", {
    d: "M20.1774 24.6067C20.4895 24.4479 20.7851 24.2869 21.36 24.5431C21.8067 24.7413 22.3685 23.9661 21.8823 23.274C21.8823 23.274 21.914 23.9891 21.3348 23.9825C20.7555 23.9759 20.4347 24.2278 20.1774 24.6067Z",
    fill: "white"
  }))), React.createElement("path", {
    d: "M23.3529 14.225C22.5962 15.2565 21.4859 16.1205 21.3556 16.3318C21.2253 16.5431 21.5746 17.2275 22.0947 17.2768C22.6148 17.326 22.2152 17.0786 22.1714 16.8388C22.1276 16.599 22.3258 16.9921 22.9433 16.899C23.5609 16.8059 22.7243 16.5782 22.7769 16.265C22.8294 15.9518 23.4711 15.3605 23.7252 14.7649C23.9792 14.1692 24.4139 14.7649 24.1916 15.2302C24.1029 15.4142 24.8968 14.7112 24.496 14.1747C24.0953 13.6381 23.7941 13.6228 23.3529 14.225ZM21.1935 16.4807C21.084 16.5902 20.7555 16.8278 20.7555 16.8278C20.7555 16.8278 21.0775 17.2746 21.4914 17.2658C21.4914 17.2658 21.5801 17.2231 21.452 17.0917C21.3238 16.9603 21.164 16.5596 21.1935 16.4807Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M10.0597 11.124C8.97894 10.6017 8.26281 9.96986 7.7843 9.33148C6.78179 9.60321 5.85686 10.106 5.08361 10.7995C4.31035 11.493 3.71027 12.3579 3.33144 13.3251C2.95262 14.2922 2.80557 15.3346 2.90208 16.3688C2.9986 17.403 3.33599 18.4002 3.88723 19.2806C5.05647 19.7425 6.30377 19.9749 7.56092 19.9649C6.94447 19.2841 6.51114 18.4578 6.30159 17.5636C6.09204 16.6694 6.11316 15.7366 6.36296 14.8528C6.61276 13.9689 7.08304 13.1631 7.72967 12.5109C8.3763 11.8586 9.17806 11.3814 10.0597 11.124Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M10.0739 9.12346C9.89324 9.10813 9.71037 9.10046 9.52641 9.10046C8.93842 9.10036 8.353 9.17805 7.78539 9.33151C8.2639 9.96989 8.98986 10.6017 10.0608 11.124C10.5541 10.9795 11.0655 10.9057 11.5795 10.905C11.7922 10.905 12.0046 10.9178 12.2157 10.9433C11.216 10.2852 10.3685 9.54941 10.0739 9.12346Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.2157 10.9455C11.2171 10.2853 10.3695 9.54943 10.0739 9.12347C10.7404 9.17814 11.3927 9.33288 12.0092 9.58066C11.9981 9.57711 11.987 9.57362 11.9759 9.57019C12.4073 10.386 12.7763 10.6378 13.764 10.6378C13.7694 10.6378 13.7542 10.6199 13.7211 10.5886C14.3149 11.0709 14.8227 11.6536 15.2204 12.3121C14.3863 11.5537 13.3355 11.0758 12.2157 10.9455Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M11.8828 7.16341C12.2161 7.36616 12.5362 7.58999 12.8409 7.83354C12.9176 7.89157 12.7041 7.31342 12.4577 7.20392C12.2731 7.13933 12.0746 7.12534 11.8828 7.16341ZM13.0643 7.99998C13.3937 8.20907 13.7114 8.43607 14.0159 8.67997C14.0936 8.73581 13.8845 8.15875 13.6392 8.04706C13.4551 7.98069 13.2567 7.96444 13.0643 7.99998ZM14.1779 8.81903C14.3801 9.00685 14.5535 9.22343 14.6926 9.46179C14.7309 9.51764 14.7024 9.08292 14.5579 8.96029C14.4462 8.87996 14.315 8.83116 14.1779 8.81903Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M9.05118 19.3605C9.02052 19.2653 9.39391 19.1415 9.48918 19.1415C9.67131 19.1713 9.84758 19.2297 10.0115 19.3145C9.7831 19.3993 9.54305 19.4484 9.29974 19.4602C9.21075 19.445 9.12601 19.411 9.05118 19.3605ZM10.3958 19.043C10.363 18.9696 10.6521 18.8415 10.7309 18.8295C10.8811 18.8374 11.029 18.8696 11.1689 18.9247C10.9921 19.0127 10.8031 19.0736 10.6083 19.1054C10.5338 19.0999 10.4614 19.0786 10.3958 19.043ZM11.5204 18.6302C11.4875 18.5721 11.7142 18.4418 11.7777 18.4243C11.9002 18.4181 12.0229 18.4314 12.1412 18.4637C12.0043 18.5526 11.8543 18.6194 11.6967 18.6619C11.6363 18.6638 11.5763 18.653 11.5204 18.6302ZM12.415 18.2239C12.381 18.1736 12.5781 18.0378 12.634 18.017C12.7456 18.0033 12.8586 18.007 12.9691 18.0279C12.8502 18.1186 12.7179 18.1902 12.5771 18.2404C12.5225 18.246 12.4673 18.2404 12.415 18.2239ZM13.2494 17.7673C13.2165 17.7246 13.3808 17.5976 13.43 17.5768C13.5261 17.5591 13.6244 17.5565 13.7213 17.5691C13.6227 17.6535 13.512 17.7226 13.3928 17.7739C13.345 17.7814 13.2963 17.7791 13.2494 17.7673ZM7.70325 19.4689C7.68792 19.3594 8.10401 19.2981 8.21023 19.3091C8.39767 19.3717 8.57396 19.4638 8.73254 19.5817C8.47501 19.6341 8.21096 19.6467 7.94962 19.619C7.8579 19.5868 7.77396 19.5356 7.70325 19.4689Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M7.95838 6.89409C8.24855 7.22258 8.9373 7.44158 8.9373 7.44158C8.9373 7.44158 8.77305 7.05943 8.80042 6.33236C8.80042 6.30717 7.95838 6.31922 7.81493 5.62828C7.78537 5.49031 7.66492 6.5623 7.95838 6.89409Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M5.0961 22.835C5.10785 22.7225 5.14317 22.6137 5.19977 22.5158C5.25638 22.4179 5.33298 22.333 5.42459 22.2667C5.43335 22.2601 5.44211 22.2568 5.45087 22.2513C5.38194 22.2351 5.3121 22.223 5.24173 22.2152C4.23872 22.0652 3.98468 22.663 3.92774 23.3332C3.92576 23.3697 3.92576 23.4062 3.92774 23.4427C4.04169 23.241 4.21082 23.0761 4.41527 22.9673C4.61971 22.8585 4.85097 22.8103 5.08186 22.8284L5.0961 22.835Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M6.3181 22.617C5.32166 22.0115 4.76103 21.9677 4.53874 23.6628C4.53874 23.6628 5.58774 22.8328 6.08377 23.3813C6.62141 23.9781 7.35506 23.4284 6.96962 23.0802C6.77609 22.895 6.55661 22.739 6.3181 22.617Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M5.90419 22.813C5.33917 23.1897 5.34027 24.0755 5.34027 24.0755C5.34027 24.0755 6.37175 23.5171 6.29072 23.17C6.27503 23.076 6.22854 22.99 6.15856 22.9253C6.08858 22.8607 5.99909 22.8212 5.90419 22.813ZM1.20449 15.8467C1.30062 15.7843 1.40899 15.7432 1.52231 15.7262C1.63563 15.7092 1.75128 15.7167 1.86148 15.7481C1.8716 15.7515 1.88147 15.7555 1.89105 15.7602C1.86016 15.6963 1.8258 15.6342 1.78812 15.574C1.27785 14.698 0.652614 14.8732 0.0963585 15.2455C0.0635088 15.2674 0.033944 15.2904 0.00437927 15.3145C0.23354 15.2767 0.468738 15.3053 0.682179 15.3969C0.89562 15.4884 1.07838 15.6392 1.20887 15.8314C1.20812 15.8366 1.20665 15.8418 1.20449 15.8467Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M2.27757 16.8891C1.91513 15.4514 1.62058 14.8952 0.232132 15.8894C0.232132 15.8894 1.42239 15.5467 1.55817 17.2395C1.62277 18.0411 2.39145 18.2009 2.38269 17.6775C2.38638 17.411 2.35096 17.1454 2.27757 16.8891Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M1.77061 16.1193C1.11361 15.9628 0.456619 16.5672 0.456619 16.5672C0.456619 16.5672 1.47277 16.5322 1.5965 17.1486C1.66987 17.4979 1.77061 16.1193 1.77061 16.1193Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M22.9477 13.7717C23.5868 13.0297 24.3552 12.4098 25.2154 11.9419C26.0422 11.504 27.216 11.2324 27.9244 11.2674L28.196 11.5007L28.0536 11.4886C27.0922 11.4254 26.1309 11.6141 25.2647 12.0361C24.394 12.4702 23.6091 13.0582 22.9477 13.7717Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M28.0252 11.2751C28.5537 11.3243 29.0712 11.457 29.5582 11.6682C30.0415 11.8732 30.4801 12.1708 30.8492 12.5442C30.4602 12.2019 30.0083 11.9386 29.5188 11.769C29.0893 11.6332 28.6466 11.5433 28.1982 11.5007L27.9223 11.2675L28.0252 11.2751Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M15.9299 22.951C16.0753 22.8478 16.2275 22.7545 16.3854 22.6718C16.4949 22.617 16.6044 22.5623 16.7238 22.5196C16.8431 22.4769 16.9559 22.4352 17.072 22.3958C17.5416 22.2551 18.0252 22.1663 18.5141 22.1308C19.4838 22.0682 20.4574 22.1068 21.4191 22.2458C22.3738 22.3864 23.3349 22.4785 24.2989 22.5218C25.2614 22.5524 26.2349 22.4955 27.1689 22.2403C26.2393 22.513 25.2636 22.5896 24.2978 22.5776C23.3308 22.5534 22.3656 22.4803 21.406 22.3586C20.4518 22.2394 19.4877 22.2196 18.5294 22.2995C18.0543 22.3422 17.5854 22.4374 17.1311 22.5831C17.0216 22.6225 16.9121 22.6586 16.8026 22.7079C16.6939 22.7523 16.5875 22.8024 16.484 22.8579C16.278 22.9681 16.0849 23.1007 15.908 23.2532L15.8303 23.3211C15.8547 23.1955 15.888 23.0719 15.9299 22.951Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M10.2392 11.5543C9.3085 11.7602 9.45195 12.4993 9.45195 12.4993C9.45195 12.4993 9.7465 12.1434 11.3682 11.9518C10.9821 11.8489 10.6046 11.716 10.2392 11.5543Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M15.0616 25.3096C15.0313 25.1044 15.0272 24.8961 15.0496 24.6898C15.0914 24.2686 15.2309 23.8629 15.4569 23.505C15.5741 23.3256 15.7107 23.1597 15.8642 23.0101L15.931 22.9488C15.931 22.9488 15.839 23.2444 15.8281 23.3167C15.7429 23.4054 15.6639 23.4997 15.5916 23.5992C15.3463 23.9214 15.1794 24.2963 15.1043 24.6942C15.063 24.8966 15.0486 25.1035 15.0616 25.3096Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M12.9088 21.626C12.4313 21.7322 11.9439 21.7876 11.4547 21.7914C10.9614 21.7774 10.4722 21.6968 10.0005 21.5516C9.52596 21.4103 9.06812 21.218 8.63509 20.9778C8.19647 20.7372 7.79577 20.4332 7.44594 20.0755L7.3441 19.966C7.3441 19.966 7.6934 19.966 7.7821 19.9573C8.07424 20.2672 8.40552 20.5378 8.76759 20.7621C9.17392 21.0168 9.60681 21.2265 10.0586 21.3873C10.5102 21.5541 10.9825 21.6584 11.4624 21.6972C11.9457 21.7235 12.4304 21.6997 12.9088 21.626Z",
    fill: "white"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "Dojo_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var DojoIconDark = _ref3 => {
  var props = _extends$b({}, _ref3);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Dojo_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M3.88722 19.2806C3.91241 19.3211 3.93759 19.3605 3.96387 19.3999C4.35327 19.9534 4.80765 20.4581 5.31728 20.9034C6.50419 21.876 7.99188 22.4066 9.52642 22.4046C9.62059 22.4046 9.71805 22.4046 9.8155 22.3969C10.8817 22.3111 11.9269 22.0522 12.9099 21.6304C12.4697 21.7011 12.0252 21.7417 11.5795 21.752C10.8224 21.7528 10.0735 21.5946 9.38138 21.2875C8.68929 20.9804 8.06944 20.5313 7.56201 19.9693C6.3042 19.978 5.0565 19.7442 3.88722 19.2806Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M9.52643 9.10045C10.6718 9.09991 11.7979 9.3953 12.7955 9.95799C13.7931 10.5207 14.6284 11.3316 15.2204 12.3121C14.5335 11.6894 13.6984 11.2532 12.7949 11.0452C11.8914 10.8372 10.9497 10.8643 10.0597 11.124C11.2729 11.712 12.9395 12.161 15.227 12.3175C15.227 12.3175 15.1175 10.1396 12.3274 9.0019C8.43692 7.41526 7.88394 7.73062 6.89845 6.08813C6.89845 6.08813 6.57762 7.73062 7.78211 9.3315C8.35079 9.17775 8.93734 9.10006 9.52643 9.10045Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M12.3274 9.0019C10.9959 8.4544 10.0553 8.13795 9.35451 7.88501C9.53216 8.33093 9.77457 8.74822 10.0739 9.12344C11.1229 9.20965 12.1364 9.54366 13.0311 10.098C13.9258 10.6523 14.6762 11.4112 15.2204 12.3121C14.3854 11.5536 13.334 11.0753 12.2135 10.9444C13.1402 11.4979 14.1209 11.9554 15.1404 12.3099L15.2269 12.3175C15.2269 12.3175 15.1109 10.1396 12.3274 9.0019Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M15.2204 12.3165H15.2335C15.2762 12.0788 15.5379 10.1987 13.418 8.55187C10.2568 6.10129 9.63592 5.86915 9.48809 4.5683C9.23397 5.0807 9.09072 5.64092 9.0677 6.21242C9.04469 6.78392 9.14241 7.35384 9.3545 7.88502C10.0553 8.13797 10.997 8.4577 12.3274 9.00191C15.1109 10.1396 15.2269 12.3175 15.2269 12.3175L15.2204 12.3165Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M24.8278 10.1747C26.0152 10.1736 27.1631 10.6013 28.0602 11.3792C29.199 11.447 30.1856 11.8982 30.8459 12.5431C30.8459 12.5431 28.1862 8.67891 23.4952 10.2853C23.0734 10.4361 22.6695 10.6329 22.2907 10.8722C23.0576 10.414 23.9345 10.1729 24.8278 10.1747Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M24.8278 10.1746C23.9363 10.1735 23.0613 10.4146 22.2962 10.8721C22.3411 10.8437 22.3871 10.8174 22.432 10.79C18.6422 13.0227 14.0005 19.8784 7.5609 19.9649C8.06833 20.5269 8.68818 20.976 9.38027 21.2831C10.0724 21.5902 10.8213 21.7484 11.5784 21.7476C12.0241 21.7373 12.4686 21.6967 12.9088 21.626C17.0983 19.9003 21.1213 15.7722 22.9477 13.7717C24.6373 11.9157 26.4988 11.2849 28.0602 11.3802C27.1632 10.602 26.0153 10.1738 24.8278 10.1746Z",
    fill: "black"
  }), React.createElement("path", {
    opacity: "0.49",
    d: "M32 16.1632C32.0018 14.8623 31.595 13.5938 30.8371 12.5366C30.1801 11.896 29.1946 11.4481 28.0602 11.3802C28.5987 11.8435 29.0306 12.4178 29.3264 13.0636C29.6222 13.7094 29.7748 14.4115 29.7739 15.1218C29.7739 16.7829 29.1716 18.6816 27.2182 19.7033C24.3712 21.1914 20.012 20.4829 17.1815 21.4016H17.1935C16.5681 21.78 16.1035 22.3751 15.8883 23.0737C15.8806 23.0988 15.8741 23.1229 15.8675 23.1481C16.6975 22.421 18.3334 21.8976 21.5242 22.3083C23.804 22.6017 25.614 22.6816 27.1689 22.236C28.6728 21.9081 29.9946 21.0177 30.8634 19.7471C31.6033 18.6985 32.0004 17.4465 32 16.1632Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M15.0452 23.4646C14.9604 23.7426 14.9154 24.0313 14.9116 24.3219C14.911 24.6562 14.9616 24.9885 15.0616 25.3074C15.0064 24.9091 15.0511 24.5032 15.1918 24.1265C15.3325 23.7497 15.5647 23.4139 15.8675 23.1492C15.8741 23.124 15.8806 23.0999 15.8883 23.0747C16.1021 22.3746 16.5659 21.7775 17.1914 21.3972H17.1782C16.9797 21.4613 16.7849 21.5363 16.5946 21.6217C16.2251 21.8081 15.8972 22.0675 15.6309 22.3842C15.3646 22.701 15.1653 23.0685 15.0452 23.4646Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M17.8746 26.8185C17.1259 26.589 16.4968 26.0754 16.1223 25.3876C15.7477 24.6999 15.6574 23.8928 15.8708 23.1393V23.1514C15.5681 23.4159 15.336 23.7516 15.1954 24.1282C15.0547 24.5047 15.0098 24.9103 15.0649 25.3085C15.2206 25.7907 15.4934 26.2269 15.859 26.5778C16.2245 26.9288 16.6713 27.1837 17.1595 27.3198C17.6476 27.4558 18.1619 27.4687 18.6562 27.3573C19.1506 27.246 19.6096 27.0138 19.9923 26.6816C19.327 26.985 18.5735 27.0337 17.8746 26.8185Z",
    fill: "black"
  }), React.createElement("g", {
    style: styles
  }, React.createElement("g", {
    style: styles
  }, React.createElement("path", {
    d: "M18.9149 26.6017C19.2258 25.6972 20.2289 24.3022 21.3052 24.9406C21.3052 24.9406 22.1812 25.4333 22.3641 24.0471C22.3641 24.0471 23.0211 27.309 19.8598 27.1995C19.8598 27.1995 20.5716 26.6794 20.5639 26.1451C20.5639 26.1396 19.8117 26.6039 18.9149 26.6017Z",
    fill: "black"
  }))), React.createElement("g", {
    style: styles
  }, React.createElement("g", {
    style: styles
  }, React.createElement("path", {
    d: "M20.1774 24.6067C20.4895 24.4479 20.7851 24.2869 21.36 24.5431C21.8067 24.7413 22.3685 23.9661 21.8823 23.274C21.8823 23.274 21.914 23.9891 21.3348 23.9825C20.7555 23.9759 20.4347 24.2278 20.1774 24.6067Z",
    fill: "black"
  }))), React.createElement("path", {
    d: "M23.3529 14.225C22.5962 15.2565 21.4859 16.1205 21.3556 16.3318C21.2253 16.5431 21.5746 17.2275 22.0947 17.2768C22.6148 17.326 22.2152 17.0786 22.1714 16.8388C22.1276 16.599 22.3258 16.9921 22.9433 16.899C23.5609 16.8059 22.7243 16.5782 22.7769 16.265C22.8294 15.9518 23.4711 15.3605 23.7252 14.7649C23.9792 14.1692 24.4139 14.7649 24.1916 15.2302C24.1029 15.4142 24.8968 14.7112 24.496 14.1747C24.0953 13.6381 23.7941 13.6228 23.3529 14.225ZM21.1935 16.4807C21.084 16.5902 20.7555 16.8278 20.7555 16.8278C20.7555 16.8278 21.0775 17.2746 21.4914 17.2658C21.4914 17.2658 21.5801 17.2231 21.452 17.0917C21.3238 16.9603 21.164 16.5596 21.1935 16.4807Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M10.0597 11.124C8.97894 10.6017 8.26281 9.96986 7.7843 9.33148C6.78179 9.60321 5.85686 10.106 5.08361 10.7995C4.31035 11.493 3.71027 12.3579 3.33144 13.3251C2.95262 14.2922 2.80557 15.3346 2.90208 16.3688C2.9986 17.403 3.33599 18.4002 3.88723 19.2806C5.05647 19.7425 6.30377 19.9749 7.56092 19.9649C6.94447 19.2841 6.51114 18.4578 6.30159 17.5636C6.09204 16.6694 6.11316 15.7366 6.36296 14.8528C6.61276 13.9689 7.08304 13.1631 7.72967 12.5109C8.3763 11.8586 9.17806 11.3814 10.0597 11.124Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M10.0739 9.12346C9.89324 9.10813 9.71037 9.10046 9.52641 9.10046C8.93842 9.10036 8.353 9.17805 7.78539 9.33151C8.2639 9.96989 8.98986 10.6017 10.0608 11.124C10.5541 10.9795 11.0655 10.9057 11.5795 10.905C11.7922 10.905 12.0046 10.9178 12.2157 10.9433C11.216 10.2852 10.3685 9.54941 10.0739 9.12346Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.2157 10.9455C11.2171 10.2853 10.3695 9.54943 10.0739 9.12347C10.7404 9.17814 11.3927 9.33288 12.0092 9.58066C11.9981 9.57711 11.987 9.57362 11.9759 9.57019C12.4073 10.386 12.7763 10.6378 13.764 10.6378C13.7694 10.6378 13.7542 10.6199 13.7211 10.5886C14.3149 11.0709 14.8227 11.6536 15.2204 12.3121C14.3863 11.5537 13.3355 11.0758 12.2157 10.9455Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M11.8828 7.16341C12.2161 7.36616 12.5362 7.58999 12.8409 7.83354C12.9176 7.89157 12.7041 7.31342 12.4577 7.20392C12.2731 7.13933 12.0746 7.12534 11.8828 7.16341ZM13.0643 7.99998C13.3937 8.20907 13.7114 8.43607 14.0159 8.67997C14.0936 8.73581 13.8845 8.15875 13.6392 8.04706C13.4551 7.98069 13.2567 7.96444 13.0643 7.99998ZM14.1779 8.81903C14.3801 9.00685 14.5535 9.22343 14.6926 9.46179C14.7309 9.51764 14.7024 9.08292 14.5579 8.96029C14.4462 8.87996 14.315 8.83116 14.1779 8.81903Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M9.05118 19.3605C9.02052 19.2653 9.39391 19.1415 9.48918 19.1415C9.67131 19.1713 9.84758 19.2297 10.0115 19.3145C9.7831 19.3993 9.54305 19.4484 9.29974 19.4602C9.21075 19.445 9.12601 19.411 9.05118 19.3605ZM10.3958 19.043C10.363 18.9696 10.6521 18.8415 10.7309 18.8295C10.8811 18.8374 11.029 18.8696 11.1689 18.9247C10.9921 19.0127 10.8031 19.0736 10.6083 19.1054C10.5338 19.0999 10.4614 19.0786 10.3958 19.043ZM11.5204 18.6302C11.4875 18.5721 11.7142 18.4418 11.7777 18.4243C11.9002 18.4181 12.0229 18.4314 12.1412 18.4637C12.0043 18.5526 11.8543 18.6194 11.6967 18.6619C11.6363 18.6638 11.5763 18.653 11.5204 18.6302ZM12.415 18.2239C12.381 18.1736 12.5781 18.0378 12.634 18.017C12.7456 18.0033 12.8586 18.007 12.9691 18.0279C12.8502 18.1186 12.7179 18.1902 12.5771 18.2404C12.5225 18.246 12.4673 18.2404 12.415 18.2239ZM13.2494 17.7673C13.2165 17.7246 13.3808 17.5976 13.43 17.5768C13.5261 17.5591 13.6244 17.5565 13.7213 17.5691C13.6227 17.6535 13.512 17.7226 13.3928 17.7739C13.345 17.7814 13.2963 17.7791 13.2494 17.7673ZM7.70325 19.4689C7.68792 19.3594 8.10401 19.2981 8.21023 19.3091C8.39767 19.3717 8.57396 19.4638 8.73254 19.5817C8.47501 19.6341 8.21096 19.6467 7.94962 19.619C7.8579 19.5868 7.77396 19.5356 7.70325 19.4689Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M7.95838 6.89409C8.24855 7.22258 8.9373 7.44158 8.9373 7.44158C8.9373 7.44158 8.77305 7.05943 8.80042 6.33236C8.80042 6.30717 7.95838 6.31922 7.81493 5.62828C7.78537 5.49031 7.66492 6.5623 7.95838 6.89409Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M5.0961 22.835C5.10785 22.7225 5.14317 22.6137 5.19977 22.5158C5.25638 22.4179 5.33298 22.333 5.42459 22.2667C5.43335 22.2601 5.44211 22.2568 5.45087 22.2513C5.38194 22.2351 5.3121 22.223 5.24173 22.2152C4.23872 22.0652 3.98468 22.663 3.92774 23.3332C3.92576 23.3697 3.92576 23.4062 3.92774 23.4427C4.04169 23.241 4.21082 23.0761 4.41527 22.9673C4.61971 22.8585 4.85097 22.8103 5.08186 22.8284L5.0961 22.835Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M6.3181 22.617C5.32166 22.0115 4.76103 21.9677 4.53874 23.6628C4.53874 23.6628 5.58774 22.8328 6.08377 23.3813C6.62141 23.9781 7.35506 23.4284 6.96962 23.0802C6.77609 22.895 6.55661 22.739 6.3181 22.617Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M5.90419 22.813C5.33917 23.1897 5.34027 24.0755 5.34027 24.0755C5.34027 24.0755 6.37175 23.5171 6.29072 23.17C6.27503 23.076 6.22854 22.99 6.15856 22.9253C6.08858 22.8607 5.99909 22.8212 5.90419 22.813ZM1.20449 15.8467C1.30062 15.7843 1.40899 15.7432 1.52231 15.7262C1.63563 15.7092 1.75128 15.7167 1.86148 15.7481C1.8716 15.7515 1.88147 15.7555 1.89105 15.7602C1.86016 15.6963 1.8258 15.6342 1.78812 15.574C1.27785 14.698 0.652614 14.8732 0.0963585 15.2455C0.0635088 15.2674 0.033944 15.2904 0.00437927 15.3145C0.23354 15.2767 0.468738 15.3053 0.682179 15.3969C0.89562 15.4884 1.07838 15.6392 1.20887 15.8314C1.20812 15.8366 1.20665 15.8418 1.20449 15.8467Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M2.27757 16.8891C1.91513 15.4514 1.62058 14.8952 0.232132 15.8894C0.232132 15.8894 1.42239 15.5467 1.55817 17.2395C1.62277 18.0411 2.39145 18.2009 2.38269 17.6775C2.38638 17.411 2.35096 17.1454 2.27757 16.8891Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M1.77061 16.1193C1.11361 15.9628 0.456619 16.5672 0.456619 16.5672C0.456619 16.5672 1.47277 16.5322 1.5965 17.1486C1.66987 17.4979 1.77061 16.1193 1.77061 16.1193Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M22.9477 13.7717C23.5868 13.0297 24.3552 12.4098 25.2154 11.9419C26.0422 11.504 27.216 11.2324 27.9244 11.2674L28.196 11.5007L28.0536 11.4886C27.0922 11.4254 26.1309 11.6141 25.2647 12.0361C24.394 12.4702 23.6091 13.0582 22.9477 13.7717Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M28.0252 11.2751C28.5537 11.3243 29.0712 11.457 29.5582 11.6682C30.0415 11.8732 30.4801 12.1708 30.8492 12.5442C30.4602 12.2019 30.0083 11.9386 29.5188 11.769C29.0893 11.6332 28.6466 11.5433 28.1982 11.5007L27.9223 11.2675L28.0252 11.2751Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M15.9299 22.951C16.0753 22.8478 16.2275 22.7545 16.3854 22.6718C16.4949 22.617 16.6044 22.5623 16.7238 22.5196C16.8431 22.4769 16.9559 22.4352 17.072 22.3958C17.5416 22.2551 18.0252 22.1663 18.5141 22.1308C19.4838 22.0682 20.4574 22.1068 21.4191 22.2458C22.3738 22.3864 23.3349 22.4785 24.2989 22.5218C25.2614 22.5524 26.2349 22.4955 27.1689 22.2403C26.2393 22.513 25.2636 22.5896 24.2978 22.5776C23.3308 22.5534 22.3656 22.4803 21.406 22.3586C20.4518 22.2394 19.4877 22.2196 18.5294 22.2995C18.0543 22.3422 17.5854 22.4374 17.1311 22.5831C17.0216 22.6225 16.9121 22.6586 16.8026 22.7079C16.6939 22.7523 16.5875 22.8024 16.484 22.8579C16.278 22.9681 16.0849 23.1007 15.908 23.2532L15.8303 23.3211C15.8547 23.1955 15.888 23.0719 15.9299 22.951Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M10.2392 11.5543C9.3085 11.7602 9.45195 12.4993 9.45195 12.4993C9.45195 12.4993 9.7465 12.1434 11.3682 11.9518C10.9821 11.8489 10.6046 11.716 10.2392 11.5543Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M15.0616 25.3096C15.0313 25.1044 15.0272 24.8961 15.0496 24.6898C15.0914 24.2686 15.2309 23.8629 15.4569 23.505C15.5741 23.3256 15.7107 23.1597 15.8642 23.0101L15.931 22.9488C15.931 22.9488 15.839 23.2444 15.8281 23.3167C15.7429 23.4054 15.6639 23.4997 15.5916 23.5992C15.3463 23.9214 15.1794 24.2963 15.1043 24.6942C15.063 24.8966 15.0486 25.1035 15.0616 25.3096Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M12.9088 21.626C12.4313 21.7322 11.9439 21.7876 11.4547 21.7914C10.9614 21.7774 10.4722 21.6968 10.0005 21.5516C9.52596 21.4103 9.06812 21.218 8.63509 20.9778C8.19647 20.7372 7.79577 20.4332 7.44594 20.0755L7.3441 19.966C7.3441 19.966 7.6934 19.966 7.7821 19.9573C8.07424 20.2672 8.40552 20.5378 8.76759 20.7621C9.17392 21.0168 9.60681 21.2265 10.0586 21.3873C10.5102 21.5541 10.9825 21.6584 11.4624 21.6972C11.9457 21.7235 12.4304 21.6997 12.9088 21.626Z",
    fill: "black"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "Dojo_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};

function _extends$c() {
  _extends$c = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$c.apply(this, arguments);
}
var ElmIcon = _ref => {
  var props = _extends$c({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Elm_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M16 16.8777L0.877846 32H31.1222L16 16.8777Z",
    fill: "#5FB4CB"
  }), React.createElement("path", {
    d: "M25.2916 24.4139L32 31.1224V17.7054L25.2916 24.4139Z",
    fill: "#EEA400"
  }), React.createElement("path", {
    d: "M15.1222 16L0 0.877747V31.1224L15.1222 16Z",
    fill: "#596277"
  }), React.createElement("path", {
    d: "M32 14.2258V0H17.7741L32 14.2258Z",
    fill: "#5FB4CB"
  }), React.createElement("path", {
    d: "M24.4479 8.42928L31.984 15.9654L24.4136 23.5358L16.8775 15.9997L24.4479 8.42928Z",
    fill: "#8CD636"
  }), React.createElement("path", {
    d: "M0.877655 0L7.84327 6.96571H22.9844L16.0187 0H0.877655Z",
    fill: "#8CD636"
  }), React.createElement("path", {
    d: "M16 15.1223L22.9152 8.20702H9.08467L16 15.1223Z",
    fill: "#EEA400"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "Elm_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var ElmIconDark = _ref2 => {
  var props = _extends$c({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M30 14.4476V2H17.5523L30 14.4476ZM2 2.76804L15.232 16L2 29.2321V2.76804ZM16 16.768L2.76811 30H29.232L16 16.768ZM24.1301 23.3621L30 29.2321V17.4922L24.1301 23.3621ZM29.986 15.9697L23.392 9.37562L16.7678 15.9998L23.3619 22.5939L29.986 15.9697ZM2.76794 2L8.86285 8.095H22.1114L16.0164 2H2.76794ZM22.0508 9.18114L16 15.232L9.94909 9.18114H22.0508Z",
    fill: "black",
    fillOpacity: "0.9"
  }));
};
var ElmIconLight = _ref3 => {
  var props = _extends$c({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M30 14.4476V2H17.5523L30 14.4476ZM2 2.76804L15.232 16L2 29.2321V2.76804ZM16 16.768L2.76811 30H29.232L16 16.768ZM24.1301 23.3621L30 29.2321V17.4922L24.1301 23.3621ZM29.986 15.9697L23.392 9.37562L16.7678 15.9998L23.3619 22.5939L29.986 15.9697ZM2.76794 2L8.86285 8.095H22.1114L16.0164 2H2.76794ZM22.0508 9.18114L16 15.232L9.94909 9.18114H22.0508Z",
    fill: "white",
    fillOpacity: "0.9"
  }));
};

function _extends$d() {
  _extends$d = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$d.apply(this, arguments);
}
var EmberIcon = _ref => {
  var props = _extends$d({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M28.9231 0H3.07692C1.37759 0 0 1.37759 0 3.07692V28.9231C0 30.6224 1.37759 32 3.07692 32H28.9231C30.6224 32 32 30.6224 32 28.9231V3.07692C32 1.37759 30.6224 0 28.9231 0Z",
    fill: "#E05C43"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.9996 16.1428C13.1304 10.9761 16.5209 8.71815 17.695 9.84836C18.8692 10.9761 18.4336 13.4072 16.2167 14.9269C14.0004 16.4472 12.9996 16.1428 12.9996 16.1428ZM16.2167 21.3964C13.2044 21.4722 13.5216 19.4958 13.5216 19.4958C13.5216 19.4958 24.5192 15.7367 21.5205 8.31142C20.1729 6.40103 18.607 5.8008 16.3907 5.84455C14.1737 5.88769 11.4441 7.2379 9.66154 11.2331C8.81129 13.1398 8.52253 14.946 8.34915 16.3147C8.34915 16.3147 6.40125 16.7054 5.35788 15.839C4.31513 14.9713 3.76661 15.839 3.76661 15.839C3.76661 15.839 1.97049 17.9379 3.75365 18.6337C5.5362 19.3288 8.31213 19.4693 8.31213 19.4693H8.3109C8.56634 21.3181 9.19507 23.0954 11.4805 24.58C15.3127 27.0702 20.9997 24.4401 20.9997 24.4401C24.4081 23.0171 26.6719 20.8146 27.6369 19.7417C27.9479 19.3948 27.9374 18.8716 27.6141 18.5363L26.5041 17.3846C26.1833 17.0512 25.6613 17.0203 25.3034 17.3137C23.8207 18.5265 19.9237 21.3964 16.2167 21.3964Z",
    fill: "#FEFEFE"
  }));
};
var EmberIconLight = _ref2 => {
  var props = _extends$d({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.88462 1H28.1154C29.7085 1 31 2.29149 31 3.88462V28.1154C31 29.7085 29.7085 31 28.1154 31H3.88462C2.29149 31 1 29.7085 1 28.1154V3.88462C1 2.29149 2.29149 1 3.88462 1ZM17.5891 10.2328C16.4883 9.17327 13.3097 11.2901 13.1871 16.1339C13.1871 16.1339 14.1253 16.4193 16.2031 14.994C18.2815 13.5693 18.6899 11.2901 17.5891 10.2328ZM13.6765 19.2774C13.6765 19.2774 13.3791 21.1302 16.2031 21.0591C19.6784 21.0591 23.3319 18.3686 24.7219 17.2316C25.0574 16.9566 25.5468 16.9855 25.8476 17.298L26.8882 18.3778C27.1913 18.6921 27.2012 19.1826 26.9096 19.5079C26.0049 20.5137 23.8826 22.5786 20.6873 23.9126C20.6873 23.9126 15.3557 26.3783 11.763 24.0437C9.62038 22.6519 9.03094 20.9857 8.79147 19.2525H8.79262C8.79262 19.2525 6.19018 19.1208 4.51905 18.4691C2.84733 17.8168 4.53119 15.849 4.53119 15.849C4.53119 15.849 5.04543 15.0356 6.02301 15.849C7.00117 16.6613 8.82733 16.2951 8.82733 16.2951C8.98987 15.0119 9.26059 13.3185 10.0577 11.531C11.7288 7.78553 14.2879 6.51971 16.3662 6.47927C18.444 6.43825 19.9121 7.00096 21.1755 8.79196C23.9867 15.7531 13.6765 19.2774 13.6765 19.2774Z",
    fill: "white"
  }));
};
var EmberIconDark = _ref3 => {
  var props = _extends$d({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.88462 1H28.1154C29.7085 1 31 2.29149 31 3.88462V28.1154C31 29.7085 29.7085 31 28.1154 31H3.88462C2.29149 31 1 29.7085 1 28.1154V3.88462C1 2.29149 2.29149 1 3.88462 1ZM17.5891 10.2328C16.4883 9.17327 13.3097 11.2901 13.1871 16.1339C13.1871 16.1339 14.1253 16.4193 16.2031 14.994C18.2815 13.5693 18.6899 11.2901 17.5891 10.2328ZM13.6765 19.2774C13.6765 19.2774 13.3791 21.1302 16.2031 21.0591C19.6784 21.0591 23.3319 18.3686 24.7219 17.2316C25.0574 16.9566 25.5468 16.9855 25.8476 17.298L26.8882 18.3778C27.1913 18.6921 27.2012 19.1826 26.9096 19.5079C26.0049 20.5137 23.8826 22.5786 20.6873 23.9126C20.6873 23.9126 15.3557 26.3783 11.763 24.0437C9.62038 22.6519 9.03094 20.9857 8.79147 19.2525H8.79262C8.79262 19.2525 6.19018 19.1208 4.51905 18.4691C2.84733 17.8168 4.53119 15.849 4.53119 15.849C4.53119 15.849 5.04543 15.0356 6.02301 15.849C7.00117 16.6613 8.82733 16.2951 8.82733 16.2951C8.98987 15.0119 9.26059 13.3185 10.0577 11.531C11.7288 7.78553 14.2879 6.51971 16.3662 6.47927C18.444 6.43825 19.9121 7.00096 21.1755 8.79196C23.9867 15.7531 13.6765 19.2774 13.6765 19.2774Z",
    fill: "black"
  }));
};

function _extends$e() {
  _extends$e = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$e.apply(this, arguments);
}
var ExpoIcon = _ref => {
  var props = _extends$e({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 27.1829C0.0579266 27.8911 0.30637 28.6013 0.957418 29.5547C1.72959 30.6854 3.0582 31.3068 4.02735 30.3099C4.68134 29.6371 11.7531 17.2755 15.1611 12.5913C15.5703 12.0131 16.4156 12.0131 16.825 12.5913C20.2331 17.2755 27.3048 29.6371 27.9588 30.3099C28.9277 31.3068 30.2566 30.6854 31.0287 29.5547C31.789 28.4414 32 27.6598 32 26.8258C32 26.2577 20.9865 5.76148 19.8774 4.05542C18.8107 2.41448 18.4849 2.05756 16.6811 2L15.305 2C13.5011 2.05756 13.1754 2.41448 12.1085 4.05542C11.0227 5.72604 0.439216 25.4143 0 26.7649L0 27.1829Z",
    fill: "#1173B6"
  }));
};
var ExpoIconDark = _ref2 => {
  var props = _extends$e({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 24.8608C2.05028 25.4755 2.26595 26.092 2.83111 26.9196C3.50142 27.9012 4.65476 28.4406 5.49605 27.5752C6.06377 26.9912 12.2026 16.2603 15.161 12.1941C15.5162 11.6921 16.2501 11.6921 16.6055 12.1941C19.5639 16.2603 25.7027 26.9912 26.2704 27.5752C27.1115 28.4406 28.2651 27.9012 28.9354 26.9196C29.5953 25.9532 29.7785 25.2747 29.7785 24.5507C29.7785 24.0576 20.2179 6.26526 19.2551 4.78426C18.3292 3.3598 18.0463 3.04997 16.4805 3H15.286C13.72 3.04997 13.4373 3.3598 12.5112 4.78426C11.5685 6.2345 2.38127 23.3255 2 24.4979V24.8608Z",
    fill: "black"
  }));
};
var ExpoIconLight = _ref3 => {
  var props = _extends$e({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 24.8608C2.05028 25.4755 2.26595 26.092 2.83111 26.9196C3.50142 27.9012 4.65476 28.4406 5.49605 27.5752C6.06377 26.9912 12.2026 16.2603 15.161 12.1941C15.5162 11.6921 16.2501 11.6921 16.6055 12.1941C19.5639 16.2603 25.7027 26.9912 26.2704 27.5752C27.1115 28.4406 28.2651 27.9012 28.9354 26.9196C29.5953 25.9532 29.7785 25.2747 29.7785 24.5507C29.7785 24.0576 20.2179 6.26526 19.2551 4.78426C18.3292 3.3598 18.0463 3.04997 16.4805 3H15.286C13.72 3.04997 13.4373 3.3598 12.5112 4.78426C11.5685 6.2345 2.38127 23.3255 2 24.4979V24.8608Z",
    fill: "white"
  }));
};

function _extends$f() {
  _extends$f = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$f.apply(this, arguments);
}
var ExpressIcon = _ref => {
  var props = _extends$f({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M28 32H4C1.7909 32 0 30.2091 0 28V4C0 1.7909 1.7909 0 4 0H28C30.2091 0 32 1.7909 32 4V28C32 30.2091 30.2091 32 28 32Z",
    fill: "#FEFEFE"
  }), React.createElement("path", {
    d: "M19 4H17V3H19V4ZM30 10H28V11H30V10ZM14 1H12V2H14V1ZM27 21V23H26V24H24V25H27V24H28V21H27ZM25 2H24V3H25V2ZM11 11H10V12H11V11ZM9 3H8V4H9V3ZM15 14H13V16H15V14ZM27 13V14H28V15H29V13H27ZM25 11H24V12H25V11ZM15 22V23H16V24H17V22H15ZM27 18H26V19H27V18ZM18 18H17V19H18V18ZM16 29H15V30H16V29ZM10 28H9V29H10V28ZM11 18H10V19H11V18ZM8 19H7V20H8V19ZM7 26H6V27H7V26ZM3 26H2V27H3V26ZM3 19H1V20H3V19ZM14 26H12V27H14V26ZM10 22H9V24H10V22ZM5 22H4V24H5V22ZM27 28V29H26V30H28V28H27ZM11 6H10V8H11V6ZM20 26H19V28H20V26ZM2 9H1V11H2V9ZM5 7H4V9H5V7ZM17 10V12H18V11H19V10H17ZM3 3V5H4V4H5V3H3ZM23 6H21V8H23V6ZM26 5V7H27V8H28V7H29V5H26Z",
    fill: "#F9F9F9"
  }), React.createElement("path", {
    d: "M3.16919 17.8718V14.9783H6.78198V14.809H3.16919V12.1693H7.01041V12H3V18.041H7.0443V17.8717H3.16919V17.8718ZM10.3016 13.6922L8.80404 15.6635L7.34033 13.6922H7.12044L8.70264 15.7904L6.96816 18.041H7.17114L8.80404 15.9173L10.4454 18.041H10.6569L8.91398 15.7904L10.5046 13.6922H10.3016V13.6922ZM11.1646 19.5302V16.8227H11.1815C11.2831 17.2176 11.4833 17.5348 11.7823 17.7746C12.0812 18.0143 12.462 18.1341 12.9246 18.1341C13.2235 18.1341 13.4886 18.0735 13.7198 17.9522C13.9511 17.831 14.1442 17.666 14.2993 17.4573C14.4544 17.2486 14.5729 17.006 14.6547 16.7296C14.7365 16.4532 14.7773 16.1627 14.7773 15.8582C14.7773 15.531 14.735 15.2293 14.6504 14.9529C14.5657 14.6765 14.4432 14.4368 14.2823 14.2337C14.1216 14.0306 13.927 13.8726 13.6985 13.7599C13.4701 13.6471 13.2121 13.5906 12.9244 13.5906C12.7044 13.5906 12.4999 13.623 12.311 13.6879C12.122 13.7528 11.9542 13.8444 11.8076 13.9629C11.661 14.0814 11.534 14.221 11.4269 14.3817C11.3197 14.5425 11.238 14.7187 11.1815 14.9105H11.1646V13.6921H10.9954V19.5301H11.1646V19.5302ZM12.9246 17.9734C12.3944 17.9734 11.9685 17.7915 11.647 17.4277C11.3255 17.0639 11.1646 16.5407 11.1646 15.8583C11.1646 15.5762 11.2041 15.3083 11.2831 15.0545C11.3622 14.8008 11.4764 14.5779 11.6258 14.3861C11.7753 14.1943 11.9601 14.042 12.1799 13.9292C12.3999 13.8165 12.6481 13.76 12.9246 13.76C13.2066 13.76 13.4533 13.8164 13.6648 13.9292C13.8764 14.042 14.0512 14.1957 14.1895 14.3904C14.3276 14.585 14.432 14.8078 14.5025 15.0588C14.573 15.3098 14.6083 15.5763 14.6083 15.8584C14.6083 16.1122 14.5758 16.3646 14.511 16.6156C14.4461 16.8666 14.346 17.0923 14.2106 17.2925C14.0753 17.4928 13.9018 17.6563 13.6904 17.7832C13.4786 17.9099 13.2235 17.9734 12.9246 17.9734ZM15.7081 18.041V15.5789C15.7081 15.342 15.7419 15.1107 15.8096 14.8851C15.8773 14.6594 15.9816 14.4606 16.1227 14.2886C16.2636 14.1167 16.4428 13.9812 16.6599 13.8826C16.8771 13.7839 17.1352 13.7429 17.4342 13.7599V13.5906C17.1746 13.5851 16.9476 13.6132 16.7531 13.6752C16.5584 13.7373 16.3907 13.8219 16.2496 13.929C16.1086 14.0362 15.9958 14.1617 15.9112 14.3055C15.8265 14.4494 15.7646 14.6031 15.725 14.7667H15.7081V13.6922H15.5389V18.041H15.7081V18.041ZM17.6456 15.9005H21.2838C21.2951 15.6016 21.2654 15.3138 21.195 15.0375C21.1244 14.7611 21.0116 14.5158 20.8565 14.3014C20.7015 14.0871 20.5012 13.915 20.2558 13.7853C20.0105 13.6555 19.7186 13.5906 19.3801 13.5906C19.1375 13.5906 18.9007 13.6414 18.6694 13.7429C18.4382 13.8445 18.235 13.9925 18.0601 14.1872C17.8853 14.3818 17.7443 14.6201 17.6372 14.9022C17.53 15.1842 17.4763 15.5056 17.4763 15.8667C17.4763 16.1881 17.513 16.4884 17.5864 16.7677C17.6596 17.0469 17.7725 17.2894 17.9247 17.4954C18.0771 17.7012 18.273 17.8606 18.5127 17.9735C18.7525 18.0862 19.0415 18.1399 19.38 18.1342C19.8763 18.1342 20.2937 17.9947 20.6322 17.7155C20.9706 17.4362 21.1708 17.0428 21.2329 16.5351H21.0636C20.9903 17.0146 20.8028 17.3742 20.501 17.6139C20.1992 17.8536 19.8199 17.9735 19.363 17.9735C19.0528 17.9735 18.7904 17.9198 18.5761 17.8127C18.3618 17.7055 18.187 17.5589 18.0516 17.3727C17.9162 17.1865 17.8161 16.968 17.7512 16.717C17.6865 16.466 17.6513 16.1938 17.6456 15.9005ZM21.1145 15.7313H17.6456C17.6625 15.4267 17.7189 15.1531 17.8148 14.9106C17.9107 14.6681 18.0362 14.4607 18.1913 14.2887C18.3464 14.1168 18.527 13.9855 18.7329 13.8953C18.9387 13.805 19.1602 13.7599 19.397 13.7599C19.679 13.7599 19.9272 13.8121 20.1415 13.9164C20.3558 14.0208 20.535 14.1631 20.6788 14.3437C20.8227 14.5241 20.9313 14.7343 21.0046 14.974C21.0779 15.2137 21.1145 15.4662 21.1145 15.7313ZM24.795 14.9782H24.9642C24.9642 14.493 24.8232 14.1406 24.5412 13.9206C24.2592 13.7006 23.8756 13.5906 23.3905 13.5906C23.1198 13.5906 22.8913 13.6244 22.7051 13.6922C22.5189 13.7599 22.3668 13.8473 22.2483 13.9546C22.1298 14.0617 22.0452 14.1802 21.9944 14.3098C21.9436 14.4395 21.9183 14.5636 21.9183 14.6821C21.9183 14.919 21.9606 15.1079 22.0452 15.249C22.1298 15.39 22.2624 15.5 22.4428 15.5789C22.5669 15.6353 22.7079 15.6861 22.8659 15.7313C23.0238 15.7764 23.2071 15.8243 23.4158 15.8751C23.6019 15.9202 23.7852 15.9654 23.9658 16.0105C24.1463 16.0556 24.3056 16.1163 24.4439 16.1924C24.582 16.2685 24.6949 16.3659 24.7822 16.4843C24.8697 16.6027 24.9134 16.7578 24.9134 16.9497C24.9134 17.1358 24.8696 17.2937 24.7822 17.4234C24.6949 17.5531 24.5834 17.6589 24.448 17.7407C24.3126 17.8225 24.1618 17.8818 23.9954 17.9184C23.8291 17.9551 23.6668 17.9734 23.5089 17.9734C22.9956 17.9734 22.6021 17.8592 22.3286 17.6307C22.055 17.4022 21.9183 17.0427 21.9183 16.552H21.749C21.749 17.0991 21.8971 17.4996 22.1932 17.7534C22.4893 18.0072 22.9279 18.1341 23.5089 18.1341C23.6951 18.1341 23.8825 18.113 24.0715 18.0707C24.2604 18.0285 24.4297 17.9593 24.5792 17.8635C24.7286 17.7675 24.8498 17.6435 24.9429 17.4912C25.036 17.3389 25.0825 17.1528 25.0825 16.9328C25.0825 16.7241 25.0416 16.5548 24.9599 16.4251C24.8781 16.2954 24.7709 16.1882 24.6384 16.1036C24.5058 16.019 24.3563 15.9527 24.19 15.9048C24.0236 15.8569 23.8557 15.8103 23.6866 15.7653C23.4497 15.7032 23.2424 15.6497 23.0648 15.6045C22.887 15.5594 22.722 15.5058 22.5697 15.4437C22.4231 15.3817 22.3061 15.2928 22.2186 15.1772C22.1312 15.0616 22.0875 14.8966 22.0875 14.6822C22.0875 14.6427 22.0988 14.5721 22.1213 14.4706C22.1439 14.3691 22.1975 14.2662 22.2822 14.1618C22.3667 14.0575 22.4965 13.9644 22.6713 13.8827C22.8462 13.8009 23.0858 13.76 23.3905 13.76C23.5992 13.76 23.7896 13.7825 23.9616 13.8277C24.1335 13.8728 24.2816 13.9447 24.4058 14.0434C24.5299 14.1421 24.6258 14.2677 24.6934 14.42C24.761 14.5722 24.795 14.7582 24.795 14.9782ZM28.7123 14.9782H28.8816C28.8816 14.493 28.7406 14.1406 28.4585 13.9206C28.1765 13.7006 27.793 13.5906 27.3079 13.5906C27.0372 13.5906 26.8088 13.6244 26.6226 13.6922C26.4364 13.7599 26.2841 13.8473 26.1657 13.9546C26.0472 14.0617 25.9625 14.1802 25.9118 14.3098C25.8611 14.4395 25.8356 14.5636 25.8356 14.6821C25.8356 14.919 25.878 15.1079 25.9626 15.249C26.0472 15.39 26.1797 15.5 26.3603 15.5789C26.4843 15.6353 26.6253 15.6861 26.7832 15.7313C26.9412 15.7764 27.1245 15.8243 27.3332 15.8751C27.5194 15.9202 27.7027 15.9654 27.8831 16.0105C28.0636 16.0556 28.223 16.1163 28.3611 16.1924C28.4993 16.2685 28.6121 16.3659 28.6995 16.4843C28.7869 16.6027 28.8306 16.7578 28.8306 16.9497C28.8306 17.1358 28.7869 17.2937 28.6995 17.4234C28.612 17.5531 28.5007 17.6589 28.3653 17.7407C28.2299 17.8225 28.079 17.8818 27.9126 17.9184C27.7462 17.9551 27.584 17.9734 27.4262 17.9734C26.9129 17.9734 26.5195 17.8592 26.2459 17.6307C25.9724 17.4022 25.8355 17.0427 25.8355 16.552H25.6664C25.6664 17.0991 25.8144 17.4996 26.1107 17.7534C26.4067 18.0072 26.8453 18.1341 27.4263 18.1341C27.6124 18.1341 27.7999 18.113 27.9889 18.0707C28.1778 18.0285 28.347 17.9593 28.4965 17.8635C28.646 17.7675 28.7673 17.6435 28.8603 17.4912C28.9535 17.3388 29 17.1526 29 16.9327C29 16.724 28.9591 16.5547 28.8773 16.425C28.7955 16.2953 28.6884 16.1881 28.5559 16.1035C28.4234 16.019 28.2739 15.9527 28.1075 15.9047C27.9411 15.8568 27.7732 15.8102 27.604 15.7651C27.3671 15.7031 27.1598 15.6495 26.9821 15.6043C26.8045 15.5592 26.6395 15.5056 26.4872 15.4435C26.3406 15.3815 26.2235 15.2926 26.136 15.177C26.0486 15.0614 26.0049 14.8964 26.0049 14.682C26.0049 14.6425 26.0162 14.572 26.0388 14.4705C26.0613 14.3689 26.1149 14.266 26.1995 14.1616C26.2841 14.0573 26.4138 13.9642 26.5887 13.8825C26.7635 13.8007 27.0033 13.7598 27.3079 13.7598C27.5166 13.7598 27.707 13.7823 27.8789 13.8275C28.051 13.8726 28.199 13.9445 28.3232 14.0432C28.4473 14.1419 28.5431 14.2675 28.6108 14.4198C28.6785 14.572 28.7123 14.7582 28.7123 14.9782Z",
    fill: "#212221"
  }));
};
var ExpressIconDark = _ref2 => {
  var props = _extends$f({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M1.18874 18.5493V15.3218H5.21835V15.1331H1.18874V12.1887H5.47315V12H1V18.738H5.5109V18.5493H1.18874ZM9.14416 13.8874L7.4738 16.0862L5.8412 13.8874H5.59583L7.36056 16.2278L5.42597 18.738H5.65246L7.4738 16.3693L9.30459 18.738H9.54051L7.59649 16.2278L9.37065 13.8874H9.14416ZM10.1067 20.399V17.3791H10.1256C10.2389 17.8195 10.4622 18.1734 10.7956 18.4408C11.1291 18.7082 11.5537 18.8418 12.0696 18.8418C12.4031 18.8418 12.6988 18.7742 12.9567 18.639C13.2147 18.5037 13.4301 18.3197 13.6032 18.0869C13.7762 17.8541 13.9083 17.5836 13.9995 17.2753C14.0907 16.967 14.1363 16.643 14.1363 16.3033C14.1363 15.9384 14.0892 15.6018 13.9948 15.2935C13.9004 14.9852 13.7636 14.7179 13.5843 14.4914C13.405 14.2649 13.1879 14.0887 12.9331 13.9629C12.6783 13.8371 12.3905 13.7742 12.0696 13.7742C11.8243 13.7742 11.5962 13.8103 11.3855 13.8827C11.1747 13.955 10.9875 14.0573 10.824 14.1894C10.6604 14.3215 10.5188 14.4772 10.3993 14.6565C10.2797 14.8358 10.1885 15.0324 10.1256 15.2463H10.1067V13.8874H9.918V20.399H10.1067ZM12.0696 18.6625C11.4782 18.6625 11.0033 18.4597 10.6446 18.0539C10.286 17.6481 10.1067 17.0645 10.1067 16.3033C10.1067 15.9887 10.1508 15.6899 10.2389 15.4068C10.3269 15.1237 10.4543 14.8752 10.6211 14.6612C10.7878 14.4473 10.9938 14.2775 11.2392 14.1516C11.4845 14.0258 11.7614 13.9629 12.0696 13.9629C12.3842 13.9629 12.6595 14.0258 12.8954 14.1516C13.1313 14.2775 13.3263 14.4489 13.4805 14.666C13.6346 14.883 13.751 15.1315 13.8296 15.4115C13.9083 15.6915 13.9476 15.9887 13.9476 16.3033C13.9476 16.5864 13.9114 16.8679 13.8391 17.1479C13.7667 17.4279 13.6551 17.6795 13.5041 17.9029C13.3531 18.1262 13.1596 18.3087 12.9237 18.4502C12.6878 18.5918 12.4031 18.6625 12.0696 18.6625ZM15.1744 18.738V15.9919C15.1744 15.7276 15.2122 15.4697 15.2877 15.218C15.3632 14.9664 15.4796 14.7446 15.6368 14.5527C15.7941 14.3608 15.9939 14.2098 16.2361 14.0997C16.4783 13.9896 16.7661 13.944 17.0996 13.9629V13.7742C16.8102 13.7679 16.5569 13.7993 16.3399 13.8685C16.1228 13.9377 15.9357 14.0321 15.7784 14.1516C15.6211 14.2712 15.4953 14.4112 15.4009 14.5716C15.3065 14.732 15.2373 14.9035 15.1933 15.0859H15.1744V13.8874H14.9857V18.738H15.1744ZM17.3355 16.3505H21.3934C21.406 16.017 21.373 15.6962 21.2943 15.3879C21.2157 15.0796 21.0899 14.8059 20.9169 14.5669C20.7438 14.3278 20.5205 14.1359 20.2468 13.9912C19.9732 13.8465 19.6476 13.7742 19.2701 13.7742C18.9996 13.7742 18.7353 13.8308 18.4774 13.944C18.2194 14.0573 17.993 14.2224 17.7979 14.4395C17.6029 14.6565 17.4456 14.9223 17.3261 15.2369C17.2065 15.5515 17.1468 15.9101 17.1468 16.3127C17.1468 16.6713 17.1877 17.0063 17.2694 17.3178C17.3512 17.6292 17.4771 17.8997 17.6469 18.1294C17.8168 18.359 18.0354 18.5367 18.3028 18.6625C18.5702 18.7884 18.8926 18.8481 19.2701 18.8418C19.8237 18.8418 20.2893 18.6861 20.6668 18.3747C21.0443 18.0633 21.2676 17.6245 21.3368 17.0582H21.1481C21.0663 17.593 20.8571 17.9941 20.5205 18.2615C20.1839 18.5289 19.7608 18.6625 19.2512 18.6625C18.9052 18.6625 18.6126 18.6028 18.3736 18.4832C18.1345 18.3637 17.9395 18.2001 17.7885 17.9925C17.6375 17.7849 17.5258 17.5411 17.4535 17.2611C17.3811 16.9812 17.3418 16.6776 17.3355 16.3505ZM21.2047 16.1617H17.3355C17.3544 15.822 17.4173 15.5169 17.5242 15.2463C17.6312 14.9758 17.7712 14.7446 17.9442 14.5527C18.1172 14.3608 18.3185 14.2146 18.5482 14.1139C18.7778 14.0132 19.0247 13.9629 19.289 13.9629C19.6035 13.9629 19.8804 14.0211 20.1194 14.1375C20.3585 14.2539 20.5582 14.4127 20.7187 14.6141C20.8791 14.8154 21.0002 15.0497 21.082 15.3171C21.1638 15.5845 21.2047 15.866 21.2047 16.1617ZM25.3098 15.3218H25.4985C25.4985 14.7808 25.3413 14.3876 25.0267 14.1422C24.7121 13.8968 24.2843 13.7742 23.7432 13.7742C23.4413 13.7742 23.1865 13.8119 22.9788 13.8874C22.7712 13.9629 22.6014 14.0604 22.4692 14.18C22.3371 14.2995 22.2428 14.4316 22.1861 14.5763C22.1295 14.721 22.1012 14.8594 22.1012 14.9915C22.1012 15.2558 22.1484 15.4665 22.2428 15.6238C22.3371 15.7811 22.485 15.9038 22.6863 15.9919C22.8247 16.0548 22.982 16.1114 23.1582 16.1617C23.3343 16.2121 23.5388 16.2655 23.7716 16.3222C23.9792 16.3725 24.1836 16.4228 24.385 16.4732C24.5863 16.5235 24.764 16.5911 24.9182 16.676C25.0723 16.761 25.1981 16.8695 25.2956 17.0016C25.3932 17.1337 25.4419 17.3068 25.4419 17.5207C25.4419 17.7283 25.3932 17.9044 25.2956 18.0491C25.1981 18.1938 25.0739 18.3118 24.9229 18.403C24.7719 18.4943 24.6036 18.5603 24.418 18.6012C24.2324 18.6421 24.0515 18.6625 23.8754 18.6625C23.3029 18.6625 22.864 18.5351 22.5589 18.2803C22.2538 18.0255 22.1012 17.6245 22.1012 17.0771H21.9125C21.9125 17.6874 22.0776 18.1341 22.4079 18.4172C22.7382 18.7003 23.2274 18.8418 23.8754 18.8418C24.083 18.8418 24.2922 18.8183 24.5029 18.7711C24.7137 18.7239 24.9024 18.6468 25.0692 18.5399C25.2359 18.4329 25.3711 18.2945 25.4749 18.1246C25.5788 17.9548 25.6307 17.7472 25.6307 17.5018C25.6307 17.269 25.585 17.0803 25.4938 16.9356C25.4026 16.7909 25.2831 16.6713 25.1352 16.577C24.9874 16.4826 24.8206 16.4087 24.635 16.3552C24.4495 16.3017 24.2623 16.2498 24.0735 16.1995C23.8093 16.1303 23.5781 16.0705 23.3799 16.0202C23.1817 15.9698 22.9977 15.9101 22.8279 15.8409C22.6643 15.7717 22.5337 15.6726 22.4362 15.5436C22.3387 15.4146 22.2899 15.2306 22.2899 14.9915C22.2899 14.9475 22.3025 14.8689 22.3277 14.7556C22.3529 14.6424 22.4126 14.5276 22.507 14.4112C22.6014 14.2948 22.7461 14.191 22.9411 14.0997C23.1361 14.0085 23.4035 13.9629 23.7432 13.9629C23.976 13.9629 24.1884 13.9881 24.3802 14.0384C24.5721 14.0887 24.7373 14.1689 24.8757 14.279C25.0141 14.3891 25.1211 14.5291 25.1966 14.699C25.272 14.8689 25.3098 15.0765 25.3098 15.3218ZM29.6791 15.3218H29.8679C29.8679 14.7808 29.7106 14.3876 29.396 14.1422C29.0815 13.8968 28.6537 13.7742 28.1126 13.7742C27.8106 13.7742 27.5558 13.8119 27.3482 13.8874C27.1406 13.9629 26.9707 14.0604 26.8386 14.18C26.7065 14.2995 26.6121 14.4316 26.5555 14.5763C26.4989 14.721 26.4706 14.8594 26.4706 14.9915C26.4706 15.2558 26.5177 15.4665 26.6121 15.6238C26.7065 15.7811 26.8543 15.9038 27.0556 15.9919C27.1941 16.0548 27.3513 16.1114 27.5275 16.1617C27.7037 16.2121 27.9081 16.2655 28.1409 16.3222C28.3485 16.3725 28.553 16.4228 28.7543 16.4732C28.9556 16.5235 29.1334 16.5911 29.2875 16.676C29.4416 16.761 29.5675 16.8695 29.665 17.0016C29.7625 17.1337 29.8113 17.3068 29.8113 17.5207C29.8113 17.7283 29.7625 17.9044 29.665 18.0491C29.5675 18.1938 29.4432 18.3118 29.2922 18.403C29.1412 18.4943 28.9729 18.5603 28.7873 18.6012C28.6017 18.6421 28.4209 18.6625 28.2447 18.6625C27.6722 18.6625 27.2334 18.5351 26.9282 18.2803C26.6231 18.0255 26.4706 17.6245 26.4706 17.0771H26.2818C26.2818 17.6874 26.447 18.1341 26.7773 18.4172C27.1076 18.7003 27.5967 18.8418 28.2447 18.8418C28.4523 18.8418 28.6615 18.8183 28.8723 18.7711C29.083 18.7239 29.2718 18.6468 29.4385 18.5399C29.6052 18.4329 29.7405 18.2945 29.8443 18.1246C29.9481 17.9548 30 17.7472 30 17.5018C30 17.269 29.9544 17.0803 29.8632 16.9356C29.7719 16.7909 29.6524 16.6713 29.5046 16.577C29.3567 16.4826 29.19 16.4087 29.0044 16.3552C28.8188 16.3017 28.6316 16.2498 28.4429 16.1995C28.1787 16.1303 27.9474 16.0705 27.7493 16.0202C27.5511 15.9698 27.3671 15.9101 27.1972 15.8409C27.0336 15.7717 26.9031 15.6726 26.8056 15.5436C26.708 15.4146 26.6593 15.2306 26.6593 14.9915C26.6593 14.9475 26.6719 14.8689 26.697 14.7556C26.7222 14.6424 26.782 14.5276 26.8763 14.4112C26.9707 14.2948 27.1154 14.191 27.3104 14.0997C27.5055 14.0085 27.7729 13.9629 28.1126 13.9629C28.3454 13.9629 28.5577 13.9881 28.7496 14.0384C28.9415 14.0887 29.1066 14.1689 29.245 14.279C29.3834 14.3891 29.4904 14.5291 29.5659 14.699C29.6414 14.8689 29.6791 15.0765 29.6791 15.3218Z",
    fill: "black"
  }));
};
var ExpressIconLight = _ref3 => {
  var props = _extends$f({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M1.18874 18.5493V15.3218H5.21835V15.1331H1.18874V12.1887H5.47315V12H1V18.738H5.5109V18.5493H1.18874ZM9.14416 13.8874L7.4738 16.0862L5.8412 13.8874H5.59583L7.36056 16.2278L5.42597 18.738H5.65246L7.4738 16.3693L9.30459 18.738H9.54051L7.59649 16.2278L9.37065 13.8874H9.14416ZM10.1067 20.399V17.3791H10.1256C10.2389 17.8195 10.4622 18.1734 10.7956 18.4408C11.1291 18.7082 11.5537 18.8418 12.0696 18.8418C12.4031 18.8418 12.6988 18.7742 12.9567 18.639C13.2147 18.5037 13.4301 18.3197 13.6032 18.0869C13.7762 17.8541 13.9083 17.5836 13.9995 17.2753C14.0907 16.967 14.1363 16.643 14.1363 16.3033C14.1363 15.9384 14.0892 15.6018 13.9948 15.2935C13.9004 14.9852 13.7636 14.7179 13.5843 14.4914C13.405 14.2649 13.1879 14.0887 12.9331 13.9629C12.6783 13.8371 12.3905 13.7742 12.0696 13.7742C11.8243 13.7742 11.5962 13.8103 11.3855 13.8827C11.1747 13.955 10.9875 14.0573 10.824 14.1894C10.6604 14.3215 10.5188 14.4772 10.3993 14.6565C10.2797 14.8358 10.1885 15.0324 10.1256 15.2463H10.1067V13.8874H9.918V20.399H10.1067ZM12.0696 18.6625C11.4782 18.6625 11.0033 18.4597 10.6446 18.0539C10.286 17.6481 10.1067 17.0645 10.1067 16.3033C10.1067 15.9887 10.1508 15.6899 10.2389 15.4068C10.3269 15.1237 10.4543 14.8752 10.6211 14.6612C10.7878 14.4473 10.9938 14.2775 11.2392 14.1516C11.4845 14.0258 11.7614 13.9629 12.0696 13.9629C12.3842 13.9629 12.6595 14.0258 12.8954 14.1516C13.1313 14.2775 13.3263 14.4489 13.4805 14.666C13.6346 14.883 13.751 15.1315 13.8296 15.4115C13.9083 15.6915 13.9476 15.9887 13.9476 16.3033C13.9476 16.5864 13.9114 16.8679 13.8391 17.1479C13.7667 17.4279 13.6551 17.6795 13.5041 17.9029C13.3531 18.1262 13.1596 18.3087 12.9237 18.4502C12.6878 18.5918 12.4031 18.6625 12.0696 18.6625ZM15.1744 18.738V15.9919C15.1744 15.7276 15.2122 15.4697 15.2877 15.218C15.3632 14.9664 15.4796 14.7446 15.6368 14.5527C15.7941 14.3608 15.9939 14.2098 16.2361 14.0997C16.4783 13.9896 16.7661 13.944 17.0996 13.9629V13.7742C16.8102 13.7679 16.5569 13.7993 16.3399 13.8685C16.1228 13.9377 15.9357 14.0321 15.7784 14.1516C15.6211 14.2712 15.4953 14.4112 15.4009 14.5716C15.3065 14.732 15.2373 14.9035 15.1933 15.0859H15.1744V13.8874H14.9857V18.738H15.1744ZM17.3355 16.3505H21.3934C21.406 16.017 21.373 15.6962 21.2943 15.3879C21.2157 15.0796 21.0899 14.8059 20.9169 14.5669C20.7438 14.3278 20.5205 14.1359 20.2468 13.9912C19.9732 13.8465 19.6476 13.7742 19.2701 13.7742C18.9996 13.7742 18.7353 13.8308 18.4774 13.944C18.2194 14.0573 17.993 14.2224 17.7979 14.4395C17.6029 14.6565 17.4456 14.9223 17.3261 15.2369C17.2065 15.5515 17.1468 15.9101 17.1468 16.3127C17.1468 16.6713 17.1877 17.0063 17.2694 17.3178C17.3512 17.6292 17.4771 17.8997 17.6469 18.1294C17.8168 18.359 18.0354 18.5367 18.3028 18.6625C18.5702 18.7884 18.8926 18.8481 19.2701 18.8418C19.8237 18.8418 20.2893 18.6861 20.6668 18.3747C21.0443 18.0633 21.2676 17.6245 21.3368 17.0582H21.1481C21.0663 17.593 20.8571 17.9941 20.5205 18.2615C20.1839 18.5289 19.7608 18.6625 19.2512 18.6625C18.9052 18.6625 18.6126 18.6028 18.3736 18.4832C18.1345 18.3637 17.9395 18.2001 17.7885 17.9925C17.6375 17.7849 17.5258 17.5411 17.4535 17.2611C17.3811 16.9812 17.3418 16.6776 17.3355 16.3505ZM21.2047 16.1617H17.3355C17.3544 15.822 17.4173 15.5169 17.5242 15.2463C17.6312 14.9758 17.7712 14.7446 17.9442 14.5527C18.1172 14.3608 18.3185 14.2146 18.5482 14.1139C18.7778 14.0132 19.0247 13.9629 19.289 13.9629C19.6035 13.9629 19.8804 14.0211 20.1194 14.1375C20.3585 14.2539 20.5582 14.4127 20.7187 14.6141C20.8791 14.8154 21.0002 15.0497 21.082 15.3171C21.1638 15.5845 21.2047 15.866 21.2047 16.1617ZM25.3098 15.3218H25.4985C25.4985 14.7808 25.3413 14.3876 25.0267 14.1422C24.7121 13.8968 24.2843 13.7742 23.7432 13.7742C23.4413 13.7742 23.1865 13.8119 22.9788 13.8874C22.7712 13.9629 22.6014 14.0604 22.4692 14.18C22.3371 14.2995 22.2428 14.4316 22.1861 14.5763C22.1295 14.721 22.1012 14.8594 22.1012 14.9915C22.1012 15.2558 22.1484 15.4665 22.2428 15.6238C22.3371 15.7811 22.485 15.9038 22.6863 15.9919C22.8247 16.0548 22.982 16.1114 23.1582 16.1617C23.3343 16.2121 23.5388 16.2655 23.7716 16.3222C23.9792 16.3725 24.1836 16.4228 24.385 16.4732C24.5863 16.5235 24.764 16.5911 24.9182 16.676C25.0723 16.761 25.1981 16.8695 25.2956 17.0016C25.3932 17.1337 25.4419 17.3068 25.4419 17.5207C25.4419 17.7283 25.3932 17.9044 25.2956 18.0491C25.1981 18.1938 25.0739 18.3118 24.9229 18.403C24.7719 18.4943 24.6036 18.5603 24.418 18.6012C24.2324 18.6421 24.0515 18.6625 23.8754 18.6625C23.3029 18.6625 22.864 18.5351 22.5589 18.2803C22.2538 18.0255 22.1012 17.6245 22.1012 17.0771H21.9125C21.9125 17.6874 22.0776 18.1341 22.4079 18.4172C22.7382 18.7003 23.2274 18.8418 23.8754 18.8418C24.083 18.8418 24.2922 18.8183 24.5029 18.7711C24.7137 18.7239 24.9024 18.6468 25.0692 18.5399C25.2359 18.4329 25.3711 18.2945 25.4749 18.1246C25.5788 17.9548 25.6307 17.7472 25.6307 17.5018C25.6307 17.269 25.585 17.0803 25.4938 16.9356C25.4026 16.7909 25.2831 16.6713 25.1352 16.577C24.9874 16.4826 24.8206 16.4087 24.635 16.3552C24.4495 16.3017 24.2623 16.2498 24.0735 16.1995C23.8093 16.1303 23.5781 16.0705 23.3799 16.0202C23.1817 15.9698 22.9977 15.9101 22.8279 15.8409C22.6643 15.7717 22.5337 15.6726 22.4362 15.5436C22.3387 15.4146 22.2899 15.2306 22.2899 14.9915C22.2899 14.9475 22.3025 14.8689 22.3277 14.7556C22.3529 14.6424 22.4126 14.5276 22.507 14.4112C22.6014 14.2948 22.7461 14.191 22.9411 14.0997C23.1361 14.0085 23.4035 13.9629 23.7432 13.9629C23.976 13.9629 24.1884 13.9881 24.3802 14.0384C24.5721 14.0887 24.7373 14.1689 24.8757 14.279C25.0141 14.3891 25.1211 14.5291 25.1966 14.699C25.272 14.8689 25.3098 15.0765 25.3098 15.3218ZM29.6791 15.3218H29.8679C29.8679 14.7808 29.7106 14.3876 29.396 14.1422C29.0815 13.8968 28.6537 13.7742 28.1126 13.7742C27.8106 13.7742 27.5558 13.8119 27.3482 13.8874C27.1406 13.9629 26.9707 14.0604 26.8386 14.18C26.7065 14.2995 26.6121 14.4316 26.5555 14.5763C26.4989 14.721 26.4706 14.8594 26.4706 14.9915C26.4706 15.2558 26.5177 15.4665 26.6121 15.6238C26.7065 15.7811 26.8543 15.9038 27.0556 15.9919C27.1941 16.0548 27.3513 16.1114 27.5275 16.1617C27.7037 16.2121 27.9081 16.2655 28.1409 16.3222C28.3485 16.3725 28.553 16.4228 28.7543 16.4732C28.9556 16.5235 29.1334 16.5911 29.2875 16.676C29.4416 16.761 29.5675 16.8695 29.665 17.0016C29.7625 17.1337 29.8113 17.3068 29.8113 17.5207C29.8113 17.7283 29.7625 17.9044 29.665 18.0491C29.5675 18.1938 29.4432 18.3118 29.2922 18.403C29.1412 18.4943 28.9729 18.5603 28.7873 18.6012C28.6017 18.6421 28.4209 18.6625 28.2447 18.6625C27.6722 18.6625 27.2334 18.5351 26.9282 18.2803C26.6231 18.0255 26.4706 17.6245 26.4706 17.0771H26.2818C26.2818 17.6874 26.447 18.1341 26.7773 18.4172C27.1076 18.7003 27.5967 18.8418 28.2447 18.8418C28.4523 18.8418 28.6615 18.8183 28.8723 18.7711C29.083 18.7239 29.2718 18.6468 29.4385 18.5399C29.6052 18.4329 29.7405 18.2945 29.8443 18.1246C29.9481 17.9548 30 17.7472 30 17.5018C30 17.269 29.9544 17.0803 29.8632 16.9356C29.7719 16.7909 29.6524 16.6713 29.5046 16.577C29.3567 16.4826 29.19 16.4087 29.0044 16.3552C28.8188 16.3017 28.6316 16.2498 28.4429 16.1995C28.1787 16.1303 27.9474 16.0705 27.7493 16.0202C27.5511 15.9698 27.3671 15.9101 27.1972 15.8409C27.0336 15.7717 26.9031 15.6726 26.8056 15.5436C26.708 15.4146 26.6593 15.2306 26.6593 14.9915C26.6593 14.9475 26.6719 14.8689 26.697 14.7556C26.7222 14.6424 26.782 14.5276 26.8763 14.4112C26.9707 14.2948 27.1154 14.191 27.3104 14.0997C27.5055 14.0085 27.7729 13.9629 28.1126 13.9629C28.3454 13.9629 28.5577 13.9881 28.7496 14.0384C28.9415 14.0887 29.1066 14.1689 29.245 14.279C29.3834 14.3891 29.4904 14.5291 29.5659 14.699C29.6414 14.8689 29.6791 15.0765 29.6791 15.3218Z",
    fill: "white"
  }));
};

function _extends$g() {
  _extends$g = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$g.apply(this, arguments);
}
var FeathersIcon = _ref => {
  var props = _extends$g({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z",
    fill: "#5EC097"
  }), React.createElement("path", {
    d: "M16 3.9244C22.6691 3.9244 28.0755 9.3309 28.0755 16C28.0755 22.6691 22.669 28.0755 16 28.0755C9.3309 28.0755 3.9244 22.6691 3.9244 16C3.9244 9.3309 9.3309 3.9244 16 3.9244ZM16 3C8.8318 3 3 8.8318 3 16C3 23.1682 8.8318 29 16 29C23.1682 29 29 23.1682 29 16C29 8.8318 23.1682 3 16 3ZM18.1156 5.5923C17.0563 5.3997 14.4948 9.2901 13.6474 11.6591C13.583 11.8387 13.4356 12.4969 13.4356 12.6701C13.4356 12.6701 14.0988 14.0976 14.2829 14.4323C13.9748 14.2718 13.336 13.0352 13.336 13.0352C13.0279 13.6226 12.7326 16.3197 12.8288 16.8206C12.8288 16.8206 13.5156 17.8425 13.7822 18.098C13.4162 17.976 12.8 17.1479 12.8 17.1479C12.6844 17.5041 12.707 18.2454 12.7615 18.496C13.2237 19.17 13.84 19.2472 13.84 19.2472C13.84 19.2472 13.1659 25.9687 14.1866 26.4694C14.8222 26.3346 14.9763 18.9582 14.9763 18.9582C14.9763 18.9582 15.7466 19.016 15.92 18.8234C16.3116 18.5537 17.2226 15.7538 17.236 15.3497C17.236 15.3497 16.1788 15.548 15.6632 15.7483C16.0517 15.3624 17.2932 15.1031 17.2932 15.1031C17.6299 14.699 18.3384 11.9499 18.4097 11.1025C18.4276 10.8899 18.4689 10.6295 18.437 10.2496C18.437 10.2496 17.4273 10.4707 17.2168 10.3942C17.4305 10.3701 18.4623 9.9737 18.4623 9.9737C18.6451 8.3272 18.7016 5.6989 18.1156 5.5923ZM14.4207 23.0297C14.34 25.0098 14.2893 25.5692 14.206 26.036C14.1675 26.123 14.129 26.1372 14.0904 26.0263C13.7373 24.4021 13.763 12.1694 17.7883 6.6034C15.4471 10.8784 14.3822 19.0815 14.4207 23.0297Z",
    fill: "white"
  }));
};
var FeathersIconDark = _ref2 => {
  var props = _extends$g({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16 3.92442C22.6691 3.92442 28.0756 9.3309 28.0756 16C28.0756 22.6691 22.6691 28.0756 16 28.0756C9.3309 28.0756 3.92442 22.6691 3.92442 16C3.92442 9.3309 9.3309 3.92442 16 3.92442ZM16 3C8.83182 3 3 8.83182 3 16C3 23.1682 8.83182 29 16 29C23.1682 29 29 23.1682 29 16C29 8.83182 23.1682 3 16 3ZM18.1155 5.59228C17.0563 5.39972 14.4947 9.29007 13.6474 11.659C13.583 11.8387 13.4355 12.4968 13.4355 12.6701C13.4355 12.6701 14.0989 14.0975 14.2829 14.4323C13.9747 14.2718 13.336 13.0352 13.336 13.0352C13.0279 13.6226 12.7325 16.3197 12.8288 16.8205C12.8288 16.8205 13.5156 17.8424 13.7822 18.098C13.4163 17.976 12.8 17.1479 12.8 17.1479C12.6844 17.5041 12.7069 18.2454 12.7615 18.496C13.2237 19.1701 13.84 19.2472 13.84 19.2472C13.84 19.2472 13.1659 25.9687 14.1866 26.4694C14.8222 26.3346 14.9762 18.9582 14.9762 18.9582C14.9762 18.9582 15.7466 19.016 15.92 18.8234C16.3116 18.5538 17.2226 15.7538 17.236 15.3498C17.236 15.3498 16.1788 15.548 15.6631 15.7483C16.0517 15.3624 17.2931 15.1032 17.2931 15.1032C17.6298 14.6991 18.3383 11.95 18.4097 11.1026C18.4275 10.89 18.4689 10.6296 18.4369 10.2496C18.4369 10.2496 17.4273 10.4707 17.2167 10.3943C17.4304 10.3702 18.4622 9.97379 18.4622 9.97379C18.6451 8.32716 18.7017 5.69892 18.1155 5.59228ZM14.4207 23.0296C14.34 25.0097 14.2893 25.5691 14.2059 26.036C14.1674 26.123 14.1289 26.1373 14.0903 26.0264C13.7372 24.4022 13.7629 12.1694 17.7881 6.60344C15.4471 10.8784 14.3822 19.0815 14.4207 23.0296Z",
    fill: "black"
  }));
};
var FeathersIconLight = _ref3 => {
  var props = _extends$g({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16 3.92442C22.6691 3.92442 28.0756 9.3309 28.0756 16C28.0756 22.6691 22.6691 28.0756 16 28.0756C9.3309 28.0756 3.92442 22.6691 3.92442 16C3.92442 9.3309 9.3309 3.92442 16 3.92442ZM16 3C8.83182 3 3 8.83182 3 16C3 23.1682 8.83182 29 16 29C23.1682 29 29 23.1682 29 16C29 8.83182 23.1682 3 16 3ZM18.1155 5.59228C17.0563 5.39972 14.4947 9.29007 13.6474 11.659C13.583 11.8387 13.4355 12.4968 13.4355 12.6701C13.4355 12.6701 14.0989 14.0975 14.2829 14.4323C13.9747 14.2718 13.336 13.0352 13.336 13.0352C13.0279 13.6226 12.7325 16.3197 12.8288 16.8205C12.8288 16.8205 13.5156 17.8424 13.7822 18.098C13.4163 17.976 12.8 17.1479 12.8 17.1479C12.6844 17.5041 12.7069 18.2454 12.7615 18.496C13.2237 19.1701 13.84 19.2472 13.84 19.2472C13.84 19.2472 13.1659 25.9687 14.1866 26.4694C14.8222 26.3346 14.9762 18.9582 14.9762 18.9582C14.9762 18.9582 15.7466 19.016 15.92 18.8234C16.3116 18.5538 17.2226 15.7538 17.236 15.3498C17.236 15.3498 16.1788 15.548 15.6631 15.7483C16.0517 15.3624 17.2931 15.1032 17.2931 15.1032C17.6298 14.6991 18.3383 11.95 18.4097 11.1026C18.4275 10.89 18.4689 10.6296 18.4369 10.2496C18.4369 10.2496 17.4273 10.4707 17.2167 10.3943C17.4304 10.3702 18.4622 9.97379 18.4622 9.97379C18.6451 8.32716 18.7017 5.69892 18.1155 5.59228ZM14.4207 23.0296C14.34 25.0097 14.2893 25.5691 14.2059 26.036C14.1674 26.123 14.1289 26.1373 14.0903 26.0264C13.7372 24.4022 13.7629 12.1694 17.7881 6.60344C15.4471 10.8784 14.3822 19.0815 14.4207 23.0296Z",
    fill: "white"
  }));
};

function _extends$h() {
  _extends$h = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$h.apply(this, arguments);
}
var GatsbyIcon = _ref => {
  var props = _extends$h({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M28.5714 16H20.5714V18.2857H26.0571C25.2571 21.7143 22.7429 24.5714 19.4286 25.7143L6.28571 12.5714C7.65714 8.57143 11.5429 5.71429 16 5.71429C19.4286 5.71429 22.5143 7.42857 24.4571 10.0571L26.1714 8.57143C23.8857 5.48572 20.2286 3.42857 16 3.42857C10.0571 3.42857 5.02857 7.65715 3.77143 13.2571L18.8571 28.3429C24.3429 26.9714 28.5714 21.9429 28.5714 16Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M3.42857 16.1143C3.42857 19.3143 4.68571 22.4 7.08571 24.8C9.48571 27.2 12.6857 28.4571 15.7714 28.4571L3.42857 16.1143Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M16 0C7.2 0 0 7.2 0 16C0 24.8 7.2 32 16 32C24.8 32 32 24.8 32 16C32 7.2 24.8 0 16 0ZM7.08571 24.9143C4.68571 22.5143 3.42857 19.3143 3.42857 16.2286L15.8857 28.5714C12.6857 28.4571 9.48571 27.3143 7.08571 24.9143ZM18.7429 28.2286L3.77143 13.2571C5.02857 7.65714 10.0571 3.42857 16 3.42857C20.2286 3.42857 23.8857 5.48571 26.1714 8.57143L24.4571 10.0571C22.5143 7.42857 19.4286 5.71429 16 5.71429C11.5429 5.71429 7.77143 8.57143 6.28571 12.5714L19.4286 25.7143C22.7429 24.5714 25.2571 21.7143 26.0571 18.2857H20.5714V16H28.5714C28.5714 21.9429 24.3429 26.9714 18.7429 28.2286Z",
    fill: "#663399"
  }));
};
var GatsbyIconDark = _ref2 => {
  var props = _extends$h({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1ZM7.64286 24.3571C5.39286 22.1071 4.21429 19.1071 4.21429 16.2143L15.8929 27.7857C12.8929 27.6786 9.89286 26.6071 7.64286 24.3571ZM18.5714 27.4643L4.53571 13.4286C5.71429 8.17857 10.4286 4.21429 16 4.21429C19.9643 4.21429 23.3929 6.14286 25.5357 9.03571L23.9286 10.4286C22.1071 7.96429 19.2143 6.35714 16 6.35714C11.8214 6.35714 8.28571 9.03571 6.89286 12.7857L19.2143 25.1071C22.3214 24.0357 24.6786 21.3571 25.4286 18.1429H20.2857V16H27.7857C27.7857 21.5714 23.8214 26.2857 18.5714 27.4643Z",
    fill: "black"
  }));
};
var GatsbyIconLight = _ref3 => {
  var props = _extends$h({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16 1C7.75 1 1 7.75 1 16C1 24.25 7.75 31 16 31C24.25 31 31 24.25 31 16C31 7.75 24.25 1 16 1ZM7.64286 24.3571C5.39286 22.1071 4.21429 19.1071 4.21429 16.2143L15.8929 27.7857C12.8929 27.6786 9.89286 26.6071 7.64286 24.3571ZM18.5714 27.4643L4.53571 13.4286C5.71429 8.17857 10.4286 4.21429 16 4.21429C19.9643 4.21429 23.3929 6.14286 25.5357 9.03571L23.9286 10.4286C22.1071 7.96429 19.2143 6.35714 16 6.35714C11.8214 6.35714 8.28571 9.03571 6.89286 12.7857L19.2143 25.1071C22.3214 24.0357 24.6786 21.3571 25.4286 18.1429H20.2857V16H27.7857C27.7857 21.5714 23.8214 26.2857 18.5714 27.4643Z",
    fill: "white"
  }));
};

function _extends$i() {
  _extends$i = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$i.apply(this, arguments);
}
var GlimmerIcon = _ref => {
  var props = _extends$i({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Glimmer_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M32.0003 16.0001C32.0003 24.8366 24.8368 32.0001 16.0003 32.0001C7.16368 32.0001 0.000301361 24.8366 0.000301361 16.0001C0.000301361 7.16359 7.16368 9.15527e-05 16.0003 9.15527e-05C24.8368 9.15527e-05 32.0003 7.16359 32.0003 16.0001Z",
    fill: "#F8835A"
  }), React.createElement("path", {
    d: "M9.82871 17.5461C9.47071 17.5461 9.11233 17.4124 8.83483 17.1435C8.26821 16.5945 8.25383 15.6901 8.80283 15.1235L18.4458 5.17114C18.9947 4.60452 19.8991 4.59014 20.4658 5.13914C21.0323 5.68814 21.0467 6.59264 20.4977 7.15927L10.8548 17.1116C10.5747 17.4008 10.2018 17.5461 9.82871 17.5461ZM16.1176 17.9257C15.7607 17.9257 15.4033 17.7925 15.1267 17.5245C14.5618 16.9771 14.5476 16.0755 15.095 15.5106L22.7108 7.65009C23.2582 7.08522 24.1597 7.07109 24.7247 7.61834C25.2896 8.16559 25.3038 9.06722 24.7566 9.63209L17.1406 17.4926C16.8612 17.7808 16.4896 17.9257 16.1176 17.9257ZM13.0312 27.8365C12.6731 27.8365 12.3148 27.7029 12.0373 27.4339C11.4707 26.885 11.4563 25.9805 12.0053 25.4139L25.3263 11.6652C25.8752 11.0987 26.7797 11.0844 27.3463 11.6334C27.9131 12.1824 27.9273 13.0867 27.3782 13.6535L14.0573 27.402C13.7772 27.6911 13.4043 27.8365 13.0312 27.8365ZM8.85129 25.4064C8.49317 25.4064 8.13492 25.2726 7.85742 25.0037C7.29079 24.4547 7.27642 23.5502 7.82542 22.9837L11.457 19.2355C12.0062 18.6689 12.9105 18.6545 13.4772 19.2035C14.0438 19.7526 14.058 20.657 13.509 21.2236L9.87742 24.9719C9.59729 25.261 9.22442 25.4064 8.85129 25.4064ZM5.95389 14.561C5.59577 14.561 5.23739 14.4272 4.95989 14.1583C4.39327 13.6093 4.37902 12.705 4.92802 12.1383L8.55964 8.3901C9.10877 7.82347 10.0131 7.80922 10.5798 8.35822C11.1464 8.90722 11.1606 9.81159 10.6116 10.3783L6.98002 14.1265C6.69977 14.4156 6.32702 14.561 5.95389 14.561ZM24.633 22.7228C24.275 22.7228 23.9167 22.5891 23.6392 22.3202C23.0725 21.7712 23.0582 20.8668 23.6072 20.3002L25.3264 18.5258C25.8753 17.9593 26.7798 17.9447 27.3464 18.494C27.913 19.043 27.9273 19.9473 27.3783 20.514L25.6592 22.2883C25.379 22.5775 25.0062 22.7228 24.633 22.7228ZM21.2854 26.2651C21.2854 27.0541 20.6458 27.6936 19.8568 27.6936C19.0679 27.6936 18.4283 27.0541 18.4283 26.2651C18.4283 25.4761 19.0679 24.8365 19.8568 24.8365C20.6458 24.8365 21.2854 25.4761 21.2854 26.2651ZM7.63261 19.8657C7.63261 20.6547 6.99298 21.2943 6.20398 21.2943C5.41498 21.2943 4.77548 20.6547 4.77548 19.8657C4.77548 19.0767 5.41498 18.4372 6.20398 18.4372C6.99298 18.4372 7.63261 19.0767 7.63261 19.8657ZM14.4181 5.84785C14.4181 6.63685 13.7785 7.27634 12.9896 7.27634C12.2006 7.27634 11.561 6.63685 11.561 5.84785C11.561 5.05885 12.2006 4.41922 12.9896 4.41922C13.7785 4.41922 14.4181 5.05885 14.4181 5.84785Z",
    fill: "white"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "Glimmer_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var GlimmerIconDark = _ref2 => {
  var props = _extends$i({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.0003 30.0001C23.7322 30.0001 30.0003 23.732 30.0003 16.0001C30.0003 8.26817 23.7322 2.00011 16.0003 2.00011C8.26826 2.00011 2.00031 8.26817 2.00031 16.0001C2.00031 23.732 8.26826 30.0001 16.0003 30.0001ZM9.73049 17.0006C9.9733 17.2359 10.2869 17.3529 10.6001 17.3529C10.9266 17.3529 11.2529 17.2257 11.498 16.9727L19.9355 8.26438C20.4159 7.76858 20.4033 6.97715 19.9076 6.49677C19.4117 6.0164 18.6204 6.02897 18.1401 6.52477L9.70249 15.2331C9.22212 15.7289 9.23469 16.5202 9.73049 17.0006ZM15.2359 17.3339C15.4779 17.5684 15.7906 17.685 16.1029 17.685C16.4284 17.685 16.7536 17.5583 16.998 17.306L23.662 10.4281C24.1409 9.93384 24.1284 9.14491 23.6341 8.66607C23.1397 8.18723 22.3509 8.19959 21.872 8.69385L15.2081 15.5718C14.7291 16.0661 14.7416 16.855 15.2359 17.3339ZM12.5327 26.0046C12.7755 26.24 13.089 26.3569 13.4023 26.3569C13.7288 26.3569 14.0551 26.2297 14.3002 25.9768L25.9559 13.9468C26.4364 13.4509 26.424 12.6596 25.9281 12.1792C25.4323 11.6988 24.6408 11.7114 24.1606 12.2071L12.5047 24.2371C12.0243 24.7329 12.0369 25.5244 12.5327 26.0046ZM8.87525 23.8783C9.11807 24.1136 9.43154 24.2306 9.7449 24.2306C10.0714 24.2306 10.3976 24.1034 10.6427 23.8504L13.8204 20.5707C14.3008 20.0749 14.2883 19.2836 13.7925 18.8031C13.2967 18.3227 12.5054 18.3353 12.0249 18.8311L8.84725 22.1108C8.36688 22.6065 8.37946 23.3979 8.87525 23.8783ZM6.33992 14.3886C6.58273 14.6238 6.89631 14.7409 7.20967 14.7409C7.53615 14.7409 7.86231 14.6137 8.10753 14.3607L11.2852 11.0811C11.7656 10.5852 11.7531 9.79384 11.2573 9.31346C10.7615 8.83309 9.97019 8.84556 9.4897 9.34135L6.31203 12.6211C5.83165 13.1169 5.84412 13.9082 6.33992 14.3886ZM22.6843 21.5302C22.9271 21.7655 23.2407 21.8825 23.5539 21.8825C23.8804 21.8825 24.2067 21.7553 24.4518 21.5023L25.956 19.9497C26.4364 19.4539 26.4239 18.6626 25.9281 18.1822C25.4323 17.7016 24.6409 17.7144 24.1606 18.2101L22.6563 19.7627C22.1759 20.2585 22.1885 21.0498 22.6843 21.5302ZM19.3747 26.2319C20.0651 26.2319 20.6248 25.6724 20.6248 24.982C20.6248 24.2916 20.0651 23.732 19.3747 23.732C18.6844 23.732 18.1248 24.2916 18.1248 24.982C18.1248 25.6724 18.6844 26.2319 19.3747 26.2319ZM7.4285 20.6325C8.11887 20.6325 8.67853 20.0728 8.67853 19.3825C8.67853 18.6921 8.11887 18.1325 7.4285 18.1325C6.73812 18.1325 6.17856 18.6921 6.17856 19.3825C6.17856 20.0728 6.73812 20.6325 7.4285 20.6325ZM13.3659 8.36682C14.0562 8.36682 14.6159 7.80726 14.6159 7.11688C14.6159 6.42651 14.0562 5.86684 13.3659 5.86684C12.6755 5.86684 12.1159 6.42651 12.1159 7.11688C12.1159 7.80726 12.6755 8.36682 13.3659 8.36682Z",
    fill: "black"
  }));
};
var GlimmerIconLight = _ref3 => {
  var props = _extends$i({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.0003 30.0001C23.7322 30.0001 30.0003 23.732 30.0003 16.0001C30.0003 8.26817 23.7322 2.00011 16.0003 2.00011C8.26826 2.00011 2.00031 8.26817 2.00031 16.0001C2.00031 23.732 8.26826 30.0001 16.0003 30.0001ZM9.73049 17.0006C9.9733 17.2359 10.2869 17.3529 10.6001 17.3529C10.9266 17.3529 11.2529 17.2257 11.498 16.9727L19.9355 8.26438C20.4159 7.76858 20.4033 6.97715 19.9076 6.49677C19.4117 6.0164 18.6204 6.02897 18.1401 6.52477L9.70249 15.2331C9.22212 15.7289 9.23469 16.5202 9.73049 17.0006ZM15.2359 17.3339C15.4779 17.5684 15.7906 17.685 16.1029 17.685C16.4284 17.685 16.7536 17.5583 16.998 17.306L23.662 10.4281C24.1409 9.93384 24.1284 9.14491 23.6341 8.66607C23.1397 8.18723 22.3509 8.19959 21.872 8.69385L15.2081 15.5718C14.7291 16.0661 14.7416 16.855 15.2359 17.3339ZM12.5327 26.0046C12.7755 26.24 13.089 26.3569 13.4023 26.3569C13.7288 26.3569 14.0551 26.2297 14.3002 25.9768L25.9559 13.9468C26.4364 13.4509 26.424 12.6596 25.9281 12.1792C25.4323 11.6988 24.6408 11.7114 24.1606 12.2071L12.5047 24.2371C12.0243 24.7329 12.0369 25.5244 12.5327 26.0046ZM8.87525 23.8783C9.11807 24.1136 9.43154 24.2306 9.7449 24.2306C10.0714 24.2306 10.3976 24.1034 10.6427 23.8504L13.8204 20.5707C14.3008 20.0749 14.2883 19.2836 13.7925 18.8031C13.2967 18.3227 12.5054 18.3353 12.0249 18.8311L8.84725 22.1108C8.36688 22.6065 8.37946 23.3979 8.87525 23.8783ZM6.33992 14.3886C6.58273 14.6238 6.89631 14.7409 7.20967 14.7409C7.53615 14.7409 7.86231 14.6137 8.10753 14.3607L11.2852 11.0811C11.7656 10.5852 11.7531 9.79384 11.2573 9.31346C10.7615 8.83309 9.97019 8.84556 9.4897 9.34135L6.31203 12.6211C5.83165 13.1169 5.84412 13.9082 6.33992 14.3886ZM22.6843 21.5302C22.9271 21.7655 23.2407 21.8825 23.5539 21.8825C23.8804 21.8825 24.2067 21.7553 24.4518 21.5023L25.956 19.9497C26.4364 19.4539 26.4239 18.6626 25.9281 18.1822C25.4323 17.7016 24.6409 17.7144 24.1606 18.2101L22.6563 19.7627C22.1759 20.2585 22.1885 21.0498 22.6843 21.5302ZM19.3747 26.2319C20.0651 26.2319 20.6248 25.6724 20.6248 24.982C20.6248 24.2916 20.0651 23.732 19.3747 23.732C18.6844 23.732 18.1248 24.2916 18.1248 24.982C18.1248 25.6724 18.6844 26.2319 19.3747 26.2319ZM7.4285 20.6325C8.11887 20.6325 8.67853 20.0728 8.67853 19.3825C8.67853 18.6921 8.11887 18.1325 7.4285 18.1325C6.73812 18.1325 6.17856 18.6921 6.17856 19.3825C6.17856 20.0728 6.73812 20.6325 7.4285 20.6325ZM13.3659 8.36682C14.0562 8.36682 14.6159 7.80726 14.6159 7.11688C14.6159 6.42651 14.0562 5.86684 13.3659 5.86684C12.6755 5.86684 12.1159 6.42651 12.1159 7.11688C12.1159 7.80726 12.6755 8.36682 13.3659 8.36682Z",
    fill: "white"
  }));
};

function _extends$j() {
  _extends$j = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$j.apply(this, arguments);
}
var GridsomeIcon = _ref => {
  var props = _extends$j({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16Z",
    fill: "url(#Gridsome_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M20.023 16.1084C20.023 15.0478 20.8906 14.188 21.9609 14.188H24.7852C25.8555 14.188 26.75 15.0478 26.75 16.1084C26.75 17.1691 25.8555 18.0289 24.7852 18.0289H21.9609C20.8906 18.0289 20.023 17.1691 20.023 16.1084Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M14.0971 16.1112C14.0971 15.0491 14.9593 14.188 16.0216 14.188C17.0839 14.188 17.9461 15.0491 17.9461 16.1112C17.9461 17.1734 17.0839 18.0345 16.0216 18.0345C14.9593 18.0345 14.0971 17.1734 14.0971 16.1112Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M17.8928 7.12549C17.9357 8.16055 17.1314 9.03449 16.0961 9.07749C11.6273 9.26305 8.89907 12.7652 9.03188 16.0906C9.0732 17.1257 8.28426 17.9984 7.24895 18.0397C6.21369 18.081 5.30327 17.2456 5.26193 16.2104C5.04553 10.7915 9.57082 5.43437 15.9404 5.32916C16.9757 5.28617 17.8498 6.09042 17.8928 7.12549Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.25604 16.0096C5.28146 22.557 10.6552 26.8836 16.0884 26.7499C22.5021 26.521 27.1353 20.9502 26.75 15.9773C26.6606 14.9445 25.7446 14.1439 24.7096 14.1935C23.6747 14.2432 22.876 15.1223 22.9256 16.157C23.0706 19.1793 20.2835 22.8807 15.9961 22.9995C12.5906 23.0833 9.18106 20.4094 9.03175 16.248C8.99187 17.2127 8.23131 18.0005 7.24894 18.0397C6.21365 18.081 5.30324 17.2456 5.2619 16.2104C5.25922 16.1435 5.25727 16.0765 5.25604 16.0096Z",
    fill: "url(#Gridsome_Paint1_Linear_".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Gridsome_Paint0_Linear_".concat(id),
    x1: "7.75",
    y1: "-2.3125",
    x2: "-0.962181",
    y2: "27.8966",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#00A672"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#008B60"
  })), React.createElement("linearGradient", {
    id: "Gridsome_Paint1_Linear_".concat(id),
    x1: "16.4913",
    y1: "27.8367",
    x2: "16.4913",
    y2: "15.7186",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "white",
    stopOpacity: "0.95"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "white",
    stopOpacity: "0.5"
  }))));
};
var GridsomeIconDark = _ref2 => {
  var props = _extends$j({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16 1C24.2843 1 31 7.71573 31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1ZM17.7745 7.68015C17.8147 8.65052 17.0607 9.46984 16.0901 9.51015C11.9006 9.68411 9.34288 12.9674 9.46739 16.0849C9.49504 16.7778 9.12584 17.3932 8.55904 17.7025C9.08529 17.4153 9.44124 16.8644 9.46736 16.2325C9.60734 20.1338 12.8037 22.6406 15.9965 22.5621C19.2072 22.4731 21.5205 20.2409 22.2521 17.9021H21.5884C20.585 17.9021 19.7716 17.096 19.7716 16.1016C19.7716 15.1073 20.585 14.3012 21.5884 14.3012H24.2361C25.0941 14.3012 25.8315 14.8905 26.0273 15.6829C26.0522 15.7787 26.0695 15.8775 26.0782 15.9787C26.4394 20.6408 22.0958 25.8635 16.083 26.078C10.9906 26.2033 5.95406 22.1493 5.92765 16.0137C5.83263 10.9968 10.0446 6.09353 15.9442 5.99609C16.9147 5.95579 17.7341 6.70977 17.7745 7.68015ZM14.2161 16.1043C14.2161 15.1085 15.0243 14.3012 16.0202 14.3012C17.0161 14.3012 17.8244 15.1085 17.8244 16.1043C17.8244 17.1001 17.0161 17.9073 16.0202 17.9073C15.0243 17.9073 14.2161 17.1001 14.2161 16.1043Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M17.7745 7.68015C17.8147 8.65052 17.0607 9.46984 16.0901 9.51015C11.9006 9.68411 9.34288 12.9674 9.46739 16.0849C9.50612 17.0553 8.76649 17.8735 7.79589 17.9122C6.82533 17.9509 5.97181 17.1678 5.93306 16.1973C5.73018 11.117 9.97264 6.09472 15.9442 5.99609C16.9147 5.95579 17.7341 6.70977 17.7745 7.68015Z",
    fill: "black",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    d: "M19.7716 16.1016C19.7716 15.1073 20.585 14.3012 21.5884 14.3012H24.2361C25.2395 14.3012 26.0781 15.1073 26.0781 16.1016C26.0781 17.096 25.2395 17.9021 24.2361 17.9021H21.5884C20.585 17.9021 19.7716 17.096 19.7716 16.1016Z",
    fill: "black",
    fillOpacity: "0.6"
  }));
};
var GridsomeIconLight = _ref3 => {
  var props = _extends$j({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16 1C24.2843 1 31 7.71573 31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1ZM17.7745 7.68015C17.8147 8.65052 17.0607 9.46984 16.0901 9.51015C11.9006 9.68411 9.34288 12.9674 9.46739 16.0849C9.49504 16.7778 9.12584 17.3932 8.55904 17.7025C9.08529 17.4153 9.44124 16.8644 9.46736 16.2325C9.60734 20.1338 12.8037 22.6406 15.9965 22.5621C19.2072 22.4731 21.5205 20.2409 22.2521 17.9021H21.5884C20.585 17.9021 19.7716 17.096 19.7716 16.1016C19.7716 15.1073 20.585 14.3012 21.5884 14.3012H24.2361C25.0941 14.3012 25.8315 14.8905 26.0273 15.6829C26.0522 15.7787 26.0695 15.8775 26.0782 15.9787C26.4394 20.6408 22.0958 25.8635 16.083 26.078C10.9906 26.2033 5.95406 22.1493 5.92765 16.0137C5.83263 10.9968 10.0446 6.09353 15.9442 5.99609C16.9147 5.95579 17.7341 6.70977 17.7745 7.68015ZM14.2161 16.1043C14.2161 15.1085 15.0243 14.3012 16.0202 14.3012C17.0161 14.3012 17.8244 15.1085 17.8244 16.1043C17.8244 17.1001 17.0161 17.9073 16.0202 17.9073C15.0243 17.9073 14.2161 17.1001 14.2161 16.1043Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M17.7745 7.68015C17.8147 8.65052 17.0607 9.46984 16.0901 9.51015C11.9006 9.68411 9.34288 12.9674 9.46739 16.0849C9.50612 17.0553 8.76649 17.8735 7.79589 17.9122C6.82533 17.9509 5.97181 17.1678 5.93306 16.1973C5.73018 11.117 9.97264 6.09472 15.9442 5.99609C16.9147 5.95579 17.7341 6.70977 17.7745 7.68015Z",
    fill: "white",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    d: "M19.7716 16.1016C19.7716 15.1073 20.585 14.3012 21.5884 14.3012H24.2361C25.2395 14.3012 26.0781 15.1073 26.0781 16.1016C26.0781 17.096 25.2395 17.9021 24.2361 17.9021H21.5884C20.585 17.9021 19.7716 17.096 19.7716 16.1016Z",
    fill: "white",
    fillOpacity: "0.6"
  }));
};

function _extends$k() {
  _extends$k = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$k.apply(this, arguments);
}
var HapiIcon = _ref => {
  var props = _extends$k({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M6.26768 1.3485C6.5479 1.12685 6.91252 0.951719 7.27772 1.01201C7.64004 1.09987 8.02247 1.24112 8.24124 1.56211C8.62251 2.10014 8.5605 2.86384 8.16717 3.37834L8.13731 3.34848C8.04888 3.26005 7.96275 3.16588 7.85595 3.09927C7.73823 3.02175 7.55047 3.08779 7.51831 3.22789C7.47639 3.43346 7.57516 3.62984 7.67392 3.80383C7.32653 3.87503 6.9487 3.92269 6.61336 3.77741C6.11093 3.5707 5.72276 3.07802 5.6797 2.53195C5.70726 2.08119 5.95359 1.66317 6.26768 1.3485Z",
    fill: "#9B99A6"
  }), React.createElement("path", {
    d: "M11.5355 7.49887C11.822 7.44949 12.0908 7.31799 12.3842 7.30594C13.0348 7.28354 13.6991 7.32374 14.3181 7.54136C14.499 7.60682 14.6776 7.70616 14.7844 7.87326C14.5168 7.92092 14.2676 8.03002 14.0155 8.12534C13.0204 8.5158 12.0425 8.95221 11.1037 9.46326C10.6903 9.69007 10.2762 9.92377 9.91966 10.235C9.66414 10.4618 9.36268 10.6387 9.1462 10.9068C9.07213 10.2109 9.21224 9.47417 9.636 8.90569C9.82033 8.60481 10.1201 8.41072 10.3612 8.16151C10.6948 7.85431 11.1083 7.64415 11.5355 7.49887Z",
    fill: "#9B99A6"
  }), React.createElement("path", {
    d: "M29.9556 11.4914C30.2129 11.2496 30.5809 11.1463 30.9283 11.1911C31.3538 11.2565 31.7253 11.5608 31.8953 11.9536C32.1204 12.4813 31.9786 13.1548 31.5117 13.5057C31.088 13.8341 30.4408 13.8226 30.0389 13.4632C30.2422 13.2737 30.4718 13.0124 30.4041 12.7144C30.2014 12.4532 29.7983 12.4905 29.5376 12.6409C29.4756 12.22 29.622 11.7647 29.9556 11.4914Z",
    fill: "#9B99A6"
  }), React.createElement("path", {
    d: "M25.9499 12.4847C26.7486 12.4066 27.4417 12.9079 28.032 13.3817C28.326 13.6716 28.5321 14.0529 28.6108 14.4583C28.7079 15.0245 28.6774 15.6113 28.4793 16.1534C28.3151 16.6914 28.0406 17.2748 27.5054 17.5234C27.4991 17.2117 27.4285 16.9067 27.3757 16.6007C27.1494 15.3948 26.798 14.2091 26.2841 13.094C26.1916 12.8809 26.0877 12.6725 25.9499 12.4847Z",
    fill: "#9B99A6"
  }), React.createElement("path", {
    d: "M5.7882 21.7209C6.21197 21.5636 6.67478 21.7123 7.0394 21.946C7.83985 22.4122 8.5978 22.983 9.16053 23.7272C9.53778 24.2285 9.87197 24.7654 10.1396 25.3332C10.329 25.7484 10.4783 26.1928 10.4881 26.6528C10.5002 27.0949 10.2274 27.4842 9.91619 27.7725C9.56133 28.0619 9.21336 28.3668 8.80969 28.5873C8.2906 28.86 7.68022 28.995 7.09797 28.8859C6.38365 28.7664 5.7147 28.4236 5.17322 27.947C5.36788 27.8224 5.5855 27.649 5.5855 27.3952C5.62512 26.9204 5.15887 26.5075 4.6972 26.5425C4.52149 26.62 4.4101 26.79 4.28377 26.9272C3.99322 26.4719 3.76469 25.9373 3.81751 25.3872C3.96451 24.4105 4.28549 23.4424 4.86946 22.6368C4.93091 22.5633 4.93722 22.4662 4.94584 22.3755C5.24155 22.1757 5.44138 21.8449 5.7882 21.7209Z",
    fill: "#9B99A6"
  }), React.createElement("path", {
    d: "M0.182778 28.9111C0.461844 28.3088 1.09922 27.8993 1.76128 27.8959C2.19424 27.9332 2.6025 28.1003 2.98894 28.2892C3.25825 28.4282 3.44085 28.6918 3.53157 28.9754C3.75953 29.6071 3.63148 30.3409 3.21748 30.8669C2.95966 31.1787 2.64556 31.4715 2.24017 31.568C1.63783 31.746 0.974039 31.5278 0.537065 31.0926C0.0162568 30.5155 -0.173807 29.6209 0.182778 28.9111Z",
    fill: "#9B99A6"
  }), React.createElement("path", {
    d: "M7.51826 3.22792C7.55042 3.08781 7.73818 3.02177 7.8559 3.09929C7.9627 3.1659 8.04883 3.26007 8.13726 3.3485C8.29804 3.54545 8.48466 3.71772 8.65807 3.90318C9.36377 4.67894 9.99885 5.51499 10.6684 6.32118C10.9756 6.69556 11.2799 7.07224 11.5802 7.45237L11.5354 7.49888C11.1082 7.64415 10.6948 7.85431 10.3612 8.16151C10.2176 8.01394 10.12 7.83307 10.0109 7.66081C9.41775 6.71394 8.84181 5.75558 8.30608 4.77483C8.11716 4.4372 7.86795 4.13804 7.67387 3.80385C7.57511 3.62986 7.47634 3.43348 7.51826 3.22792Z",
    fill: "#F79727"
  }), React.createElement("path", {
    d: "M29.5375 12.6409C29.7982 12.4905 30.2013 12.4532 30.404 12.7144C30.4717 13.0124 30.242 13.2737 30.0388 13.4632C29.5938 13.8347 29.1258 14.189 28.6107 14.4583C28.532 14.0529 28.3259 13.6716 28.0319 13.3817C28.5022 13.0733 29.0551 12.928 29.5375 12.6409Z",
    fill: "#F79727"
  }), React.createElement("path", {
    d: "M4.28373 26.9273C4.41006 26.7901 4.52145 26.6201 4.69716 26.5426C5.15883 26.5075 5.62508 26.9204 5.58546 27.3953C5.58546 27.6491 5.36784 27.8225 5.17318 27.9471C4.90215 28.1136 4.62251 28.2652 4.35723 28.4409C4.08104 28.6178 3.82666 28.8285 3.53152 28.9755C3.44079 28.6918 3.2582 28.4283 2.98889 28.2893C3.32423 27.7513 3.87375 27.401 4.28373 26.9273Z",
    fill: "#F79727"
  }), React.createElement("path", {
    d: "M16.1205 7.62234C16.8349 7.50807 17.5601 7.5385 18.2807 7.54999C20.3967 7.69412 22.5075 8.50777 24.0383 10.0001C24.2536 10.1483 24.3851 10.3791 24.5752 10.5537C25.1161 11.1342 25.529 11.8169 25.9499 12.4848C26.0877 12.6725 26.1916 12.881 26.2841 13.094C26.798 14.2091 27.1494 15.3949 27.3756 16.6007C27.4285 16.9068 27.4991 17.2117 27.5054 17.5235C27.4796 18.0609 27.599 18.5984 27.5249 19.1347C27.4887 19.4252 27.5215 19.7204 27.4681 20.0086C27.3854 20.5501 27.1477 21.0491 26.9076 21.5355C26.7928 21.7778 26.5402 21.8989 26.3288 22.0425C26.1135 22.1826 25.8281 22.3106 25.5778 22.182C25.1821 21.9569 24.9915 21.5068 24.9014 21.0807C24.802 20.6856 24.8365 20.2768 24.8307 19.8743C24.7681 18.75 24.7056 17.6171 24.4563 16.5151C24.2892 15.7928 24.0033 15.0647 23.4457 14.5536C23.0926 14.2556 22.6884 14.015 22.2542 13.8565C21.6048 13.6636 20.9278 13.5516 20.2491 13.566C19.4297 13.5476 18.6224 13.7193 17.834 13.9255C17.0364 14.1327 16.283 14.4727 15.5389 14.8212C14.948 15.0716 14.3893 15.3868 13.8214 15.6837C13.5033 15.8554 13.1886 16.0357 12.9021 16.2567C12.3836 16.6524 11.826 17.0113 11.4011 17.5137C10.975 18.0161 10.5966 18.5903 10.4674 19.2467C10.3049 20.2125 10.4898 21.2059 10.8338 22.1131C11.2271 23.1145 11.8145 24.0362 12.5421 24.828C13.0451 25.4585 13.7146 25.9201 14.364 26.3864C14.7195 26.6195 14.9526 27.0318 14.9555 27.4584C14.9222 27.8145 14.6506 28.0935 14.3703 28.2882C14.0683 28.4748 13.7152 28.596 13.3574 28.585C12.5197 28.5776 11.675 28.4777 10.8797 28.2066C10.5444 28.0941 10.236 27.9201 9.91619 27.7725C10.2274 27.4843 10.5002 27.095 10.4881 26.6528C10.4783 26.1929 10.329 25.7484 10.1396 25.3333C9.87198 24.7654 9.53779 24.2285 9.16053 23.7272C8.5978 22.983 7.83984 22.4123 7.0394 21.946C6.67477 21.7123 6.21196 21.5636 5.78819 21.7209C5.44137 21.845 5.24154 22.1757 4.94583 22.3755C4.85912 22.1235 4.89989 21.8519 4.86486 21.5917C4.82122 21.288 4.84534 20.9808 4.81605 20.6764C4.76954 20.2567 4.79194 19.8335 4.78447 19.412C4.77241 18.588 4.78792 17.7595 4.91482 16.9435C5.0377 16.1861 5.34892 15.4752 5.70149 14.7994C6.08391 14.0839 6.57199 13.427 7.12323 12.8322C7.42469 12.4853 7.74625 12.154 8.10456 11.8658C8.42669 11.5184 8.84471 11.2732 9.14617 10.9068C9.36265 10.6387 9.66411 10.4618 9.91964 10.235C10.2762 9.92378 10.6902 9.69007 11.1037 9.46326C12.0425 8.95221 13.0204 8.51581 14.0155 8.12535C14.2676 8.03003 14.5168 7.92093 14.7843 7.87327C15.2385 7.83939 15.6669 7.66253 16.1205 7.62234Z",
    fill: "#787880"
  }));
};
var HapiIconDark = _ref2 => {
  var props = _extends$k({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.14057 2.85388C7.83244 2.80301 7.52479 2.95078 7.28836 3.1378C7.02334 3.4033 6.8155 3.75601 6.79224 4.13633C6.82858 4.59708 7.15609 5.01278 7.58002 5.18719C7.86294 5.30977 8.18172 5.26957 8.47481 5.20949L8.47482 5.20951C8.55298 5.34409 8.64173 5.47194 8.73049 5.59979C8.8277 5.73982 8.92492 5.87987 9.00824 6.02878C9.46027 6.85628 9.94621 7.66489 10.4467 8.46382C10.4654 8.49329 10.4836 8.52305 10.5019 8.55282L10.502 8.5529L10.502 8.55291C10.5738 8.66995 10.6457 8.78705 10.7422 8.88629C11.0237 8.62709 11.3726 8.44976 11.733 8.32719L11.7708 8.28795C11.5174 7.96721 11.2606 7.64939 11.0014 7.3335C10.8154 7.10955 10.6326 6.88287 10.4497 6.65618C10.0772 6.19431 9.70464 5.73237 9.30523 5.29332C9.255 5.23959 9.20345 5.18717 9.15192 5.13478C9.05337 5.03457 8.95489 4.93443 8.8658 4.82531L8.83392 4.79315C8.7701 4.72849 8.70566 4.66322 8.6284 4.61504C8.58626 4.58729 8.53347 4.58133 8.48459 4.59272C8.53349 4.58132 8.58629 4.58725 8.62845 4.61501C8.7057 4.66319 8.77014 4.72847 8.83396 4.79312L8.86585 4.82528L8.89105 4.85047C9.22292 4.41637 9.27525 3.77199 8.95355 3.31803C8.76896 3.0472 8.44629 2.92801 8.14057 2.85388ZM12.024 8.25313L12.0239 8.25313L12.0239 8.25313L12.0239 8.25314L12.0239 8.25314L12.0239 8.25314L12.0239 8.25314L12.0239 8.25315L12.0239 8.25315C11.9278 8.28166 11.8317 8.31019 11.7331 8.32719C11.3726 8.44976 11.0238 8.62709 10.7423 8.88629C10.6734 8.95747 10.5989 9.02332 10.5244 9.08914C10.3787 9.21776 10.2333 9.34626 10.1304 9.51419C9.77286 9.99382 9.65463 10.6154 9.71712 11.2025C9.7171 11.2026 9.71708 11.2026 9.71707 11.2026C9.57839 11.3711 9.41049 11.5093 9.24241 11.6475C9.10218 11.7629 8.96183 11.8784 8.83821 12.0117C8.53589 12.2549 8.26457 12.5345 8.01021 12.8271C7.5451 13.3291 7.13329 13.8833 6.81062 14.487C6.51314 15.0572 6.25055 15.657 6.14687 16.2961C6.03979 16.9845 6.02671 17.6837 6.03689 18.3789C6.03879 18.4864 6.03839 18.594 6.03799 18.7016C6.03707 18.9501 6.03615 19.1986 6.06353 19.4457C6.07442 19.5589 6.07656 19.6726 6.07869 19.7862C6.0814 19.9304 6.08412 20.0747 6.10471 20.218C6.11573 20.2999 6.11786 20.3831 6.11999 20.4662C6.12357 20.6061 6.12715 20.746 6.17303 20.8794L6.17202 20.8904C6.16517 20.9637 6.15798 21.0408 6.10862 21.0998C5.6159 21.7795 5.34507 22.5963 5.22104 23.4205C5.17646 23.8846 5.36928 24.3357 5.61442 24.7199L5.6144 24.7199C5.47756 24.878 5.3223 25.0198 5.16709 25.1616L5.16708 25.1616C4.92995 25.3782 4.69295 25.5947 4.52194 25.869L4.52192 25.869C4.19586 25.7097 3.85139 25.5687 3.48608 25.5372C2.92746 25.5401 2.38968 25.8855 2.15422 26.3938C1.85335 26.9926 2.01372 27.7474 2.45315 28.2344C2.82185 28.6016 3.38192 28.7857 3.89015 28.6355C4.23219 28.5541 4.49721 28.307 4.71475 28.0439C5.06404 27.6002 5.1721 26.9811 4.97979 26.4481C5.14216 26.3672 5.28991 26.2634 5.43768 26.1596L5.43771 26.1596C5.51653 26.1043 5.59536 26.0489 5.67642 25.997C5.81498 25.9053 5.95818 25.8213 6.10142 25.7373L6.10145 25.7373L6.10151 25.7373C6.18964 25.6856 6.27779 25.6339 6.36488 25.5804L6.36497 25.5803C6.82183 25.9824 7.38624 26.2717 7.98892 26.3724C8.48019 26.4645 8.99521 26.3506 9.43318 26.1205C9.72622 25.9605 9.98448 25.7477 10.2416 25.5358C10.2833 25.5015 10.325 25.4671 10.3668 25.433C10.5118 25.2987 10.6469 25.1385 10.7371 24.9591C10.6469 25.1385 10.5118 25.2988 10.3668 25.4331C10.4478 25.4705 10.5279 25.5098 10.608 25.5492C10.7948 25.6411 10.9817 25.7329 11.1798 25.7994C11.8508 26.028 12.5635 26.1123 13.2703 26.1186C13.5722 26.1278 13.8701 26.0256 14.125 25.8682C14.3614 25.7039 14.5906 25.4684 14.6187 25.1681C14.6162 24.8081 14.4195 24.4602 14.1196 24.2635C14.0856 24.2391 14.0516 24.2147 14.0175 24.1903C13.5022 23.8212 12.9805 23.4476 12.5824 22.9486C11.9685 22.2805 11.4729 21.5029 11.141 20.6579C10.8508 19.8925 10.6948 19.0543 10.8319 18.2394C10.9409 17.6856 11.2602 17.2011 11.6197 16.7772C11.9017 16.4437 12.2529 16.1851 12.603 15.9275C12.6979 15.8576 12.7927 15.7878 12.8861 15.7166C13.1279 15.5301 13.3934 15.378 13.6618 15.2331C13.7677 15.1777 13.8733 15.1216 13.9789 15.0654C14.3508 14.8676 14.7226 14.6699 15.1109 14.5054C15.7388 14.2113 16.3745 13.9245 17.0474 13.7496C17.7126 13.5757 18.3938 13.4308 19.0852 13.4463C19.6578 13.4342 20.2291 13.5287 20.777 13.6915C21.1433 13.8252 21.4844 14.0282 21.7823 14.2796C22.2528 14.7108 22.4941 15.3252 22.635 15.9346C22.8448 16.862 22.8978 17.8154 22.9505 18.7616L22.9509 18.7689C22.952 18.8475 22.9513 18.9263 22.9506 19.0053C22.9484 19.2675 22.9461 19.5306 23.0105 19.7868C23.0866 20.1463 23.2474 20.5262 23.5812 20.7161C23.7925 20.8246 24.0333 20.7166 24.215 20.5984C24.2487 20.5755 24.2837 20.5532 24.3189 20.5308C24.4698 20.4349 24.6247 20.3363 24.7033 20.1705C24.9058 19.7602 25.1064 19.3392 25.1762 18.8823C25.2012 18.7473 25.2038 18.6105 25.2064 18.4735C25.2085 18.3638 25.2106 18.2539 25.2242 18.1449C25.2599 17.8865 25.2423 17.6277 25.2247 17.3689C25.2115 17.1744 25.1983 16.9799 25.2077 16.7854C25.2051 16.6564 25.1894 16.5288 25.1689 16.4018C25.1894 16.5288 25.2051 16.6564 25.2077 16.7854C25.6593 16.5756 25.8908 16.0834 26.0294 15.6294C26.1966 15.172 26.2222 14.6769 26.1404 14.1992L26.1404 14.1991C26.575 13.972 26.9697 13.673 27.3452 13.3596C27.5167 13.1997 27.7105 12.9792 27.6533 12.7278C27.5608 12.6085 27.4187 12.563 27.273 12.5664C27.4188 12.5629 27.5609 12.6085 27.6534 12.7278C27.7106 12.9792 27.5168 13.1997 27.3453 13.3595C27.6845 13.6628 28.2305 13.6725 28.588 13.3954C28.9819 13.0994 29.1016 12.5311 28.9117 12.0859C28.7682 11.7545 28.4548 11.4977 28.0958 11.4425C27.8027 11.4047 27.4921 11.4919 27.2751 11.6958C26.9936 11.9265 26.87 12.3106 26.9224 12.6657L26.9222 12.6658C26.7333 12.7782 26.5315 12.8649 26.3298 12.9515L26.3298 12.9516C26.0971 13.0515 25.8645 13.1514 25.6519 13.2908C25.1539 12.8911 24.5691 12.4681 23.8952 12.534C23.8659 12.4876 23.8367 12.4411 23.8075 12.3946C23.482 11.8762 23.1541 11.3542 22.7353 10.9047C22.6699 10.8446 22.6126 10.7765 22.5555 10.7086C22.4726 10.61 22.3898 10.5116 22.2823 10.4376C20.9907 9.17843 19.2097 8.49191 17.4243 8.3703C17.3541 8.36918 17.2838 8.36785 17.2135 8.36652C16.6751 8.35631 16.1348 8.34606 15.6017 8.43135C15.4146 8.44793 15.2325 8.49208 15.0505 8.53622C14.8603 8.58234 14.6701 8.62846 14.4743 8.64307C14.3842 8.50208 14.2335 8.41827 14.0809 8.36304C13.5586 8.17942 12.9981 8.1455 12.4491 8.1644C12.3026 8.17042 12.1633 8.21175 12.024 8.25313ZM23.9774 12.6559C24.0547 12.7806 24.1187 12.9133 24.1772 13.0481C24.6108 13.9889 24.9073 14.9894 25.0982 16.0068C25.1078 16.0624 25.1181 16.118 25.1284 16.1736C25.1181 16.118 25.1078 16.0624 25.0982 16.0068C24.9073 14.9894 24.6108 13.9889 24.1772 13.048C24.1187 12.9132 24.0547 12.7806 23.9774 12.6559ZM10.6134 23.5074C10.5947 23.4629 10.5752 23.4188 10.5553 23.375C10.5322 23.3261 10.5086 23.2774 10.4844 23.229C10.5086 23.2774 10.5322 23.326 10.5552 23.3749C10.5752 23.4187 10.5947 23.4629 10.6134 23.5074ZM7.0192 20.289C6.97369 20.2979 6.92847 20.3104 6.88377 20.327C6.83261 20.3453 6.78525 20.3689 6.74058 20.3964C6.78526 20.3689 6.83263 20.3453 6.8838 20.327C6.92849 20.3104 6.9737 20.2979 7.0192 20.289ZM6.71278 25.1147C6.71278 25.1984 6.68476 25.2717 6.64083 25.3362C6.68475 25.2717 6.71274 25.1984 6.71274 25.1148C6.7425 24.7581 6.43394 24.4428 6.091 24.3988C6.43396 24.4427 6.74254 24.7579 6.71278 25.1147Z",
    fill: "black"
  }));
};
var HapiIconLight = _ref3 => {
  var props = _extends$k({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.14057 2.85388C7.83244 2.80301 7.52479 2.95078 7.28836 3.1378C7.02334 3.4033 6.8155 3.75601 6.79224 4.13633C6.82858 4.59708 7.15609 5.01278 7.58002 5.18719C7.86294 5.30977 8.18172 5.26957 8.47481 5.20949L8.47482 5.20951C8.55298 5.34409 8.64173 5.47194 8.73049 5.59979C8.8277 5.73982 8.92492 5.87987 9.00824 6.02878C9.46027 6.85628 9.94621 7.66489 10.4467 8.46382C10.4654 8.49329 10.4836 8.52305 10.5019 8.55282L10.502 8.5529L10.502 8.55291C10.5738 8.66995 10.6457 8.78705 10.7422 8.88629C11.0237 8.62709 11.3726 8.44976 11.733 8.32719L11.7708 8.28795C11.5174 7.96721 11.2606 7.64939 11.0014 7.3335C10.8154 7.10955 10.6326 6.88287 10.4497 6.65618C10.0772 6.19431 9.70464 5.73237 9.30523 5.29332C9.255 5.23959 9.20345 5.18717 9.15192 5.13478C9.05337 5.03457 8.95489 4.93443 8.8658 4.82531L8.83392 4.79315C8.7701 4.72849 8.70566 4.66322 8.6284 4.61504C8.58626 4.58729 8.53347 4.58133 8.48459 4.59272C8.53349 4.58132 8.58629 4.58725 8.62845 4.61501C8.7057 4.66319 8.77014 4.72847 8.83396 4.79312L8.86585 4.82528L8.89105 4.85047C9.22292 4.41637 9.27525 3.77199 8.95355 3.31803C8.76896 3.0472 8.44629 2.92801 8.14057 2.85388ZM12.024 8.25313L12.0239 8.25313L12.0239 8.25313L12.0239 8.25314L12.0239 8.25314L12.0239 8.25314L12.0239 8.25314L12.0239 8.25315L12.0239 8.25315C11.9278 8.28166 11.8317 8.31019 11.7331 8.32719C11.3726 8.44976 11.0238 8.62709 10.7423 8.88629C10.6734 8.95747 10.5989 9.02332 10.5244 9.08914C10.3787 9.21776 10.2333 9.34626 10.1304 9.51419C9.77286 9.99382 9.65463 10.6154 9.71712 11.2025C9.7171 11.2026 9.71708 11.2026 9.71707 11.2026C9.57839 11.3711 9.41049 11.5093 9.24241 11.6475C9.10218 11.7629 8.96183 11.8784 8.83821 12.0117C8.53589 12.2549 8.26457 12.5345 8.01021 12.8271C7.5451 13.3291 7.13329 13.8833 6.81062 14.487C6.51314 15.0572 6.25055 15.657 6.14687 16.2961C6.03979 16.9845 6.02671 17.6837 6.03689 18.3789C6.03879 18.4864 6.03839 18.594 6.03799 18.7016C6.03707 18.9501 6.03615 19.1986 6.06353 19.4457C6.07442 19.5589 6.07656 19.6726 6.07869 19.7862C6.0814 19.9304 6.08412 20.0747 6.10471 20.218C6.11573 20.2999 6.11786 20.3831 6.11999 20.4662C6.12357 20.6061 6.12715 20.746 6.17303 20.8794L6.17202 20.8904C6.16517 20.9637 6.15798 21.0408 6.10862 21.0998C5.6159 21.7795 5.34507 22.5963 5.22104 23.4205C5.17646 23.8846 5.36928 24.3357 5.61442 24.7199L5.6144 24.7199C5.47756 24.878 5.3223 25.0198 5.16709 25.1616L5.16708 25.1616C4.92995 25.3782 4.69295 25.5947 4.52194 25.869L4.52192 25.869C4.19586 25.7097 3.85139 25.5687 3.48608 25.5372C2.92746 25.5401 2.38968 25.8855 2.15422 26.3938C1.85335 26.9926 2.01372 27.7474 2.45315 28.2344C2.82185 28.6016 3.38192 28.7857 3.89015 28.6355C4.23219 28.5541 4.49721 28.307 4.71475 28.0439C5.06404 27.6002 5.1721 26.9811 4.97979 26.4481C5.14216 26.3672 5.28991 26.2634 5.43768 26.1596L5.43771 26.1596C5.51653 26.1043 5.59536 26.0489 5.67642 25.997C5.81498 25.9053 5.95818 25.8213 6.10142 25.7373L6.10145 25.7373L6.10151 25.7373C6.18964 25.6856 6.27779 25.6339 6.36488 25.5804L6.36497 25.5803C6.82183 25.9824 7.38624 26.2717 7.98892 26.3724C8.48019 26.4645 8.99521 26.3506 9.43318 26.1205C9.72622 25.9605 9.98448 25.7477 10.2416 25.5358C10.2833 25.5015 10.325 25.4671 10.3668 25.433C10.5118 25.2987 10.6469 25.1385 10.7371 24.9591C10.6469 25.1385 10.5118 25.2988 10.3668 25.4331C10.4478 25.4705 10.5279 25.5098 10.608 25.5492C10.7948 25.6411 10.9817 25.7329 11.1798 25.7994C11.8508 26.028 12.5635 26.1123 13.2703 26.1186C13.5722 26.1278 13.8701 26.0256 14.125 25.8682C14.3614 25.7039 14.5906 25.4684 14.6187 25.1681C14.6162 24.8081 14.4195 24.4602 14.1196 24.2635C14.0856 24.2391 14.0516 24.2147 14.0175 24.1903C13.5022 23.8212 12.9805 23.4476 12.5824 22.9486C11.9685 22.2805 11.4729 21.5029 11.141 20.6579C10.8508 19.8925 10.6948 19.0543 10.8319 18.2394C10.9409 17.6856 11.2602 17.2011 11.6197 16.7772C11.9017 16.4437 12.2529 16.1851 12.603 15.9275C12.6979 15.8576 12.7927 15.7878 12.8861 15.7166C13.1279 15.5301 13.3934 15.378 13.6618 15.2331C13.7677 15.1777 13.8733 15.1216 13.9789 15.0654C14.3508 14.8676 14.7226 14.6699 15.1109 14.5054C15.7388 14.2113 16.3745 13.9245 17.0474 13.7496C17.7126 13.5757 18.3938 13.4308 19.0852 13.4463C19.6578 13.4342 20.2291 13.5287 20.777 13.6915C21.1433 13.8252 21.4844 14.0282 21.7823 14.2796C22.2528 14.7108 22.4941 15.3252 22.635 15.9346C22.8448 16.862 22.8978 17.8154 22.9505 18.7616L22.9509 18.7689C22.952 18.8475 22.9513 18.9263 22.9506 19.0053C22.9484 19.2675 22.9461 19.5306 23.0105 19.7868C23.0866 20.1463 23.2474 20.5262 23.5812 20.7161C23.7925 20.8246 24.0333 20.7166 24.215 20.5984C24.2487 20.5755 24.2837 20.5532 24.3189 20.5308C24.4698 20.4349 24.6247 20.3363 24.7033 20.1705C24.9058 19.7602 25.1064 19.3392 25.1762 18.8823C25.2012 18.7473 25.2038 18.6105 25.2064 18.4735C25.2085 18.3638 25.2106 18.2539 25.2242 18.1449C25.2599 17.8865 25.2423 17.6277 25.2247 17.3689C25.2115 17.1744 25.1983 16.9799 25.2077 16.7854C25.2051 16.6564 25.1894 16.5288 25.1689 16.4018C25.1894 16.5288 25.2051 16.6564 25.2077 16.7854C25.6593 16.5756 25.8908 16.0834 26.0294 15.6294C26.1966 15.172 26.2222 14.6769 26.1404 14.1992L26.1404 14.1991C26.575 13.972 26.9697 13.673 27.3452 13.3596C27.5167 13.1997 27.7105 12.9792 27.6533 12.7278C27.5608 12.6085 27.4187 12.563 27.273 12.5664C27.4188 12.5629 27.5609 12.6085 27.6534 12.7278C27.7106 12.9792 27.5168 13.1997 27.3453 13.3595C27.6845 13.6628 28.2305 13.6725 28.588 13.3954C28.9819 13.0994 29.1016 12.5311 28.9117 12.0859C28.7682 11.7545 28.4548 11.4977 28.0958 11.4425C27.8027 11.4047 27.4921 11.4919 27.2751 11.6958C26.9936 11.9265 26.87 12.3106 26.9224 12.6657L26.9222 12.6658C26.7333 12.7782 26.5315 12.8649 26.3298 12.9515L26.3298 12.9516C26.0971 13.0515 25.8645 13.1514 25.6519 13.2908C25.1539 12.8911 24.5691 12.4681 23.8952 12.534C23.8659 12.4876 23.8367 12.4411 23.8075 12.3946C23.482 11.8762 23.1541 11.3542 22.7353 10.9047C22.6699 10.8446 22.6126 10.7765 22.5555 10.7086C22.4726 10.61 22.3898 10.5116 22.2823 10.4376C20.9907 9.17843 19.2097 8.49191 17.4243 8.3703C17.3541 8.36918 17.2838 8.36785 17.2135 8.36652C16.6751 8.35631 16.1348 8.34606 15.6017 8.43135C15.4146 8.44793 15.2325 8.49208 15.0505 8.53622C14.8603 8.58234 14.6701 8.62846 14.4743 8.64307C14.3842 8.50208 14.2335 8.41827 14.0809 8.36304C13.5586 8.17942 12.9981 8.1455 12.4491 8.1644C12.3026 8.17042 12.1633 8.21175 12.024 8.25313ZM23.9774 12.6559C24.0547 12.7806 24.1187 12.9133 24.1772 13.0481C24.6108 13.9889 24.9073 14.9894 25.0982 16.0068C25.1078 16.0624 25.1181 16.118 25.1284 16.1736C25.1181 16.118 25.1078 16.0624 25.0982 16.0068C24.9073 14.9894 24.6108 13.9889 24.1772 13.048C24.1187 12.9132 24.0547 12.7806 23.9774 12.6559ZM10.6134 23.5074C10.5947 23.4629 10.5752 23.4188 10.5553 23.375C10.5322 23.3261 10.5086 23.2774 10.4844 23.229C10.5086 23.2774 10.5322 23.326 10.5552 23.3749C10.5752 23.4187 10.5947 23.4629 10.6134 23.5074ZM7.0192 20.289C6.97369 20.2979 6.92847 20.3104 6.88377 20.327C6.83261 20.3453 6.78525 20.3689 6.74058 20.3964C6.78526 20.3689 6.83263 20.3453 6.8838 20.327C6.92849 20.3104 6.9737 20.2979 7.0192 20.289ZM6.71278 25.1147C6.71278 25.1984 6.68476 25.2717 6.64083 25.3362C6.68475 25.2717 6.71274 25.1984 6.71274 25.1148C6.7425 24.7581 6.43394 24.4428 6.091 24.3988C6.43396 24.4427 6.74254 24.7579 6.71278 25.1147Z",
    fill: "white"
  }));
};

function _extends$l() {
  _extends$l = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$l.apply(this, arguments);
}
var HTML5Icon = _ref => {
  var props = _extends$l({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#HTML5_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M30.216 0L27.6454 28.7967L16.0907 32L4.56783 28.8012L2 0H30.216Z",
    fill: "#E44D26"
  }), React.createElement("path", {
    d: "M16.108 29.5515L25.4447 26.963L27.6415 2.35497H16.108V29.5515Z",
    fill: "#F16529"
  }), React.createElement("path", {
    d: "M11.1109 9.4197H16.108V5.88731H7.25053L7.33509 6.83499L8.20327 16.5692H16.108V13.0369H11.4338L11.1109 9.4197Z",
    fill: "#EBEBEB"
  }), React.createElement("path", {
    d: "M11.907 18.3354H8.36111L8.856 23.8818L16.0917 25.8904L16.108 25.8859V22.2108L16.0925 22.2149L12.1585 21.1527L11.907 18.3354Z",
    fill: "#EBEBEB"
  }), React.createElement("path", {
    d: "M16.0958 16.5692H20.4455L20.0354 21.1504L16.0958 22.2138V25.8887L23.3373 23.8817L23.3904 23.285L24.2205 13.9855L24.3067 13.0369H16.0958V16.5692Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M16.0958 9.41105V9.41969H24.6281L24.6989 8.62572L24.8599 6.83499L24.9444 5.88731H16.0958V9.41105Z",
    fill: "white"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "HTML5_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var HTML5IconDark = _ref2 => {
  var props = _extends$l({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M25.7224 27.5145L28 2H3L5.27515 27.5185L15.4847 30.3527L25.7224 27.5145ZM7.65209 7.2163H15.4892H15.5H23.3292L23.2544 8.05596L23.1118 9.64259L23.049 10.3461H15.5H11.0725L11.3585 13.551H15.5H22.7642L22.6878 14.3914L21.9524 22.631L21.9053 23.1598L15.5 24.935V24.9355L15.4856 24.9395L9.07456 23.1598L8.63609 18.2456H11.7779L12.0007 20.7417L15.4863 21.6829L15.4892 21.6822V21.6819L18.9798 20.7398L19.3431 16.6807H15.4892H8.49624L7.72701 8.05596L7.65209 7.2163Z",
    fill: "black",
    fillOpacity: "0.4"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M23.7726 25.8899L15.5 28.1833V24.935L21.9053 23.1598L21.9524 22.631L22.6878 14.3914L22.7642 13.551H15.5V10.3461H23.049L23.1118 9.64259L23.2544 8.05596L23.3292 7.2163H15.5V4.08656H25.7189L23.7726 25.8899ZM15.5 16.6807V21.679L18.9798 20.7398L19.3431 16.6807H15.5Z",
    fill: "black"
  }));
};
var HTML5IconLight = _ref3 => {
  var props = _extends$l({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M25.7224 27.5145L28 2H3L5.27515 27.5185L15.4847 30.3527L25.7224 27.5145ZM7.65209 7.2163H15.4892H15.5H23.3292L23.2544 8.05596L23.1118 9.64259L23.049 10.3461H15.5H11.0725L11.3585 13.551H15.5H22.7642L22.6878 14.3914L21.9524 22.631L21.9053 23.1598L15.5 24.935V24.9355L15.4856 24.9395L9.07456 23.1598L8.63609 18.2456H11.7779L12.0007 20.7417L15.4863 21.6829L15.4892 21.6822V21.6819L18.9798 20.7398L19.3431 16.6807H15.4892H8.49624L7.72701 8.05596L7.65209 7.2163Z",
    fill: "white",
    fillOpacity: "0.4"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M23.7726 25.8899L15.5 28.1833V24.935L21.9053 23.1598L21.9524 22.631L22.6878 14.3914L22.7642 13.551H15.5V10.3461H23.049L23.1118 9.64259L23.2544 8.05596L23.3292 7.2163H15.5V4.08656H25.7189L23.7726 25.8899ZM15.5 16.6807V21.679L18.9798 20.7398L19.3431 16.6807H15.5Z",
    fill: "white"
  }));
};

function _extends$m() {
  _extends$m = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$m.apply(this, arguments);
}
var HyperappIcon = _ref => {
  var props = _extends$m({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M31 8V24C31 26.21 29.21 28 27 28H5C2.79 28 1 26.21 1 24V8C1 5.79 2.79 4 5 4H27C29.21 4 31 5.79 31 8Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M27 4H5C2.79 4 1 5.79 1 8V24C1 26.21 2.79 28 5 28H27C29.21 28 31 26.21 31 24V8C31 5.79 29.21 4 27 4ZM13.08 17.06V22.33H11V17.06H5.74V15H11V9.67H13.08V15H17.4L18.41 17.06H13.08ZM23.86 22.33L17.67 9.67H20.1L26.3 22.33H23.86Z",
    fill: "#0080FF"
  }));
};
var HyperappIconDark = _ref2 => {
  var props = _extends$m({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M31 8V24C31 26.21 29.21 28 27 28H5C2.79 28 1 26.21 1 24V8C1 5.79 2.79 4 5 4H27C29.21 4 31 5.79 31 8Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M27 4H5C2.79 4 1 5.79 1 8V24C1 26.21 2.79 28 5 28H27C29.21 28 31 26.21 31 24V8C31 5.79 29.21 4 27 4ZM13.08 17.06V22.33H11V17.06H5.74V15H11V9.67H13.08V15H17.4L18.41 17.06H13.08ZM23.86 22.33L17.67 9.67H20.1L26.3 22.33H23.86Z",
    fill: "black"
  }));
};
var HyperappIconLight = _ref3 => {
  var props = _extends$m({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M31 8V24C31 26.21 29.21 28 27 28H5C2.79 28 1 26.21 1 24V8C1 5.79 2.79 4 5 4H27C29.21 4 31 5.79 31 8Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M27 4H5C2.79 4 1 5.79 1 8V24C1 26.21 2.79 28 5 28H27C29.21 28 31 26.21 31 24V8C31 5.79 29.21 4 27 4ZM13.08 17.06V22.33H11V17.06H5.74V15H11V9.67H13.08V15H17.4L18.41 17.06H13.08ZM23.86 22.33L17.67 9.67H20.1L26.3 22.33H23.86Z",
    fill: "white"
  }));
};

function _extends$n() {
  _extends$n = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$n.apply(this, arguments);
}
var InfernoIcon = _ref => {
  var props = _extends$n({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M10.5137 7.06576L10.0969 7.33199C6.66097 9.49476 4.85072 12.5722 4.80922 16.5128C4.75597 21.552 8.4456 25.9356 13.5492 27.0633C20.1374 28.519 26.6574 23.9227 27.1874 17.4491C27.6065 12.3287 24.0091 7.72862 18.9332 6.1386C18.1679 5.31731 17.4729 2.55701 18.6825 1.29974C23.6709 2.36657 27.4107 4.81794 29.822 8.7661C35.0943 17.3988 30.3546 28.6516 20.34 31.3394C11.0372 33.8361 1.62459 27.9341 0.233337 18.7321C-1.31054 10.152 4.98434 2.51899 13.8657 1.23622C11.7939 3.03965 10.6852 5.51629 10.5137 7.06576Z",
    fill: "#494949"
  }), React.createElement("path", {
    d: "M22.448 14.371C23.1652 13.0848 23.1327 11.7394 22.7255 10.3782C22.6254 10.0434 22.417 9.46913 22.2764 9.09367C24.6742 10.7991 26.722 14.8996 25.6811 18.9747C24.7169 22.7503 20.9569 25.7914 17.0781 26.1431C12.0832 26.5958 8.19947 23.7152 6.7376 20.2132C5.17884 16.4797 6.4271 11.8878 9.1061 9.6017C7.79522 12.1417 8.20097 14.1581 8.7366 14.9105C9.33197 15.7469 10.2798 16.1806 11.205 15.9329C12.1776 15.6726 12.9236 14.8351 12.9067 13.7675C12.8955 13.0546 12.7634 12.2506 12.4712 11.6083C10.7379 7.79754 12.1827 4.36079 14.9786 1.99399C15.7901 1.30695 16.7337 0.6477 17.9347 0C16.615 1.80343 16.3907 4.00073 17.3936 6.04548C17.9815 7.15971 18.7349 8.32338 19.3995 9.39839C20.5941 11.3305 21.3267 13.3171 21.0095 15.6218C21.006 15.6473 21.9597 15.2661 22.448 14.371Z",
    fill: "#FB3239"
  }));
};
var InfernoIconDark = _ref2 => {
  var props = _extends$n({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M11.6679 9.35454L11.3639 9.55629C8.85801 11.1953 7.53775 13.5274 7.50749 16.5136C7.46865 20.3324 10.1596 23.6543 13.8818 24.5089C18.6866 25.6121 23.4418 22.1289 23.8284 17.2231C24.1341 13.3428 21.5104 9.85686 17.8084 8.65193C17.2502 8.02954 16.7434 5.93775 17.6256 4.98498C21.2637 5.79343 23.9913 7.65111 25.7499 10.6431C29.595 17.185 26.1383 25.7125 18.8344 27.7493C12.0497 29.6414 5.18486 25.1688 4.17019 18.1954C3.04421 11.6933 7.63521 5.90894 14.1126 4.93684C12.6015 6.3035 11.793 8.18033 11.6679 9.35454Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M20.3718 14.8906C20.8949 13.9158 20.8712 12.8963 20.5742 11.8648C20.5012 11.6111 20.3492 11.1758 20.2467 10.8913C21.9955 12.1837 23.489 15.2911 22.7298 18.3793C22.0266 21.2405 19.2843 23.5451 16.4555 23.8116C12.8126 24.1546 9.98008 21.9717 8.9139 19.3178C7.77707 16.4885 8.68745 13.0087 10.6413 11.2763C9.68525 13.2012 9.98118 14.7292 10.3718 15.2993C10.806 15.9332 11.4973 16.2619 12.1721 16.0742C12.8814 15.8769 13.4255 15.2423 13.4132 14.4332C13.405 13.8929 13.3086 13.2837 13.0956 12.7969C11.8314 9.9091 12.8851 7.30469 14.9242 5.5111C15.5161 4.99045 16.2043 4.49087 17.0802 4.00003C16.1177 5.36669 15.9541 7.03183 16.6856 8.58137C17.1143 9.42574 17.6638 10.3076 18.1485 11.1222C19.0198 12.5864 19.5541 14.0919 19.3227 15.8384C19.3202 15.8577 20.0157 15.5688 20.3718 14.8906Z",
    fill: "black"
  }));
};
var InfernoIconLight = _ref3 => {
  var props = _extends$n({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M11.6679 9.35454L11.3639 9.55629C8.85801 11.1953 7.53775 13.5274 7.50749 16.5136C7.46865 20.3324 10.1596 23.6543 13.8818 24.5089C18.6866 25.6121 23.4418 22.1289 23.8284 17.2231C24.1341 13.3428 21.5104 9.85686 17.8084 8.65193C17.2502 8.02954 16.7434 5.93775 17.6256 4.98498C21.2637 5.79343 23.9913 7.65111 25.7499 10.6431C29.595 17.185 26.1383 25.7125 18.8344 27.7493C12.0497 29.6414 5.18486 25.1688 4.17019 18.1954C3.04421 11.6933 7.63521 5.90894 14.1126 4.93684C12.6015 6.3035 11.793 8.18033 11.6679 9.35454Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M20.3718 14.8906C20.8949 13.9158 20.8712 12.8963 20.5742 11.8648C20.5012 11.6111 20.3492 11.1758 20.2467 10.8913C21.9955 12.1837 23.489 15.2911 22.7298 18.3793C22.0266 21.2405 19.2843 23.5451 16.4555 23.8116C12.8126 24.1546 9.98008 21.9717 8.9139 19.3178C7.77707 16.4885 8.68745 13.0087 10.6413 11.2763C9.68525 13.2012 9.98118 14.7292 10.3718 15.2993C10.806 15.9332 11.4973 16.2619 12.1721 16.0742C12.8814 15.8769 13.4255 15.2423 13.4132 14.4332C13.405 13.8929 13.3086 13.2837 13.0956 12.7969C11.8314 9.9091 12.8851 7.30469 14.9242 5.5111C15.5161 4.99045 16.2043 4.49087 17.0802 4.00003C16.1177 5.36669 15.9541 7.03183 16.6856 8.58137C17.1143 9.42574 17.6638 10.3076 18.1485 11.1222C19.0198 12.5864 19.5541 14.0919 19.3227 15.8384C19.3202 15.8577 20.0157 15.5688 20.3718 14.8906Z",
    fill: "white"
  }));
};

function _extends$o() {
  _extends$o = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$o.apply(this, arguments);
}
var JavaScriptIcon = _ref => {
  var props = _extends$o({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M0 0H32V32H0V0Z",
    fill: "#F7DF1E"
  }), React.createElement("path", {
    d: "M8.41397 26.7415L10.8628 25.2595C11.3353 26.0972 11.765 26.8059 12.7959 26.8059C13.784 26.8059 14.407 26.4193 14.407 24.9158V14.6911H17.4142V24.9584C17.4142 28.073 15.5885 29.4907 12.9248 29.4907C10.5192 29.4907 9.12274 28.2448 8.41392 26.7413",
    fill: "black"
  }), React.createElement("path", {
    d: "M19.0476 26.4193L21.4962 25.0016C22.1408 26.0542 22.9785 26.8275 24.4606 26.8275C25.7066 26.8275 26.5011 26.2045 26.5011 25.3452C26.5011 24.3142 25.6849 23.949 24.3102 23.3477L23.5586 23.0253C21.3889 22.1018 19.9497 20.9419 19.9497 18.4931C19.9497 16.2376 21.6681 14.5191 24.3532 14.5191C26.265 14.5191 27.6397 15.1851 28.6277 16.925L26.2863 18.4286C25.7708 17.505 25.2124 17.1399 24.3533 17.1399C23.4726 17.1399 22.914 17.6984 22.914 18.4286C22.914 19.3308 23.4726 19.696 24.7612 20.2546L25.513 20.5767C28.0692 21.6723 29.5084 22.7892 29.5084 25.3023C29.5084 28.009 27.3819 29.491 24.5251 29.491C21.7326 29.491 19.9282 28.1593 19.0477 26.4193",
    fill: "black"
  }));
};
var JavaScriptIconDark = _ref2 => {
  var props = _extends$o({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 1H31V31H1V1ZM8.88808 26.0702L8.88813 26.0701C9.55269 27.4796 10.8618 28.6476 13.117 28.6476C15.6142 28.6476 17.3258 27.3185 17.3258 24.3985V14.7729H14.5066V24.3586C14.5066 25.7681 13.9225 26.1305 12.9961 26.1305C12.0297 26.1305 11.6268 25.4661 11.1839 24.6808L8.88813 26.0701L8.88804 26.0699L8.88808 26.0702ZM21.1527 24.439L18.8572 25.7681C19.6827 27.3993 21.3743 28.6478 23.9922 28.6478C26.6705 28.6478 28.6642 27.2584 28.6642 24.7209C28.6642 22.3648 27.3149 21.3178 24.9184 20.2907L24.2137 19.9886C23.0055 19.465 22.4819 19.1226 22.4819 18.2768C22.4819 17.5922 23.0055 17.0686 23.8312 17.0686C24.6367 17.0686 25.1601 17.4109 25.6434 18.2768L27.8385 16.8672C26.9122 15.236 25.6234 14.6117 23.8311 14.6117C21.3138 14.6117 19.7028 16.2228 19.7028 18.3373C19.7028 20.633 21.0521 21.7205 23.0861 22.5862L23.7908 22.8885C25.0796 23.4522 25.8448 23.7945 25.8448 24.7612C25.8448 25.5667 25.0999 26.1507 23.9318 26.1507C22.5423 26.1507 21.757 25.4258 21.1527 24.439Z",
    fill: "black"
  }));
};
var JavaScriptIconLight = _ref3 => {
  var props = _extends$o({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 1H31V31H1V1ZM8.88808 26.0702L8.88813 26.0701C9.55269 27.4796 10.8618 28.6476 13.117 28.6476C15.6142 28.6476 17.3258 27.3185 17.3258 24.3985V14.7729H14.5066V24.3586C14.5066 25.7681 13.9225 26.1305 12.9961 26.1305C12.0297 26.1305 11.6268 25.4661 11.1839 24.6808L8.88813 26.0701L8.88804 26.0699L8.88808 26.0702ZM21.1527 24.439L18.8572 25.7681C19.6827 27.3993 21.3743 28.6478 23.9922 28.6478C26.6705 28.6478 28.6642 27.2584 28.6642 24.7209C28.6642 22.3648 27.3149 21.3178 24.9184 20.2907L24.2137 19.9886C23.0055 19.465 22.4819 19.1226 22.4819 18.2768C22.4819 17.5922 23.0055 17.0686 23.8312 17.0686C24.6367 17.0686 25.1601 17.4109 25.6434 18.2768L27.8385 16.8672C26.9122 15.236 25.6234 14.6117 23.8311 14.6117C21.3138 14.6117 19.7028 16.2228 19.7028 18.3373C19.7028 20.633 21.0521 21.7205 23.0861 22.5862L23.7908 22.8885C25.0796 23.4522 25.8448 23.7945 25.8448 24.7612C25.8448 25.5667 25.0999 26.1507 23.9318 26.1507C22.5423 26.1507 21.757 25.4258 21.1527 24.439Z",
    fill: "white"
  }));
};

function _extends$p() {
  _extends$p = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$p.apply(this, arguments);
}
var MarionetteIcon = _ref => {
  var props = _extends$p({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M18.3668 14.4869L21.368 7.38807C21.4035 7.30278 21.503 7.26244 21.5891 7.29816C21.6747 7.33369 21.7157 7.43178 21.6797 7.51725L19.0347 13.7724L18.3668 14.4869Z",
    fill: "#939598"
  }), React.createElement("path", {
    d: "M20.9557 10.8742C20.9557 10.8742 19.5194 12.7565 18.5057 13.844C17.4911 14.9318 16.0127 16.6469 16.0127 16.6469V20.4815C16.0234 20.4808 16.0331 20.4786 16.0438 20.4786C16.289 20.4786 16.4877 20.675 16.4877 20.9175C16.4877 21.1603 16.2888 21.357 16.0438 21.357C16.0331 21.357 16.0234 21.3545 16.0127 21.3536V25.2223C16.0127 25.2223 17.8746 23.9571 19.2232 22.7332C20.7439 21.3531 22.434 19.198 22.434 19.198L20.9557 10.8744V10.8742Z",
    fill: "#931A2B"
  }), React.createElement("path", {
    d: "M14.9585 3.85769L14.9446 5.35261L9.51917 7.52578L9.61459 6.19753L14.9587 3.85733L14.9585 3.85769Z",
    fill: "#A7A9AC"
  }), React.createElement("path", {
    d: "M22.4958 6.14529L22.6016 7.473L17.1487 5.34354L17.123 3.84916L22.4958 6.14529ZM16.0385 3.38503L16.0442 4.91193L8.10759 1.8121L8.27231 0.065033L16.0385 3.38503ZM8.27231 0.065033L8.10759 1.8121L7.05512 2.43313L7.23708 0.72729L8.27231 0.065033Z",
    fill: "#BCBEC0"
  }), React.createElement("path", {
    d: "M23.7693 0L23.947 1.746L16.0442 4.91193L16.0383 3.38485L23.7693 0Z",
    fill: "#A7A9AC"
  }), React.createElement("path", {
    d: "M24.8124 0.653911L25.0077 2.35851L23.9472 1.746L23.7695 0.000183105L24.8124 0.653911Z",
    fill: "#BCBEC0"
  }), React.createElement("path", {
    d: "M10.5994 7.83124L9.519 7.52596L14.9446 5.35279L7.05512 2.43331L8.10759 1.8121L16.0442 4.91194L23.9472 1.746L25.0077 2.35851L17.1487 5.34373L22.6016 7.47301L21.5239 7.78717L16.0492 5.76148L10.5994 7.83088V7.83124Z",
    fill: "#808285"
  }), React.createElement("path", {
    d: "M7.14077 12.2158C7.13508 12.2158 7.12939 12.2158 7.12388 12.2149C7.03113 12.2057 6.96325 12.1243 6.97249 12.0319L7.93967 2.38142C7.94891 2.28991 8.02958 2.22239 8.12447 2.23163C8.21722 2.24051 8.2851 2.3226 8.27586 2.41429L7.30886 12.0647C7.29998 12.1511 7.22712 12.2158 7.14112 12.2158H7.14077ZM24.5313 12.2158C24.443 12.2158 24.3682 12.1472 24.363 12.0585L23.7784 2.34179C23.7727 2.24939 23.8436 2.16997 23.9369 2.16446C24.0323 2.15824 24.1103 2.22914 24.116 2.32154L24.7001 12.0377C24.706 12.1301 24.6352 12.2094 24.5419 12.2151C24.5382 12.2156 24.5348 12.2156 24.5313 12.2158ZM13.2416 14.1578L10.4439 7.56185C10.4078 7.47656 10.4483 7.37812 10.534 7.3424C10.6203 7.30686 10.7193 7.34702 10.7554 7.43214L13.8607 14.753L13.2416 14.1578Z",
    fill: "#939598"
  }), React.createElement("path", {
    d: "M15.6007 20.9179C15.6007 20.6858 15.7826 20.4978 16.0129 20.4817V16.6471C16.0129 16.6471 14.534 14.9318 13.5199 13.844C12.506 12.7565 11.0695 10.8742 11.0695 10.8742L9.59113 19.1987C9.59113 19.1987 11.281 21.3536 12.8017 22.7337C14.1503 23.9577 16.0126 25.2227 16.0126 25.2227V21.3538C15.7828 21.3376 15.6007 21.1494 15.6007 20.9179Z",
    fill: "#A81E2C"
  }), React.createElement("path", {
    d: "M16.0438 21.1686C16.003 21.1686 15.9614 21.154 15.929 21.1242L10.1061 15.7709L10.1043 15.3128L16.0428 20.7715L21.9059 15.2477L21.9295 15.687L16.1602 21.1222C16.1275 21.1535 16.0856 21.1688 16.0435 21.1688H16.0438V21.1686Z",
    fill: "#939598"
  }), React.createElement("path", {
    d: "M28.223 12.0454L20.9559 10.8744C20.9559 10.8744 21.6319 14.7227 21.6319 21.1645C21.6319 27.6071 20.7447 31.9993 20.7447 31.9993L28.0963 31.2043C28.0963 31.2043 29.0255 27.6895 29.0255 21.6242C29.0251 15.5591 28.2226 12.0452 28.2226 12.0452L28.223 12.0454ZM24.8637 29.0292C24.6654 29.0292 24.5046 28.8703 24.5046 28.6738C24.5046 28.478 24.6653 28.3184 24.8637 28.3184C25.0622 28.3184 25.2227 28.478 25.2227 28.6738C25.2227 28.87 25.0624 29.0292 24.8637 29.0292ZM10.3936 21.1643C10.3936 14.7225 11.0695 10.8742 11.0695 10.8742L3.80264 12.0452C3.80264 12.0452 3.00001 15.5592 3.00001 21.6246C3.00001 27.6906 3.92934 31.2046 3.92934 31.2046L11.2808 32C11.2808 31.9991 10.3936 27.6073 10.3936 21.1643ZM7.02668 29.0059C6.84188 29.0059 6.69173 28.8572 6.69173 28.6741C6.69173 28.4909 6.84153 28.3424 7.0265 28.3424C7.2113 28.3424 7.36128 28.4909 7.36128 28.6738C7.36128 28.8564 7.21148 29.0054 7.0265 29.0054L7.02668 29.0059Z",
    fill: "#CE2227"
  }), React.createElement("path", {
    d: "M24.8637 14.4867C25.0472 14.4867 25.1958 14.3395 25.1958 14.158C25.1958 13.9764 25.0472 13.8292 24.8637 13.8292C24.6803 13.8292 24.5316 13.9764 24.5316 14.158C24.5316 14.3395 24.6803 14.4867 24.8637 14.4867Z",
    fill: "#A51724"
  }), React.createElement("path", {
    d: "M24.8641 28.8412C24.8512 28.8412 24.8378 28.8394 24.8245 28.8362C24.7339 28.815 24.6777 28.7255 24.6992 28.6347C24.7044 28.6141 25.2016 26.4759 25.2016 21.524C25.2016 16.5625 24.7033 14.2159 24.6985 14.1931C24.6791 14.1025 24.7371 14.0137 24.8281 13.9941C24.9187 13.9746 25.0095 14.0321 25.0288 14.1226C25.034 14.1457 25.5395 16.5277 25.5395 21.524C25.5395 26.5232 25.0489 28.6247 25.0281 28.7118C25.0095 28.7898 24.9402 28.8413 24.8639 28.8413V28.8412H24.8641Z",
    fill: "#939598"
  }), React.createElement("path", {
    d: "M7.02667 14.5435C7.24178 14.5435 7.41617 14.3709 7.41617 14.1579C7.41617 13.945 7.24178 13.7724 7.02667 13.7724C6.81155 13.7724 6.63717 13.945 6.63717 14.1579C6.63717 14.3709 6.81155 14.5435 7.02667 14.5435Z",
    fill: "#A51724"
  }), React.createElement("path", {
    d: "M7.02635 28.8412C6.94408 28.8412 6.87211 28.7813 6.85932 28.6983C6.85523 28.6706 6.43499 25.8531 6.43499 21.4367C6.43499 17.0202 6.85523 14.162 6.85932 14.1336C6.87318 14.0421 6.95882 13.979 7.05122 13.9927C7.14362 14.006 7.20759 14.0913 7.19391 14.1825C7.18947 14.2109 6.77314 17.0469 6.77314 21.4371C6.77314 25.8291 7.18982 28.6221 7.19373 28.6489C7.20795 28.7395 7.14398 28.8257 7.05158 28.8394C7.04305 28.8401 7.03452 28.8412 7.02635 28.8412Z",
    fill: "#939598"
  }));
};
var MarionetteIconDark = _ref2 => {
  var props = _extends$p({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M22.9536 3.52775L22.7981 2L16.0335 4.96174V4.96182L9.23826 2.0569L8.33243 2.63638L8.17322 4.12899L9.09413 3.58558L14.4228 5.66683L9.09413 3.58559L8.17322 4.12915L13.4636 6.08685L10.4128 7.42284L10.3293 8.58506L15.0763 6.68362L15.0765 6.6837L10.3291 8.58522L11.2744 8.85233V8.85202L16.043 7.0413L20.219 8.58647L17.75 14.4265L18.3344 13.8013L20.4962 8.68901L20.8334 8.81378L21.7763 8.53887L21.6838 7.37713L18.6133 6.0649L23.8817 4.0637L22.9538 3.52776L17.649 5.65283V5.65281L22.9536 3.52775ZM21.7763 8.53887L17.0051 6.67577L17.0053 6.67568L21.7763 8.53887ZM16.0386 6.29794L15.0836 5.92492V5.92491L16.0386 6.29793V6.29794ZM16.0387 6.29794V6.29795L16.0386 6.29794H16.0387ZM16.0387 6.29794L16.992 5.91601V5.91603L16.0387 6.29794ZM23.8817 4.06368L23.7108 2.57216L22.7983 2.00015L22.9538 3.52774L23.8817 4.06368Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M8.24817 12.6888C8.24319 12.6888 8.23821 12.6888 8.23339 12.688C8.15223 12.6799 8.09284 12.6087 8.10093 12.5279L8.94721 4.08374C8.95529 4.00367 9.02588 3.94459 9.1089 3.95267C9.19007 3.96045 9.24946 4.03228 9.24137 4.11251L8.39525 12.5567C8.38748 12.6322 8.32342 12.6888 8.24817 12.6888ZM23.4649 12.6888C23.3876 12.6888 23.3221 12.6288 23.3176 12.5512L22.8061 4.04907C22.8011 3.96822 22.8632 3.89872 22.9448 3.8939C23.0283 3.88846 23.0965 3.9505 23.1015 4.03135L23.6126 12.533C23.6177 12.6139 23.5558 12.6832 23.4742 12.6882C23.4709 12.6887 23.468 12.6887 23.4649 12.6888ZM13.8125 13.8125L11.1384 8.61662C11.1068 8.54199 11.1423 8.45585 11.2172 8.4246C11.2928 8.39351 11.3794 8.42865 11.4109 8.50312L14.25 14.3881L13.8125 13.8125Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.0113 16.5662V16.5703C16.3213 16.2124 17.3547 15.0239 18.1012 14.2235C18.9883 13.272 20.245 11.6252 20.245 11.6252L20.9464 15.5743L16.1549 20.0884C16.0948 20.0507 16.0235 20.0289 15.9471 20.0289C15.9415 20.0289 15.9363 20.0295 15.9309 20.0302C15.9273 20.0306 15.9236 20.0311 15.9198 20.0314V19.9388C15.8398 19.9642 15.7711 20.0142 15.7231 20.0801L10.9447 15.6877L11.6858 11.5149C11.6858 11.5149 12.9427 13.1619 13.8299 14.1135C14.7172 15.0653 16.0113 16.5662 16.0113 16.5662ZM10.8838 16.0311L15.6743 20.4353C15.7259 20.5734 15.8561 20.6736 16.011 20.6845V20.7922C16.195 20.7621 16.3354 20.6037 16.3354 20.4129C16.3354 20.3846 16.3324 20.3571 16.3265 20.3305L21.0078 15.9203L21.5384 18.9083C21.5384 18.9083 20.0597 20.794 18.7291 22.0016C17.549 23.0726 15.9198 24.1796 15.9198 24.1796V24.0072C15.561 23.7588 14.2154 22.8122 13.2014 21.892C11.8708 20.6844 10.3922 18.7989 10.3922 18.7989L10.8838 16.0311Z",
    fill: "black",
    fillOpacity: "0.8"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20.3364 11.6252L26.6948 12.6497C26.6996 12.6708 27.397 15.7425 27.3973 21.0313C27.3973 26.3384 26.5843 29.4138 26.5843 29.4138L20.1516 30.1094C20.1516 30.1094 20.9279 26.2663 20.9279 20.629C20.9279 14.9924 20.3364 11.6252 20.3364 11.6252ZM23.7558 27.5106C23.5822 27.5106 23.4415 27.3716 23.4415 27.1996C23.4415 27.0599 23.5351 26.9412 23.6638 26.9022C23.7802 26.251 24.0514 24.3647 24.0514 20.9436C24.0514 16.6127 23.6175 14.5588 23.6112 14.5292C23.5943 14.4499 23.6449 14.372 23.7245 14.3549C23.8038 14.3378 23.8833 14.3882 23.9002 14.4673C23.9048 14.4875 24.3471 16.5718 24.3471 20.9436C24.3471 24.4249 24.0752 26.3003 23.955 26.9593C24.0251 27.0164 24.0698 27.103 24.0698 27.1996C24.0698 27.3713 23.9296 27.5106 23.7558 27.5106Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.0944 20.6289C11.0944 14.9922 11.6858 11.625 11.6858 11.625L5.3273 12.6496C5.3273 12.6496 4.625 15.7244 4.625 21.0316C4.625 26.3394 5.43816 29.4141 5.43816 29.4141L11.8707 30.1101L11.8704 30.1085C11.8528 30.0198 11.0944 26.201 11.0944 20.6289ZM8.14834 27.4902C7.98664 27.4902 7.85526 27.3601 7.85526 27.1999C7.85526 27.1069 7.89941 27.0241 7.9681 26.971C7.87652 26.2519 7.63061 24.0274 7.63061 20.8672C7.63061 17.0337 7.99246 14.542 8.00174 14.478L8.0019 14.477C8.01402 14.3969 8.08897 14.3417 8.16982 14.3537C8.25066 14.3653 8.30664 14.44 8.29467 14.5197C8.29078 14.5446 7.92649 17.0261 7.92649 20.8675C7.92649 24.0132 8.17078 26.2214 8.26131 26.9321C8.36689 26.976 8.44111 27.0793 8.44111 27.1996C8.44111 27.3595 8.31019 27.4902 8.14834 27.4902Z",
    fill: "black"
  }));
};
var MarionetteIconLight = _ref3 => {
  var props = _extends$p({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M22.9536 3.52775L22.7981 2L16.0335 4.96174V4.96182L9.23826 2.0569L8.33243 2.63638L8.17322 4.12899L9.09413 3.58558L14.4228 5.66683L9.09413 3.58559L8.17322 4.12915L13.4636 6.08685L10.4128 7.42284L10.3293 8.58506L15.0763 6.68362L15.0765 6.6837L10.3291 8.58522L11.2744 8.85233V8.85202L16.043 7.0413L20.219 8.58647L17.75 14.4265L18.3344 13.8013L20.4962 8.68901L20.8334 8.81378L21.7763 8.53887L21.6838 7.37713L18.6133 6.0649L23.8817 4.0637L22.9538 3.52776L17.649 5.65283V5.65281L22.9536 3.52775ZM21.7763 8.53887L17.0051 6.67577L17.0053 6.67568L21.7763 8.53887ZM16.0386 6.29794L15.0836 5.92492V5.92491L16.0386 6.29793V6.29794ZM16.0387 6.29794V6.29795L16.0386 6.29794H16.0387ZM16.0387 6.29794L16.992 5.91601V5.91603L16.0387 6.29794ZM23.8817 4.06368L23.7108 2.57216L22.7983 2.00015L22.9538 3.52774L23.8817 4.06368Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M8.24817 12.6888C8.24319 12.6888 8.23821 12.6888 8.23339 12.688C8.15223 12.6799 8.09284 12.6087 8.10093 12.5279L8.94721 4.08374C8.95529 4.00367 9.02588 3.94459 9.1089 3.95267C9.19007 3.96045 9.24946 4.03228 9.24137 4.11251L8.39525 12.5567C8.38748 12.6322 8.32342 12.6888 8.24817 12.6888ZM23.4649 12.6888C23.3876 12.6888 23.3221 12.6288 23.3176 12.5512L22.8061 4.04907C22.8011 3.96822 22.8632 3.89872 22.9448 3.8939C23.0283 3.88846 23.0965 3.9505 23.1015 4.03135L23.6126 12.533C23.6177 12.6139 23.5558 12.6832 23.4742 12.6882C23.4709 12.6887 23.468 12.6887 23.4649 12.6888ZM13.8125 13.8125L11.1384 8.61662C11.1068 8.54199 11.1423 8.45585 11.2172 8.4246C11.2928 8.39351 11.3794 8.42865 11.4109 8.50312L14.25 14.3881L13.8125 13.8125Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.0113 16.5662V16.5703C16.3213 16.2124 17.3547 15.0239 18.1012 14.2235C18.9883 13.272 20.245 11.6252 20.245 11.6252L20.9464 15.5743L16.1549 20.0884C16.0948 20.0507 16.0235 20.0289 15.9471 20.0289C15.9415 20.0289 15.9363 20.0295 15.9309 20.0302C15.9273 20.0306 15.9236 20.0311 15.9198 20.0314V19.9388C15.8398 19.9642 15.7711 20.0142 15.7231 20.0801L10.9447 15.6877L11.6858 11.5149C11.6858 11.5149 12.9427 13.1619 13.8299 14.1135C14.7172 15.0653 16.0113 16.5662 16.0113 16.5662ZM10.8838 16.0311L15.6743 20.4353C15.7259 20.5734 15.8561 20.6736 16.011 20.6845V20.7922C16.195 20.7621 16.3354 20.6037 16.3354 20.4129C16.3354 20.3846 16.3324 20.3571 16.3265 20.3305L21.0078 15.9203L21.5384 18.9083C21.5384 18.9083 20.0597 20.794 18.7291 22.0016C17.549 23.0726 15.9198 24.1796 15.9198 24.1796V24.0072C15.561 23.7588 14.2154 22.8122 13.2014 21.892C11.8708 20.6844 10.3922 18.7989 10.3922 18.7989L10.8838 16.0311Z",
    fill: "white",
    fillOpacity: "0.8"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20.3364 11.6252L26.6948 12.6497C26.6996 12.6708 27.397 15.7425 27.3973 21.0313C27.3973 26.3384 26.5843 29.4138 26.5843 29.4138L20.1516 30.1094C20.1516 30.1094 20.9279 26.2663 20.9279 20.629C20.9279 14.9924 20.3364 11.6252 20.3364 11.6252ZM23.7558 27.5106C23.5822 27.5106 23.4415 27.3716 23.4415 27.1996C23.4415 27.0599 23.5351 26.9412 23.6638 26.9022C23.7802 26.251 24.0514 24.3647 24.0514 20.9436C24.0514 16.6127 23.6175 14.5588 23.6112 14.5292C23.5943 14.4499 23.6449 14.372 23.7245 14.3549C23.8038 14.3378 23.8833 14.3882 23.9002 14.4673C23.9048 14.4875 24.3471 16.5718 24.3471 20.9436C24.3471 24.4249 24.0752 26.3003 23.955 26.9593C24.0251 27.0164 24.0698 27.103 24.0698 27.1996C24.0698 27.3713 23.9296 27.5106 23.7558 27.5106Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.0944 20.6289C11.0944 14.9922 11.6858 11.625 11.6858 11.625L5.3273 12.6496C5.3273 12.6496 4.625 15.7244 4.625 21.0316C4.625 26.3394 5.43816 29.4141 5.43816 29.4141L11.8707 30.1101L11.8704 30.1085C11.8528 30.0198 11.0944 26.201 11.0944 20.6289ZM8.14834 27.4902C7.98664 27.4902 7.85526 27.3601 7.85526 27.1999C7.85526 27.1069 7.89941 27.0241 7.9681 26.971C7.87652 26.2519 7.63061 24.0274 7.63061 20.8672C7.63061 17.0337 7.99246 14.542 8.00174 14.478L8.0019 14.477C8.01402 14.3969 8.08897 14.3417 8.16982 14.3537C8.25066 14.3653 8.30664 14.44 8.29467 14.5197C8.29078 14.5446 7.92649 17.0261 7.92649 20.8675C7.92649 24.0132 8.17078 26.2214 8.26131 26.9321C8.36689 26.976 8.44111 27.0793 8.44111 27.1996C8.44111 27.3595 8.31019 27.4902 8.14834 27.4902Z",
    fill: "white"
  }));
};

function _extends$q() {
  _extends$q = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$q.apply(this, arguments);
}
var MarkoIcon = _ref => {
  var props = _extends$q({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16.0125 9.125H20.525C18.8625 11.85 17.025 14.85 15.1875 17.8375H10.675C12.5125 14.85 14.35 11.85 16.0125 9.125Z",
    fill: "#8DC220"
  }), React.createElement("path", {
    d: "M5.3375 9.125H9.85C8.9625 10.575 8.0625 12.0375 7.175 13.4875C6.2875 14.9375 5.4 16.3875 4.5125 17.8375C5.4 19.2875 6.2875 20.75 7.175 22.2C8.0625 23.65 8.95 25.1 9.85 26.55H5.3375C4.45 25.1 3.55 23.65 2.6625 22.2C1.775 20.7625 0.8875 19.3 0 17.85C0.8875 16.4 1.775 14.95 2.6625 13.5C3.55 12.0375 4.45 10.5875 5.3375 9.125Z",
    fill: "#44BFEF"
  }), React.createElement("path", {
    d: "M5.33749 9.125C7.17499 12.125 9.01249 15.125 10.675 17.8375H15.1875C13.525 15.125 11.6875 12.125 9.84999 9.125H5.33749Z",
    fill: "#00AC71"
  }), React.createElement("path", {
    d: "M20.525 9.125H16.0125C16.9 10.575 17.7875 12.0375 18.6875 13.4875C19.575 14.9375 20.4625 16.3875 21.3625 17.8375C20.475 19.2875 19.575 20.75 18.6875 22.2C17.8 23.65 16.9125 25.1 16.0125 26.55H20.525C21.4125 25.1 22.3 23.65 23.2 22.2C24.0875 20.75 24.975 19.3 25.875 17.8375C24.975 16.3875 24.0875 14.9375 23.2 13.4875C22.3125 12.0375 21.4125 10.5875 20.525 9.125Z",
    fill: "#F9BC00"
  }), React.createElement("path", {
    d: "M18.6625 12.2H14.15C13.575 13.1375 13 14.0875 12.425 15.025C11.85 15.9625 11.275 16.9125 10.6875 17.85H15.2C15.775 16.9125 16.3625 15.9625 16.9375 15.025C17.5 14.075 18.075 13.1375 18.6625 12.2Z",
    fill: "url(#Marko_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M12.5625 14.775H17.075C17.65 13.8375 18.225 12.8875 18.8 11.95C19.375 11.0125 19.95 10.0625 20.525 9.125H16.0125C15.4375 10.0625 14.8625 11.0125 14.2875 11.95C13.7125 12.9 13.1375 13.8375 12.5625 14.775Z",
    fill: "url(#Marko_Paint1_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M23.9875 14.775H19.475C18.9 13.8375 18.3125 12.8875 17.7375 11.95C17.1625 11.0125 16.5875 10.0625 16.0125 9.125H20.525C21.1 10.0625 21.675 11.0125 22.25 11.95C22.8375 12.9 23.4125 13.8375 23.9875 14.775Z",
    fill: "url(#Marko_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M26.65 9.125H22.1375C23.025 10.5875 23.9125 12.0375 24.8 13.4875C25.6875 14.9375 26.5875 16.3875 27.475 17.8375C26.5875 19.2875 25.6875 20.75 24.8 22.2C23.9125 23.65 23.025 25.1 22.125 26.55H26.6375C27.525 25.1 28.4125 23.65 29.3125 22.2C30.2 20.75 31.0875 19.3 31.9875 17.8375C31.1 16.3875 30.2125 14.9375 29.3125 13.4875C28.4375 12.0375 27.5375 10.5875 26.65 9.125Z",
    fill: "#DF1B1C"
  }), React.createElement("path", {
    d: "M30.1125 14.775H25.6C25.0125 13.8375 24.4375 12.8875 23.8625 11.95C23.2875 11.0125 22.7125 10.0625 22.1375 9.125H26.65C27.225 10.0625 27.8 11.0125 28.375 11.95C28.95 12.9 29.5375 13.8375 30.1125 14.775Z",
    fill: "url(#Marko_Paint3_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M24.025 23.5H28.5375C29.1125 22.5625 29.6875 21.625 30.2625 20.675C30.8375 19.7375 31.4125 18.7875 32 17.85H27.475C26.9 18.7875 26.325 19.7375 25.75 20.675C25.175 21.6125 24.6 22.55 24.025 23.5Z",
    fill: "url(#Marko_Paint4_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M17.9 23.5H22.4125C22.9875 22.5625 23.5625 21.6125 24.1375 20.675C24.7125 19.7375 25.2875 18.7875 25.875 17.85H21.3625C20.7875 18.7875 20.2125 19.7375 19.6375 20.675C19.05 21.6125 18.475 22.55 17.9 23.5Z",
    fill: "url(#Marko_Paint5_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M7.975 12.2H3.4625C2.8875 13.1375 2.3125 14.0875 1.7375 15.025C1.15 15.9625 0.575 16.9125 0 17.85H4.5125C5.0875 16.9125 5.6625 15.975 6.2375 15.025C6.8125 14.0875 7.3875 13.1375 7.975 12.2Z",
    fill: "url(#Marko_Paint6_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M1.875 14.775H6.3875C6.9625 13.8375 7.5375 12.8875 8.1125 11.95C8.7 11.0125 9.275 10.0625 9.85 9.125H5.3375C4.7625 10.0625 4.1875 11 3.6125 11.95C3.0375 12.8875 2.4625 13.8375 1.875 14.775Z",
    fill: "url(#Marko_Paint7_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M1.875 20.9125H6.3875C6.9625 21.85 7.5375 22.8 8.1125 23.7375C8.6875 24.675 9.2625 25.625 9.8375 26.5625H5.325C4.75 25.625 4.1625 24.6875 3.5875 23.7375C3.025 22.8 2.45 21.8625 1.875 20.9125Z",
    fill: "url(#Marko_Paint8_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M13.3125 14.775H8.79999C8.22499 13.8375 7.64999 12.8875 7.07499 11.95C6.48749 11.0125 5.91249 10.0625 5.33749 9.125H9.84999C10.425 10.0625 11 11 11.575 11.95C12.1625 12.8875 12.7375 13.8375 13.3125 14.775Z",
    fill: "url(#Marko_Paint9_Linear_".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Marko_Paint0_Linear_".concat(id),
    x1: "14.6679",
    y1: "17.8448",
    x2: "14.6679",
    y2: "12.1949",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#8AC23E"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#8AC23E",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint1_Linear_".concat(id),
    x1: "16.5424",
    y1: "9.1286",
    x2: "16.5424",
    y2: "14.7785",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#698932"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#698932",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint2_Linear_".concat(id),
    x1: "20.0047",
    y1: "9.1286",
    x2: "20.0047",
    y2: "14.7785",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#FFED01"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#FFED01",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint3_Linear_".concat(id),
    x1: "26.1264",
    y1: "9.1286",
    x2: "26.1264",
    y2: "14.7802",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#E02A89"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#E02A89",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint4_Linear_".concat(id),
    x1: "28.0096",
    y1: "17.8448",
    x2: "28.0096",
    y2: "23.4947",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#7F1E4F"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#7F1E4F",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint5_Linear_".concat(id),
    x1: "21.8847",
    y1: "17.8448",
    x2: "21.8847",
    y2: "23.4947",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#E95506"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#E95506",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint6_Linear_".concat(id),
    x1: "3.98564",
    y1: "17.8448",
    x2: "3.98564",
    y2: "12.1985",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#88D0F1"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#88D0F1",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint7_Linear_".concat(id),
    x1: "5.86414",
    y1: "9.1286",
    x2: "5.86414",
    y2: "14.7749",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#00828B"
  }), React.createElement("stop", {
    offset: "0.8325",
    stopColor: "#00828B",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint8_Linear_".concat(id),
    x1: "5.86246",
    y1: "26.5611",
    x2: "5.86246",
    y2: "20.9165",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#2073BA"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#2073BA",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Marko_Paint9_Linear_".concat(id),
    x1: "9.32641",
    y1: "9.1286",
    x2: "9.32641",
    y2: "14.7749",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#8ED0E1"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#88D0F1",
    stopOpacity: "0"
  }))));
};
var MarkoIconDark = _ref2 => {
  var props = _extends$q({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.6625 13.5C3.08457 12.8045 3.50947 12.1118 3.9345 11.4192C4.40213 10.6501 4.86976 9.88762 5.33739 9.12517L5.3375 9.125H9.85C9.85145 9.12737 9.8529 9.12973 9.85435 9.1321C10.1698 9.64648 10.4853 10.1609 10.8008 10.6773C11.1658 11.2732 11.5295 11.8671 11.8907 12.4567C12.2088 12.9698 12.5238 13.4854 12.8378 13.9992C12.8701 14.052 12.9024 14.1048 12.9346 14.1576C13.675 12.9498 14.4033 11.7598 15.1075 10.6073L15.15 10.5375C15.4375 10.0656 15.725 9.59375 16.0125 9.125H20.525C20.8125 9.59375 21.1 10.0656 21.3875 10.5375L21.4109 10.5759C21.6664 10.9924 21.9223 11.4082 22.1779 11.8236C22.5195 12.3787 22.8607 12.9331 23.2 13.4875L23.2003 13.488C24.0877 14.9378 24.9751 16.3877 25.875 17.8375L25.8673 17.85H25.875C25.4491 18.5297 25.0297 19.2159 24.6122 19.8992L24.611 19.901L24.608 19.906C24.451 20.1629 24.2942 20.4194 24.1375 20.675C23.8502 21.1435 23.5628 21.615 23.2755 22.0866L23.275 22.0875C22.9875 22.5594 22.7 23.0312 22.4125 23.5H22.3961C21.7696 24.5167 21.1473 25.5333 20.525 26.55H16.0125C16.9125 25.1 17.8 23.65 18.6875 22.2C19.1308 21.4757 19.5773 20.7483 20.0237 20.0209L20.025 20.0187C20.4719 19.2906 20.9188 18.5625 21.3625 17.8375C20.7289 16.8167 20.1015 15.7958 19.4759 14.775H19.475C19.1875 14.3062 18.8969 13.8344 18.6063 13.3625L18.274 12.823C17.8209 13.5533 17.3754 14.2854 16.9375 15.025C16.65 15.4937 16.3594 15.9655 16.0688 16.4374C15.7782 16.9093 15.4875 17.3812 15.2 17.85H10.6875L10.6953 17.8375H10.675C9.69701 16.2418 8.65845 14.5467 7.59497 12.8105C7.2987 13.2894 7.00497 13.7701 6.71212 14.2493C6.55374 14.5084 6.39562 14.7672 6.2375 15.025C5.66378 15.9729 5.09005 16.9083 4.51633 17.8438C4.95869 18.5665 5.40105 19.2924 5.84342 20.0182L5.84375 20.0187C6.2875 20.7469 6.73125 21.475 7.175 22.2C8.0625 23.65 8.95 25.1 9.85 26.55H9.82983L9.8375 26.5625H5.325C5.1054 26.2045 4.88399 25.8464 4.66214 25.4877C4.30308 24.9071 3.9429 24.3247 3.5875 23.7375C3.23784 23.1547 2.88335 22.572 2.52703 21.9862L2.5268 21.9858L2.22635 21.4917C1.78021 20.7655 1.33407 20.0345 0.887937 19.3035L0.887457 19.3027C0.591638 18.818 0.295819 18.3333 0 17.85L0.357269 17.2663L0.474658 17.0742L0.474898 17.0738L0.475233 17.0733L0.475741 17.0724C0.673389 16.749 0.871442 16.4249 1.07041 16.1012L1.88211 14.775H1.875C2.02913 14.5291 2.18239 14.2822 2.33502 14.035L2.6625 13.5ZM26.65 9.125C26.9375 9.59375 27.225 10.0656 27.5125 10.5375L27.6201 10.714L27.8428 11.0773L27.843 11.0777L27.8449 11.0808L27.8458 11.0822L27.8474 11.0849L27.8482 11.0862C28.2465 11.736 28.6439 12.3843 29.0371 13.0324C29.1717 13.2507 29.3064 13.4685 29.4409 13.686L29.4451 13.6929L29.4477 13.697L29.4497 13.7002C29.6715 14.059 29.8929 14.417 30.1125 14.775H30.1087C30.7377 15.7957 31.3625 16.8163 31.9872 17.837L31.9873 17.8372L31.9875 17.8375L31.9798 17.85H32C31.5741 18.5297 31.1547 19.2159 30.7372 19.8992L30.736 19.901C30.578 20.1596 30.4203 20.4178 30.2625 20.675C29.6875 21.625 29.1125 22.5625 28.5375 23.5H28.5086C27.882 24.5167 27.2598 25.5333 26.6375 26.55H22.125C23.025 25.1 23.9125 23.65 24.8 22.2C25.2437 21.475 25.6906 20.7469 26.1375 20.0187C26.5844 19.2906 27.0312 18.5625 27.475 17.8375C27.0314 17.1128 26.5847 16.3881 26.138 15.6634L26.1375 15.6624C25.6906 14.9375 25.2437 14.2125 24.8 13.4875C23.9125 12.0375 23.025 10.5875 22.1375 9.125H26.65Z",
    fill: "black"
  }));
};
var MarkoIconLight = _ref3 => {
  var props = _extends$q({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.6625 13.5C3.08457 12.8045 3.50947 12.1118 3.9345 11.4192C4.40213 10.6501 4.86976 9.88762 5.33739 9.12517L5.3375 9.125H9.85C9.85145 9.12737 9.8529 9.12973 9.85435 9.1321C10.1698 9.64648 10.4853 10.1609 10.8008 10.6773C11.1658 11.2732 11.5295 11.8671 11.8907 12.4567C12.2088 12.9698 12.5238 13.4854 12.8378 13.9992C12.8701 14.052 12.9024 14.1048 12.9346 14.1576C13.675 12.9498 14.4033 11.7598 15.1075 10.6073L15.15 10.5375C15.4375 10.0656 15.725 9.59375 16.0125 9.125H20.525C20.8125 9.59375 21.1 10.0656 21.3875 10.5375L21.4109 10.5759C21.6664 10.9924 21.9223 11.4082 22.1779 11.8236C22.5195 12.3787 22.8607 12.9331 23.2 13.4875L23.2003 13.488C24.0877 14.9378 24.9751 16.3877 25.875 17.8375L25.8673 17.85H25.875C25.4491 18.5297 25.0297 19.2159 24.6122 19.8992L24.611 19.901L24.608 19.906C24.451 20.1629 24.2942 20.4194 24.1375 20.675C23.8502 21.1435 23.5628 21.615 23.2755 22.0866L23.275 22.0875C22.9875 22.5594 22.7 23.0312 22.4125 23.5H22.3961C21.7696 24.5167 21.1473 25.5333 20.525 26.55H16.0125C16.9125 25.1 17.8 23.65 18.6875 22.2C19.1308 21.4757 19.5773 20.7483 20.0237 20.0209L20.025 20.0187C20.4719 19.2906 20.9188 18.5625 21.3625 17.8375C20.7289 16.8167 20.1015 15.7958 19.4759 14.775H19.475C19.1875 14.3062 18.8969 13.8344 18.6063 13.3625L18.274 12.823C17.8209 13.5533 17.3754 14.2854 16.9375 15.025C16.65 15.4937 16.3594 15.9655 16.0688 16.4374C15.7782 16.9093 15.4875 17.3812 15.2 17.85H10.6875L10.6953 17.8375H10.675C9.69701 16.2418 8.65845 14.5467 7.59497 12.8105C7.2987 13.2894 7.00497 13.7701 6.71212 14.2493C6.55374 14.5084 6.39562 14.7672 6.2375 15.025C5.66378 15.9729 5.09005 16.9083 4.51633 17.8438C4.95869 18.5665 5.40105 19.2924 5.84342 20.0182L5.84375 20.0187C6.2875 20.7469 6.73125 21.475 7.175 22.2C8.0625 23.65 8.95 25.1 9.85 26.55H9.82983L9.8375 26.5625H5.325C5.1054 26.2045 4.88399 25.8464 4.66214 25.4877C4.30308 24.9071 3.9429 24.3247 3.5875 23.7375C3.23784 23.1547 2.88335 22.572 2.52703 21.9862L2.5268 21.9858L2.22635 21.4917C1.78021 20.7655 1.33407 20.0345 0.887937 19.3035L0.887457 19.3027C0.591638 18.818 0.295819 18.3333 0 17.85L0.357269 17.2663L0.474658 17.0742L0.474898 17.0738L0.475233 17.0733L0.475741 17.0724C0.673389 16.749 0.871442 16.4249 1.07041 16.1012L1.88211 14.775H1.875C2.02913 14.5291 2.18239 14.2822 2.33502 14.035L2.6625 13.5ZM26.65 9.125C26.9375 9.59375 27.225 10.0656 27.5125 10.5375L27.6201 10.714L27.8428 11.0773L27.843 11.0777L27.8449 11.0808L27.8458 11.0822L27.8474 11.0849L27.8482 11.0862C28.2465 11.736 28.6439 12.3843 29.0371 13.0324C29.1717 13.2507 29.3064 13.4685 29.4409 13.686L29.4451 13.6929L29.4477 13.697L29.4497 13.7002C29.6715 14.059 29.8929 14.417 30.1125 14.775H30.1087C30.7377 15.7957 31.3625 16.8163 31.9872 17.837L31.9873 17.8372L31.9875 17.8375L31.9798 17.85H32C31.5741 18.5297 31.1547 19.2159 30.7372 19.8992L30.736 19.901C30.578 20.1596 30.4203 20.4178 30.2625 20.675C29.6875 21.625 29.1125 22.5625 28.5375 23.5H28.5086C27.882 24.5167 27.2598 25.5333 26.6375 26.55H22.125C23.025 25.1 23.9125 23.65 24.8 22.2C25.2437 21.475 25.6906 20.7469 26.1375 20.0187C26.5844 19.2906 27.0312 18.5625 27.475 17.8375C27.0314 17.1128 26.5847 16.3881 26.138 15.6634L26.1375 15.6624C25.6906 14.9375 25.2437 14.2125 24.8 13.4875C23.9125 12.0375 23.025 10.5875 22.1375 9.125H26.65Z",
    fill: "white"
  }));
};

function _extends$r() {
  _extends$r = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$r.apply(this, arguments);
}
var MDXDeckIcon = _ref => {
  var props = _extends$r({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M30.7826 9.56522H1.21739C0.641093 9.56522 0.173912 10.0324 0.173912 10.6087V21.3913C0.173912 21.9676 0.641093 22.4348 1.21739 22.4348H30.7826C31.3589 22.4348 31.8261 21.9676 31.8261 21.3913V10.6087C31.8261 10.0324 31.3589 9.56522 30.7826 9.56522Z",
    fill: "white",
    stroke: "#EAEAEA",
    strokeWidth: "0.347826"
  }), React.createElement("path", {
    d: "M16.3478 17.7391V12.5997",
    stroke: "black",
    strokeWidth: "1.3913",
    strokeLinecap: "square"
  }), React.createElement("path", {
    d: "M13.2174 15.7078L16.3733 18.8638L19.4843 15.7533",
    stroke: "black",
    strokeWidth: "1.3913"
  }), React.createElement("path", {
    d: "M3.81449 19.5775V13.7888L7.02609 17.0006L10.2567 13.7702V19.536",
    stroke: "black",
    strokeWidth: "1.3913"
  }), React.createElement("path", {
    d: "M21.6953 18.9607L28.4823 12.1739M28.3917 18.9607L21.6046 12.1739L28.3917 18.9607Z",
    stroke: "#F9AC00",
    strokeWidth: "1.3913"
  }));
};
var MDXDeckIconDark = _ref2 => {
  var props = _extends$r({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.04348 10H30.6087C31.185 10 31.6522 10.4672 31.6522 11.0435V21.8261C31.6522 22.4024 31.185 22.8696 30.6087 22.8696H1.04348C0.467181 22.8696 0 22.4024 0 21.8261V11.0435C0 10.4672 0.467181 10 1.04348 10ZM28.8835 18.4688L26.0273 15.6126L28.9742 12.6658L27.9904 11.682L25.0435 14.6289L22.0965 11.682L21.1127 12.6658L24.0597 15.6126L21.2034 18.4688L22.1872 19.4526L25.0435 16.5964L27.8998 19.4526L28.8835 18.4688ZM10.7784 12.5256V14.205V19.9708H9.38713V15.8844L7.34406 17.9273L6.85214 18.4192L6.36026 17.9272L4.33623 15.9031V20.0123H2.94493V14.2235V12.544L4.1325 13.7317L6.85221 16.4516L9.5909 13.7131L10.7784 12.5256ZM17.0435 11.904V17.21L18.9924 15.2613L19.9762 16.2452L16.3733 19.8475L12.7255 16.1997L13.7093 15.2159L15.6522 17.1588V11.904H17.0435Z",
    fill: "black"
  }));
};
var MDXDeckIconLight = _ref3 => {
  var props = _extends$r({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.04348 10H30.6087C31.185 10 31.6522 10.4672 31.6522 11.0435V21.8261C31.6522 22.4024 31.185 22.8696 30.6087 22.8696H1.04348C0.467181 22.8696 0 22.4024 0 21.8261V11.0435C0 10.4672 0.467181 10 1.04348 10ZM28.8835 18.4688L26.0273 15.6126L28.9742 12.6658L27.9904 11.682L25.0435 14.6289L22.0965 11.682L21.1127 12.6658L24.0597 15.6126L21.2034 18.4688L22.1872 19.4526L25.0435 16.5964L27.8998 19.4526L28.8835 18.4688ZM10.7784 12.5256V14.205V19.9708H9.38713V15.8844L7.34406 17.9273L6.85214 18.4192L6.36026 17.9272L4.33623 15.9031V20.0123H2.94493V14.2235V12.544L4.1325 13.7317L6.85221 16.4516L9.5909 13.7131L10.7784 12.5256ZM17.0435 11.904V17.21L18.9924 15.2613L19.9762 16.2452L16.3733 19.8475L12.7255 16.1997L13.7093 15.2159L15.6522 17.1588V11.904H17.0435Z",
    fill: "white"
  }));
};

function _extends$s() {
  _extends$s = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$s.apply(this, arguments);
}
var MeteorIcon = _ref => {
  var props = _extends$s({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M0 0L27.4047 29.0282C27.4047 29.0282 28.3384 29.6867 29.0523 28.9185C29.7663 28.1503 29.2171 27.382 29.2171 27.382L0 0Z",
    fill: "#DF4F4F"
  }), React.createElement("path", {
    d: "M8.67725 2.74368L29.5466 25.2419C29.5466 25.2419 30.4802 25.9004 31.1942 25.1322C31.9081 24.364 31.3589 23.5957 31.3589 23.5957L8.67725 2.74368Z",
    fill: "#DF4F4F"
  }), React.createElement("path", {
    d: "M2.58121 8.61517L23.4506 31.1134C23.4506 31.1134 24.3842 31.7719 25.0981 31.0037C25.8121 30.2355 25.2629 29.4672 25.2629 29.4672L2.58121 8.61517Z",
    fill: "#DF4F4F"
  }), React.createElement("path", {
    d: "M16.0127 5.10327L30.5929 20.8215C30.5929 20.8215 31.2452 21.2815 31.744 20.7448C32.2428 20.2081 31.8591 19.6714 31.8591 19.6714L16.0127 5.10327Z",
    fill: "#DF4F4F"
  }), React.createElement("path", {
    d: "M4.58952 15.4195L19.1697 31.1377C19.1697 31.1377 19.822 31.5978 20.3208 31.0611C20.8195 30.5243 20.4359 29.9876 20.4359 29.9876L4.58952 15.4195Z",
    fill: "#DF4F4F"
  }), React.createElement("path", {
    d: "M23.5055 8.50543L30.1137 15.6511C30.1137 15.6511 30.4363 15.8666 30.6831 15.6152C30.9298 15.3637 30.74 15.1122 30.74 15.1122L23.5055 8.50543Z",
    fill: "#DF4F4F"
  }), React.createElement("path", {
    d: "M8.2379 22.6629L14.8461 29.8086C14.8461 29.8086 15.1688 30.0241 15.4155 29.7726C15.6623 29.5211 15.4725 29.2696 15.4725 29.2696L8.2379 22.6629Z",
    fill: "#DF4F4F"
  }));
};
var MeteorIconDark = _ref2 => {
  var props = _extends$s({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 2L25.9791 27.3997C25.9791 27.3997 26.7961 27.9759 27.4208 27.3037C28.0455 26.6315 27.5649 25.9593 27.5649 25.9593L2 2ZM9.59259 4.40072L27.8533 24.0867C27.8533 24.0867 28.6702 24.6629 29.2949 23.9907C29.9196 23.3185 29.4391 22.6463 29.4391 22.6463L9.59259 4.40072ZM22.5192 29.2243L4.25854 9.53828L24.105 27.7838C24.105 27.7838 24.5856 28.456 23.9609 29.1282C23.3362 29.8004 22.5192 29.2243 22.5192 29.2243ZM16.0111 6.46536L28.7688 20.2188C28.7688 20.2188 29.3395 20.6213 29.776 20.1517C30.2124 19.6821 29.8767 19.2124 29.8767 19.2124L16.0111 6.46536ZM18.7735 29.2455L6.01584 15.4921L19.8814 28.2392C19.8814 28.2392 20.2171 28.7088 19.7807 29.1784C19.3442 29.6481 18.7735 29.2455 18.7735 29.2455ZM22.5673 9.44225L28.3495 15.6947C28.3495 15.6947 28.6318 15.8833 28.8477 15.6633C29.0636 15.4432 28.8975 15.2231 28.8975 15.2231L22.5673 9.44225ZM14.9904 28.0825L9.20816 21.83L15.5384 27.6109C15.5384 27.6109 15.7045 27.831 15.4886 28.051C15.2727 28.2711 14.9904 28.0825 14.9904 28.0825Z",
    fill: "black"
  }));
};
var MeteorIconLight = _ref3 => {
  var props = _extends$s({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 2L25.9791 27.3997C25.9791 27.3997 26.7961 27.9759 27.4208 27.3037C28.0455 26.6315 27.5649 25.9593 27.5649 25.9593L2 2ZM9.59259 4.40072L27.8533 24.0867C27.8533 24.0867 28.6702 24.6629 29.2949 23.9907C29.9196 23.3185 29.4391 22.6463 29.4391 22.6463L9.59259 4.40072ZM22.5192 29.2243L4.25854 9.53828L24.105 27.7838C24.105 27.7838 24.5856 28.456 23.9609 29.1282C23.3362 29.8004 22.5192 29.2243 22.5192 29.2243ZM16.0111 6.46536L28.7688 20.2188C28.7688 20.2188 29.3395 20.6213 29.776 20.1517C30.2124 19.6821 29.8767 19.2124 29.8767 19.2124L16.0111 6.46536ZM18.7735 29.2455L6.01584 15.4921L19.8814 28.2392C19.8814 28.2392 20.2171 28.7088 19.7807 29.1784C19.3442 29.6481 18.7735 29.2455 18.7735 29.2455ZM22.5673 9.44225L28.3495 15.6947C28.3495 15.6947 28.6318 15.8833 28.8477 15.6633C29.0636 15.4432 28.8975 15.2231 28.8975 15.2231L22.5673 9.44225ZM14.9904 28.0825L9.20816 21.83L15.5384 27.6109C15.5384 27.6109 15.7045 27.831 15.4886 28.051C15.2727 28.2711 14.9904 28.0825 14.9904 28.0825Z",
    fill: "white"
  }));
};

function _extends$t() {
  _extends$t = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$t.apply(this, arguments);
}
var NaviIcon = _ref => {
  var props = _extends$t({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M30.4 14.47C29.84 14.47 29.35 14.76 29.05 15.19H27.66C27.56 13.92 27.27 12.69 26.77 11.52C26.18 10.13 25.34 8.88 24.27 7.81C23.75 7.29 23.19 6.83 22.59 6.42L23.29 5.21C23.83 5.18 24.32 4.87 24.59 4.3999C25.03 3.64 24.77 2.66 24 2.21C23.76 2.07 23.48 2 23.2 2C22.63 2 22.09 2.31 21.81 2.8C21.53 3.29 21.53 3.87 21.77 4.33L21.07 5.54C20.9 5.46 20.73 5.39 20.55 5.31C19.11 4.7 17.58 4.39 16.01 4.39C14.43 4.39 12.9 4.7 11.46 5.31C11.28 5.39 11.1 5.47 10.93 5.55L10.23 4.33C10.28 4.23 10.32 4.13 10.35 4.02C10.46 3.6 10.41 3.17 10.19 2.8C9.91 2.31 9.37 2 8.8 2C8.52 2 8.24 2.07 8 2.21C7.63 2.43 7.36 2.77 7.25 3.19C7.14 3.6 7.2 4.03 7.41 4.4C7.69 4.88 8.18 5.18 8.72 5.21L9.42 6.42C8.83 6.83 8.27 7.29 7.75 7.81C6.68 8.88 5.84 10.13 5.25 11.52C4.75 12.69 4.46 13.92 4.36 15.19H2.95C2.65 14.76 2.16 14.47 1.6 14.47C0.72 14.47 0 15.19 0 16.07C0 16.95 0.72 17.67 1.6 17.67C2.16 17.67 2.65 17.38 2.95 16.95H4.36C4.46 18.22 4.75 19.45 5.25 20.62C5.84 22.01 6.68 23.26 7.75 24.33C8.27 24.85 8.83 25.31 9.42 25.72L8.72 26.93C8.18 26.96 7.69 27.26 7.41 27.74C6.97 28.5 7.23 29.48 8 29.93C8.24 30.07 8.52 30.14 8.8 30.14C9.37 30.14 9.91 29.83 10.19 29.34C10.47 28.85 10.47 28.2701 10.23 27.81L10.93 26.59C11.1 26.67 11.28 26.75 11.46 26.8301C12.9 27.4401 14.43 27.7501 16.01 27.7501C17.58 27.7501 19.11 27.4401 20.55 26.8301C20.73 26.7501 20.9 26.6801 21.07 26.6001L21.77 27.8101C21.53 28.2701 21.53 28.8501 21.81 29.3401C22.09 29.8302 22.63 30.1401 23.2 30.1401C23.48 30.1401 23.76 30.0701 24 29.9301C24.37 29.7101 24.64 29.3701 24.75 28.9501C24.86 28.5401 24.8 28.1101 24.59 27.7401C24.32 27.2701 23.83 26.9601 23.29 26.9301L22.59 25.7201C23.19 25.3101 23.75 24.8501 24.27 24.3301C25.34 23.2601 26.18 22.0101 26.77 20.6201C27.27 19.4501 27.56 18.2201 27.66 16.9501H29.05C29.35 17.3801 29.84 17.6701 30.4 17.6701C31.28 17.6701 32 16.9501 32 16.0701C32 15.1901 31.28 14.47 30.4 14.47ZM12.14 6.91C13.36 6.39 14.67 6.13 16.01 6.13C17.35 6.13 18.65 6.39 19.88 6.91C19.99 6.96 20.09 7 20.2 7.05L16.65 13.2C16.45 13.15 16.23 13.13 16.01 13.13C15.79 13.13 15.57 13.16 15.36 13.21L11.81 7.06C11.92 7.01 12.03 6.96 12.14 6.91ZM6.85 12.2C7.1 11.61 7.41 11.05 7.77 10.51C8.12 9.99 8.53 9.49 8.98 9.04C9.39 8.63 9.83 8.26 10.3 7.94L13.84 14.08C13.56 14.3999 13.34 14.77 13.2 15.19H6.11C6.2 14.16 6.44 13.16 6.85 12.2ZM10.3 24.2C9.83 23.88 9.39 23.51 8.98 23.1C8.53 22.65 8.12 22.15 7.77 21.63C7.41 21.09 7.1 20.53 6.85 19.94C6.44 18.98 6.2 17.98 6.11 16.95H13.2C13.34 17.37 13.56 17.74 13.84 18.06L10.3 24.2ZM19.88 25.23C18.65 25.75 17.35 26.01 16.01 26.01C14.67 26.01 13.36 25.75 12.14 25.23C12.03 25.18 11.92 25.13 11.81 25.08L15.36 18.93C15.57 18.98 15.79 19.01 16.01 19.01C16.23 19.01 16.44 18.99 16.64 18.94L20.2 25.09C20.09 25.14 19.99 25.18 19.88 25.23ZM25.17 19.94C24.92 20.53 24.61 21.09 24.25 21.63C23.89 22.15 23.49 22.65 23.04 23.1C22.63 23.51 22.19 23.88 21.71 24.21L18.16 18.07C18.46 17.75 18.68 17.37 18.82 16.95H25.91C25.82 17.98 25.57 18.98 25.17 19.94ZM18.82 15.19C18.68 14.77 18.46 14.39 18.16 14.07L21.71 7.93C22.19 8.26 22.63 8.63 23.04 9.04C23.49 9.49 23.89 9.99 24.25 10.51C24.61 11.05 24.92 11.61 25.17 12.2C25.57 13.16 25.82 14.16 25.91 15.19H18.82V15.19Z",
    fill: "#1EE79E"
  }));
};
var NaviIconDark = _ref2 => {
  var props = _extends$t({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M30.4 14.47C29.84 14.47 29.35 14.76 29.05 15.19H27.66C27.56 13.92 27.27 12.69 26.77 11.52C26.18 10.13 25.34 8.88 24.27 7.81C23.75 7.29 23.19 6.83 22.59 6.42L23.29 5.21C23.83 5.18 24.32 4.87 24.59 4.3999C25.03 3.64 24.77 2.66 24 2.21C23.76 2.07 23.48 2 23.2 2C22.63 2 22.09 2.31 21.81 2.8C21.53 3.29 21.53 3.87 21.77 4.33L21.07 5.54C20.9 5.46 20.73 5.39 20.55 5.31C19.11 4.7 17.58 4.39 16.01 4.39C14.43 4.39 12.9 4.7 11.46 5.31C11.28 5.39 11.1 5.47 10.93 5.55L10.23 4.33C10.28 4.23 10.32 4.13 10.35 4.02C10.46 3.6 10.41 3.17 10.19 2.8C9.91 2.31 9.37 2 8.8 2C8.52 2 8.24 2.07 8 2.21C7.63 2.43 7.36 2.77 7.25 3.19C7.14 3.6 7.2 4.03 7.41 4.4C7.69 4.88 8.18 5.18 8.72 5.21L9.42 6.42C8.83 6.83 8.27 7.29 7.75 7.81C6.68 8.88 5.84 10.13 5.25 11.52C4.75 12.69 4.46 13.92 4.36 15.19H2.95C2.65 14.76 2.16 14.47 1.6 14.47C0.72 14.47 0 15.19 0 16.07C0 16.95 0.72 17.67 1.6 17.67C2.16 17.67 2.65 17.38 2.95 16.95H4.36C4.46 18.22 4.75 19.45 5.25 20.62C5.84 22.01 6.68 23.26 7.75 24.33C8.27 24.85 8.83 25.31 9.42 25.72L8.72 26.93C8.18 26.96 7.69 27.26 7.41 27.74C6.97 28.5 7.23 29.48 8 29.93C8.24 30.07 8.52 30.14 8.8 30.14C9.37 30.14 9.91 29.83 10.19 29.34C10.47 28.85 10.47 28.2701 10.23 27.81L10.93 26.59C11.1 26.67 11.28 26.75 11.46 26.8301C12.9 27.4401 14.43 27.7501 16.01 27.7501C17.58 27.7501 19.11 27.4401 20.55 26.8301C20.73 26.7501 20.9 26.6801 21.07 26.6001L21.77 27.8101C21.53 28.2701 21.53 28.8501 21.81 29.3401C22.09 29.8302 22.63 30.1401 23.2 30.1401C23.48 30.1401 23.76 30.0701 24 29.9301C24.37 29.7101 24.64 29.3701 24.75 28.9501C24.86 28.5401 24.8 28.1101 24.59 27.7401C24.32 27.2701 23.83 26.9601 23.29 26.9301L22.59 25.7201C23.19 25.3101 23.75 24.8501 24.27 24.3301C25.34 23.2601 26.18 22.0101 26.77 20.6201C27.27 19.4501 27.56 18.2201 27.66 16.9501H29.05C29.35 17.3801 29.84 17.6701 30.4 17.6701C31.28 17.6701 32 16.9501 32 16.0701C32 15.1901 31.28 14.47 30.4 14.47ZM12.14 6.91C13.36 6.39 14.67 6.13 16.01 6.13C17.35 6.13 18.65 6.39 19.88 6.91C19.99 6.96 20.09 7 20.2 7.05L16.65 13.2C16.45 13.15 16.23 13.13 16.01 13.13C15.79 13.13 15.57 13.16 15.36 13.21L11.81 7.06C11.92 7.01 12.03 6.96 12.14 6.91ZM6.85 12.2C7.1 11.61 7.41 11.05 7.77 10.51C8.12 9.99 8.53 9.49 8.98 9.04C9.39 8.63 9.83 8.26 10.3 7.94L13.84 14.08C13.56 14.3999 13.34 14.77 13.2 15.19H6.11C6.2 14.16 6.44 13.16 6.85 12.2ZM10.3 24.2C9.83 23.88 9.39 23.51 8.98 23.1C8.53 22.65 8.12 22.15 7.77 21.63C7.41 21.09 7.1 20.53 6.85 19.94C6.44 18.98 6.2 17.98 6.11 16.95H13.2C13.34 17.37 13.56 17.74 13.84 18.06L10.3 24.2ZM19.88 25.23C18.65 25.75 17.35 26.01 16.01 26.01C14.67 26.01 13.36 25.75 12.14 25.23C12.03 25.18 11.92 25.13 11.81 25.08L15.36 18.93C15.57 18.98 15.79 19.01 16.01 19.01C16.23 19.01 16.44 18.99 16.64 18.94L20.2 25.09C20.09 25.14 19.99 25.18 19.88 25.23ZM25.17 19.94C24.92 20.53 24.61 21.09 24.25 21.63C23.89 22.15 23.49 22.65 23.04 23.1C22.63 23.51 22.19 23.88 21.71 24.21L18.16 18.07C18.46 17.75 18.68 17.37 18.82 16.95H25.91C25.82 17.98 25.57 18.98 25.17 19.94ZM18.82 15.19C18.68 14.77 18.46 14.39 18.16 14.07L21.71 7.93C22.19 8.26 22.63 8.63 23.04 9.04C23.49 9.49 23.89 9.99 24.25 10.51C24.61 11.05 24.92 11.61 25.17 12.2C25.57 13.16 25.82 14.16 25.91 15.19H18.82V15.19Z",
    fill: "black"
  }));
};
var NaviIconLight = _ref3 => {
  var props = _extends$t({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M30.4 14.47C29.84 14.47 29.35 14.76 29.05 15.19H27.66C27.56 13.92 27.27 12.69 26.77 11.52C26.18 10.13 25.34 8.88 24.27 7.81C23.75 7.29 23.19 6.83 22.59 6.42L23.29 5.21C23.83 5.18 24.32 4.87 24.59 4.3999C25.03 3.64 24.77 2.66 24 2.21C23.76 2.07 23.48 2 23.2 2C22.63 2 22.09 2.31 21.81 2.8C21.53 3.29 21.53 3.87 21.77 4.33L21.07 5.54C20.9 5.46 20.73 5.39 20.55 5.31C19.11 4.7 17.58 4.39 16.01 4.39C14.43 4.39 12.9 4.7 11.46 5.31C11.28 5.39 11.1 5.47 10.93 5.55L10.23 4.33C10.28 4.23 10.32 4.13 10.35 4.02C10.46 3.6 10.41 3.17 10.19 2.8C9.91 2.31 9.37 2 8.8 2C8.52 2 8.24 2.07 8 2.21C7.63 2.43 7.36 2.77 7.25 3.19C7.14 3.6 7.2 4.03 7.41 4.4C7.69 4.88 8.18 5.18 8.72 5.21L9.42 6.42C8.83 6.83 8.27 7.29 7.75 7.81C6.68 8.88 5.84 10.13 5.25 11.52C4.75 12.69 4.46 13.92 4.36 15.19H2.95C2.65 14.76 2.16 14.47 1.6 14.47C0.72 14.47 0 15.19 0 16.07C0 16.95 0.72 17.67 1.6 17.67C2.16 17.67 2.65 17.38 2.95 16.95H4.36C4.46 18.22 4.75 19.45 5.25 20.62C5.84 22.01 6.68 23.26 7.75 24.33C8.27 24.85 8.83 25.31 9.42 25.72L8.72 26.93C8.18 26.96 7.69 27.26 7.41 27.74C6.97 28.5 7.23 29.48 8 29.93C8.24 30.07 8.52 30.14 8.8 30.14C9.37 30.14 9.91 29.83 10.19 29.34C10.47 28.85 10.47 28.2701 10.23 27.81L10.93 26.59C11.1 26.67 11.28 26.75 11.46 26.8301C12.9 27.4401 14.43 27.7501 16.01 27.7501C17.58 27.7501 19.11 27.4401 20.55 26.8301C20.73 26.7501 20.9 26.6801 21.07 26.6001L21.77 27.8101C21.53 28.2701 21.53 28.8501 21.81 29.3401C22.09 29.8302 22.63 30.1401 23.2 30.1401C23.48 30.1401 23.76 30.0701 24 29.9301C24.37 29.7101 24.64 29.3701 24.75 28.9501C24.86 28.5401 24.8 28.1101 24.59 27.7401C24.32 27.2701 23.83 26.9601 23.29 26.9301L22.59 25.7201C23.19 25.3101 23.75 24.8501 24.27 24.3301C25.34 23.2601 26.18 22.0101 26.77 20.6201C27.27 19.4501 27.56 18.2201 27.66 16.9501H29.05C29.35 17.3801 29.84 17.6701 30.4 17.6701C31.28 17.6701 32 16.9501 32 16.0701C32 15.1901 31.28 14.47 30.4 14.47ZM12.14 6.91C13.36 6.39 14.67 6.13 16.01 6.13C17.35 6.13 18.65 6.39 19.88 6.91C19.99 6.96 20.09 7 20.2 7.05L16.65 13.2C16.45 13.15 16.23 13.13 16.01 13.13C15.79 13.13 15.57 13.16 15.36 13.21L11.81 7.06C11.92 7.01 12.03 6.96 12.14 6.91ZM6.85 12.2C7.1 11.61 7.41 11.05 7.77 10.51C8.12 9.99 8.53 9.49 8.98 9.04C9.39 8.63 9.83 8.26 10.3 7.94L13.84 14.08C13.56 14.3999 13.34 14.77 13.2 15.19H6.11C6.2 14.16 6.44 13.16 6.85 12.2ZM10.3 24.2C9.83 23.88 9.39 23.51 8.98 23.1C8.53 22.65 8.12 22.15 7.77 21.63C7.41 21.09 7.1 20.53 6.85 19.94C6.44 18.98 6.2 17.98 6.11 16.95H13.2C13.34 17.37 13.56 17.74 13.84 18.06L10.3 24.2ZM19.88 25.23C18.65 25.75 17.35 26.01 16.01 26.01C14.67 26.01 13.36 25.75 12.14 25.23C12.03 25.18 11.92 25.13 11.81 25.08L15.36 18.93C15.57 18.98 15.79 19.01 16.01 19.01C16.23 19.01 16.44 18.99 16.64 18.94L20.2 25.09C20.09 25.14 19.99 25.18 19.88 25.23ZM25.17 19.94C24.92 20.53 24.61 21.09 24.25 21.63C23.89 22.15 23.49 22.65 23.04 23.1C22.63 23.51 22.19 23.88 21.71 24.21L18.16 18.07C18.46 17.75 18.68 17.37 18.82 16.95H25.91C25.82 17.98 25.57 18.98 25.17 19.94ZM18.82 15.19C18.68 14.77 18.46 14.39 18.16 14.07L21.71 7.93C22.19 8.26 22.63 8.63 23.04 9.04C23.49 9.49 23.89 9.99 24.25 10.51C24.61 11.05 24.92 11.61 25.17 12.2C25.57 13.16 25.82 14.16 25.91 15.19H18.82V15.19Z",
    fill: "white"
  }));
};

function _extends$u() {
  _extends$u = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$u.apply(this, arguments);
}
var NestIcon = _ref => {
  var props = _extends$u({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M18.9258 0.336975C18.7009 0.336975 18.492 0.385181 18.2992 0.449453C18.7089 0.722616 18.9339 1.08416 19.0464 1.4939C19.0544 1.55014 19.0705 1.59031 19.0785 1.64655C19.0865 1.69476 19.0946 1.74296 19.0946 1.79117C19.1267 2.49817 18.9098 2.58655 18.7571 3.00433C18.5241 3.54262 18.5884 4.12108 18.8696 4.58707C18.8937 4.64331 18.9258 4.70758 18.966 4.76382C18.6607 2.73117 20.3559 2.42587 20.6693 1.79117C20.6934 1.23681 20.2354 0.867232 19.8739 0.610137C19.5284 0.401249 19.2151 0.336975 18.9258 0.336975ZM21.4807 0.794925C21.4486 0.979711 21.4727 0.931506 21.4647 1.02792C21.4566 1.09219 21.4566 1.17253 21.4486 1.23681C21.4325 1.30108 21.4165 1.36535 21.3924 1.42963C21.3763 1.4939 21.3522 1.55817 21.3281 1.62245C21.2959 1.68672 21.2719 1.74296 21.2397 1.80723C21.2156 1.83938 21.1995 1.87151 21.1754 1.90364C21.1594 1.92775 21.1433 1.95185 21.1272 1.97595C21.0871 2.03219 21.0469 2.08843 21.0067 2.13664C20.9585 2.18484 20.9183 2.24108 20.8621 2.28125C20.8621 2.2893 20.8621 2.2893 20.8621 2.2893C20.8139 2.32947 20.7657 2.37767 20.7095 2.41784C20.5407 2.54639 20.3479 2.6428 20.1712 2.76331C20.1149 2.80348 20.0587 2.83562 20.0105 2.88383C19.9542 2.924 19.906 2.96417 19.8578 3.01237C19.8016 3.06058 19.7614 3.10879 19.7132 3.16503C19.673 3.21323 19.6248 3.26947 19.5927 3.32571C19.5525 3.38195 19.5124 3.43819 19.4802 3.49443C19.4481 3.5587 19.424 3.61494 19.3918 3.67921C19.3677 3.74348 19.3436 3.79973 19.3276 3.864C19.3035 3.93631 19.2874 4.00058 19.2713 4.06486C19.2633 4.09701 19.2633 4.13716 19.2553 4.1693C19.2472 4.20145 19.2472 4.23357 19.2392 4.26571C19.2392 4.32998 19.2312 4.40229 19.2312 4.46656C19.2312 4.51477 19.2312 4.56298 19.2392 4.61118C19.2392 4.67545 19.2473 4.73973 19.2633 4.81204C19.2714 4.87631 19.2874 4.94058 19.3035 5.00486C19.3276 5.06913 19.3437 5.1334 19.3678 5.19768C19.3838 5.23785 19.4079 5.27802 19.424 5.31015L17.5761 4.59511C17.2628 4.50673 16.9575 4.42639 16.6442 4.35409C16.4755 4.31392 16.3067 4.27374 16.138 4.23357C15.656 4.13716 15.1659 4.06486 14.6758 4.01665C14.6597 4.01665 14.6517 4.00861 14.6356 4.00861C14.1536 3.9604 13.6796 3.9363 13.1975 3.9363C12.844 3.9363 12.4905 3.95235 12.145 3.97647C11.6549 4.00862 11.1648 4.07288 10.6748 4.15322C10.5543 4.16928 10.4337 4.19339 10.3132 4.2175C10.0642 4.2657 9.82314 4.32194 9.59015 4.37818C9.46963 4.41033 9.34912 4.44245 9.22861 4.47459C9.1081 4.52279 8.99562 4.57904 8.88314 4.62724C8.79476 4.66741 8.70639 4.70758 8.61801 4.74775C8.60195 4.7558 8.58586 4.7558 8.57784 4.76381C8.4975 4.80398 8.42519 4.83611 8.35288 4.87629C8.32878 4.88433 8.31271 4.89234 8.29664 4.90039C8.20827 4.94056 8.11989 4.98877 8.04758 5.02894C7.99134 5.05304 7.9351 5.08518 7.8869 5.10928C7.8628 5.12534 7.83066 5.14143 7.81459 5.14945C7.74228 5.18962 7.66997 5.22979 7.6057 5.26996C7.53339 5.31013 7.46912 5.3503 7.41288 5.39047C7.35664 5.43065 7.3004 5.46278 7.25219 5.50295C7.24415 5.511 7.23614 5.511 7.22809 5.51901C7.17989 5.55116 7.12365 5.59132 7.07544 5.63149C7.07544 5.63149 7.0674 5.63954 7.05939 5.64755C7.01922 5.6797 6.97904 5.71182 6.93887 5.74395C6.92282 5.752 6.90672 5.76806 6.89067 5.7761C6.8505 5.80825 6.81033 5.84841 6.77016 5.88055C6.76211 5.89661 6.74606 5.90465 6.73801 5.9127C6.6898 5.96091 6.6416 6.00107 6.59339 6.04928C6.58534 6.04928 6.58534 6.05733 6.57734 6.06534C6.52913 6.10551 6.48092 6.15371 6.43272 6.20192C6.42467 6.20996 6.42467 6.21797 6.41666 6.21797C6.37649 6.25814 6.33632 6.29832 6.29615 6.34652C6.28009 6.36258 6.25598 6.37867 6.23991 6.39473C6.19974 6.44293 6.15154 6.49114 6.10333 6.53934C6.09528 6.5554 6.07923 6.56345 6.07118 6.57951C6.00691 6.64379 5.95067 6.70806 5.88639 6.77233C5.87835 6.78038 5.87034 6.78839 5.86229 6.79644C5.73374 6.93302 5.59716 7.0696 5.45255 7.19011C5.30793 7.31866 5.15528 7.43917 5.00263 7.54362C4.84195 7.6561 4.6893 7.7525 4.52058 7.84891C4.3599 7.93729 4.19118 8.01763 4.01443 8.08994C3.84571 8.16225 3.66895 8.22653 3.4922 8.28276C3.15476 8.35507 2.80929 8.49165 2.51203 8.51575C2.44776 8.51575 2.37545 8.53181 2.31118 8.53985C2.23887 8.55591 2.17459 8.57201 2.11032 8.58806C2.04605 8.61216 1.98177 8.63627 1.9175 8.66037C1.85323 8.68447 1.78895 8.71661 1.72468 8.74875C1.66844 8.78891 1.60417 8.82105 1.54793 8.86122C1.49169 8.90139 1.43545 8.9496 1.38724 8.9978C1.331 9.03798 1.27476 9.09422 1.22656 9.14242C1.17835 9.19866 1.13015 9.24687 1.08998 9.3031C1.04981 9.36738 1.0016 9.42362 0.969463 9.48789C0.929293 9.54413 0.889123 9.60841 0.856984 9.67268C0.824835 9.74499 0.792712 9.80926 0.768609 9.88157C0.744506 9.94584 0.720403 10.0181 0.6963 10.0905C0.680245 10.1547 0.664151 10.219 0.656131 10.2833C0.656131 10.2913 0.648084 10.2993 0.648084 10.3074C0.632028 10.3797 0.632028 10.4761 0.623981 10.5243C0.615935 10.5805 0.607925 10.6288 0.607925 10.685C0.607925 10.7171 0.607925 10.7573 0.615972 10.7894C0.624018 10.8457 0.632028 10.8939 0.648122 10.9421C0.664177 10.9903 0.680271 11.0385 0.704359 11.0867C0.704359 11.0947 0.704359 11.0947 0.704359 11.0947C0.728462 11.143 0.7606 11.1912 0.792734 11.2394C0.824884 11.2876 0.857011 11.3358 0.897181 11.384C0.937351 11.4242 0.985557 11.4724 1.03376 11.5125C1.08197 11.5607 1.13017 11.6009 1.18641 11.6411C1.37923 11.8098 1.42744 11.866 1.6765 11.9946C1.71667 12.0187 1.75684 12.0348 1.80505 12.0589C1.81309 12.0589 1.8211 12.0669 1.82915 12.0669C1.82915 12.083 1.82915 12.091 1.8372 12.1071C1.84524 12.1713 1.8613 12.2356 1.87737 12.2999C1.89342 12.3722 1.91754 12.4365 1.94164 12.4927C1.96575 12.5409 1.98181 12.5891 2.00592 12.6373C2.01396 12.6534 2.02197 12.6695 2.03002 12.6775C2.06217 12.7418 2.09429 12.798 2.12643 12.8543C2.1666 12.9105 2.20677 12.9667 2.24694 13.023C2.28711 13.0712 2.33532 13.1274 2.38352 13.1756C2.43173 13.2238 2.47993 13.264 2.53617 13.3122C2.53617 13.3122 2.54422 13.3202 2.55223 13.3202C2.60044 13.3604 2.64864 13.4006 2.69685 13.4327C2.75308 13.4729 2.80932 13.505 2.8736 13.5372C2.92984 13.5693 2.99411 13.6014 3.05838 13.6255C3.10659 13.6497 3.16283 13.6657 3.21907 13.6818C3.22712 13.6898 3.23512 13.6898 3.25122 13.6978C3.28337 13.7059 3.32352 13.7139 3.35566 13.7219C3.33156 14.1558 3.32351 14.5655 3.38781 14.7102C3.46011 14.8708 3.81362 14.3808 4.16713 13.8184C4.11892 14.3727 4.08678 15.0235 4.16713 15.2163C4.2555 15.4172 4.73755 14.7905 5.15533 14.0996C10.8516 12.7819 16.0497 16.7187 16.596 22.2784C16.4916 21.4107 15.423 20.9286 14.933 21.0491C14.6919 21.6437 14.2822 22.4069 13.6234 22.8809C13.6796 22.3507 13.6555 21.8044 13.543 21.2741C13.3663 22.0132 13.0208 22.7042 12.5468 23.2987C11.7835 23.3549 11.0203 22.9854 10.6186 22.431C10.5864 22.4069 10.5784 22.3587 10.5543 22.3266C10.5302 22.2703 10.5061 22.2141 10.49 22.1579C10.4659 22.1016 10.4499 22.0454 10.4418 21.9891C10.4338 21.9329 10.4338 21.8767 10.4338 21.8124C10.4338 21.7722 10.4338 21.732 10.4338 21.6919C10.4418 21.6356 10.4579 21.5794 10.474 21.5232C10.49 21.4669 10.5061 21.4107 10.5302 21.3544C10.5623 21.2982 10.5864 21.242 10.6266 21.1857C10.7632 20.8001 10.7632 20.4867 10.5141 20.302C10.4659 20.2698 10.4177 20.2457 10.3615 20.2216C10.3293 20.2136 10.2892 20.1975 10.257 20.1895C10.2329 20.1814 10.2169 20.1734 10.1928 20.1654C10.1365 20.1493 10.0803 20.1332 10.024 20.1252C9.9678 20.1091 9.91156 20.1011 9.85532 20.1011C9.79909 20.093 9.73481 20.085 9.67857 20.085C9.6384 20.085 9.59823 20.0931 9.55806 20.0931C9.49379 20.0931 9.43754 20.1011 9.38131 20.1172C9.32507 20.1252 9.26883 20.1332 9.21259 20.1493C9.15635 20.1654 9.10011 20.1815 9.04387 20.2056C8.98763 20.2297 8.93943 20.2538 8.88318 20.2779C8.83498 20.302 8.78678 20.3341 8.73054 20.3582C6.85857 21.5794 7.97532 24.4396 9.25276 25.2671C8.77071 25.3555 8.28062 25.4599 8.14404 25.5644C8.13599 25.5724 8.12799 25.5804 8.12799 25.5804C8.47346 25.7893 8.83499 25.9661 9.2126 26.1187C9.72679 26.2874 10.2731 26.4401 10.5141 26.5044V26.5124C11.181 26.649 11.8559 26.6972 12.5388 26.657C16.0979 26.408 19.0143 23.7004 19.5446 20.1333C19.5606 20.2056 19.5767 20.2698 19.5928 20.3422C19.6169 20.4868 19.649 20.6394 19.6651 20.7921C19.6651 20.7921 19.6651 20.7921 19.6651 20.8001C19.6812 20.8724 19.6892 20.9447 19.6972 21.009C19.6972 21.0251 19.6972 21.0331 19.6972 21.0412C19.7053 21.1135 19.7133 21.1858 19.7133 21.25C19.7213 21.3384 19.7294 21.4268 19.7294 21.5152C19.7294 21.5553 19.7294 21.5955 19.7294 21.6437C19.7294 21.6839 19.7374 21.7321 19.7374 21.7723C19.7374 21.8205 19.7294 21.8687 19.7294 21.9169C19.7294 21.9571 19.7294 21.9972 19.7294 22.0294C19.7294 22.0856 19.7213 22.1338 19.7213 22.19C19.7213 22.2222 19.7213 22.2543 19.7133 22.2945C19.7133 22.3507 19.7052 22.407 19.7052 22.4712C19.6972 22.4953 19.6972 22.5194 19.6972 22.5435C19.6891 22.6078 19.6811 22.6641 19.6731 22.7283C19.6731 22.7524 19.6731 22.7765 19.665 22.8006C19.657 22.881 19.6409 22.9533 19.6329 23.0336V23.0417V23.0497C19.6168 23.122 19.6007 23.2024 19.5847 23.2747C19.5847 23.2827 19.5847 23.2907 19.5847 23.2988C19.5686 23.3711 19.5525 23.4434 19.5365 23.5157C19.5365 23.5238 19.5284 23.5398 19.5284 23.5479C19.5124 23.6202 19.4963 23.6925 19.4722 23.7648C19.4722 23.7728 19.4722 23.7808 19.4722 23.7889C19.4481 23.8692 19.424 23.9415 19.4079 24.0138C19.3999 24.0219 19.3999 24.0299 19.3999 24.0299C19.3757 24.1102 19.3517 24.1906 19.3275 24.2709C19.2954 24.3513 19.2713 24.4236 19.2392 24.5039C19.207 24.5843 19.1829 24.6646 19.1508 24.7369C19.1186 24.8173 19.0865 24.8896 19.0544 24.9699H19.0463C19.0142 25.0422 18.9821 25.1226 18.9419 25.1949C18.9338 25.219 18.9258 25.235 18.9178 25.2511C18.9097 25.2591 18.9097 25.2672 18.9017 25.2752C18.3795 26.3277 17.6082 27.2516 16.6441 27.9747C16.5799 28.0149 16.5156 28.0631 16.4513 28.1113C16.4352 28.1273 16.4111 28.1354 16.3951 28.1514C16.3388 28.1916 16.2826 28.2318 16.2183 28.272L16.2424 28.3202H16.2505C16.3629 28.3041 16.4754 28.288 16.5879 28.272H16.5959C16.8048 28.2398 17.0137 28.1996 17.2226 28.1595C17.2788 28.1514 17.3431 28.1354 17.3994 28.1193C17.4395 28.1113 17.4717 28.1032 17.5118 28.0952C17.5681 28.0872 17.6243 28.0711 17.6806 28.0631C17.7288 28.047 17.777 28.0389 17.8252 28.0229C18.6286 27.8301 19.4079 27.5649 20.1551 27.2516C18.8777 28.995 17.1664 30.401 15.1659 31.3249C16.0898 31.2607 17.0137 31.108 17.9055 30.8509C21.1433 29.8948 23.8669 27.7176 25.4978 24.7851C25.1684 26.641 24.4293 28.4085 23.3366 29.9511C24.116 29.4369 24.831 28.8424 25.4818 28.1675C27.2814 26.2875 28.4625 23.9013 28.8642 21.3384C29.1373 22.6078 29.2177 23.9174 29.0972 25.2109C34.8979 17.1205 29.5792 8.73277 27.3537 6.52336C27.3457 6.50731 27.3377 6.49926 27.3377 6.48319C27.3296 6.49124 27.3296 6.49124 27.3296 6.49925C27.3296 6.49121 27.3296 6.49121 27.3216 6.48319C27.3216 6.5796 27.3135 6.67601 27.3055 6.77242C27.2814 6.95721 27.2573 7.13396 27.2252 7.31072C27.185 7.48747 27.1368 7.66422 27.0886 7.84097C27.0324 8.00969 26.9681 8.18644 26.8958 8.35516C26.8235 8.51584 26.7431 8.68456 26.6548 8.84525C26.5664 8.9979 26.47 9.15858 26.3655 9.30319C26.2611 9.45585 26.1486 9.60046 26.0361 9.73704C25.9156 9.88166 25.7871 10.0102 25.6585 10.1388C25.5782 10.2111 25.5059 10.2753 25.4255 10.3396C25.3613 10.3958 25.305 10.4441 25.2407 10.5003C25.0961 10.6128 24.9515 10.7172 24.7908 10.8136C24.6382 10.91 24.4775 11.0064 24.3168 11.0868C24.1481 11.1671 23.9794 11.2394 23.8107 11.3117C23.6419 11.376 23.4652 11.4323 23.2884 11.4805C23.1117 11.5287 22.9269 11.5688 22.7501 11.601C22.5654 11.6331 22.3806 11.6492 22.2038 11.6652C22.0753 11.6733 21.9467 11.6813 21.8182 11.6813C21.6334 11.6813 21.4486 11.6653 21.2718 11.6492C21.0871 11.6331 20.9023 11.609 20.7255 11.5688C20.5407 11.5367 20.364 11.4885 20.1872 11.4322H20.1792C20.3559 11.4162 20.5327 11.4001 20.7094 11.368C20.8942 11.3358 21.071 11.2957 21.2477 11.2474C21.4245 11.1992 21.6012 11.143 21.77 11.0787C21.9467 11.0145 22.1154 10.9341 22.2761 10.8538C22.4448 10.7734 22.5975 10.6851 22.7582 10.5886C22.9108 10.4842 23.0635 10.3798 23.2081 10.2673C23.3527 10.1548 23.4893 10.0343 23.6178 9.90573C23.7544 9.78522 23.8749 9.64864 23.9954 9.51206C24.1159 9.36744 24.2284 9.22283 24.3329 9.07821C24.3489 9.05411 24.365 9.02197 24.3811 8.99787C24.4614 8.86932 24.5418 8.74078 24.6141 8.61223C24.7024 8.45154 24.7828 8.29086 24.8551 8.12214C24.9274 7.95342 24.9917 7.7847 25.0479 7.60795C25.1041 7.43923 25.1443 7.26248 25.1845 7.08573C25.2166 6.90094 25.2488 6.72419 25.2648 6.54744C25.2809 6.36265 25.297 6.17787 25.297 6.00111C25.297 5.87257 25.2889 5.74402 25.2809 5.61547C25.2649 5.43069 25.2408 5.25393 25.2167 5.07718C25.1845 4.89239 25.1443 4.71564 25.0961 4.53889C25.0399 4.37017 24.9837 4.19342 24.9194 4.0247C24.8551 3.85598 24.7748 3.68726 24.6944 3.52658C24.6061 3.3659 24.5177 3.20521 24.4213 3.05256C24.3168 2.89992 24.2124 2.7553 24.0999 2.61068C23.9794 2.4741 23.8589 2.33752 23.7303 2.20094C23.6661 2.13667 23.5937 2.06436 23.5214 2.00009C23.1599 1.71889 22.7823 1.45376 22.4047 1.21273C22.3484 1.18058 22.3002 1.15649 22.244 1.13239C21.9789 0.963673 21.7298 0.875294 21.4807 0.794954L21.4807 0.794925Z",
    fill: "#E0234E"
  }));
};
var NestIconDark = _ref2 => {
  var props = _extends$u({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M18.9258 0.336975C18.7009 0.336975 18.492 0.385181 18.2992 0.449453C18.7089 0.722616 18.9339 1.08416 19.0464 1.4939C19.0544 1.55014 19.0705 1.59031 19.0785 1.64655C19.0865 1.69476 19.0946 1.74296 19.0946 1.79117C19.1267 2.49817 18.9098 2.58655 18.7571 3.00433C18.5241 3.54262 18.5884 4.12108 18.8696 4.58707C18.8937 4.64331 18.9258 4.70758 18.966 4.76382C18.6607 2.73117 20.3559 2.42587 20.6693 1.79117C20.6934 1.23681 20.2354 0.867232 19.8739 0.610137C19.5284 0.401249 19.2151 0.336975 18.9258 0.336975ZM21.4807 0.794925C21.4486 0.979711 21.4727 0.931506 21.4647 1.02792C21.4566 1.09219 21.4566 1.17253 21.4486 1.23681C21.4325 1.30108 21.4165 1.36535 21.3924 1.42963C21.3763 1.4939 21.3522 1.55817 21.3281 1.62245C21.2959 1.68672 21.2719 1.74296 21.2397 1.80723C21.2156 1.83938 21.1995 1.87151 21.1754 1.90364C21.1594 1.92775 21.1433 1.95185 21.1272 1.97595C21.0871 2.03219 21.0469 2.08843 21.0067 2.13664C20.9585 2.18484 20.9183 2.24108 20.8621 2.28125C20.8621 2.2893 20.8621 2.2893 20.8621 2.2893C20.8139 2.32947 20.7657 2.37767 20.7095 2.41784C20.5407 2.54639 20.3479 2.6428 20.1712 2.76331C20.1149 2.80348 20.0587 2.83562 20.0105 2.88383C19.9542 2.924 19.906 2.96417 19.8578 3.01237C19.8016 3.06058 19.7614 3.10879 19.7132 3.16503C19.673 3.21323 19.6248 3.26947 19.5927 3.32571C19.5525 3.38195 19.5124 3.43819 19.4802 3.49443C19.4481 3.5587 19.424 3.61494 19.3918 3.67921C19.3677 3.74348 19.3436 3.79973 19.3276 3.864C19.3035 3.93631 19.2874 4.00058 19.2713 4.06486C19.2633 4.09701 19.2633 4.13716 19.2553 4.1693C19.2472 4.20145 19.2472 4.23357 19.2392 4.26571C19.2392 4.32998 19.2312 4.40229 19.2312 4.46656C19.2312 4.51477 19.2312 4.56298 19.2392 4.61118C19.2392 4.67545 19.2473 4.73973 19.2633 4.81204C19.2714 4.87631 19.2874 4.94058 19.3035 5.00486C19.3276 5.06913 19.3437 5.1334 19.3678 5.19768C19.3838 5.23785 19.4079 5.27802 19.424 5.31015L17.5761 4.59511C17.2628 4.50673 16.9575 4.42639 16.6442 4.35409C16.4755 4.31392 16.3067 4.27374 16.138 4.23357C15.656 4.13716 15.1659 4.06486 14.6758 4.01665C14.6597 4.01665 14.6517 4.00861 14.6356 4.00861C14.1536 3.9604 13.6796 3.9363 13.1975 3.9363C12.844 3.9363 12.4905 3.95235 12.145 3.97647C11.6549 4.00862 11.1648 4.07288 10.6748 4.15322C10.5543 4.16928 10.4337 4.19339 10.3132 4.2175C10.0642 4.2657 9.82314 4.32194 9.59015 4.37818C9.46963 4.41033 9.34912 4.44245 9.22861 4.47459C9.1081 4.52279 8.99562 4.57904 8.88314 4.62724C8.79476 4.66741 8.70639 4.70758 8.61801 4.74775C8.60195 4.7558 8.58586 4.7558 8.57784 4.76381C8.4975 4.80398 8.42519 4.83611 8.35288 4.87629C8.32878 4.88433 8.31271 4.89234 8.29664 4.90039C8.20827 4.94056 8.11989 4.98877 8.04758 5.02894C7.99134 5.05304 7.9351 5.08518 7.8869 5.10928C7.8628 5.12534 7.83066 5.14143 7.81459 5.14945C7.74228 5.18962 7.66997 5.22979 7.6057 5.26996C7.53339 5.31013 7.46912 5.3503 7.41288 5.39047C7.35664 5.43065 7.3004 5.46278 7.25219 5.50295C7.24415 5.511 7.23614 5.511 7.22809 5.51901C7.17989 5.55116 7.12365 5.59132 7.07544 5.63149C7.07544 5.63149 7.0674 5.63954 7.05939 5.64755C7.01922 5.6797 6.97904 5.71182 6.93887 5.74395C6.92282 5.752 6.90672 5.76806 6.89067 5.7761C6.8505 5.80825 6.81033 5.84841 6.77016 5.88055C6.76211 5.89661 6.74606 5.90465 6.73801 5.9127C6.6898 5.96091 6.6416 6.00107 6.59339 6.04928C6.58534 6.04928 6.58534 6.05733 6.57734 6.06534C6.52913 6.10551 6.48092 6.15371 6.43272 6.20192C6.42467 6.20996 6.42467 6.21797 6.41666 6.21797C6.37649 6.25814 6.33632 6.29832 6.29615 6.34652C6.28009 6.36258 6.25598 6.37867 6.23991 6.39473C6.19974 6.44293 6.15154 6.49114 6.10333 6.53934C6.09528 6.5554 6.07923 6.56345 6.07118 6.57951C6.00691 6.64379 5.95067 6.70806 5.88639 6.77233C5.87835 6.78038 5.87034 6.78839 5.86229 6.79644C5.73374 6.93302 5.59716 7.0696 5.45255 7.19011C5.30793 7.31866 5.15528 7.43917 5.00263 7.54362C4.84195 7.6561 4.6893 7.7525 4.52058 7.84891C4.3599 7.93729 4.19118 8.01763 4.01443 8.08994C3.84571 8.16225 3.66895 8.22653 3.4922 8.28276C3.15476 8.35507 2.80929 8.49165 2.51203 8.51575C2.44776 8.51575 2.37545 8.53181 2.31118 8.53985C2.23887 8.55591 2.17459 8.57201 2.11032 8.58806C2.04605 8.61216 1.98177 8.63627 1.9175 8.66037C1.85323 8.68447 1.78895 8.71661 1.72468 8.74875C1.66844 8.78891 1.60417 8.82105 1.54793 8.86122C1.49169 8.90139 1.43545 8.9496 1.38724 8.9978C1.331 9.03798 1.27476 9.09422 1.22656 9.14242C1.17835 9.19866 1.13015 9.24687 1.08998 9.3031C1.04981 9.36738 1.0016 9.42362 0.969463 9.48789C0.929293 9.54413 0.889123 9.60841 0.856984 9.67268C0.824835 9.74499 0.792712 9.80926 0.768609 9.88157C0.744506 9.94584 0.720403 10.0181 0.6963 10.0905C0.680245 10.1547 0.664151 10.219 0.656131 10.2833C0.656131 10.2913 0.648084 10.2993 0.648084 10.3074C0.632028 10.3797 0.632028 10.4761 0.623981 10.5243C0.615935 10.5805 0.607925 10.6288 0.607925 10.685C0.607925 10.7171 0.607925 10.7573 0.615972 10.7894C0.624018 10.8457 0.632028 10.8939 0.648122 10.9421C0.664177 10.9903 0.680271 11.0385 0.704359 11.0867C0.704359 11.0947 0.704359 11.0947 0.704359 11.0947C0.728462 11.143 0.7606 11.1912 0.792734 11.2394C0.824884 11.2876 0.857011 11.3358 0.897181 11.384C0.937351 11.4242 0.985557 11.4724 1.03376 11.5125C1.08197 11.5607 1.13017 11.6009 1.18641 11.6411C1.37923 11.8098 1.42744 11.866 1.6765 11.9946C1.71667 12.0187 1.75684 12.0348 1.80505 12.0589C1.81309 12.0589 1.8211 12.0669 1.82915 12.0669C1.82915 12.083 1.82915 12.091 1.8372 12.1071C1.84524 12.1713 1.8613 12.2356 1.87737 12.2999C1.89342 12.3722 1.91754 12.4365 1.94164 12.4927C1.96575 12.5409 1.98181 12.5891 2.00592 12.6373C2.01396 12.6534 2.02197 12.6695 2.03002 12.6775C2.06217 12.7418 2.09429 12.798 2.12643 12.8543C2.1666 12.9105 2.20677 12.9667 2.24694 13.023C2.28711 13.0712 2.33532 13.1274 2.38352 13.1756C2.43173 13.2238 2.47993 13.264 2.53617 13.3122C2.53617 13.3122 2.54422 13.3202 2.55223 13.3202C2.60044 13.3604 2.64864 13.4006 2.69685 13.4327C2.75308 13.4729 2.80932 13.505 2.8736 13.5372C2.92984 13.5693 2.99411 13.6014 3.05838 13.6255C3.10659 13.6497 3.16283 13.6657 3.21907 13.6818C3.22712 13.6898 3.23512 13.6898 3.25122 13.6978C3.28337 13.7059 3.32352 13.7139 3.35566 13.7219C3.33156 14.1558 3.32351 14.5655 3.38781 14.7102C3.46011 14.8708 3.81362 14.3808 4.16713 13.8184C4.11892 14.3727 4.08678 15.0235 4.16713 15.2163C4.2555 15.4172 4.73755 14.7905 5.15533 14.0996C10.8516 12.7819 16.0497 16.7187 16.596 22.2784C16.4916 21.4107 15.423 20.9286 14.933 21.0491C14.6919 21.6437 14.2822 22.4069 13.6234 22.8809C13.6796 22.3507 13.6555 21.8044 13.543 21.2741C13.3663 22.0132 13.0208 22.7042 12.5468 23.2987C11.7835 23.3549 11.0203 22.9854 10.6186 22.431C10.5864 22.4069 10.5784 22.3587 10.5543 22.3266C10.5302 22.2703 10.5061 22.2141 10.49 22.1579C10.4659 22.1016 10.4499 22.0454 10.4418 21.9891C10.4338 21.9329 10.4338 21.8767 10.4338 21.8124C10.4338 21.7722 10.4338 21.732 10.4338 21.6919C10.4418 21.6356 10.4579 21.5794 10.474 21.5232C10.49 21.4669 10.5061 21.4107 10.5302 21.3544C10.5623 21.2982 10.5864 21.242 10.6266 21.1857C10.7632 20.8001 10.7632 20.4867 10.5141 20.302C10.4659 20.2698 10.4177 20.2457 10.3615 20.2216C10.3293 20.2136 10.2892 20.1975 10.257 20.1895C10.2329 20.1814 10.2169 20.1734 10.1928 20.1654C10.1365 20.1493 10.0803 20.1332 10.024 20.1252C9.9678 20.1091 9.91156 20.1011 9.85532 20.1011C9.79909 20.093 9.73481 20.085 9.67857 20.085C9.6384 20.085 9.59823 20.0931 9.55806 20.0931C9.49379 20.0931 9.43754 20.1011 9.38131 20.1172C9.32507 20.1252 9.26883 20.1332 9.21259 20.1493C9.15635 20.1654 9.10011 20.1815 9.04387 20.2056C8.98763 20.2297 8.93943 20.2538 8.88318 20.2779C8.83498 20.302 8.78678 20.3341 8.73054 20.3582C6.85857 21.5794 7.97532 24.4396 9.25276 25.2671C8.77071 25.3555 8.28062 25.4599 8.14404 25.5644C8.13599 25.5724 8.12799 25.5804 8.12799 25.5804C8.47346 25.7893 8.83499 25.9661 9.2126 26.1187C9.72679 26.2874 10.2731 26.4401 10.5141 26.5044V26.5124C11.181 26.649 11.8559 26.6972 12.5388 26.657C16.0979 26.408 19.0143 23.7004 19.5446 20.1333C19.5606 20.2056 19.5767 20.2698 19.5928 20.3422C19.6169 20.4868 19.649 20.6394 19.6651 20.7921C19.6651 20.7921 19.6651 20.7921 19.6651 20.8001C19.6812 20.8724 19.6892 20.9447 19.6972 21.009C19.6972 21.0251 19.6972 21.0331 19.6972 21.0412C19.7053 21.1135 19.7133 21.1858 19.7133 21.25C19.7213 21.3384 19.7294 21.4268 19.7294 21.5152C19.7294 21.5553 19.7294 21.5955 19.7294 21.6437C19.7294 21.6839 19.7374 21.7321 19.7374 21.7723C19.7374 21.8205 19.7294 21.8687 19.7294 21.9169C19.7294 21.9571 19.7294 21.9972 19.7294 22.0294C19.7294 22.0856 19.7213 22.1338 19.7213 22.19C19.7213 22.2222 19.7213 22.2543 19.7133 22.2945C19.7133 22.3507 19.7052 22.407 19.7052 22.4712C19.6972 22.4953 19.6972 22.5194 19.6972 22.5435C19.6891 22.6078 19.6811 22.6641 19.6731 22.7283C19.6731 22.7524 19.6731 22.7765 19.665 22.8006C19.657 22.881 19.6409 22.9533 19.6329 23.0336V23.0417V23.0497C19.6168 23.122 19.6007 23.2024 19.5847 23.2747C19.5847 23.2827 19.5847 23.2907 19.5847 23.2988C19.5686 23.3711 19.5525 23.4434 19.5365 23.5157C19.5365 23.5238 19.5284 23.5398 19.5284 23.5479C19.5124 23.6202 19.4963 23.6925 19.4722 23.7648C19.4722 23.7728 19.4722 23.7808 19.4722 23.7889C19.4481 23.8692 19.424 23.9415 19.4079 24.0138C19.3999 24.0219 19.3999 24.0299 19.3999 24.0299C19.3757 24.1102 19.3517 24.1906 19.3275 24.2709C19.2954 24.3513 19.2713 24.4236 19.2392 24.5039C19.207 24.5843 19.1829 24.6646 19.1508 24.7369C19.1186 24.8173 19.0865 24.8896 19.0544 24.9699H19.0463C19.0142 25.0422 18.9821 25.1226 18.9419 25.1949C18.9338 25.219 18.9258 25.235 18.9178 25.2511C18.9097 25.2591 18.9097 25.2672 18.9017 25.2752C18.3795 26.3277 17.6082 27.2516 16.6441 27.9747C16.5799 28.0149 16.5156 28.0631 16.4513 28.1113C16.4352 28.1273 16.4111 28.1354 16.3951 28.1514C16.3388 28.1916 16.2826 28.2318 16.2183 28.272L16.2424 28.3202H16.2505C16.3629 28.3041 16.4754 28.288 16.5879 28.272H16.5959C16.8048 28.2398 17.0137 28.1996 17.2226 28.1595C17.2788 28.1514 17.3431 28.1354 17.3994 28.1193C17.4395 28.1113 17.4717 28.1032 17.5118 28.0952C17.5681 28.0872 17.6243 28.0711 17.6806 28.0631C17.7288 28.047 17.777 28.0389 17.8252 28.0229C18.6286 27.8301 19.4079 27.5649 20.1551 27.2516C18.8777 28.995 17.1664 30.401 15.1659 31.3249C16.0898 31.2607 17.0137 31.108 17.9055 30.8509C21.1433 29.8948 23.8669 27.7176 25.4978 24.7851C25.1684 26.641 24.4293 28.4085 23.3366 29.9511C24.116 29.4369 24.831 28.8424 25.4818 28.1675C27.2814 26.2875 28.4625 23.9013 28.8642 21.3384C29.1373 22.6078 29.2177 23.9174 29.0972 25.2109C34.8979 17.1205 29.5792 8.73277 27.3537 6.52336C27.3457 6.50731 27.3377 6.49926 27.3377 6.48319C27.3296 6.49124 27.3296 6.49124 27.3296 6.49925C27.3296 6.49121 27.3296 6.49121 27.3216 6.48319C27.3216 6.5796 27.3135 6.67601 27.3055 6.77242C27.2814 6.95721 27.2573 7.13396 27.2252 7.31072C27.185 7.48747 27.1368 7.66422 27.0886 7.84097C27.0324 8.00969 26.9681 8.18644 26.8958 8.35516C26.8235 8.51584 26.7431 8.68456 26.6548 8.84525C26.5664 8.9979 26.47 9.15858 26.3655 9.30319C26.2611 9.45585 26.1486 9.60046 26.0361 9.73704C25.9156 9.88166 25.7871 10.0102 25.6585 10.1388C25.5782 10.2111 25.5059 10.2753 25.4255 10.3396C25.3613 10.3958 25.305 10.4441 25.2407 10.5003C25.0961 10.6128 24.9515 10.7172 24.7908 10.8136C24.6382 10.91 24.4775 11.0064 24.3168 11.0868C24.1481 11.1671 23.9794 11.2394 23.8107 11.3117C23.6419 11.376 23.4652 11.4323 23.2884 11.4805C23.1117 11.5287 22.9269 11.5688 22.7501 11.601C22.5654 11.6331 22.3806 11.6492 22.2038 11.6652C22.0753 11.6733 21.9467 11.6813 21.8182 11.6813C21.6334 11.6813 21.4486 11.6653 21.2718 11.6492C21.0871 11.6331 20.9023 11.609 20.7255 11.5688C20.5407 11.5367 20.364 11.4885 20.1872 11.4322H20.1792C20.3559 11.4162 20.5327 11.4001 20.7094 11.368C20.8942 11.3358 21.071 11.2957 21.2477 11.2474C21.4245 11.1992 21.6012 11.143 21.77 11.0787C21.9467 11.0145 22.1154 10.9341 22.2761 10.8538C22.4448 10.7734 22.5975 10.6851 22.7582 10.5886C22.9108 10.4842 23.0635 10.3798 23.2081 10.2673C23.3527 10.1548 23.4893 10.0343 23.6178 9.90573C23.7544 9.78522 23.8749 9.64864 23.9954 9.51206C24.1159 9.36744 24.2284 9.22283 24.3329 9.07821C24.3489 9.05411 24.365 9.02197 24.3811 8.99787C24.4614 8.86932 24.5418 8.74078 24.6141 8.61223C24.7024 8.45154 24.7828 8.29086 24.8551 8.12214C24.9274 7.95342 24.9917 7.7847 25.0479 7.60795C25.1041 7.43923 25.1443 7.26248 25.1845 7.08573C25.2166 6.90094 25.2488 6.72419 25.2648 6.54744C25.2809 6.36265 25.297 6.17787 25.297 6.00111C25.297 5.87257 25.2889 5.74402 25.2809 5.61547C25.2649 5.43069 25.2408 5.25393 25.2167 5.07718C25.1845 4.89239 25.1443 4.71564 25.0961 4.53889C25.0399 4.37017 24.9837 4.19342 24.9194 4.0247C24.8551 3.85598 24.7748 3.68726 24.6944 3.52658C24.6061 3.3659 24.5177 3.20521 24.4213 3.05256C24.3168 2.89992 24.2124 2.7553 24.0999 2.61068C23.9794 2.4741 23.8589 2.33752 23.7303 2.20094C23.6661 2.13667 23.5937 2.06436 23.5214 2.00009C23.1599 1.71889 22.7823 1.45376 22.4047 1.21273C22.3484 1.18058 22.3002 1.15649 22.244 1.13239C21.9789 0.963673 21.7298 0.875294 21.4807 0.794954L21.4807 0.794925Z",
    fill: "black"
  }));
};
var NestIconLight = _ref3 => {
  var props = _extends$u({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M18.9258 0.336975C18.7009 0.336975 18.492 0.385181 18.2992 0.449453C18.7089 0.722616 18.9339 1.08416 19.0464 1.4939C19.0544 1.55014 19.0705 1.59031 19.0785 1.64655C19.0865 1.69476 19.0946 1.74296 19.0946 1.79117C19.1267 2.49817 18.9098 2.58655 18.7571 3.00433C18.5241 3.54262 18.5884 4.12108 18.8696 4.58707C18.8937 4.64331 18.9258 4.70758 18.966 4.76382C18.6607 2.73117 20.3559 2.42587 20.6693 1.79117C20.6934 1.23681 20.2354 0.867232 19.8739 0.610137C19.5284 0.401249 19.2151 0.336975 18.9258 0.336975ZM21.4807 0.794925C21.4486 0.979711 21.4727 0.931506 21.4647 1.02792C21.4566 1.09219 21.4566 1.17253 21.4486 1.23681C21.4325 1.30108 21.4165 1.36535 21.3924 1.42963C21.3763 1.4939 21.3522 1.55817 21.3281 1.62245C21.2959 1.68672 21.2719 1.74296 21.2397 1.80723C21.2156 1.83938 21.1995 1.87151 21.1754 1.90364C21.1594 1.92775 21.1433 1.95185 21.1272 1.97595C21.0871 2.03219 21.0469 2.08843 21.0067 2.13664C20.9585 2.18484 20.9183 2.24108 20.8621 2.28125C20.8621 2.2893 20.8621 2.2893 20.8621 2.2893C20.8139 2.32947 20.7657 2.37767 20.7095 2.41784C20.5407 2.54639 20.3479 2.6428 20.1712 2.76331C20.1149 2.80348 20.0587 2.83562 20.0105 2.88383C19.9542 2.924 19.906 2.96417 19.8578 3.01237C19.8016 3.06058 19.7614 3.10879 19.7132 3.16503C19.673 3.21323 19.6248 3.26947 19.5927 3.32571C19.5525 3.38195 19.5124 3.43819 19.4802 3.49443C19.4481 3.5587 19.424 3.61494 19.3918 3.67921C19.3677 3.74348 19.3436 3.79973 19.3276 3.864C19.3035 3.93631 19.2874 4.00058 19.2713 4.06486C19.2633 4.09701 19.2633 4.13716 19.2553 4.1693C19.2472 4.20145 19.2472 4.23357 19.2392 4.26571C19.2392 4.32998 19.2312 4.40229 19.2312 4.46656C19.2312 4.51477 19.2312 4.56298 19.2392 4.61118C19.2392 4.67545 19.2473 4.73973 19.2633 4.81204C19.2714 4.87631 19.2874 4.94058 19.3035 5.00486C19.3276 5.06913 19.3437 5.1334 19.3678 5.19768C19.3838 5.23785 19.4079 5.27802 19.424 5.31015L17.5761 4.59511C17.2628 4.50673 16.9575 4.42639 16.6442 4.35409C16.4755 4.31392 16.3067 4.27374 16.138 4.23357C15.656 4.13716 15.1659 4.06486 14.6758 4.01665C14.6597 4.01665 14.6517 4.00861 14.6356 4.00861C14.1536 3.9604 13.6796 3.9363 13.1975 3.9363C12.844 3.9363 12.4905 3.95235 12.145 3.97647C11.6549 4.00862 11.1648 4.07288 10.6748 4.15322C10.5543 4.16928 10.4337 4.19339 10.3132 4.2175C10.0642 4.2657 9.82314 4.32194 9.59015 4.37818C9.46963 4.41033 9.34912 4.44245 9.22861 4.47459C9.1081 4.52279 8.99562 4.57904 8.88314 4.62724C8.79476 4.66741 8.70639 4.70758 8.61801 4.74775C8.60195 4.7558 8.58586 4.7558 8.57784 4.76381C8.4975 4.80398 8.42519 4.83611 8.35288 4.87629C8.32878 4.88433 8.31271 4.89234 8.29664 4.90039C8.20827 4.94056 8.11989 4.98877 8.04758 5.02894C7.99134 5.05304 7.9351 5.08518 7.8869 5.10928C7.8628 5.12534 7.83066 5.14143 7.81459 5.14945C7.74228 5.18962 7.66997 5.22979 7.6057 5.26996C7.53339 5.31013 7.46912 5.3503 7.41288 5.39047C7.35664 5.43065 7.3004 5.46278 7.25219 5.50295C7.24415 5.511 7.23614 5.511 7.22809 5.51901C7.17989 5.55116 7.12365 5.59132 7.07544 5.63149C7.07544 5.63149 7.0674 5.63954 7.05939 5.64755C7.01922 5.6797 6.97904 5.71182 6.93887 5.74395C6.92282 5.752 6.90672 5.76806 6.89067 5.7761C6.8505 5.80825 6.81033 5.84841 6.77016 5.88055C6.76211 5.89661 6.74606 5.90465 6.73801 5.9127C6.6898 5.96091 6.6416 6.00107 6.59339 6.04928C6.58534 6.04928 6.58534 6.05733 6.57734 6.06534C6.52913 6.10551 6.48092 6.15371 6.43272 6.20192C6.42467 6.20996 6.42467 6.21797 6.41666 6.21797C6.37649 6.25814 6.33632 6.29832 6.29615 6.34652C6.28009 6.36258 6.25598 6.37867 6.23991 6.39473C6.19974 6.44293 6.15154 6.49114 6.10333 6.53934C6.09528 6.5554 6.07923 6.56345 6.07118 6.57951C6.00691 6.64379 5.95067 6.70806 5.88639 6.77233C5.87835 6.78038 5.87034 6.78839 5.86229 6.79644C5.73374 6.93302 5.59716 7.0696 5.45255 7.19011C5.30793 7.31866 5.15528 7.43917 5.00263 7.54362C4.84195 7.6561 4.6893 7.7525 4.52058 7.84891C4.3599 7.93729 4.19118 8.01763 4.01443 8.08994C3.84571 8.16225 3.66895 8.22653 3.4922 8.28276C3.15476 8.35507 2.80929 8.49165 2.51203 8.51575C2.44776 8.51575 2.37545 8.53181 2.31118 8.53985C2.23887 8.55591 2.17459 8.57201 2.11032 8.58806C2.04605 8.61216 1.98177 8.63627 1.9175 8.66037C1.85323 8.68447 1.78895 8.71661 1.72468 8.74875C1.66844 8.78891 1.60417 8.82105 1.54793 8.86122C1.49169 8.90139 1.43545 8.9496 1.38724 8.9978C1.331 9.03798 1.27476 9.09422 1.22656 9.14242C1.17835 9.19866 1.13015 9.24687 1.08998 9.3031C1.04981 9.36738 1.0016 9.42362 0.969463 9.48789C0.929293 9.54413 0.889123 9.60841 0.856984 9.67268C0.824835 9.74499 0.792712 9.80926 0.768609 9.88157C0.744506 9.94584 0.720403 10.0181 0.6963 10.0905C0.680245 10.1547 0.664151 10.219 0.656131 10.2833C0.656131 10.2913 0.648084 10.2993 0.648084 10.3074C0.632028 10.3797 0.632028 10.4761 0.623981 10.5243C0.615935 10.5805 0.607925 10.6288 0.607925 10.685C0.607925 10.7171 0.607925 10.7573 0.615972 10.7894C0.624018 10.8457 0.632028 10.8939 0.648122 10.9421C0.664177 10.9903 0.680271 11.0385 0.704359 11.0867C0.704359 11.0947 0.704359 11.0947 0.704359 11.0947C0.728462 11.143 0.7606 11.1912 0.792734 11.2394C0.824884 11.2876 0.857011 11.3358 0.897181 11.384C0.937351 11.4242 0.985557 11.4724 1.03376 11.5125C1.08197 11.5607 1.13017 11.6009 1.18641 11.6411C1.37923 11.8098 1.42744 11.866 1.6765 11.9946C1.71667 12.0187 1.75684 12.0348 1.80505 12.0589C1.81309 12.0589 1.8211 12.0669 1.82915 12.0669C1.82915 12.083 1.82915 12.091 1.8372 12.1071C1.84524 12.1713 1.8613 12.2356 1.87737 12.2999C1.89342 12.3722 1.91754 12.4365 1.94164 12.4927C1.96575 12.5409 1.98181 12.5891 2.00592 12.6373C2.01396 12.6534 2.02197 12.6695 2.03002 12.6775C2.06217 12.7418 2.09429 12.798 2.12643 12.8543C2.1666 12.9105 2.20677 12.9667 2.24694 13.023C2.28711 13.0712 2.33532 13.1274 2.38352 13.1756C2.43173 13.2238 2.47993 13.264 2.53617 13.3122C2.53617 13.3122 2.54422 13.3202 2.55223 13.3202C2.60044 13.3604 2.64864 13.4006 2.69685 13.4327C2.75308 13.4729 2.80932 13.505 2.8736 13.5372C2.92984 13.5693 2.99411 13.6014 3.05838 13.6255C3.10659 13.6497 3.16283 13.6657 3.21907 13.6818C3.22712 13.6898 3.23512 13.6898 3.25122 13.6978C3.28337 13.7059 3.32352 13.7139 3.35566 13.7219C3.33156 14.1558 3.32351 14.5655 3.38781 14.7102C3.46011 14.8708 3.81362 14.3808 4.16713 13.8184C4.11892 14.3727 4.08678 15.0235 4.16713 15.2163C4.2555 15.4172 4.73755 14.7905 5.15533 14.0996C10.8516 12.7819 16.0497 16.7187 16.596 22.2784C16.4916 21.4107 15.423 20.9286 14.933 21.0491C14.6919 21.6437 14.2822 22.4069 13.6234 22.8809C13.6796 22.3507 13.6555 21.8044 13.543 21.2741C13.3663 22.0132 13.0208 22.7042 12.5468 23.2987C11.7835 23.3549 11.0203 22.9854 10.6186 22.431C10.5864 22.4069 10.5784 22.3587 10.5543 22.3266C10.5302 22.2703 10.5061 22.2141 10.49 22.1579C10.4659 22.1016 10.4499 22.0454 10.4418 21.9891C10.4338 21.9329 10.4338 21.8767 10.4338 21.8124C10.4338 21.7722 10.4338 21.732 10.4338 21.6919C10.4418 21.6356 10.4579 21.5794 10.474 21.5232C10.49 21.4669 10.5061 21.4107 10.5302 21.3544C10.5623 21.2982 10.5864 21.242 10.6266 21.1857C10.7632 20.8001 10.7632 20.4867 10.5141 20.302C10.4659 20.2698 10.4177 20.2457 10.3615 20.2216C10.3293 20.2136 10.2892 20.1975 10.257 20.1895C10.2329 20.1814 10.2169 20.1734 10.1928 20.1654C10.1365 20.1493 10.0803 20.1332 10.024 20.1252C9.9678 20.1091 9.91156 20.1011 9.85532 20.1011C9.79909 20.093 9.73481 20.085 9.67857 20.085C9.6384 20.085 9.59823 20.0931 9.55806 20.0931C9.49379 20.0931 9.43754 20.1011 9.38131 20.1172C9.32507 20.1252 9.26883 20.1332 9.21259 20.1493C9.15635 20.1654 9.10011 20.1815 9.04387 20.2056C8.98763 20.2297 8.93943 20.2538 8.88318 20.2779C8.83498 20.302 8.78678 20.3341 8.73054 20.3582C6.85857 21.5794 7.97532 24.4396 9.25276 25.2671C8.77071 25.3555 8.28062 25.4599 8.14404 25.5644C8.13599 25.5724 8.12799 25.5804 8.12799 25.5804C8.47346 25.7893 8.83499 25.9661 9.2126 26.1187C9.72679 26.2874 10.2731 26.4401 10.5141 26.5044V26.5124C11.181 26.649 11.8559 26.6972 12.5388 26.657C16.0979 26.408 19.0143 23.7004 19.5446 20.1333C19.5606 20.2056 19.5767 20.2698 19.5928 20.3422C19.6169 20.4868 19.649 20.6394 19.6651 20.7921C19.6651 20.7921 19.6651 20.7921 19.6651 20.8001C19.6812 20.8724 19.6892 20.9447 19.6972 21.009C19.6972 21.0251 19.6972 21.0331 19.6972 21.0412C19.7053 21.1135 19.7133 21.1858 19.7133 21.25C19.7213 21.3384 19.7294 21.4268 19.7294 21.5152C19.7294 21.5553 19.7294 21.5955 19.7294 21.6437C19.7294 21.6839 19.7374 21.7321 19.7374 21.7723C19.7374 21.8205 19.7294 21.8687 19.7294 21.9169C19.7294 21.9571 19.7294 21.9972 19.7294 22.0294C19.7294 22.0856 19.7213 22.1338 19.7213 22.19C19.7213 22.2222 19.7213 22.2543 19.7133 22.2945C19.7133 22.3507 19.7052 22.407 19.7052 22.4712C19.6972 22.4953 19.6972 22.5194 19.6972 22.5435C19.6891 22.6078 19.6811 22.6641 19.6731 22.7283C19.6731 22.7524 19.6731 22.7765 19.665 22.8006C19.657 22.881 19.6409 22.9533 19.6329 23.0336V23.0417V23.0497C19.6168 23.122 19.6007 23.2024 19.5847 23.2747C19.5847 23.2827 19.5847 23.2907 19.5847 23.2988C19.5686 23.3711 19.5525 23.4434 19.5365 23.5157C19.5365 23.5238 19.5284 23.5398 19.5284 23.5479C19.5124 23.6202 19.4963 23.6925 19.4722 23.7648C19.4722 23.7728 19.4722 23.7808 19.4722 23.7889C19.4481 23.8692 19.424 23.9415 19.4079 24.0138C19.3999 24.0219 19.3999 24.0299 19.3999 24.0299C19.3757 24.1102 19.3517 24.1906 19.3275 24.2709C19.2954 24.3513 19.2713 24.4236 19.2392 24.5039C19.207 24.5843 19.1829 24.6646 19.1508 24.7369C19.1186 24.8173 19.0865 24.8896 19.0544 24.9699H19.0463C19.0142 25.0422 18.9821 25.1226 18.9419 25.1949C18.9338 25.219 18.9258 25.235 18.9178 25.2511C18.9097 25.2591 18.9097 25.2672 18.9017 25.2752C18.3795 26.3277 17.6082 27.2516 16.6441 27.9747C16.5799 28.0149 16.5156 28.0631 16.4513 28.1113C16.4352 28.1273 16.4111 28.1354 16.3951 28.1514C16.3388 28.1916 16.2826 28.2318 16.2183 28.272L16.2424 28.3202H16.2505C16.3629 28.3041 16.4754 28.288 16.5879 28.272H16.5959C16.8048 28.2398 17.0137 28.1996 17.2226 28.1595C17.2788 28.1514 17.3431 28.1354 17.3994 28.1193C17.4395 28.1113 17.4717 28.1032 17.5118 28.0952C17.5681 28.0872 17.6243 28.0711 17.6806 28.0631C17.7288 28.047 17.777 28.0389 17.8252 28.0229C18.6286 27.8301 19.4079 27.5649 20.1551 27.2516C18.8777 28.995 17.1664 30.401 15.1659 31.3249C16.0898 31.2607 17.0137 31.108 17.9055 30.8509C21.1433 29.8948 23.8669 27.7176 25.4978 24.7851C25.1684 26.641 24.4293 28.4085 23.3366 29.9511C24.116 29.4369 24.831 28.8424 25.4818 28.1675C27.2814 26.2875 28.4625 23.9013 28.8642 21.3384C29.1373 22.6078 29.2177 23.9174 29.0972 25.2109C34.8979 17.1205 29.5792 8.73277 27.3537 6.52336C27.3457 6.50731 27.3377 6.49926 27.3377 6.48319C27.3296 6.49124 27.3296 6.49124 27.3296 6.49925C27.3296 6.49121 27.3296 6.49121 27.3216 6.48319C27.3216 6.5796 27.3135 6.67601 27.3055 6.77242C27.2814 6.95721 27.2573 7.13396 27.2252 7.31072C27.185 7.48747 27.1368 7.66422 27.0886 7.84097C27.0324 8.00969 26.9681 8.18644 26.8958 8.35516C26.8235 8.51584 26.7431 8.68456 26.6548 8.84525C26.5664 8.9979 26.47 9.15858 26.3655 9.30319C26.2611 9.45585 26.1486 9.60046 26.0361 9.73704C25.9156 9.88166 25.7871 10.0102 25.6585 10.1388C25.5782 10.2111 25.5059 10.2753 25.4255 10.3396C25.3613 10.3958 25.305 10.4441 25.2407 10.5003C25.0961 10.6128 24.9515 10.7172 24.7908 10.8136C24.6382 10.91 24.4775 11.0064 24.3168 11.0868C24.1481 11.1671 23.9794 11.2394 23.8107 11.3117C23.6419 11.376 23.4652 11.4323 23.2884 11.4805C23.1117 11.5287 22.9269 11.5688 22.7501 11.601C22.5654 11.6331 22.3806 11.6492 22.2038 11.6652C22.0753 11.6733 21.9467 11.6813 21.8182 11.6813C21.6334 11.6813 21.4486 11.6653 21.2718 11.6492C21.0871 11.6331 20.9023 11.609 20.7255 11.5688C20.5407 11.5367 20.364 11.4885 20.1872 11.4322H20.1792C20.3559 11.4162 20.5327 11.4001 20.7094 11.368C20.8942 11.3358 21.071 11.2957 21.2477 11.2474C21.4245 11.1992 21.6012 11.143 21.77 11.0787C21.9467 11.0145 22.1154 10.9341 22.2761 10.8538C22.4448 10.7734 22.5975 10.6851 22.7582 10.5886C22.9108 10.4842 23.0635 10.3798 23.2081 10.2673C23.3527 10.1548 23.4893 10.0343 23.6178 9.90573C23.7544 9.78522 23.8749 9.64864 23.9954 9.51206C24.1159 9.36744 24.2284 9.22283 24.3329 9.07821C24.3489 9.05411 24.365 9.02197 24.3811 8.99787C24.4614 8.86932 24.5418 8.74078 24.6141 8.61223C24.7024 8.45154 24.7828 8.29086 24.8551 8.12214C24.9274 7.95342 24.9917 7.7847 25.0479 7.60795C25.1041 7.43923 25.1443 7.26248 25.1845 7.08573C25.2166 6.90094 25.2488 6.72419 25.2648 6.54744C25.2809 6.36265 25.297 6.17787 25.297 6.00111C25.297 5.87257 25.2889 5.74402 25.2809 5.61547C25.2649 5.43069 25.2408 5.25393 25.2167 5.07718C25.1845 4.89239 25.1443 4.71564 25.0961 4.53889C25.0399 4.37017 24.9837 4.19342 24.9194 4.0247C24.8551 3.85598 24.7748 3.68726 24.6944 3.52658C24.6061 3.3659 24.5177 3.20521 24.4213 3.05256C24.3168 2.89992 24.2124 2.7553 24.0999 2.61068C23.9794 2.4741 23.8589 2.33752 23.7303 2.20094C23.6661 2.13667 23.5937 2.06436 23.5214 2.00009C23.1599 1.71889 22.7823 1.45376 22.4047 1.21273C22.3484 1.18058 22.3002 1.15649 22.244 1.13239C21.9789 0.963673 21.7298 0.875294 21.4807 0.794954L21.4807 0.794925Z",
    fill: "white"
  }));
};

function _extends$v() {
  _extends$v = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$v.apply(this, arguments);
}
var NextIcon = _ref => {
  var props = _extends$v({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M28 32H4C1.7909 32 0 30.2091 0 28V4C0 1.7909 1.7909 0 4 0H28C30.2091 0 32 1.7909 32 4V28C32 30.2091 30.2091 32 28 32Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M16 29.984C16.1 29.984 16.181 29.903 16.181 29.803C16.181 29.703 16.1 29.622 16 29.622C15.9 29.622 15.819 29.703 15.819 29.803C15.819 29.903 15.9 29.984 16 29.984Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M25.2092 29.984C25.3092 29.984 25.3902 29.903 25.3902 29.803C25.3902 29.703 25.3092 29.622 25.2092 29.622C25.1092 29.622 25.0282 29.703 25.0282 29.803C25.0282 29.903 25.1092 29.984 25.2092 29.984Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M6.7908 29.984C6.89076 29.984 6.9718 29.903 6.9718 29.803C6.9718 29.703 6.89076 29.622 6.7908 29.622C6.69084 29.622 6.6098 29.703 6.6098 29.803C6.6098 29.903 6.69084 29.984 6.7908 29.984Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M11.3954 25.3895C11.4954 25.3895 11.5764 25.3085 11.5764 25.2085C11.5764 25.1085 11.4954 25.0275 11.3954 25.0275C11.2954 25.0275 11.2144 25.1085 11.2144 25.2085C11.2144 25.3085 11.2954 25.3895 11.3954 25.3895Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M16 20.7748C16.1 20.7748 16.181 20.6938 16.181 20.5938C16.181 20.4938 16.1 20.4128 16 20.4128C15.9 20.4128 15.819 20.4938 15.819 20.5938C15.819 20.6938 15.9 20.7748 16 20.7748Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M20.6046 25.3895C20.7046 25.3895 20.7856 25.3085 20.7856 25.2085C20.7856 25.1085 20.7046 25.0275 20.6046 25.0275C20.5046 25.0275 20.4236 25.1085 20.4236 25.2085C20.4236 25.3085 20.5046 25.3895 20.6046 25.3895Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M25.2092 20.7748C25.3092 20.7748 25.3902 20.6938 25.3902 20.5938C25.3902 20.4938 25.3092 20.4128 25.2092 20.4128C25.1092 20.4128 25.0282 20.4938 25.0282 20.5938C25.0282 20.6938 25.1092 20.7748 25.2092 20.7748Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M29.8138 25.3895C29.9138 25.3895 29.9948 25.3085 29.9948 25.2085C29.9948 25.1085 29.9138 25.0275 29.8138 25.0275C29.7138 25.0275 29.6328 25.1085 29.6328 25.2085C29.6328 25.3085 29.7138 25.3895 29.8138 25.3895Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M6.7908 20.7748C6.89076 20.7748 6.9718 20.6938 6.9718 20.5938C6.9718 20.4938 6.89076 20.4128 6.7908 20.4128C6.69084 20.4128 6.6098 20.4938 6.6098 20.5938C6.6098 20.6938 6.69084 20.7748 6.7908 20.7748Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M2.1862 25.3895C2.28616 25.3895 2.3672 25.3085 2.3672 25.2085C2.3672 25.1085 2.28616 25.0275 2.1862 25.0275C2.08624 25.0275 2.0052 25.1085 2.0052 25.2085C2.0052 25.3085 2.08624 25.3895 2.1862 25.3895Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M11.3954 16.1803C11.4954 16.1803 11.5764 16.0993 11.5764 15.9993C11.5764 15.8993 11.4954 15.8183 11.3954 15.8183C11.2954 15.8183 11.2144 15.8993 11.2144 15.9993C11.2144 16.0993 11.2954 16.1803 11.3954 16.1803Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M16 11.5657C16.1 11.5657 16.181 11.4847 16.181 11.3847C16.181 11.2847 16.1 11.2037 16 11.2037C15.9 11.2037 15.819 11.2847 15.819 11.3847C15.819 11.4847 15.9 11.5657 16 11.5657Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M20.6046 16.1803C20.7046 16.1803 20.7856 16.0993 20.7856 15.9993C20.7856 15.8993 20.7046 15.8183 20.6046 15.8183C20.5046 15.8183 20.4236 15.8993 20.4236 15.9993C20.4236 16.0993 20.5046 16.1803 20.6046 16.1803Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M25.2092 11.5657C25.3092 11.5657 25.3902 11.4847 25.3902 11.3847C25.3902 11.2847 25.3092 11.2037 25.2092 11.2037C25.1092 11.2037 25.0282 11.2847 25.0282 11.3847C25.0282 11.4847 25.1092 11.5657 25.2092 11.5657Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M29.8138 16.1803C29.9138 16.1803 29.9948 16.0993 29.9948 15.9993C29.9948 15.8993 29.9138 15.8183 29.8138 15.8183C29.7138 15.8183 29.6328 15.8993 29.6328 15.9993C29.6328 16.0993 29.7138 16.1803 29.8138 16.1803Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M6.7908 11.5657C6.89076 11.5657 6.9718 11.4847 6.9718 11.3847C6.9718 11.2847 6.89076 11.2037 6.7908 11.2037C6.69084 11.2037 6.6098 11.2847 6.6098 11.3847C6.6098 11.4847 6.69084 11.5657 6.7908 11.5657Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M2.1862 16.1803C2.28616 16.1803 2.3672 16.0993 2.3672 15.9993C2.3672 15.8993 2.28616 15.8183 2.1862 15.8183C2.08624 15.8183 2.0052 15.8993 2.0052 15.9993C2.0052 16.0993 2.08624 16.1803 2.1862 16.1803Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M11.3954 6.9711C11.4954 6.9711 11.5764 6.89006 11.5764 6.7901C11.5764 6.69014 11.4954 6.6091 11.3954 6.6091C11.2954 6.6091 11.2144 6.69014 11.2144 6.7901C11.2144 6.89006 11.2954 6.9711 11.3954 6.9711Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M16 2.3565C16.1 2.3565 16.181 2.27546 16.181 2.1755C16.181 2.07554 16.1 1.9945 16 1.9945C15.9 1.9945 15.819 2.07554 15.819 2.1755C15.819 2.27546 15.9 2.3565 16 2.3565Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M20.6046 6.9711C20.7046 6.9711 20.7856 6.89006 20.7856 6.7901C20.7856 6.69014 20.7046 6.6091 20.6046 6.6091C20.5046 6.6091 20.4236 6.69014 20.4236 6.7901C20.4236 6.89006 20.5046 6.9711 20.6046 6.9711Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M25.2092 2.3565C25.3092 2.3565 25.3902 2.27546 25.3902 2.1755C25.3902 2.07554 25.3092 1.9945 25.2092 1.9945C25.1092 1.9945 25.0282 2.07554 25.0282 2.1755C25.0282 2.27546 25.1092 2.3565 25.2092 2.3565Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M29.8138 6.9711C29.9138 6.9711 29.9948 6.89006 29.9948 6.7901C29.9948 6.69014 29.9138 6.6091 29.8138 6.6091C29.7138 6.6091 29.6328 6.69014 29.6328 6.7901C29.6328 6.89006 29.7138 6.9711 29.8138 6.9711Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M6.7908 2.3565C6.89076 2.3565 6.9718 2.27546 6.9718 2.1755C6.9718 2.07554 6.89076 1.9945 6.7908 1.9945C6.69084 1.9945 6.6098 2.07554 6.6098 2.1755C6.6098 2.27546 6.69084 2.3565 6.7908 2.3565Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M2.1862 6.9711C2.28616 6.9711 2.3672 6.89006 2.3672 6.7901C2.3672 6.69014 2.28616 6.6091 2.1862 6.6091C2.08624 6.6091 2.0052 6.69014 2.0052 6.7901C2.0052 6.89006 2.08624 6.9711 2.1862 6.9711Z",
    fill: "#D7D7D7"
  }), React.createElement("path", {
    d: "M9.663 12.5368H14.1896V12.8966H10.078V15.6044H13.9445V15.9642H10.078V18.9372H14.2368V19.297H9.663V12.5368ZM14.5951 12.5368H15.0761L17.2074 15.5097L19.3858 12.5368L22.3488 8.7605L17.4809 15.8222L19.9893 19.297H19.4895L17.2073 16.1347L14.9157 19.297H14.4254L16.9527 15.8222L14.5951 12.5368ZM20.1685 12.8966V12.5368H25.327V12.8966H22.9505V19.297H22.5356V12.8966H20.1685ZM4 12.5368H4.5187L11.6709 23.2394L8.7152 19.297L4.4338 13.0482L4.4149 19.297H4V12.5368ZM25.2851 18.8286C25.2004 18.8286 25.1368 18.7629 25.1368 18.678C25.1368 18.5931 25.2004 18.5275 25.2851 18.5275C25.3709 18.5275 25.4334 18.5931 25.4334 18.678C25.4334 18.7629 25.371 18.8286 25.2851 18.8286ZM25.6929 18.4324H25.9149C25.9179 18.5527 26.0057 18.6335 26.135 18.6335C26.2793 18.6335 26.361 18.5467 26.361 18.3839V17.3532H26.587V18.385C26.587 18.678 26.4174 18.8468 26.1369 18.8468C25.8735 18.8467 25.6929 18.6831 25.6929 18.4324ZM26.8828 18.4193H27.1068C27.126 18.5577 27.2612 18.6456 27.456 18.6456C27.6377 18.6456 27.7708 18.5516 27.7708 18.4223C27.7708 18.3111 27.6861 18.2445 27.4933 18.199L27.3056 18.1535C27.0422 18.0918 26.9221 17.9646 26.9221 17.7503C26.9221 17.4906 27.134 17.3178 27.4519 17.3178C27.7476 17.3178 27.9636 17.4906 27.9767 17.7362H27.7567C27.7355 17.6018 27.6184 17.5179 27.4489 17.5179C27.2703 17.5179 27.1511 17.6039 27.1511 17.7352C27.1511 17.8393 27.2278 17.8989 27.4176 17.9434L27.578 17.9828C27.8769 18.0525 28 18.1738 28 18.3931C28 18.672 27.784 18.8468 27.4389 18.8468C27.1159 18.8467 26.8989 18.68 26.8828 18.4193Z",
    fill: "black"
  }));
};
var NextIconDark = _ref2 => {
  var props = _extends$v({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M7.84278 11.563H13.3124V11.9978H8.34416V15.2697H13.0162V15.7045H8.34416V19.2968H13.3694V19.7315H7.84278V11.563ZM13.8024 11.563H14.3836L16.9589 15.1553L19.5912 11.563L23.1715 7L17.2893 15.5329L20.3205 19.7315H19.7165L16.9589 15.9104L14.1899 19.7315H13.5973L16.6512 15.5329L13.8024 11.563ZM20.537 11.9978V11.563H26.7701V11.9978H23.8985V19.7315H23.3971V11.9978H20.537ZM1 11.563H1.62673L10.269 24.4954L6.69757 19.7315L1.52418 12.1808L1.50139 19.7315H1V11.563ZM26.7196 19.1656C26.6171 19.1656 26.5403 19.0862 26.5403 18.9836C26.5403 18.8811 26.6171 18.8017 26.7196 18.8017C26.8232 18.8017 26.8988 18.8811 26.8988 18.9836C26.8988 19.0862 26.8232 19.1656 26.7196 19.1656ZM27.2123 18.6869H27.4805C27.4842 18.8322 27.5903 18.9299 27.7464 18.9299C27.9208 18.9299 28.0196 18.8249 28.0196 18.6283V17.3828H28.2927V18.6295C28.2927 18.9836 28.0878 19.1876 27.7488 19.1876C27.4305 19.1876 27.2123 18.9897 27.2123 18.6869ZM28.65 18.671H28.9208C28.9439 18.8383 29.1073 18.9446 29.3427 18.9446C29.5622 18.9446 29.7232 18.831 29.7232 18.6747C29.7232 18.5404 29.6207 18.4598 29.3878 18.4049L29.161 18.3499C28.8427 18.2754 28.6976 18.1216 28.6976 17.8627C28.6976 17.5489 28.9537 17.3401 29.3378 17.3401C29.6951 17.3401 29.9561 17.5489 29.972 17.8456H29.7061C29.6805 17.6832 29.539 17.5818 29.3342 17.5818C29.1183 17.5818 28.9744 17.6856 28.9744 17.8444C28.9744 17.9701 29.0671 18.0422 29.2964 18.0959L29.4903 18.1435C29.8512 18.2278 30 18.3743 30 18.6393C30 18.9763 29.739 19.1876 29.322 19.1876C28.9317 19.1876 28.6695 18.9861 28.65 18.671Z",
    fill: "black"
  }));
};
var NextIconLight = _ref3 => {
  var props = _extends$v({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M7.84278 11.563H13.3124V11.9978H8.34416V15.2697H13.0162V15.7045H8.34416V19.2968H13.3694V19.7315H7.84278V11.563ZM13.8024 11.563H14.3836L16.9589 15.1553L19.5912 11.563L23.1715 7L17.2893 15.5329L20.3205 19.7315H19.7165L16.9589 15.9104L14.1899 19.7315H13.5973L16.6512 15.5329L13.8024 11.563ZM20.537 11.9978V11.563H26.7701V11.9978H23.8985V19.7315H23.3971V11.9978H20.537ZM1 11.563H1.62673L10.269 24.4954L6.69757 19.7315L1.52418 12.1808L1.50139 19.7315H1V11.563ZM26.7196 19.1656C26.6171 19.1656 26.5403 19.0862 26.5403 18.9836C26.5403 18.8811 26.6171 18.8017 26.7196 18.8017C26.8232 18.8017 26.8988 18.8811 26.8988 18.9836C26.8988 19.0862 26.8232 19.1656 26.7196 19.1656ZM27.2123 18.6869H27.4805C27.4842 18.8322 27.5903 18.9299 27.7464 18.9299C27.9208 18.9299 28.0196 18.8249 28.0196 18.6283V17.3828H28.2927V18.6295C28.2927 18.9836 28.0878 19.1876 27.7488 19.1876C27.4305 19.1876 27.2123 18.9897 27.2123 18.6869ZM28.65 18.671H28.9208C28.9439 18.8383 29.1073 18.9446 29.3427 18.9446C29.5622 18.9446 29.7232 18.831 29.7232 18.6747C29.7232 18.5404 29.6207 18.4598 29.3878 18.4049L29.161 18.3499C28.8427 18.2754 28.6976 18.1216 28.6976 17.8627C28.6976 17.5489 28.9537 17.3401 29.3378 17.3401C29.6951 17.3401 29.9561 17.5489 29.972 17.8456H29.7061C29.6805 17.6832 29.539 17.5818 29.3342 17.5818C29.1183 17.5818 28.9744 17.6856 28.9744 17.8444C28.9744 17.9701 29.0671 18.0422 29.2964 18.0959L29.4903 18.1435C29.8512 18.2278 30 18.3743 30 18.6393C30 18.9763 29.739 19.1876 29.322 19.1876C28.9317 19.1876 28.6695 18.9861 28.65 18.671Z",
    fill: "white"
  }));
};

function _extends$w() {
  _extends$w = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$w.apply(this, arguments);
}
var NodeIcon = _ref => {
  var props = _extends$w({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Node_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M16.7587 0.20289C16.2903 -0.0676604 15.7127 -0.0676604 15.2443 0.20289L2.70125 7.44109C2.2322 7.71164 1.94345 8.21154 1.94345 8.75319V23.2408C1.94345 23.7819 2.2322 24.2819 2.70075 24.5529L15.2437 31.7969C15.7127 32.0676 16.2902 32.0676 16.7592 31.7969L29.2993 24.5529C29.7677 24.2818 30.0565 23.7819 30.0565 23.2408V8.75274C30.0565 8.21159 29.7677 7.71164 29.2988 7.44114L16.7587 0.20289Z",
    fill: "url(#Node_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M29.3237 7.4411L16.7456 0.202904C16.6215 0.131254 16.4886 0.0799036 16.3519 0.0462036L2.22934 24.2049C2.35104 24.3417 2.49359 24.4613 2.65214 24.553L15.2516 31.797C15.6085 32.003 16.0326 32.0512 16.4218 31.9436L29.6611 7.7006C29.5605 7.60075 29.4475 7.5125 29.3237 7.4411Z",
    fill: "url(#Node_Paint1_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M29.3308 24.5529C29.6963 24.3414 29.9691 23.99 30.0724 23.5889L16.2839 0.0329378C15.9239 -0.0387622 15.542 0.0157878 15.218 0.202888L2.72439 7.39754L16.221 31.9852C16.4137 31.959 16.6022 31.8966 16.7749 31.797L29.3308 24.5529Z",
    fill: "url(#Node_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M30.5002 24.32L30.4171 24.1779V24.3681L30.5002 24.32Z",
    fill: "url(#Node_Paint3_Linear_".concat(id, ")")
  })), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Node_Paint0_Linear_".concat(id),
    x1: "21.0998",
    y1: "5.59334",
    x2: "9.76805",
    y2: "28.71",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#41873F"
  }), React.createElement("stop", {
    offset: "0.3288",
    stopColor: "#418B3D"
  }), React.createElement("stop", {
    offset: "0.6352",
    stopColor: "#419637"
  }), React.createElement("stop", {
    offset: "0.9319",
    stopColor: "#3FA92D"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#3FAE2A"
  })), React.createElement("linearGradient", {
    id: "Node_Paint1_Linear_".concat(id),
    x1: "14.0908",
    y1: "17.6914",
    x2: "45.8868",
    y2: "-5.80125",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.1376",
    stopColor: "#41873F"
  }), React.createElement("stop", {
    offset: "0.4032",
    stopColor: "#54A044"
  }), React.createElement("stop", {
    offset: "0.7136",
    stopColor: "#66B848"
  }), React.createElement("stop", {
    offset: "0.9081",
    stopColor: "#6CC04A"
  })), React.createElement("linearGradient", {
    id: "Node_Paint2_Linear_".concat(id),
    x1: "1.49974",
    y1: "15.9939",
    x2: "30.5002",
    y2: "15.9939",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.0919",
    stopColor: "#6CC04A"
  }), React.createElement("stop", {
    offset: "0.2864",
    stopColor: "#66B848"
  }), React.createElement("stop", {
    offset: "0.5968",
    stopColor: "#54A044"
  }), React.createElement("stop", {
    offset: "0.8624",
    stopColor: "#41873F"
  })), React.createElement("linearGradient", {
    id: "Node_Paint3_Linear_".concat(id),
    x1: "1.49997",
    y1: "24.273",
    x2: "30.5002",
    y2: "24.273",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.0919",
    stopColor: "#6CC04A"
  }), React.createElement("stop", {
    offset: "0.2864",
    stopColor: "#66B848"
  }), React.createElement("stop", {
    offset: "0.5968",
    stopColor: "#54A044"
  }), React.createElement("stop", {
    offset: "0.8624",
    stopColor: "#41873F"
  })), React.createElement("clipPath", {
    id: "Node_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var NodeIconDark = _ref2 => {
  var props = _extends$w({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16.6639 2.17753C16.254 1.9408 15.7486 1.9408 15.3388 2.17753L4.36358 8.51096C3.95316 8.74769 3.7005 9.1851 3.7005 9.65905V22.3357C3.7005 22.8092 3.95316 23.2467 4.36314 23.4838L15.3383 29.8223C15.7486 30.0591 16.254 30.0591 16.6643 29.8223L27.6369 23.4838C28.0468 23.2466 28.2994 22.8092 28.2994 22.3357V9.65865C28.2994 9.18515 28.0468 8.74769 27.6364 8.511L16.6639 2.17753Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M27.7076 8.47054L16.7017 2.13711C16.5931 2.07442 16.4768 2.02949 16.3573 2L4 23.1388C4.10649 23.2586 4.23122 23.3632 4.36995 23.4434L15.3945 29.782C15.7068 29.9622 16.0779 30.0043 16.4184 29.9102L28.0028 8.6976C27.9148 8.61023 27.8159 8.53301 27.7076 8.47054Z",
    fill: "black",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    d: "M27.6644 23.4838C27.9842 23.2988 28.2229 22.9912 28.3133 22.6403L16.2484 2.02883C15.9334 1.96609 15.5992 2.01382 15.3157 2.17753L4.38382 8.47285L16.1934 29.9871C16.362 29.9641 16.5269 29.9096 16.6781 29.8224L27.6644 23.4838Z",
    fill: "black"
  }));
};
var NodeIconLight = _ref3 => {
  var props = _extends$w({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M16.6639 2.17753C16.254 1.9408 15.7486 1.9408 15.3388 2.17753L4.36358 8.51096C3.95316 8.74769 3.7005 9.1851 3.7005 9.65905V22.3357C3.7005 22.8092 3.95316 23.2467 4.36314 23.4838L15.3383 29.8223C15.7486 30.0591 16.254 30.0591 16.6643 29.8223L27.6369 23.4838C28.0468 23.2466 28.2994 22.8092 28.2994 22.3357V9.65865C28.2994 9.18515 28.0468 8.74769 27.6364 8.511L16.6639 2.17753Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M27.7076 8.47054L16.7017 2.13711C16.5931 2.07442 16.4768 2.02949 16.3573 2L4 23.1388C4.10649 23.2586 4.23122 23.3632 4.36995 23.4434L15.3945 29.782C15.7068 29.9622 16.0779 30.0043 16.4184 29.9102L28.0028 8.6976C27.9148 8.61023 27.8159 8.53301 27.7076 8.47054Z",
    fill: "white",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    d: "M27.6644 23.4838C27.9842 23.2988 28.2229 22.9912 28.3133 22.6403L16.2484 2.02883C15.9334 1.96609 15.5992 2.01382 15.3157 2.17753L4.38382 8.47285L16.1934 29.9871C16.362 29.9641 16.5269 29.9096 16.6781 29.8224L27.6644 23.4838Z",
    fill: "white"
  }));
};

function _extends$x() {
  _extends$x = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$x.apply(this, arguments);
}
var NuxtIcon = _ref => {
  var props = _extends$x({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.84071 27.2566L9.76991 27.115C9.62832 26.8319 9.62832 26.5487 9.69911 26.1947H2.0531L13.3805 6.08849L18.1239 14.6549L19.6814 13.5221L14.9381 4.95575C14.8673 4.81416 14.3009 3.9646 13.3805 3.9646C12.9558 3.9646 12.3186 4.10619 11.823 5.02655L0.353981 25.3451C0.283185 25.5575 -0.21239 26.4779 0.212388 27.2566C0.495574 27.6814 0.920353 28.1062 1.9115 28.1062H11.5398C10.5487 28.1062 10.0531 27.6814 9.84071 27.2566Z",
    fill: "#00C58E"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M31.646 25.4159L22.4425 8.84956C22.3009 8.70796 21.8053 7.78761 20.885 7.78761C20.4602 7.78761 19.823 8 19.3274 8.84956L18.1239 10.8319V14.6549L20.885 9.9115L30.0177 26.1947H26.5487C26.6067 26.5317 26.5572 26.8785 26.4071 27.1858L26.3363 27.2566C25.9115 28.0354 24.8496 28.1062 24.708 28.1062H30.0885C30.3009 28.1062 31.292 28.0354 31.7876 27.2566C32 26.9027 32.1416 26.2655 31.646 25.4159Z",
    fill: "#108775"
  }), React.createElement("path", {
    d: "M26.6195 27.2566V27.1858L26.6903 27.0442C26.7611 26.7611 26.8319 26.4779 26.7611 26.1947L26.4779 25.3451L19.2566 12.7434L18.1947 10.8319H18.1239L17.0619 12.7434L9.8407 25.3451L9.55752 26.1947C9.48896 26.5547 9.53863 26.9272 9.69911 27.2566C9.9823 27.6814 10.4071 28.1062 11.3982 28.1062H24.8496C25.0619 28.1062 26.1239 28.0354 26.6195 27.2566ZM18.1239 14.6549L24.708 26.1947H11.5398L18.1239 14.6549Z",
    fill: "white"
  }));
};
var NuxtIconDark = _ref2 => {
  var props = _extends$x({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.5768 25.388L10.5148 25.264C10.3909 25.0162 10.3909 24.7683 10.4529 24.4584H3.76017L13.6753 6.85909L17.8273 14.3574L19.1906 13.3659L15.0386 5.86757C14.9767 5.74363 14.4809 5 13.6753 5C13.3035 5 12.7458 5.12394 12.312 5.92954L2.2729 23.7148C2.21093 23.9007 1.77715 24.7063 2.14896 25.388C2.39684 25.7598 2.76866 26.1316 3.63623 26.1316H12.0641C11.1965 26.1316 10.7627 25.7598 10.5768 25.388Z",
    fill: "black",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.6634 23.7768L21.6074 9.2759C21.4835 9.15196 21.0497 8.34636 20.2441 8.34636C19.8722 8.34636 19.3145 8.53227 18.8807 9.2759L17.8273 11.011V14.3574L20.2441 10.2054L28.2381 24.4584H25.2016C25.2525 24.7535 25.2091 25.057 25.0777 25.326L25.0157 25.388C24.6439 26.0696 23.7144 26.1316 23.5904 26.1316H28.3001C28.486 26.1316 29.3536 26.0696 29.7874 25.388C29.9733 25.0781 30.0972 24.5204 29.6634 23.7768Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M25.2636 25.388V25.326L25.3256 25.2021C25.3875 24.9542 25.4495 24.7063 25.3875 24.4584L25.1397 23.7148L18.8188 12.6842L17.8892 11.011H17.8273L16.8977 12.6842L10.5768 23.7148L10.3289 24.4584C10.2689 24.7735 10.3124 25.0996 10.4529 25.388C10.7008 25.7598 11.0726 26.1316 11.9402 26.1316H23.7144C23.9003 26.1316 24.8298 26.0696 25.2636 25.388ZM17.8273 14.3574L23.5904 24.4584H12.0641L17.8273 14.3574Z",
    fill: "black"
  }));
};
var NuxtIconLight = _ref3 => {
  var props = _extends$x({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.5768 25.388L10.5148 25.264C10.3909 25.0162 10.3909 24.7683 10.4529 24.4584H3.76017L13.6753 6.85909L17.8273 14.3574L19.1906 13.3659L15.0386 5.86757C14.9767 5.74363 14.4809 5 13.6753 5C13.3035 5 12.7458 5.12394 12.312 5.92954L2.2729 23.7148C2.21093 23.9007 1.77715 24.7063 2.14896 25.388C2.39684 25.7598 2.76866 26.1316 3.63623 26.1316H12.0641C11.1965 26.1316 10.7627 25.7598 10.5768 25.388Z",
    fill: "white",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.6634 23.7768L21.6074 9.2759C21.4835 9.15196 21.0497 8.34636 20.2441 8.34636C19.8722 8.34636 19.3145 8.53227 18.8807 9.2759L17.8273 11.011V14.3574L20.2441 10.2054L28.2381 24.4584H25.2016C25.2525 24.7535 25.2091 25.057 25.0777 25.326L25.0157 25.388C24.6439 26.0696 23.7144 26.1316 23.5904 26.1316H28.3001C28.486 26.1316 29.3536 26.0696 29.7874 25.388C29.9733 25.0781 30.0972 24.5204 29.6634 23.7768Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M25.2636 25.388V25.326L25.3256 25.2021C25.3875 24.9542 25.4495 24.7063 25.3875 24.4584L25.1397 23.7148L18.8188 12.6842L17.8892 11.011H17.8273L16.8977 12.6842L10.5768 23.7148L10.3289 24.4584C10.2689 24.7735 10.3124 25.0996 10.4529 25.388C10.7008 25.7598 11.0726 26.1316 11.9402 26.1316H23.7144C23.9003 26.1316 24.8298 26.0696 25.2636 25.388ZM17.8273 14.3574L23.5904 24.4584H12.0641L17.8273 14.3574Z",
    fill: "white"
  }));
};

function _extends$y() {
  _extends$y = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$y.apply(this, arguments);
}
var ParcelIcon = _ref => {
  var props = _extends$y({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M17.5656 27.9156L26.3486 22.3624C26.3808 22.342 26.4233 22.3517 26.4436 22.3838C26.464 22.416 26.4543 22.4585 26.4221 22.4789L17.6103 28.0503C17.5992 28.0574 17.5864 28.061 17.5735 28.061L17.5656 27.9156Z",
    fill: "url(#Parcel_Paint0_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M17.5735 28.061C17.5654 28.061 17.5573 28.0595 17.5495 28.0567L5.5756 23.5947C5.53993 23.5815 5.52174 23.5418 5.53501 23.5062C5.54828 23.4705 5.58796 23.4525 5.62359 23.4656L17.5656 27.9157L17.5735 28.061Z",
    fill: "url(#Parcel_Paint1_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M30.1391 6.72397L28.7561 9.01281L23.2029 11.3737L22.8943 11.5048L17.9025 16.1726C17.806 16.2683 17.7407 16.4061 17.7296 16.482C17.7241 16.5084 17.7025 16.497 17.6804 16.4958C17.658 16.4946 17.6261 16.5037 17.6245 16.4761C17.6226 16.3761 17.6104 16.2651 17.4489 16.1643L14.9483 14.544L14.9479 14.5436L13.1256 13.3629L7.98811 12.0449L3.68838 10.9418L0.96492 6.71058L1.00626 6.66295L1.00901 6.6598L11.2336 4.00248C11.2485 3.99736 11.2513 4.00051 11.2568 4.00878L14.7444 9.23248L14.8129 9.33523C14.8877 9.44546 14.8956 9.51238 14.8952 9.56199H14.9593C14.9589 9.55844 14.9589 9.55451 14.9589 9.55018C14.9589 9.54506 14.9593 9.53955 14.9597 9.53325C14.9597 9.52931 14.9605 9.52538 14.9609 9.52105C14.9617 9.51593 14.9621 9.51081 14.9633 9.50569C14.9641 9.50057 14.9648 9.49546 14.9656 9.48994C14.9692 9.47223 14.9739 9.45255 14.9798 9.43247C14.9814 9.42656 14.983 9.42026 14.9849 9.41436C14.9912 9.39389 14.9979 9.37302 15.0054 9.35255C15.0085 9.34468 15.0117 9.3368 15.0148 9.32893C15.0247 9.30452 15.0349 9.28169 15.0456 9.26122C15.0558 9.24153 15.066 9.22461 15.0759 9.21122L18.2202 4.63905C18.228 4.62803 18.2316 4.62252 18.2473 4.62528L30.1186 6.66807L30.1391 6.72397Z",
    fill: "#E8B57E"
  }), React.createElement("path", {
    d: "M14.9482 14.5439L14.9478 14.5436L13.1255 13.3629L7.98799 12.0449L14.895 9.56197L14.9132 9.52536L14.9136 9.56197L14.9482 14.5439Z",
    fill: "url(#Parcel_Paint2_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M14.8952 9.56197L7.98811 12.0449L7.36531 11.8851L3.68838 10.9418L0.96492 6.71058L1.00901 6.65979L11.2336 4.00248C11.2485 3.99736 11.2513 4.00051 11.2568 4.00878L14.7444 9.23246L14.8129 9.33521C14.8877 9.44544 14.8956 9.51237 14.8952 9.56197Z",
    fill: "url(#Parcel_Paint3_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M14.9153 9.79859L8.38421 12.1465L7.36538 11.8851L14.7444 9.23248L14.8129 9.33523C14.8877 9.44546 14.8956 9.51239 14.8952 9.56199H14.9137L14.9153 9.79859Z",
    fill: "url(#Parcel_Paint4_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M3.78163 10.9658L3.68833 10.9418L0.964874 6.71057L1.00621 6.66293L3.78163 10.9658Z",
    fill: "#D1A578"
  }), React.createElement("path", {
    d: "M23.2028 11.3737L22.8942 11.5048L17.9024 16.1726C17.8059 16.2683 17.7406 16.4061 17.7296 16.482C17.7241 16.5084 17.7024 16.497 17.6804 16.4958C17.6579 16.4946 17.626 16.5037 17.6245 16.4761C17.6225 16.3761 17.6103 16.2651 17.4489 16.1643L14.9478 14.5436L14.9136 9.56197L14.9132 9.52536L14.9593 9.56197L23.2028 11.3737Z",
    fill: "url(#Parcel_Paint5_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M30.139 6.72397L28.7561 9.0128L23.7008 11.1619L23.2028 11.3737L14.9592 9.56198C14.9537 9.4986 14.9978 9.35333 15.0454 9.26121C15.0557 9.24153 15.0659 9.2246 15.0758 9.21121L18.2201 4.63905C18.2279 4.62803 18.2315 4.62252 18.2472 4.62528L30.1186 6.66806L30.139 6.72397Z",
    fill: "url(#Parcel_Paint6_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M23.7008 11.1619L22.8942 11.5048L22.791 11.6052L14.9136 9.86432L14.9498 9.56197H14.9593C14.9538 9.49859 14.9979 9.35332 15.0455 9.2612L23.7008 11.1619Z",
    fill: "url(#Parcel_Paint7_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    opacity: "0.75",
    d: "M15.1321 9.59977V14.6632L14.9482 14.544L14.9478 14.5436L14.7065 14.3873V9.62969L14.8951 9.56198H14.9592L15.1321 9.59977Z",
    fill: "url(#Parcel_Paint8_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M17.5244 27.9793L5.5407 23.5086C5.47334 23.4798 5.46314 23.4155 5.45889 23.337C5.45889 23.337 4.94329 13.1247 4.94321 13.1233C4.94223 13.0968 4.97498 13.0808 4.97191 13.0651C4.96341 13.0261 4.89003 12.8801 4.86609 12.865L5.34058e-05 10.0993L0.0411138 10.0059L13.1255 13.3631L17.449 16.1645C17.6102 16.2649 17.6227 16.3761 17.6245 16.4761C17.6259 16.5037 17.658 16.4947 17.6803 16.4958C17.7025 16.497 17.724 16.5082 17.7295 16.4819C17.7408 16.4062 17.8061 16.2682 17.9026 16.1727L22.8942 11.5047L31.9451 7.65732L31.9998 7.73314L27.1141 12.0267C27.0195 12.122 26.9754 12.2385 26.9945 12.2858L26.4945 22.2951C26.487 22.3589 26.4571 22.3777 26.3928 22.4214L17.6327 27.9666C17.5958 27.9895 17.559 27.9951 17.5244 27.9793Z",
    fill: "#BF9064"
  }), React.createElement("path", {
    d: "M17.6804 16.4958L17.5942 27.9841C17.5702 27.9908 17.5469 27.9896 17.5245 27.9793L5.54058 23.5088C5.47326 23.48 5.46303 23.4155 5.45909 23.3371C5.45909 23.3371 4.94337 13.1248 4.94337 13.1232V13.1205C4.94337 13.1181 4.94377 13.1157 4.94456 13.1134C4.94495 13.1114 4.94574 13.1094 4.94652 13.1079C4.94771 13.1055 4.94889 13.1035 4.95007 13.1012C4.95125 13.0992 4.95282 13.0972 4.9544 13.0953C4.95991 13.0874 4.9666 13.0807 4.96975 13.0744C4.97093 13.0728 4.97133 13.0716 4.97133 13.0701C4.97172 13.0697 4.97172 13.0697 4.97172 13.0693L17.6253 16.4809C17.63 16.5025 17.6595 16.4946 17.6804 16.4958Z",
    fill: "#BE8F63"
  }), React.createElement("path", {
    opacity: "0.54",
    d: "M17.5946 27.951L17.5942 27.984C17.5702 27.9907 17.5469 27.9896 17.5245 27.9793L5.54058 23.5088C5.49295 23.4887 5.47405 23.4505 5.46578 23.4021L17.5946 27.951Z",
    fill: "url(#Parcel_Paint9_lLnear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M12.1768 20.9821L12.252 25.3527L16.8056 27.0251L16.8175 22.5006L12.1768 20.9821ZM12.2248 21.0621L14.418 21.7817L14.4365 23.9174L12.263 23.1702L12.2248 21.0621ZM12.3008 25.3087L12.2673 23.245L14.4361 24.002L14.4487 26.0929L12.3008 25.3087ZM16.7612 26.9448L14.5129 26.1188L14.5018 24.0225L16.7612 24.8079V26.9448ZM16.7612 24.7311L14.5018 23.9442L14.4971 21.8065L16.7612 22.5478V24.7311Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M16.2685 24.3832L14.9194 23.9174V23.6531L16.2685 24.1145V24.3832Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M15.1023 23.6668L15.3262 23.7447V22.8082L15.55 22.8842L15.223 22.2378L14.8813 22.666L15.1044 22.7377L15.1023 23.6668Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M15.8406 23.9126L16.0644 23.9905V23.0541L16.2883 23.13L15.9613 22.4837L15.6196 22.9118L15.8427 22.9836L15.8406 23.9126Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M15.166 24.7001L15.0994 24.742L16.0766 26.2974L16.1433 26.2555L15.166 24.7001Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M16.0652 25.0333L15.1034 25.8761L15.1812 25.9649L16.143 25.1221L16.0652 25.0333Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M15.0575 24.8796V25.7004L15.1478 25.7322V24.9088L15.0575 24.8796Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M16.1029 25.2612V26.082L16.1931 26.1138V25.2904L16.1029 25.2612Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M15.3837 24.9565L15.6212 25.3381L15.8587 25.1288L15.3837 24.9565Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M15.9872 25.3576V25.8949L15.7438 25.5522L15.9872 25.3576Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M15.8596 26.0836L15.3914 25.9143L15.6255 25.705L15.8596 26.0836Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M15.26 25.6379V25.1005L15.4926 25.4587L15.26 25.6379Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M14.6244 25.0265L14.7402 25.0694V24.8708L14.9933 25.2699L14.7422 25.4792L14.7471 25.2835L14.6244 25.2543V25.0265Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M16.6208 25.9902V25.7576L16.503 25.7196V25.5133L16.2432 25.7352L16.503 26.1303V25.9434L16.6208 25.9902Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M13.3173 24.1047L13.3306 25.4033C13.3309 25.4623 13.3018 25.4852 13.2379 25.4709C13.1625 25.4539 13.155 25.397 13.1557 25.2981L13.0934 25.2884C13.0804 25.4357 13.1274 25.5225 13.2394 25.5493C13.363 25.5741 13.4127 25.5094 13.4127 25.4364L13.4049 24.1321L13.3173 24.1047Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M12.6787 24.4785C12.8792 23.8731 13.7854 24.0765 14.057 24.9691C13.9743 24.8299 13.9023 24.8046 13.7728 24.8475C13.7251 24.7482 13.5859 24.6966 13.5012 24.7492C13.4389 24.6304 13.2968 24.5934 13.2297 24.6518C13.2014 24.5798 13.0651 24.4815 12.962 24.5544C12.8918 24.4386 12.7546 24.3958 12.6787 24.4785Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M13.7557 24.1632C13.746 24.1549 13.6706 24.1871 13.6628 24.2167C13.655 24.2464 13.6647 24.2669 13.6823 24.28C13.6998 24.2932 13.7212 24.2927 13.7343 24.2864C13.7654 24.2659 13.7654 24.1715 13.7557 24.1632Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M13.8816 23.949C13.8718 23.9407 13.7964 23.9729 13.7886 24.0026C13.7808 24.0323 13.7906 24.0527 13.8081 24.0658C13.8256 24.079 13.847 24.0785 13.8602 24.0722C13.8913 24.0517 13.8913 23.9573 13.8816 23.949Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M13.5313 23.9406C13.5215 23.9323 13.4461 23.9644 13.4383 23.9941C13.4305 24.0238 13.4402 24.0442 13.4578 24.0574C13.4753 24.0705 13.4967 24.07 13.5099 24.0637C13.541 24.0433 13.541 23.9488 13.5313 23.9406Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M13.1783 23.8893C13.1685 23.881 13.0931 23.9131 13.0853 23.9428C13.0775 23.9725 13.0873 23.9929 13.1048 24.0061C13.1224 24.0192 13.1437 24.0187 13.1569 24.0124C13.188 23.992 13.188 23.8976 13.1783 23.8893Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M12.8259 23.1243L13.8421 23.4773L13.4216 23.2073L13.4203 22.7012C13.7123 22.8206 13.92 22.5805 13.92 22.3884V21.8849L13.0037 21.5825L13.0828 21.9485L13.005 21.9498L13.1413 22.4754L12.878 21.8376L12.97 21.8434L12.8869 21.5449L12.7091 21.4865L12.726 21.9965C12.726 22.2094 12.9363 22.5572 13.2257 22.6441L13.2335 23.1451L12.8259 23.1243Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M17.6804 16.4958C17.6308 16.497 17.5934 16.5631 17.5922 16.623L17.5804 16.6285L4.9434 13.1232C4.94221 13.0992 4.96938 13.0838 4.97174 13.0692C4.97253 13.0677 4.97253 13.0665 4.97213 13.0649C4.96347 13.0263 4.89025 12.8803 4.86624 12.8649L0 10.0993L0.0413362 10.006L13.124 13.3625L13.1256 13.3629L17.4489 16.1643C17.6103 16.2651 17.6225 16.3761 17.6245 16.4761C17.6245 16.4777 17.6249 16.4793 17.6253 16.4808C17.63 16.5025 17.6595 16.4946 17.6804 16.4958Z",
    fill: "url(#Parcel_Paint10_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M11.9994 17.641C12.0129 17.6452 12.0182 17.6465 12.0179 17.6342L11.9705 15.0913C11.9673 15.0044 11.9451 14.8352 11.8414 14.7665L7.23221 11.9661L5.07257 11.4087L9.75611 14.2073C9.87421 14.2842 9.88405 14.43 9.88877 14.5372L9.95602 17.0098C9.95629 17.0226 9.95814 17.0251 9.96771 17.0289L11.9994 17.641Z",
    fill: "url(#Parcel_Paint11_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M17.6804 16.4958C17.6292 16.497 17.591 16.5671 17.5922 16.6285C17.5914 16.6332 17.5819 16.632 17.5804 16.6285C17.5709 16.4919 17.5142 16.3403 17.4398 16.286L13.0815 13.4759L13.124 13.3625L13.1256 13.3629L17.4489 16.1643C17.6103 16.2651 17.6225 16.3761 17.6245 16.4761C17.6245 16.4777 17.6248 16.4793 17.6252 16.4808C17.63 16.5025 17.6595 16.4946 17.6804 16.4958Z",
    fill: "#D4A271"
  }), React.createElement("path", {
    d: "M13.124 13.3625L13.0815 13.4759L0 10.0993L0.0413362 10.006L13.124 13.3625Z",
    fill: "#DEB37E"
  }), React.createElement("path", {
    d: "M26.9944 12.2858L26.4944 22.295C26.4869 22.3588 26.457 22.3777 26.3929 22.4214L17.6328 27.9667C17.6198 27.975 17.6068 27.9809 17.5942 27.984L17.6804 16.4958C17.7024 16.497 17.7241 16.5084 17.7296 16.482C17.73 16.4789 17.7304 16.4757 17.7312 16.4726L26.992 12.2764C26.9924 12.2799 26.9932 12.2831 26.9944 12.2858Z",
    fill: "#DBAC76"
  }), React.createElement("path", {
    opacity: "0.54",
    d: "M26.4948 22.2903L26.4944 22.295C26.4869 22.3588 26.457 22.3777 26.3929 22.4214L17.6328 27.9667C17.6198 27.975 17.6068 27.9809 17.5942 27.9841L17.5946 27.951L26.4948 22.2903Z",
    fill: "url(#Parcel_Paint12_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M23.3683 19.5825L23.2188 23.8236L26.1317 22.01L26.3322 17.9345L23.3683 19.5825ZM23.4033 19.6272L24.8653 18.8076L24.7773 20.8187L23.3264 21.6742L23.4033 19.6272ZM23.2581 23.7434L23.3264 21.7366L24.774 20.8857L24.699 22.8473L23.2581 23.7434ZM26.1035 21.9692L24.739 22.8277L24.8152 20.8615L26.195 20.0448L26.1035 21.9692ZM26.2008 19.9728L24.8127 20.8031L24.8997 18.7923L26.2991 18.0095L26.2008 19.9728Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.9185 19.9815L25.0989 20.4672L25.1096 20.2258L25.9359 19.7433L25.9185 19.9815Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.2299 20.1041L25.3597 20.0292L25.4008 19.1707L25.5379 19.0938L25.3559 18.7122L25.1242 19.3235L25.2546 19.2457L25.2299 20.1041Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.6732 19.8471L25.8128 19.7694L25.8426 18.9167L25.9876 18.8349L25.8114 18.4592L25.5807 19.0656L25.717 18.9877L25.6732 19.8471Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.7165 21.8556L25.176 21.1171L25.2214 21.0321L25.7556 21.7698L25.7165 21.8556Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.1715 22.1917L25.1294 22.1541L25.7688 20.7073L25.8089 20.7455L25.1715 22.1917Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.1417 21.2841L25.11 22.0351L25.1665 21.9977L25.1983 21.2444L25.1417 21.2841Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.7782 20.8939L25.7445 21.646L25.7944 21.6129L25.8302 20.8608L25.7782 20.8939Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.3415 21.1171L25.4752 21.2982L25.6303 20.9432L25.3415 21.1171Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.7011 21.0788L25.6808 21.5591L25.551 21.404L25.7011 21.0788Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.5966 21.8147L25.3084 21.9897L25.4629 21.6376L25.5966 21.8147Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M25.2389 21.8167L25.2611 21.3469L25.3935 21.511L25.2389 21.8167Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M24.8522 21.72L24.9228 21.6787L24.9281 21.4916L25.0845 21.6817L24.9189 22.0392L24.9184 21.8816L24.8483 21.9245L24.8522 21.72Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M26.0678 21.2001L26.0761 20.9958L26.0034 21.0354L26.0112 20.8505L25.8438 21.2294L25.995 21.4098L25.998 21.2413L26.0678 21.2001Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M24.0271 21.7862L23.9823 23.0068C23.9802 23.0606 23.9911 23.1178 23.9308 23.1538C23.8809 23.1835 23.8564 23.1561 23.8607 23.0652L23.812 23.1032C23.798 23.2475 23.9006 23.2336 23.9397 23.2154C24.0232 23.1644 24.0273 23.093 24.0301 23.0262L24.0821 21.7466L24.0271 21.7862Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M23.5599 22.634C23.7167 21.9157 24.3328 21.4406 24.4846 22.0743C24.4371 22.0079 24.3513 22.0344 24.2929 22.1687C24.2662 22.113 24.1332 22.159 24.1128 22.2758C24.0775 22.213 23.9512 22.2807 23.9327 22.3841C23.9175 22.339 23.7733 22.3671 23.7556 22.4958C23.7152 22.4415 23.6028 22.4948 23.5599 22.634Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M24.3107 21.537C24.3048 21.5366 24.2553 21.6215 24.2491 21.6544C24.243 21.6874 24.2484 21.6989 24.2591 21.698C24.2698 21.6971 24.2836 21.6809 24.2922 21.6654C24.313 21.6238 24.3166 21.5374 24.3107 21.537Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M24.4074 21.2328C24.4015 21.2324 24.352 21.3174 24.3459 21.3503C24.3397 21.3832 24.3451 21.3947 24.3558 21.3938C24.3665 21.393 24.3803 21.3767 24.3889 21.3613C24.4096 21.3196 24.4133 21.2332 24.4074 21.2328Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M24.1737 21.4802C24.1677 21.4798 24.1182 21.5648 24.112 21.5977C24.1059 21.6306 24.1113 21.6421 24.1221 21.6412C24.1328 21.6404 24.1465 21.6241 24.1551 21.6087C24.1759 21.567 24.1796 21.4806 24.1737 21.4802Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M23.9312 21.6923C23.9253 21.6919 23.8758 21.7769 23.8697 21.8098C23.8635 21.8427 23.869 21.8542 23.8797 21.8533C23.8904 21.8525 23.9041 21.8362 23.9127 21.8208C23.9335 21.7791 23.9371 21.6927 23.9312 21.6923Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M23.7284 21.2002L24.4069 20.8079L24.1286 20.8673L24.151 20.3806C24.3602 20.2482 24.4999 19.9312 24.5073 19.7555L24.5257 19.2408L23.9222 19.5883L23.9611 19.892L23.9114 19.9489L23.9676 20.3356L23.8209 19.9114L23.8871 19.8579L23.8472 19.6301L23.7245 19.6963L23.708 20.1693C23.6998 20.364 23.8443 20.5567 24.0253 20.4526L24.0097 20.9305L23.7284 21.2002Z",
    fill: "#322212"
  }), React.createElement("path", {
    d: "M27.114 12.0268C27.0196 12.122 26.9755 12.2386 26.9944 12.2858L17.7902 16.6403L17.7709 16.6253C17.7701 16.5533 17.7233 16.5045 17.6882 16.4966C17.7075 16.4993 17.7249 16.5052 17.7296 16.482C17.7319 16.4671 17.7363 16.4497 17.7426 16.4304C17.7481 16.4139 17.7548 16.3962 17.7634 16.3777C17.7898 16.3182 17.83 16.2521 17.8804 16.1958C17.8874 16.1879 17.8949 16.1801 17.9024 16.1726L22.8942 11.5048L31.9452 7.65735L32 7.73333L27.114 12.0268Z",
    fill: "#CE9C6B"
  }), React.createElement("path", {
    d: "M22.9678 11.6028L18.0185 16.2033C17.878 16.3375 17.7859 16.5367 17.7902 16.6403C17.7875 16.6454 17.7756 16.6485 17.7705 16.6403C17.7768 16.5604 17.7256 16.5048 17.6882 16.4966C17.7075 16.4993 17.7249 16.5052 17.7296 16.482C17.7319 16.4671 17.7363 16.4497 17.7426 16.4304C17.7481 16.4139 17.7548 16.3962 17.7634 16.3777C17.7934 16.31 17.8418 16.2328 17.9024 16.1726L22.8942 11.5048L22.9678 11.6028Z",
    fill: "#D7A977"
  }), React.createElement("path", {
    d: "M21.8762 17.1834C21.8762 17.1977 21.882 17.2028 21.8916 17.1994L23.3782 16.437C23.3811 16.4353 23.3824 16.4331 23.3826 16.4284L23.4649 13.9919C23.4671 13.858 23.5422 13.7257 23.6445 13.6343L28.5804 9.19818L27.0785 9.84168L22.1174 14.3364C21.9896 14.4614 21.946 14.6091 21.9435 14.7333L21.8762 17.1834Z",
    fill: "url(#Parcel_Paint13_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M22.9678 11.6029L31.9999 7.73314L31.9452 7.65732L22.8943 11.5047L22.9678 11.6029Z",
    fill: "#F8CE92"
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Parcel_Paint0_lLnear_".concat(id),
    x1: "21.9545",
    y1: "25.1369",
    x2: "22.0345",
    y2: "25.2634",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", null), React.createElement("stop", {
    offset: "1",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint1_lLnear_".concat(id),
    x1: "11.5704",
    y1: "25.7402",
    x2: "11.5461",
    y2: "25.8054",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", null), React.createElement("stop", {
    offset: "1",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint2_lLnear_".concat(id),
    x1: "12.7361",
    y1: "11.318",
    x2: "15.0914",
    y2: "12.2943",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.3927",
    stopColor: "#C37A45"
  }), React.createElement("stop", {
    offset: "0.432",
    stopColor: "#BD7440"
  }), React.createElement("stop", {
    offset: "0.6362",
    stopColor: "#A1582A"
  }), React.createElement("stop", {
    offset: "0.7542",
    stopColor: "#964D22"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint3_lLnear_".concat(id),
    x1: "9.80667",
    y1: "10.7513",
    x2: "6.72967",
    y2: "6.43247",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#E9B880"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#E4AE76"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint4_lLnear_".concat(id),
    x1: "11.2242",
    y1: "10.9542",
    x2: "11.0767",
    y2: "10.5477",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.1126",
    stopColor: "#C37A45",
    stopOpacity: "0"
  }), React.createElement("stop", {
    offset: "0.1334",
    stopColor: "#C37A45"
  }), React.createElement("stop", {
    offset: "0.2525",
    stopColor: "#CE8A52"
  }), React.createElement("stop", {
    offset: "0.4755",
    stopColor: "#DFA167"
  }), React.createElement("stop", {
    offset: "0.6843",
    stopColor: "#E9AF73"
  }), React.createElement("stop", {
    offset: "0.8631",
    stopColor: "#ECB477"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#ECB477",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint5_lLnear_".concat(id),
    x1: "18.8451",
    y1: "10.9389",
    x2: "16.7643",
    y2: "15.7212",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.0881",
    stopColor: "#AF6938"
  }), React.createElement("stop", {
    offset: "0.4471",
    stopColor: "#9B5326"
  }), React.createElement("stop", {
    offset: "0.7792",
    stopColor: "#8D4419"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint6_lLnear_".concat(id),
    x1: "21.2053",
    y1: "10.486",
    x2: "23.5478",
    y2: "6.27437",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.0327",
    stopColor: "#E4AE76"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#E9B880"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint7_lLnear_".concat(id),
    x1: "19.2744",
    y1: "10.5865",
    x2: "19.367",
    y2: "10.176",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#AF6938",
    stopOpacity: "0"
  }), React.createElement("stop", {
    offset: "0.086",
    stopColor: "#AF6938"
  }), React.createElement("stop", {
    offset: "0.1429",
    stopColor: "#B4703E"
  }), React.createElement("stop", {
    offset: "0.5645",
    stopColor: "#D79D66"
  }), React.createElement("stop", {
    offset: "0.7771",
    stopColor: "#E4AE76"
  }), React.createElement("stop", {
    offset: "0.9239",
    stopColor: "#E4AE76",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint8_lLnear_".concat(id),
    x1: "14.7412",
    y1: "12.1126",
    x2: "15.1036",
    y2: "12.1126",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#743E18",
    stopOpacity: "0"
  }), React.createElement("stop", {
    offset: "0.4929",
    stopColor: "#743E18",
    stopOpacity: "0.8872"
  }), React.createElement("stop", {
    offset: "0.5",
    stopColor: "#743E18",
    stopOpacity: "0.9"
  }), React.createElement("stop", {
    offset: "0.5297",
    stopColor: "#743E18",
    stopOpacity: "0.8466"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#743E18",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint9_lLnear_".concat(id),
    x1: "11.5186",
    y1: "25.7235",
    x2: "11.5303",
    y2: "25.6922",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#322212"
  }), React.createElement("stop", {
    offset: "0.2397",
    stopColor: "#322212",
    stopOpacity: "0.9891"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#322212",
    stopOpacity: "0"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint10_Linear_".concat(id),
    x1: "9.08402",
    y1: "12.4839",
    x2: "8.61265",
    y2: "14.057",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.0476",
    stopColor: "#C69867"
  }), React.createElement("stop", {
    offset: "0.4313",
    stopColor: "#BB8C5F"
  }), React.createElement("stop", {
    offset: "0.8135",
    stopColor: "#B6875B"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint11_Linear_".concat(id),
    x1: "11.775",
    y1: "16.8622",
    x2: "6.24594",
    y2: "10.7215",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.4202",
    stopColor: "#835F36"
  }), React.createElement("stop", {
    offset: "0.4308",
    stopColor: "#91663D"
  }), React.createElement("stop", {
    offset: "0.4407",
    stopColor: "#976A40"
  }), React.createElement("stop", {
    offset: "0.8737",
    stopColor: "#976A40"
  }), React.createElement("stop", {
    offset: "0.8982",
    stopColor: "#AB8157"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint12_Linear_".concat(id),
    x1: "22.0449",
    y1: "25.1378",
    x2: "22.0546",
    y2: "25.1532",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#322212",
    stopOpacity: "0"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#322212"
  })), React.createElement("linearGradient", {
    id: "Parcel_Paint13_Linear_".concat(id),
    x1: "24.1986",
    y1: "17.3203",
    x2: "25.8723",
    y2: "8.8569",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.3676",
    stopColor: "#A9794B"
  }), React.createElement("stop", {
    offset: "0.3857",
    stopColor: "#AE7F53"
  }), React.createElement("stop", {
    offset: "0.4167",
    stopColor: "#AD7E51"
  }), React.createElement("stop", {
    offset: "0.6236",
    stopColor: "#A9794B"
  }), React.createElement("stop", {
    offset: "0.6426",
    stopColor: "#B2875D"
  }))));
};
var ParcelIconDark = _ref2 => {
  var props = _extends$y({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.68827 10.9417L0.964905 6.71058L1.00624 6.66295L1.00745 6.66157L1.00899 6.65979L11.2336 4.00248C11.2485 3.99736 11.2513 4.00051 11.2568 4.00878L14.7444 9.23246V9.23248L14.8129 9.33521C14.8409 9.37655 14.8596 9.41179 14.8719 9.44232C14.8924 9.4932 14.8954 9.53097 14.8952 9.56197C14.8952 9.56198 14.8952 9.56198 14.8952 9.56199H14.9593C14.9589 9.55846 14.9589 9.55455 14.9589 9.55024V9.55018C14.9589 9.54565 14.9592 9.54082 14.9596 9.5354L14.9597 9.53325C14.9597 9.53073 14.9601 9.52822 14.9604 9.5256L14.9609 9.52105L14.9616 9.51592C14.9617 9.51524 14.9618 9.51455 14.9619 9.51387C14.9623 9.51115 14.9626 9.50842 14.9633 9.50569L14.9656 9.48994C14.9692 9.47223 14.9739 9.45255 14.9798 9.43247C14.9814 9.42656 14.983 9.42026 14.9849 9.41436C14.9912 9.39389 14.9979 9.37302 15.0054 9.35255L15.0148 9.32893C15.0247 9.30452 15.0349 9.28169 15.0456 9.26122C15.0558 9.24153 15.066 9.22461 15.0759 9.21122L18.2202 4.63905L18.2207 4.63835L18.2207 4.63833C18.2282 4.62779 18.2319 4.62258 18.2473 4.62528L30.1186 6.66807L30.1391 6.72397L28.7561 9.01281L25.3601 10.4566L31.9452 7.65735L32 7.73333L27.114 12.0268C27.0253 12.1163 26.981 12.2247 26.9917 12.2765L26.992 12.2764C26.9923 12.2786 26.9927 12.2807 26.9933 12.2826L26.9944 12.2858L26.4944 22.295C26.4871 22.3572 26.4585 22.3767 26.3975 22.4182L26.3929 22.4214L17.6328 27.9667C17.6198 27.975 17.6068 27.9809 17.5942 27.984L17.5947 27.9152C17.5902 27.9138 17.5856 27.9121 17.5811 27.9101L5.59721 23.4395C5.52989 23.4107 5.51965 23.3462 5.51572 23.2678L5.00435 13.1401L4.9434 13.1232C4.94269 13.1089 4.95203 13.0977 4.96021 13.0878C4.96576 13.0811 4.97078 13.0751 4.97174 13.0692C4.97253 13.0677 4.97253 13.0665 4.97213 13.0649C4.96347 13.0263 4.89025 12.8803 4.86624 12.8649L0 10.0993L0.0413362 10.006L3.68827 10.9417ZM22.7586 11.6316L15.0461 9.93661L15 9.9L15.0004 9.93661L15.0324 14.5985L17.4489 16.1643C17.5674 16.2383 17.6055 16.3178 17.6181 16.3944L17.6819 16.4116C17.6855 16.4281 17.7035 16.4274 17.7211 16.4267L17.7214 16.4267C17.7268 16.4265 17.7321 16.4263 17.737 16.4266L17.7368 16.4495C17.7385 16.4433 17.7405 16.437 17.7426 16.4304C17.7481 16.4139 17.7548 16.3962 17.7634 16.3777C17.7898 16.3182 17.83 16.2521 17.8804 16.1958C17.8874 16.1879 17.8949 16.1801 17.9024 16.1726L22.7586 11.6316ZM14.9482 14.5439L13.1256 13.3629L13.124 13.3625L8.59744 12.2012L14.8971 9.93661L14.9152 9.9L14.9156 9.93661L14.9476 14.5434L14.9479 14.5436L14.9482 14.5439ZM12.3086 25.2835L12.2334 20.9129L16.8741 22.4313L16.8623 26.9558L12.3086 25.2835ZM14.4746 21.7124L12.2814 20.9928L12.3196 23.1009L14.4931 23.8481L14.4746 21.7124ZM12.324 23.1757L12.3574 25.2394L14.5053 26.0236L14.4927 23.9328L12.324 23.1757ZM14.5695 26.0496L16.8178 26.8755V24.7386L14.5585 23.9532L14.5695 26.0496ZM14.5585 23.8749L16.8178 24.6618V22.4785L14.5538 21.7372L14.5585 23.8749ZM15.159 23.5975L15.3828 23.6754V22.7389L15.6067 22.8149L15.2796 22.1685L14.938 22.5967L15.161 22.6684L15.159 23.5975ZM16.1211 23.9212L15.8972 23.8433L15.8993 22.9143L15.6762 22.8425L16.0179 22.4144L16.3449 23.0608L16.1211 22.9848V23.9212ZM12.8825 23.055L13.8987 23.408L13.4782 23.138L13.4769 22.6319C13.769 22.7513 13.9766 22.5112 13.9766 22.3191V21.8156L13.0603 21.5132L13.1395 21.8792L13.0616 21.8805L13.1979 22.4061L12.9346 21.7683L13.0266 21.7741L12.9435 21.4756L12.7658 21.4172L12.7826 21.9272C12.7826 22.1401 12.9929 22.4879 13.2823 22.5748L13.2901 23.0758L12.8825 23.055ZM13.3306 25.4033L13.3226 24.6251C13.2868 24.6224 13.2535 24.6311 13.2297 24.6518C13.2014 24.5798 13.0651 24.4815 12.962 24.5544C12.8918 24.4386 12.7546 24.3958 12.6787 24.4786C12.7762 24.1841 13.0406 24.081 13.3178 24.1554L13.3173 24.1048L13.4049 24.1321L13.4052 24.1846C13.6698 24.2907 13.9314 24.5561 14.057 24.9692C13.9743 24.83 13.9023 24.8046 13.7728 24.8475C13.7251 24.7482 13.5859 24.6966 13.5012 24.7492C13.4784 24.7056 13.4447 24.673 13.408 24.6521L13.4127 25.4364C13.4127 25.5094 13.363 25.5741 13.2394 25.5493C13.1274 25.5225 13.0804 25.4358 13.0934 25.2884L13.1557 25.2982C13.155 25.397 13.1625 25.4539 13.2379 25.4709C13.3018 25.4852 13.3309 25.4623 13.3306 25.4033ZM13.6628 24.2167C13.6706 24.187 13.746 24.1549 13.7557 24.1632C13.7654 24.1714 13.7654 24.2659 13.7343 24.2864C13.7212 24.2927 13.6998 24.2932 13.6823 24.28C13.6647 24.2669 13.655 24.2464 13.6628 24.2167ZM13.8816 23.949C13.8718 23.9407 13.7964 23.9729 13.7886 24.0026C13.7808 24.0323 13.7906 24.0527 13.8081 24.0658C13.8256 24.079 13.847 24.0785 13.8602 24.0722C13.8913 24.0517 13.8913 23.9573 13.8816 23.949ZM13.4383 23.9941C13.4461 23.9644 13.5216 23.9323 13.5313 23.9405C13.541 23.9488 13.541 24.0433 13.5099 24.0637C13.4967 24.07 13.4753 24.0705 13.4578 24.0574C13.4402 24.0442 13.4305 24.0238 13.4383 23.9941ZM13.1783 23.8893C13.1685 23.881 13.0931 23.9131 13.0853 23.9428C13.0775 23.9725 13.0873 23.9929 13.1048 24.0061C13.1224 24.0192 13.1437 24.0187 13.1569 24.0124C13.188 23.992 13.188 23.8976 13.1783 23.8893ZM14.7402 25.0693L14.6244 25.0265V25.2543L14.7471 25.2835L14.7422 25.4791L14.9933 25.2699L14.7402 24.8707V25.0693ZM16.6208 25.9901V25.7575L16.503 25.7196V25.5133L16.2432 25.7352L16.503 26.1303V25.9434L16.6208 25.9901ZM15.0994 24.7419L15.166 24.7L15.6203 25.4231L16.0652 25.0333L16.143 25.1221L15.6839 25.5243L16.1433 26.2554L16.0766 26.2973L15.624 25.5769L15.1812 25.9648L15.1034 25.8761L15.5603 25.4756L15.0994 24.7419ZM15.0575 25.7004V24.8796L15.1478 24.9088V25.7322L15.0575 25.7004ZM16.1029 25.2612V26.082L16.1931 26.1138V25.2904L16.1029 25.2612ZM15.6212 25.3381L15.3837 24.9564L15.8587 25.1287L15.6212 25.3381ZM15.9872 25.3575V25.8948L15.7438 25.5522L15.9872 25.3575ZM15.3914 25.9143L15.8596 26.0836L15.6255 25.705L15.3914 25.9143ZM15.26 25.6379V25.1005L15.4926 25.4587L15.26 25.6379ZM23.9823 23.0068L24.0093 22.272C23.9737 22.2951 23.9414 22.3357 23.9328 22.3841C23.9175 22.339 23.7733 22.3671 23.7556 22.4958C23.7152 22.4415 23.6028 22.4948 23.5599 22.634C23.6384 22.2743 23.8321 21.9757 24.0249 21.8466L24.0271 21.7862L24.0821 21.7466L24.0794 21.8147C24.2525 21.728 24.416 21.7878 24.4846 22.0743C24.4371 22.0079 24.3513 22.0344 24.2929 22.1687C24.2662 22.113 24.1332 22.159 24.1128 22.2758C24.1022 22.2569 24.0833 22.2498 24.0616 22.252L24.0301 23.0262C24.0273 23.093 24.0232 23.1644 23.9397 23.2154C23.9006 23.2336 23.798 23.2475 23.812 23.1032L23.8607 23.0652C23.8564 23.1561 23.8809 23.1835 23.9308 23.1538C23.9818 23.1233 23.9819 23.0777 23.9819 23.0319L23.982 23.0174L23.9823 23.0068ZM24.2491 21.6544C24.2553 21.6215 24.3048 21.5366 24.3107 21.537C24.3166 21.5374 24.313 21.6238 24.2922 21.6654C24.2836 21.6809 24.2698 21.6971 24.2591 21.698C24.2484 21.6988 24.243 21.6873 24.2491 21.6544ZM24.4074 21.2328C24.4015 21.2324 24.352 21.3174 24.3459 21.3503C24.3397 21.3832 24.3452 21.3947 24.3559 21.3938C24.3666 21.393 24.3803 21.3767 24.3889 21.3613C24.4096 21.3196 24.4133 21.2332 24.4074 21.2328ZM24.112 21.5977C24.1182 21.5647 24.1678 21.4798 24.1737 21.4802C24.1796 21.4806 24.1759 21.567 24.1551 21.6086C24.1465 21.6241 24.1328 21.6403 24.1221 21.6412C24.1113 21.6421 24.1059 21.6306 24.112 21.5977ZM23.9312 21.6923C23.9253 21.6919 23.8758 21.7769 23.8697 21.8098C23.8635 21.8427 23.869 21.8542 23.8797 21.8533C23.8904 21.8525 23.9041 21.8362 23.9127 21.8208C23.9335 21.7791 23.9371 21.6927 23.9312 21.6923ZM24.4069 20.8079L23.7285 21.2002L24.0097 20.9305L24.0253 20.4526C23.8443 20.5567 23.6998 20.364 23.708 20.1693L23.7246 19.6963L23.8472 19.6301L23.8871 19.8579L23.8209 19.9114L23.9676 20.3356L23.9114 19.9489L23.9611 19.8919L23.9222 19.5883L24.5257 19.2408L24.5073 19.7555C24.4999 19.9312 24.3602 20.2482 24.151 20.3806L24.1286 20.8673L24.4069 20.8079ZM23.3683 19.5825L23.2188 23.8236L26.1317 22.01L26.3322 17.9345L23.3683 19.5825ZM23.4033 19.6272L24.8653 18.8076L24.7773 20.8187L23.3264 21.6742L23.4033 19.6272ZM23.2581 23.7434L23.3264 21.7366L24.774 20.8857L24.6991 22.8473L23.2581 23.7434ZM26.195 20.0448L26.1035 21.9692L24.739 22.8277L24.8152 20.8615L26.195 20.0448ZM26.2991 18.0095L26.2008 19.9728L24.8127 20.8031L24.8997 18.7923L26.2991 18.0095ZM25.3597 20.0292L25.2299 20.1041L25.2546 19.2457L25.1242 19.3235L25.3559 18.7122L25.5379 19.0938L25.4008 19.1707L25.3597 20.0292ZM25.6732 19.8471L25.8128 19.7694L25.8426 18.9167L25.9876 18.8349L25.8114 18.4592L25.5807 19.0656L25.717 18.9877L25.6732 19.8471ZM25.1096 20.2258L25.0989 20.4672L25.9185 19.9815L25.9359 19.7433L25.1096 20.2258ZM25.4327 21.4678L25.176 21.1171L25.2214 21.0321L25.4722 21.3784L25.7688 20.7073L25.8089 20.7455L25.5081 21.428L25.7556 21.7698L25.7165 21.8556L25.4688 21.5172L25.1715 22.1917L25.1294 22.1541L25.4327 21.4678ZM25.1417 21.2841L25.11 22.0351L25.1665 21.9977L25.1983 21.2444L25.1417 21.2841ZM25.7445 21.646L25.7782 20.8939L25.8302 20.8608L25.7944 21.6129L25.7445 21.646ZM25.3415 21.1171L25.4752 21.2982L25.6303 20.9432L25.3415 21.1171ZM25.6808 21.5591L25.7011 21.0788L25.551 21.404L25.6808 21.5591ZM25.4629 21.6376L25.5966 21.8147L25.3084 21.9897L25.4629 21.6376ZM25.2611 21.3469L25.2389 21.8167L25.3935 21.511L25.2611 21.3469ZM24.8522 21.72L24.9228 21.6787L24.9281 21.4916L25.0845 21.6817L24.9189 22.0392L24.9184 21.8816L24.8483 21.9245L24.8522 21.72ZM26.0761 20.9958L26.0678 21.2001L25.998 21.2413L25.995 21.4098L25.8438 21.2294L26.0112 20.8505L26.0034 21.0354L26.0761 20.9958Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.1255 13.7376L14.9482 14.9186L14.9136 9.93661L14.9132 9.89999L14.895 9.93661L8.60001 12.2L13.1255 13.7376ZM22.981 11.8794L23.2896 11.7483L15.0461 9.93661L15 9.89999L15.0004 9.93661L15.0346 14.9182L17.5357 16.539C17.6971 16.6398 17.7093 16.7508 17.7113 16.8508C17.7125 16.8724 17.7323 16.8715 17.7517 16.8706C17.757 16.8704 17.7623 16.8702 17.7672 16.8704C17.7722 16.8707 17.7771 16.8715 17.7819 16.8722C17.7982 16.8748 17.8121 16.8771 17.8164 16.8567C17.8274 16.7807 17.8927 16.6429 17.9892 16.5472L22.981 11.8794Z",
    fill: "black",
    fillOpacity: "0.2"
  }));
};
var ParcelIconLight = _ref3 => {
  var props = _extends$y({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.68827 10.9417L0.964905 6.71058L1.00624 6.66295L1.00745 6.66157L1.00899 6.65979L11.2336 4.00248C11.2485 3.99736 11.2513 4.00051 11.2568 4.00878L14.7444 9.23246V9.23248L14.8129 9.33521C14.8409 9.37655 14.8596 9.41179 14.8719 9.44232C14.8924 9.4932 14.8954 9.53097 14.8952 9.56197C14.8952 9.56198 14.8952 9.56198 14.8952 9.56199H14.9593C14.9589 9.55846 14.9589 9.55455 14.9589 9.55024V9.55018C14.9589 9.54565 14.9592 9.54082 14.9596 9.5354L14.9597 9.53325C14.9597 9.53073 14.9601 9.52822 14.9604 9.5256L14.9609 9.52105L14.9616 9.51592C14.9617 9.51524 14.9618 9.51455 14.9619 9.51387C14.9623 9.51115 14.9626 9.50842 14.9633 9.50569L14.9656 9.48994C14.9692 9.47223 14.9739 9.45255 14.9798 9.43247C14.9814 9.42656 14.983 9.42026 14.9849 9.41436C14.9912 9.39389 14.9979 9.37302 15.0054 9.35255L15.0148 9.32893C15.0247 9.30452 15.0349 9.28169 15.0456 9.26122C15.0558 9.24153 15.066 9.22461 15.0759 9.21122L18.2202 4.63905L18.2207 4.63835L18.2207 4.63833C18.2282 4.62779 18.2319 4.62258 18.2473 4.62528L30.1186 6.66807L30.1391 6.72397L28.7561 9.01281L25.3601 10.4566L31.9452 7.65735L32 7.73333L27.114 12.0268C27.0253 12.1163 26.981 12.2247 26.9917 12.2765L26.992 12.2764C26.9923 12.2786 26.9927 12.2807 26.9933 12.2826L26.9944 12.2858L26.4944 22.295C26.4871 22.3572 26.4585 22.3767 26.3975 22.4182L26.3929 22.4214L17.6328 27.9667C17.6198 27.975 17.6068 27.9809 17.5942 27.984L17.5947 27.9152C17.5902 27.9138 17.5856 27.9121 17.5811 27.9101L5.59721 23.4395C5.52989 23.4107 5.51965 23.3462 5.51572 23.2678L5.00435 13.1401L4.9434 13.1232C4.94269 13.1089 4.95203 13.0977 4.96021 13.0878C4.96576 13.0811 4.97078 13.0751 4.97174 13.0692C4.97253 13.0677 4.97253 13.0665 4.97213 13.0649C4.96347 13.0263 4.89025 12.8803 4.86624 12.8649L0 10.0993L0.0413362 10.006L3.68827 10.9417ZM22.7586 11.6316L15.0461 9.93661L15 9.9L15.0004 9.93661L15.0324 14.5985L17.4489 16.1643C17.5674 16.2383 17.6055 16.3178 17.6181 16.3944L17.6819 16.4116C17.6855 16.4281 17.7035 16.4274 17.7211 16.4267L17.7214 16.4267C17.7268 16.4265 17.7321 16.4263 17.737 16.4266L17.7368 16.4495C17.7385 16.4433 17.7405 16.437 17.7426 16.4304C17.7481 16.4139 17.7548 16.3962 17.7634 16.3777C17.7898 16.3182 17.83 16.2521 17.8804 16.1958C17.8874 16.1879 17.8949 16.1801 17.9024 16.1726L22.7586 11.6316ZM14.9482 14.5439L13.1256 13.3629L13.124 13.3625L8.59744 12.2012L14.8971 9.93661L14.9152 9.9L14.9156 9.93661L14.9476 14.5434L14.9479 14.5436L14.9482 14.5439ZM12.3086 25.2835L12.2334 20.9129L16.8741 22.4313L16.8623 26.9558L12.3086 25.2835ZM14.4746 21.7124L12.2814 20.9928L12.3196 23.1009L14.4931 23.8481L14.4746 21.7124ZM12.324 23.1757L12.3574 25.2394L14.5053 26.0236L14.4927 23.9328L12.324 23.1757ZM14.5695 26.0496L16.8178 26.8755V24.7386L14.5585 23.9532L14.5695 26.0496ZM14.5585 23.8749L16.8178 24.6618V22.4785L14.5538 21.7372L14.5585 23.8749ZM15.159 23.5975L15.3828 23.6754V22.7389L15.6067 22.8149L15.2796 22.1685L14.938 22.5967L15.161 22.6684L15.159 23.5975ZM16.1211 23.9212L15.8972 23.8433L15.8993 22.9143L15.6762 22.8425L16.0179 22.4144L16.3449 23.0608L16.1211 22.9848V23.9212ZM12.8825 23.055L13.8987 23.408L13.4782 23.138L13.4769 22.6319C13.769 22.7513 13.9766 22.5112 13.9766 22.3191V21.8156L13.0603 21.5132L13.1395 21.8792L13.0616 21.8805L13.1979 22.4061L12.9346 21.7683L13.0266 21.7741L12.9435 21.4756L12.7658 21.4172L12.7826 21.9272C12.7826 22.1401 12.9929 22.4879 13.2823 22.5748L13.2901 23.0758L12.8825 23.055ZM13.3306 25.4033L13.3226 24.6251C13.2868 24.6224 13.2535 24.6311 13.2297 24.6518C13.2014 24.5798 13.0651 24.4815 12.962 24.5544C12.8918 24.4386 12.7546 24.3958 12.6787 24.4786C12.7762 24.1841 13.0406 24.081 13.3178 24.1554L13.3173 24.1048L13.4049 24.1321L13.4052 24.1846C13.6698 24.2907 13.9314 24.5561 14.057 24.9692C13.9743 24.83 13.9023 24.8046 13.7728 24.8475C13.7251 24.7482 13.5859 24.6966 13.5012 24.7492C13.4784 24.7056 13.4447 24.673 13.408 24.6521L13.4127 25.4364C13.4127 25.5094 13.363 25.5741 13.2394 25.5493C13.1274 25.5225 13.0804 25.4358 13.0934 25.2884L13.1557 25.2982C13.155 25.397 13.1625 25.4539 13.2379 25.4709C13.3018 25.4852 13.3309 25.4623 13.3306 25.4033ZM13.6628 24.2167C13.6706 24.187 13.746 24.1549 13.7557 24.1632C13.7654 24.1714 13.7654 24.2659 13.7343 24.2864C13.7212 24.2927 13.6998 24.2932 13.6823 24.28C13.6647 24.2669 13.655 24.2464 13.6628 24.2167ZM13.8816 23.949C13.8718 23.9407 13.7964 23.9729 13.7886 24.0026C13.7808 24.0323 13.7906 24.0527 13.8081 24.0658C13.8256 24.079 13.847 24.0785 13.8602 24.0722C13.8913 24.0517 13.8913 23.9573 13.8816 23.949ZM13.4383 23.9941C13.4461 23.9644 13.5216 23.9323 13.5313 23.9405C13.541 23.9488 13.541 24.0433 13.5099 24.0637C13.4967 24.07 13.4753 24.0705 13.4578 24.0574C13.4402 24.0442 13.4305 24.0238 13.4383 23.9941ZM13.1783 23.8893C13.1685 23.881 13.0931 23.9131 13.0853 23.9428C13.0775 23.9725 13.0873 23.9929 13.1048 24.0061C13.1224 24.0192 13.1437 24.0187 13.1569 24.0124C13.188 23.992 13.188 23.8976 13.1783 23.8893ZM14.7402 25.0693L14.6244 25.0265V25.2543L14.7471 25.2835L14.7422 25.4791L14.9933 25.2699L14.7402 24.8707V25.0693ZM16.6208 25.9901V25.7575L16.503 25.7196V25.5133L16.2432 25.7352L16.503 26.1303V25.9434L16.6208 25.9901ZM15.0994 24.7419L15.166 24.7L15.6203 25.4231L16.0652 25.0333L16.143 25.1221L15.6839 25.5243L16.1433 26.2554L16.0766 26.2973L15.624 25.5769L15.1812 25.9648L15.1034 25.8761L15.5603 25.4756L15.0994 24.7419ZM15.0575 25.7004V24.8796L15.1478 24.9088V25.7322L15.0575 25.7004ZM16.1029 25.2612V26.082L16.1931 26.1138V25.2904L16.1029 25.2612ZM15.6212 25.3381L15.3837 24.9564L15.8587 25.1287L15.6212 25.3381ZM15.9872 25.3575V25.8948L15.7438 25.5522L15.9872 25.3575ZM15.3914 25.9143L15.8596 26.0836L15.6255 25.705L15.3914 25.9143ZM15.26 25.6379V25.1005L15.4926 25.4587L15.26 25.6379ZM23.9823 23.0068L24.0093 22.272C23.9737 22.2951 23.9414 22.3357 23.9328 22.3841C23.9175 22.339 23.7733 22.3671 23.7556 22.4958C23.7152 22.4415 23.6028 22.4948 23.5599 22.634C23.6384 22.2743 23.8321 21.9757 24.0249 21.8466L24.0271 21.7862L24.0821 21.7466L24.0794 21.8147C24.2525 21.728 24.416 21.7878 24.4846 22.0743C24.4371 22.0079 24.3513 22.0344 24.2929 22.1687C24.2662 22.113 24.1332 22.159 24.1128 22.2758C24.1022 22.2569 24.0833 22.2498 24.0616 22.252L24.0301 23.0262C24.0273 23.093 24.0232 23.1644 23.9397 23.2154C23.9006 23.2336 23.798 23.2475 23.812 23.1032L23.8607 23.0652C23.8564 23.1561 23.8809 23.1835 23.9308 23.1538C23.9818 23.1233 23.9819 23.0777 23.9819 23.0319L23.982 23.0174L23.9823 23.0068ZM24.2491 21.6544C24.2553 21.6215 24.3048 21.5366 24.3107 21.537C24.3166 21.5374 24.313 21.6238 24.2922 21.6654C24.2836 21.6809 24.2698 21.6971 24.2591 21.698C24.2484 21.6988 24.243 21.6873 24.2491 21.6544ZM24.4074 21.2328C24.4015 21.2324 24.352 21.3174 24.3459 21.3503C24.3397 21.3832 24.3452 21.3947 24.3559 21.3938C24.3666 21.393 24.3803 21.3767 24.3889 21.3613C24.4096 21.3196 24.4133 21.2332 24.4074 21.2328ZM24.112 21.5977C24.1182 21.5647 24.1678 21.4798 24.1737 21.4802C24.1796 21.4806 24.1759 21.567 24.1551 21.6086C24.1465 21.6241 24.1328 21.6403 24.1221 21.6412C24.1113 21.6421 24.1059 21.6306 24.112 21.5977ZM23.9312 21.6923C23.9253 21.6919 23.8758 21.7769 23.8697 21.8098C23.8635 21.8427 23.869 21.8542 23.8797 21.8533C23.8904 21.8525 23.9041 21.8362 23.9127 21.8208C23.9335 21.7791 23.9371 21.6927 23.9312 21.6923ZM24.4069 20.8079L23.7285 21.2002L24.0097 20.9305L24.0253 20.4526C23.8443 20.5567 23.6998 20.364 23.708 20.1693L23.7246 19.6963L23.8472 19.6301L23.8871 19.8579L23.8209 19.9114L23.9676 20.3356L23.9114 19.9489L23.9611 19.8919L23.9222 19.5883L24.5257 19.2408L24.5073 19.7555C24.4999 19.9312 24.3602 20.2482 24.151 20.3806L24.1286 20.8673L24.4069 20.8079ZM23.3683 19.5825L23.2188 23.8236L26.1317 22.01L26.3322 17.9345L23.3683 19.5825ZM23.4033 19.6272L24.8653 18.8076L24.7773 20.8187L23.3264 21.6742L23.4033 19.6272ZM23.2581 23.7434L23.3264 21.7366L24.774 20.8857L24.6991 22.8473L23.2581 23.7434ZM26.195 20.0448L26.1035 21.9692L24.739 22.8277L24.8152 20.8615L26.195 20.0448ZM26.2991 18.0095L26.2008 19.9728L24.8127 20.8031L24.8997 18.7923L26.2991 18.0095ZM25.3597 20.0292L25.2299 20.1041L25.2546 19.2457L25.1242 19.3235L25.3559 18.7122L25.5379 19.0938L25.4008 19.1707L25.3597 20.0292ZM25.6732 19.8471L25.8128 19.7694L25.8426 18.9167L25.9876 18.8349L25.8114 18.4592L25.5807 19.0656L25.717 18.9877L25.6732 19.8471ZM25.1096 20.2258L25.0989 20.4672L25.9185 19.9815L25.9359 19.7433L25.1096 20.2258ZM25.4327 21.4678L25.176 21.1171L25.2214 21.0321L25.4722 21.3784L25.7688 20.7073L25.8089 20.7455L25.5081 21.428L25.7556 21.7698L25.7165 21.8556L25.4688 21.5172L25.1715 22.1917L25.1294 22.1541L25.4327 21.4678ZM25.1417 21.2841L25.11 22.0351L25.1665 21.9977L25.1983 21.2444L25.1417 21.2841ZM25.7445 21.646L25.7782 20.8939L25.8302 20.8608L25.7944 21.6129L25.7445 21.646ZM25.3415 21.1171L25.4752 21.2982L25.6303 20.9432L25.3415 21.1171ZM25.6808 21.5591L25.7011 21.0788L25.551 21.404L25.6808 21.5591ZM25.4629 21.6376L25.5966 21.8147L25.3084 21.9897L25.4629 21.6376ZM25.2611 21.3469L25.2389 21.8167L25.3935 21.511L25.2611 21.3469ZM24.8522 21.72L24.9228 21.6787L24.9281 21.4916L25.0845 21.6817L24.9189 22.0392L24.9184 21.8816L24.8483 21.9245L24.8522 21.72ZM26.0761 20.9958L26.0678 21.2001L25.998 21.2413L25.995 21.4098L25.8438 21.2294L26.0112 20.8505L26.0034 21.0354L26.0761 20.9958Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.1255 13.7376L14.9482 14.9186L14.9136 9.93661L14.9132 9.89999L14.895 9.93661L8.60001 12.2L13.1255 13.7376ZM22.981 11.8794L23.2896 11.7483L15.0461 9.93661L15 9.89999L15.0004 9.93661L15.0346 14.9182L17.5357 16.539C17.6971 16.6398 17.7093 16.7508 17.7113 16.8508C17.7125 16.8724 17.7323 16.8715 17.7517 16.8706C17.757 16.8704 17.7623 16.8702 17.7672 16.8704C17.7722 16.8707 17.7771 16.8715 17.7819 16.8722C17.7982 16.8748 17.8121 16.8771 17.8164 16.8567C17.8274 16.7807 17.8927 16.6429 17.9892 16.5472L22.981 11.8794Z",
    fill: "white",
    fillOpacity: "0.2"
  }));
};

function _extends$z() {
  _extends$z = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$z.apply(this, arguments);
}
var PolymerIcon = _ref => {
  var props = _extends$z({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Polymer_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M19.2017 27.1718L6.40086 4.99997H12.8017L25.6026 27.1718H19.2017Z",
    fill: "#FF4081"
  }), React.createElement("path", {
    d: "M19.2017 27.1718L22.4018 21.6289L25.6026 27.1718H19.2017Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M16.0017 21.6289L19.2017 27.1718L22.4018 21.6289H16.0018H16.0017Z",
    fill: "white",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    d: "M12.8016 16.0859L16.0017 21.6289L19.2017 16.0859H12.8017H12.8016Z",
    fill: "black",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    d: "M12.8016 16.0859L16.0017 10.5429L19.2017 16.0859H12.8017H12.8016Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M9.60167 10.5429L12.8017 16.0859L16.0018 10.5429H9.6018H9.60167Z",
    fill: "black",
    fillOpacity: "0.3"
  }), React.createElement("path", {
    d: "M9.60167 10.5429L12.8017 4.99997L16.0018 10.5429H9.6018H9.60167Z",
    fill: "black",
    fillOpacity: "0.4"
  }), React.createElement("path", {
    d: "M6.40086 4.99997L9.60168 10.5429L12.8017 4.99997H6.40086Z",
    fill: "black",
    fillOpacity: "0.5"
  }), React.createElement("path", {
    d: "M6.40087 27.1718L0 16.0859L3.20081 10.5429L12.8016 27.1718H6.40074H6.40087Z",
    fill: "#536DFE"
  }), React.createElement("path", {
    d: "M6.40086 27.1718L9.60168 21.6289L12.8017 27.1718H6.40086Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M3.20081 21.6289L6.40086 27.1718L9.60168 21.6289H3.20081Z",
    fill: "white",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    d: "M0 16.0859L3.20081 21.6289L6.40087 16.0859H0Z",
    fill: "black",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    d: "M0 16.0859L3.20081 10.5429L6.40087 16.0859H0Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M6.40086 16.0859L3.20081 10.5429L6.40086 4.99997L9.60168 10.5429L6.40086 16.0859Z",
    fill: "#303F9F"
  }), React.createElement("path", {
    d: "M9.60168 10.5429L6.40086 4.99997L3.20081 10.5429H9.60168Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M25.6025 27.1718L22.4017 21.6289L25.6025 16.0859L28.8025 21.6289L25.6025 27.1718Z",
    fill: "#3F51B5"
  }), React.createElement("path", {
    d: "M28.8025 21.6289L25.6025 27.1719L22.4017 21.6289H28.8025Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M28.8025 21.6289L19.2017 4.99997H25.6026L32.0034 16.0859L28.8026 21.6289H28.8025Z",
    fill: "#7986CB"
  }), React.createElement("path", {
    d: "M25.6025 16.0859L28.8025 21.6289L32.0033 16.0859H25.6025Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    d: "M25.6025 16.0859L28.8025 10.5429L32.0033 16.0859H25.6025Z",
    fill: "white",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    d: "M22.4016 10.5429L25.6024 4.99997L28.8025 10.5429H22.4016Z",
    fill: "black",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    d: "M19.2017 4.99997L22.4018 10.5429L25.6026 4.99997H19.2017Z",
    fill: "black",
    fillOpacity: "0.2"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "Polymer_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var PolymerIconDark = _ref2 => {
  var props = _extends$z({}, _ref2);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#clip_".concat(id, ")")
  }, React.createElement("path", {
    d: "M19.0009 27.1719L6.20001 5H12.6009L25.4017 27.1719H19.0009Z",
    fill: "black",
    fillOpacity: "0.4"
  }), React.createElement("path", {
    d: "M6.40097 16.0857L9.60168 10.5429L6.40086 4.99997L0 16.0859L6.40087 27.1718H12.8016L6.40097 16.0857Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M19 4.99997H25.4007L31.8017 16.0859L25.4008 27.1718L22.2 21.6289L25.4007 16.0861L19 4.99997Z",
    fill: "black"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "clip_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var PolymerIconLight = _ref3 => {
  var props = _extends$z({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.60168 10.5429L6.40097 16.0857L12.8016 27.1718H6.40087L0 16.0859L6.40086 4.99997L9.60168 10.5429ZM25.4007 4.99997H19L25.4007 16.0861L22.2 21.6289L25.4008 27.1718L31.8017 16.0859L25.4007 4.99997Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M12.5 5H6.5L19 27H25.5L12.5 5Z",
    fill: "white",
    fillOpacity: "0.4"
  }));
};

function _extends$A() {
  _extends$A = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$A.apply(this, arguments);
}
var PreactIcon = _ref => {
  var props = _extends$A({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Preact_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M16 -4.76837e-07L29.8378 7.98918V23.9676L16 31.9567L2.16216 23.9676V7.98918L16 -4.76837e-07Z",
    fill: "#673AB8"
  }), React.createElement("path", {
    d: "M5.93132 23.8355C7.77096 26.1901 13.6173 24.396 19.1367 20.0837C24.6562 15.7714 27.8114 10.5328 25.9718 8.17819C24.1321 5.82356 18.2858 7.6177 12.7664 11.93C7.24688 16.2423 4.09168 21.4809 5.93132 23.8355ZM6.71722 23.2215C6.10712 22.4406 6.37368 20.9077 7.53602 18.9778C8.75997 16.9457 10.8377 14.7024 13.3804 12.7159C15.923 10.7294 18.6023 9.25602 20.8702 8.56004C23.0239 7.8991 24.5758 8.0113 25.1859 8.7922C25.796 9.5731 25.5294 11.106 24.3671 13.0359C23.1431 15.068 21.0654 17.3113 18.5227 19.2978C15.9801 21.2843 13.3008 22.7577 11.0329 23.4537C8.87922 24.1146 7.32733 24.0024 6.71722 23.2215Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M25.9718 23.8355C27.8114 21.4809 24.6562 16.2423 19.1367 11.93C13.6173 7.6177 7.77096 5.82356 5.93132 8.17819C4.09168 10.5328 7.24688 15.7714 12.7664 20.0837C18.2858 24.396 24.1321 26.1901 25.9718 23.8355ZM25.1859 23.2215C24.5758 24.0024 23.0239 24.1146 20.8702 23.4537C18.6023 22.7577 15.923 21.2843 13.3804 19.2978C10.8377 17.3113 8.75997 15.068 7.53602 13.0359C6.37368 11.106 6.10712 9.5731 6.71722 8.7922C7.32733 8.0113 8.87922 7.8991 11.0329 8.56004C13.3008 9.25602 15.9801 10.7294 18.5227 12.7159C21.0654 14.7024 23.1431 16.9457 24.3671 18.9778C25.5294 20.9077 25.796 22.4406 25.1859 23.2215Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M15.9516 18.1262C17.122 18.1262 18.0709 17.1773 18.0709 16.0068C18.0709 14.8364 17.122 13.8875 15.9516 13.8875C14.7811 13.8875 13.8322 14.8364 13.8322 16.0068C13.8322 17.1773 14.7811 18.1262 15.9516 18.1262Z",
    fill: "white"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "Preact_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var PreactIconDark = _ref2 => {
  var props = _extends$A({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M28.25 9L16 2L3.75 9V23L16 30L28.25 23V9ZM18.2649 19.5732C17.617 20.0795 16.9639 20.546 16.3148 20.9695C17.5253 21.6622 18.7063 22.1919 19.7817 22.522C21.6662 23.1003 23.0241 23.0021 23.5579 22.3188C24.0918 21.6355 23.8585 20.2942 22.8415 18.6056C22.4628 17.9769 21.9907 17.3251 21.4403 16.6683C20.5324 17.6526 19.4622 18.6378 18.2649 19.5732ZM17.7277 18.8856C16.9851 19.4657 16.2292 19.9958 15.4779 20.4674C14.7265 19.9958 13.9706 19.4657 13.2281 18.8856C12.0539 17.9682 10.9931 16.9883 10.0955 16.006C10.9931 15.0237 12.0539 14.0438 13.2281 13.1264C13.9706 12.5463 14.7265 12.0161 15.4779 11.5446C16.2292 12.0161 16.9851 12.5463 17.7277 13.1264C18.9018 14.0438 19.9627 15.0237 20.8602 16.006C19.9627 16.9883 18.9018 17.9682 17.7277 18.8856ZM12.6908 19.5732C11.4935 18.6378 10.4234 17.6526 9.51544 16.6683C8.96502 17.3251 8.49296 17.9769 8.11429 18.6056C7.09724 20.2942 6.864 21.6355 7.39784 22.3188C7.93168 23.0021 9.28959 23.1003 11.1741 22.522C12.2494 22.1919 13.4305 21.6622 14.6409 20.9695C13.9919 20.546 13.3388 20.0795 12.6908 19.5732ZM6.71018 22.8561C5.58916 21.4212 6.58784 18.7625 8.92876 16.006C6.58784 13.2495 5.58916 10.5908 6.71018 9.15591C8.01076 7.49125 11.6 8.19643 15.4779 10.5189C19.3558 8.19643 22.945 7.49125 24.2456 9.15591C25.3666 10.5908 24.3679 13.2495 22.027 16.006C24.3679 18.7625 25.3666 21.4212 24.2456 22.8561C22.945 24.5207 19.3558 23.8156 15.4779 21.4931C11.6 23.8156 8.01076 24.5207 6.71018 22.8561ZM12.6908 12.4387C11.4935 13.3742 10.4234 14.3594 9.51544 15.3437C8.96502 14.6869 8.49296 14.0351 8.11429 13.4064C7.09724 11.7178 6.864 10.3765 7.39784 9.69317C7.93168 9.00989 9.28959 8.91171 11.1741 9.49003C12.2494 9.82004 13.4305 10.3498 14.6409 11.0425C13.9919 11.466 13.3388 11.9325 12.6908 12.4387ZM19.7817 9.49003C18.7063 9.82004 17.5253 10.3498 16.3148 11.0425C16.9639 11.466 17.617 11.9325 18.2649 12.4387C19.4622 13.3742 20.5324 14.3594 21.4403 15.3437C21.9907 14.6869 22.4628 14.0351 22.8415 13.4064C23.8585 11.7178 24.0918 10.3765 23.5579 9.69317C23.0241 9.00989 21.6662 8.91171 19.7817 9.49003ZM17.25 15.6516C17.25 16.48 16.5784 17.1516 15.75 17.1516C14.9216 17.1516 14.25 16.48 14.25 15.6516C14.25 14.8232 14.9216 14.1516 15.75 14.1516C16.5784 14.1516 17.25 14.8232 17.25 15.6516Z",
    fill: "black"
  }));
};
var PreactIconLight = _ref3 => {
  var props = _extends$A({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M28.25 9L16 2L3.75 9V23L16 30L28.25 23V9ZM18.2649 19.5732C17.617 20.0795 16.9639 20.546 16.3148 20.9695C17.5253 21.6622 18.7063 22.1919 19.7817 22.522C21.6662 23.1003 23.0241 23.0021 23.5579 22.3188C24.0918 21.6355 23.8585 20.2942 22.8415 18.6056C22.4628 17.9769 21.9907 17.3251 21.4403 16.6683C20.5324 17.6526 19.4622 18.6378 18.2649 19.5732ZM17.7277 18.8856C16.9851 19.4657 16.2292 19.9958 15.4779 20.4674C14.7265 19.9958 13.9706 19.4657 13.2281 18.8856C12.0539 17.9682 10.9931 16.9883 10.0955 16.006C10.9931 15.0237 12.0539 14.0438 13.2281 13.1264C13.9706 12.5463 14.7265 12.0161 15.4779 11.5446C16.2292 12.0161 16.9851 12.5463 17.7277 13.1264C18.9018 14.0438 19.9627 15.0237 20.8602 16.006C19.9627 16.9883 18.9018 17.9682 17.7277 18.8856ZM12.6908 19.5732C11.4935 18.6378 10.4234 17.6526 9.51544 16.6683C8.96502 17.3251 8.49296 17.9769 8.11429 18.6056C7.09724 20.2942 6.864 21.6355 7.39784 22.3188C7.93168 23.0021 9.28959 23.1003 11.1741 22.522C12.2494 22.1919 13.4305 21.6622 14.6409 20.9695C13.9919 20.546 13.3388 20.0795 12.6908 19.5732ZM6.71018 22.8561C5.58916 21.4212 6.58784 18.7625 8.92876 16.006C6.58784 13.2495 5.58916 10.5908 6.71018 9.15591C8.01076 7.49125 11.6 8.19643 15.4779 10.5189C19.3558 8.19643 22.945 7.49125 24.2456 9.15591C25.3666 10.5908 24.3679 13.2495 22.027 16.006C24.3679 18.7625 25.3666 21.4212 24.2456 22.8561C22.945 24.5207 19.3558 23.8156 15.4779 21.4931C11.6 23.8156 8.01076 24.5207 6.71018 22.8561ZM12.6908 12.4387C11.4935 13.3742 10.4234 14.3594 9.51544 15.3437C8.96502 14.6869 8.49296 14.0351 8.11429 13.4064C7.09724 11.7178 6.864 10.3765 7.39784 9.69317C7.93168 9.00989 9.28959 8.91171 11.1741 9.49003C12.2494 9.82004 13.4305 10.3498 14.6409 11.0425C13.9919 11.466 13.3388 11.9325 12.6908 12.4387ZM19.7817 9.49003C18.7063 9.82004 17.5253 10.3498 16.3148 11.0425C16.9639 11.466 17.617 11.9325 18.2649 12.4387C19.4622 13.3742 20.5324 14.3594 21.4403 15.3437C21.9907 14.6869 22.4628 14.0351 22.8415 13.4064C23.8585 11.7178 24.0918 10.3765 23.5579 9.69317C23.0241 9.00989 21.6662 8.91171 19.7817 9.49003ZM17.25 15.6516C17.25 16.48 16.5784 17.1516 15.75 17.1516C14.9216 17.1516 14.25 16.48 14.25 15.6516C14.25 14.8232 14.9216 14.1516 15.75 14.1516C16.5784 14.1516 17.25 14.8232 17.25 15.6516Z",
    fill: "light"
  }));
};

function _extends$B() {
  _extends$B = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$B.apply(this, arguments);
}
var PrismaIcon = _ref => {
  var props = _extends$B({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M28 32H4C1.7909 32 0 30.2091 0 28V4C0 1.7909 1.7909 0 4 0H28C30.2091 0 32 1.7909 32 4V28C32 30.2091 30.2091 32 28 32Z",
    fill: "#08334A"
  }), React.createElement("path", {
    d: "M25.8063 22.2846L17.5528 4.7571C17.3439 4.3177 16.9108 4.0281 16.4249 4.003C15.9378 3.9704 15.4731 4.2113 15.219 4.6281L6.2672 19.127C5.9893 19.574 5.9951 20.1414 6.2822 20.5825L10.6588 27.3601C10.9989 27.8827 11.6421 28.1192 12.2397 27.9415L24.9406 24.1847C25.3276 24.0715 25.6464 23.7962 25.8148 23.4299C25.9809 23.0654 25.978 22.6462 25.807 22.284L25.8063 22.2846ZM23.9585 23.0363L13.181 26.2233C12.8522 26.3211 12.5366 26.0361 12.6051 25.7044L16.4556 7.2673C16.5276 6.9223 17.0039 6.8677 17.1545 7.1869L24.2825 22.3237C24.3463 22.4602 24.3471 22.6178 24.2846 22.7549C24.2221 22.892 24.1034 22.9949 23.9585 23.0363Z",
    fill: "white"
  }));
};
var PrismaIconDark = _ref2 => {
  var props = _extends$B({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M25.8683 22.4L17.5626 4.76186C17.3524 4.31963 16.9166 4.02826 16.4276 4.00296C15.9375 3.97012 15.4698 4.21259 15.2141 4.63205L6.20572 19.2226C5.92606 19.6723 5.93195 20.2433 6.22082 20.6872L10.6251 27.5077C10.9673 28.0335 11.6146 28.2715 12.2159 28.0927L24.9971 24.3121C25.3864 24.1982 25.7073 23.9212 25.8767 23.5526C26.0438 23.1858 26.0409 22.764 25.8689 22.3994L25.8683 22.4ZM24.0087 23.1565L13.1632 26.3636C12.8323 26.462 12.5148 26.1752 12.5836 25.8413L16.4584 7.28789C16.5308 6.94075 17.0102 6.88581 17.1618 7.20699L24.3348 22.4393C24.3989 22.5767 24.3997 22.7353 24.3369 22.8732C24.274 23.0112 24.1545 23.1148 24.0087 23.1565Z",
    fill: "black"
  }));
};
var PrismaIconLight = _ref3 => {
  var props = _extends$B({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M25.8683 22.4L17.5626 4.76186C17.3524 4.31963 16.9166 4.02826 16.4276 4.00296C15.9375 3.97012 15.4698 4.21259 15.2141 4.63205L6.20572 19.2226C5.92606 19.6723 5.93195 20.2433 6.22082 20.6872L10.6251 27.5077C10.9673 28.0335 11.6146 28.2715 12.2159 28.0927L24.9971 24.3121C25.3864 24.1982 25.7073 23.9212 25.8767 23.5526C26.0438 23.1858 26.0409 22.764 25.8689 22.3994L25.8683 22.4ZM24.0087 23.1565L13.1632 26.3636C12.8323 26.462 12.5148 26.1752 12.5836 25.8413L16.4584 7.28789C16.5308 6.94075 17.0102 6.88581 17.1618 7.20699L24.3348 22.4393C24.3989 22.5767 24.3997 22.7353 24.3369 22.8732C24.274 23.0112 24.1545 23.1148 24.0087 23.1565Z",
    fill: "white"
  }));
};

function _extends$C() {
  _extends$C = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$C.apply(this, arguments);
}
var QuasarIcon = _ref => {
  var props = _extends$C({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Quasar_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M16 32C24.8366 32 32 24.8366 32 16C32 7.16345 24.8366 0 16 0C7.16345 0 0 7.16345 0 16C0 24.8366 7.16345 32 16 32Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M18.6188 16C18.6188 17.4462 17.4476 18.6174 16.0014 18.6174C14.5552 18.6174 13.384 17.4448 13.384 16C13.384 14.5538 14.5566 13.3826 16.0014 13.3826C17.4462 13.3826 18.6188 14.5538 18.6188 16Z",
    fill: "#263238"
  }), React.createElement("path", {
    d: "M27.6202 9.29016C27.0511 8.31138 26.3596 7.40821 25.5637 6.60264L22.538 8.34987C21.595 7.5443 20.5227 6.92707 19.379 6.51878C18.3452 7.5663 17.5245 8.73616 16.9334 10.0077C20.3014 9.77817 23.7807 10.9975 27.0099 13.5214L28.9138 12.4217C28.6169 11.3274 28.1825 10.2758 27.6202 9.29016Z",
    fill: "#1976D2"
  }), React.createElement("path", {
    d: "M27.6203 22.7085C28.1839 21.7256 28.621 20.6753 28.9207 19.5838L25.895 17.8366C26.1218 16.6172 26.1191 15.38 25.9005 14.1854C24.4777 13.8142 23.0535 13.6878 21.6555 13.8129C23.5388 16.6159 24.222 20.2382 23.6515 24.2963L25.5555 25.396C26.3555 24.5891 27.0498 23.6873 27.6203 22.7085Z",
    fill: "#42A5F5"
  }), React.createElement("path", {
    d: "M16.0014 29.417C17.1341 29.4142 18.2614 29.2671 19.357 28.9798V25.4853C20.5268 25.0716 21.5964 24.4516 22.5229 23.6653C22.1325 22.2466 21.5304 20.9516 20.7234 19.8024C19.2374 22.8336 16.4427 25.2379 12.643 26.7734V28.9729C13.7386 29.263 14.8673 29.4115 16.0014 29.417Z",
    fill: "#1976D2"
  }), React.createElement("path", {
    d: "M4.38113 22.7099C4.95026 23.6886 5.64172 24.5918 6.43766 25.3974L9.46336 23.6501C10.4064 24.4557 11.4787 25.0729 12.6224 25.4812C13.6562 24.4337 14.4768 23.2639 15.068 21.9923C11.7 22.2218 8.22064 21.0025 4.9915 18.4786L3.08755 19.5783C3.38448 20.6726 3.81889 21.7242 4.38113 22.7099Z",
    fill: "#42A5F5"
  }), React.createElement("path", {
    d: "M4.37976 9.29152C3.81614 10.2744 3.37899 11.3247 3.0793 12.4162L6.105 14.1634C5.87817 15.3828 5.88092 16.62 6.0995 17.8146C7.5223 18.1858 8.94648 18.3122 10.3445 18.1871C8.46121 15.3841 7.77799 11.7618 8.34848 7.70375L6.44454 6.604C5.64585 7.40957 4.95163 8.31274 4.37976 9.29152Z",
    fill: "#1976D2"
  }), React.createElement("path", {
    d: "M16 2.58304C14.8673 2.58579 13.74 2.73288 12.6444 3.02019V6.51465C11.4745 6.92843 10.405 7.54841 9.47848 8.33474C9.86889 9.75341 10.471 11.0484 11.2779 12.1976C12.764 9.16642 15.5587 6.76209 19.3584 5.22656V3.02706C18.2627 2.737 17.1341 2.58854 16 2.58304Z",
    fill: "#42A5F5"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "Quasar_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var QuasarIconDark = _ref2 => {
  var props = _extends$C({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM15.0013 17.4538C16.3571 17.4538 17.4551 16.3558 17.4551 15C17.4551 13.6442 16.3558 12.5462 15.0013 12.5462C13.6468 12.5462 12.5475 13.6442 12.5475 15C12.5475 16.3545 13.6455 17.4538 15.0013 17.4538ZM25.8939 8.70953C25.3604 7.79192 24.7121 6.9452 23.966 6.18998L21.1294 7.82801C20.2453 7.07278 19.24 6.49413 18.1678 6.11136C17.1986 7.09341 16.4292 8.19015 15.8751 9.38222C19.0326 9.16704 22.2944 10.3102 25.3218 12.6763L27.1067 11.6453C26.8283 10.6194 26.4211 9.63357 25.8939 8.70953ZM27.1132 18.3598C26.8322 19.3831 26.4224 20.3678 25.894 21.2892C25.3592 22.2068 24.7083 23.0523 23.9583 23.8088L22.1733 22.7778C22.7081 18.9733 22.0676 15.5774 20.302 12.9496C21.6127 12.8323 22.9478 12.9508 24.2817 13.2988C24.4867 14.4188 24.4892 15.5786 24.2766 16.7218L27.1132 18.3598ZM15.0013 27.5784C16.0632 27.5758 17.1201 27.4379 18.1472 27.1686V23.8925C19.2439 23.5046 20.2466 22.9234 21.1152 22.1862C20.7492 20.8562 20.1848 19.6421 19.4282 18.5647C18.0351 21.4065 15.415 23.6605 11.8528 25.1001V27.1621C12.8799 27.4341 13.9381 27.5733 15.0013 27.5784ZM6.0353 23.8101C5.28911 23.0548 4.64087 22.2081 4.10731 21.2905C3.58021 20.3664 3.17295 19.3806 2.89458 18.3547L4.67953 17.3237C7.70685 19.6899 10.9687 20.8329 14.1262 20.6178C13.572 21.8099 12.8027 22.9066 11.8335 23.8886C10.7613 23.5059 9.756 22.9272 8.8719 22.172L6.0353 23.8101ZM4.10602 8.7108C3.57763 9.63225 3.1678 10.6169 2.88684 11.6402L5.72344 13.2782C5.51079 14.4214 5.51336 15.5813 5.71828 16.7012C7.05216 17.0492 8.38733 17.1677 9.69797 17.0504C7.93239 14.4226 7.29187 11.0267 7.8267 7.22227L6.04176 6.19125C5.29298 6.94648 4.64215 7.7932 4.10602 8.7108ZM11.8541 2.83143C12.8812 2.56207 13.9381 2.42418 15 2.4216C16.0632 2.42675 17.1213 2.56594 18.1485 2.83787V4.8999C14.5863 6.33946 11.9662 8.59352 10.573 11.4352C9.81656 10.3579 9.25208 9.14382 8.88607 7.81382C9.75469 7.07663 10.7573 6.4954 11.8541 6.10748V2.83143Z",
    fill: "black"
  }));
};
var QuasarIconLight = _ref3 => {
  var props = _extends$C({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM15.0013 17.4538C16.3571 17.4538 17.4551 16.3558 17.4551 15C17.4551 13.6442 16.3558 12.5462 15.0013 12.5462C13.6468 12.5462 12.5475 13.6442 12.5475 15C12.5475 16.3545 13.6455 17.4538 15.0013 17.4538ZM25.8939 8.70953C25.3604 7.79192 24.7121 6.9452 23.966 6.18998L21.1294 7.82801C20.2453 7.07278 19.24 6.49413 18.1678 6.11136C17.1986 7.09341 16.4292 8.19015 15.8751 9.38222C19.0326 9.16704 22.2944 10.3102 25.3218 12.6763L27.1067 11.6453C26.8283 10.6194 26.4211 9.63357 25.8939 8.70953ZM27.1132 18.3598C26.8322 19.3831 26.4224 20.3678 25.894 21.2892C25.3592 22.2068 24.7083 23.0523 23.9583 23.8088L22.1733 22.7778C22.7081 18.9733 22.0676 15.5774 20.302 12.9496C21.6127 12.8323 22.9478 12.9508 24.2817 13.2988C24.4867 14.4188 24.4892 15.5786 24.2766 16.7218L27.1132 18.3598ZM15.0013 27.5784C16.0632 27.5758 17.1201 27.4379 18.1472 27.1686V23.8925C19.2439 23.5046 20.2466 22.9234 21.1152 22.1862C20.7492 20.8562 20.1848 19.6421 19.4282 18.5647C18.0351 21.4065 15.415 23.6605 11.8528 25.1001V27.1621C12.8799 27.4341 13.9381 27.5733 15.0013 27.5784ZM6.0353 23.8101C5.28911 23.0548 4.64087 22.2081 4.10731 21.2905C3.58021 20.3664 3.17295 19.3806 2.89458 18.3547L4.67953 17.3237C7.70685 19.6899 10.9687 20.8329 14.1262 20.6178C13.572 21.8099 12.8027 22.9066 11.8335 23.8886C10.7613 23.5059 9.756 22.9272 8.8719 22.172L6.0353 23.8101ZM4.10602 8.7108C3.57763 9.63225 3.1678 10.6169 2.88684 11.6402L5.72344 13.2782C5.51079 14.4214 5.51336 15.5813 5.71828 16.7012C7.05216 17.0492 8.38733 17.1677 9.69797 17.0504C7.93239 14.4226 7.29187 11.0267 7.8267 7.22227L6.04176 6.19125C5.29298 6.94648 4.64215 7.7932 4.10602 8.7108ZM11.8541 2.83143C12.8812 2.56207 13.9381 2.42418 15 2.4216C16.0632 2.42675 17.1213 2.56594 18.1485 2.83787V4.8999C14.5863 6.33946 11.9662 8.59352 10.573 11.4352C9.81656 10.3579 9.25208 9.14382 8.88607 7.81382C9.75469 7.07663 10.7573 6.4954 11.8541 6.10748V2.83143Z",
    fill: "white"
  }));
};

function _extends$D() {
  _extends$D = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$D.apply(this, arguments);
}
var RazzleIcon = _ref => {
  var props = _extends$D({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("mask", {
    id: "Razzle_Mask0_".concat(id),
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: "3",
    y: "0",
    width: "26",
    height: "32"
  }, React.createElement("path", {
    d: "M3 32V0H18.5429C19.2167 0 19.9216 0.111543 20.6585 0.333714C21.3945 0.555886 22.0199 0.853029 22.5346 1.22697C22.712 1.36869 22.9424 1.56526 23.2267 1.81303L24.0514 2.66697L24.8231 3.49349C25.0718 3.76046 25.2665 3.98263 25.4082 4.16C25.7639 4.64 26.0208 5.19954 26.1808 5.84046C26.3399 6.48046 26.4203 7.09303 26.4203 7.68V12.213C26.4203 13.5296 26.0821 14.6843 25.4082 15.68C25.2454 15.9252 25.0632 16.157 24.8633 16.373C24.6238 16.64 24.3623 16.9152 24.0779 17.1995C23.7945 17.4848 23.5111 17.7509 23.2267 17.9995C22.9433 18.2491 22.712 18.4357 22.5346 18.56C22.3216 18.7374 22.1086 18.88 21.8955 18.987L21.2574 19.307L22.2951 21.227L23.4389 23.3335L24.6101 25.44L25.7017 27.467L28.1767 32H20.9374L14.6032 19.787H9.49417V32H3ZM9.49417 13.547H18.5419C18.5785 13.547 18.6581 13.5067 18.7815 13.4263C18.9058 13.3467 19.0393 13.2398 19.181 13.1063C19.3227 12.9737 19.4608 12.8357 19.5934 12.693C19.7269 12.5513 19.8375 12.4096 19.9262 12.267V7.52C19.7515 7.26856 19.5508 7.03626 19.3273 6.82697C19.0943 6.59588 18.8303 6.39833 18.5429 6.24H9.49417V13.547Z",
    fill: "white"
  })), React.createElement("g", {
    mask: "url(#Razzle_Mask0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M3 32V0H18.5429C19.2167 0 19.9216 0.111543 20.6585 0.333714C21.3945 0.555886 22.0199 0.853029 22.5346 1.22697C22.712 1.36869 22.9424 1.56526 23.2267 1.81303L24.0514 2.66697L24.8231 3.49349C25.0718 3.76046 25.2665 3.98263 25.4082 4.16C25.7639 4.64 26.0208 5.19954 26.1808 5.84046C26.3399 6.48046 26.4203 7.09303 26.4203 7.68V12.213C26.4203 13.5296 26.0821 14.6843 25.4082 15.68C25.2454 15.9252 25.0632 16.157 24.8633 16.373C24.6238 16.64 24.3623 16.9152 24.0779 17.1995C23.7945 17.4848 23.5111 17.7509 23.2267 17.9995C22.9433 18.2491 22.712 18.4357 22.5346 18.56C22.3216 18.7374 22.1086 18.88 21.8955 18.987L21.2574 19.307L22.2951 21.227L23.4389 23.3335L24.6101 25.44L25.7017 27.467L28.1767 32H20.9374L14.6032 19.787H9.49417V32H3ZM9.49417 13.547H18.5419C18.5785 13.547 18.6581 13.5067 18.7815 13.4263C18.9058 13.3467 19.0393 13.2398 19.181 13.1063C19.3227 12.9737 19.4608 12.8357 19.5934 12.693C19.7269 12.5513 19.8375 12.4096 19.9262 12.267V7.52C19.7515 7.26856 19.5508 7.03626 19.3273 6.82697C19.0943 6.59588 18.8303 6.39833 18.5429 6.24H9.49417V13.547Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-76.6389 -59.8866L205.295 102.887L201 110.327L-80.9342 -52.4471L-76.6389 -59.8866Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-80.9338 -52.4473L201 110.327L196.704 117.767L-85.2291 -45.0076L-80.9338 -52.4473Z",
    fill: "url(#Razzle_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-85.2295 -45.0076L196.704 117.766L192.409 125.207L-89.5257 -37.568L-85.2295 -45.0076ZM-93.8201 -30.1294L188.114 132.645L183.818 140.085L-98.1154 -22.6898L-93.8201 -30.1294Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-98.115 -22.6896L183.819 140.085L179.523 147.525L-102.41 -15.2499L-98.115 -22.6896Z",
    fill: "url(#Razzle_Paint1_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-96.9303 -44.9655L185.003 117.809L180.708 125.249L-101.226 -37.5258L-96.9303 -44.9655Z",
    fill: "url(#Razzle_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-102.41 -15.2503L179.523 147.525L175.229 154.964L-106.705 -7.81076L-102.41 -15.2503Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.32892 -106.95L288.263 55.8245L283.967 63.264L2.0336 -99.5109L6.32892 -106.95Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.03413 -99.5103L283.968 63.2641L279.672 70.7038L-2.26119 -92.0706L2.03413 -99.5103Z",
    fill: "url(#Razzle_Paint3_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-2.2608 -92.0713L279.672 70.7035L275.378 78.1431L-6.55611 -84.6318L-2.2608 -92.0713Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-10.8514 -77.1922L271.082 85.5826L266.787 93.0222L-15.1467 -69.7518L-10.8514 -77.1922Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-15.1469 -69.7522L266.787 93.0222L262.492 100.461L-19.4418 -62.3133L-15.1469 -69.7522ZM-6.55631 -84.6316L275.377 78.1428L271.082 85.5825L-10.8516 -77.1919L-6.55631 -84.6316Z",
    fill: "url(#Razzle_Paint4_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-19.4421 -62.3131L262.493 100.462L258.197 107.9L-23.7374 -54.8736L-19.4421 -62.3131Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-6.35955 -50.4768L299.556 60.8676L296.618 68.9408L-9.29806 -42.4046L-6.35955 -50.4768Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-9.2978 -42.4038L296.618 68.9404L293.68 77.013L-12.236 -34.3313L-9.2978 -42.4038Z",
    fill: "url(#Razzle_Paint5_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-12.2357 -34.3315L293.679 77.0121L290.741 85.0852L-15.1742 -26.2601L-12.2357 -34.3315Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-18.1118 -18.187L287.804 93.1575L284.865 101.231L-21.0503 -10.1157L-18.1118 -18.187Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-21.0503 -10.1146L284.866 101.23L281.928 109.301L-23.9882 -2.04288L-21.0503 -10.1146ZM-15.174 -26.2597L290.742 85.0846L287.804 93.1571L-18.1121 -18.1871L-15.174 -26.2597Z",
    fill: "url(#Razzle_Paint6_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-23.9879 -2.04251L281.928 109.302L278.989 117.374L-26.9264 6.02972L-23.9879 -2.04251Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-54.2251 86.325L11.6601 -27.7906L16.9392 -24.7424L-48.9461 89.3732L-54.2251 86.325Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-48.9456 89.373L16.9392 -24.7428L22.2181 -21.695L-43.6667 92.4208L-48.9456 89.373Z",
    fill: "url(#Razzle_Paint7_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-43.667 92.4206L22.2174 -21.6951L27.4964 -18.6469L-38.3879 95.4688L-43.667 92.4206Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-36.1131 103.303L35.4873 -20.7104L41.2418 -17.3888L-30.3586 106.626L-36.1131 103.303Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-27.5245 101.718L38.4092 -12.4823L43.7079 -9.42311L-22.2263 104.778L-27.5245 101.718Z",
    fill: "url(#Razzle_Paint8_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-41.6954 100.508L29.9046 -23.5073L35.6593 -20.1848L-35.9407 103.83L-41.6954 100.508Z",
    fill: "url(#Razzle_Paint9_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M-22.2251 104.777L43.7067 -9.42081L49.0059 -6.36161L-16.9278 107.838L-22.2251 104.777Z",
    fill: "black"
  })), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Razzle_Paint0_Linear_".concat(id),
    x1: "-82.3433",
    y1: "-48.3261",
    x2: "202.41",
    y2: "116.076",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint1_Linear_".concat(id),
    x1: "-99.5245",
    y1: "-18.5684",
    x2: "185.228",
    y2: "145.834",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint2_Linear_".concat(id),
    x1: "186.413",
    y1: "123.558",
    x2: "-98.3399",
    y2: "-40.8443",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint3_Linear_".concat(id),
    x1: "0.624596",
    y1: "-95.3891",
    x2: "285.377",
    y2: "69.013",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint4_Linear_".concat(id),
    x1: "-12.2395",
    y1: "-73.1083",
    x2: "272.513",
    y2: "91.2939",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint5_Linear_".concat(id),
    x1: "-9.97028",
    y1: "-38.1005",
    x2: "299.005",
    y2: "74.3572",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint6_Linear_".concat(id),
    x1: "-18.7698",
    y1: "-13.9246",
    x2: "290.205",
    y2: "98.5331",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint7_Linear_".concat(id),
    x1: "-46.1493",
    y1: "90.5949",
    x2: "20.3943",
    y2: "-24.6621",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint8_Linear_".concat(id),
    x1: "-24.7187",
    y1: "102.946",
    x2: "41.8748",
    y2: "-12.397",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  })), React.createElement("linearGradient", {
    id: "Razzle_Paint9_Linear_".concat(id),
    x1: "-38.6477",
    y1: "101.841",
    x2: "33.6683",
    y2: "-23.4144",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3023AE"
  }), React.createElement("stop", {
    offset: "0.70741",
    stopColor: "#53A0FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#B4EC51"
  }))));
};
var RazzleIconDark = _ref2 => {
  var props = _extends$D({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M7 29V2H20.1143C20.6828 2 21.2776 2.09411 21.8994 2.28157C22.5204 2.46903 23.048 2.71974 23.4823 3.03526C23.632 3.15483 23.8264 3.32069 24.0663 3.52974L24.7621 4.25026L25.4132 4.94763C25.6231 5.17289 25.7874 5.36034 25.9069 5.51C26.207 5.915 26.4238 6.38711 26.5588 6.92789C26.693 7.46789 26.7609 7.98474 26.7609 8.48V12.3047C26.7609 13.4156 26.4755 14.3899 25.9069 15.23C25.7696 15.4369 25.6158 15.6324 25.4472 15.8147C25.2451 16.04 25.0244 16.2722 24.7845 16.5121C24.5454 16.7528 24.3062 16.9773 24.0663 17.1871C23.8272 17.3977 23.632 17.5551 23.4823 17.66C23.3026 17.8097 23.1229 17.93 22.9431 18.0203L22.4047 18.2903L23.2802 19.9103L24.2453 21.6876L25.2335 23.465L26.1546 25.1753L28.2428 29H22.1347L16.7902 18.6953H12.4795V29H7ZM12.4795 13.4303H20.1135C20.1444 13.4303 20.2115 13.3963 20.3156 13.3284C20.4205 13.2613 20.5332 13.1711 20.6527 13.0584C20.7723 12.9466 20.8888 12.8301 21.0007 12.7097C21.1133 12.5902 21.2066 12.4706 21.2815 12.3503V8.345C21.1341 8.13285 20.9647 7.93685 20.7762 7.76026C20.5796 7.56528 20.3568 7.39859 20.1143 7.265H12.4795V13.4303Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.3285 2H7V11.2292L12.3285 2ZM7 21.1644V29H9.45805L12.4795 23.7668V18.6953H15.4075L18.4472 13.4303H12.4795V11.8635L7.08219 21.2118L7 21.1644ZM21.5491 27.871L18.9021 22.7673L26.7609 9.15556V12.3047C26.7609 13.4156 26.4755 14.3899 25.9069 15.23C25.7696 15.4369 25.6158 15.6324 25.4472 15.8147C25.2451 16.04 25.0244 16.2722 24.7845 16.5121C24.5454 16.7528 24.3062 16.9773 24.0663 17.1871C23.8272 17.3977 23.632 17.5551 23.4823 17.66C23.3026 17.8097 23.1229 17.93 22.9431 18.0203L22.4047 18.2903L23.2802 19.9103L24.2453 21.6876L24.6739 22.4586L21.5491 27.871ZM26.7429 29H28.2428L27.5138 27.6648L26.7429 29ZM24.0663 3.52974L24.127 3.5926L21.2815 8.52126V8.345C21.1341 8.13285 20.9647 7.93685 20.7762 7.76026C20.5796 7.56528 20.3568 7.39859 20.1143 7.265H15.1344L18.1741 2H20.1143C20.6828 2 21.2776 2.09411 21.8994 2.28157C22.5204 2.46903 23.048 2.71974 23.4823 3.03526C23.632 3.15483 23.8264 3.32069 24.0663 3.52974Z",
    fill: "black"
  }));
};
var RazzleIconLight = _ref3 => {
  var props = _extends$D({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M7 29V2H20.1143C20.6828 2 21.2776 2.09411 21.8994 2.28157C22.5204 2.46903 23.048 2.71974 23.4823 3.03526C23.632 3.15483 23.8264 3.32069 24.0663 3.52974L24.7621 4.25026L25.4132 4.94763C25.6231 5.17289 25.7874 5.36034 25.9069 5.51C26.207 5.915 26.4238 6.38711 26.5588 6.92789C26.693 7.46789 26.7609 7.98474 26.7609 8.48V12.3047C26.7609 13.4156 26.4755 14.3899 25.9069 15.23C25.7696 15.4369 25.6158 15.6324 25.4472 15.8147C25.2451 16.04 25.0244 16.2722 24.7845 16.5121C24.5454 16.7528 24.3062 16.9773 24.0663 17.1871C23.8272 17.3977 23.632 17.5551 23.4823 17.66C23.3026 17.8097 23.1229 17.93 22.9431 18.0203L22.4047 18.2903L23.2802 19.9103L24.2453 21.6876L25.2335 23.465L26.1546 25.1753L28.2428 29H22.1347L16.7902 18.6953H12.4795V29H7ZM12.4795 13.4303H20.1135C20.1444 13.4303 20.2115 13.3963 20.3156 13.3284C20.4205 13.2613 20.5332 13.1711 20.6527 13.0584C20.7723 12.9466 20.8888 12.8301 21.0007 12.7097C21.1133 12.5902 21.2066 12.4706 21.2815 12.3503V8.345C21.1341 8.13285 20.9647 7.93685 20.7762 7.76026C20.5796 7.56528 20.3568 7.39859 20.1143 7.265H12.4795V13.4303Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.3285 2H7V11.2292L12.3285 2ZM7 21.1644V29H9.45805L12.4795 23.7668V18.6953H15.4075L18.4472 13.4303H12.4795V11.8635L7.08219 21.2118L7 21.1644ZM21.5491 27.871L18.9021 22.7673L26.7609 9.15556V12.3047C26.7609 13.4156 26.4755 14.3899 25.9069 15.23C25.7696 15.4369 25.6158 15.6324 25.4472 15.8147C25.2451 16.04 25.0244 16.2722 24.7845 16.5121C24.5454 16.7528 24.3062 16.9773 24.0663 17.1871C23.8272 17.3977 23.632 17.5551 23.4823 17.66C23.3026 17.8097 23.1229 17.93 22.9431 18.0203L22.4047 18.2903L23.2802 19.9103L24.2453 21.6876L24.6739 22.4586L21.5491 27.871ZM26.7429 29H28.2428L27.5138 27.6648L26.7429 29ZM24.0663 3.52974L24.127 3.5926L21.2815 8.52126V8.345C21.1341 8.13285 20.9647 7.93685 20.7762 7.76026C20.5796 7.56528 20.3568 7.39859 20.1143 7.265H15.1344L18.1741 2H20.1143C20.6828 2 21.2776 2.09411 21.8994 2.28157C22.5204 2.46903 23.048 2.71974 23.4823 3.03526C23.632 3.15483 23.8264 3.32069 24.0663 3.52974Z",
    fill: "white"
  }));
};

function _extends$E() {
  _extends$E = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$E.apply(this, arguments);
}
var ReactIcon = _ref => {
  var props = _extends$E({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M26.3104 10.978C25.9785 10.8637 25.6345 10.7556 25.2803 10.6533C25.3385 10.4158 25.3919 10.1813 25.4395 9.95075C26.2192 6.16561 25.7094 3.11628 23.9684 2.11231C22.299 1.14964 19.5689 2.15338 16.8116 4.55297C16.5465 4.78372 16.2806 5.02802 16.0148 5.28405C15.8377 5.11465 15.6609 4.95095 15.4846 4.79437C12.5948 2.22857 9.69833 1.1473 7.95907 2.15418C6.2913 3.11964 5.7974 5.9863 6.49931 9.5735C6.5671 9.91999 6.64633 10.2738 6.73592 10.6336C6.32599 10.7499 5.93023 10.874 5.55156 11.006C2.16367 12.1871 0 14.0383 0 15.9585C0 17.9417 2.3227 19.9308 5.85146 21.1369C6.12993 21.2321 6.41889 21.3221 6.71667 21.4075C6.62001 21.7966 6.53594 22.1779 6.46537 22.5498C5.79609 26.0747 6.31875 28.8737 7.98209 29.8331C9.70016 30.8238 12.5836 29.8054 15.3913 27.3512C15.6132 27.1572 15.8359 26.9514 16.059 26.7358C16.3482 27.0142 16.6369 27.2778 16.9241 27.525C19.6437 29.8653 22.3297 30.8103 23.9915 29.8483C25.7079 28.8547 26.2657 25.8479 25.5415 22.1898C25.4862 21.9104 25.4219 21.625 25.3496 21.3345C25.5521 21.2746 25.7509 21.2128 25.9447 21.1485C29.6132 19.9331 32 17.9681 32 15.9585C32 14.0314 29.7666 12.1677 26.3104 10.978ZM25.5148 19.8509C25.3398 19.9089 25.1602 19.9649 24.9773 20.0191C24.5723 18.737 24.0257 17.3737 23.3568 15.9652C23.9951 14.5902 24.5206 13.2443 24.9142 11.9705C25.2416 12.0652 25.5593 12.1651 25.8655 12.2705C28.8267 13.2899 30.633 14.7972 30.633 15.9585C30.633 17.1955 28.6822 18.8014 25.5148 19.8509ZM24.2005 22.4553C24.5207 24.0728 24.5664 25.5353 24.3543 26.6786C24.1637 27.706 23.7804 28.3909 23.3065 28.6652C22.2981 29.2489 20.1415 28.4902 17.8156 26.4887C17.549 26.2593 17.2805 26.0143 17.011 25.755C17.9127 24.7689 18.8139 23.6225 19.6934 22.3492C21.2403 22.212 22.7019 21.9876 24.0273 21.6812C24.0925 21.9445 24.1505 22.2027 24.2005 22.4553ZM10.9095 28.5643C9.92424 28.9123 9.1395 28.9223 8.66514 28.6488C7.65576 28.0666 7.23614 25.8193 7.80853 22.8048C7.87409 22.4595 7.95213 22.1049 8.04206 21.7424C9.35293 22.0323 10.8037 22.2409 12.3544 22.3666C13.2399 23.6124 14.167 24.7576 15.1014 25.7603C14.8973 25.9574 14.6939 26.145 14.4917 26.3218C13.2502 27.4071 12.006 28.1771 10.9095 28.5643ZM6.29358 19.8434C4.73323 19.3101 3.44463 18.6169 2.56136 17.8605C1.76768 17.1809 1.36697 16.5061 1.36697 15.9585C1.36697 14.7933 3.10418 13.307 6.00154 12.2969C6.3531 12.1743 6.72112 12.0588 7.10303 11.9503C7.50346 13.2528 8.02874 14.6147 8.66264 15.9918C8.02053 17.3893 7.48779 18.7729 7.08344 20.0907C6.81117 20.0124 6.54739 19.9301 6.29358 19.8434ZM7.84088 9.31098C7.2395 6.23755 7.6389 3.91907 8.64396 3.33728C9.71451 2.71751 12.0818 3.60118 14.5769 5.81662C14.7364 5.95822 14.8965 6.10643 15.057 6.25977C14.1273 7.2581 13.2086 8.39467 12.331 9.6332C10.826 9.77269 9.3854 9.99677 8.06086 10.2968C7.97759 9.96185 7.90382 9.63274 7.84088 9.31098ZM21.6442 12.7194C21.3276 12.1725 21.0025 11.6385 20.6711 11.119C21.6921 11.2481 22.6704 11.4194 23.589 11.6291C23.3132 12.513 22.9695 13.4372 22.5648 14.3846C22.2746 13.8335 21.9675 13.2779 21.6442 12.7194ZM16.0153 7.23674C16.6458 7.91985 17.2773 8.68254 17.8983 9.51005C17.2725 9.48049 16.6389 9.46511 16 9.46511C15.3672 9.46511 14.7382 9.48015 14.1162 9.5092C14.7379 8.68938 15.3749 7.92771 16.0153 7.23674ZM10.3502 12.7288C10.0339 13.2773 9.73263 13.8299 9.44692 14.3836C9.04883 13.4395 8.70826 12.5111 8.43007 11.6146C9.34308 11.4103 10.3167 11.2433 11.3312 11.1167C10.9951 11.6409 10.6674 12.1788 10.3502 12.7287V12.7288ZM11.3604 20.8979C10.3122 20.7809 9.324 20.6225 8.41122 20.4238C8.69385 19.5114 9.04193 18.5631 9.44845 17.5987C9.7349 18.152 10.0374 18.7048 10.3556 19.2545H10.3557C10.6799 19.8144 11.0157 20.363 11.3604 20.8979ZM16.0531 24.7766C15.4052 24.0776 14.7589 23.3043 14.1277 22.4725C14.7405 22.4965 15.3651 22.5089 16 22.5089C16.6522 22.5089 17.297 22.4942 17.9317 22.4659C17.3085 23.3127 16.6794 24.0871 16.0531 24.7766ZM22.5779 17.5496C23.0056 18.5244 23.3661 19.4677 23.6524 20.3645C22.7246 20.5762 21.7228 20.7467 20.6674 20.8734C20.9996 20.3469 21.3275 19.8038 21.6497 19.2451C21.9757 18.6798 22.2852 18.1137 22.5779 17.5496ZM20.4656 18.5621C19.9654 19.4294 19.4518 20.2574 18.9305 21.039C17.9809 21.1068 16.9999 21.1418 16 21.1418C15.0042 21.1418 14.0355 21.1109 13.1028 21.0503C12.5604 20.2585 12.0357 19.4281 11.5386 18.5696H11.5388C11.043 17.7134 10.5868 16.8499 10.1734 15.9913C10.5867 15.1307 11.0417 14.2663 11.5346 13.4116L11.5345 13.4118C12.0287 12.5548 12.5488 11.7285 13.0861 10.9416C14.0378 10.8697 15.0137 10.8321 15.9999 10.8321H16C16.9907 10.8321 17.9678 10.87 18.9192 10.9425C19.4484 11.7236 19.965 12.5473 20.4611 13.4044C20.9628 14.2711 21.4237 15.1297 21.8406 15.9719C21.425 16.8285 20.9651 17.6958 20.4656 18.5621ZM23.2856 3.29662C24.3572 3.91457 24.7739 6.40678 24.1006 9.67483C24.0577 9.88336 24.0093 10.0958 23.9568 10.311C22.6292 10.0047 21.1875 9.77673 19.6782 9.63513C18.7989 8.38299 17.8877 7.24465 16.9731 6.25914C17.219 6.02259 17.4645 5.79703 17.7091 5.58417C20.0715 3.52821 22.2796 2.71648 23.2856 3.29662ZM16 13.101C17.5781 13.101 18.8575 14.3803 18.8575 15.9585C18.8575 17.5366 17.5781 18.816 16 18.816C14.4219 18.816 13.1425 17.5366 13.1425 15.9585C13.1425 14.3803 14.4219 13.101 16 13.101Z",
    fill: "#00D8FF"
  }));
};
var ReactIconDark = _ref2 => {
  var props = _extends$E({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M24.3829 11.8505C24.1005 11.7532 23.8079 11.6613 23.5066 11.5743C23.5561 11.3722 23.6016 11.1727 23.642 10.9766C24.3053 7.75647 23.8716 5.16233 22.3905 4.30823C20.9704 3.48926 18.6478 4.34317 16.3021 6.38456C16.0765 6.58086 15.8503 6.78869 15.6242 7.0065C15.4735 6.86239 15.3231 6.72313 15.1731 6.58992C12.7147 4.40713 10.2506 3.48727 8.77098 4.34384C7.35216 5.16519 6.93199 7.60393 7.52913 10.6556C7.58679 10.9504 7.6542 11.2514 7.73042 11.5575C7.38167 11.6565 7.04499 11.762 6.72285 11.8743C3.84068 12.8791 2 14.454 2 16.0875C2 17.7746 3.97598 19.4669 6.97798 20.4929C7.21489 20.5739 7.46071 20.6505 7.71404 20.7232C7.63181 21.0542 7.56029 21.3785 7.50025 21.6949C6.93088 24.6937 7.37552 27.0748 8.79056 27.891C10.2522 28.7338 12.7052 27.8674 15.0937 25.7795C15.2825 25.6145 15.472 25.4395 15.6618 25.256C15.9078 25.4929 16.1534 25.7171 16.3978 25.9274C18.7114 27.9184 20.9965 28.7223 22.4102 27.9039C23.8704 27.0586 24.3449 24.5007 23.7288 21.3886C23.6818 21.1509 23.627 20.9081 23.5655 20.661C23.7378 20.6101 23.9069 20.5575 24.0718 20.5028C27.1927 19.4688 29.2232 17.7972 29.2232 16.0875C29.2232 14.4481 27.3232 12.8626 24.3829 11.8505ZM23.706 19.3989C23.5572 19.4482 23.4044 19.4958 23.2488 19.542C22.9043 18.4513 22.4393 17.2915 21.8702 16.0932C22.4133 14.9234 22.8603 13.7785 23.1952 12.6948C23.4736 12.7754 23.7439 12.8604 24.0044 12.9501C26.5236 13.8173 28.0602 15.0995 28.0602 16.0875C28.0602 17.1399 26.4007 18.5061 23.706 19.3989ZM22.5879 21.6145C22.8604 22.9906 22.8993 24.2348 22.7188 25.2074C22.5567 26.0814 22.2306 26.6641 21.8275 26.8974C20.9695 27.394 19.1349 26.7485 17.1562 25.0459C16.9294 24.8507 16.7009 24.6423 16.4717 24.4217C17.2388 23.5827 18.0054 22.6075 18.7536 21.5243C20.0697 21.4075 21.313 21.2166 22.4406 20.9559C22.4961 21.18 22.5454 21.3997 22.5879 21.6145ZM11.281 26.8116C10.4428 27.1076 9.7752 27.1161 9.37165 26.8834C8.51295 26.3882 8.15597 24.4763 8.64291 21.9118C8.69868 21.6181 8.76507 21.3164 8.84158 21.008C9.95677 21.2546 11.191 21.4321 12.5102 21.539C13.2635 22.5989 14.0523 23.5731 14.8471 24.4262C14.6735 24.5938 14.5005 24.7535 14.3285 24.9039C13.2722 25.8271 12.2138 26.4822 11.281 26.8116ZM7.3541 19.3925C6.02667 18.9388 4.93043 18.3491 4.17901 17.7056C3.50381 17.1274 3.16292 16.5533 3.16292 16.0875C3.16292 15.0962 4.64081 13.8319 7.10566 12.9725C7.40474 12.8682 7.71782 12.7699 8.04272 12.6776C8.38338 13.7857 8.83025 14.9443 9.36952 16.1158C8.82327 17.3048 8.37005 18.4818 8.02605 19.6029C7.79443 19.5363 7.57003 19.4662 7.3541 19.3925ZM8.67043 10.4323C8.15883 7.81767 8.49861 5.84528 9.35363 5.35034C10.2644 4.82308 12.2783 5.57484 14.4009 7.45957C14.5366 7.58004 14.6728 7.70612 14.8094 7.83657C14.0184 8.68587 13.2369 9.65278 12.4903 10.7064C11.21 10.8251 9.98439 11.0157 8.85757 11.271C8.78673 10.986 8.72398 10.706 8.67043 10.4323ZM20.4133 13.3319C20.1439 12.8666 19.8674 12.4124 19.5855 11.9705C20.454 12.0803 21.2862 12.226 22.0678 12.4044C21.8331 13.1564 21.5407 13.9426 21.1964 14.7486C20.9495 14.2797 20.6883 13.807 20.4133 13.3319ZM15.6246 8.6677C16.161 9.24885 16.6982 9.89769 17.2266 10.6017C16.6941 10.5765 16.1551 10.5634 15.6116 10.5634C15.0732 10.5634 14.5382 10.5762 14.009 10.6009C14.5379 9.9035 15.0798 9.25553 15.6246 8.6677ZM10.8052 13.34C10.5361 13.8066 10.2798 14.2767 10.0367 14.7477C9.69806 13.9445 9.40834 13.1547 9.17167 12.3921C9.94839 12.2183 10.7767 12.0762 11.6397 11.9684C11.3538 12.4144 11.075 12.872 10.8052 13.3399V13.34ZM11.6646 20.2896C10.7729 20.1901 9.93216 20.0553 9.15563 19.8863C9.39608 19.11 9.6922 18.3034 10.038 17.4829C10.2817 17.9536 10.5391 18.4239 10.8098 18.8915H10.8099C11.0856 19.3679 11.3713 19.8345 11.6646 20.2896ZM15.6568 23.5893C15.1056 22.9946 14.5558 22.3368 14.0188 21.6292C14.5401 21.6496 15.0715 21.6601 15.6116 21.6601C16.1665 21.6601 16.715 21.6476 17.2549 21.6235C16.7248 22.3439 16.1895 23.0028 15.6568 23.5893ZM21.2075 17.4411C21.5714 18.2704 21.8781 19.0729 22.1217 19.8359C21.3324 20.0159 20.4802 20.161 19.5823 20.2687C19.8649 19.8209 20.1438 19.3588 20.4179 18.8835C20.6953 18.4026 20.9586 17.921 21.2075 17.4411ZM19.4106 18.3025C18.985 19.0403 18.5481 19.7447 18.1046 20.4096C17.2968 20.4674 16.4622 20.4971 15.6116 20.4971C14.7644 20.4971 13.9404 20.4708 13.1468 20.4193C12.6854 19.7457 12.239 19.0392 11.8162 18.3088H11.8163C11.3946 17.5804 11.0064 16.8459 10.6547 16.1154C11.0063 15.3833 11.3935 14.6479 11.8128 13.9208L11.8127 13.921C12.2331 13.1919 12.6755 12.4889 13.1327 11.8195C13.9423 11.7583 14.7725 11.7264 15.6115 11.7264H15.6116C16.4544 11.7264 17.2857 11.7586 18.0951 11.8203C18.5452 12.4848 18.9847 13.1855 19.4067 13.9147C19.8336 14.652 20.2257 15.3825 20.5803 16.0989C20.2268 16.8277 19.8355 17.5655 19.4106 18.3025ZM21.8096 5.31574C22.7212 5.84145 23.0758 7.96164 22.503 10.7419C22.4665 10.9193 22.4253 11.0999 22.3806 11.2831C21.2512 11.0225 20.0248 10.8285 18.7407 10.7081C17.9927 9.64285 17.2175 8.67444 16.4394 7.83604C16.6486 7.63479 16.8575 7.44291 17.0655 7.26182C19.0753 5.51277 20.9538 4.82221 21.8096 5.31574ZM15.6116 13.6566C16.9541 13.6566 18.0425 14.7449 18.0425 16.0875C18.0425 17.4301 16.9541 18.5185 15.6116 18.5185C14.269 18.5185 13.1807 17.4301 13.1807 16.0875C13.1807 14.7449 14.269 13.6566 15.6116 13.6566Z",
    fill: "black"
  }));
};
var ReactIconLight = _ref3 => {
  var props = _extends$E({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M24.3829 11.8505C24.1005 11.7532 23.8079 11.6613 23.5066 11.5743C23.5561 11.3722 23.6016 11.1727 23.642 10.9766C24.3053 7.75647 23.8716 5.16233 22.3905 4.30823C20.9704 3.48926 18.6478 4.34317 16.3021 6.38456C16.0765 6.58086 15.8503 6.78869 15.6242 7.0065C15.4735 6.86239 15.3231 6.72313 15.1731 6.58992C12.7147 4.40713 10.2506 3.48727 8.77098 4.34384C7.35216 5.16519 6.93199 7.60393 7.52913 10.6556C7.58679 10.9504 7.6542 11.2514 7.73042 11.5575C7.38167 11.6565 7.04499 11.762 6.72285 11.8743C3.84068 12.8791 2 14.454 2 16.0875C2 17.7746 3.97598 19.4669 6.97798 20.4929C7.21489 20.5739 7.46071 20.6505 7.71404 20.7232C7.63181 21.0542 7.56029 21.3785 7.50025 21.6949C6.93088 24.6937 7.37552 27.0748 8.79056 27.891C10.2522 28.7338 12.7052 27.8674 15.0937 25.7795C15.2825 25.6145 15.472 25.4395 15.6618 25.256C15.9078 25.4929 16.1534 25.7171 16.3978 25.9274C18.7114 27.9184 20.9965 28.7223 22.4102 27.9039C23.8704 27.0586 24.3449 24.5007 23.7288 21.3886C23.6818 21.1509 23.627 20.9081 23.5655 20.661C23.7378 20.6101 23.9069 20.5575 24.0718 20.5028C27.1927 19.4688 29.2232 17.7972 29.2232 16.0875C29.2232 14.4481 27.3232 12.8626 24.3829 11.8505ZM23.706 19.3989C23.5572 19.4482 23.4044 19.4958 23.2488 19.542C22.9043 18.4513 22.4393 17.2915 21.8702 16.0932C22.4133 14.9234 22.8603 13.7785 23.1952 12.6948C23.4736 12.7754 23.7439 12.8604 24.0044 12.9501C26.5236 13.8173 28.0602 15.0995 28.0602 16.0875C28.0602 17.1399 26.4007 18.5061 23.706 19.3989ZM22.5879 21.6145C22.8604 22.9906 22.8993 24.2348 22.7188 25.2074C22.5567 26.0814 22.2306 26.6641 21.8275 26.8974C20.9695 27.394 19.1349 26.7485 17.1562 25.0459C16.9294 24.8507 16.7009 24.6423 16.4717 24.4217C17.2388 23.5827 18.0054 22.6075 18.7536 21.5243C20.0697 21.4075 21.313 21.2166 22.4406 20.9559C22.4961 21.18 22.5454 21.3997 22.5879 21.6145ZM11.281 26.8116C10.4428 27.1076 9.7752 27.1161 9.37165 26.8834C8.51295 26.3882 8.15597 24.4763 8.64291 21.9118C8.69868 21.6181 8.76507 21.3164 8.84158 21.008C9.95677 21.2546 11.191 21.4321 12.5102 21.539C13.2635 22.5989 14.0523 23.5731 14.8471 24.4262C14.6735 24.5938 14.5005 24.7535 14.3285 24.9039C13.2722 25.8271 12.2138 26.4822 11.281 26.8116ZM7.3541 19.3925C6.02667 18.9388 4.93043 18.3491 4.17901 17.7056C3.50381 17.1274 3.16292 16.5533 3.16292 16.0875C3.16292 15.0962 4.64081 13.8319 7.10566 12.9725C7.40474 12.8682 7.71782 12.7699 8.04272 12.6776C8.38338 13.7857 8.83025 14.9443 9.36952 16.1158C8.82327 17.3048 8.37005 18.4818 8.02605 19.6029C7.79443 19.5363 7.57003 19.4662 7.3541 19.3925ZM8.67043 10.4323C8.15883 7.81767 8.49861 5.84528 9.35363 5.35034C10.2644 4.82308 12.2783 5.57484 14.4009 7.45957C14.5366 7.58004 14.6728 7.70612 14.8094 7.83657C14.0184 8.68587 13.2369 9.65278 12.4903 10.7064C11.21 10.8251 9.98439 11.0157 8.85757 11.271C8.78673 10.986 8.72398 10.706 8.67043 10.4323ZM20.4133 13.3319C20.1439 12.8666 19.8674 12.4124 19.5855 11.9705C20.454 12.0803 21.2862 12.226 22.0678 12.4044C21.8331 13.1564 21.5407 13.9426 21.1964 14.7486C20.9495 14.2797 20.6883 13.807 20.4133 13.3319ZM15.6246 8.6677C16.161 9.24885 16.6982 9.89769 17.2266 10.6017C16.6941 10.5765 16.1551 10.5634 15.6116 10.5634C15.0732 10.5634 14.5382 10.5762 14.009 10.6009C14.5379 9.9035 15.0798 9.25553 15.6246 8.6677ZM10.8052 13.34C10.5361 13.8066 10.2798 14.2767 10.0367 14.7477C9.69806 13.9445 9.40834 13.1547 9.17167 12.3921C9.94839 12.2183 10.7767 12.0762 11.6397 11.9684C11.3538 12.4144 11.075 12.872 10.8052 13.3399V13.34ZM11.6646 20.2896C10.7729 20.1901 9.93216 20.0553 9.15563 19.8863C9.39608 19.11 9.6922 18.3034 10.038 17.4829C10.2817 17.9536 10.5391 18.4239 10.8098 18.8915H10.8099C11.0856 19.3679 11.3713 19.8345 11.6646 20.2896ZM15.6568 23.5893C15.1056 22.9946 14.5558 22.3368 14.0188 21.6292C14.5401 21.6496 15.0715 21.6601 15.6116 21.6601C16.1665 21.6601 16.715 21.6476 17.2549 21.6235C16.7248 22.3439 16.1895 23.0028 15.6568 23.5893ZM21.2075 17.4411C21.5714 18.2704 21.8781 19.0729 22.1217 19.8359C21.3324 20.0159 20.4802 20.161 19.5823 20.2687C19.8649 19.8209 20.1438 19.3588 20.4179 18.8835C20.6953 18.4026 20.9586 17.921 21.2075 17.4411ZM19.4106 18.3025C18.985 19.0403 18.5481 19.7447 18.1046 20.4096C17.2968 20.4674 16.4622 20.4971 15.6116 20.4971C14.7644 20.4971 13.9404 20.4708 13.1468 20.4193C12.6854 19.7457 12.239 19.0392 11.8162 18.3088H11.8163C11.3946 17.5804 11.0064 16.8459 10.6547 16.1154C11.0063 15.3833 11.3935 14.6479 11.8128 13.9208L11.8127 13.921C12.2331 13.1919 12.6755 12.4889 13.1327 11.8195C13.9423 11.7583 14.7725 11.7264 15.6115 11.7264H15.6116C16.4544 11.7264 17.2857 11.7586 18.0951 11.8203C18.5452 12.4848 18.9847 13.1855 19.4067 13.9147C19.8336 14.652 20.2257 15.3825 20.5803 16.0989C20.2268 16.8277 19.8355 17.5655 19.4106 18.3025ZM21.8096 5.31574C22.7212 5.84145 23.0758 7.96164 22.503 10.7419C22.4665 10.9193 22.4253 11.0999 22.3806 11.2831C21.2512 11.0225 20.0248 10.8285 18.7407 10.7081C17.9927 9.64285 17.2175 8.67444 16.4394 7.83604C16.6486 7.63479 16.8575 7.44291 17.0655 7.26182C19.0753 5.51277 20.9538 4.82221 21.8096 5.31574ZM15.6116 13.6566C16.9541 13.6566 18.0425 14.7449 18.0425 16.0875C18.0425 17.4301 16.9541 18.5185 15.6116 18.5185C14.269 18.5185 13.1807 17.4301 13.1807 16.0875C13.1807 14.7449 14.269 13.6566 15.6116 13.6566Z",
    fill: "white"
  }));
};

function _extends$F() {
  _extends$F = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$F.apply(this, arguments);
}
var ReasonIcon = _ref => {
  var props = _extends$F({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    filter: "url(#Reason_Filter0_i_".concat(id, ")")
  }, React.createElement("path", {
    d: "M31.7064 0H0V31.7064H31.7064V0Z",
    fill: "black"
  })), React.createElement("path", {
    d: "M31.7064 0H0V31.7064H31.7064V0Z",
    fill: "#DD4B39"
  }), React.createElement("path", {
    d: "M31.633 0.0733953H0.0733948V31.633H31.633V0.0733953Z",
    stroke: "#D74837",
    strokeWidth: "0.146789"
  }), React.createElement("path", {
    d: "M18.8078 28.9174H15.2223L13.4555 25.5571H11.0999V28.9174H7.93011V16.7753H13.3863C16.608 16.7753 18.444 18.3342 18.444 21.0363C18.444 22.8724 17.6819 24.2234 16.2789 24.9509L18.8078 28.9174ZM11.0999 19.3042V23.0282H13.4036C14.6853 23.0282 15.4302 22.37 15.4302 21.1402C15.4302 19.9451 14.6853 19.3042 13.4036 19.3042H11.0999ZM20.4706 16.7753H30.0492V19.3042H23.6404V21.5733H29.4256V24.0848L23.6404 24.1022V26.3885H30.2224V28.9174H20.4706V16.7753Z",
    fill: "white"
  }), React.createElement("g", {
    filter: "url(#Reason_Filter1_i_".concat(id, ")")
  }, React.createElement("path", {
    d: "M18.8078 28.9174H15.2223L13.4555 25.5571H11.0999V28.9174H7.93011V16.7753H13.3863C16.608 16.7753 18.444 18.3342 18.444 21.0363C18.444 22.8724 17.6819 24.2234 16.2789 24.9509L18.8078 28.9174ZM11.0999 19.3042V23.0282H13.4036C14.6853 23.0282 15.4302 22.37 15.4302 21.1402C15.4302 19.9451 14.6853 19.3042 13.4036 19.3042H11.0999ZM20.4706 16.7753H30.0492V19.3042H23.6404V21.5733H29.4256V24.0848L23.6404 24.1022V26.3885H30.2224V28.9174H20.4706V16.7753Z",
    fill: "white"
  })), React.createElement("defs", null, React.createElement("filter", {
    id: "Reason_Filter0_i_".concat(id),
    x: "0",
    y: "0",
    width: "31.7064",
    height: "32",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), React.createElement("feOffset", {
    dy: "0.293578"
  }), React.createElement("feGaussianBlur", {
    stdDeviation: "0.293578"
  }), React.createElement("feComposite", {
    in2: "hardAlpha",
    operator: "arithmetic",
    k2: "-1",
    k3: "1"
  }), React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
  }), React.createElement("feBlend", {
    mode: "normal",
    in2: "shape",
    result: "effect1_innerShadow"
  })), React.createElement("filter", {
    id: "Reason_Filter1_i_".concat(id),
    x: "7.93011",
    y: "16.7753",
    width: "22.2923",
    height: "12.4357",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "BackgroundImageFix",
    result: "shape"
  }), React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), React.createElement("feOffset", {
    dy: "0.293578"
  }), React.createElement("feGaussianBlur", {
    stdDeviation: "0.293578"
  }), React.createElement("feComposite", {
    in2: "hardAlpha",
    operator: "arithmetic",
    k2: "-1",
    k3: "1"
  }), React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
  }), React.createElement("feBlend", {
    mode: "normal",
    in2: "shape",
    result: "effect1_innerShadow"
  }))));
};
var ReasonIconDark = _ref2 => {
  var props = _extends$F({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 0H30V30H0V0ZM14.403 27.3611H17.7955L15.4028 23.608C16.7303 22.9197 17.4514 21.6414 17.4514 19.9042C17.4514 17.3475 15.7142 15.8725 12.6658 15.8725H7.50332V27.3611H10.5025V24.1817H12.7314L14.403 27.3611ZM10.5025 21.7889V18.2653H12.6822C13.895 18.2653 14.5997 18.8717 14.5997 20.0025C14.5997 21.1661 13.895 21.7889 12.6822 21.7889H10.5025ZM28.4319 15.8725H19.3689V27.3611H28.5958V24.9683H22.368V22.805L27.8419 22.7886V20.4122H22.368V18.2653H28.4319V15.8725Z",
    fill: "black"
  }));
};
var ReasonIconLight = _ref3 => {
  var props = _extends$F({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 0H30V30H0V0ZM14.403 27.3611H17.7955L15.4028 23.608C16.7303 22.9197 17.4514 21.6414 17.4514 19.9042C17.4514 17.3475 15.7142 15.8725 12.6658 15.8725H7.50332V27.3611H10.5025V24.1817H12.7314L14.403 27.3611ZM10.5025 21.7889V18.2653H12.6822C13.895 18.2653 14.5997 18.8717 14.5997 20.0025C14.5997 21.1661 13.895 21.7889 12.6822 21.7889H10.5025ZM28.4319 15.8725H19.3689V27.3611H28.5958V24.9683H22.368V22.805L27.8419 22.7886V20.4122H22.368V18.2653H28.4319V15.8725Z",
    fill: "white"
  }));
};

function _extends$G() {
  _extends$G = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$G.apply(this, arguments);
}
var RollupIcon = _ref => {
  var props = _extends$G({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Rollup_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M28.4374 10.5146C28.4374 8.63436 27.945 6.87167 27.0776 5.34401C24.7778 2.97698 19.7751 2.42859 18.5328 5.33282C17.257 8.3098 20.676 11.6225 22.1701 11.3595C24.0727 11.0238 21.8344 6.65903 21.8344 6.65903C24.7442 12.1429 24.0727 10.4642 18.8126 15.5004C13.5525 20.5367 8.18055 31.1631 7.39714 31.6108C7.36356 31.6332 7.32999 31.65 7.29082 31.6667H27.9226C28.2863 31.6667 28.5214 31.2806 28.3591 30.9561L22.9647 20.2793C22.8472 20.0498 22.9311 19.7644 23.155 19.6357C26.311 17.8227 28.4374 14.4204 28.4374 10.5146Z",
    fill: "url(#Rollup_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M28.4374 10.5146C28.4374 8.63436 27.945 6.87167 27.0776 5.34401C24.7778 2.97698 19.7751 2.42859 18.5328 5.33282C17.257 8.3098 20.676 11.6225 22.1701 11.3595C24.0727 11.0238 21.8344 6.65903 21.8344 6.65903C24.7442 12.1429 24.0727 10.4642 18.8126 15.5004C13.5525 20.5367 8.18055 31.1631 7.39714 31.6108C7.36356 31.6332 7.32999 31.65 7.29082 31.6667H27.9226C28.2863 31.6667 28.5214 31.2806 28.3591 30.9561L22.9647 20.2793C22.8472 20.0498 22.9311 19.7644 23.155 19.6357C26.311 17.8227 28.4374 14.4204 28.4374 10.5146Z",
    fill: "url(#Rollup_Paint1_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M7.39713 31.6108C8.18054 31.1631 13.5525 20.5311 18.8126 15.4948C24.0727 10.4586 24.7442 12.1373 21.8343 6.65343C21.8343 6.65343 10.6987 22.2658 6.66967 29.988",
    fill: "url(#Rollup_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M8.96397 17.6212C16.4847 3.79397 17.4696 2.40061 21.3867 2.40061C23.4459 2.40061 25.522 3.32951 26.865 4.98028C25.0352 2.03128 21.7952 0.0559582 18.0852 0H5.3099C5.0413 0 4.82306 0.218237 4.82306 0.486837V26.2388C5.58409 24.2747 6.87672 21.4656 8.96397 17.6212Z",
    fill: "url(#Rollup_Paint3_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M18.8126 15.4948C13.5525 20.5311 8.18055 31.1631 7.39713 31.6108C6.61372 32.0585 5.2987 32.1144 4.59922 31.331C3.85498 30.4972 2.69664 29.1486 8.96396 17.6212C16.4847 3.79397 17.4696 2.4006 21.3867 2.4006C23.4459 2.4006 25.522 3.32951 26.865 4.98028C26.9377 5.09779 27.0105 5.2209 27.0832 5.34401C24.7833 2.97697 19.7807 2.42858 18.5384 5.33281C17.2626 8.30979 20.6816 11.6225 22.1757 11.3595C24.0783 11.0238 21.8399 6.65902 21.8399 6.65902C24.7442 12.1373 24.0727 10.4586 18.8126 15.4948Z",
    fill: "url(#Rollup_Paint4_Linear_".concat(id, ")")
  }), React.createElement("path", {
    opacity: "0.3",
    d: "M9.5795 18.2368C17.1003 4.4095 18.0851 3.01614 22.0022 3.01614C23.6978 3.01614 25.4045 3.64847 26.7027 4.79002C25.3597 3.25676 23.3676 2.4006 21.3867 2.4006C17.4696 2.4006 16.4847 3.79396 8.96396 17.6212C2.69664 29.1486 3.85498 30.4972 4.59922 31.331C4.70554 31.4485 4.82865 31.5492 4.95735 31.6331C4.30264 30.6819 4.01166 28.4715 9.5795 18.2368Z",
    fill: "url(#Rollup_Paint5_Linear_".concat(id, ")")
  })), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Rollup_Paint0_Linear_".concat(id),
    x1: "12.9632",
    y1: "17.0086",
    x2: "21.695",
    y2: "18.1474",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#FF6533"
  }), React.createElement("stop", {
    offset: "0.157",
    stopColor: "#FF5633"
  }), React.createElement("stop", {
    offset: "0.434",
    stopColor: "#FF4333"
  }), React.createElement("stop", {
    offset: "0.714",
    stopColor: "#FF3733"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#FF3333"
  })), React.createElement("linearGradient", {
    id: "Rollup_Paint1_Linear_".concat(id),
    x1: "11.6154",
    y1: "14.1519",
    x2: "28.989",
    y2: "21.6678",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#BF3338"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#FF3333"
  })), React.createElement("linearGradient", {
    id: "Rollup_Paint2_Linear_".concat(id),
    x1: "12.1192",
    y1: "16.5108",
    x2: "14.8553",
    y2: "17.8243",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#FF6533"
  }), React.createElement("stop", {
    offset: "0.157",
    stopColor: "#FF5633"
  }), React.createElement("stop", {
    offset: "0.434",
    stopColor: "#FF4333"
  }), React.createElement("stop", {
    offset: "0.714",
    stopColor: "#FF3733"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#FF3333"
  })), React.createElement("linearGradient", {
    id: "Rollup_Paint3_Linear_".concat(id),
    x1: "16.1888",
    y1: "20.5566",
    x2: "15.2399",
    y2: "10.9592",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#FF6533"
  }), React.createElement("stop", {
    offset: "0.157",
    stopColor: "#FF5633"
  }), React.createElement("stop", {
    offset: "0.434",
    stopColor: "#FF4333"
  }), React.createElement("stop", {
    offset: "0.714",
    stopColor: "#FF3733"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#FF3333"
  })), React.createElement("linearGradient", {
    id: "Rollup_Paint4_Linear_".concat(id),
    x1: "13.2797",
    y1: "16.3459",
    x2: "16.7573",
    y2: "17.7903",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#FBB040"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#FB8840"
  })), React.createElement("linearGradient", {
    id: "Rollup_Paint5_Linear_".concat(id),
    x1: "16.537",
    y1: "4.12177",
    x2: "11.2033",
    y2: "39.5083",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "white"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "white",
    stopOpacity: "0"
  })), React.createElement("clipPath", {
    id: "Rollup_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var RollupIconDark = _ref2 => {
  var props = _extends$G({}, _ref2);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M25.8949 11.5601C25.8949 10.0294 25.494 8.59436 24.7879 7.35067C22.9155 5.42363 18.8428 4.97717 17.8314 7.34156C16.7927 9.76516 19.5762 12.4621 20.7926 12.248C22.3415 11.9746 20.5193 8.42125 20.5193 8.42125C22.8882 12.8858 22.3415 11.5191 18.0592 15.6192C13.7769 19.7193 9.40346 28.3704 8.76567 28.7349C8.73833 28.7531 8.711 28.7668 8.67911 28.7805H25.4758C25.7719 28.7805 25.9633 28.4661 25.8312 28.2019L21.4395 19.5097C21.3438 19.3229 21.4122 19.0906 21.5944 18.9858C24.1638 17.5098 25.8949 14.7399 25.8949 11.5601Z",
    fill: "black",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    d: "M8.76567 28.7349C9.40346 28.3704 13.7769 19.7147 18.0592 15.6146C22.3415 11.5145 22.8882 12.8812 20.5193 8.41667C20.5193 8.41667 11.4535 21.1269 8.17343 27.4138",
    fill: "black"
  }), React.createElement("path", {
    d: "M10.0413 17.3458C16.1641 6.08874 16.9658 4.95438 20.1548 4.95438C21.8313 4.95438 23.5214 5.71062 24.6148 7.05453C23.1251 4.6537 20.4874 3.04556 17.467 3H7.06641C6.84774 3 6.67007 3.17767 6.67007 3.39634V24.3615C7.28964 22.7624 8.34199 20.4755 10.0413 17.3458Z",
    fill: "black",
    fillOpacity: "0.8"
  }), React.createElement("path", {
    d: "M18.0592 15.6146C13.7769 19.7147 9.40346 28.3705 8.76567 28.7349C8.12788 29.0994 7.0573 29.1449 6.48784 28.5071C5.88194 27.8283 4.93892 26.7304 10.0413 17.3458C16.1641 6.08874 16.9658 4.95438 20.1548 4.95438C21.8313 4.95438 23.5214 5.71062 24.6148 7.05453C24.674 7.1502 24.7332 7.25043 24.7925 7.35065C22.9201 5.42361 18.8473 4.97715 17.836 7.34154C16.7973 9.76515 19.5808 12.4621 20.7972 12.248C22.3461 11.9746 20.5238 8.42123 20.5238 8.42123C22.8882 12.8812 22.3415 11.5145 18.0592 15.6146Z",
    fill: "black"
  }), React.createElement("path", {
    opacity: "0.3",
    d: "M10.5424 17.8469C16.6652 6.58986 17.467 5.4555 20.6559 5.4555C22.0363 5.4555 23.4258 5.97029 24.4827 6.89964C23.3893 5.65139 21.7675 4.95438 20.1548 4.95438C16.9658 4.95438 16.1641 6.08873 10.0413 17.3458C4.93892 26.7304 5.88194 27.8283 6.48784 28.5071C6.5744 28.6028 6.67462 28.6848 6.7794 28.7531C6.24639 27.9786 6.0095 26.1792 10.5424 17.8469Z",
    fill: "url(#paint0_linear-".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "paint0_linear-".concat(id),
    x1: "16.2066",
    y1: "6.3556",
    x2: "11.8643",
    y2: "35.1644",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "white"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "white",
    stopOpacity: "0"
  }))));
};
var RollupIconLight = _ref3 => {
  var props = _extends$G({}, _ref3);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M25.8949 11.5601C25.8949 10.0294 25.494 8.59436 24.7879 7.35067C22.9155 5.42363 18.8428 4.97717 17.8314 7.34156C16.7927 9.76516 19.5762 12.4621 20.7926 12.248C22.3415 11.9746 20.5193 8.42125 20.5193 8.42125C22.8882 12.8858 22.3415 11.5191 18.0592 15.6192C13.7769 19.7193 9.40346 28.3704 8.76567 28.7349C8.73833 28.7531 8.711 28.7668 8.67911 28.7805H25.4758C25.7719 28.7805 25.9633 28.4661 25.8312 28.2019L21.4395 19.5097C21.3438 19.3229 21.4122 19.0906 21.5944 18.9858C24.1638 17.5098 25.8949 14.7399 25.8949 11.5601Z",
    fill: "white",
    fillOpacity: "0.6"
  }), React.createElement("path", {
    d: "M8.76567 28.7349C9.40346 28.3704 13.7769 19.7147 18.0592 15.6146C22.3415 11.5145 22.8882 12.8812 20.5193 8.41667C20.5193 8.41667 11.4535 21.1269 8.17343 27.4138",
    fill: "white"
  }), React.createElement("path", {
    d: "M10.0413 17.3458C16.1641 6.08874 16.9658 4.95438 20.1548 4.95438C21.8313 4.95438 23.5214 5.71062 24.6148 7.05453C23.1251 4.6537 20.4874 3.04556 17.467 3H7.06641C6.84774 3 6.67007 3.17767 6.67007 3.39634V24.3615C7.28964 22.7624 8.34199 20.4755 10.0413 17.3458Z",
    fill: "white",
    fillOpacity: "0.8"
  }), React.createElement("path", {
    d: "M18.0592 15.6146C13.7769 19.7147 9.40346 28.3705 8.76567 28.7349C8.12788 29.0994 7.0573 29.1449 6.48784 28.5071C5.88194 27.8283 4.93892 26.7304 10.0413 17.3458C16.1641 6.08874 16.9658 4.95438 20.1548 4.95438C21.8313 4.95438 23.5214 5.71062 24.6148 7.05453C24.674 7.1502 24.7332 7.25043 24.7925 7.35065C22.9201 5.42361 18.8473 4.97715 17.836 7.34154C16.7973 9.76515 19.5808 12.4621 20.7972 12.248C22.3461 11.9746 20.5238 8.42123 20.5238 8.42123C22.8882 12.8812 22.3415 11.5145 18.0592 15.6146Z",
    fill: "white"
  }), React.createElement("path", {
    opacity: "0.3",
    d: "M10.5424 17.8469C16.6652 6.58986 17.467 5.4555 20.6559 5.4555C22.0363 5.4555 23.4258 5.97029 24.4827 6.89964C23.3893 5.65139 21.7675 4.95438 20.1548 4.95438C16.9658 4.95438 16.1641 6.08873 10.0413 17.3458C4.93892 26.7304 5.88194 27.8283 6.48784 28.5071C6.5744 28.6028 6.67462 28.6848 6.7794 28.7531C6.24639 27.9786 6.0095 26.1792 10.5424 17.8469Z",
    fill: "url(#paint0_linear-".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "paint0_linear-".concat(id),
    x1: "16.2066",
    y1: "6.3556",
    x2: "11.8643",
    y2: "35.1644",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "white"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "white",
    stopOpacity: "0"
  }))));
};

function _extends$H() {
  _extends$H = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$H.apply(this, arguments);
}
var SapperIcon = _ref => {
  var props = _extends$H({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M27.9264 4.23542C24.9531 -0.0244216 19.0922 -1.28236 14.8324 1.43364L7.39912 6.1795C5.36926 7.46603 3.96838 9.52448 3.53954 11.8974C3.19646 13.8701 3.48236 15.8999 4.42581 17.6725C3.79684 18.6445 3.33941 19.7309 3.13928 20.8745C2.71044 23.276 3.28223 25.7633 4.71171 27.7646C7.68501 32.0244 13.5459 33.2824 17.8057 30.5664L25.2676 25.8205C27.2974 24.534 28.6983 22.4755 29.1271 20.1026C29.4702 18.1299 29.1557 16.1001 28.2409 14.3275C28.8698 13.3555 29.3273 12.2691 29.5274 11.1255C29.9277 8.72397 29.3559 6.26527 27.9264 4.23542Z",
    fill: "#159497"
  }), React.createElement("path", {
    d: "M14.1177 28.1934C11.7161 28.8224 9.17167 27.8789 7.77078 25.8491C6.9131 24.6483 6.57002 23.1617 6.82733 21.7036C6.85592 21.4749 6.94169 21.2462 6.99887 21.0175L7.14181 20.5886L7.51348 20.8745C8.39975 21.5035 9.37179 22.0181 10.4296 22.3326L10.7155 22.4183L10.6869 22.7042C10.6583 23.1045 10.7727 23.4762 11.0014 23.7906C11.4302 24.391 12.2022 24.6769 12.9169 24.5054C13.0884 24.4482 13.2314 24.391 13.3743 24.3053L20.8076 19.5594C21.1793 19.3307 21.4366 18.959 21.4937 18.5302C21.5795 18.1013 21.4652 17.6439 21.2079 17.2722C20.779 16.6719 20.0071 16.386 19.2924 16.5575C19.1208 16.6147 18.9779 16.6719 18.8349 16.7576L15.976 18.5588C15.5185 18.8447 15.0039 19.0734 14.4607 19.2163C12.0592 19.8453 9.51474 18.9018 8.11386 16.872C7.25617 15.6712 6.9131 14.1846 7.19899 12.7265C7.4563 11.297 8.28539 10.0391 9.51474 9.26717L17.0052 4.49272C17.4626 4.20683 17.9772 3.97811 18.5204 3.83516C20.922 3.20619 23.4664 4.14965 24.8673 6.1795C25.725 7.38026 26.0681 8.86692 25.8108 10.325C25.7536 10.5537 25.6964 10.7824 25.6392 11.0111L25.4963 11.44L25.1246 11.1541C24.2383 10.4965 23.2663 10.0105 22.2085 9.69601L21.9226 9.61024L21.9512 9.32435C21.9798 8.9241 21.8654 8.52384 21.6367 8.20936C21.2079 7.60898 20.4359 7.32308 19.7212 7.52321C19.5497 7.58039 19.4067 7.63757 19.2638 7.72334L11.8019 12.4978C11.4302 12.7265 11.1729 13.0982 11.0872 13.527C11.0014 13.9559 11.1158 14.4133 11.3731 14.7849C11.8019 15.3853 12.5452 15.6712 13.2886 15.4997C13.4601 15.4425 13.603 15.3853 13.746 15.2996L16.6049 13.4984C17.0624 13.2125 17.577 12.9838 18.1202 12.8409C20.5217 12.2119 23.0662 13.1553 24.4671 15.1852C25.3247 16.386 25.6678 17.8726 25.4105 19.3307C25.1532 20.7602 24.3241 22.0181 23.0948 22.79L15.6329 27.5359C15.1755 27.8218 14.6609 28.0505 14.1177 28.1934Z",
    fill: "white"
  }));
};
var SapperIconDark = _ref2 => {
  var props = _extends$H({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.7231 2.29924C18.5836 -0.162139 23.895 0.977868 26.5895 4.83835C27.885 6.6779 28.4032 8.9061 28.0405 11.0825C27.8591 12.1188 27.4445 13.1034 26.8745 13.9843C27.7036 15.5907 27.9886 17.4302 27.6777 19.218C27.2891 21.3684 26.0195 23.2339 24.18 24.3998L17.4177 28.7008C13.5572 31.1621 8.24579 30.0221 5.55123 26.1617C4.25577 24.348 3.73759 22.0939 4.12622 19.9175C4.30759 18.8812 4.72214 17.8966 5.29214 17.0157C4.43714 15.4093 4.17804 13.5698 4.48895 11.782C4.87759 9.63156 6.14715 7.76609 7.9867 6.60017L14.7231 2.29924ZM8.32352 24.4257C9.59307 26.2653 11.899 27.1203 14.0754 26.5503C14.5676 26.4207 15.034 26.2135 15.4486 25.9544L22.2109 21.6534C23.325 20.9539 24.0763 19.8139 24.3095 18.5184C24.5427 17.1971 24.2318 15.8498 23.4545 14.7616C22.185 12.922 19.879 12.067 17.7027 12.637C17.2104 12.7666 16.744 12.9738 16.3295 13.2329L13.7386 14.8652C13.609 14.943 13.4795 14.9948 13.324 15.0466C12.6504 15.202 11.9767 14.943 11.5881 14.3989C11.3549 14.062 11.2513 13.6475 11.329 13.2589C11.4067 12.8702 11.6399 12.5334 11.9767 12.3261L18.739 7.99927C18.8686 7.92155 18.9981 7.86973 19.1536 7.81791C19.8013 7.63655 20.5009 7.89564 20.8895 8.43973C21.0968 8.72473 21.2004 9.08746 21.1745 9.45019L21.1486 9.70928L21.4077 9.78701C22.3663 10.072 23.2472 10.5125 24.0504 11.1084L24.3872 11.3675L24.5168 10.9788L24.6723 10.357C24.9054 9.03564 24.5945 7.68836 23.8172 6.60018C22.5477 4.76062 20.2418 3.90561 18.0654 4.47562C17.5731 4.60516 17.1068 4.81244 16.6922 5.07153L9.90398 9.39837C8.78989 10.0979 8.03852 11.2379 7.80533 12.5334C7.54624 13.8548 7.85715 15.202 8.63443 16.2902C9.90398 18.1298 12.2099 18.9848 14.3863 18.4148C14.8786 18.2852 15.3449 18.078 15.7595 17.8189L18.3504 16.1866C18.4799 16.1089 18.6095 16.057 18.7649 16.0052C19.4127 15.8498 20.1122 16.1089 20.5009 16.653C20.734 16.9898 20.8377 17.4043 20.76 17.793C20.7081 18.1816 20.475 18.5184 20.1381 18.7257L13.4017 23.0266C13.2722 23.1044 13.1426 23.1562 12.9872 23.208C12.3395 23.3635 11.6399 23.1044 11.2513 22.5603C11.044 22.2753 10.9404 21.9384 10.9663 21.5757L10.9922 21.3166L10.7331 21.2389C9.77444 20.9539 8.89352 20.4875 8.09034 19.9175L7.75352 19.6584L7.62397 20.0471C7.6067 20.1162 7.58654 20.1853 7.56639 20.2543C7.52609 20.3925 7.48579 20.5307 7.46851 20.6689C7.23533 21.9903 7.54624 23.3375 8.32352 24.4257Z",
    fill: "black"
  }));
};
var SapperIconLight = _ref3 => {
  var props = _extends$H({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.7231 2.29924C18.5836 -0.162139 23.895 0.977868 26.5895 4.83835C27.885 6.6779 28.4032 8.9061 28.0405 11.0825C27.8591 12.1188 27.4445 13.1034 26.8745 13.9843C27.7036 15.5907 27.9886 17.4302 27.6777 19.218C27.2891 21.3684 26.0195 23.2339 24.18 24.3998L17.4177 28.7008C13.5572 31.1621 8.24579 30.0221 5.55123 26.1617C4.25577 24.348 3.73759 22.0939 4.12622 19.9175C4.30759 18.8812 4.72214 17.8966 5.29214 17.0157C4.43714 15.4093 4.17804 13.5698 4.48895 11.782C4.87759 9.63156 6.14715 7.76609 7.9867 6.60017L14.7231 2.29924ZM8.32352 24.4257C9.59307 26.2653 11.899 27.1203 14.0754 26.5503C14.5676 26.4207 15.034 26.2135 15.4486 25.9544L22.2109 21.6534C23.325 20.9539 24.0763 19.8139 24.3095 18.5184C24.5427 17.1971 24.2318 15.8498 23.4545 14.7616C22.185 12.922 19.879 12.067 17.7027 12.637C17.2104 12.7666 16.744 12.9738 16.3295 13.2329L13.7386 14.8652C13.609 14.943 13.4795 14.9948 13.324 15.0466C12.6504 15.202 11.9767 14.943 11.5881 14.3989C11.3549 14.062 11.2513 13.6475 11.329 13.2589C11.4067 12.8702 11.6399 12.5334 11.9767 12.3261L18.739 7.99927C18.8686 7.92155 18.9981 7.86973 19.1536 7.81791C19.8013 7.63655 20.5009 7.89564 20.8895 8.43973C21.0968 8.72473 21.2004 9.08746 21.1745 9.45019L21.1486 9.70928L21.4077 9.78701C22.3663 10.072 23.2472 10.5125 24.0504 11.1084L24.3872 11.3675L24.5168 10.9788L24.6723 10.357C24.9054 9.03564 24.5945 7.68836 23.8172 6.60018C22.5477 4.76062 20.2418 3.90561 18.0654 4.47562C17.5731 4.60516 17.1068 4.81244 16.6922 5.07153L9.90398 9.39837C8.78989 10.0979 8.03852 11.2379 7.80533 12.5334C7.54624 13.8548 7.85715 15.202 8.63443 16.2902C9.90398 18.1298 12.2099 18.9848 14.3863 18.4148C14.8786 18.2852 15.3449 18.078 15.7595 17.8189L18.3504 16.1866C18.4799 16.1089 18.6095 16.057 18.7649 16.0052C19.4127 15.8498 20.1122 16.1089 20.5009 16.653C20.734 16.9898 20.8377 17.4043 20.76 17.793C20.7081 18.1816 20.475 18.5184 20.1381 18.7257L13.4017 23.0266C13.2722 23.1044 13.1426 23.1562 12.9872 23.208C12.3395 23.3635 11.6399 23.1044 11.2513 22.5603C11.044 22.2753 10.9404 21.9384 10.9663 21.5757L10.9922 21.3166L10.7331 21.2389C9.77444 20.9539 8.89352 20.4875 8.09034 19.9175L7.75352 19.6584L7.62397 20.0471C7.6067 20.1162 7.58654 20.1853 7.56639 20.2543C7.52609 20.3925 7.48579 20.5307 7.46851 20.6689C7.23533 21.9903 7.54624 23.3375 8.32352 24.4257Z",
    fill: "white"
  }));
};

function _extends$I() {
  _extends$I = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$I.apply(this, arguments);
}
var ServerlessIcon = _ref => {
  var props = _extends$I({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M0 23.1502H5.66394L3.90916 28.4497H0V23.1502ZM0 13.0751H9.00012L7.24551 18.3746H0V13.0751ZM0 3H12.3365L10.5815 8.29933H0V3ZM17.9186 3H32V8.29933H16.164L17.9186 3ZM14.5825 13.0751H31.9999V18.3746H12.8278L14.5825 13.0751ZM11.2463 23.1502H31.9999V28.4497H9.49172L11.2463 23.1502Z",
    fill: "#F26D61"
  }));
};
var ServerlessIconDark = _ref2 => {
  var props = _extends$I({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M0 23.1502H5.66394L3.90916 28.4497H0V23.1502ZM0 13.0751H9.00012L7.24551 18.3746H0V13.0751ZM0 3H12.3365L10.5815 8.29933H0V3ZM17.9186 3H32V8.29933H16.164L17.9186 3ZM14.5825 13.0751H31.9999V18.3746H12.8278L14.5825 13.0751ZM11.2463 23.1502H31.9999V28.4497H9.49172L11.2463 23.1502Z",
    fill: "black"
  }));
};
var ServerlessIconLight = _ref3 => {
  var props = _extends$I({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M0 23.1502H5.66394L3.90916 28.4497H0V23.1502ZM0 13.0751H9.00012L7.24551 18.3746H0V13.0751ZM0 3H12.3365L10.5815 8.29933H0V3ZM17.9186 3H32V8.29933H16.164L17.9186 3ZM14.5825 13.0751H31.9999V18.3746H12.8278L14.5825 13.0751ZM11.2463 23.1502H31.9999V28.4497H9.49172L11.2463 23.1502Z",
    fill: "white"
  }));
};

function _extends$J() {
  _extends$J = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$J.apply(this, arguments);
}
var StackbitIcon = _ref => {
  var props = _extends$J({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M30.9887 17.668C31.086 18.7488 30.5311 19.8587 29.5185 20.4137L17.5134 27.1027C16.6371 27.5895 15.5953 27.5895 14.719 27.1027L2.48997 20.4137C1.47738 19.8587 0.94187 18.778 1.01003 17.668V13.0529C0.922397 11.9917 1.40922 10.9012 2.4705 10.3072L14.6995 3.38459C15.5953 2.86856 16.6858 2.86856 17.5621 3.40407L29.5573 10.3267C30.5504 10.9012 31.086 11.9917 30.9886 13.0529V17.668H30.9887Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M30.9887 13.053C31.0861 11.9917 30.5506 10.9013 29.5574 10.3268L17.5622 3.40416C16.6859 2.86865 15.5954 2.86865 14.6996 3.38469L2.47061 10.3073C1.40933 10.9013 0.922504 11.9917 1.01013 13.053V17.6681C0.941977 18.7781 1.47748 19.8588 2.49008 20.4138L14.7191 27.1028C15.5954 27.5896 16.6372 27.5896 17.5135 27.1028L29.5186 20.4138C30.5312 19.8588 31.0862 18.7489 30.9888 17.6681V13.053H30.9887ZM28.5935 18.7099L16.5884 25.3989C16.3158 25.5644 15.9653 25.5644 15.6927 25.3989L3.46363 18.7099C3.01575 18.4762 2.8405 17.9018 3.09364 17.4637C3.31758 17.0255 3.90177 16.8405 4.33991 17.0937L16.1308 23.5295L27.688 17.0937C28.1262 16.8406 28.6811 16.9963 28.9343 17.4637C29.1874 17.9017 29.0317 18.4469 28.5935 18.7099ZM28.9343 13.2866C28.6811 13.7247 28.1067 13.8805 27.6686 13.6274L16.1308 6.95788L5.77118 12.8193L16.5884 18.9338C17.0266 19.1869 17.1921 19.7711 16.9389 20.2092C16.6858 20.6474 16.1016 20.8032 15.6635 20.55L3.43442 13.6274C2.81129 13.2574 2.81129 12.3616 3.43442 12.0111L15.6635 5.08847C15.9653 4.92295 16.3158 4.92295 16.5884 5.08847L28.5935 12.0111C29.0317 12.2644 29.1874 12.8387 28.9343 13.2866Z",
    fill: "#3EB0FD"
  }));
};
var StackbitIconDark = _ref2 => {
  var props = _extends$J({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M30.9887 13.053C31.0861 11.9917 30.5506 10.9013 29.5574 10.3268L17.5622 3.40416C16.6859 2.86865 15.5954 2.86865 14.6996 3.38469L2.4706 10.3073C1.40932 10.9013 0.92249 11.9917 1.01012 13.053V17.6681C0.941963 18.7781 1.47747 19.8588 2.49007 20.4138L14.7191 27.1028C15.5954 27.5896 16.6372 27.5896 17.5135 27.1028L29.5186 20.4138C30.5312 19.8588 31.0862 18.7489 30.9888 17.6681L30.9887 13.053ZM28.5935 18.7099L16.5884 25.3989C16.3158 25.5644 15.9653 25.5644 15.6927 25.3989L3.46362 18.7099C3.01574 18.4762 2.84049 17.9018 3.09363 17.4637C3.31757 17.0255 3.90176 16.8405 4.33991 17.0937L16.1308 23.5295L27.688 17.0937C28.1262 16.8406 28.6811 16.9963 28.9343 17.4637C29.1874 17.9017 29.0317 18.4469 28.5935 18.7099ZM28.9343 13.2866C28.6811 13.7247 28.1067 13.8805 27.6686 13.6274L16.1308 6.95788L5.77117 12.8193L16.5884 18.9338C17.0266 19.1869 17.1921 19.7711 16.9389 20.2092C16.6858 20.6474 16.1016 20.8032 15.6635 20.55L3.43441 13.6274C2.81128 13.2574 2.81128 12.3616 3.43441 12.0111L15.6635 5.08847C15.9653 4.92295 16.3158 4.92295 16.5884 5.08847L28.5935 12.0111C29.0317 12.2644 29.1874 12.8387 28.9343 13.2866Z",
    fill: "black"
  }));
};
var StackbitIconLight = _ref3 => {
  var props = _extends$J({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M30.9887 13.053C31.0861 11.9917 30.5506 10.9013 29.5574 10.3268L17.5622 3.40416C16.6859 2.86865 15.5954 2.86865 14.6996 3.38469L2.4706 10.3073C1.40932 10.9013 0.92249 11.9917 1.01012 13.053V17.6681C0.941963 18.7781 1.47747 19.8588 2.49007 20.4138L14.7191 27.1028C15.5954 27.5896 16.6372 27.5896 17.5135 27.1028L29.5186 20.4138C30.5312 19.8588 31.0862 18.7489 30.9888 17.6681L30.9887 13.053ZM28.5935 18.7099L16.5884 25.3989C16.3158 25.5644 15.9653 25.5644 15.6927 25.3989L3.46362 18.7099C3.01574 18.4762 2.84049 17.9018 3.09363 17.4637C3.31757 17.0255 3.90176 16.8405 4.33991 17.0937L16.1308 23.5295L27.688 17.0937C28.1262 16.8406 28.6811 16.9963 28.9343 17.4637C29.1874 17.9017 29.0317 18.4469 28.5935 18.7099ZM28.9343 13.2866C28.6811 13.7247 28.1067 13.8805 27.6686 13.6274L16.1308 6.95788L5.77117 12.8193L16.5884 18.9338C17.0266 19.1869 17.1921 19.7711 16.9389 20.2092C16.6858 20.6474 16.1016 20.8032 15.6635 20.55L3.43441 13.6274C2.81128 13.2574 2.81128 12.3616 3.43441 12.0111L15.6635 5.08847C15.9653 4.92295 16.3158 4.92295 16.5884 5.08847L28.5935 12.0111C29.0317 12.2644 29.1874 12.8387 28.9343 13.2866Z",
    fill: "white"
  }));
};

function _extends$K() {
  _extends$K = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$K.apply(this, arguments);
}
var StorybookIcon = _ref => {
  var props = _extends$K({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("mask", {
    id: "Storybook_Mask0_".concat(id),
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: "3",
    y: "0",
    width: "26",
    height: "32"
  }, React.createElement("path", {
    d: "M3.99245 29.4869L3.00115 3.07343C2.96841 2.20109 3.63729 1.4618 4.50854 1.40735L26.9751 0.00318776C27.8619 -0.0522389 28.6258 0.621744 28.6812 1.50857C28.6833 1.54198 28.6843 1.57545 28.6843 1.60893V30.3911C28.6843 31.2797 27.964 32 27.0754 32C27.0514 32 27.0273 31.9995 27.0033 31.9984L5.528 31.0339C4.69163 30.9963 4.02385 30.3236 3.99245 29.4869Z",
    fill: "white"
  })), React.createElement("g", {
    mask: "url(#Storybook_Mask0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M3.99245 29.4869L3.00115 3.07343C2.96841 2.20109 3.63729 1.4618 4.50854 1.40735L26.9751 0.00318776C27.8619 -0.0522389 28.6258 0.621744 28.6812 1.50857C28.6833 1.54198 28.6843 1.57545 28.6843 1.60893V30.3911C28.6843 31.2797 27.964 32 27.0754 32C27.0514 32 27.0273 31.9995 27.0033 31.9984L5.528 31.0339C4.69163 30.9963 4.02385 30.3236 3.99245 29.4869Z",
    fill: "#FF4785"
  }), React.createElement("path", {
    d: "M21.9659 3.93331L22.1194 0.242419L25.2047 0L25.3376 3.80629C25.3422 3.93876 25.2386 4.04989 25.1061 4.05452C25.0494 4.0565 24.9938 4.03831 24.9493 4.00319L23.7594 3.06591L22.3508 4.13449C22.2451 4.2146 22.0946 4.19393 22.0145 4.08833C21.9808 4.04387 21.9636 3.98906 21.9659 3.93331ZM18.0201 12.0612C18.0201 12.6872 22.2364 12.3872 22.8024 11.9475C22.8024 7.68495 20.5152 5.44505 16.327 5.44505C12.1387 5.44505 9.79215 7.7198 9.79215 11.1319C9.79215 17.0747 17.8121 17.1885 17.8121 20.43C17.8121 21.3399 17.3666 21.8801 16.3864 21.8801C15.1091 21.8801 14.6041 21.2278 14.6636 19.01C14.6636 18.5288 9.79215 18.3788 9.64363 19.01C9.26544 24.3847 12.614 25.935 16.4458 25.935C20.1587 25.935 23.0697 23.9559 23.0697 20.3731C23.0697 14.0038 14.9309 14.1744 14.9309 11.0182C14.9309 9.73864 15.8814 9.56804 16.4458 9.56804C17.0398 9.56804 18.1092 9.67275 18.0201 12.0612Z",
    fill: "white"
  })));
};
var StorybookIconDark = _ref2 => {
  var props = _extends$K({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M21.3245 1.27807L21.1879 4.56456C21.1858 4.61508 21.2013 4.66476 21.2319 4.70505C21.3045 4.80075 21.4409 4.81948 21.5366 4.74688L22.8133 3.77848L23.8915 4.62789C23.9319 4.65972 23.9823 4.6762 24.0337 4.67441C24.1537 4.67021 24.2477 4.5695 24.2435 4.44945L24.1266 1.10294L25.7274 1.00289C26.5311 0.952657 27.2233 1.56346 27.2736 2.36714C27.2755 2.39742 27.2764 2.42775 27.2764 2.45809V28.542C27.2764 29.3472 26.6236 30 25.8184 30C25.7966 30 25.7747 29.9995 25.7529 29.9985L6.291 29.1244C5.53304 29.0904 4.92786 28.4807 4.8994 27.7225L4.00104 3.78529C3.97137 2.99474 4.57754 2.32476 5.36711 2.27541L21.3245 1.27807ZM21.9459 11.8274C21.433 12.2259 17.6119 12.4978 17.6119 11.9305C17.6927 9.76593 16.7236 9.67104 16.1852 9.67104C15.6738 9.67104 14.8124 9.82565 14.8124 10.9852C14.8124 12.1669 16.0712 12.834 17.5488 13.617C19.6478 14.7294 22.1882 16.0756 22.1882 19.4631C22.1882 22.71 19.5501 24.5035 16.1852 24.5035C12.7127 24.5035 9.67806 23.0986 10.0208 18.2278C10.1554 17.6558 14.5701 17.7917 14.5701 18.2278C14.5163 20.2377 14.9739 20.8289 16.1314 20.8289C17.0197 20.8289 17.4235 20.3393 17.4235 19.5147C17.4235 18.2667 16.0876 17.5117 14.5508 16.6432C12.47 15.4672 10.0208 14.083 10.0208 10.9852C10.0208 7.893 12.282 5.93458 16.0776 5.93458C19.8731 5.93458 21.9459 7.96449 21.9459 11.8274Z",
    fill: "black"
  }));
};
var StorybookIconLight = _ref3 => {
  var props = _extends$K({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M21.3245 1.27807L21.1879 4.56456C21.1858 4.61508 21.2013 4.66476 21.2319 4.70505C21.3045 4.80075 21.4409 4.81948 21.5366 4.74688L22.8133 3.77848L23.8915 4.62789C23.9319 4.65972 23.9823 4.6762 24.0337 4.67441C24.1537 4.67021 24.2477 4.5695 24.2435 4.44945L24.1266 1.10294L25.7274 1.00289C26.5311 0.952657 27.2233 1.56346 27.2736 2.36714C27.2755 2.39742 27.2764 2.42775 27.2764 2.45809V28.542C27.2764 29.3472 26.6236 30 25.8184 30C25.7966 30 25.7747 29.9995 25.7529 29.9985L6.291 29.1244C5.53304 29.0904 4.92786 28.4807 4.8994 27.7225L4.00104 3.78529C3.97137 2.99474 4.57754 2.32476 5.36711 2.27541L21.3245 1.27807ZM21.9459 11.8274C21.433 12.2259 17.6119 12.4978 17.6119 11.9305C17.6927 9.76593 16.7236 9.67104 16.1852 9.67104C15.6738 9.67104 14.8124 9.82565 14.8124 10.9852C14.8124 12.1669 16.0712 12.834 17.5488 13.617C19.6478 14.7294 22.1882 16.0756 22.1882 19.4631C22.1882 22.71 19.5501 24.5035 16.1852 24.5035C12.7127 24.5035 9.67806 23.0986 10.0208 18.2278C10.1554 17.6558 14.5701 17.7917 14.5701 18.2278C14.5163 20.2377 14.9739 20.8289 16.1314 20.8289C17.0197 20.8289 17.4235 20.3393 17.4235 19.5147C17.4235 18.2667 16.0876 17.5117 14.5508 16.6432C12.47 15.4672 10.0208 14.083 10.0208 10.9852C10.0208 7.893 12.282 5.93458 16.0776 5.93458C19.8731 5.93458 21.9459 7.96449 21.9459 11.8274Z",
    fill: "white"
  }));
};

function _extends$L() {
  _extends$L = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$L.apply(this, arguments);
}
var StyleguidistIcon = _ref => {
  var props = _extends$L({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("g", {
    clipPath: "url(#Styleguidist_Clip0_".concat(id, ")")
  }, React.createElement("path", {
    d: "M9.50884 24.8498C10.106 25.6831 10.9482 26.1363 12.0221 26.1363C13.4138 26.1363 14.5341 25.5608 15.2997 24.5457C15.9666 23.6617 16.3241 22.4836 16.3241 21.3039V19.6323L12.9813 19.6557L12.8471 22.0026C12.8471 22.805 12.5624 23.0718 11.8453 23.0718C11.2898 23.0718 10.8965 22.4904 10.7719 21.4749L10.2032 17.2972C9.98135 15.8568 9.44095 14.7381 8.62957 13.9265C7.93441 13.2311 7.06252 12.7832 6.08136 12.5593L3.32594 11.8326C2.93734 11.8326 2.65642 12.1378 2.65642 12.4848C2.65642 13.0601 2.7246 13.3419 3.05939 13.7522C3.15516 13.8696 3.30968 13.9735 3.52584 14.0818C3.74895 14.1936 4.03872 14.3092 4.38112 14.4276C4.65662 14.5229 4.95069 14.6146 5.2447 14.6997C5.36578 14.7347 5.48718 14.7686 5.6089 14.8013C6.65754 15.0838 7.46255 16.0908 7.58017 17.1438L8.53516 22.0372C8.68408 23.1811 9.00238 24.1432 9.50884 24.8498ZM16.2967 19.7127H13.0978L13.1026 20.0121L13.1329 21.904C13.1329 22.6958 12.5587 23.1817 11.7837 23.1817C11.2267 23.1817 10.7045 22.5944 10.0817 21.3741L8.27286 17.8678C7.46532 16.4667 6.38162 15.701 4.68874 15.3685L2.12361 14.7095C1.71404 14.7095 1.4007 15.2164 1.4007 15.5779C1.4007 15.9909 1.58079 16.4284 1.85736 16.7701C2.10723 17.0789 2.63785 17.3481 3.13205 17.452L4.2088 17.6814C5.06437 17.9704 5.85742 18.5595 6.22621 19.2553L7.5886 22.5209C8.10207 23.6459 8.62745 24.4691 9.25578 25.0634C9.9919 25.7596 10.859 26.1215 11.8936 26.1215C12.8415 26.1215 13.8252 25.7842 14.5862 25.1801C15.432 24.5087 15.9512 23.5587 16.0202 22.4312L16.2967 19.7127Z",
    fill: "#053949"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.75404 20.0858L8.16449 17.0661C8.01598 15.7846 7.04909 14.5791 5.78706 14.2388C5.75271 14.2297 5.71839 14.2205 5.68411 14.2111C5.60101 14.1884 5.50837 14.1624 5.40848 14.1336C5.12349 14.0511 4.83861 13.9622 4.57365 13.8706C4.25365 13.76 3.98575 13.6532 3.78986 13.555C3.71207 13.516 3.64748 13.4792 3.59774 13.4457C3.55513 13.4171 3.52726 13.3934 3.51606 13.3797C3.28405 13.0953 3.24574 12.9371 3.24574 12.4848C3.24574 12.4693 3.2534 12.4504 3.26648 12.4361C3.26937 12.433 5.93586 13.1303 5.93586 13.1303C6.82591 13.3329 7.59986 13.7299 8.21281 14.3431C8.93266 15.0632 9.41738 16.0666 9.61999 17.3818L10.1875 21.5505C10.3433 22.8207 10.9118 23.6611 11.8453 23.6611C12.877 23.6611 13.4336 23.1419 13.4365 22.0196L13.5381 20.2411L15.7348 20.2258V21.3039C15.7348 22.3608 15.4152 23.414 14.8292 24.1909C14.1734 25.0603 13.2261 25.547 12.0221 25.547C11.9024 25.5471 11.7827 25.5399 11.6639 25.5253C10.1343 25.432 9.09031 24.3895 8.1306 22.2895L6.76008 19.0045C6.30755 18.1388 5.37972 17.4504 4.37983 17.1172L3.25411 16.8754C2.88019 16.7968 2.46778 16.5876 2.31544 16.3993C2.11826 16.1558 1.99002 15.8442 1.99002 15.5778C1.99002 15.5449 2.02226 15.4521 2.07017 15.3747C2.08467 15.3512 2.09934 15.3309 2.11283 15.3151L4.5588 15.9435C6.09651 16.2439 7.0363 16.9055 7.7555 18.1502L8.75404 20.0858Z",
    fill: "#00D8FE"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.75404 20.0858L8.16449 17.0661C8.01598 15.7846 7.04909 14.5791 5.78706 14.2388C5.75271 14.2297 5.71839 14.2205 5.68411 14.2111C5.60101 14.1884 5.50837 14.1624 5.40848 14.1336C5.12349 14.0511 4.83861 13.9622 4.57365 13.8706C4.25365 13.76 3.98575 13.6532 3.78986 13.555C3.71207 13.516 3.64748 13.4792 3.59774 13.4457C3.55513 13.4171 3.52726 13.3934 3.51606 13.3797C3.28405 13.0953 3.24574 12.9371 3.24574 12.4848C3.24574 12.4693 3.2534 12.4504 3.26648 12.4361C3.26937 12.433 5.93586 13.1303 5.93586 13.1303C6.82591 13.3329 7.59986 13.7299 8.21281 14.3431C8.93266 15.0632 9.41738 16.0666 9.61999 17.3818L10.1875 21.5505C10.3433 22.8207 10.9118 23.6611 11.8453 23.6611C12.877 23.6611 13.4336 23.1419 13.4365 22.0196L13.5381 20.2411L15.7348 20.2258V21.3039C15.7348 22.3608 15.4152 23.414 14.8292 24.1909C14.1734 25.0603 13.2261 25.547 12.0221 25.547C11.9024 25.5471 11.7827 25.5399 11.6639 25.5253C10.1343 25.432 9.09031 24.3895 8.1306 22.2895L6.76008 19.0045C6.30755 18.1388 5.37972 17.4504 4.37983 17.1172L3.25411 16.8754C2.88019 16.7968 2.46778 16.5876 2.31544 16.3993C2.11826 16.1558 1.99002 15.8442 1.99002 15.5778C1.99002 15.5449 2.02226 15.4521 2.07017 15.3747C2.08467 15.3512 2.09934 15.3309 2.11283 15.3151L4.5588 15.9435C6.09651 16.2439 7.0363 16.9055 7.7555 18.1502L8.75404 20.0858Z",
    fill: "#00D8FE"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.10487 15.2659C2.1565 15.3546 2.21662 15.4382 2.28438 15.5153C2.44986 15.7036 2.89757 15.9128 3.30355 15.9915L4.52579 16.2332C5.61144 16.5665 6.61882 17.2548 7.11019 18.1205L8.59822 21.4055C8.80059 21.8133 9.00638 22.1813 9.21889 22.5102C9.17836 22.3057 9.14483 22.0999 9.11835 21.8932L8.75404 20.0268L7.7555 18.0913C7.03629 16.8465 6.09651 16.1849 4.5588 15.8845L2.11283 15.2563L2.10487 15.2659V15.2659Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.0258 20.2373V21.8932C14.0258 23.0304 13.5672 24.1915 11.954 24.1915C10.9723 24.1915 9.9724 23.5872 9.64639 21.3125L9.01216 16.9429C8.84762 15.6614 7.57193 13.8719 6.17306 13.5316C6.11955 13.5188 4.17645 12.9459 3.95934 12.8478C3.87307 12.8088 3.66822 12.6863 3.65579 12.6725C3.58071 12.5895 3.52396 12.5172 3.48117 12.4453C3.79917 12.5272 6.05573 13.1303 6.05573 13.1303C6.92656 13.3329 7.68378 13.7299 8.28347 14.3431C8.9877 15.0632 9.46199 16.0667 9.66018 17.3818L10.2154 21.5505C10.3679 22.8207 10.9241 23.6611 11.8374 23.6611C12.8468 23.6611 13.3914 23.142 13.3941 22.0197L13.4935 20.2412L14.0258 20.2373Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M16.3831 21.6575V19.5948H12.965V19.8895C12.965 22.5418 12.2381 23.6906 10.6077 23.6906C9.16904 23.6906 8.17945 22.6628 7.54953 20.9766C6.83092 19.0528 5.74103 18.1805 3.61624 18.1805H0.707189C0.339572 18.1805 0.0493323 18.4836 0.0493323 18.8498C0.0491332 19.0764 0.0937344 19.3008 0.180571 19.5101C0.267407 19.7194 0.394766 19.9094 0.555321 20.0694C0.715845 20.23 0.906514 20.3573 1.11638 20.4441C1.32625 20.5308 1.55119 20.5752 1.77828 20.5748L3.62325 20.5672C4.00672 20.5672 4.37735 20.8478 4.75805 21.4214C5.07534 21.8994 5.34259 22.4658 5.76731 23.495C6.14813 24.4178 6.67015 25.2 7.36832 25.7895C8.22247 26.5106 9.29763 26.9024 10.6077 26.9024C12.0182 26.9024 13.453 26.3883 14.5366 25.4882C15.7063 24.5164 16.3831 23.1755 16.3831 21.6575Z",
    fill: "#053949"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.7938 20.1842V21.6575C15.7938 22.9938 15.1994 24.1714 14.16 25.0348C13.1827 25.8467 11.8813 26.3131 10.6077 26.3131C9.43659 26.3131 8.49616 25.9704 7.74849 25.3392C7.12994 24.8169 6.65943 24.1119 6.31209 23.2702C5.87287 22.206 5.59447 21.6158 5.24901 21.0955C4.77037 20.3743 4.24676 19.9779 3.62202 19.9779L1.77704 19.9855C1.62747 19.9858 1.4793 19.9565 1.34109 19.8993C1.20287 19.8421 1.07733 19.7582 0.971682 19.6523C0.865963 19.5471 0.782109 19.4221 0.724952 19.2843C0.667795 19.1466 0.638467 18.9989 0.638658 18.8498C0.638658 18.8035 0.670952 18.7698 0.707195 18.7698H3.61625C5.47755 18.7698 6.35994 19.476 6.99746 21.1828C7.30214 21.9985 7.70241 22.7013 8.21812 23.2369C8.8649 23.9086 9.6613 24.2799 10.6077 24.2799C12.5658 24.2799 13.4905 22.9238 13.5512 20.1842H15.7938Z",
    fill: "#00D8FE"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0.65686 18.7954C0.710606 18.8637 0.78651 18.925 0.881509 19.0112C1.08453 19.1954 1.35762 19.3002 1.6501 19.3002H4.0663C5.41319 19.3002 6.11348 20.3525 6.99316 22.2894C7.32471 23.0194 8.22896 24.7808 10.7845 24.7808C13.3401 24.7808 14.0847 22.2859 14.0847 21.1271V20.1842H13.5512C13.4905 22.9238 12.5658 24.2799 10.6077 24.2799C9.66129 24.2799 8.86489 23.9086 8.21805 23.2368C7.7024 22.7013 7.30219 21.9985 6.99746 21.1828C6.35993 19.4761 5.47755 18.7698 3.61624 18.7698H0.707188C0.687859 18.7698 0.669649 18.7794 0.65686 18.7954Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M22.5501 24.8498C21.953 25.6831 21.1107 26.1363 20.0368 26.1363C18.6452 26.1363 17.5248 25.5608 16.7592 24.5457C16.0924 23.6617 15.7348 22.4836 15.7348 21.3039V19.6323L19.0777 19.6557L19.2118 22.0026C19.2118 22.805 19.4965 23.0718 20.2136 23.0718C20.7691 23.0718 21.1624 22.4904 21.287 21.4749L21.8557 17.2972C22.0776 15.8568 22.618 14.7381 23.4294 13.9265C24.1245 13.2311 24.9964 12.7832 25.9776 12.5593L28.733 11.8326C29.1216 11.8326 29.4025 12.1378 29.4025 12.4848C29.4025 13.0601 29.3343 13.3419 28.9996 13.7522C28.9038 13.8696 28.7493 13.9735 28.5331 14.0818C28.31 14.1936 28.0202 14.3092 27.6778 14.4276C27.4023 14.5229 27.1083 14.6146 26.8142 14.6997C26.6932 14.7347 26.5718 14.7686 26.45 14.8013C25.4014 15.0838 24.5964 16.0908 24.4788 17.1438L23.5238 22.0372C23.3749 23.1811 23.0566 24.1432 22.5501 24.8498ZM15.7623 19.7127H18.9611L18.9563 20.0121L18.926 21.904C18.926 22.6958 19.5002 23.1817 20.2752 23.1817C20.8322 23.1817 21.3544 22.5944 21.9772 21.3741L23.7861 17.8678C24.5936 16.4667 25.6773 15.701 27.3702 15.3685L29.9353 14.7095C30.3449 14.7095 30.6582 15.2164 30.6582 15.5779C30.6582 15.9909 30.4782 16.4284 30.2016 16.7701C29.9517 17.0789 29.4211 17.3481 28.9269 17.452L27.8501 17.6814C26.9946 17.9704 26.2015 18.5595 25.8327 19.2553L24.4703 22.5209C23.9569 23.6459 23.4315 24.4691 22.8032 25.0634C22.067 25.7596 21.2 26.1215 20.1654 26.1215C19.2175 26.1215 18.2337 25.7842 17.4727 25.1801C16.6269 24.5087 16.1077 23.5587 16.0387 22.4312L15.7623 19.7127Z",
    fill: "#053949"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M23.3049 20.0858L23.8945 17.0661C24.043 15.7846 25.0099 14.5791 26.2719 14.2388C26.3984 14.205 26.5246 14.1699 26.6505 14.1336C26.9355 14.0511 27.2203 13.9622 27.4853 13.8706C27.8053 13.76 28.0732 13.6532 28.2691 13.555C28.3469 13.516 28.4115 13.4792 28.4612 13.4457C28.5038 13.4171 28.5317 13.3934 28.5429 13.3797C28.7749 13.0953 28.8132 12.9371 28.8132 12.4848C28.8132 12.4693 28.8055 12.4504 28.7925 12.4361C28.7896 12.433 26.1231 13.1303 26.1231 13.1303C25.233 13.3329 24.4591 13.7299 23.8461 14.3431C23.1263 15.0632 22.6416 16.0666 22.439 17.3818L21.8714 21.5505C21.7156 22.8207 21.1472 23.6611 20.2136 23.6611C19.1819 23.6611 18.6253 23.1419 18.6225 22.0196L18.5209 20.2411L16.3241 20.2258V21.3039C16.3241 22.3608 16.6438 23.414 17.2297 24.1909C17.8855 25.0603 18.8329 25.547 20.0368 25.547C20.1602 25.547 20.2796 25.5397 20.3951 25.5253C21.9247 25.432 22.9686 24.3895 23.9283 22.2895L25.2989 19.0045C25.7514 18.1388 26.6792 17.4504 27.6791 17.1172L28.8048 16.8754C29.1788 16.7968 29.5912 16.5876 29.7435 16.3993C29.9407 16.1558 30.0689 15.8442 30.0689 15.5778C30.0689 15.5449 30.0367 15.4521 29.9888 15.3747C29.9761 15.3538 29.9618 15.3339 29.9461 15.3151L27.5001 15.9435C25.9624 16.2439 25.0226 16.9055 24.3034 18.1502L23.3049 20.0858Z",
    fill: "#00D8FE"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M23.3049 20.0858L23.8945 17.0661C24.043 15.7846 25.0099 14.5791 26.2719 14.2388C26.3984 14.205 26.5246 14.1699 26.6505 14.1336C26.9355 14.0511 27.2203 13.9622 27.4853 13.8706C27.8053 13.76 28.0732 13.6532 28.2691 13.555C28.3469 13.516 28.4115 13.4792 28.4612 13.4457C28.5038 13.4171 28.5317 13.3934 28.5429 13.3797C28.7749 13.0953 28.8132 12.9371 28.8132 12.4848C28.8132 12.4693 28.8055 12.4504 28.7925 12.4361C28.7896 12.433 26.1231 13.1303 26.1231 13.1303C25.233 13.3329 24.4591 13.7299 23.8461 14.3431C23.1263 15.0632 22.6416 16.0666 22.439 17.3818L21.8714 21.5505C21.7156 22.8207 21.1472 23.6611 20.2136 23.6611C19.1819 23.6611 18.6253 23.1419 18.6225 22.0196L18.5209 20.2411L16.3241 20.2258V21.3039C16.3241 22.3608 16.6438 23.414 17.2297 24.1909C17.8855 25.0603 18.8329 25.547 20.0368 25.547C20.1602 25.547 20.2796 25.5397 20.3951 25.5253C21.9247 25.432 22.9686 24.3895 23.9283 22.2895L25.2989 19.0045C25.7514 18.1388 26.6792 17.4504 27.6791 17.1172L28.8048 16.8754C29.1788 16.7968 29.5912 16.5876 29.7435 16.3993C29.9407 16.1558 30.0689 15.8442 30.0689 15.5778C30.0689 15.5449 30.0367 15.4521 29.9888 15.3747C29.9761 15.3538 29.9618 15.3339 29.9461 15.3151L27.5001 15.9435C25.9624 16.2439 25.0226 16.9055 24.3034 18.1502L23.3049 20.0858Z",
    fill: "#00D8FE"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.9541 15.2659C29.9024 15.3546 29.8423 15.4382 29.7746 15.5153C29.6091 15.7036 29.1614 15.9128 28.7554 15.9914L27.5331 16.2332C26.4475 16.5664 25.4401 17.2548 24.9488 18.1205L23.4607 21.4055C23.2583 21.8133 23.0526 22.1813 22.84 22.5102C22.8806 22.3057 22.9141 22.0999 22.9406 21.8932L23.3049 20.0268L24.3034 18.0913C25.0227 16.8465 25.9624 16.1849 27.5001 15.8845L29.9461 15.2562L29.9541 15.2658V15.2659Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M18.0332 20.2373V21.8932C18.0332 23.0304 18.4917 24.1915 20.105 24.1915C21.0867 24.1915 22.0865 23.5872 22.4126 21.3125L23.0468 16.9429C23.2113 15.6614 24.487 13.8719 25.8859 13.5316C25.9394 13.5188 27.8825 12.9459 28.0996 12.8478C28.1859 12.8088 28.3907 12.6863 28.4032 12.6725C28.4782 12.5895 28.535 12.5172 28.5778 12.4453C28.2598 12.5272 26.0032 13.1303 26.0032 13.1303C25.1324 13.3329 24.3752 13.7299 23.7755 14.3431C23.0712 15.0632 22.597 16.0667 22.3988 17.3818L21.8436 21.5505C21.6911 22.8207 21.1349 23.6611 20.2216 23.6611C19.2121 23.6611 18.6676 23.142 18.6648 22.0197L18.5654 20.2412L18.0332 20.2373Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M15.6759 21.6575V19.5948H19.0939V19.8895C19.0939 22.5418 19.8209 23.6906 21.4512 23.6906C22.8899 23.6906 23.8795 22.6628 24.5094 20.9766C25.228 19.0528 26.3179 18.1805 28.4427 18.1805H31.3518C31.7194 18.1805 32.0096 18.4836 32.0096 18.8498C32.0098 19.0764 31.9652 19.3008 31.8784 19.5101C31.7915 19.7194 31.6642 19.9094 31.5036 20.0694C31.3431 20.23 31.1524 20.3573 30.9426 20.4441C30.7327 20.5308 30.5078 20.5752 30.2807 20.5748L28.4357 20.5672C28.0522 20.5672 27.6816 20.8478 27.3009 21.4214C26.9836 21.8994 26.7164 22.4658 26.2916 23.495C25.9108 24.4178 25.3888 25.2 24.6906 25.7895C23.8365 26.5106 22.7613 26.9024 21.4512 26.9024C20.0407 26.9024 18.6059 26.3883 17.5224 25.4882C16.3526 24.5164 15.6759 23.1755 15.6759 21.6575Z",
    fill: "#053949"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.2652 20.1842V21.6575C16.2652 22.9938 16.8595 24.1714 17.899 25.0348C18.8763 25.8467 20.1777 26.3131 21.4512 26.3131C22.6224 26.3131 23.5628 25.9704 24.3105 25.3392C24.929 24.8169 25.3995 24.1119 25.7469 23.2702C26.1861 22.206 26.4645 21.6158 26.8099 21.0955C27.2886 20.3743 27.8122 19.9779 28.4369 19.9779L30.2819 19.9855C30.5884 19.9855 30.8746 19.8647 31.0873 19.6523C31.193 19.5471 31.2768 19.4221 31.334 19.2843C31.3912 19.1466 31.4205 18.9989 31.4203 18.8498C31.4203 18.8035 31.388 18.7698 31.3518 18.7698H28.4427C26.5814 18.7698 25.699 19.476 25.0615 21.1828C24.7568 21.9985 24.3565 22.7013 23.8408 23.2369C23.1941 23.9086 22.3976 24.2799 21.4512 24.2799C19.4932 24.2799 18.5685 22.9238 18.5078 20.1842H16.2652Z",
    fill: "#00D8FE"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M31.4021 18.7954C31.3483 18.8637 31.2724 18.925 31.1774 19.0112C30.9744 19.1954 30.7013 19.3002 30.4089 19.3002H27.9926C26.6458 19.3002 25.9455 20.3525 25.0658 22.2894C24.7342 23.0194 23.83 24.7808 21.2744 24.7808C18.7188 24.7808 17.9742 22.2859 17.9742 21.1271V20.1842H18.5078C18.5685 22.9238 19.4932 24.2799 21.4512 24.2799C22.3977 24.2799 23.1941 23.9086 23.8409 23.2368C24.3565 22.7013 24.7568 21.9985 25.0615 21.1828C25.699 19.4761 26.5814 18.7698 28.4427 18.7698H31.3518C31.3711 18.7698 31.3893 18.7794 31.4021 18.7954Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M18.3463 21.1822C18.6515 21.1541 18.8905 20.8975 18.8904 20.5849V15.0166C18.8904 14.6854 18.6219 14.417 18.2907 14.417H13.5324C13.2012 14.417 12.9327 14.6854 12.9327 15.0166V20.5851C12.9327 20.8972 13.1712 21.1536 13.4758 21.1821C13.4866 21.185 13.4984 21.1881 13.511 21.1914C13.786 21.2637 14.0624 21.3301 14.3401 21.3908C14.5263 21.4313 14.7072 21.4677 14.8798 21.4988C15.2871 21.5721 15.6304 21.6131 15.8969 21.6131C16.1661 21.6131 16.5166 21.5712 16.9344 21.4965C17.1049 21.4659 17.2834 21.4304 17.4673 21.391C17.7617 21.3276 18.0548 21.258 18.3463 21.1822V21.1822Z",
    stroke: "#043849",
    strokeWidth: "0.707182"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.2597 16.5304H14.5562L13.849 21.4807H13.2597V16.5304Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M13.2276 18.9656C14.0426 18.9656 14.7034 18.3061 14.7034 17.4926C14.7034 16.679 14.0426 16.0195 13.2276 16.0195C12.4125 16.0195 11.7517 16.679 11.7517 17.4926C11.7517 18.3061 12.4125 18.9656 13.2276 18.9656Z",
    fill: "white",
    stroke: "#063A49",
    strokeWidth: "0.707182"
  }), React.createElement("path", {
    d: "M13.2276 17.9556C13.4826 17.9556 13.6894 17.7489 13.6894 17.4938C13.6894 17.2387 13.4826 17.032 13.2276 17.032C12.9725 17.032 12.7657 17.2387 12.7657 17.4938C12.7657 17.7489 12.9725 17.9556 13.2276 17.9556Z",
    fill: "#053949"
  }), React.createElement("path", {
    d: "M18.5314 18.9656C19.3465 18.9656 20.0072 18.3061 20.0072 17.4926C20.0072 16.679 19.3465 16.0195 18.5314 16.0195C17.7163 16.0195 17.0556 16.679 17.0556 17.4926C17.0556 18.3061 17.7163 18.9656 18.5314 18.9656Z",
    fill: "white",
    stroke: "#063A49",
    strokeWidth: "0.707182"
  }), React.createElement("path", {
    d: "M18.5314 17.9556C18.7865 17.9556 18.9933 17.7489 18.9933 17.4938C18.9933 17.2387 18.7865 17.032 18.5314 17.032C18.2763 17.032 18.0696 17.2387 18.0696 17.4938C18.0696 17.7489 18.2763 17.9556 18.5314 17.9556Z",
    fill: "#053949"
  }), React.createElement("path", {
    d: "M18.0598 16.598C19.5941 16.5833 20.7395 15.6184 20.7394 14.1687V10.3027C20.7394 7.63721 18.5784 5.47901 15.9073 5.47901C13.2432 5.47901 11.0836 7.63863 11.0836 10.3027V14.1687C11.0836 15.6182 12.2287 16.5831 13.7627 16.598L13.7915 16.6038C14.0359 16.6518 14.281 16.696 14.5268 16.7364C14.6872 16.7626 14.843 16.7863 14.9917 16.8065C15.3552 16.8562 15.6599 16.8839 15.8925 16.8839C16.1287 16.8839 16.4384 16.8562 16.808 16.8067C16.9659 16.7854 17.1236 16.762 17.281 16.7365C17.5413 16.6946 17.801 16.6484 18.0598 16.598Z",
    fill: "#25D8FC",
    stroke: "#043849",
    strokeWidth: "0.707182"
  }), React.createElement("path", {
    d: "M12.6688 14.0508V9.0062C12.6688 6.74498 14.348 4.87708 16.5273 4.57877C16.3247 4.55065 16.1203 4.53637 15.9157 4.53604H15.9073C13.4385 4.53604 11.4371 6.53737 11.4371 9.00614V14.0508C11.4371 15.355 12.4944 16.4123 13.7987 16.4123H15.0303C13.7261 16.4124 12.6688 15.3551 12.6688 14.0508Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M15.4306 14.4486C15.6856 14.4486 15.8924 14.2418 15.8924 13.9867C15.8924 13.7316 15.6856 13.5249 15.4306 13.5249C15.1755 13.5249 14.9687 13.7316 14.9687 13.9867C14.9687 14.2418 15.1755 14.4486 15.4306 14.4486Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M14.193 12.0323C14.4481 12.0323 14.6548 11.8256 14.6548 11.5705C14.6548 11.3154 14.4481 11.1087 14.193 11.1087C13.9379 11.1087 13.7311 11.3154 13.7311 11.5705C13.7311 11.8256 13.9379 12.0323 14.193 12.0323Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M15.9115 9.77779C16.1666 9.77779 16.3734 9.57102 16.3734 9.31594C16.3734 9.06087 16.1666 8.8541 15.9115 8.8541C15.6565 8.8541 15.4497 9.06087 15.4497 9.31594C15.4497 9.57102 15.6565 9.77779 15.9115 9.77779Z",
    fill: "black",
    fillOpacity: "0.25"
  }), React.createElement("path", {
    d: "M17.611 12.1502C17.8661 12.1502 18.0729 11.9434 18.0729 11.6884C18.0729 11.4333 17.8661 11.2265 17.611 11.2265C17.356 11.2265 17.1492 11.4333 17.1492 11.6884C17.1492 11.9434 17.356 12.1502 17.611 12.1502Z",
    fill: "black",
    fillOpacity: "0.25"
  })), React.createElement("defs", null, React.createElement("clipPath", {
    id: "Styleguidist_Clip0_".concat(id)
  }, React.createElement("rect", {
    width: "32",
    height: "32",
    fill: "white"
  }))));
};
var StyleguidistIconDark = _ref2 => {
  var props = _extends$L({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19.8424 16.393C20.5738 15.9778 21.0442 15.1809 21.0441 14.1522V10.0804C21.0441 7.27307 19.089 5 16.6724 5C14.2621 5 12.3082 7.27456 12.3082 10.0804V14.1522C12.3082 15.0354 12.655 15.7478 13.216 16.1945C12.8537 16.4492 12.617 16.87 12.617 17.346C12.617 18.1234 13.2483 18.7535 14.0271 18.7535C14.8059 18.7535 15.4373 18.1234 15.4373 17.346C15.4373 17.1681 15.4042 16.9979 15.3439 16.8411L15.4233 16.8565C15.5685 16.8842 15.7094 16.9091 15.844 16.9304C16.1728 16.9827 16.4485 17.0119 16.659 17.0119C16.8658 17.0119 17.1351 16.9845 17.4553 16.9355C17.4157 17.0654 17.3944 17.2032 17.3944 17.346C17.3944 18.1234 18.0258 18.7535 18.8046 18.7535C19.5834 18.7535 20.2147 18.1234 20.2147 17.346C20.2147 16.9784 20.0735 16.6437 19.8424 16.393ZM3.36636 15.3224C3.32628 15.3872 3.29767 15.4633 3.29118 15.5023C3.26131 15.5622 3.24265 15.6214 3.24265 15.6458C3.24265 15.9003 3.36518 16.198 3.55359 16.4307C3.69914 16.6106 4.09319 16.8105 4.45047 16.8857L5.52608 17.1166C6.48147 17.4351 7.368 18.0927 7.80039 18.9199L8.95534 21.6883C8.80775 21.4203 8.67443 21.1247 8.5547 20.8042C7.86807 18.9661 6.8267 18.1326 4.79649 18.1326H2.01692C1.66567 18.1326 1.38834 18.4223 1.38834 18.7721C1.38815 18.9886 1.43077 19.203 1.51374 19.403C1.59671 19.603 1.7184 19.7846 1.87181 19.9374C2.02519 20.0909 2.20737 20.2126 2.4079 20.2954C2.60843 20.3783 2.82335 20.4208 3.04033 20.4204L4.80319 20.4131C5.16959 20.4131 5.52372 20.6813 5.88747 21.2292C6.19064 21.686 6.446 22.2272 6.85181 23.2106C7.21568 24.0923 7.71446 24.8397 8.38155 25.4029C9.19769 26.092 10.225 26.4663 11.4768 26.4663C12.8245 26.4663 14.1954 25.9751 15.2307 25.1151C15.6547 24.7629 16.0108 24.36 16.2896 23.9163C16.5684 24.36 16.9246 24.7629 17.3485 25.1151C18.3838 25.9751 19.7547 26.4663 21.1024 26.4663C22.3542 26.4663 23.3815 26.092 24.1977 25.4029C24.8648 24.8397 25.3635 24.0923 25.7274 23.2106C26.1332 22.2272 26.3886 21.686 26.6918 21.2292C27.0555 20.6813 27.4096 20.4131 27.776 20.4131L29.5389 20.4204C29.7559 20.4208 29.9708 20.3783 30.1713 20.2954C30.3719 20.2126 30.554 20.0909 30.7074 19.9374C30.8608 19.7846 30.9825 19.603 31.0655 19.403C31.1485 19.203 31.1911 18.9886 31.1909 18.7721C31.1909 18.4223 30.9136 18.1326 30.5623 18.1326H27.7827C25.7525 18.1326 24.7111 18.9661 24.0245 20.8042C23.9048 21.1247 23.7715 21.4203 23.6239 21.6883L24.7788 18.9199C25.2112 18.0927 26.0978 17.4351 27.0531 17.1166L28.1288 16.8857C28.486 16.8105 28.8801 16.6106 29.0256 16.4307C29.214 16.198 29.3366 15.9003 29.3366 15.6458C29.3366 15.6144 29.3058 15.5257 29.26 15.4517C29.2461 15.4292 29.2321 15.4099 29.2192 15.3948L26.8821 15.9952C25.4129 16.2822 24.5149 16.9144 23.8277 18.1037L22.8736 19.9531L23.4369 17.0679C23.5788 15.8434 24.5027 14.6915 25.7085 14.3664C25.7414 14.3577 25.7742 14.3489 25.8069 14.3399C25.8863 14.3183 25.9748 14.2934 26.0703 14.2658C26.3426 14.187 26.6148 14.1021 26.8679 14.0146C27.1737 13.9089 27.4297 13.8068 27.6168 13.713C27.6912 13.6757 27.7529 13.6406 27.8004 13.6086C27.8411 13.5813 27.8678 13.5587 27.8785 13.5455C28.1001 13.2738 28.1367 13.1227 28.1367 12.6904C28.1367 12.6757 28.1294 12.6575 28.1169 12.6439C28.1142 12.641 25.5664 13.3072 25.5664 13.3072C24.7159 13.5008 23.9764 13.8802 23.3908 14.4661C22.703 15.1541 22.2398 16.1129 22.0462 17.3695L21.504 21.3526C21.3816 22.3499 20.9931 23.0699 20.3635 23.295C19.323 22.9697 18.8501 21.8567 18.8501 19.7656V19.484H16.995H15.5842H13.7291V19.7656C13.7291 21.7066 13.3217 22.8048 12.4311 23.2127C11.7023 23.0627 11.2553 22.3066 11.1224 21.2233L10.5801 17.2402C10.3865 15.9836 9.9234 15.0248 9.23558 14.3368C8.64992 13.7509 7.91042 13.3715 7.05998 13.1779C7.05998 13.1779 4.51218 12.5117 4.50942 12.5146C4.49692 12.5283 4.4896 12.5464 4.4896 12.5611C4.4896 12.5923 4.48979 12.6221 4.49023 12.6506C4.47217 12.6461 4.46247 12.6437 4.4623 12.6439C4.4498 12.6575 4.44248 12.6757 4.44248 12.6904C4.44248 13.1227 4.47908 13.2738 4.70076 13.5455C4.71146 13.5587 4.7381 13.5813 4.77881 13.6086C4.82633 13.6406 4.88805 13.6757 4.96237 13.713C5.14954 13.8068 5.40552 13.9089 5.71128 14.0146C5.96444 14.1021 6.23664 14.187 6.50895 14.2658C6.60439 14.2934 6.69291 14.3183 6.77231 14.3399C6.80506 14.3489 6.83785 14.3577 6.87068 14.3664C8.07653 14.6915 9.00039 15.8434 9.14228 17.0679L9.63629 19.5981L8.79863 17.9744C8.11144 16.7851 7.21348 16.1529 5.74422 15.8659L3.40712 15.2655C3.39423 15.2806 3.38021 15.2999 3.36636 15.3224ZM14.4684 17.3472C14.4684 17.5909 14.2708 17.7885 14.0271 17.7885C13.7834 17.7885 13.5858 17.5909 13.5858 17.3472C13.5858 17.1035 13.7834 16.9059 14.0271 16.9059C14.2708 16.9059 14.4684 17.1035 14.4684 17.3472ZM18.8046 17.7885C19.0483 17.7885 19.2459 17.5909 19.2459 17.3472C19.2459 17.1035 19.0483 16.9059 18.8046 16.9059C18.5608 16.9059 18.3633 17.1035 18.3633 17.3472C18.3633 17.5909 18.5608 17.7885 18.8046 17.7885Z",
    fill: "black"
  }));
};
var StyleguidistIconLight = _ref3 => {
  var props = _extends$L({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19.8424 16.393C20.5738 15.9778 21.0442 15.1809 21.0441 14.1522V10.0804C21.0441 7.27307 19.089 5 16.6724 5C14.2621 5 12.3082 7.27456 12.3082 10.0804V14.1522C12.3082 15.0354 12.655 15.7478 13.216 16.1945C12.8537 16.4492 12.617 16.87 12.617 17.346C12.617 18.1234 13.2483 18.7535 14.0271 18.7535C14.8059 18.7535 15.4373 18.1234 15.4373 17.346C15.4373 17.1681 15.4042 16.9979 15.3439 16.8411L15.4233 16.8565C15.5685 16.8842 15.7094 16.9091 15.844 16.9304C16.1728 16.9827 16.4485 17.0119 16.659 17.0119C16.8658 17.0119 17.1351 16.9845 17.4553 16.9355C17.4157 17.0654 17.3944 17.2032 17.3944 17.346C17.3944 18.1234 18.0258 18.7535 18.8046 18.7535C19.5834 18.7535 20.2147 18.1234 20.2147 17.346C20.2147 16.9784 20.0735 16.6437 19.8424 16.393ZM3.36636 15.3224C3.32628 15.3872 3.29767 15.4633 3.29118 15.5023C3.26131 15.5622 3.24265 15.6214 3.24265 15.6458C3.24265 15.9003 3.36518 16.198 3.55359 16.4307C3.69914 16.6106 4.09319 16.8105 4.45047 16.8857L5.52608 17.1166C6.48147 17.4351 7.368 18.0927 7.80039 18.9199L8.95534 21.6883C8.80775 21.4203 8.67443 21.1247 8.5547 20.8042C7.86807 18.9661 6.8267 18.1326 4.79649 18.1326H2.01692C1.66567 18.1326 1.38834 18.4223 1.38834 18.7721C1.38815 18.9886 1.43077 19.203 1.51374 19.403C1.59671 19.603 1.7184 19.7846 1.87181 19.9374C2.02519 20.0909 2.20737 20.2126 2.4079 20.2954C2.60843 20.3783 2.82335 20.4208 3.04033 20.4204L4.80319 20.4131C5.16959 20.4131 5.52372 20.6813 5.88747 21.2292C6.19064 21.686 6.446 22.2272 6.85181 23.2106C7.21568 24.0923 7.71446 24.8397 8.38155 25.4029C9.19769 26.092 10.225 26.4663 11.4768 26.4663C12.8245 26.4663 14.1954 25.9751 15.2307 25.1151C15.6547 24.7629 16.0108 24.36 16.2896 23.9163C16.5684 24.36 16.9246 24.7629 17.3485 25.1151C18.3838 25.9751 19.7547 26.4663 21.1024 26.4663C22.3542 26.4663 23.3815 26.092 24.1977 25.4029C24.8648 24.8397 25.3635 24.0923 25.7274 23.2106C26.1332 22.2272 26.3886 21.686 26.6918 21.2292C27.0555 20.6813 27.4096 20.4131 27.776 20.4131L29.5389 20.4204C29.7559 20.4208 29.9708 20.3783 30.1713 20.2954C30.3719 20.2126 30.554 20.0909 30.7074 19.9374C30.8608 19.7846 30.9825 19.603 31.0655 19.403C31.1485 19.203 31.1911 18.9886 31.1909 18.7721C31.1909 18.4223 30.9136 18.1326 30.5623 18.1326H27.7827C25.7525 18.1326 24.7111 18.9661 24.0245 20.8042C23.9048 21.1247 23.7715 21.4203 23.6239 21.6883L24.7788 18.9199C25.2112 18.0927 26.0978 17.4351 27.0531 17.1166L28.1288 16.8857C28.486 16.8105 28.8801 16.6106 29.0256 16.4307C29.214 16.198 29.3366 15.9003 29.3366 15.6458C29.3366 15.6144 29.3058 15.5257 29.26 15.4517C29.2461 15.4292 29.2321 15.4099 29.2192 15.3948L26.8821 15.9952C25.4129 16.2822 24.5149 16.9144 23.8277 18.1037L22.8736 19.9531L23.4369 17.0679C23.5788 15.8434 24.5027 14.6915 25.7085 14.3664C25.7414 14.3577 25.7742 14.3489 25.8069 14.3399C25.8863 14.3183 25.9748 14.2934 26.0703 14.2658C26.3426 14.187 26.6148 14.1021 26.8679 14.0146C27.1737 13.9089 27.4297 13.8068 27.6168 13.713C27.6912 13.6757 27.7529 13.6406 27.8004 13.6086C27.8411 13.5813 27.8678 13.5587 27.8785 13.5455C28.1001 13.2738 28.1367 13.1227 28.1367 12.6904C28.1367 12.6757 28.1294 12.6575 28.1169 12.6439C28.1142 12.641 25.5664 13.3072 25.5664 13.3072C24.7159 13.5008 23.9764 13.8802 23.3908 14.4661C22.703 15.1541 22.2398 16.1129 22.0462 17.3695L21.504 21.3526C21.3816 22.3499 20.9931 23.0699 20.3635 23.295C19.323 22.9697 18.8501 21.8567 18.8501 19.7656V19.484H16.995H15.5842H13.7291V19.7656C13.7291 21.7066 13.3217 22.8048 12.4311 23.2127C11.7023 23.0627 11.2553 22.3066 11.1224 21.2233L10.5801 17.2402C10.3865 15.9836 9.9234 15.0248 9.23558 14.3368C8.64992 13.7509 7.91042 13.3715 7.05998 13.1779C7.05998 13.1779 4.51218 12.5117 4.50942 12.5146C4.49692 12.5283 4.4896 12.5464 4.4896 12.5611C4.4896 12.5923 4.48979 12.6221 4.49023 12.6506C4.47217 12.6461 4.46247 12.6437 4.4623 12.6439C4.4498 12.6575 4.44248 12.6757 4.44248 12.6904C4.44248 13.1227 4.47908 13.2738 4.70076 13.5455C4.71146 13.5587 4.7381 13.5813 4.77881 13.6086C4.82633 13.6406 4.88805 13.6757 4.96237 13.713C5.14954 13.8068 5.40552 13.9089 5.71128 14.0146C5.96444 14.1021 6.23664 14.187 6.50895 14.2658C6.60439 14.2934 6.69291 14.3183 6.77231 14.3399C6.80506 14.3489 6.83785 14.3577 6.87068 14.3664C8.07653 14.6915 9.00039 15.8434 9.14228 17.0679L9.63629 19.5981L8.79863 17.9744C8.11144 16.7851 7.21348 16.1529 5.74422 15.8659L3.40712 15.2655C3.39423 15.2806 3.38021 15.2999 3.36636 15.3224ZM14.4684 17.3472C14.4684 17.5909 14.2708 17.7885 14.0271 17.7885C13.7834 17.7885 13.5858 17.5909 13.5858 17.3472C13.5858 17.1035 13.7834 16.9059 14.0271 16.9059C14.2708 16.9059 14.4684 17.1035 14.4684 17.3472ZM18.8046 17.7885C19.0483 17.7885 19.2459 17.5909 19.2459 17.3472C19.2459 17.1035 19.0483 16.9059 18.8046 16.9059C18.5608 16.9059 18.3633 17.1035 18.3633 17.3472C18.3633 17.5909 18.5608 17.7885 18.8046 17.7885Z",
    fill: "white"
  }));
};

function _extends$M() {
  _extends$M = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$M.apply(this, arguments);
}
var SvelteIcon = _ref => {
  var props = _extends$M({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M27.5342 4.35822C24.589 0.144416 18.7724 -1.10443 14.5671 1.5745L7.1816 6.28105C5.16609 7.54695 3.77642 9.60267 3.35293 11.9448C2.99976 13.8998 3.30868 15.9168 4.23081 17.6765C3.59882 18.6352 3.16817 19.7123 2.96497 20.8425C2.53883 23.2342 3.09525 25.6967 4.50833 27.6729C7.45346 31.8867 13.2701 33.1356 17.4754 30.4566L24.8609 25.7699C26.8739 24.5014 28.2628 22.4469 28.6896 20.1062C29.0414 18.1518 28.7315 16.1358 27.8089 14.3773C28.4405 13.4181 28.872 12.3413 29.0775 11.2113C29.5024 8.8196 28.9461 6.35758 27.5342 4.38088",
    fill: "#FF3E00"
  }), React.createElement("path", {
    d: "M13.845 28.0807C11.4634 28.6987 8.94924 27.766 7.5469 25.7444C6.69765 24.5563 6.36377 23.0758 6.62088 21.6382C6.66266 21.4068 6.72134 21.1787 6.79646 20.9558L6.93522 20.531L7.31469 20.8142C8.18692 21.451 9.16069 21.9354 10.1947 22.2471L10.4779 22.3292L10.4524 22.6124C10.4251 23.0007 10.5343 23.3863 10.7611 23.7027C11.1842 24.3108 11.9413 24.591 12.6584 24.405C12.8185 24.3619 12.9712 24.2951 13.1115 24.2067L20.4857 19.5002C20.8519 19.2697 21.1038 18.8954 21.1795 18.4694C21.2557 18.0356 21.1536 17.5893 20.8963 17.2319C20.4731 16.6237 19.716 16.3435 18.9989 16.5296C18.8386 16.5721 18.6858 16.6389 18.5458 16.7278L15.714 18.526C15.2508 18.8197 14.7457 19.0412 14.2159 19.183C11.8385 19.7972 9.3301 18.8662 7.9292 16.8496C7.08253 15.6604 6.75076 14.1802 7.00885 12.7434C7.26171 11.3318 8.09747 10.092 9.31115 9.32815L16.708 4.6216C17.1684 4.32851 17.6706 4.107 18.1975 3.96461C20.5782 3.3462 23.0919 4.27906 24.4927 6.30089C25.343 7.48856 25.6779 8.96911 25.4216 10.4071C25.3774 10.6399 25.3188 10.8697 25.246 11.0952L25.1044 11.52L24.7278 11.2368C23.8538 10.5952 22.877 10.1068 21.8393 9.79258L21.5561 9.71045L21.5816 9.42727C21.6143 9.03707 21.508 8.64787 21.2814 8.3285C20.8558 7.73103 20.1048 7.45928 19.3954 7.64603C19.2351 7.68852 19.0823 7.75538 18.9423 7.84426L11.554 12.5423C11.1892 12.7729 10.9375 13.1457 10.8602 13.5703C10.7854 14.0049 10.8873 14.4515 11.1434 14.8106C11.5644 15.413 12.3139 15.6925 13.0265 15.5129C13.1864 15.4693 13.3391 15.4025 13.4796 15.3147L16.3115 13.5193C16.7743 13.2224 17.2807 12.9998 17.8124 12.8595C20.1925 12.2396 22.7065 13.1715 24.1076 15.1929C24.9573 16.3809 25.2921 17.8612 25.0365 19.2991C24.7836 20.7107 23.9478 21.9505 22.7342 22.7143L15.3458 27.4209C14.8818 27.7155 14.3758 27.938 13.845 28.0807Z",
    fill: "white"
  }));
};
var SvelteIconDark = _ref2 => {
  var props = _extends$M({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.7231 2.29924C18.5836 -0.162139 23.895 0.977868 26.5895 4.83835C27.885 6.6779 28.4032 8.9061 28.0405 11.0825C27.8591 12.1188 27.4445 13.1034 26.8745 13.9843C27.7036 15.5907 27.9886 17.4302 27.6777 19.218C27.2891 21.3684 26.0195 23.2339 24.18 24.3998L17.4177 28.7008C13.5572 31.1621 8.24579 30.0221 5.55123 26.1617C4.25577 24.348 3.73759 22.0939 4.12622 19.9175C4.30759 18.8812 4.72214 17.8966 5.29214 17.0157C4.43714 15.4093 4.17804 13.5698 4.48895 11.782C4.87759 9.63156 6.14715 7.76609 7.9867 6.60017L14.7231 2.29924ZM8.32352 24.4257C9.59307 26.2653 11.899 27.1203 14.0754 26.5503C14.5676 26.4207 15.034 26.2135 15.4486 25.9544L22.2109 21.6534C23.325 20.9539 24.0763 19.8139 24.3095 18.5184C24.5427 17.1971 24.2318 15.8498 23.4545 14.7616C22.185 12.922 19.879 12.067 17.7027 12.637C17.2104 12.7666 16.744 12.9738 16.3295 13.2329L13.7386 14.8652C13.609 14.943 13.4795 14.9948 13.324 15.0466C12.6504 15.202 11.9767 14.943 11.5881 14.3989C11.3549 14.062 11.2513 13.6475 11.329 13.2589C11.4067 12.8702 11.6399 12.5334 11.9767 12.3261L18.739 7.99927C18.8686 7.92155 18.9981 7.86973 19.1536 7.81791C19.8013 7.63655 20.5009 7.89564 20.8895 8.43973C21.0968 8.72473 21.2004 9.08746 21.1745 9.45019L21.1486 9.70928L21.4077 9.78701C22.3663 10.072 23.2472 10.5125 24.0504 11.1084L24.3872 11.3675L24.5168 10.9788L24.6723 10.357C24.9054 9.03564 24.5945 7.68836 23.8172 6.60018C22.5477 4.76062 20.2418 3.90561 18.0654 4.47562C17.5731 4.60516 17.1068 4.81244 16.6922 5.07153L9.90398 9.39837C8.78989 10.0979 8.03852 11.2379 7.80533 12.5334C7.54624 13.8548 7.85715 15.202 8.63443 16.2902C9.90398 18.1298 12.2099 18.9848 14.3863 18.4148C14.8786 18.2852 15.3449 18.078 15.7595 17.8189L18.3504 16.1866C18.4799 16.1089 18.6095 16.057 18.7649 16.0052C19.4127 15.8498 20.1122 16.1089 20.5009 16.653C20.734 16.9898 20.8377 17.4043 20.76 17.793C20.7081 18.1816 20.475 18.5184 20.1381 18.7257L13.4017 23.0266C13.2722 23.1044 13.1426 23.1562 12.9872 23.208C12.3395 23.3635 11.6399 23.1044 11.2513 22.5603C11.044 22.2753 10.9404 21.9384 10.9663 21.5757L10.9922 21.3166L10.7331 21.2389C9.77444 20.9539 8.89352 20.4875 8.09034 19.9175L7.75352 19.6584L7.62397 20.0471C7.6067 20.1162 7.58654 20.1853 7.56639 20.2543C7.52609 20.3925 7.48579 20.5307 7.46851 20.6689C7.23533 21.9903 7.54624 23.3375 8.32352 24.4257Z",
    fill: "black",
    fillOpacity: "0.6"
  }));
};
var SvelteIconLight = _ref3 => {
  var props = _extends$M({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.7231 2.29924C18.5836 -0.162139 23.895 0.977868 26.5895 4.83835C27.885 6.6779 28.4032 8.9061 28.0405 11.0825C27.8591 12.1188 27.4445 13.1034 26.8745 13.9843C27.7036 15.5907 27.9886 17.4302 27.6777 19.218C27.2891 21.3684 26.0195 23.2339 24.18 24.3998L17.4177 28.7008C13.5572 31.1621 8.24579 30.0221 5.55123 26.1617C4.25577 24.348 3.73759 22.0939 4.12622 19.9175C4.30759 18.8812 4.72214 17.8966 5.29214 17.0157C4.43714 15.4093 4.17804 13.5698 4.48895 11.782C4.87759 9.63156 6.14715 7.76609 7.9867 6.60017L14.7231 2.29924ZM8.32352 24.4257C9.59307 26.2653 11.899 27.1203 14.0754 26.5503C14.5676 26.4207 15.034 26.2135 15.4486 25.9544L22.2109 21.6534C23.325 20.9539 24.0763 19.8139 24.3095 18.5184C24.5427 17.1971 24.2318 15.8498 23.4545 14.7616C22.185 12.922 19.879 12.067 17.7027 12.637C17.2104 12.7666 16.744 12.9738 16.3295 13.2329L13.7386 14.8652C13.609 14.943 13.4795 14.9948 13.324 15.0466C12.6504 15.202 11.9767 14.943 11.5881 14.3989C11.3549 14.062 11.2513 13.6475 11.329 13.2589C11.4067 12.8702 11.6399 12.5334 11.9767 12.3261L18.739 7.99927C18.8686 7.92155 18.9981 7.86973 19.1536 7.81791C19.8013 7.63655 20.5009 7.89564 20.8895 8.43973C21.0968 8.72473 21.2004 9.08746 21.1745 9.45019L21.1486 9.70928L21.4077 9.78701C22.3663 10.072 23.2472 10.5125 24.0504 11.1084L24.3872 11.3675L24.5168 10.9788L24.6723 10.357C24.9054 9.03564 24.5945 7.68836 23.8172 6.60018C22.5477 4.76062 20.2418 3.90561 18.0654 4.47562C17.5731 4.60516 17.1068 4.81244 16.6922 5.07153L9.90398 9.39837C8.78989 10.0979 8.03852 11.2379 7.80533 12.5334C7.54624 13.8548 7.85715 15.202 8.63443 16.2902C9.90398 18.1298 12.2099 18.9848 14.3863 18.4148C14.8786 18.2852 15.3449 18.078 15.7595 17.8189L18.3504 16.1866C18.4799 16.1089 18.6095 16.057 18.7649 16.0052C19.4127 15.8498 20.1122 16.1089 20.5009 16.653C20.734 16.9898 20.8377 17.4043 20.76 17.793C20.7081 18.1816 20.475 18.5184 20.1381 18.7257L13.4017 23.0266C13.2722 23.1044 13.1426 23.1562 12.9872 23.208C12.3395 23.3635 11.6399 23.1044 11.2513 22.5603C11.044 22.2753 10.9404 21.9384 10.9663 21.5757L10.9922 21.3166L10.7331 21.2389C9.77444 20.9539 8.89352 20.4875 8.09034 19.9175L7.75352 19.6584L7.62397 20.0471C7.6067 20.1162 7.58654 20.1853 7.56639 20.2543C7.52609 20.3925 7.48579 20.5307 7.46851 20.6689C7.23533 21.9903 7.54624 23.3375 8.32352 24.4257Z",
    fill: "white",
    fillOpacity: "0.8"
  }));
};

function _extends$N() {
  _extends$N = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$N.apply(this, arguments);
}
var TypeScriptIcon = _ref => {
  var props = _extends$N({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M0 16V32H16H32V16V0H16H0V16Z",
    fill: "#007ACC"
  }), React.createElement("path", {
    d: "M7.0764 16.1061L7.06624 17.4166H9.14878H11.2313L11.2313 23.3341V29.2515H12.7043H14.1773V23.3341L14.1773 17.4166H16.2599H18.3424V16.1315C18.3424 15.4204 18.3272 14.8261 18.3069 14.8109C18.2916 14.7906 15.757 14.7804 12.684 14.7855L7.09163 14.8007L7.0764 16.1061Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M25.8208 14.7636C26.6335 14.9667 27.2532 15.3274 27.8221 15.9166C28.1167 16.2315 28.5535 16.8055 28.5891 16.9426C28.5993 16.9833 27.2075 17.9179 26.3643 18.441C26.3339 18.4613 26.212 18.3293 26.0748 18.1261C25.6634 17.5267 25.2316 17.2677 24.5713 17.222C23.6012 17.1559 22.9764 17.6639 22.9815 18.5121C22.9815 18.761 23.017 18.9083 23.1186 19.1115C23.332 19.5534 23.7281 19.8175 24.9726 20.3559C27.2634 21.3413 28.2437 21.9915 28.8532 22.9159C29.5339 23.9471 29.6862 25.5928 29.224 26.8169C28.7161 28.1477 27.4564 29.0518 25.6837 29.3515C25.1351 29.448 23.8348 29.4328 23.2456 29.3261C21.9605 29.0975 20.7415 28.4626 19.9897 27.6296C19.6951 27.3045 19.1212 26.4563 19.1567 26.3953C19.172 26.375 19.304 26.2937 19.4513 26.2074C19.5935 26.1261 20.132 25.8163 20.6399 25.5217L21.5593 24.9883L21.7523 25.2728C22.0215 25.6842 22.6107 26.248 22.9662 26.4359C23.9872 26.9744 25.3891 26.8982 26.0799 26.2785C26.3745 26.0093 26.4964 25.7299 26.4964 25.3185C26.4964 24.9477 26.4507 24.7852 26.2577 24.5058C26.0088 24.1502 25.5008 23.8506 24.0583 23.2258C22.4075 22.5147 21.6964 22.0728 21.0462 21.3718C20.6704 20.9655 20.3148 20.3153 20.1675 19.7718C20.0456 19.3198 20.0151 18.1871 20.1116 17.7299C20.452 16.135 21.6558 15.0226 23.3929 14.6925C23.9567 14.5858 25.2672 14.6264 25.8208 14.7636Z",
    fill: "white"
  }));
};
var TypeScriptIconDark = _ref2 => {
  var props = _extends$N({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 16V31H16H31V16V1H16H1V16ZM7.63412 16.0995L7.6246 17.3281H9.57698H11.5294V22.8757V28.4233H12.9103H14.2913V22.8757V17.3281H16.2436H18.196V16.1233C18.196 15.4566 18.1817 14.8995 18.1627 14.8852C18.1484 14.8661 15.7722 14.8566 12.8913 14.8614L7.6484 14.8757L7.63412 16.0995ZM27.0832 15.9218C26.5499 15.3694 25.9689 15.0313 25.207 14.8408C24.688 14.7123 23.4594 14.6742 22.9308 14.7742C21.3023 15.0837 20.1737 16.1266 19.8547 17.6218C19.7642 18.0504 19.7928 19.1123 19.907 19.5361C20.0451 20.0456 20.3785 20.6551 20.7308 21.0361C21.3404 21.6932 22.007 22.1075 23.5547 22.7742C24.907 23.3599 25.3832 23.6408 25.6166 23.9742C25.7975 24.2361 25.8404 24.3885 25.8404 24.7361C25.8404 25.1218 25.7261 25.3837 25.4499 25.6361C24.8023 26.217 23.488 26.2885 22.5308 25.7837C22.1975 25.6075 21.6451 25.0789 21.3928 24.6932L21.2118 24.4266L20.3499 24.9266C19.8737 25.2027 19.3689 25.4932 19.2356 25.5694C19.0975 25.6504 18.9737 25.7266 18.9594 25.7456C18.9261 25.8027 19.4642 26.598 19.7404 26.9028C20.4451 27.6837 21.588 28.2789 22.7928 28.4932C23.3451 28.5932 24.5642 28.6075 25.0785 28.517C26.7404 28.2361 27.9213 27.3885 28.3975 26.1408C28.8308 24.9932 28.688 23.4504 28.0499 22.4837C27.4785 21.617 26.5594 21.0075 24.4118 20.0837C23.2451 19.5789 22.8737 19.3313 22.6737 18.917C22.5785 18.7266 22.5451 18.5885 22.5451 18.3551C22.5404 17.5599 23.1261 17.0837 24.0356 17.1456C24.6547 17.1885 25.0594 17.4313 25.4451 17.9932C25.5737 18.1837 25.688 18.3075 25.7166 18.2885C26.507 17.798 27.8118 16.9218 27.8023 16.8837C27.7689 16.7551 27.3594 16.217 27.0832 15.9218Z",
    fill: "black"
  }));
};
var TypeScriptIconLight = _ref3 => {
  var props = _extends$N({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 16V31H16H31V16V1H16H1V16ZM7.63412 16.0995L7.6246 17.3281H9.57698H11.5294V22.8757V28.4233H12.9103H14.2913V22.8757V17.3281H16.2436H18.196V16.1233C18.196 15.4566 18.1817 14.8995 18.1627 14.8852C18.1484 14.8661 15.7722 14.8566 12.8913 14.8614L7.6484 14.8757L7.63412 16.0995ZM27.0832 15.9218C26.5499 15.3694 25.9689 15.0313 25.207 14.8408C24.688 14.7123 23.4594 14.6742 22.9308 14.7742C21.3023 15.0837 20.1737 16.1266 19.8547 17.6218C19.7642 18.0504 19.7928 19.1123 19.907 19.5361C20.0451 20.0456 20.3785 20.6551 20.7308 21.0361C21.3404 21.6932 22.007 22.1075 23.5547 22.7742C24.907 23.3599 25.3832 23.6408 25.6166 23.9742C25.7975 24.2361 25.8404 24.3885 25.8404 24.7361C25.8404 25.1218 25.7261 25.3837 25.4499 25.6361C24.8023 26.217 23.488 26.2885 22.5308 25.7837C22.1975 25.6075 21.6451 25.0789 21.3928 24.6932L21.2118 24.4266L20.3499 24.9266C19.8737 25.2027 19.3689 25.4932 19.2356 25.5694C19.0975 25.6504 18.9737 25.7266 18.9594 25.7456C18.9261 25.8027 19.4642 26.598 19.7404 26.9028C20.4451 27.6837 21.588 28.2789 22.7928 28.4932C23.3451 28.5932 24.5642 28.6075 25.0785 28.517C26.7404 28.2361 27.9213 27.3885 28.3975 26.1408C28.8308 24.9932 28.688 23.4504 28.0499 22.4837C27.4785 21.617 26.5594 21.0075 24.4118 20.0837C23.2451 19.5789 22.8737 19.3313 22.6737 18.917C22.5785 18.7266 22.5451 18.5885 22.5451 18.3551C22.5404 17.5599 23.1261 17.0837 24.0356 17.1456C24.6547 17.1885 25.0594 17.4313 25.4451 17.9932C25.5737 18.1837 25.688 18.3075 25.7166 18.2885C26.507 17.798 27.8118 16.9218 27.8023 16.8837C27.7689 16.7551 27.3594 16.217 27.0832 15.9218Z",
    fill: "white"
  }));
};

function _extends$O() {
  _extends$O = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$O.apply(this, arguments);
}
var UnibitIcon = _ref => {
  var props = _extends$O({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M28.2599 24.5749L17.6403 30.6689C16.8732 31.1103 15.9389 31.1103 15.1718 30.6689L4.3465 24.5749C3.45939 24.082 2.93655 23.1006 3.00941 22.0678V17.8594C2.9237 16.8394 3.42939 15.8623 4.29507 15.3652L15.1204 9.05683C15.5104 8.82541 15.9475 8.71399 16.3803 8.71399C16.8217 8.71399 17.2589 8.8297 17.6531 9.06541L28.277 15.3738C29.1384 15.8752 29.6398 16.8437 29.5627 17.8594V22.0678C29.6442 23.092 29.1342 24.0734 28.2599 24.5749Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.1223 9.05486L4.29683 15.3631C3.42896 15.8638 2.92567 16.8407 3.01005 17.8612V22.0667C2.93651 23.1002 3.4596 24.0818 4.34586 24.5732L15.1713 30.671C15.9397 31.1082 16.8726 31.1082 17.6407 30.671L28.2619 24.5732C29.1347 24.0719 29.6433 23.0925 29.563 22.0667V17.8612C29.6386 16.8454 29.1372 15.876 28.2763 15.3737L17.6551 9.06536C17.2606 8.83111 16.8201 8.71399 16.3797 8.71399C15.9461 8.71399 15.5124 8.82756 15.1223 9.05486ZM16.1686 24.946L5.27047 18.5605C5.13517 18.4831 5.02371 18.3677 4.94909 18.2276C4.72907 17.8162 4.87302 17.2983 5.27047 17.0706L16.1686 10.6851C16.4232 10.5331 16.7366 10.5331 16.9911 10.6851L27.6837 17.0855C28.0771 17.3207 28.2119 17.8413 27.9849 18.2487C27.7579 18.6561 27.2548 18.7957 26.8612 18.5605L16.5758 12.4113L7.35141 17.8155L16.9788 23.4561C17.3763 23.6877 17.5171 24.2089 17.2934 24.6201C17.1417 24.8994 16.8616 25.0563 16.5731 25.0563C16.4359 25.0562 16.2967 25.0205 16.1686 24.946ZM15.832 29.037L4.94948 22.9436C4.91828 22.9287 4.88768 22.9117 4.85871 22.8927C4.47558 22.6442 4.3618 22.1248 4.60471 21.7327C4.84718 21.3408 5.35498 21.2242 5.73794 21.4727L16.222 27.3413L26.5029 21.4727C26.8998 21.2465 27.4008 21.3923 27.6219 21.7984C27.8431 22.2048 27.7006 22.7172 27.3037 22.9436L16.6266 29.037C16.503 29.107 16.366 29.1418 16.2293 29.1418C16.0923 29.1418 15.9556 29.107 15.832 29.037Z",
    fill: "#D4EDFE"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.29689 7.57606C3.42902 8.07122 2.92572 9.03744 3.01011 10.0467V10.1653C2.93657 11.1875 3.45966 12.1582 4.34592 12.6443L15.1714 18.6751C15.9398 19.1074 16.8726 19.1074 17.6408 18.6751L28.262 12.6443C29.1348 12.1485 29.6434 11.1798 29.5631 10.1654V10.0467C29.6387 9.04207 29.1372 8.08335 28.2763 7.58652L17.6551 1.34752C17.2607 1.11584 16.8201 1 16.3797 1C15.9461 1 15.5125 1.11228 15.1223 1.3371L4.29689 7.57606Z",
    fill: "url(#Unibit_Paint_0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M22.2919 7.96467C22.4266 8.04241 22.5376 8.15816 22.6119 8.29868C22.8309 8.71151 22.6876 9.23109 22.2919 9.4596L16.5867 12.8852C16.3333 13.0377 16.0214 13.0377 15.768 12.8852L10.2673 9.44469C9.87578 9.20868 9.74151 8.68631 9.96749 8.27756C10.1935 7.8688 10.6943 7.7287 11.0861 7.96467L16.1814 11.1532L20.2206 8.71211L15.7802 6.03398C15.3846 5.80162 15.2444 5.27861 15.4671 4.86599C15.6181 4.58584 15.8969 4.42844 16.184 4.42844C16.3206 4.42844 16.4591 4.46431 16.5866 4.53905L22.2919 7.96467Z",
    fill: "white"
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "Unibit_Paint_0_Linear_".concat(id),
    x1: "19.2488",
    y1: "7.21843",
    x2: "13.8168",
    y2: "18.747",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#3EB2FD"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#0495F3"
  }))));
};
var UnibitIconDark = _ref2 => {
  var props = _extends$O({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.70619 13.9592L4.29684 15.3631C3.42897 15.8638 2.92568 16.8408 3.01006 17.8612V22.0667C2.93652 23.1003 3.45961 24.0818 4.34587 24.5732L15.1713 30.671C15.9397 31.1082 16.8726 31.1082 17.6407 30.671L28.2619 24.5732C29.1347 24.072 29.6433 23.0925 29.563 22.0667V17.8612C29.6386 16.8454 29.1372 15.876 28.2763 15.3737L25.9199 13.9742L24.1576 14.9748L27.6837 17.0855C28.0771 17.3207 28.2119 17.8414 27.9849 18.2487C27.7579 18.6561 27.2548 18.7957 26.8612 18.5606L22.4681 15.9341L17.6408 18.6751C16.8726 19.1074 15.9398 19.1074 15.1714 18.6751L10.411 16.0231L7.35142 17.8156L16.9788 23.4561C17.3763 23.6877 17.5171 24.2089 17.2934 24.6202C17.1417 24.8994 16.8616 25.0563 16.5731 25.0563C16.4359 25.0563 16.2967 25.0205 16.1686 24.946L5.27048 18.5606C5.13518 18.4831 5.02372 18.3677 4.9491 18.2277C4.72908 17.8162 4.87303 17.2983 5.27048 17.0706L8.69236 15.0656L6.70619 13.9592ZM4.94949 22.9436L15.832 29.037C15.9556 29.107 16.0923 29.1419 16.2293 29.1419C16.366 29.1419 16.503 29.107 16.6266 29.037L27.3037 22.9436C27.7006 22.7172 27.8431 22.2048 27.6219 21.7984C27.4008 21.3923 26.8998 21.2465 26.5029 21.4728L16.222 27.3413L5.73795 21.4728C5.35499 21.2242 4.84719 21.3408 4.60472 21.7327C4.36181 22.1248 4.47559 22.6442 4.85872 22.8927C4.88769 22.9117 4.91829 22.9287 4.94949 22.9436Z",
    fill: "black"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.01012 10.0467C2.92573 9.03744 3.42903 8.07122 4.2969 7.57606L15.1223 1.3371C15.5125 1.11228 15.9461 1 16.3797 1C16.8201 1 17.2607 1.11584 17.6551 1.34752L28.2763 7.58652C29.1372 8.08335 29.6387 9.04207 29.5631 10.0467V10.1654C29.6434 11.1798 29.1348 12.1485 28.262 12.6443L17.6408 18.6751C16.8726 19.1074 15.9398 19.1074 15.1714 18.6751L4.34593 12.6443C3.45967 12.1582 2.93658 11.1875 3.01012 10.1653V10.0467ZM22.6119 8.2987C22.5376 8.15818 22.4266 8.04242 22.2919 7.96468L16.5866 4.53906C16.4591 4.46432 16.3206 4.42845 16.184 4.42845C15.8969 4.42845 15.6181 4.58586 15.4671 4.86601C15.2444 5.27862 15.3846 5.80163 15.7802 6.03399L20.2206 8.71213L16.1814 11.1532L11.0861 7.96468C10.6943 7.72872 10.1935 7.86881 9.9675 8.27757C9.74152 8.68633 9.87578 9.2087 10.2673 9.4447L15.768 12.8852C16.0214 13.0377 16.3333 13.0377 16.5867 12.8852L22.2919 9.45961C22.6876 9.23111 22.8309 8.71153 22.6119 8.2987Z",
    fill: "black"
  }));
};
var UnibitIconLight = _ref3 => {
  var props = _extends$O({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.70619 13.9592L4.29684 15.3631C3.42897 15.8638 2.92568 16.8408 3.01006 17.8612V22.0667C2.93652 23.1003 3.45961 24.0818 4.34587 24.5732L15.1713 30.671C15.9397 31.1082 16.8726 31.1082 17.6407 30.671L28.2619 24.5732C29.1347 24.072 29.6433 23.0925 29.563 22.0667V17.8612C29.6386 16.8454 29.1372 15.876 28.2763 15.3737L25.9199 13.9742L24.1576 14.9748L27.6837 17.0855C28.0771 17.3207 28.2119 17.8414 27.9849 18.2487C27.7579 18.6561 27.2548 18.7957 26.8612 18.5606L22.4681 15.9341L17.6408 18.6751C16.8726 19.1074 15.9398 19.1074 15.1714 18.6751L10.411 16.0231L7.35142 17.8156L16.9788 23.4561C17.3763 23.6877 17.5171 24.2089 17.2934 24.6202C17.1417 24.8994 16.8616 25.0563 16.5731 25.0563C16.4359 25.0563 16.2967 25.0205 16.1686 24.946L5.27048 18.5606C5.13518 18.4831 5.02372 18.3677 4.9491 18.2277C4.72908 17.8162 4.87303 17.2983 5.27048 17.0706L8.69236 15.0656L6.70619 13.9592ZM4.94949 22.9436L15.832 29.037C15.9556 29.107 16.0923 29.1419 16.2293 29.1419C16.366 29.1419 16.503 29.107 16.6266 29.037L27.3037 22.9436C27.7006 22.7172 27.8431 22.2048 27.6219 21.7984C27.4008 21.3923 26.8998 21.2465 26.5029 21.4728L16.222 27.3413L5.73795 21.4728C5.35499 21.2242 4.84719 21.3408 4.60472 21.7327C4.36181 22.1248 4.47559 22.6442 4.85872 22.8927C4.88769 22.9117 4.91829 22.9287 4.94949 22.9436Z",
    fill: "white"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.01012 10.0467C2.92573 9.03744 3.42903 8.07122 4.2969 7.57606L15.1223 1.3371C15.5125 1.11228 15.9461 1 16.3797 1C16.8201 1 17.2607 1.11584 17.6551 1.34752L28.2763 7.58652C29.1372 8.08335 29.6387 9.04207 29.5631 10.0467V10.1654C29.6434 11.1798 29.1348 12.1485 28.262 12.6443L17.6408 18.6751C16.8726 19.1074 15.9398 19.1074 15.1714 18.6751L4.34593 12.6443C3.45967 12.1582 2.93658 11.1875 3.01012 10.1653V10.0467ZM22.6119 8.2987C22.5376 8.15818 22.4266 8.04242 22.2919 7.96468L16.5866 4.53906C16.4591 4.46432 16.3206 4.42845 16.184 4.42845C15.8969 4.42845 15.6181 4.58586 15.4671 4.86601C15.2444 5.27862 15.3846 5.80163 15.7802 6.03399L20.2206 8.71213L16.1814 11.1532L11.0861 7.96468C10.6943 7.72872 10.1935 7.86881 9.9675 8.27757C9.74152 8.68633 9.87578 9.2087 10.2673 9.4447L15.768 12.8852C16.0214 13.0377 16.3333 13.0377 16.5867 12.8852L22.2919 9.45961C22.6876 9.23111 22.8309 8.71153 22.6119 8.2987Z",
    fill: "white"
  }));
};

function _extends$P() {
  _extends$P = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$P.apply(this, arguments);
}
var VueIcon = _ref => {
  var props = _extends$P({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M25.6 2.1875H32L16 29.7875L0 2.1875H6.32H12.24L16 8.5875L19.68 2.1875H25.6Z",
    fill: "#41B883"
  }), React.createElement("path", {
    d: "M0 2.1875L16 29.7875L32 2.1875H25.6L16 18.7475L6.32 2.1875H0Z",
    fill: "#41B883"
  }), React.createElement("path", {
    d: "M6.32 2.1875L16 18.8275L25.6 2.1875H19.68L16 8.5875L12.24 2.1875H6.32Z",
    fill: "#35495E"
  }));
};
var VueIconDark = _ref2 => {
  var props = _extends$P({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M2 4.91406L16 29.0641L30 4.91406H24.4L16 19.4041L7.53 4.91406H2Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M7.53 3.91406L16 18.4741L24.4 3.91406H19.22L16 9.5141L12.71 3.91406H7.53Z",
    fill: "black",
    fillOpacity: "0.6"
  }));
};
var VueIconLight = _ref3 => {
  var props = _extends$P({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    d: "M2 4.91406L16 29.0641L30 4.91406H24.4L16 19.4041L7.53 4.91406H2Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M7.53 3.91406L16 18.4741L24.4 3.91406H19.22L16 9.5141L12.71 3.91406H7.53Z",
    fill: "white",
    fillOpacity: "0.6"
  }));
};

function _extends$Q() {
  _extends$Q = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$Q.apply(this, arguments);
}
var VuePressIcon = _ref => {
  var props = _extends$Q({}, _ref);

  var id = useUniqueId();
  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.73587 7.90886L19.3984 5.43536C19.8439 5.36933 20.3115 5.63888 20.4443 6.03926L27.3378 26.8118C27.5068 27.3216 27.2442 27.8237 26.7485 27.9312L8.08892 31.9766C7.53676 32.0964 6.99003 31.7433 6.87003 31.1904L2.01592 8.81459C1.92304 8.38637 2.24605 7.98155 2.73587 7.90886Z",
    fill: "url(#VuePress_Paint0_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.8401 7.68541L19.5027 5.21191C19.9481 5.14588 20.4158 5.41543 20.5486 5.81581L27.442 26.5884C27.6113 27.0982 27.3484 27.6003 26.8527 27.7077L8.19315 31.7532C7.64099 31.8729 7.09425 31.5199 6.97426 30.967L2.11991 8.59139C2.02702 8.16292 2.35003 7.75834 2.8401 7.68541Z",
    fill: "url(#VuePress_Paint1_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.4202 5.19932L20.9615 2.77387C21.405 2.70882 21.8749 2.98059 22.0124 3.38196L29.0032 23.7904C29.1712 24.2809 28.9172 24.7624 28.434 24.8636L10.3229 28.6681C9.78926 28.7802 9.24967 28.4422 9.11958 27.9152L3.73179 6.09987C3.62633 5.67313 3.93531 5.27053 4.4202 5.19932Z",
    fill: "url(#VuePress_Paint2_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.52418 4.97612L21.0655 2.55066C21.509 2.48562 21.9789 2.75738 22.1163 3.15875L29.1071 23.5672C29.2752 24.0577 29.0212 24.5392 28.538 24.6404L10.4269 28.4449C9.89324 28.557 9.35364 28.219 9.22355 27.692L3.83601 5.87667C3.73056 5.44968 4.03928 5.04708 4.52418 4.97612Z",
    fill: "url(#VuePress_Paint3_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.19741 2.58045L22.5968 0.23236C23.0371 0.169284 23.5062 0.438834 23.6462 0.83552L30.7136 20.8674C30.8824 21.3459 30.6345 21.8138 30.158 21.9111L12.3295 25.5545C11.805 25.6617 11.2693 25.3318 11.1348 24.8193L5.52698 3.46548C5.41611 3.04489 5.71719 2.64919 6.19741 2.58045Z",
    fill: "url(#VuePress_Paint4_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.30139 2.35699L22.7008 0.00915408C23.1411 -0.0539215 23.6102 0.215628 23.7502 0.612315L30.8176 20.6442C30.9864 21.1227 30.7385 21.5906 30.262 21.6879L12.4335 25.3313C11.909 25.4385 11.3733 25.1086 11.2388 24.5961L5.63096 3.24252C5.52033 2.82168 5.82117 2.42574 6.30139 2.35699Z",
    fill: "url(#VuePress_Paint5_Linear_".concat(id, ")")
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.1566 15.5455L22.3814 14.2066C22.4842 14.1876 22.585 14.2482 22.6163 14.3478L23.829 18.2018C23.8659 18.3193 23.7925 18.443 23.6713 18.4667L16.3429 19.8935C16.2372 19.9139 16.1338 19.8501 16.1044 19.7466L14.9952 15.8044C14.9624 15.6876 15.0371 15.5676 15.1566 15.5455ZM14.5327 15.8884L15.6242 19.8627C15.709 20.1709 16.0167 20.3619 16.3304 20.301L23.7469 18.8592C24.1064 18.7892 24.3242 18.4213 24.2126 18.0727L22.9883 14.2453C22.8949 13.9535 22.6005 13.7759 22.2989 13.8296L15.0149 15.1246C14.6611 15.1877 14.4374 15.5415 14.5327 15.8884ZM15.9739 16.2122L16.7374 18.8927L17.5579 18.7059L17.1193 17.1625L18.2394 18.0397L18.7844 16.805L19.2311 18.3728L20.0272 18.2023L19.2555 15.6113L18.4106 15.7574L17.8989 16.8944L16.7941 16.0577L15.9739 16.2122ZM21.9185 16.5727L21.5095 15.1978L20.6594 15.3432L21.0906 16.7304L20.3268 16.8782L21.8963 17.9253L22.6921 16.4224L21.9185 16.5727Z",
    fill: "#BCC0CF"
  }), React.createElement("path", {
    d: "M23.8107 18.3664L23.7245 18.5462L23.6974 18.6029C23.6678 18.6473 23.621 18.6793 23.5668 18.6892L16.2392 20.1182C16.1333 20.1379 16.0298 20.0739 16.0002 19.9704L14.8915 16.0282C14.8791 15.9813 14.8816 15.9321 14.9013 15.8902C14.9038 15.8852 14.9062 15.8803 14.9087 15.8754L14.9161 15.8606L14.9999 15.6807C14.9851 15.7177 14.9826 15.7621 14.9949 15.8039L15.0245 15.9099L16.1037 19.7462C16.1333 19.8496 16.2367 19.9137 16.3427 19.894L23.6678 18.4674H23.6703C23.7344 18.4551 23.7836 18.4157 23.8107 18.3664ZM24.1187 18.6226C24.1458 18.5191 24.1434 18.4058 24.1089 18.2949L22.8843 14.4685C22.7907 14.1778 22.4975 14.0004 22.1944 14.0521L14.9112 15.3481C14.751 15.3752 14.6155 15.4639 14.5293 15.5871C14.5785 15.358 14.7633 15.1683 15.0146 15.1239L22.3004 13.8304C22.601 13.7762 22.8966 13.9536 22.9878 14.2443L24.2124 18.0732C24.2764 18.2678 24.2345 18.4723 24.1187 18.6226ZM22.6921 16.4224L22.5714 16.6491L21.815 16.7969L21.406 15.422L20.721 15.5403L20.6594 15.3432L21.5095 15.1978L21.9185 16.5727L22.6921 16.4224ZM20.928 16.7624L21.0906 16.7304L20.9871 16.9546L20.5633 17.0359L20.3268 16.8782L20.928 16.7624ZM17.8949 16.893L17.7939 17.1172L16.6901 16.2819L16.0273 16.4051L15.9731 16.2129L16.7936 16.0577L17.8949 16.893ZM20.0262 18.2013L19.866 18.2358L19.1515 15.8335L18.3089 15.9813L18.4099 15.7571L19.255 15.6118L20.0262 18.2013ZM17.2297 17.5533L17.1188 17.1615L17.0153 17.3858L17.4022 18.7409L17.5574 18.7064L17.2297 17.5533Z",
    fill: "#A2A6B3"
  }), React.createElement("path", {
    d: "M12.8933 5.37674L10.7645 5.67241L18.3335 12.7093L21.0537 4.07581L19.0431 4.43061L17.4465 9.51608L12.8933 5.37674Z",
    fill: "url(#VuePress_Paint6_Linear_".concat(id, ")")
  }), React.createElement("path", {
    d: "M12.8932 5.37674L14.8447 5.08107L16.5595 6.61854L17.21 4.72627L19.0431 4.4306L17.4465 9.51607L12.8932 5.37674Z",
    fill: "url(#VuePress_Paint7_Linear_".concat(id, ")")
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "VuePress_Paint0_Linear_".concat(id),
    x1: "14.6945",
    y1: "31.9997",
    x2: "14.6945",
    y2: "5.42521",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#1D2130"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#3E445A"
  })), React.createElement("linearGradient", {
    id: "VuePress_Paint1_Linear_".concat(id),
    x1: "14.7986",
    y1: "31.7764",
    x2: "14.7986",
    y2: "5.20194",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#262B3F"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#656E91"
  })), React.createElement("linearGradient", {
    id: "VuePress_Paint2_Linear_".concat(id),
    x1: "16.383",
    y1: "28.6898",
    x2: "16.383",
    y2: "2.76414",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#267550"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#79B881"
  })), React.createElement("linearGradient", {
    id: "VuePress_Paint3_Linear_".concat(id),
    x1: "16.4871",
    y1: "28.4665",
    x2: "16.4871",
    y2: "2.54086",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#279264"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#A4F3AA"
  })), React.createElement("linearGradient", {
    id: "VuePress_Paint4_Linear_".concat(id),
    x1: "18.1351",
    y1: "25.575",
    x2: "18.1351",
    y2: "0.223269",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.59",
    stopColor: "#CECFD0"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#DFDFDF"
  })), React.createElement("linearGradient", {
    id: "VuePress_Paint5_Linear_".concat(id),
    x1: "18.2392",
    y1: "25.3517",
    x2: "18.2392",
    y2: "-1.20886e-05",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#EAEEF0"
  }), React.createElement("stop", {
    offset: "0.41",
    stopColor: "white"
  })), React.createElement("linearGradient", {
    id: "VuePress_Paint6_Linear_".concat(id),
    x1: "13.2661",
    y1: "-3.77058",
    x2: "23.9637",
    y2: "31.2197",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.22",
    stopColor: "#73CB8D"
  }), React.createElement("stop", {
    offset: "0.4",
    stopColor: "#2F9869"
  })), React.createElement("linearGradient", {
    id: "VuePress_Paint7_Linear_".concat(id),
    x1: "11.8979",
    y1: "-6.91736",
    x2: "28.6463",
    y2: "41.7235",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    offset: "0.25",
    stopColor: "#586080"
  }), React.createElement("stop", {
    offset: "0.35",
    stopColor: "#2C3247"
  }))));
};
var VuePressIconDark = _ref2 => {
  var props = _extends$Q({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.2229 9.42596L18.7612 7.41624C19.1232 7.36259 19.5031 7.5816 19.611 7.90691L25.212 24.7846C25.3493 25.1988 25.1359 25.6068 24.7331 25.6941L9.57225 28.981C9.12362 29.0783 8.6794 28.7914 8.5819 28.3422L4.63794 10.1619C4.56247 9.81393 4.82492 9.48502 5.2229 9.42596Z",
    fill: "white",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.3076 9.24439L18.8459 7.23468C19.2079 7.18103 19.5878 7.40003 19.6957 7.72535L25.2967 24.6031C25.4342 25.0173 25.2206 25.4252 24.8178 25.5125L9.65695 28.7995C9.20832 28.8968 8.76409 28.6099 8.6666 28.1606L4.72244 9.9805C4.64696 9.63236 4.90942 9.30365 5.3076 9.24439Z",
    fill: "black",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.5981 7.0178L20.1364 5.00808C20.4984 4.95443 20.8783 5.17344 20.9862 5.49875L26.5872 22.3765C26.7247 22.7907 26.5111 23.1986 26.1083 23.2859L10.9474 26.5729C10.4988 26.6702 10.0546 26.3833 9.9571 25.9341L6.01294 7.7539C5.93747 7.40577 6.19992 7.07706 6.5981 7.0178Z",
    fill: "black",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M21.3599 3.1888L8.03538 5.09662C7.64521 5.15248 7.40058 5.47398 7.49066 5.81571L12.047 23.1657C12.1563 23.5821 12.5915 23.8501 13.0178 23.763L27.5034 20.8028C27.8906 20.7237 28.0919 20.3436 27.9548 19.9548L22.2125 3.67887C22.0988 3.35656 21.7177 3.13755 21.3599 3.1888ZM21.1849 14.5429L15.3147 15.6307C15.2176 15.6487 15.157 15.7462 15.1836 15.8411L16.0849 19.0441C16.1087 19.1282 16.1928 19.1801 16.2786 19.1635L22.2329 18.0042C22.3314 17.9849 22.3911 17.8844 22.3611 17.789L21.3757 14.6576C21.3503 14.5767 21.2684 14.5274 21.1849 14.5429ZM15.6947 19.1384L14.8078 15.9094C14.7304 15.6275 14.9121 15.34 15.1996 15.2888L21.1179 14.2366C21.3629 14.1929 21.6021 14.3373 21.678 14.5743L22.6727 17.6841C22.7634 17.9673 22.5865 18.2662 22.2944 18.3231L16.2684 19.4946C16.0136 19.544 15.7636 19.3889 15.6947 19.1384ZM16.5991 18.3503L15.9788 16.1724L16.6452 16.0469L17.5429 16.7267L17.9586 15.8029L18.6451 15.6841L19.2721 17.7894L18.6253 17.9279L18.2623 16.6541L17.8195 17.6572L16.9094 16.9445L17.2658 18.1985L16.5991 18.3503ZM20.4765 15.3482L20.8088 16.4653L21.4374 16.3432L20.7908 17.5643L19.5155 16.7135L20.1361 16.5934L19.7858 15.4663L20.4765 15.3482ZM13.4758 7.36859L11.7461 7.60882L17.896 13.3263L20.1061 6.31158L18.4725 6.59986L17.1753 10.7318L18.4725 6.59985L16.9831 6.84008L16.4546 8.37755L15.0613 7.12836L13.4758 7.36859Z",
    fill: "black"
  }), React.createElement("path", {
    d: "M13.4758 7.36859L15.0613 7.12836L16.4546 8.37755L16.9831 6.84008L18.4725 6.59985L17.1753 10.7318L13.4758 7.36859Z",
    fill: "white",
    fillOpacity: "0.2"
  }));
};
var VuePressIconLight = _ref3 => {
  var props = _extends$Q({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.2229 9.42596L18.7612 7.41624C19.1232 7.36259 19.5031 7.5816 19.611 7.90691L25.212 24.7846C25.3493 25.1988 25.1359 25.6068 24.7331 25.6941L9.57225 28.981C9.12362 29.0783 8.6794 28.7914 8.5819 28.3422L4.63794 10.1619C4.56247 9.81393 4.82492 9.48502 5.2229 9.42596Z",
    fill: "white",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.3076 9.24439L18.8459 7.23468C19.2079 7.18103 19.5878 7.40003 19.6957 7.72535L25.2967 24.6031C25.4342 25.0173 25.2206 25.4252 24.8178 25.5125L9.65695 28.7995C9.20832 28.8968 8.76409 28.6099 8.6666 28.1606L4.72244 9.9805C4.64696 9.63236 4.90942 9.30365 5.3076 9.24439Z",
    fill: "white",
    fillOpacity: "0.1"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.5981 7.0178L20.1364 5.00808C20.4984 4.95443 20.8783 5.17344 20.9862 5.49875L26.5872 22.3765C26.7247 22.7907 26.5111 23.1986 26.1083 23.2859L10.9474 26.5729C10.4988 26.6702 10.0546 26.3833 9.9571 25.9341L6.01294 7.7539C5.93747 7.40577 6.19992 7.07706 6.5981 7.0178Z",
    fill: "white",
    fillOpacity: "0.2"
  }), React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M21.3599 3.1888L8.03538 5.09662C7.64521 5.15248 7.40058 5.47398 7.49066 5.81571L12.047 23.1657C12.1563 23.5821 12.5915 23.8501 13.0178 23.763L27.5034 20.8028C27.8906 20.7237 28.0919 20.3436 27.9548 19.9548L22.2125 3.67887C22.0988 3.35656 21.7177 3.13755 21.3599 3.1888ZM21.1849 14.5429L15.3147 15.6307C15.2176 15.6487 15.157 15.7462 15.1836 15.8411L16.0849 19.0441C16.1087 19.1282 16.1928 19.1801 16.2786 19.1635L22.2329 18.0042C22.3314 17.9849 22.3911 17.8844 22.3611 17.789L21.3757 14.6576C21.3503 14.5767 21.2684 14.5274 21.1849 14.5429ZM15.6947 19.1384L14.8078 15.9094C14.7304 15.6275 14.9121 15.34 15.1996 15.2888L21.1179 14.2366C21.3629 14.1929 21.6021 14.3373 21.678 14.5743L22.6727 17.6841C22.7634 17.9673 22.5865 18.2662 22.2944 18.3231L16.2684 19.4946C16.0136 19.544 15.7636 19.3889 15.6947 19.1384ZM16.5991 18.3503L15.9788 16.1724L16.6452 16.0469L17.5429 16.7267L17.9586 15.8029L18.6451 15.6841L19.2721 17.7894L18.6253 17.9279L18.2623 16.6541L17.8195 17.6572L16.9094 16.9445L17.2658 18.1985L16.5991 18.3503ZM20.4765 15.3482L20.8088 16.4653L21.4374 16.3432L20.7908 17.5643L19.5155 16.7135L20.1361 16.5934L19.7858 15.4663L20.4765 15.3482ZM13.4758 7.36859L11.7461 7.60882L17.896 13.3263L20.1061 6.31158L18.4725 6.59986L17.1753 10.7318L18.4725 6.59985L16.9831 6.84008L16.4546 8.37755L15.0613 7.12836L13.4758 7.36859Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M13.4758 7.36859L15.0613 7.12836L16.4546 8.37755L16.9831 6.84008L18.4725 6.59985L17.1753 10.7318L13.4758 7.36859Z",
    fill: "white",
    fillOpacity: "0.2"
  }));
};

function _extends$R() {
  _extends$R = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$R.apply(this, arguments);
}
var WebAssemblyIcon = _ref => {
  var props = _extends$R({}, _ref);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.1519 28.575H26.9521L26.23 26.0525H22.4193L21.8638 28.575H19.7316L22.4756 17.246H25.8197L29.1519 28.575ZM24.6413 20.0386H23.7501L22.8254 24.1959H25.7041L24.6413 20.0386Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M17.3824 28.575H15.2772L13.7186 20.8636H13.6916L12.0107 28.575H9.86508L7.42377 17.246H9.54269L10.9933 24.9573H11.0203L12.7684 17.246H14.7523L16.3234 25.0526H16.3505L18.005 17.246H20.0835L17.3824 28.575Z",
    fill: "white"
  }), React.createElement("path", {
    d: "M19.6613 0H32V31.9996H0V0H12.3387C12.3363 0.0573061 12.3303 0.113909 12.3303 0.171918C12.3303 2.19873 13.9732 3.84197 16 3.84197C18.0268 3.84197 19.67 2.19873 19.67 0.171918C19.67 0.113909 19.6641 0.0573061 19.6613 0ZM26.9521 28.575H29.1519L25.8197 17.246H22.4756L19.7316 28.575H21.8639L22.4193 26.0525H26.23L26.9521 28.575ZM15.2772 28.575H17.3824L20.0835 17.246H18.005L16.3505 25.0526H16.3234L14.7523 17.246H12.7684L11.0203 24.9573H10.9933L9.54269 17.246H7.42378L9.86508 28.575H12.0107L13.6916 20.8636H13.7187L15.2772 28.575ZM23.7501 20.0386H24.6413L25.7041 24.1959H22.8254L23.7501 20.0386Z",
    fill: "#654FF0"
  }));
};
var WebAssemblyIconDark = _ref2 => {
  var props = _extends$R({}, _ref2);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M31 1H19.4324C19.4333 1.01858 19.4346 1.03709 19.4359 1.05559C19.4383 1.09059 19.4407 1.1256 19.4407 1.16117C19.4407 3.06131 17.9001 4.60185 16 4.60185C14.0999 4.60185 12.5597 3.06131 12.5597 1.16117C12.5597 1.1269 12.5619 1.09316 12.5641 1.05944C12.5654 1.03965 12.5667 1.01987 12.5676 1H1V30.9997H31V1ZM22.0181 25.4242L21.4974 27.7891H19.4984L22.0709 17.1681H25.206L28.3299 27.7891H26.2676L25.5906 25.4242H22.0181ZM19.8283 17.1681L17.296 27.7891H15.3223L13.8612 20.5597H13.8359L12.2601 27.7891H10.2485L7.95978 17.1681H7.95979H9.94628L11.3062 24.3975H11.3316L12.9703 17.1681H14.8303L16.3032 24.4868H16.3286L17.8797 17.1681H19.8283ZM23.2657 19.7862L22.3989 23.6837H25.0976L24.1012 19.7862H23.2657Z",
    fill: "black"
  }));
};
var WebAssemblyIconLight = _ref3 => {
  var props = _extends$R({}, _ref3);

  return React.createElement(SVGIcon, props, React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M31 1H19.4324C19.4333 1.01858 19.4346 1.03709 19.4359 1.05559C19.4383 1.09059 19.4407 1.1256 19.4407 1.16117C19.4407 3.06131 17.9001 4.60185 16 4.60185C14.0999 4.60185 12.5597 3.06131 12.5597 1.16117C12.5597 1.1269 12.5619 1.09316 12.5641 1.05944C12.5654 1.03965 12.5667 1.01987 12.5676 1H1V30.9997H31V1ZM22.0181 25.4242L21.4974 27.7891H19.4984L22.0709 17.1681H25.206L28.3299 27.7891H26.2676L25.5906 25.4242H22.0181ZM19.8283 17.1681L17.296 27.7891H15.3223L13.8612 20.5597H13.8359L12.2601 27.7891H10.2485L7.95978 17.1681H7.95979H9.94628L11.3062 24.3975H11.3316L12.9703 17.1681H14.8303L16.3032 24.4868H16.3286L17.8797 17.1681H19.8283ZM23.2657 19.7862L22.3989 23.6837H25.0976L24.1012 19.7862H23.2657Z",
    fill: "white"
  }));
};

var ColorIcons = {
  AdonisIcon,
  AngularIcon,
  ApolloIcon,
  AureliaIcon,
  CordovaIcon,
  CxJSIcon,
  CycleJSIcon,
  D3Icon,
  DocusaurusIcon,
  DoczIcon,
  DojoIcon,
  ElmIcon,
  EmberIcon,
  ExpoIcon,
  ExpressIcon,
  FeathersIcon,
  GatsbyIcon,
  GlimmerIcon,
  GridsomeIcon,
  HapiIcon,
  HTML5Icon,
  HyperappIcon,
  InfernoIcon,
  JavaScriptIcon,
  MarionetteIcon,
  MarkoIcon,
  MDXDeckIcon,
  MeteorIcon,
  NaviIcon,
  NestIcon,
  NextIcon,
  NodeIcon,
  NuxtIcon,
  ParcelIcon,
  PolymerIcon,
  PreactIcon,
  PrismaIcon,
  QuasarIcon,
  RazzleIcon,
  ReactIcon,
  ReasonIcon,
  RollupIcon,
  SapperIcon,
  ServerlessIcon,
  StackbitIcon,
  StorybookIcon,
  StyleguidistIcon,
  SvelteIcon,
  TypeScriptIcon,
  UnibitIcon,
  VueIcon,
  VuePressIcon,
  WebAssemblyIcon
};
var DarkIcons = {
  AdonisIconDark,
  AngularIconDark,
  ApolloIconDark,
  AureliaIconDark,
  CordovaIconDark,
  CxJSIconDark,
  CycleJSIconDark,
  D3IconDark,
  DocusaurusIconDark,
  DoczIconDark,
  DojoIconDark,
  ElmIconDark,
  EmberIconDark,
  ExpoIconDark,
  ExpressIconDark,
  FeathersIconDark,
  GatsbyIconDark,
  GlimmerIconDark,
  GridsomeIconDark,
  HapiIconDark,
  HTML5IconDark,
  HyperappIconDark,
  InfernoIconDark,
  JavaScriptIconDark,
  MarionetteIconDark,
  MarkoIconDark,
  MDXDeckIconDark,
  MeteorIconDark,
  NaviIconDark,
  NestIconDark,
  NextIconDark,
  NodeIconDark,
  NuxtIconDark,
  ParcelIconDark,
  PolymerIconDark,
  PreactIconDark,
  PrismaIconDark,
  QuasarIconDark,
  RazzleIconDark,
  ReactIconDark,
  ReasonIconDark,
  RollupIconDark,
  SapperIconDark,
  ServerlessIconDark,
  StackbitIconDark,
  StorybookIconDark,
  StyleguidistIconDark,
  SvelteIconDark,
  TypeScriptIconDark,
  UnibitIconDark,
  VueIconDark,
  VuePressIconDark,
  WebAssemblyIconDark
};
var LightIcons = {
  AdonisIconLight,
  AngularIconLight,
  ApolloIconLight,
  AureliaIconLight,
  CordovaIconLight,
  CxJSIconLight,
  CycleJSIconLight,
  D3IconLight,
  DocusaurusIconLight,
  DoczIconLight,
  DojoIconLight,
  ElmIconLight,
  EmberIconLight,
  ExpoIconLight,
  ExpressIconLight,
  FeathersIconLight,
  GatsbyIconLight,
  GlimmerIconLight,
  GridsomeIconLight,
  HapiIconLight,
  HTML5IconLight,
  HyperappIconLight,
  InfernoIconLight,
  JavaScriptIconLight,
  MarionetteIconLight,
  MarkoIconLight,
  MDXDeckIconLight,
  MeteorIconLight,
  NaviIconLight,
  NestIconLight,
  NextIconLight,
  NodeIconLight,
  NuxtIconLight,
  ParcelIconLight,
  PolymerIconLight,
  PreactIconLight,
  PrismaIconLight,
  QuasarIconLight,
  RazzleIconLight,
  ReactIconLight,
  ReasonIconLight,
  RollupIconLight,
  SapperIconLight,
  ServerlessIconLight,
  StackbitIconLight,
  StorybookIconLight,
  StyleguidistIconLight,
  SvelteIconLight,
  TypeScriptIconLight,
  UnibitIconLight,
  VueIconLight,
  VuePressIconLight,
  WebAssemblyIconLight
};
var Icons = {
  AdonisIcon,
  AngularIcon,
  ApolloIcon,
  AureliaIcon,
  CordovaIcon,
  CxJSIcon,
  CycleJSIcon,
  D3Icon,
  DocusaurusIcon,
  DoczIcon,
  DojoIcon,
  ElmIcon,
  EmberIcon,
  ExpoIcon,
  ExpressIcon,
  FeathersIcon,
  GatsbyIcon,
  GlimmerIcon,
  GridsomeIcon,
  HapiIcon,
  HTML5Icon,
  HyperappIcon,
  InfernoIcon,
  JavaScriptIcon,
  MarionetteIcon,
  MarkoIcon,
  MDXDeckIcon,
  MeteorIcon,
  NaviIcon,
  NestIcon,
  NextIcon,
  NodeIcon,
  NuxtIcon,
  ParcelIcon,
  PolymerIcon,
  PreactIcon,
  PrismaIcon,
  QuasarIcon,
  RazzleIcon,
  ReactIcon,
  ReasonIcon,
  RollupIcon,
  SapperIcon,
  ServerlessIcon,
  StackbitIcon,
  StorybookIcon,
  StyleguidistIcon,
  SvelteIcon,
  TypeScriptIcon,
  UnibitIcon,
  VueIcon,
  VuePressIcon,
  WebAssemblyIcon,
  AdonisIconDark,
  AngularIconDark,
  ApolloIconDark,
  AureliaIconDark,
  CordovaIconDark,
  CxJSIconDark,
  CycleJSIconDark,
  D3IconDark,
  DocusaurusIconDark,
  DoczIconDark,
  DojoIconDark,
  ElmIconDark,
  EmberIconDark,
  ExpoIconDark,
  ExpressIconDark,
  FeathersIconDark,
  GatsbyIconDark,
  GlimmerIconDark,
  GridsomeIconDark,
  HapiIconDark,
  HTML5IconDark,
  HyperappIconDark,
  InfernoIconDark,
  JavaScriptIconDark,
  MarionetteIconDark,
  MarkoIconDark,
  MDXDeckIconDark,
  MeteorIconDark,
  NaviIconDark,
  NestIconDark,
  NextIconDark,
  NodeIconDark,
  NuxtIconDark,
  ParcelIconDark,
  PolymerIconDark,
  PreactIconDark,
  PrismaIconDark,
  QuasarIconDark,
  RazzleIconDark,
  ReactIconDark,
  ReasonIconDark,
  RollupIconDark,
  SapperIconDark,
  ServerlessIconDark,
  StackbitIconDark,
  StorybookIconDark,
  StyleguidistIconDark,
  SvelteIconDark,
  TypeScriptIconDark,
  UnibitIconDark,
  VueIconDark,
  VuePressIconDark,
  WebAssemblyIconDark,
  AdonisIconLight,
  AngularIconLight,
  ApolloIconLight,
  AureliaIconLight,
  CordovaIconLight,
  CxJSIconLight,
  CycleJSIconLight,
  D3IconLight,
  DocusaurusIconLight,
  DoczIconLight,
  DojoIconLight,
  ElmIconLight,
  EmberIconLight,
  ExpoIconLight,
  ExpressIconLight,
  FeathersIconLight,
  GatsbyIconLight,
  GlimmerIconLight,
  GridsomeIconLight,
  HapiIconLight,
  HTML5IconLight,
  HyperappIconLight,
  InfernoIconLight,
  JavaScriptIconLight,
  MarionetteIconLight,
  MarkoIconLight,
  MDXDeckIconLight,
  MeteorIconLight,
  NaviIconLight,
  NestIconLight,
  NextIconLight,
  NodeIconLight,
  NuxtIconLight,
  ParcelIconLight,
  PolymerIconLight,
  PreactIconLight,
  PrismaIconLight,
  QuasarIconLight,
  RazzleIconLight,
  ReactIconLight,
  ReasonIconLight,
  RollupIconLight,
  SapperIconLight,
  ServerlessIconLight,
  StackbitIconLight,
  StorybookIconLight,
  StyleguidistIconLight,
  SvelteIconLight,
  TypeScriptIconLight,
  UnibitIconLight,
  VueIconLight,
  VuePressIconLight,
  WebAssemblyIconLight
};

export { AdonisIcon, AdonisIconDark, AdonisIconLight, AngularIcon, AngularIconDark, AngularIconLight, ApolloIcon, ApolloIconDark, ApolloIconLight, AureliaIcon, AureliaIconDark, AureliaIconLight, ColorIcons, CordovaIcon, CordovaIconDark, CordovaIconLight, CxJSIcon, CxJSIconDark, CxJSIconLight, CycleJSIcon, CycleJSIconDark, CycleJSIconLight, D3Icon, D3IconDark, D3IconLight, DarkIcons, DocusaurusIcon, DocusaurusIconDark, DocusaurusIconLight, DoczIcon, DoczIconDark, DoczIconLight, DojoIcon, DojoIconDark, DojoIconLight, ElmIcon, ElmIconDark, ElmIconLight, EmberIcon, EmberIconDark, EmberIconLight, ExpoIcon, ExpoIconDark, ExpoIconLight, ExpressIcon, ExpressIconDark, ExpressIconLight, FeathersIcon, FeathersIconDark, FeathersIconLight, GatsbyIcon, GatsbyIconDark, GatsbyIconLight, GlimmerIcon, GlimmerIconDark, GlimmerIconLight, GridsomeIcon, GridsomeIconDark, GridsomeIconLight, HTML5Icon, HTML5IconDark, HTML5IconLight, HapiIcon, HapiIconDark, HapiIconLight, HyperappIcon, HyperappIconDark, HyperappIconLight, Icons, InfernoIcon, InfernoIconDark, InfernoIconLight, JavaScriptIcon, JavaScriptIconDark, JavaScriptIconLight, LightIcons, MDXDeckIcon, MDXDeckIconDark, MDXDeckIconLight, MarionetteIcon, MarionetteIconDark, MarionetteIconLight, MarkoIcon, MarkoIconDark, MarkoIconLight, MeteorIcon, MeteorIconDark, MeteorIconLight, NaviIcon, NaviIconDark, NaviIconLight, NestIcon, NestIconDark, NestIconLight, NextIcon, NextIconDark, NextIconLight, NodeIcon, NodeIconDark, NodeIconLight, NuxtIcon, NuxtIconDark, NuxtIconLight, ParcelIcon, ParcelIconDark, ParcelIconLight, PolymerIcon, PolymerIconDark, PolymerIconLight, PreactIcon, PreactIconDark, PreactIconLight, PrismaIcon, PrismaIconDark, PrismaIconLight, QuasarIcon, QuasarIconDark, QuasarIconLight, RazzleIcon, RazzleIconDark, RazzleIconLight, ReactIcon, ReactIconDark, ReactIconLight, ReasonIcon, ReasonIconDark, ReasonIconLight, RollupIcon, RollupIconDark, RollupIconLight, SapperIcon, SapperIconDark, SapperIconLight, ServerlessIcon, ServerlessIconDark, ServerlessIconLight, StackbitIcon, StackbitIconDark, StackbitIconLight, StorybookIcon, StorybookIconDark, StorybookIconLight, StyleguidistIcon, StyleguidistIconDark, StyleguidistIconLight, SvelteIcon, SvelteIconDark, SvelteIconLight, TypeScriptIcon, TypeScriptIconDark, TypeScriptIconLight, UnibitIcon, UnibitIconDark, UnibitIconLight, VueIcon, VueIconDark, VueIconLight, VuePressIcon, VuePressIconDark, VuePressIconLight, WebAssemblyIcon, WebAssemblyIconDark, WebAssemblyIconLight };
