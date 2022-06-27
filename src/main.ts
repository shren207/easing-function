import "./style.css";
// import { Tween } from "./Tween";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Easing Function</h1>
  <button class="start">Start</button>
  <button class="stop">Stop</button>
  <button class="reset">Reset</button>
  <div class="box">
    <div class="box-inner"></div>
    <div class="coords"></div>
</div>
`;

export default class App {
  static instance: App;
  delta: number = 0;
  startTime: number;
  frameRequestHandle: number;
  box: HTMLDivElement;
  coords: HTMLDivElement;
  start: HTMLButtonElement;
  x: number;
  // tween: Tween;
  constructor() {
    App.instance = this; // Singleton Pattern
    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    this.box = document.querySelector<HTMLDivElement>(".box")!;
    this.coords = document.querySelector<HTMLDivElement>(".coords")!;
    this.x = 50;
    this.coords.textContent = "x === 50";
    this.start = document.querySelector<HTMLButtonElement>(".start")!;
  }
  moveX(x: number) {
    const box = document.querySelector<HTMLDivElement>(".box.inner")!;
    box.style.left = `${x}px`;
  }

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now();
    this.delta = (currentTime - this.startTime) * 0.001;
    this.startTime = currentTime;

    if (this.x >= 400) return;
    this.x += 1;
    this.coords.textContent = `x === ${this.x}`;
    this.box.style.left = `${this.x}px`;
  };
}
window.addEventListener("load", () => {
  new App();
});
