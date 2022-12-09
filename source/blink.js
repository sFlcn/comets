function makeNewStar(arreaDimensions, blindArrea) {
  const starPower = Math.floor(Math.random() * 150) + 50;
  let starCoordX;
  let starCoordY;
  do {
    starCoordX = Math.floor(Math.random() * arreaDimensions.width);
    starCoordY = Math.floor(Math.random() * arreaDimensions.height);
  } while (
    (starCoordX >= blindArrea.xCoord)
    && (starCoordX <= blindArrea.xCoord + blindArrea.xDim)
    && (starCoordY >= blindArrea.yCoord)
    && (starCoordY <= blindArrea.yCoord + blindArrea.yDim)
  );
  return {
    x: starCoordX,
    y: starCoordY,
    size: Math.random() * 2,
    initPower: starPower,
    power: starPower,
  };
}

function drawStar(star, starColor) {
  const starPhase = (
    (star.initPower - Math.abs(star.initPower - star.power * 2))
    / star.initPower)
  ** 1.5;
  this.ctx.beginPath();
  this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2, true);
  this.ctx.closePath();
  this.ctx.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${starPhase})`;
  this.ctx.fill();
}

export default function starsBlink(
  count,
  arreaDimensions,
  blindArrea,
  starColor = [255, 255, 255],
) {
  for (let i = 0; i < count; i += 1) {
    this.stars.push(makeNewStar(arreaDimensions, blindArrea));
  }
  for (let i = this.stars.length - 1; i >= 0; i -= 1) {
    if (this.stars[i].power) {
      drawStar.bind(this)(this.stars[i], starColor);
      this.stars[i].power -= 1;
    } else {
      this.stars.splice(i, 1);
    }
  }
}
