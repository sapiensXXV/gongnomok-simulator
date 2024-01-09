import * as util from "../util.js";
import {reduceCount} from "../util.js";

/**
 * 주문서 버튼
 */
let tenPercentButton =  document.getElementById('work-glove-10-percent-button')
let sixtyPercentButton =  document.getElementById('work-glove-60-percent-button')
let hundredPercentButton =  document.getElementById('work-glove-100-percent-button')
let resetButton = document.getElementById('work-glove-reset-button')

let defaultAtk = 0

let gloveImgPath = '../img/weapon/work-glove.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';
let timer = null;

/**
* 주문서 시도 횟수
*/
let workGloveTenTrial = 0;
let workGloveSixtyTrial = 0;
let workGloveHundredTrial = 0;

tenPercentButton.addEventListener('click', function () {
    if (!checkAvailableCount()) return;

    if (util.getRandomResult(10)) {
        success(3, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('work-glove-10-used-cnt');
    workGloveTenTrial++;
    usedCnt.textContent = workGloveTenTrial.toString();
    recalculateWorkGloveTotalPrice();
});

sixtyPercentButton.addEventListener('click', function () {
    if (!checkAvailableCount()) return;
    if (util.getRandomResult(60)) {
        success(2, 60);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('work-glove-60-used-cnt');
    workGloveSixtyTrial++;
    usedCnt.textContent = workGloveSixtyTrial.toString();
    recalculateWorkGloveTotalPrice();
});

hundredPercentButton.addEventListener('click', function () {
    if (!checkAvailableCount()) return;
    success(1, 100);

    let usedCnt = document.getElementById('work-glove-100-used-cnt');
    workGloveHundredTrial++;
    usedCnt.textContent = workGloveHundredTrial.toString();
    recalculateWorkGloveTotalPrice();
});

resetButton.addEventListener('click', function () {
    resetItem();
});

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

/**
 * function
 */

function success(atk, percent) {
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
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('work-glove-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('work-glove-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('work-glove-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}

function fail() {
    console.log('scroll fail');
    let availableCnt = document.getElementById('work-glove-upgrade-available-count')
    util.playFailureSound();
    reduceCount(availableCnt)
    playFailEffect()
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

/**
 * 주문서 총 사용가격관련 로직
 */
let workGloveTenInput = document.getElementById('work-glove-10-price'); // 10퍼센트 가격
let workGloveSixtyInput = document.getElementById('work-glove-60-price'); // 60퍼센트 가격
let workGloveHundredInput = document.getElementById('work-glove-100-price'); // 100퍼센트 가격
let workGlovePriceResetBtn = document.getElementById('work-glove-price-reset-btn') // 리셋 버튼

workGloveTenInput.oninput = () => {
    recalculateWorkGloveTotalPrice();
}

workGloveSixtyInput.oninput = () => {
    recalculateWorkGloveTotalPrice();
}

workGloveHundredInput.oninput = () => {
    recalculateWorkGloveTotalPrice();
}

/**
 * 가격 리셋 로직
 */
workGlovePriceResetBtn.addEventListener('click', function () {
    resetWorkGlovePrice()
});

function resetWorkGlovePrice() {
    let tenSuccessCnt = document.getElementById('work-glove-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('work-glove-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('work-glove-100-success-cnt');
    let tenUsedCnt = document.getElementById('work-glove-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('work-glove-60-used-cnt');
    let hundredUsedCnt = document.getElementById('work-glove-100-used-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';

    workGloveTenTrial = 0;
    workGloveSixtyTrial = 0;
    workGloveHundredTrial = 0;
    recalculateWorkGloveTotalPrice();
}

function recalculateWorkGloveTotalPrice() {
    let tenInputElem = document.getElementById('work-glove-10-price');
    let sixtyInputElem = document.getElementById('work-glove-60-price');
    let hundredInputElem = document.getElementById('work-glove-100-price');
    let usedPriceElem = document.getElementById('work-glove-total-used-price');

    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        tenInput * workGloveTenTrial +
        sixtyInput * workGloveSixtyTrial +
        hundredInput * workGloveHundredTrial
    ).toLocaleString();
}


