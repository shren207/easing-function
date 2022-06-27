import "./style.css";
// import { Tween } from "./Tween";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Easing Function</h1>
  <form>
    <label for="from">from : </label>
    <input type="text" id="from" />
    <br />
    <label for="to">to : </label>
    <input type="text" id="to" />
    <br />
    <label for="duration">duration : </label>
    <input type="text" id="duration" />
  </form>
  <button class="start">Start</button>
  <button class="stop">Stop</button>
  <button class="reset">Reset</button>
  <div class="box">
    <div class="box-inner"></div>
  </div>
`;

export default class App {
  static instance: App;

  delta: number = 0; // 변수명 고민해보기
  startTime: number = 0;
  frameRequestHandle: number = 0;

  box: HTMLDivElement = document.querySelector<HTMLDivElement>(".box-inner")!;
  start: HTMLButtonElement =
    document.querySelector<HTMLButtonElement>(".start")!;
  stop: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".stop")!;
  reset: HTMLButtonElement =
    document.querySelector<HTMLButtonElement>(".reset")!;

  from: number = 0;
  to: number = 0;
  x: number = 0;
  duration: number = 1000; // ms

  isPaused: boolean = false;

  constructor() {
    App.instance = this; // Singleton Pattern

    this.box.textContent = `x === ${this.x}`;
    this.start.addEventListener("click", this.handleStart);
    this.stop.addEventListener("click", this.handleStop);
    this.reset.addEventListener("click", this.handleReset);
  }

  // Easing.ts로 별도 분리하기
  easeLinear(t: number, b: number, c: number, d: number) {
    return (c * t) / d + b;
  }

  // handleStart, handleStop, handleReset은 Tween.ts에 별도 분리
  handleStart = () => {
    // a.start();
    if (!this.isPaused) {
      this.from = parseFloat(
        document.querySelector<HTMLInputElement>("#from")!.value
      );
      this.to = parseFloat(
        document.querySelector<HTMLInputElement>("#to")!.value
      );
      this.duration = parseFloat(
        document.querySelector<HTMLInputElement>("#duration")!.value
      );
    } else {
      this.isPaused = false;
    }

    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
  };
  handleStop = () => {
    // a.stop();
    window.cancelAnimationFrame(this.frameRequestHandle);
    this.duration -= this.delta * 1000;
    this.isPaused = true;
    this.from = this.x;
    console.log(`delta: ${this.delta}`);
    console.log(`duration: ${this.duration}`);
    console.log(`from: ${this.from}`);
  };
  handleReset = () => {
    // a.reset();
    window.cancelAnimationFrame(this.frameRequestHandle);
    this.x = 0;
    this.box.style.left = `${this.x}px`;
    this.box.textContent = `x === ${this.x}`;
  };

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now(); // ms
    this.delta = (currentTime - this.startTime) * 0.001; // ms -> s (0 ~ 1)
    this.x = this.easeLinear(
      this.delta,
      this.from,
      this.to - this.from,
      this.duration * 0.001
    );

    if (this.delta >= this.duration || this.x >= this.to) {
      this.x = this.to;
      // 이렇게 강제로 정해주는 것은 좋은 방법은 아닌 것 같다.
      window.cancelAnimationFrame(this.frameRequestHandle);
    }
    this.box.style.left = `${this.x}px`;
    this.box.textContent = `x === ${parseFloat(this.x.toFixed(2))}`;
  };
}
window.addEventListener("load", () => {
  new App();
});
