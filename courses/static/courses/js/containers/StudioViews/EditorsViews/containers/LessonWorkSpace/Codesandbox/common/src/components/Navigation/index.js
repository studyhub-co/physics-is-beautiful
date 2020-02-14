"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importStar(require("styled-components"));
const Logo_1 = __importDefault(require("../Logo"));
const MaxWidth_1 = __importDefault(require("../flex/MaxWidth"));
const media_1 = __importDefault(require("../../utils/media"));
const analytics_1 = __importDefault(require("../../utils/analytics"));
const Container = styled_components_1.default.div `
  display: flex;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
  color: white;
  z-index: 5;
`;
const Left = styled_components_1.default.div `
  display: flex;
  align-items: center;
  flex: auto;
`;
const StyledLogo = styled_components_1.default(Logo_1.default) `
  color: white;
  ${media_1.default.phone `
    width: 38px;
    height: 38px;
  `};
`;
const Item = styled_components_1.default.a `
  display: inline-flex;
  align-items: center;
  transition: 0.2s ease color;
  font-size: 1.125rem;
  text-decoration: none;
  color: white;

  margin: 0 1rem;
  font-weight: 400;

  &:hover {
    color: ${props => props.theme.secondary};
  }

  ${props => props.button &&
    styled_components_1.css `
      transition: 0.3s ease all;
      padding: 0.2rem 0.8rem;
      border-radius: 4px;
      font-weight: 600;
      background-color: ${props.theme.secondary};
      border: 2px solid rgba(255, 255, 255, 0.3);

      &:hover {
        color: white;
        background-color: #7fc3f7;
        border-color: transparent;
      }
    `};

  ${media_1.default.phone `
    font-size: 1rem;
    margin: 0 .5rem;
  `};

  ${props => props.hidePhone &&
    styled_components_1.css `
      ${media_1.default.phone `
      display: none;
    `};
    `};

  ${props => props.hideOn &&
    styled_components_1.css `
      @media (max-width: ${props.hideOn}px) {
        display: none;
      }
    `};
`;
const Right = styled_components_1.default.div `
  display: flex;
  align-items: center;
`;
const Image = styled_components_1.default.img `
  width: 1.75em;
  height: 1.75em;
  border-radius: 4px;
  margin-left: 0.75rem;
  margin-bottom: 0;
`;
const Ul = styled_components_1.default.ul `
  list-style: none;
  margin: 0;
  display: flex;
  align-items: center;
  flex: auto;
`;
const Li = styled_components_1.default.li `
  margin: 0;
`;
class Navigation extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            user: null,
        };
        this.fetchCurrentUser = () => {
            const jwt = JSON.parse(localStorage.getItem('jwt'));
            const BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
            window
                .fetch(BASE + '/api/v1/users/current', {
                headers: { Authorization: `Bearer ${jwt}` },
            })
                .then(x => x.json())
                .then(({ data }) => this.setState({ user: data }))
                .catch(() => {
                /* do nothing */
            });
        };
    }
    componentDidMount() {
        if (localStorage.getItem('jwt')) {
            this.fetchCurrentUser();
        }
    }
    render() {
        const { user } = this.state;
        return (react_1.default.createElement(MaxWidth_1.default, { width: 1440 },
            react_1.default.createElement(Container, { as: "nav", "aria-label": "main" },
                react_1.default.createElement(Left, null,
                    react_1.default.createElement("a", { href: "/" },
                        react_1.default.createElement(StyledLogo, { width: 40, height: 40, style: { marginRight: '1rem' } })),
                    react_1.default.createElement(Ul, null,
                        react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { href: "/explore" }, "Explore")),
                        react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { href: "/search" }, "Search")),
                        react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { href: "/docs" }, "Docs")),
                        react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { href: "/blog" }, "Blog")),
                        react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { href: "https://github.com/codesandbox/codesandbox-client", target: "_blank", rel: "noopener noreferrer", hideOn: 970 }, "GitHub")),
                        react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { href: "/jobs" }, "Careers")))),
                react_1.default.createElement(Right, null,
                    react_1.default.createElement(Ul, null,
                        !user && (react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { hideOn: 875, href: "/signin" }, "Sign In"))),
                        react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { onClick: () => {
                                    analytics_1.default('Navigation - Create Sandbox Clicked');
                                }, hidePhone: true, href: "/s", rel: "noopener noreferrer", button: !user }, "Create Sandbox")),
                        user && (react_1.default.createElement(Li, null,
                            react_1.default.createElement(Item, { hidePhone: true, href: "/dashboard", rel: "noopener noreferrer" },
                                user.username,
                                react_1.default.createElement(Image, { alt: user.username, src: user.avatar_url })))))))));
    }
}
exports.default = Navigation;
