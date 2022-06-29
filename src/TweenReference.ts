import { easeSinInOut } from "d3-ease";

type Subscription = (value: number) => void;

class Tween {
  private startTime: number = 0;
  private subscriptions: Array<Subscription> = [];
  private onEnterFrameId?: number;
  private progress: number = 0;
  private onCompleteCallback?: () => void;

  constructor(
    public from: number,
    public to: number,
    public duration: number,
    public easing: (t: number) => number = (t) => t
  ) {
    this.onEnterFrame = this.onEnterFrame.bind(this);
  }

  public play() {
    this.startTime = Date.now();
    this.onEnterFrameId = window.requestAnimationFrame(this.onEnterFrame);
  }

  public pause() {
    if (this.onEnterFrameId) {
      window.cancelAnimationFrame(this.onEnterFrameId);
      this.onEnterFrameId = undefined;
    }
  }

  public reset() {
    this.progress = 0;
  }

  public onComplete(callback: () => void) {
    this.onCompleteCallback = callback;
  }

  private onEnterFrame() {
    this.onEnterFrameId = window.requestAnimationFrame(this.onEnterFrame);
    const currentTime = Date.now();
    const deltaTime = currentTime - this.startTime;
    this.startTime = currentTime;
    if (this.progress >= 1) {
      this.progress = 1;
      this.pause();

      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }

    const value =
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
