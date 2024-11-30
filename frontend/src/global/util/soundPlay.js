import {ASSETS_URL} from "../uri.js";

export function playFailureSound() {
  let failMp3 = new Audio(`${ASSETS_URL}/sound/fail.mp3`);
  failMp3.volume = 0.03;
  failMp3.currentTime = 0;
  failMp3.play();
}

export function playSuccessSound() {
  let failMp3 = new Audio(`${ASSETS_URL}/sound/success.mp3`);
  failMp3.volume = 0.03;
  failMp3.currentTime = 0;
  failMp3.play();
}

export function playPurchaseSound() {
  let sound = new Audio(`${ASSETS_URL}/sound/purchase.mp3`);
  sound.volume = 0.05;
  sound.currentTime = 0;
  sound.play();
}

export function playDiceSound() {
  let sound = new Audio(`${ASSETS_URL}/sound/dice.mp3`);
  sound.volume = 0.05;
  sound.currentTime = 0;
  sound.play();
}