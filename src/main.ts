import "./style.css";

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
  constructor() {
    App.instance = this; // Singleton Pattern
    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const box = document.querySelector<HTMLDivElement>(".box.inner")!;
    const coords = document.querySelector<HTMLDivElement>(".coords")!;
    const button = document.querySelector<HTMLButtonElement>("button")!;
    // button.addEventListener("click", () => {

    // }
    // coords.textContent = "x === 0";
  }

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now();
    this.delta = (currentTime - this.startTime) * 0.001;
    this.startTime = currentTime;

    // this.box.style.translateX =
  };
}
window.addEventListener("load", () => {
  new App();
});
