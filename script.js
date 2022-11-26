import { aniDot, animatedDots } from './dots.js';
import { starsBlink } from './blink.js';
import { dotsArrayVariants, planetDotVariants } from './stellars.js';

const canvas = document.querySelector('#comets__canvas');
const ctx = canvas.getContext('2d');
const appHeader = document.querySelector('.comets__header');
const startButton = document.querySelector('#start');
const boostButton = document.querySelector('#boost');

const appWindow = {
  width: document.documentElement.clientWidth - 10,
  height: document.documentElement.clientHeight - 10,
  mode:
    (document.documentElement.clientWidth >= 1200) ? 'desktop' :
    (document.documentElement.clientWidth >= 660) ? 'tablet' : 'mobile'
};

canvas.setAttribute('width', `${appWindow.width}`);
canvas.setAttribute('height', `${appWindow.height}`);
const starsBlinkColorArr = [135, 132, 227];
const starsArreaDimensions = {width: appWindow.width, height: appWindow.height};
const backgroundImage = { imageElement: new Image() };
const foregroundImage = { imageElement: new Image() };
let appDotsArray;
let appPlanetDot;
let starsBlinkBlindArrea;

// coordinates here depend on the background image
switch (appWindow.mode) {
  case 'mobile':
    backgroundImage.imageElement.src = './images/space-tr-mobile.webp';
    starsBlinkBlindArrea = {xCoord: 229, yCoord: 114, xDim: 57, yDim: 57};
    foregroundImage.imageElement.src = './images/planet-mobile.webp';
    foregroundImage.imageCoordX = -21;
    foregroundImage.imageCoordY = -142;
    appDotsArray = dotsArrayVariants.mobile;
    appPlanetDot = planetDotVariants.mobile;
    break;
  case 'tablet':
    backgroundImage.imageElement.src = './images/space-tr-tablet.webp';
    starsBlinkBlindArrea = {xCoord: 409, yCoord: 292, xDim: 123, yDim: 123};
    foregroundImage.imageElement.src = './images/planet-tablet.webp';
    foregroundImage.imageCoordX = 0;
    foregroundImage.imageCoordY = -285;
    appDotsArray = dotsArrayVariants.tablet;
    appPlanetDot = planetDotVariants.tablet;
    break;
  default:
    backgroundImage.imageElement.src = './images/space-tr-desktop.webp';
    starsBlinkBlindArrea = {xCoord: 1125, yCoord: 254, xDim: 123, yDim: 123};
    foregroundImage.imageElement.src = './images/planet-desktop.webp';
    foregroundImage.imageCoordX = 108;
    foregroundImage.imageCoordY = -175;
    appDotsArray = dotsArrayVariants.desktop;
    appPlanetDot = planetDotVariants.desktop;
    break;
}

appPlanetDot.x += appWindow.width / 2;
appPlanetDot.y += appWindow.height / 2;

backgroundImage.imageElement.onload = function() {
  backgroundImage.imageCoordX = (appWindow.width - backgroundImage.imageElement.width) / 2;
  backgroundImage.imageCoordY = (appWindow.height - backgroundImage.imageElement.height) / 2;
  starsBlinkBlindArrea.xCoord += backgroundImage.imageCoordX;
  starsBlinkBlindArrea.yCoord += backgroundImage.imageCoordY;
}

foregroundImage.imageElement.onload = function() {
  foregroundImage.imageCoordX += appWindow.width / 2;
  foregroundImage.imageCoordY += appWindow.height / 2;
}

function getDotsData() {
  const dotsArray = [];
  for (let i = 0; i < appDotsArray.length; i++) {
    dotsArray.push(new aniDot(appDotsArray[i], ctx));
  }
  dotsArray.push(new aniDot(appPlanetDot, ctx));
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
    this.starsBlink(3, starsArreaDimensions, starsBlinkBlindArrea, starsBlinkColorArr);
    this.drawForeground();
    this.scheduleAnimation();
  }
);

asteroidsScreen.stars = [];
asteroidsScreen.starsBlink = starsBlink;

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
      asteroidsScreen.starsBlink(1, starsArreaDimensions, starsBlinkBlindArrea, starsBlinkColorArr);
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
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') console.log(asteroidsScreen)
});
