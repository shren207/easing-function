type Easing = (t: number, b: number, c: number, d: number) => number;
// type Subscription = (x: number) => void;

export class Tween {
  div: HTMLDivElement;
  from: number;
  to: number;
  easing: Easing = (t: number, b: number, c: number, d: number) =>
    (c * t) / d + b;
  duration: number = 1000;
  startTime: number = 0;
  remainingTime: number = 0;
  isPaused: boolean = false;
  x: number = 0;

  constructor(
    div: HTMLDivElement,
    from: number, // startValue of x
    to: number, // endValue of x
    easing: Easing = (t: number, b: number, c: number, d: number) =>
      (c * t) / d + b,
    duration: number = 1000, // ms
    remainingTime: number = 0, // s
    startTime: number = 0 // ms
  ) {
    this.div = div;
    this.from = from;
    this.to = to;
    this.easing = easing;
    this.duration = duration;
    this.startTime = startTime;
    this.remainingTime = remainingTime;
  }

  start(): void {
    const currentTime = Date.now(); // ms
    this.remainingTime = (currentTime - this.startTime) * 0.001; // ms -> s (0 ~ 1
    this.x = this.easing(
      this.remainingTime,
      this.from,
      this.to - this.from,
      this.duration * 0.001
    );
    if (this.remainingTime * 1000 >= this.duration) {
      this.x = this.to;
    }
    this.div.style.left = `${this.x}px`;
    this.div.textContent = `x === ${parseFloat(this.x.toFixed(2))}`;
  }
  stop(): void {
    this.duration -= this.remainingTime * 1000;
    this.isPaused = true;
    this.from = this.x;
  }
  reset(): void {
    this.x = 0;
    this.from = 0;
    this.div.style.left = `${this.x}px`;
    this.div.textContent = `x === ${this.x}`;
  }
  // feedback : subscribe의 용도, 쓰임
  // subscribe(subscription: Subscription): void {}
  // unsubscribe(subscription: Subscription): void {}
}
