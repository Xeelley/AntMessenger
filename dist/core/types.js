"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GENERIC_ELEMENT_TEXT_COMPONENT_LENGTH_LIMIT = 80;
function QuickReply(title, payload, content_type = 'text', image_url) {
    const res = {
        title,
        payload: payload || title,
        content_type,
    };
    if (image_url)
        res.image_url = image_url;
    return res;
}
exports.QuickReply = QuickReply;
function Button(title, payload, type = 'postback', url) {
    if (type === 'postback') {
        return {
            title,
            payload: payload || title,
            type,
        };
    }
    if (type === 'web_url') {
        return {
            title,
            type,
            url,
        };
    }
}
exports.Button = Button;
function ExtentionButton(title, url, webview_height_ratio = 'tall') {
    return {
        type: 'web_url',
        url,
        title,
        messenger_extensions: true,
        webview_height_ratio,
    };
}
exports.ExtentionButton = ExtentionButton;
function ButtonTemplate(text, buttons) {
    return {
        template_type: 'button',
        text,
        buttons,
    };
}
exports.ButtonTemplate = ButtonTemplate;
function DefaultAction(url, type = 'web_url', webview_height_ratio = 'tall') {
    return {
        url,
        type,
        webview_height_ratio,
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
        title,
        image_url,
        subtitle,
        default_action,
        buttons,
    };
}
exports.GenericElement = GenericElement;
function GenericTemplate(elements) {
    return {
        template_type: "generic",
        elements,
    };
}
exports.GenericTemplate = GenericTemplate;
