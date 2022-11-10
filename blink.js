function makeNewStar(blindArrea) {
  const starPower = Math.floor(Math.random() * 150) + 50;
  let starCoordX, starCoordY;
  do {
    starCoordX = Math.floor(Math.random()*1600);
    starCoordY = Math.floor(Math.random()*800);
  } while (
    (starCoordX >= blindArrea.xCoord) &&
    (starCoordX <= blindArrea.xCoord + blindArrea.xDim) &&
    (starCoordY >= blindArrea.yCoord) &&
    (starCoordY <= blindArrea.yCoord + blindArrea.yDim)
  );
  return {
    x: starCoordX,
    y: starCoordY,
    size: Math.random() * 2,
    initPower: starPower,
    power: starPower,
  };
}

function drawStar(star) {
  const starPhase = ((star.initPower - Math.abs(star.initPower - star.power * 2)) / star.initPower) ** 1.5;
  this.ctx.beginPath();
  this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2, true);
  this.ctx.closePath;
  this.ctx.fillStyle = `rgba(135, 132, 227, ${starPhase})`;
  this.ctx.fill();
}

export function starsBlink(count, blindArrea) {
  for (let i = 0; i < count; i++) {
    this.stars.push(makeNewStar(blindArrea));
  }
  for (let i = this.stars.length - 1; i >= 0; i--) {
    if (this.stars[i].power) {
      drawStar.bind(this)(this.stars[i]);
      this.stars[i].power -= 1;
    } else {
      this.stars.splice(i, 1);
    }
  }
};
