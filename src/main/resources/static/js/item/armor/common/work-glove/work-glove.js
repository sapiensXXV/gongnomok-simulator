import * as util from "../../../../global/util.js";
import {reduceCount} from "../../../../global/util.js";

/**
 * 주문서 버튼
 */
let tenPerBtn =  document.getElementById('work-glove-10-percent-button')
let sixtyPerBtn =  document.getElementById('work-glove-60-percent-button')
let hundredPerBtn =  document.getElementById('work-glove-100-percent-button')
let resetBtn = document.getElementById('work-glove-reset-button')

let defaultAtk = 0

let gloveImgPath = '../img/weapon/work-glove.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';
let timer = null;

// 아이템 구매 횟수
let workGloveCnt = 1;

// 주문서 시도 횟수
let workGloveTenTrial = 0;
let workGloveSixtyTrial = 0;
let workGloveHundredTrial = 0;

// 가격관련 input, button
let workGlovePriceInput = document.getElementById('work-glove-price'); // 아이템 가격
let workGloveTenInput = document.getElementById('work-glove-10-price'); // 10퍼센트 가격
let workGloveSixtyInput = document.getElementById('work-glove-60-price'); // 60퍼센트 가격
let workGloveHundredInput = document.getElementById('work-glove-100-price'); // 100퍼센트 가격
let workGlovePriceResetBtn = document.getElementById('work-glove-price-reset-btn') // 리셋 버튼

/**
 * 핫키 이벤트 등록
 * - Q: 10% 주문서 적용
 * - W: 60% 주문서 적용
 * - E: 100% 주문서 적용
 * - R: 아이템 상태 초기화
 */
window.addEventListener('keydown', (e) => {
    let input = e.key;
    if (input === 'r' || input === 'R' || input === 'ㄱ' || input === 'ㄲ') {
        resetItem(true)
        resetBtn.focus();
    } else if (input === 'q' || input === 'Q' || input === 'ㅂ' || input === 'ㅃ') {
        tenPerBtnClicked()
        tenPerBtn.focus()
    } else if (input === 'w' || input === 'W' || input === 'ㅈ' || input === 'ㅉ') {
        sixtyPerBtnClicked()
        sixtyPerBtn.focus();
    } else if (input === 'e' || input === 'E' || input === 'ㄷ' || input === 'ㄸ') {
        hundredPerBtnClicked()
        hundredPerBtn.focus()
    } else if (input === 'f' || input === 'F' || input === 'ㄹ') {
        workGlovePriceResetBtn.focus();
    }
});

window.addEventListener('keyup', (e) => {
    let input = e.key;
    if (input === 'r' || input === 'R' || input === 'ㄱ' || input === 'ㄲ') {
        resetBtn.blur();
    } else if (input === 'q' || input === 'Q' || input === 'ㅂ' || input === 'ㅃ') {
        tenPerBtn.blur()
    } else if (input === 'w' || input === 'W' || input === 'ㅈ' || input === 'ㅉ') {
        sixtyPerBtn.blur();
    } else if (input === 'e' || input === 'E' || input === 'ㄷ' || input === 'ㄸ') {
        hundredPerBtn.blur()
    } else if (input === 'f' || input === 'F' || input === 'ㄹ') {
        workGlovePriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
workGlovePriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { workGlovePriceResetBtn.blur() }

/**
 * 주문서 버튼 이벤트 리스너
 */
tenPerBtn.addEventListener('click', tenPerBtnClicked);
sixtyPerBtn.addEventListener('click', sixtyPerBtnClicked);
hundredPerBtn.addEventListener('click', hundredPerBtnClicked);
resetBtn.addEventListener('click', function () {
    resetItem(true);
});

function tenPerBtnClicked() {
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
}

function sixtyPerBtnClicked() {
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
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return;
    success(1, 100);

    let usedCnt = document.getElementById('work-glove-100-used-cnt');
    workGloveHundredTrial++;
    usedCnt.textContent = workGloveHundredTrial.toString();
    recalculateWorkGloveTotalPrice();
}

export function resetItem(isNew) {
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

    if (isNew) {
        addWorkGloveBuyCnt();
    }

    let alertTxt = document.getElementById('work-glove-available-alert-txt');
    alertTxt.hidden = true;
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
    reduceCount(availableCnt);
    util.playFailureSound();
    playFailEffect()
}

function checkAvailableCount() {
    let availableCount = document.getElementById('work-glove-upgrade-available-count');
    let alertTxt = document.getElementById('work-glove-available-alert-txt');
    if (parseInt(availableCount.textContent) <= 0) {
        alertTxt.hidden = false;
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


workGlovePriceInput.oninput = () => {
    recalculateWorkGloveTotalPrice()
}

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
    let itemCnt = document.getElementById('work-glove-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    workGloveTenTrial = 0;
    workGloveSixtyTrial = 0;
    workGloveHundredTrial = 0;
    workGloveCnt = 1;

    recalculateWorkGloveTotalPrice();
}

function recalculateWorkGloveTotalPrice() {
    let workGlovePriceInputElem = document.getElementById('work-glove-price');
    let tenInputElem = document.getElementById('work-glove-10-price');
    let sixtyInputElem = document.getElementById('work-glove-60-price');
    let hundredInputElem = document.getElementById('work-glove-100-price');
    let usedPriceElem = document.getElementById('work-glove-total-used-price');

    let price = parseInt(workGlovePriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * workGloveCnt +
        (
            tenInput * workGloveTenTrial +
            sixtyInput * workGloveSixtyTrial +
            hundredInput * workGloveHundredTrial
        )
    ).toLocaleString();
}

/**
 * 구매 노가다 목장갑 개수 증가
 */
function addWorkGloveBuyCnt() {
    let buyCnt = document.getElementById('work-glove-cnt');
    workGloveCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = workGloveCnt.toString();
    recalculateWorkGloveTotalPrice();
}