export function starsBlink() {
  this.stars.push({
    x: Math.floor(Math.random()*1600),
    y: Math.floor(Math.random()*800),
    size: Math.floor(Math.random()*1) + 1,
    pow: Math.floor(Math.random()*300)
  })
  for (let i = this.stars.length - 1; i >= 0; i--) {
    const star = this.stars[i];
    if (star.pow-- > 0) {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2, true);
      this.ctx.closePath;
      this.ctx.fillStyle = 'rgba(115,112,227,0.9)';
      this.ctx.fill();
    } else {
      this.stars.splice(i, 1);
    }
  }
};
