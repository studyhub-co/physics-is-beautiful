"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Fullscreen_1 = __importDefault(require("../flex/Fullscreen"));
const Centered_1 = __importDefault(require("../flex/Centered"));
const theme_1 = __importDefault(require("../../theme"));
// import playSVG from './play.svg';
const RunOnClick = ({ onClick }) => (react_1.default.createElement(Fullscreen_1.default, { style: { backgroundColor: theme_1.default.primary(), cursor: 'pointer' }, onClick: onClick },
    react_1.default.createElement(Centered_1.default, { horizontal: true, vertical: true },
        react_1.default.createElement("img", { width: 170, height: 170, src: playSVG, alt: "Run Sandbox" }),
        react_1.default.createElement("div", { style: {
                color: theme_1.default.red(),
                fontSize: '2rem',
                fontWeight: 700,
                marginTop: 24,
                textTransform: 'uppercase',
            } }, "Click to run"))));
exports.default = RunOnClick;
