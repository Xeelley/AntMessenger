"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GENERIC_ELEMENT_TEXT_COMPONENT_LENGTH_LIMIT = 80;
function QuickReply(title, payload, content_type, image_url) {
    if (content_type === void 0) { content_type = 'text'; }
    var res = {
        title: title,
        payload: payload || title,
        content_type: content_type,
    };
    if (image_url)
        res.image_url = image_url;
    return res;
}
exports.QuickReply = QuickReply;
function Button(title, payload, type, url) {
    if (type === void 0) { type = 'postback'; }
    if (type === 'postback') {
        return {
            title: title,
            payload: payload || title,
            type: type,
        };
    }
    if (type === 'web_url') {
        return {
            title: title,
            type: type,
            url: url,
        };
    }
}
exports.Button = Button;
function ExtentionButton(title, url, webview_height_ratio) {
    if (webview_height_ratio === void 0) { webview_height_ratio = 'tall'; }
    return {
        type: 'web_url',
        url: url,
        title: title,
        messenger_extensions: true,
        webview_height_ratio: webview_height_ratio,
    };
}
exports.ExtentionButton = ExtentionButton;
function ButtonTemplate(text, buttons) {
    return {
        template_type: 'button',
        text: text,
        buttons: buttons,
    };
}
exports.ButtonTemplate = ButtonTemplate;
function DefaultAction(url, type, webview_height_ratio) {
    if (type === void 0) { type = 'web_url'; }
    if (webview_height_ratio === void 0) { webview_height_ratio = 'tall'; }
    return {
        url: url,
        type: type,
        webview_height_ratio: webview_height_ratio,
    };
}
exports.DefaultAction = DefaultAction;
function GenericElement(title, image_url, subtitle, default_action, buttons) {
    title = title.length > GENERIC_ELEMENT_TEXT_COMPONENT_LENGTH_LIMIT
        ? title.slice(0, GENERIC_ELEMENT_TEXT_COMPONENT_LENGTH_LIMIT - 3) + '...'
        : title;
    subtitle = subtitle.length > GENERIC_ELEMENT_TEXT_COMPONENT_LENGTH_LIMIT
        ? subtitle.slice(0, GENERIC_ELEMENT_TEXT_COMPONENT_LENGTH_LIMIT - 3) + '...'
        : subtitle;
    return {
        title: title,
        image_url: image_url,
        subtitle: subtitle,
        default_action: default_action,
        buttons: buttons,
    };
}
exports.GenericElement = GenericElement;
function GenericTemplate(elements) {
    return {
        template_type: "generic",
        elements: elements,
    };
}
exports.GenericTemplate = GenericTemplate;
