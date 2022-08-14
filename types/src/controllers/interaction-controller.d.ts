import { LitElement } from 'lit';
export declare class InteractionController {
    private host;
    active: boolean;
    x: number;
    y: number;
    startingPosition: {
        x: number;
        y: number;
    };
    constructor(host: LitElement, startingPosition?: {
        x: number;
        y: number;
    });
    private handleMouseDown;
    private handleTouchStart;
    private imageMoveStart;
    private end;
    private handleTouchMove;
    private handleMouseMove;
    private imageMove;
    hostConnected(): void;
    hostDisconnected(): void;
}
