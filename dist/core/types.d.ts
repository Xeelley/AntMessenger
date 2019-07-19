export interface ImagePayload {
    url: string;
}
export interface StickerPayload {
    url: string;
    sticker_id: number;
}
export interface AudioPayload {
    url: string;
}
export interface LocationPayload {
    title: string;
    url: string;
    latitude: string;
    longitude: string;
}
export interface QuickReplyPayload {
    payload?: string;
}
