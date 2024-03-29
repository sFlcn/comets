import { AniDot, AnimatedDots } from './dots';
import starsBlink from './blink';
import { dotsArrayVariants, planetDotVariants } from './stellars';

// webpack imports
import './css/style.css';
import PlanetDesktop from './images/planet-desktop.png';
import PlanetTablet from './images/planet-tablet.png';
import PlanetMobile from './images/planet-mobile.png';
import SpaceDesktop from './images/space-tr-desktop.png';
import SpaceTablet from './images/space-tr-tablet.png';
import SpaceMobile from './images/space-tr-mobile.png';

const canvas = document.querySelector('#comets-canvas');
const ctx = canvas.getContext('2d');
const appHeader = document.querySelector('.comets__header');
const startButton = document.querySelector('#start');
const boostButton = document.querySelector('#boost');

const appWindow = {
  width: document.documentElement.clientWidth - 10,
  height: document.documentElement.clientHeight - 10,
  mode: 'desktop',
};

if (appWindow.width < 670) {
  appWindow.mode = 'mobile';
} else if (appWindow.width < 1210) {
  appWindow.mode = 'tablet';
}

canvas.setAttribute('width', `${appWindow.width}`);
canvas.setAttribute('height', `${appWindow.height}`);
const starsBlinkColorArr = [135, 132, 227];
const starsArreaDimensions = { width: appWindow.width, height: appWindow.height };
const backgroundImage = { imageElement: new Image() };
const foregroundImage = { imageElement: new Image() };
let appDotsArray;
let appPlanetDot;
let starsBlinkBlindArrea;
let starMaxSize;
let starsCountIncrease;

// coordinates here depend on the background image
switch (appWindow.mode) {
  case 'mobile':
    backgroundImage.imageElement.src = SpaceMobile;
    starMaxSize = 1.3;
    starsCountIncrease = 1;
    starsBlinkBlindArrea = {
      xCoord: 229, yCoord: 114, xDim: 57, yDim: 57,
    };
    foregroundImage.imageElement.src = PlanetMobile;
    foregroundImage.imageCoordX = -21;
    foregroundImage.imageCoordY = -142;
    appDotsArray = dotsArrayVariants.mobile;
    appPlanetDot = planetDotVariants.mobile;
    break;
  case 'tablet':
    backgroundImage.imageElement.src = SpaceTablet;
    starMaxSize = 1.8;
    starsCountIncrease = 1;
    starsBlinkBlindArrea = {
      xCoord: 409, yCoord: 292, xDim: 123, yDim: 123,
    };
    foregroundImage.imageElement.src = PlanetTablet;
    foregroundImage.imageCoordX = 0;
    foregroundImage.imageCoordY = -285;
    appDotsArray = dotsArrayVariants.tablet;
    appPlanetDot = planetDotVariants.tablet;
    break;
  default:
    backgroundImage.imageElement.src = SpaceDesktop;
    starMaxSize = 2.2;
    starsCountIncrease = 2;
    starsBlinkBlindArrea = {
      xCoord: 1125, yCoord: 254, xDim: 123, yDim: 123,
    };
    foregroundImage.imageElement.src = PlanetDesktop;
    foregroundImage.imageCoordX = 108;
    foregroundImage.imageCoordY = -175;
    appDotsArray = dotsArrayVariants.desktop;
    appPlanetDot = planetDotVariants.desktop;
    break;
}

appPlanetDot.x += appWindow.width / 2;
appPlanetDot.y += appWindow.height / 2;

backgroundImage.imageElement.onload = () => {
  backgroundImage.imageCoordX = (appWindow.width - backgroundImage.imageElement.width) / 2;
  backgroundImage.imageCoordY = (appWindow.height - backgroundImage.imageElement.height) / 2;
  starsBlinkBlindArrea.xCoord += backgroundImage.imageCoordX;
  starsBlinkBlindArrea.yCoord += backgroundImage.imageCoordY;
};

foregroundImage.imageElement.onload = () => {
  foregroundImage.imageCoordX += appWindow.width / 2;
  foregroundImage.imageCoordY += appWindow.height / 2;
};

function getDotsData() {
  const dotsArray = [];
  for (let i = 0; i < appDotsArray.length; i += 1) {
    dotsArray.push(new AniDot(appDotsArray[i], ctx));
  }
  dotsArray.push(new AniDot(appPlanetDot, ctx));
  return dotsArray;
}

const asteroidsScreen = new AnimatedDots(
  {
    backgroundImage,
    foregroundImage,
    dotsArray: getDotsData(),
    gravityValue: 1,
  },
  ctx,
  function animationFn() {
    this.drawBackground();
    this.starsBlink(
      starsCountIncrease,
      starsArreaDimensions,
      starsBlinkBlindArrea,
      starsBlinkColorArr,
      starMaxSize,
    );
    this.drawForeground();
    this.scheduleAnimation();
  },
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
      asteroidsScreen.starsBlink(
        starsCountIncrease,
        starsArreaDimensions,
        starsBlinkBlindArrea,
        starsBlinkColorArr,
        starMaxSize,
      );
      asteroidsScreen.drawForeground();
      asteroidsScreen.scheduleAnimation();
    };
  });

  boostButton.addEventListener('click', () => {
    boostButton.blur();
    asteroidsScreen.animationFn();
  });
}

window.addEventListener('load', onAppLoad);
document.addEventListener('keydown', (evt) => {
  // eslint-disable-next-line no-console
  if (evt.key === 'Escape' || evt.key === 'Esc') console.log(asteroidsScreen);
});
