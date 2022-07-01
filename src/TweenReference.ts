import { easeSinInOut } from "d3-ease";

type Subscription = (value: number) => void;

class Tween {
  private startTime: number = 0;
  private subscriptions: Array<Subscription> = [];
  private onEnterFrameId?: number;
  private progress: number = 0;
  private onCompleteCallback?: () => void;

  // * delta를 별도 property로 정의하지 않고, onEnterFrame을 호출할 때마다 새롭게 정의한다.

  constructor(
    public from: number, // x coordinate
    public to: number, // y coordinate
    public duration: number, // ms
    public easing: (t: number) => number = (t) => t
  ) {
    this.onEnterFrame = this.onEnterFrame.bind(this);
  }

  public play() {
    // * start()
    this.startTime = Date.now();
    this.onEnterFrameId = window.requestAnimationFrame(this.onEnterFrame);
  }

  public pause() {
    // * stop()
    if (this.onEnterFrameId) {
      window.cancelAnimationFrame(this.onEnterFrameId);
      this.onEnterFrameId = undefined;
    }
  }

  public reset() {
    // * progress === time passed
    this.progress = 0;
  }

  public onComplete(callback: () => void) {
    this.onCompleteCallback = callback;
  }

  private onEnterFrame() {
    // * 아래 4줄의 코드는 국룰 패턴이다.
    this.onEnterFrameId = window.requestAnimationFrame(this.onEnterFrame);
    const currentTime = Date.now();
    const deltaTime = currentTime - this.startTime; // * 여기서는 계산을 편하게 하기 위해, (currentTime - this.startTime) * 0.001 이라고 하지 않는다.
    this.startTime = currentTime;

    if (this.progress >= 1) {
      // ! 경과시간을 구할 때 사용하는 로직 (변수명으로는 progress를 많이 사용함)
      // ! 반대로 생각하면, 딱히 경과시간을 구할 필요가 없는 경우에는 progress를 정의할 필요가 없다.
      this.progress = 1;
      this.pause();

      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }

    const value =
      // * value === current x coordinate
      this.from + (this.to - this.from) * this.easing(this.progress);

    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].call(null, value);
    }

    this.progress += deltaTime / this.duration;
  }

  public subscribe(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  public unsubscribe(subscription: Subscription) {
    const index = this.subscriptions.indexOf(subscription);
    if (index !== -1) {
      this.subscriptions.splice(index, 1);
    }
  }
}

window.addEventListener("load", () => {
  const div = document.createElement("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.backgroundColor = "red";
  div.style.position = "absolute";
  document.body.append(div);

  const button = document.createElement("button");
  button.innerText = "play";
  button.style.position = "fixed";
  button.style.left = "20px";
  button.style.bottom = "20px";
  document.body.append(button);

  const tween = new Tween(200, 400, 1000, easeSinInOut);

  tween.subscribe((value) => {
    div.style.transform = `translateX(${value}px)`;
  });

  tween.onComplete(() => {
    tween.reset();
    tween.play();
  });

  button.onclick = () => {
    tween.reset();
    tween.play();
  };
});

/*
[이전 모범코드와는 다른 점]
1. delta를 class의 property로 선언하지 않고, onEnterFrame(frameRequest)을 호출할 때마다 새롭게 정의
  1-1. delta를 s로 나타내지 않고, ms로 표현하고 있음 (계산을 편리하게 하기 위함)
3. frameRequestHandle이 onEnterFrameId로 변경됨 (아래에서는 onEnterFrameId로 설명)
4. onEnterFrameId가 optional한 property로 설정됨
2. appendChild를 사용하지 않고, append를 사용
 */

/*
[나의 코드와의 차이]
1. 나는 easing function을 정의한 파일 easing.ts을 별도 작성하였지만, 모범 코드에서는 d3-ease 외부 라이브러리를 사용함
2. 나는 div의 위치를 position을 사용하여 변경하였지만, 모범 코드에서는 translateX()를 사용함
3. private, public 키워드를 적극 사용함
  3-1. private으로 작성된 property는 constructor를 정의하기 전에 작성하며, public으로 작성된 property는 constructor를 정의할 때 작성함
4. bind. call 함수를 적극 사용함
5. subscribe, unsubscribe 함수를 적극 사용함
6. Tween 클래스를 export 하지 않음 (main.ts에서 import './Tween.ts'를 사용함)
7. 나는 stop 기능을 구현하기 위해 isPaused: boolean를 추가하였지만, 모범 코드에서는 onEnterFrameId만을 사용하여 stop 기능을 구현함
 7-1. onEnterFrameId가 undefined일 때 stop이 되므로, onEnterFrameId는 optional한 property로 설정됨
8. 나는 div의 현재 위치를 구하기 위해서 x: number라는 property를 class에 추가하였는데, 모범 코드에서는 const value를 사용하여 매번 새롬게 정의함
9. 나는 경과시간을 나타내기 위해 remainingTime이라는 property를 class에 추가하였는데, 모범 코드에서는 progress라는 property를 class에 추가함
10. 나는 div를 나타내기 위해 div를 class의 property로 추가해주었지만, 모범 코드에서는 subscribe에서 해당 로직을 구현하여 훨씬 범용적으로 구현할 수 있돌고 함
 */
