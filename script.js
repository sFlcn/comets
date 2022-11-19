import { aniDot, animatedDots } from './dots.js';
import { starsBlink } from './blink.js';
import { desktopDotsArray, desktopPlanetDot } from './stellars.js';

const canvas = document.querySelector('#comets__canvas');
const ctx = canvas.getContext('2d');
const appHeader = document.querySelector('.comets__header');
const startButton = document.querySelector('#start');
const boostButton = document.querySelector('#boost');

const appWindow = {
  width: document.documentElement.clientWidth - 10,
  height: document.documentElement.clientHeight - 10,
  mode:
    (document.documentElement.clientWidth > 1200) ? 'desktop' :
    (document.documentElement.clientWidth > 660) ? 'tablet' : 'mobile'
};

canvas.setAttribute('width', `${appWindow.width}`);
canvas.setAttribute('height', `${appWindow.height}`);
const starsBlinkColorArr = [135, 132, 227];
const starsArreaDimensions = {width: appWindow.width, height: appWindow.height};
let starsBlinkBlindArrea;

const backgroundImage = {
  imageElement: new Image()
};
backgroundImage.imageElement.src = (
  (appWindow.mode === 'mobile') ? './images/space-tr-mobile.webp' :
  (appWindow.mode === 'tablet') ? './images/space-tr-tablet.webp' : './images/space-tr-desktop.webp'
);
backgroundImage.imageElement.onload = function() {
  backgroundImage.imageCoordX = (appWindow.width - backgroundImage.imageElement.width) / 2;
  backgroundImage.imageCoordY = (appWindow.height - backgroundImage.imageElement.height) / 2;
  starsBlinkBlindArrea = (
  (appWindow.mode === 'mobile') ? {xCoord: 887, yCoord: 102, xDim: 123, yDim: 123} :
  (appWindow.mode === 'tablet') ? {xCoord: 887, yCoord: 102, xDim: 123, yDim: 123} :
  {xCoord: backgroundImage.imageCoordX + 1125, yCoord: backgroundImage.imageCoordY + 254, xDim: 123, yDim: 123});
}

const foregroundImage = {
  imageElement: new Image()
};
foregroundImage.imageElement.src = (
  (appWindow.mode === 'mobile') ? './images/planet-mobile.webp' :
  (appWindow.mode === 'tablet') ? './images/planet-tablet.webp' : './images/planet-desktop.webp'
);
foregroundImage.imageElement.onload = function() {
  foregroundImage.imageCoordX = (
    (appWindow.mode === 'mobile') ? 908 :
    (appWindow.mode === 'tablet') ? 908 : (appWindow.width / 2 + 108)
  );
  foregroundImage.imageCoordY = (
    (appWindow.mode === 'mobile') ? 908 :
    (appWindow.mode === 'tablet') ? 908 : (appWindow.height / 2 - 175)
  );
}

function getDotsData() {
  const dotsArray = [];
  for (let i = 0; i < desktopDotsArray.length; i++) {
    dotsArray.push(new aniDot(desktopDotsArray[i], ctx));
  }
  dotsArray.push(new aniDot(desktopPlanetDot, ctx));
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
