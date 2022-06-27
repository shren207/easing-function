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

  delta: number = 0;
  startTime: number = 0;
  frameRequestHandle: number = 0;
  box: HTMLDivElement = document.querySelector<HTMLDivElement>(".box-inner")!;
  start: HTMLButtonElement =
    document.querySelector<HTMLButtonElement>(".start")!;
  stop: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".stop")!;
  from: number = 0;
  to: number = 0;
  x: number = 0;
  duration: number = 1000;

  constructor() {
    App.instance = this; // Singleton Pattern

    this.box.textContent = `x === ${this.x}`;
    this.start.addEventListener("click", this.handleClick);
    this.stop.addEventListener("click", this.handleStop);
  }

  easeLinear(t: number, b: number, c: number, d: number) {
    return (c * t) / d + b;
  }

  handleClick = () => {
    this.from = parseFloat(
      document.querySelector<HTMLInputElement>("#from")!.value
    );
    this.to = parseFloat(
      document.querySelector<HTMLInputElement>("#to")!.value
    );
    this.duration = parseFloat(
      document.querySelector<HTMLInputElement>("#duration")!.value
    );
    this.startTime = Date.now();

    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
  };

  handleStop = () => {
    window.cancelAnimationFrame(this.frameRequestHandle);
  };

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now();
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
