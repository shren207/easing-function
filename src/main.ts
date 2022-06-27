import "./style.css";
import { Tween } from "./Tween";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Easing Function</h1>
  <form>
    <label for="from">from : </label>
    <input type="text" id="from" />
    <br />
    <label for="to">to : </label>
    <input type="text" id="to" />
</form>
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
  inputFrom: HTMLInputElement;
  inputTo: HTMLInputElement;
  frameRequestHandle: number;
  box: HTMLDivElement;
  coords: HTMLDivElement;
  start: HTMLButtonElement;
  tween: Tween;
  x: number = 50;
  // tween: Tween;
  constructor() {
    App.instance = this; // Singleton Pattern
    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    this.box = document.querySelector<HTMLDivElement>(".box")!;
    this.coords = document.querySelector<HTMLDivElement>(".coords")!;
    this.coords.textContent = "x === 50";
    this.start = document.querySelector<HTMLButtonElement>(".start")!;
    this.inputFrom = document.querySelector<HTMLInputElement>("#from")!;
    this.inputTo = document.querySelector<HTMLInputElement>("#to")!;
    this.start.addEventListener("click", this.handleClick);
  }

  // handleSubmit = (e: SubmitEvent) => {
  //   console.log("i'm submitted");
  //   e.preventDefault();
  //   const from = parseFloat(this.inputFrom.value);
  //   const to = parseFloat(this.inputTo.value);
  //   this.tween = new Tween(from, to);
  //   this.tween
  //     .subscribe((x: number) => {
  //       this.x = x;
  //       this.coords.textContent = `x === ${x}`;
  //       this.box.style.transform = `translateX(${x}px)`;
  //     })
  //     .start();
  // };

  handleClick = () => {
    const from = parseFloat(this.inputFrom.value);
    const to = parseFloat(this.inputTo.value);
    console.log(`from: ${from}, to: ${to}`);
    this.tween = new Tween(from, to);

    this.tween = new Tween(
      this.x,
      100,
      (t) => {
        return t * t;
      },
      1000
    );
    this.tween.subscribe((x) => {
      this.x = x;
      this.coords.textContent = `x === ${x}`;
      this.box.style.transform = `translateX(${x}px)`;
    });
    // .start();
  };

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
