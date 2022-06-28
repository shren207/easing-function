import "./style.css";
import { Tween } from "./Tween";
import { easing } from "./easing";

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
  <div class="box"></div>
`;

export default class App {
  static instance: App;

  // animation
  frameRequestHandle: number = 0;

  // DOM
  box: HTMLDivElement = document.querySelector<HTMLDivElement>(".box")!;
  select: HTMLSelectElement =
    document.querySelector<HTMLSelectElement>("#easing")!;
  start: HTMLButtonElement =
    document.querySelector<HTMLButtonElement>(".start")!;
  stop: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".stop")!;
  reset: HTMLButtonElement =
    document.querySelector<HTMLButtonElement>(".reset")!;

  tween: Tween;
  easing: (t: number, b: number, c: number, d: number) => number;

  constructor() {
    App.instance = this; // Singleton Pattern

    this.box.textContent = `x === ${0}`;
    this.start.addEventListener("click", this.handleStart);
    this.stop.addEventListener("click", this.handleStop);
    this.reset.addEventListener("click", this.handleReset);
    this.select.addEventListener("change", this.handleChange);
    this.select.innerHTML = Object.keys(easing)
      .map((key) => `<option>${key}</option>`)
      .join("");
    this.easing = (t: number, b: number, c: number, d: number) =>
      (c * t) / d + b;
    this.tween = new Tween(this.box, 0, 400, this.easing, 1000);
  }

  handleStart = () => {
    if (!this.tween.isPaused) {
      const from = parseFloat(
        document.querySelector<HTMLInputElement>("#from")!.value
      );
      const to = parseFloat(
        document.querySelector<HTMLInputElement>("#to")!.value
      );
      const duration = parseFloat(
        document.querySelector<HTMLInputElement>("#duration")!.value
      );
      this.tween = new Tween(this.box, from, to, this.easing, duration);
    } else {
      this.tween.isPaused = false;
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
    // feedback : type error 해결
    this.easing = easing[e.target.value];
  };

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    this.tween.start();
    if (this.tween.remainingTime * 1000 >= this.tween.duration) {
      window.cancelAnimationFrame(this.frameRequestHandle);
    }
  };
}
window.addEventListener("load", () => {
  new App();
});
