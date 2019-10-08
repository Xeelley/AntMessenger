"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AntCore_1 = require("./AntCore");
class AntApi extends AntCore_1.AntCore {
    constructor(token, config) {
        super(token, config);
        this.api = {
            sendTextMessage: (id, text) => this._api.sendTextMessage(id, text),
            sendQuickReplyMessage: (id, text, replies) => this._api.sendQuickReplyMessage(id, text, replies),
            sendTemplateMessage: (id, template) => this._api.sendTemplateMessage(id, template),
            sendButtonsMessage: (id, text, buttons) => this._api.sendButtonsMessage(id, text, buttons),
            sendAudioMessage: (id, url) => this._api.sendAudioMessage(id, url),
            sendFileMessage: (id, url) => this._api.sendFileMessage(id, url),
            sendImageMessage: (id, url) => this._api.sendImageMessage(id, url),
            sendVideoMessage: (id, url) => this._api.sendVideoMessage(id, url),
            getUserProfile: (id, fields) => this._api.getUserProfile(id, fields),
            toggleTyping: (id, state) => this._api.toggleTyping(id, state),
            markSeen: (id) => this._api.markSeen(id),
        };
    }
}
exports.AntApi = AntApi;
