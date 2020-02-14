"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notifications_1 = require("@codesandbox/notifications");
exports.notificationState = new notifications_1.NotificationState();
function convertTypeToStatus(type) {
    switch (type) {
        case 'notice':
            return notifications_1.NotificationStatus.NOTICE;
        case 'warning':
            return notifications_1.NotificationStatus.WARNING;
        case 'error':
            return notifications_1.NotificationStatus.ERROR;
        case 'success':
            return notifications_1.NotificationStatus.SUCCESS;
        default:
            return notifications_1.NotificationStatus.NOTICE;
    }
}
exports.convertTypeToStatus = convertTypeToStatus;
