const GENERIC_ELEMENT_TEXT_COMPONENT_LENGTH_LIMIT = 80;


export interface IQuickReply {
    title: string;
    payload?: string;
    content_type?: string;
    image_url?: string;
}

export interface IButton {
    title: string;
    payload?: string;
    type?: string;
    url?: string;
}

export interface IExtentionButton {
    title: string;
    url: string;
    type: string;
    webview_height_ratio: string;
    messenger_extensions: boolean;
}

export interface IButtonTemplate {
    template_type: string;
    text: string;
    buttons: IButton[];
}

export interface IDefaultAction {
    url: string;
    type: string;
    webview_height_ratio: string;
}

export interface IGenericElement {
    title: string;
    image_url: string;
    subtitle: string;
    default_action: IDefaultAction;
    buttons: IButton[];
}

export interface IGenericTemplate {
    template_type: string;
    elements: IGenericElement[];
}

type ButtonType = 'postback' | 'web_url';
type QuickReplyType = 'text' | 'location';


export function QuickReply(title: string, payload?: string, content_type: QuickReplyType = 'text', 
image_url?: string): IQuickReply {
    const res: IQuickReply = {
        title,
        payload: payload || title,
        content_type,
    };
    if (image_url) res.image_url = image_url;
    return res;
}

export function Button(title: string, payload?: string, type: ButtonType = 'postback', url?: string): IButton {
    if (type === 'postback') {
        return {
            title,
            payload: payload || title,
            type,
        }
    }
    if (type === 'web_url') {
        return {
            title,
            type,
            url,
        }
    }
}

export function ExtentionButton(title: string, url: string, webview_height_ratio: string = 'tall'): IExtentionButton {
    return {
        type: 'web_url',
        url,
        title,
        messenger_extensions: true,  
        webview_height_ratio,
    };
}

export function ButtonTemplate(text: string, buttons: IButton[]): IButtonTemplate {
    return {
        template_type: 'button',
        text,
        buttons,
    };
}

export function DefaultAction(url: string, type: string = 'web_url', webview_height_ratio: string = 'tall'): IDefaultAction {
    return {
        url,
        type,
        webview_height_ratio,
    };
}

export function GenericElement(title: string, image_url: string, subtitle: string, 
default_action: IDefaultAction, buttons: IButton[]): IGenericElement {
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
    }
}

export function GenericTemplate(elements: IGenericElement[]): IGenericTemplate {
    return {
        template_type: "generic",
        elements,
    }
}




