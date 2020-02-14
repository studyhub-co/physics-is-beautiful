"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WindowOrientation;
(function (WindowOrientation) {
    WindowOrientation["VERTICAL"] = "vertical";
    WindowOrientation["HORIZONTAL"] = "horizontal";
})(WindowOrientation = exports.WindowOrientation || (exports.WindowOrientation = {}));
var ServerStatus;
(function (ServerStatus) {
    ServerStatus["INITIALIZING"] = "initializing";
    ServerStatus["CONNECTED"] = "connected";
    ServerStatus["DISCONNECTED"] = "disconnected";
})(ServerStatus = exports.ServerStatus || (exports.ServerStatus = {}));
var ServerContainerStatus;
(function (ServerContainerStatus) {
    ServerContainerStatus["INITIALIZING"] = "initializing";
    ServerContainerStatus["CONTAINER_STARTED"] = "container-started";
    ServerContainerStatus["SANDBOX_STARTED"] = "sandbox-started";
    ServerContainerStatus["STOPPED"] = "stopped";
    ServerContainerStatus["HIBERNATED"] = "hibernated";
    ServerContainerStatus["ERROR"] = "error";
})(ServerContainerStatus = exports.ServerContainerStatus || (exports.ServerContainerStatus = {}));
var ZeitDeploymentState;
(function (ZeitDeploymentState) {
    ZeitDeploymentState["DEPLOYING"] = "DEPLOYING";
    ZeitDeploymentState["INITIALIZING"] = "INITIALIZING";
    ZeitDeploymentState["DEPLOYMENT_ERROR"] = "DEPLOYMENT_ERROR";
    ZeitDeploymentState["BOOTED"] = "BOOTED";
    ZeitDeploymentState["BUILDING"] = "BUILDING";
    ZeitDeploymentState["READY"] = "READY";
    ZeitDeploymentState["BUILD_ERROR"] = "BUILD_ERROR";
    ZeitDeploymentState["FROZEN"] = "FROZEN";
    ZeitDeploymentState["ERROR"] = "ERROR";
})(ZeitDeploymentState = exports.ZeitDeploymentState || (exports.ZeitDeploymentState = {}));
var ZeitDeploymentType;
(function (ZeitDeploymentType) {
    ZeitDeploymentType[ZeitDeploymentType["NPM"] = 0] = "NPM";
    ZeitDeploymentType[ZeitDeploymentType["DOCKER"] = 1] = "DOCKER";
    ZeitDeploymentType[ZeitDeploymentType["STATIC"] = 2] = "STATIC";
    ZeitDeploymentType[ZeitDeploymentType["LAMBDAS"] = 3] = "LAMBDAS";
})(ZeitDeploymentType = exports.ZeitDeploymentType || (exports.ZeitDeploymentType = {}));
var TabType;
(function (TabType) {
    TabType["MODULE"] = "MODULE";
    TabType["DIFF"] = "DIFF";
})(TabType = exports.TabType || (exports.TabType = {}));
var LiveMessageEvent;
(function (LiveMessageEvent) {
    LiveMessageEvent["JOIN"] = "join";
    LiveMessageEvent["MODULE_STATE"] = "module_state";
    LiveMessageEvent["USER_ENTERED"] = "user:entered";
    LiveMessageEvent["USER_LEFT"] = "user:left";
    LiveMessageEvent["MODULE_SAVED"] = "module:saved";
    LiveMessageEvent["MODULE_CREATED"] = "module:created";
    LiveMessageEvent["MODULE_MASS_CREATED"] = "module:mass-created";
    LiveMessageEvent["MODULE_UPDATED"] = "module:updated";
    LiveMessageEvent["MODULE_DELETED"] = "module:deleted";
    LiveMessageEvent["DIRECTORY_CREATED"] = "directory:created";
    LiveMessageEvent["DIRECTORY_UPDATED"] = "directory:updated";
    LiveMessageEvent["DIRECTORY_DELETED"] = "directory:deleted";
    LiveMessageEvent["USER_SELECTION"] = "user:selection";
    LiveMessageEvent["USER_CURRENT_MODULE"] = "user:current-module";
    LiveMessageEvent["LIVE_MODE"] = "live:mode";
    LiveMessageEvent["LIVE_CHAT_ENABLED"] = "live:chat_enabled";
    LiveMessageEvent["LIVE_ADD_EDITOR"] = "live:add-editor";
    LiveMessageEvent["LIVE_REMOVE_EDITOR"] = "live:remove-editor";
    LiveMessageEvent["OPERATION"] = "operation";
    LiveMessageEvent["CONNECTION_LOSS"] = "connection-loss";
    LiveMessageEvent["DISCONNECT"] = "disconnect";
    LiveMessageEvent["OWNER_LEFT"] = "owner_left";
    LiveMessageEvent["CHAT"] = "chat";
    LiveMessageEvent["NOTIFICATION"] = "notification";
})(LiveMessageEvent = exports.LiveMessageEvent || (exports.LiveMessageEvent = {}));
var StripeErrorCode;
(function (StripeErrorCode) {
    StripeErrorCode["REQUIRES_ACTION"] = "requires_action";
})(StripeErrorCode = exports.StripeErrorCode || (exports.StripeErrorCode = {}));
var PatronBadge;
(function (PatronBadge) {
    PatronBadge["ONE"] = "patron-1";
    PatronBadge["TWO"] = "patron-2";
    PatronBadge["THREE"] = "patron-3";
    PatronBadge["FOURTH"] = "patron-4";
})(PatronBadge = exports.PatronBadge || (exports.PatronBadge = {}));
