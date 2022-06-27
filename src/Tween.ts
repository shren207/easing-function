type Easing = (t: number) => number;
type Subscription = (x: number) => void;

// easing function은 easeInSine, EaseOutSine, EaseInQuad 등 수많은 종류가 있지만,
// 일단은 linear로 구현해보자.
export class Tween {
  constructor(
    from: number, // startValue of x
    to: number, // endValue of x
    easing: Easing = (t) => t, // easing function
    duration: number = 1000
  ) {}

  start(): void {}
  stop(): void {}
  reset(): void {}
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
//
// a.subscribe((x: number) => {});
