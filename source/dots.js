/* eslint-disable max-classes-per-file */

export function getDistance(el1, el2) {
  return Math.sqrt((el1.x - el2.x) ** 2 + (el1.y - el2.y) ** 2);
}

export function getAngle(el1, el2) {
  return Math.PI + Math.atan2(el1.y - el2.y, el1.x - el2.x);
}

export class AniDot {
  constructor(
    {
      x = 0,
      y = 0,
      f = 0,
      a = 0,
      radius = 1,
      color = 'rgba(0,0,0,0)',
      isStationary = false,
    },
    ctx,
  ) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.a = a;
    this.radius = radius;
    this.color = color;
    this.isStationary = isStationary;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  recalc(fn, an) {
    if (!this.isStationary) {
      const xn = this.f * Math.cos(this.a) + fn * Math.cos(an);
      const yn = this.f * Math.sin(this.a) + fn * Math.sin(an);
      this.f = Math.sqrt(xn ** 2 + yn ** 2);
      this.a = Math.atan2(yn, xn);
    }
  }

  calcXY() {
    this.x += this.f * Math.cos(this.a);
    this.y += this.f * Math.sin(this.a);
  }
}

export function generateDotsCluster(
  {
    groupDimension,
    radius,
    isGraviCener,
    canvasWidth,
    canvasHeight,
    groupWidth,
    groupHeight,
  },
  ctx,
) {
  const dotsCluster = [];

  for (let i = 0; i < groupDimension.x; i += 1) {
    for (let j = 0; j < groupDimension.y; j += 1) {
      dotsCluster.push(new AniDot({
        x: (canvasWidth - groupWidth)
          / 2 + i * (groupWidth / (groupDimension.x > 1 ? groupDimension.x - 1 : 1)),
        y: (canvasHeight - groupHeight)
          / 2 + j * (groupHeight / (groupDimension.y > 1 ? groupDimension.y - 1 : 1)),
        radius,
        color: `rgb(${150 + (i * 2) ** 3},${150 + (j * 2) ** 2},${Math.floor(Math.random() * 50) + 205})`,
      }, ctx));
    }
  }

  if (isGraviCener) {
    const centerDot = new AniDot(
      { x: canvasWidth / 2, y: canvasHeight / 2, isStationary: true },
      ctx,
    );
    dotsCluster.push(centerDot);
  }
  return dotsCluster;
}

export class AnimatedDots {
  constructor(
    {
      backgroundImage, foregroundImage, dotsArray, gravityValue,
    },
    ctx,
    animationFn,
  ) {
    this.backgroundImage = backgroundImage;
    this.foregroundImage = foregroundImage;
    this.dotsArray = dotsArray;
    this.gravityValue = gravityValue;
    this.ctx = ctx;
    this.isAnimatingNow = false;
    this.animationFn = animationFn || function animationFunction() {
      this.drawBackground();
      this.drawDots();
      this.drawForeground();
      this.scheduleAnimation();
    };
  }

  scheduleAnimation() {
    if (this.isAnimatingNow) {
      setTimeout(() => { window.requestAnimationFrame(this.animationFn.bind(this)); }, 15);
    }
  }

  calcDotsParams() {
    for (let i = 0; i < this.dotsArray.length; i += 1) {
      for (let j = i + 1; j < this.dotsArray.length; j += 1) {
        const distance = getDistance(this.dotsArray[i], this.dotsArray[j]);
        if (distance > 100) {
          const f = (this.gravityValue / distance)
          * (this.dotsArray[i].radius / 2 + this.dotsArray[j].radius / 2);
          this.dotsArray[i].recalc(f, getAngle(this.dotsArray[i], this.dotsArray[j]));
          this.dotsArray[j].recalc(f, getAngle(this.dotsArray[j], this.dotsArray[i]));
        }
      }
    }
  }

  drawBackground() {
    this.ctx.drawImage(
      this.backgroundImage.imageElement,
      this.backgroundImage.imageCoordX,
      this.backgroundImage.imageCoordY,
    );
  }

  drawForeground() {
    this.ctx.drawImage(
      this.foregroundImage.imageElement,
      this.foregroundImage.imageCoordX,
      this.foregroundImage.imageCoordY,
    );
  }

  drawDots() {
    this.calcDotsParams();
    this.dotsArray.forEach((dot) => {
      dot.calcXY();
      dot.draw();
    });
  }
}
