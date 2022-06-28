import "./style.css";
import { Tween } from "./Tween";
import { easing } from "./Easing";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Easing Function</h1>
  <form>
    <label for="from">from : </label>
    <input type="text" id="from" value="0"/>
    <br />
    <label for="to">to : </label>
    <input type="text" id="to" value="400"/>
    <br />
    <label for="duration">duration : </label>
    <input type="text" id="duration" value="1000"/>
    <br />
    <label for="easing">easing : </label>
    <select id="easing"></select>
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
  easing: (t: number, b: number, c: number, d: number) => number;

  box: HTMLDivElement = document.querySelector<HTMLDivElement>(".box-inner")!;
  select: HTMLSelectElement =
    document.querySelector<HTMLSelectElement>("#easing")!;
  start: HTMLButtonElement =
    document.querySelector<HTMLButtonElement>(".start")!;
  stop: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".stop")!;
  reset: HTMLButtonElement =
    document.querySelector<HTMLButtonElement>(".reset")!;

  from: number = 0;
  to: number = 0;
  x: number = 0;
  duration: number = 1000; // ms
  tween: Tween;

  isPaused: boolean = false;

  constructor() {
    App.instance = this; // Singleton Pattern
    this.box.textContent = `x === ${this.x}`;
    this.start.addEventListener("click", this.handleStart);
    this.stop.addEventListener("click", this.handleStop);
    this.reset.addEventListener("click", this.handleReset);
    this.select.innerHTML = Object.keys(easing)
      .map((key) => `<option>${key}</option>`)
      .join("");
    this.select.addEventListener("change", this.handleChange);
    this.easing = (t: number, b: number, c: number, d: number) =>
      (c * t) / d + b;
    this.tween = new Tween(this.box, 0, 400, this.easing, 1000);
  }

  handleStart = () => {
    if (!this.tween.isPaused) {
      this.from = parseFloat(
        document.querySelector<HTMLInputElement>("#from")!.value
      );
      this.to = parseFloat(
        document.querySelector<HTMLInputElement>("#to")!.value
      );
      this.duration = parseFloat(
        document.querySelector<HTMLInputElement>("#duration")!.value
      );
      this.tween = new Tween(
        this.box,
        this.from,
        this.to,
        this.easing,
        this.duration
      );
    } else {
      this.isPaused = false;
    }
    this.tween.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
  };
  handleStop = () => {
    window.cancelAnimationFrame(this.frameRequestHandle);
    this.tween.stop();
  };
  handleReset = () => {
    window.cancelAnimationFrame(this.frameRequestHandle);
    this.tween.reset();
  };
  handleChange = (e) => {
    this.easing = easing[e.target.value];
  };

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    this.tween.start();
    if (this.tween.delta * 1000 >= this.tween.duration) {
      window.cancelAnimationFrame(this.frameRequestHandle);
    }
  };
}
window.addEventListener("load", () => {
  new App();
});
