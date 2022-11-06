function makeNewStar() {
  const starPower = Math.floor(Math.random() * 150) + 50;
  return {
    x: Math.floor(Math.random()*1600),
    y: Math.floor(Math.random()*800),
    size: 1 + Math.floor(Math.random()*2),
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

export function starsBlink() {
  this.stars.push(makeNewStar());
  this.stars.push(makeNewStar());
  for (let i = this.stars.length - 1; i >= 0; i--) {
    if (this.stars[i].power) {
      drawStar.bind(this)(this.stars[i]);
      this.stars[i].power -= 1;
    } else {
      this.stars.splice(i, 1);
    }
  }
};
