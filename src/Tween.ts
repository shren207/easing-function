type Easing = (t: number, b: number, c: number, d: number) => number;
type Subscription = (x: number) => void;

export class Tween {
  div: HTMLDivElement;
  from: number;
  to: number;
  easing: Easing = (t: number, b: number, c: number, d: number) =>
    (c * t) / d + b;
  duration: number = 1000;
  startTime: number = 0;
  delta: number = 0;

  constructor(
    div: HTMLDivElement,
    from: number, // startValue of x
    to: number, // endValue of x
    easing: Easing = (t: number, b: number, c: number, d: number) =>
      (c * t) / d + b,
    duration: number = 1000,
    startTime: number = 0,
    delta: number = 0
  ) {
    this.div = div;
    this.from = from;
    this.to = to;
    this.easing = easing;
    this.duration = duration;
    this.startTime = startTime;
    this.delta = delta;
  }

  start(): void {
    const currentTime = Date.now(); // ms
    this.delta = (currentTime - this.startTime) * 0.001; // ms -> s (0 ~ 1
    const x: number = this.easing(
      this.delta,
      this.from,
      this.to - this.from,
      this.duration * 0.001
    );
    this.div.style.left = `${x}px`;
    this.div.textContent = `x === ${parseFloat(this.x.toFixed(2))}`;
    if (this.delta * 1000 >= this.duration) {
      // 이렇게 강제로 정해주는 것은 좋은 방법은 아닌 것 같다.
      this.x = this.to;
    }
  }
  stop(): void {}
  reset(): void {}
  update(): void {}
  subscribe(subscription: Subscription): void {}
  unsubscribe(subscription: Subscription): void {}
}

// [reference]
// const a = new Tween(0, 1, 1000);
//
// a.start();
// a.stop();
// a.reset();
//
// a.subscribe((x: number) => {});
