import { animatedDots, aniDot } from './dots.js';
import { starsBlink } from './blink.js';

const canvas = document.querySelector('#comets__canvas');
const appHeader = document.querySelector('.comets__header');
const startButton = document.querySelector('#start');
const boostButton = document.querySelector('#boost');
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
  ctx,
  function animationFn() {
    this.drawBackground();
    this.starsBlink(2, starsBlinkBlindArrea);
    this.drawForeground();
    this.scheduleAnimation();
  }
);

asteroidsScreen.stars = [];
asteroidsScreen.starsBlink = starsBlink;
const starsBlinkBlindArrea = {xCoord: 887, yCoord: 102, xDim: 123, yDim: 123};

function onAppLoad() {
  asteroidsScreen.isAnimatingNow = true;
  asteroidsScreen.animationFn();
  window.removeEventListener('load', onAppLoad);

  appHeader.classList.remove('comets__header--loading');
  startButton.classList.remove('control__button--loading');
  startButton.textContent = 'Start';

  startButton.addEventListener('click', () => {
    startButton.blur();
    asteroidsScreen.isAnimatingNow = true;
    boostButton.disabled = false;
    startButton.disabled = true;
    asteroidsScreen.animationFn = function animationFn() {
      asteroidsScreen.drawBackground();
      asteroidsScreen.drawDots();
      asteroidsScreen.starsBlink(2, starsBlinkBlindArrea);
      asteroidsScreen.drawForeground();
      asteroidsScreen.scheduleAnimation();
    }
  });

  boostButton.addEventListener('click', () => {
    boostButton.blur();
    asteroidsScreen.animationFn();
  });
}

window.addEventListener('load', onAppLoad);
