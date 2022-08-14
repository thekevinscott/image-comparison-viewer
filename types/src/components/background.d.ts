import { LitElement } from 'lit';
export declare type Background = 'striped' | 'checkered';
export declare class ImageComparisonViewerBackground extends LitElement {
    static styles: import("lit").CSSResult;
    background: Background;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'image-comparison-viewer-background': ImageComparisonViewerBackground;
    }
}
