"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.default = {
    tablet: (...args) => styled_components_1.css `
    @media (max-width: 1279px) {
      ${styled_components_1.css.call(undefined, ...args)};
    }
  `,
    phone: (...args) => styled_components_1.css `
    @media (max-width: 660px) {
      ${styled_components_1.css.call(undefined, ...args)};
    }
  `,
    fromTablet: (...args) => styled_components_1.css `
    @media (min-width: 660px) {
      ${styled_components_1.css.call(undefined, ...args)};
    }
  `,
    fromDesktop: (...args) => styled_components_1.css `
    @media (min-width: 1280px) {
      ${styled_components_1.css.call(undefined, ...args)};
    }
  `,
};
