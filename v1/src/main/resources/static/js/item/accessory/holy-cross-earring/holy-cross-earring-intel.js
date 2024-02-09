import * as util from "../../../global/util.js";

// 속성 값들
let defaultDex = 0;
let defaultInt = 0;
let defaultHp = 0;
let defaultLuk = 0;
let defaultMgAtk = 0;
let defaultMgDef = 35;
let defaultAvailableCount = 5;

let holyCrossEarringIntelImgPath = '../img/item/accessories/holy-cross-earring.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('holy-cross-earring-intel-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('holy-cross-earring-intel-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('holy-cross-earring-intel-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('holy-cross-earring-intel-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('holy-cross-earring-intel-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('holy-cross-earring-intel-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('holy-cross-earring-intel-10-percent-button');
let sixtyPerBtn = document.getElementById('holy-cross-earring-intel-60-percent-button');
let hundredPerBtn = document.getElementById('holy-cross-earring-intel-100-percent-button');
let resetBtn = document.getElementById('holy-cross-earring-intel-reset-button');

// 아이템 구매 횟수
let holyCrossEarringIntelCnt = 1;

// 주문서 시도 횟수
let holyCrossEarringIntelTenTrial = 0;
let holyCrossEarringIntelSixtyTrial = 0;
let holyCrossEarringIntelHundredTrial = 0;

// 가격 관련 input, button
let holyCrossEarringIntelPriceInput = document.getElementById('holy-cross-earring-intel-price'); // 아이템 가격
let holyCrossEarringIntelTenInput = document.getElementById('holy-cross-earring-intel-10-price'); // 10퍼센트 가격
let holyCrossEarringIntelSixtyInput = document.getElementById('holy-cross-earring-intel-60-price'); // 60퍼센트 가격
let holyCrossEarringIntelHundredInput = document.getElementById('holy-cross-earring-intel-100-price'); // 100퍼센트 가격
let holyCrossEarringIntelPriceResetBtn = document.getElementById('holy-cross-earring-intel-price-reset-btn') // 리셋 버튼

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
        resetHolyCrossEarringIntelPrice();
        holyCrossEarringIntelPriceResetBtn.focus();
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
        holyCrossEarringIntelPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
holyCrossEarringIntelPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { holyCrossEarringIntelPriceResetBtn.blur() }

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
        success(5, 3, 1, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('holy-cross-earring-intel-10-used-cnt');
    holyCrossEarringIntelTenTrial++;
    usedCnt.textContent = holyCrossEarringIntelTenTrial.toString();
    recalculateHolyCrossEarringIntelTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('holy-cross-earring-intel-60-used-cnt');
    holyCrossEarringIntelSixtyTrial++;
    usedCnt.textContent = holyCrossEarringIntelSixtyTrial.toString();
    recalculateHolyCrossEarringIntelTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 10);

    let usedCnt = document.getElementById('holy-cross-earring-intel-100-used-cnt');
    holyCrossEarringIntelHundredTrial++;
    usedCnt.textContent = holyCrossEarringIntelHundredTrial.toString();
    recalculateHolyCrossEarringIntelTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-intel-mg-def');
    defaultMgDef = 35
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-intel-mg-def');
    defaultMgDef = 36
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-intel-mg-def');
    defaultMgDef = 37
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-intel-mg-def');
    defaultMgDef = 38
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-intel-mg-def');
    defaultMgDef = 39
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let intV = document.getElementById('holy-cross-earring-intel-int');
    let mgAtk = document.getElementById('holy-cross-earring-intel-mg-atk');
    let mgDef = document.getElementById('holy-cross-earring-intel-mg-def');

    let mgAtkInfo = document.getElementById('holy-cross-earring-intel-mg-atk-info');
    let intInfo = document.getElementById('holy-cross-earring-intel-int-info');

    let availableCnt = document.getElementById('holy-cross-earring-intel-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('holy-cross-earring-intel-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('holy-cross-earring-intel-additional');

    mgAtk.textContent = defaultMgAtk.toString();
    mgDef.textContent = defaultMgDef.toString();
    intV.textContent = defaultInt.toString();

    mgAtkInfo.hidden = true; intInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addHolyCrossEarringIntelBuyCnt()
    }

    let title = document.getElementById('holy-cross-earring-intel-title');
    let alertTxt = document.getElementById('holy-cross-earring-intel-available-alert-txt');
    util.changeColor(title, parseInt(mgAtk.textContent) - defaultMgAtk)
    alertTxt.hidden = true;
}

function success(mgAtk, int, mgDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('holy-cross-earring-intel-upgraded-count');
    let additionalElem = document.getElementById('holy-cross-earring-intel-additional');
    let title = document.getElementById('holy-cross-earring-intel-title');
    let availableCount = document.getElementById('holy-cross-earring-intel-upgrade-available-count');

    let intElem = document.getElementById('holy-cross-earring-intel-int');
    let mgAtkElem = document.getElementById('holy-cross-earring-intel-mg-atk');
    let mgDefElem = document.getElementById('holy-cross-earring-intel-mg-def');

    let intInfoElem = document.getElementById('holy-cross-earring-intel-int-info')
    let mgAtkInfoElem = document.getElementById('holy-cross-earring-intel-mg-atk-info')

    mgAtkElem.textContent = (parseInt(mgAtkElem.textContent) + mgAtk).toString();
    intElem.textContent = (parseInt(intElem.textContent) + int).toString();
    mgDefElem.textContent = (parseInt(mgDefElem.textContent) + mgDef).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(mgAtkElem.textContent) - defaultMgAtk)
    additionalElem.hidden = false;

    if (parseInt(intElem.textContent) !== 0) {
        intInfoElem.hidden = false;
    }
    if (parseInt(mgAtkElem.textContent) !== 0) {
        mgAtkInfoElem.hidden = false;
    }

    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('holy-cross-earring-intel-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('holy-cross-earring-intel-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('holy-cross-earring-intel-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('holy-cross-earring-intel-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('holy-cross-earring-intel-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('holy-cross-earring-intel-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('holy-cross-earring-intel-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = holyCrossEarringIntelImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('holy-cross-earring-intel-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = holyCrossEarringIntelImgPath
        gifImg.hidden = true;
    }, 1000);
}



holyCrossEarringIntelPriceInput.oninput = () => {
    recalculateHolyCrossEarringIntelTotalPrice()
}

holyCrossEarringIntelTenInput.oninput = () => {
    recalculateHolyCrossEarringIntelTotalPrice();
}

holyCrossEarringIntelSixtyInput.oninput = () => {
    recalculateHolyCrossEarringIntelTotalPrice();
}

holyCrossEarringIntelHundredInput.oninput = () => {
    recalculateHolyCrossEarringIntelTotalPrice();
}

function recalculateHolyCrossEarringIntelTotalPrice() {
    let holyCrossEarringIntelPriceInputElem = document.getElementById('holy-cross-earring-intel-price');
    let tenInputElem = document.getElementById('holy-cross-earring-intel-10-price');
    let sixtyInputElem = document.getElementById('holy-cross-earring-intel-60-price');
    let hundredInputElem = document.getElementById('holy-cross-earring-intel-100-price');
    let usedPriceElem = document.getElementById('holy-cross-earring-intel-total-used-price');

    let price = parseInt(holyCrossEarringIntelPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * holyCrossEarringIntelCnt +
        (
            tenInput * holyCrossEarringIntelTenTrial +
            sixtyInput * holyCrossEarringIntelSixtyTrial +
            hundredInput *
            holyCrossEarringIntelHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
holyCrossEarringIntelPriceResetBtn.addEventListener('click', function () {
    resetHolyCrossEarringIntelPrice()
});

function resetHolyCrossEarringIntelPrice() {
    let tenSuccessCnt = document.getElementById('holy-cross-earring-intel-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('holy-cross-earring-intel-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('holy-cross-earring-intel-100-success-cnt');
    let tenUsedCnt = document.getElementById('holy-cross-earring-intel-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('holy-cross-earring-intel-60-used-cnt');
    let hundredUsedCnt = document.getElementById('holy-cross-earring-intel-100-used-cnt');
    let itemCnt = document.getElementById('holy-cross-earring-intel-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    holyCrossEarringIntelTenTrial = 0;
    holyCrossEarringIntelSixtyTrial = 0;
    holyCrossEarringIntelHundredTrial = 0;
    holyCrossEarringIntelCnt = 1;

    recalculateHolyCrossEarringIntelTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addHolyCrossEarringIntelBuyCnt() {
    let buyCnt = document.getElementById('holy-cross-earring-intel-cnt');
    holyCrossEarringIntelCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = holyCrossEarringIntelCnt.toString();
    recalculateHolyCrossEarringIntelTotalPrice();
}