import { LitElement, PropertyValueMap } from 'lit';
import { Ref } from 'lit/directives/ref.js';
declare type DraggerChangeEventDetail = {
    x: number;
};
export declare class DraggerChangeEvent extends Event {
    detail: DraggerChangeEventDetail;
    constructor(x: number);
}
export declare class ImageComparisonViewerDraggerHandle extends LitElement {
    static styles: import("lit").CSSResult;
    private mouse;
    draggerRef: Ref<HTMLDivElement>;
    value: number;
    x: number;
    getWidth(): number;
    updateMouse(value: number): void;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    updated(changedProperties: Map<string, any>): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'image-comparison-viewer-dragger-handle': ImageComparisonViewerDraggerHandle;
    }
}
export {};
