export const easing = {
  easeLinear(t: number, b: number, c: number, d: number): number {
    return (c * t) / d + b;
  },
  easeInQuad(t: number, b: number, c: number, d: number): number {
    return c * (t /= d) * t + b;
  },
  easeOutQuad(t: number, b: number, c: number, d: number): number {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  },
  easeInSine(t: number, b: number, c: number, d: number): number {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
  },
  easeOutSine(t: number, b: number, c: number, d: number): number {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },
  easeInOutSine(t: number, b: number, c: number, d: number): number {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  },
  easeInExpo(t: number, b: number, c: number, d: number): number {
    return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo(t: number, b: number, c: number, d: number): number {
    return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
  },
  easeInOutExpo(t: number, b: number, c: number, d: number): number {
    if (t === 0) return b;
    if (t === d) return b + c;
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc(t: number, b: number, c: number, d: number): number {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc(t: number, b: number, c: number, d: number): number {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic(t: number, b: number, c: number, d: number): number {
    let s = 1.70158;
    let p = 0;
    let a = c;
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p)
      ) + b
    );
  },
  easeOutElastic(t: number, b: number, c: number, d: number): number {
    let s = 1.70158;
    let p = 0;
    let a = c;
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
      c +
      b
    );
  },
  easeInOutElastic(t: number, b: number, c: number, d: number): number {
    let s = 1.70158;
    let p = 0;
    let a = c;
    if (t === 0) return b;
    if ((t /= d / 2) === 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    if (t < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
        b
      );
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
      c +
      b
    );
  },
};
