"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const MaxWidth_1 = __importDefault(require("./flex/MaxWidth"));
const media_1 = __importDefault(require("../utils/media"));
const Container = styled_components_1.default.div `
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 3rem;
  flex-wrap: wrap;
`;
const Column = styled_components_1.default.div `
  width: calc(33% - 2rem);
  margin: 0 1rem;

  ${media_1.default.phone `
    width: 100%;
    margin-bottom: 1rem;
  `};
`;
const Title = styled_components_1.default.h5 `
  font-size: 1.125rem;
  font-weight: 400;
  margin: 0;
  margin-bottom: 1rem;

  color: ${({ theme }) => theme.secondary};
`;
const List = styled_components_1.default.ul `
  color: rgba(255, 255, 255, 0.7);
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    a {
      transition: 0.3s ease color;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.7);

      &:hover {
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
`;
const Background = styled_components_1.default.div `
  position: relative;
  background-color: ${props => props.theme.background2.darken(0.2)};
  padding: 1rem;
  z-index: 5;
`;
exports.default = () => (react_1.default.createElement(Background, { id: "footer" },
    react_1.default.createElement(MaxWidth_1.default, { width: 1280 },
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Container, { as: "footer" },
                react_1.default.createElement(Column, { as: "nav", "aria-labelledby": "codesandbox-footer" },
                    react_1.default.createElement(Title, { id: "codesandbox-footer" }, "CodeSandbox"),
                    react_1.default.createElement(List, null,
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/s", target: "_blank", rel: "noopener noreferrer" }, "Create Sandbox")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/search", target: "_blank", rel: "noopener noreferrer" }, "Search")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/explore", target: "_blank", rel: "noopener noreferrer" }, "Explore")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/docs" }, "Documentation")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/patron", target: "_blank", rel: "noopener noreferrer" }, "Patron")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "https://status.codesandbox.io", target: "_blank", rel: "noopener noreferrer" }, "Status")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/signin", target: "_blank", rel: "noopener noreferrer" }, "Sign In")))),
                react_1.default.createElement(Column, { as: "nav", "aria-labelledby": "about-footer" },
                    react_1.default.createElement(Title, { id: "about-footer" }, "About"),
                    react_1.default.createElement(List, null,
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/blog", target: "_blank", rel: "noopener noreferrer" }, "Blog")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "https://github.com/codesandbox/codesandbox-client", target: "_blank", rel: "noopener noreferrer" }, "GitHub")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/jobs" }, "Careers")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "/legal" }, "Legal")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "mailto:hello@codesandbox.io" }, "Contact Us")))),
                react_1.default.createElement(Column, { as: "nav", "aria-labelledby": "social-footer" },
                    react_1.default.createElement(Title, { id: "social-footer" }, "Social"),
                    react_1.default.createElement(List, null,
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "https://twitter.com/codesandbox", target: "_blank", rel: "noopener noreferrer" }, "Twitter")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { href: "https://spectrum.chat/codesandbox", target: "_blank", rel: "noopener noreferrer" }, "Spectrum")))))))));
