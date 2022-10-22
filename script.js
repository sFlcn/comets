import { animatedDots, aniDot } from './dots.js';

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
    { x: 1610, y: 62, a: 2.9, f: 3.8, radius: 5, color: 'rgb(366,166,216)' },
    ctx
  ),
  new aniDot(
    { x: 607, y: 1391, a: -2.1, f: 2.2, radius: 5, color: 'rgb(150,150,249)' },
    ctx
  ),
  new aniDot(
    { x: -10, y: -100, a: 0, f: 0, radius: 5, color: 'rgb(50,50,249)' },
    ctx
  ),
];

const planetDot = new aniDot(
  { x: 940, y: 407, radius: 50, isStationary: true },
  ctx
);

function getDotsData() {
  let dotsArray = customDotsArray.slice(0);
  dotsArray.push(planetDot);
  return dotsArray;
};

const asteroidsScreen = new animatedDots({
  backgroundImage,
  foregroundImage,
  dotsArray: getDotsData(),
  gravityValue: 1,
  ctx: ctx,
});

startButton.addEventListener('click', () => {
  startButton.blur();
  asteroidsScreen.isAnimatingNow = true;
  asteroidsScreen.drawDots();
});
