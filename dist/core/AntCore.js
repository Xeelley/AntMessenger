"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var FacebookMessanger = require("fb-messenger-bot-api");
var CommandParser_1 = require("../utils/CommandParser");
var AntTypes = require("./types");
var AntCore = (function (_super) {
    __extends(AntCore, _super);
    function AntCore(token, config) {
        var _this = _super.call(this) || this;
        _this.Types = AntTypes;
        _this.botListeners = {};
        _this.commands = {};
        if (!config.getStatus)
            throw new Error('Ant: config.getStatus not provided! This field is mandatory.');
        if (!config.setStatus)
            throw new Error('Ant: config.setStatus not provided! This field is mandatory.');
        config.maskSeparator = config.maskSeparator || ':';
        config.getStartedToken = config.getStartedToken || 'GET_STARTED';
        _this.config = config;
        _this.token = token;
        _this.api = new FacebookMessanger.FacebookMessagingAPIClient(token);
        _this.cilent = new FacebookMessanger.FacebookProfileAPIClient(token);
        _this.cilent.setGetStartedAction(_this.config.getStartedToken).catch(function (err) { return _this.emit('error', err); });
        return _this;
    }
    AntCore.prototype.command = function (command, method) {
        this.commands[command] = method;
    };
    AntCore.prototype.status = function (id, status) {
        return this.config.setStatus(id, status);
    };
    AntCore.prototype.checkStatus = function (id, type, data, extra) {
        var _this = this;
        if (type === 'text_message') {
            var text = data;
            var command = text.indexOf('?') !== -1 ? text.slice(0, text.indexOf('?')) : text;
            if (Object.keys(this.commands).includes(command)) {
                this.commands[command](id, CommandParser_1.CommandParser.parse(text));
                return;
            }
        }
        this.config.getStatus(id).then(function (status) {
            if (!status)
                return;
            _this.botListeners[type] = _this.botListeners[type] || {};
            if (Object.keys(_this.botListeners[type]).includes(status)) {
                return _this.botListeners[type][status](id, data, extra);
            }
            else {
                for (var i in Object.keys(_this.botListeners[type])) {
                    var listener = Object.keys(_this.botListeners[type])[i];
                    if (_this.isMask(listener) && _this.isMatch(status, listener)) {
                        return _this.botListeners[type][listener](id, data, _this.isMatch(status, listener));
                    }
                }
            }
        }).catch(function (err) { return _this.onError(id, err); });
    };
    AntCore.prototype.isMask = function (mask) {
        return mask.split(this.config.maskSeparator).includes('*');
    };
    AntCore.prototype.isMatch = function (status, mask) {
        if (mask === '*')
            return status;
        var statusLevels = status.split(this.config.maskSeparator);
        var maskLevels = mask.split(this.config.maskSeparator);
        var maskMatch;
        if (maskLevels.length !== statusLevels.length) {
            return null;
        }
        for (var i = 0; i < maskLevels.length; i++) {
            if (maskLevels[i] !== '*') {
                if (maskLevels[i] !== statusLevels[i]) {
                    return null;
                }
            }
            else {
                maskMatch = statusLevels[i];
            }
        }
        return maskMatch;
    };
    AntCore.prototype.onError = function (id, err) {
        this.emit('error', Object.assign(err, { sender_id: id }));
    };
    AntCore.prototype.validateServer = function (req, res) {
        FacebookMessanger.ValidateWebhook.validateServer(req, res, this.token);
    };
    AntCore.prototype.parsePayload = function (data) {
        return FacebookMessanger.FacebookMessageParser.parsePayload(data);
    };
    AntCore.prototype.inspect = function (data) {
        var _this = this;
        var payload = this.parsePayload(data);
        if (Array.isArray(payload)) {
            var f_1 = payload[0];
            if (f_1.message && f_1.message.text && !f_1.message.quick_reply) {
                return this.checkStatus(f_1.sender.id, 'text_message', f_1.message.text, f_1);
            }
            if (f_1.message && f_1.message.is_echo) {
                this.checkStatus(f_1.recipient.id, 'echo', f_1);
            }
            if (f_1.message && f_1.message.text && f_1.message.quick_reply) {
                return this.checkStatus(f_1.sender.id, 'quick_reply', f_1.message.text, f_1.message.quick_reply);
            }
            if (f_1.delivery) {
                return this.checkStatus(f_1.sender.id, 'delivery', f_1.delivery);
            }
            if (f_1.postback && f_1.postback.payload && f_1.postback.payload === this.config.getStartedToken) {
                return this.checkStatus(f_1.sender.id, 'text_message', '/start');
            }
            if (f_1.postback) {
                return this.checkStatus(f_1.sender.id, 'postback', f_1.postback.payload);
            }
            if (f_1.message && f_1.message.attachments) {
                var attachments = f_1.message.attachments;
                attachments.forEach(function (attachment) {
                    if (attachment.type === 'image' && attachment.payload.sticker_id) {
                        _this.checkStatus(f_1.sender.id, 'sticker', attachment.payload);
                    }
                    if (attachment.type === 'image' && !attachment.payload.sticker_id) {
                        _this.checkStatus(f_1.sender.id, 'image', attachment.payload);
                    }
                    if (attachment.type === 'audio') {
                        _this.checkStatus(f_1.sender.id, 'audio', attachment.payload);
                    }
                    if (attachment.type === 'location') {
                        _this.checkStatus(f_1.sender.id, 'location', {
                            title: attachment.title,
                            url: attachment.url,
                            latitude: attachment.payload.coordinates.lat,
                            longitude: attachment.payload.coordinates.long,
                        });
                    }
                }, this);
                return;
            }
        }
    };
    return AntCore;
}(events_1.EventEmitter));
exports.AntCore = AntCore;
