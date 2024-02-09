import * as util from "../../../global/util.js";

// 속성 값들
let defaultDex = 0;
let defaultInt = 0;
let defaultHp = 0;
let defaultLuk = 0;
let defaultMgDef = 35;
let defaultAvailableCount = 5;

let holyCrossEarringHealthImgPath = '../img/item/accessories/holy-cross-earring.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('holy-cross-earring-health-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('holy-cross-earring-health-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('holy-cross-earring-health-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('holy-cross-earring-health-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('holy-cross-earring-health-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('holy-cross-earring-health-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('holy-cross-earring-health-10-percent-button');
let sixtyPerBtn = document.getElementById('holy-cross-earring-health-60-percent-button');
let hundredPerBtn = document.getElementById('holy-cross-earring-health-100-percent-button');
let resetBtn = document.getElementById('holy-cross-earring-health-reset-button');

// 아이템 구매 횟수
let holyCrossEarringHealthCnt = 1;

// 주문서 시도 횟수
let holyCrossEarringHealthTenTrial = 0;
let holyCrossEarringHealthSixtyTrial = 0;
let holyCrossEarringHealthHundredTrial = 0;

// 가격 관련 input, button
let holyCrossEarringHealthPriceInput = document.getElementById('holy-cross-earring-health-price'); // 아이템 가격
let holyCrossEarringHealthTenInput = document.getElementById('holy-cross-earring-health-10-price'); // 10퍼센트 가격
let holyCrossEarringHealthSixtyInput = document.getElementById('holy-cross-earring-health-60-price'); // 60퍼센트 가격
let holyCrossEarringHealthHundredInput = document.getElementById('holy-cross-earring-health-100-price'); // 100퍼센트 가격
let holyCrossEarringHealthPriceResetBtn = document.getElementById('holy-cross-earring-health-price-reset-btn') // 리셋 버튼

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
        resetHolyCrossEarringHealthPrice();
        holyCrossEarringHealthPriceResetBtn.focus();
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
        holyCrossEarringHealthPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
holyCrossEarringHealthPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { holyCrossEarringHealthPriceResetBtn.blur() }

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
    if (!checkAvailableCount()) return
    if (util.getRandomResult(10)) {
        success(30, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('holy-cross-earring-health-10-used-cnt');
    holyCrossEarringHealthTenTrial++;
    usedCnt.textContent = holyCrossEarringHealthTenTrial.toString();
    recalculateHolyCrossEarringHealthTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(15, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('holy-cross-earring-health-60-used-cnt');
    holyCrossEarringHealthSixtyTrial++;
    usedCnt.textContent = holyCrossEarringHealthSixtyTrial.toString();
    recalculateHolyCrossEarringHealthTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(5, 100);

    let usedCnt = document.getElementById('holy-cross-earring-health-100-used-cnt');
    holyCrossEarringHealthHundredTrial++;
    usedCnt.textContent = holyCrossEarringHealthHundredTrial.toString();
    recalculateHolyCrossEarringHealthTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-health-mg-def');
    defaultMgDef = 35
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-health-mg-def');
    defaultMgDef = 36
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-health-mg-def');
    defaultMgDef = 37
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-health-mg-def');
    defaultMgDef = 38
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-health-mg-def');
    defaultMgDef = 39
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let mgDef = document.getElementById('holy-cross-earring-health-mg-def'); // 마법방어력
    let hpV = document.getElementById('holy-cross-earring-health-hp');

    let hpInfo = document.getElementById('holy-cross-earring-health-hp-info');

    let availableCnt = document.getElementById('holy-cross-earring-health-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('holy-cross-earring-health-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('holy-cross-earring-health-additional');

    mgDef.textContent = defaultMgDef.toString();
    hpV.textContent = defaultHp.toString();
    hpInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addHolyCrossEarringHealthBuyCnt()
    }

    let title = document.getElementById('holy-cross-earring-health-title');
    let alertTxt = document.getElementById('holy-cross-earring-health-available-alert-txt');
    util.changeColor(title, parseInt(hpV.textContent) - defaultHp)
    alertTxt.hidden = true;
}

function success(hp, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('holy-cross-earring-health-upgraded-count');
    let additionalElem = document.getElementById('holy-cross-earring-health-additional');
    let title = document.getElementById('holy-cross-earring-health-title');
    let availableCount = document.getElementById('holy-cross-earring-health-upgrade-available-count');

    let hpElem = document.getElementById('holy-cross-earring-health-hp');
    let hpInfoElem = document.getElementById('holy-cross-earring-health-hp-info')

    hpElem.textContent = (parseInt(hpElem.textContent) + hp).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, (parseInt(hpElem.textContent) - defaultHp) / 10)
    additionalElem.hidden = false;

    if (parseInt(hpElem.textContent) !== 0) {
        hpInfoElem.hidden = false;
    }

    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('holy-cross-earring-health-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('holy-cross-earring-health-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('holy-cross-earring-health-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('holy-cross-earring-health-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('holy-cross-earring-health-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('holy-cross-earring-health-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('holy-cross-earring-health-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = holyCrossEarringHealthImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('holy-cross-earring-health-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = holyCrossEarringHealthImgPath
        gifImg.hidden = true;
    }, 1000);
}



holyCrossEarringHealthPriceInput.oninput = () => {
    recalculateHolyCrossEarringHealthTotalPrice()
}

holyCrossEarringHealthTenInput.oninput = () => {
    recalculateHolyCrossEarringHealthTotalPrice();
}

holyCrossEarringHealthSixtyInput.oninput = () => {
    recalculateHolyCrossEarringHealthTotalPrice();
}

holyCrossEarringHealthHundredInput.oninput = () => {
    recalculateHolyCrossEarringHealthTotalPrice();
}

function recalculateHolyCrossEarringHealthTotalPrice() {
    let holyCrossEarringHealthPriceInputElem = document.getElementById('holy-cross-earring-health-price');
    let tenInputElem = document.getElementById('holy-cross-earring-health-10-price');
    let sixtyInputElem = document.getElementById('holy-cross-earring-health-60-price');
    let hundredInputElem = document.getElementById('holy-cross-earring-health-100-price');
    let usedPriceElem = document.getElementById('holy-cross-earring-health-total-used-price');

    let price = parseInt(holyCrossEarringHealthPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * holyCrossEarringHealthCnt +
        (
            tenInput * holyCrossEarringHealthTenTrial +
            sixtyInput * holyCrossEarringHealthSixtyTrial +
            hundredInput *
            holyCrossEarringHealthHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
holyCrossEarringHealthPriceResetBtn.addEventListener('click', function () {
    resetHolyCrossEarringHealthPrice()
});

function resetHolyCrossEarringHealthPrice() {
    let tenSuccessCnt = document.getElementById('holy-cross-earring-health-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('holy-cross-earring-health-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('holy-cross-earring-health-100-success-cnt');
    let tenUsedCnt = document.getElementById('holy-cross-earring-health-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('holy-cross-earring-health-60-used-cnt');
    let hundredUsedCnt = document.getElementById('holy-cross-earring-health-100-used-cnt');
    let itemCnt = document.getElementById('holy-cross-earring-health-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    holyCrossEarringHealthTenTrial = 0;
    holyCrossEarringHealthSixtyTrial = 0;
    holyCrossEarringHealthHundredTrial = 0;
    holyCrossEarringHealthCnt = 1;

    recalculateHolyCrossEarringHealthTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addHolyCrossEarringHealthBuyCnt() {
    let buyCnt = document.getElementById('holy-cross-earring-health-cnt');
    holyCrossEarringHealthCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = holyCrossEarringHealthCnt.toString();
    recalculateHolyCrossEarringHealthTotalPrice();
}