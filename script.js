import { animatedDots, aniDot } from './dots.js';
import { starsBlink } from './blink.js';

const canvas = document.querySelector('#comets__canvas');
const startButton = document.querySelector('#start');
const ctx = canvas.getContext('2d');

const backgroundImage = {
  imageElement: new Image(),
};
backgroundImage.imageElement.src = './images/space-tr.png';
const foregroundImage = {
  imageElement: new Image(),
  imageCoordX: 908,
  imageCoordY: 225,
};
foregroundImage.imageElement.src = './images/planet.png';

const customDotsArray = [
  new aniDot(
    { x: 1110, y: -5, a: 2.9, f: 8.8, radius: 5, color: 'rgb(366,166,216)' },
    ctx
  ),
  new aniDot(
    { x: -567, y: 691, a: -2, f: 3, radius: 5, color: 'rgb(150,150,249)' },
    ctx
  ),
  new aniDot(
    { x: 1220, y: 1300, a: 10, f: 10, radius: 5, color: 'rgb(50,50,249)' },
    ctx
  ),
  new aniDot(
    { x: 100, y: 810, a: -2.5, f: 7, radius: 5, color: 'rgb(83,138,134)' },
    ctx
  ),
];

const planetDot = new aniDot(
  { x: 1240, y: 557, radius: 116, isStationary: true },
  ctx
);

function getDotsData() {
  let dotsArray = customDotsArray.slice(0);
  dotsArray.push(planetDot);
  return dotsArray;
};

const asteroidsScreen = new animatedDots(
  {
    backgroundImage,
    foregroundImage,
    dotsArray: getDotsData(),
    gravityValue: 1,
  },
  ctx
);

asteroidsScreen.stars = [];
asteroidsScreen.starsBlink = starsBlink;

asteroidsScreen.animationFn = function animationFn() {
  asteroidsScreen.drawBackground();
  asteroidsScreen.drawDots();
  asteroidsScreen.starsBlink();
  asteroidsScreen.drawForeground();
  asteroidsScreen.scheduleAnimation();
}

startButton.addEventListener('click', () => {
  startButton.blur();
  asteroidsScreen.isAnimatingNow = true;
  asteroidsScreen.animationFn();
});
