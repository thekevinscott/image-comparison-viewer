import { LitElement } from 'lit';

export class InteractionController {
  private host: LitElement;

  active = false
  x = 0
  y = 0
  startingPosition = { x: 0, y: 0 };
  preventDefault = false;

  constructor(host: LitElement, startingPosition = { x: 0, y: 0}, { preventDefault = false }: { preventDefault?: boolean } = {}) {
    this.host = host;
    host.addController(this);
    this.x = startingPosition.x;
    this.y = startingPosition.y;
    this.preventDefault = preventDefault;
  }

  setPosition({ x = 0, y = 0}: { x?: number; y?: number; } = {}) {
    this.x = x;
    this.y = y;
    this.host.requestUpdate();
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.moveStart(e.clientX, e.clientY, e);
  }

  private handleTouchStart = (e: TouchEvent) => {
    this.moveStart(e.touches[0].clientX, e.touches[0].clientY, e);
  }

  private moveStart = (x: number, y: number, e: MouseEvent | TouchEvent) => {
    if (!e.defaultPrevented) {
      if (this.preventDefault) {
        e.preventDefault();
      }
      this.active = true;
      this.startingPosition = {
        x: x - this.x,
        y: y - this.y,
      }
      this.host.requestUpdate();
    }
  }

  private end = () => {
    this.active = false;
    this.host.requestUpdate();
  }

  private handleTouchMove = (e: TouchEvent) => {
    this.move(e.touches[0].clientX, e.touches[0].clientY, e);
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.move(e.clientX, e.clientY, e);
  }

  private move = (x: number, y: number, e: MouseEvent | TouchEvent) => {
    if (this.active && !e.defaultPrevented) {
      if (this.preventDefault) {
        e.preventDefault();
      }
      this.x = x - this.startingPosition.x;
      this.y = y - this.startingPosition.y;
      this.host.requestUpdate();
    }
  }

  hostConnected() {
    this.host.addEventListener('mousedown', this.handleMouseDown);
    this.host.addEventListener('touchstart', this.handleTouchStart);

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);

    window.addEventListener('touchend', this.end);
    window.addEventListener('mouseup', this.end);
  }

  hostDisconnected() {
    this.host.removeEventListener('mousedown', this.handleMouseDown);
    this.host.removeEventListener('touchstart', this.handleTouchStart);

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchmove', this.handleTouchMove);

    window.removeEventListener('mouseup', this.end);
    window.removeEventListener('touchend', this.end);
  }
}
