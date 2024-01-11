import * as util from "../../global/util.js";

let blueRobeLuckyImgPath = '../img/weapon/blue-sauna-robe.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 주문서 버튼
let tenPerBtn = document.getElementById('blue-robe-lucky-10-percent-button');
let sixtyPerBtn = document.getElementById('blue-robe-lucky-60-percent-button');
let hundredPerBtn = document.getElementById('blue-robe-lucky-100-percent-button');
let resetBtn = document.getElementById('blue-robe-lucky-reset-button');

// 아이템 구매 횟수
let blueRobeLuckyCnt = 1;

// 주문서 시도 횟수
let blueRobeLuckyTenTrial = 0;
let blueRobeLuckySixtyTrial = 0;
let blueRobeLuckyHundredTrial = 0;

// 가격 관련 input, button
let blueRobeLuckyPriceInput = document.getElementById('blue-robe-lucky-price'); // 아이템 가격
let blueRobeLuckyTenInput = document.getElementById('blue-robe-lucky-10-price'); // 10퍼센트 가격
let blueRobeLuckySixtyInput = document.getElementById('blue-robe-lucky-60-price'); // 60퍼센트 가격
let blueRobeLuckyHundredInput = document.getElementById('blue-robe-lucky-100-price'); // 100퍼센트 가격
let blueRobeLuckyPriceResetBtn = document.getElementById('blue-robe-lucky-price-reset-btn') // 리셋 버튼

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
        resetBlueRobeLuckyPrice();
        blueRobeLuckyPriceResetBtn.focus();
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
        blueRobeLuckyPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
blueRobeLuckyPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { blueRobeLuckyPriceResetBtn.blur() }

/**
 * 주문서 버튼 이벤트 리스너
 */
tenPerBtn.addEventListener('click', tenPerBtnClicked);
sixtyPerBtn.addEventListener('click', sixtyPerBtnClicked);
hundredPerBtn.addEventListener('click', hundredPerBtnClicked);

function tenPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(10)) {
        success(5, 3, 1, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('blue-robe-lucky-10-used-cnt');
    blueRobeLuckyTenTrial++;
    usedCnt.textContent = blueRobeLuckyTenTrial.toString();
    reCalculateBlueRobeLuckyTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('blue-robe-lucky-60-used-cnt');
    blueRobeLuckySixtyTrial++;
    usedCnt.textContent = blueRobeLuckySixtyTrial.toString();
    reCalculateBlueRobeLuckyTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('blue-robe-lucky-100-used-cnt');
    blueRobeLuckyHundredTrial++;
    usedCnt.textContent = blueRobeLuckyHundredTrial.toString();
    reCalculateBlueRobeLuckyTotalPrice();
}

resetBtn.addEventListener('click', function () {
    resetItem(true);
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let lukElem = document.getElementById('blue-robe-lucky-luk-info');
    let accElem = document.getElementById('blue-robe-lucky-acc-info');
    let lukV = document.getElementById('blue-robe-lucky-luk');
    let avoV = document.getElementById('blue-robe-lucky-avo');
    let accV = document.getElementById('blue-robe-lucky-acc');
    let availableCnt = document.getElementById('blue-robe-lucky-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('blue-robe-lucky-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('blue-robe-lucky-additional');

    lukV.textContent = '0';
    accV.textContent = '0';
    avoV.textContent = '10'; // 회피율 기본값 10

    lukElem.hidden = true; accElem.hidden = true;

    availableCnt.textContent = '10' // 업그레이드 가능 횟수 기본 10
    upgradeSuccessCnt.textContent = '0'; // 업그레이드 성공 횟수 0
    additionalTitle.hidden = true
    if (isNew) {
        addBlueRobeLuckyBuyCnt()
    }

    let title = document.getElementById('blue-robe-lucky-title');
    let alertTxt = document.getElementById('blue-robe-lucky-available-alert-txt');
    util.changeColor(title, parseInt(lukV.textContent));
    alertTxt.hidden = true;
}

// DEX, 명중, 이동속도, 퍼센트
function success(luk, avo, acc, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('blue-robe-lucky-upgraded-count');
    let additionalElem = document.getElementById('blue-robe-lucky-additional');
    let title = document.getElementById('blue-robe-lucky-title');
    let availableCount = document.getElementById('blue-robe-lucky-upgrade-available-count');
    let lukElem = document.getElementById('blue-robe-lucky-luk');
    let accElem = document.getElementById('blue-robe-lucky-acc');
    let avoElem = document.getElementById('blue-robe-lucky-avo');

    let lukInfoElem = document.getElementById('blue-robe-lucky-luk-info');
    let accInfoElem = document.getElementById('blue-robe-lucky-acc-info');

    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    avoElem.textContent = (parseInt(avoElem.textContent) + avo).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(lukElem.textContent)) // 기본값이 0이므로 빼는 값이 없다
    additionalElem.hidden = false;

    if (parseInt(lukElem.textContent) !== 0) {
        lukInfoElem.hidden = false;
    }

    if (parseInt(accElem.textContent) !== 0) {
        accInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('blue-robe-lucky-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('blue-robe-lucky-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('blue-robe-lucky-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('blue-robe-lucky-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('blue-robe-lucky-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('blue-robe-lucky-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('blue-robe-lucky-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = blueRobeLuckyImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('blue-robe-lucky-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = blueRobeLuckyImgPath
        gifImg.hidden = true;
    }, 1000);
}

blueRobeLuckyPriceInput.oninput = () => {
    reCalculateBlueRobeLuckyTotalPrice()
}

blueRobeLuckyTenInput.oninput = () => {
    reCalculateBlueRobeLuckyTotalPrice();
}

blueRobeLuckySixtyInput.oninput = () => {
    reCalculateBlueRobeLuckyTotalPrice();
}

blueRobeLuckyHundredInput.oninput = () => {
    reCalculateBlueRobeLuckyTotalPrice();
}

function reCalculateBlueRobeLuckyTotalPrice() {
    let blueRobeLuckyPriceInputElem = document.getElementById('blue-robe-lucky-price');
    let tenInputElem = document.getElementById('blue-robe-lucky-10-price');
    let sixtyInputElem = document.getElementById('blue-robe-lucky-60-price');
    let hundredInputElem = document.getElementById('blue-robe-lucky-100-price');
    let usedPriceElem = document.getElementById('blue-robe-lucky-total-used-price');

    let price = parseInt(blueRobeLuckyPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * blueRobeLuckyCnt +
        (
            tenInput * blueRobeLuckyTenTrial +
            sixtyInput * blueRobeLuckySixtyTrial +
            hundredInput *
            blueRobeLuckyHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
blueRobeLuckyPriceResetBtn.addEventListener('click', function () {
    resetBlueRobeLuckyPrice()
});

function resetBlueRobeLuckyPrice() {
    let tenSuccessCnt = document.getElementById('blue-robe-lucky-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('blue-robe-lucky-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('blue-robe-lucky-100-success-cnt');
    let tenUsedCnt = document.getElementById('blue-robe-lucky-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('blue-robe-lucky-60-used-cnt');
    let hundredUsedCnt = document.getElementById('blue-robe-lucky-100-used-cnt');
    let itemCnt = document.getElementById('blue-robe-lucky-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    blueRobeLuckyTenTrial = 0;
    blueRobeLuckySixtyTrial = 0;
    blueRobeLuckyHundredTrial = 0;
    blueRobeLuckyCnt = 1;

    reCalculateBlueRobeLuckyTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addBlueRobeLuckyBuyCnt() {
    let buyCnt = document.getElementById('blue-robe-lucky-cnt');
    blueRobeLuckyCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = blueRobeLuckyCnt.toString();
    reCalculateBlueRobeLuckyTotalPrice();
}