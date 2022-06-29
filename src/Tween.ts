type Easing = (t: number, b: number, c: number, d: number) => number;

export class Tween {
  div: HTMLDivElement; // * 이렇게 div를 받아오는 것이 아님 (subscirption을 사용해서 범용적으로 구현해야 함)
  from: number;
  to: number;
  easing: Easing = (t: number, b: number, c: number, d: number) =>
    (c * t) / d + b;
  duration: number = 1000;
  startTime: number = 0;
  remainingTime: number = 0;
  isPaused: boolean = false; // * isPaused도 사실은 필요없다고 하심
  x: number = 0;
  // * default는 public이지만, 직접 명시를 하는 것이 더 좋은것 같다.

  constructor(
    div: HTMLDivElement, // * 이런 식으로 사용하면 범용적으로 Tween.ts를 사용할 수 없음
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
    // * Dean님은 play()로 구현하신 듯
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
  // * subscription을 사용해야 Tween.ts를 범용적으로 사용할 수 있다. 그게 바로 함수형 프로그래밍이다.
  // subscribe(subscription: Subscription): void {}
  // unsubscribe(subscription: Subscription): void {}
}
