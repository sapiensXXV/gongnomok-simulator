import * as util from "./util.js";
import {reduceCount} from "./util.js";

const tenPercentButton =  document.getElementById('work-glove-10-percent-button')
const sixtyPercentButton =  document.getElementById('work-glove-60-percent-button')
const hundredPercentButton =  document.getElementById('work-glove-100-percent-button')
const resetButton = document.getElementById('work-glove-reset-button')

let defaultAtk = 0

let gloveImgPath = '../img/weapon/work-glove.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';
let timer = null;

tenPercentButton.addEventListener('click', function () {
    if (!checkAvailableCount()) return;
    if (util.getRandomResult(10)) {
        success(3);
    } else {
        fail()
    }
});

sixtyPercentButton.addEventListener('click', function () {
    if (!checkAvailableCount()) return;
    if (util.getRandomResult(60)) {
        success(2);
    } else {
        fail()
    }
});

hundredPercentButton.addEventListener('click', function () {
    if (!checkAvailableCount()) return;
    success(1);
});

resetButton.addEventListener('click', function () {
    resetItem();
});

function success(atk) {
    console.log('scroll success');
    let gloveAtkElem = document.getElementById('work-glove-power')
    let gloveAtkInfoElem = document.getElementById('work-glove-power-text')
    let upgradedCntElem = document.getElementById('work-glove-upgraded-count');
    let titleElem = document.getElementById('work-glove-title')
    let titleAdditionalElem = document.getElementById('work-glove-additional');
    let availableCnt = document.getElementById('work-glove-upgrade-available-count');

    gloveAtkElem.textContent = (parseInt(gloveAtkElem.textContent) + atk).toString()
    gloveAtkInfoElem.hidden = false;
    titleAdditionalElem.hidden = false;

    upgradedCntElem.textContent = (parseInt(upgradedCntElem.textContent) + 1).toString();
    util.changeColor(titleElem, parseInt(gloveAtkElem.textContent) - defaultAtk);
    util.playSuccessSound();
    reduceCount(availableCnt)

    playSuccessEffect()
}

function fail() {
    console.log('scroll fail');
    let availableCnt = document.getElementById('work-glove-upgrade-available-count')
    util.playFailureSound();
    reduceCount(availableCnt)
    playFailEffect()
}

function resetItem() {
    let atkElem = document.getElementById('work-glove-power')
    let atkInfoElem = document.getElementById('work-glove-power-text')
    let availableCntElem = document.getElementById('work-glove-upgrade-available-count')
    let upgradedCntElem = document.getElementById('work-glove-upgraded-count');
    let titleAdditionalObject = document.getElementById('work-glove-additional');
    let titleElem = document.getElementById('work-glove-title')

    // changeColor(workGloveTitle, 0)
    util.changeColor(titleElem, 0);
    atkElem.textContent = '0'
    atkInfoElem.hidden = true
    availableCntElem.textContent = '5'
    upgradedCntElem.textContent = '0'
    titleAdditionalObject.hidden = true
}

function checkAvailableCount() {
    let availableCount = document.getElementById('work-glove-upgrade-available-count');
    if (parseInt(availableCount.textContent) <= 0) {
        alert('강화 횟수를 초과하였습니다');
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('work-glove-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = gloveImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('work-glove-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = gloveImgPath
        gifImg.hidden = true;
    }, 1000);
}

