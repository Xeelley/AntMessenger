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
declare type ButtonType = 'postback' | 'web_url';
declare type QuickReplyType = 'text' | 'location';
export declare function QuickReply(title: string, payload?: string, content_type?: QuickReplyType, image_url?: string): IQuickReply;
export declare function Button(title: string, payload?: string, type?: ButtonType, url?: string): IButton;
export declare function ExtentionButton(title: string, url: string, webview_height_ratio?: string): IExtentionButton;
export declare function ButtonTemplate(text: string, buttons: IButton[]): IButtonTemplate;
export declare function DefaultAction(url: string, type?: string, webview_height_ratio?: string): IDefaultAction;
export declare function GenericElement(title: string, image_url: string, subtitle: string, default_action: IDefaultAction, buttons: IButton[]): IGenericElement;
export declare function GenericTemplate(elements: IGenericElement[]): IGenericTemplate;
export {};
