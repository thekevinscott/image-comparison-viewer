import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';

type PositionGetter<T extends Event> = (e: T) => [number, number];
type Action<T extends Event> = (x: number, y:number, e: T) => void;
const getMouse: PositionGetter<MouseEvent> = (e) => [e.clientX, e.clientY];
const getTouch: PositionGetter<TouchEvent> = (e) => [e.touches[0].clientX, e.touches[0].clientY];

export class InteractiveElement extends LitElement {
  @state()
  canMove = true;

  @state()
  active = false;

  @state()
  x = 0

  @state()
  y = 0

  @state()
  startingPosition = { x: 0, y: 0 };

  @state()
  preventDefault = false;

  private buildListener<T extends Event>(positionGetter: PositionGetter<T>, action: Action<T>) {
    return (e: T) => {
      const [x, y] = positionGetter(e);
      action(x, y, e);
    }
  }

  private moveStart: Action<TouchEvent | MouseEvent> = (x, y, e) => {
    if (!e.defaultPrevented) {
      if (this.preventDefault) {
        e.preventDefault();
      }
      this.active = true;
      this.startingPosition = {
        x: x - this.x,
        y: y - this.y,
      }
      this.requestUpdate();
    }
  }

  private handleMouseDown = this.buildListener(getMouse, this.moveStart);
  private handleTouchStart = this.buildListener(getTouch, this.moveStart);

  private move: Action<MouseEvent | TouchEvent> = (x, y, e) => {
    if (this.active && !e.defaultPrevented && this.canMove) {
      if (this.preventDefault) {
        e.preventDefault();
      }
      this.x = x - this.startingPosition.x;
      this.y = y - this.startingPosition.y;
      this.requestUpdate();
    }
  }

  private handleMouseMove = this.buildListener(getMouse, this.move);
  private handleTouchMove = this.buildListener(getTouch, this.move);

  private end = () => {
    this.active = false;
    this.requestUpdate();
  }

  protected setupListeners(host: LitElement | HTMLDivElement) {
    host.addEventListener('mousedown', e => this.handleMouseDown(e as MouseEvent));
    host.addEventListener('touchstart', e => this.handleTouchStart(e as TouchEvent), { passive: true });

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove, { passive: true });

    window.addEventListener('mouseup', this.end);
    window.addEventListener('touchend', this.end, { passive: true });
  }

  disconnectedCallback(): void {
    this.removeEventListener('mousedown', this.handleMouseDown);
    this.removeEventListener('touchstart', this.handleTouchStart);

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchmove', this.handleTouchMove);

    window.removeEventListener('mouseup', this.end);
    window.removeEventListener('touchend', this.end);
  }
}
