"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import LeftIcon from 'react-icons/lib/fa/angle-left';
// import RightIcon from 'react-icons/lib/fa/angle-right';
// import RefreshIcon from 'react-icons/lib/md/refresh';
const fa_1 = require("react-icons/fa");
const fa_2 = require("react-icons/fa");
const md_1 = require("react-icons/md");
const Switch_1 = __importDefault(require("../../Switch"));
const Tooltip_1 = __importDefault(require("../../Tooltip"));
const AddressBar_1 = __importDefault(require("../AddressBar"));
const ExternalOpen_1 = __importDefault(require("./ExternalOpen"));
const elements_1 = require("./elements");
function Navigator({ url, onChange, onConfirm, onBack, onForward, onRefresh, isProjectView, toggleProjectView, openNewWindow, zenMode, }) {
    return (react_1.default.createElement(elements_1.Container, { className: "flying-container-handler", style: { cursor: 'move' } },
        react_1.default.createElement(elements_1.Icons, null,
            react_1.default.createElement(elements_1.Icon, { "aria-label": "Go Back", disabled: !onBack, onClick: onBack },
                react_1.default.createElement(fa_1.FaAngleLeft, null)),
            react_1.default.createElement(elements_1.Icon, { "aria-label": "Go Forward", disabled: !onForward, onClick: onForward },
                react_1.default.createElement(fa_2.FaAngleRight, null)),
            react_1.default.createElement(elements_1.Icon, { "aria-label": "Refresh", onClick: onRefresh },
                react_1.default.createElement(md_1.MdRefresh, null))),
        react_1.default.createElement(elements_1.AddressBarContainer, { onMouseDown: e => {
                e.stopPropagation();
            } },
            react_1.default.createElement(AddressBar_1.default, { url: url, onChange: onChange, onConfirm: onConfirm })),
        openNewWindow && (react_1.default.createElement(elements_1.Icon, { style: { fontSize: 18, padding: 4, marginRight: zenMode ? 8 : 16 }, onClick: openNewWindow },
            react_1.default.createElement(Tooltip_1.default, { delay: 0, content: "Open In New Window" },
                react_1.default.createElement(ExternalOpen_1.default, null)))),
        !zenMode && toggleProjectView && (react_1.default.createElement(elements_1.SwitchContainer, null,
            react_1.default.createElement(Tooltip_1.default, { delay: 0, content: isProjectView ? 'Project View' : 'Current Module View', placement: "left" },
                react_1.default.createElement(Switch_1.default, { offMode: true, secondary: true, small: true, right: !isProjectView, onClick: toggleProjectView }))))));
}
exports.default = Navigator;
