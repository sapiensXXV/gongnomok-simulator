import * as util from "../../../global/util.js";

// 속성 값들
let defaultDex = 0;
let defaultInt = 0;
let defaultHp = 0;
let defaultLuk = 0;
let defaultMgDef = 35;
let defaultAvailableCount = 5;

let holyCrossEarringDexImgPath = '../img/item/accessories/holy-cross-earring.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('holy-cross-earring-swift-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('holy-cross-earring-swift-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('holy-cross-earring-swift-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('holy-cross-earring-swift-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('holy-cross-earring-swift-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('holy-cross-earring-swift-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('holy-cross-earring-swift-10-percent-button');
let sixtyPerBtn = document.getElementById('holy-cross-earring-swift-60-percent-button');
let hundredPerBtn = document.getElementById('holy-cross-earring-swift-100-percent-button');
let resetBtn = document.getElementById('holy-cross-earring-swift-reset-button');

// 아이템 구매 횟수
let holyCrossEarringDexCnt = 1;

// 주문서 시도 횟수
let holyCrossEarringDexTenTrial = 0;
let holyCrossEarringDexSixtyTrial = 0;
let holyCrossEarringDexHundredTrial = 0;

// 가격 관련 input, button
let holyCrossEarringDexPriceInput = document.getElementById('holy-cross-earring-swift-price'); // 아이템 가격
let holyCrossEarringDexTenInput = document.getElementById('holy-cross-earring-swift-10-price'); // 10퍼센트 가격
let holyCrossEarringDexSixtyInput = document.getElementById('holy-cross-earring-swift-60-price'); // 60퍼센트 가격
let holyCrossEarringDexHundredInput = document.getElementById('holy-cross-earring-swift-100-price'); // 100퍼센트 가격
let holyCrossEarringDexPriceResetBtn = document.getElementById('holy-cross-earring-swift-price-reset-btn') // 리셋 버튼

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
        resetHolyCrossEarringDexPrice();
        holyCrossEarringDexPriceResetBtn.focus();
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
        holyCrossEarringDexPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
holyCrossEarringDexPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { holyCrossEarringDexPriceResetBtn.blur() }

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
        success(3, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('holy-cross-earring-swift-10-used-cnt');
    holyCrossEarringDexTenTrial++;
    usedCnt.textContent = holyCrossEarringDexTenTrial.toString();
    recalculateHolyCrossEarringDexTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('holy-cross-earring-swift-60-used-cnt');
    holyCrossEarringDexSixtyTrial++;
    usedCnt.textContent = holyCrossEarringDexSixtyTrial.toString();
    recalculateHolyCrossEarringDexTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 100);

    let usedCnt = document.getElementById('holy-cross-earring-swift-100-used-cnt');
    holyCrossEarringDexHundredTrial++;
    usedCnt.textContent = holyCrossEarringDexHundredTrial.toString();
    recalculateHolyCrossEarringDexTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-swift-mg-def');
    defaultMgDef = 35
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-swift-mg-def');
    defaultMgDef = 36
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-swift-mg-def');
    defaultMgDef = 37
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-swift-mg-def');
    defaultMgDef = 38
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let mgDef = document.getElementById('holy-cross-earring-swift-mg-def');
    defaultMgDef = 39
    resetItem(false);
    mgDef.textContent = defaultMgDef.toString();
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let mgDef = document.getElementById('holy-cross-earring-swift-mg-def'); // 마법공격력
    let dexV = document.getElementById('holy-cross-earring-swift-dex'); // dex

    let dexInfo = document.getElementById('holy-cross-earring-swift-dex-info'); // dex info

    let availableCnt = document.getElementById('holy-cross-earring-swift-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('holy-cross-earring-swift-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('holy-cross-earring-swift-additional');

    mgDef.textContent = defaultMgDef.toString();
    dexV.textContent = defaultDex.toString();
    dexInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addHolyCrossEarringDexBuyCnt()
    }

    let title = document.getElementById('holy-cross-earring-swift-title');
    let alertTxt = document.getElementById('holy-cross-earring-swift-available-alert-txt');
    util.changeColor(title, parseInt(dexV.textContent) - defaultDex)
    alertTxt.hidden = true;
}

function success(dex, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('holy-cross-earring-swift-upgraded-count');
    let additionalElem = document.getElementById('holy-cross-earring-swift-additional');
    let title = document.getElementById('holy-cross-earring-swift-title');
    let availableCount = document.getElementById('holy-cross-earring-swift-upgrade-available-count');

    let dexElem = document.getElementById('holy-cross-earring-swift-dex');
    let dexInfoElem = document.getElementById('holy-cross-earring-swift-dex-info')

    dexElem.textContent = (parseInt(dexElem.textContent) + dex).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(dexElem.textContent) - defaultDex)
    additionalElem.hidden = false;

    if (parseInt(dexElem.textContent) !== 0) {
        dexInfoElem.hidden = false;
    }

    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('holy-cross-earring-swift-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('holy-cross-earring-swift-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('holy-cross-earring-swift-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('holy-cross-earring-swift-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('holy-cross-earring-swift-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('holy-cross-earring-swift-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('holy-cross-earring-swift-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = holyCrossEarringDexImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('holy-cross-earring-swift-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = holyCrossEarringDexImgPath
        gifImg.hidden = true;
    }, 1000);
}



holyCrossEarringDexPriceInput.oninput = () => {
    recalculateHolyCrossEarringDexTotalPrice()
}

holyCrossEarringDexTenInput.oninput = () => {
    recalculateHolyCrossEarringDexTotalPrice();
}

holyCrossEarringDexSixtyInput.oninput = () => {
    recalculateHolyCrossEarringDexTotalPrice();
}

holyCrossEarringDexHundredInput.oninput = () => {
    recalculateHolyCrossEarringDexTotalPrice();
}

function recalculateHolyCrossEarringDexTotalPrice() {
    let holyCrossEarringDexPriceInputElem = document.getElementById('holy-cross-earring-swift-price');
    let tenInputElem = document.getElementById('holy-cross-earring-swift-10-price');
    let sixtyInputElem = document.getElementById('holy-cross-earring-swift-60-price');
    let hundredInputElem = document.getElementById('holy-cross-earring-swift-100-price');
    let usedPriceElem = document.getElementById('holy-cross-earring-swift-total-used-price');

    let price = parseInt(holyCrossEarringDexPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * holyCrossEarringDexCnt +
        (
            tenInput * holyCrossEarringDexTenTrial +
            sixtyInput * holyCrossEarringDexSixtyTrial +
            hundredInput *
            holyCrossEarringDexHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
holyCrossEarringDexPriceResetBtn.addEventListener('click', function () {
    resetHolyCrossEarringDexPrice()
});

function resetHolyCrossEarringDexPrice() {
    let tenSuccessCnt = document.getElementById('holy-cross-earring-swift-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('holy-cross-earring-swift-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('holy-cross-earring-swift-100-success-cnt');
    let tenUsedCnt = document.getElementById('holy-cross-earring-swift-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('holy-cross-earring-swift-60-used-cnt');
    let hundredUsedCnt = document.getElementById('holy-cross-earring-swift-100-used-cnt');
    let itemCnt = document.getElementById('holy-cross-earring-swift-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    holyCrossEarringDexTenTrial = 0;
    holyCrossEarringDexSixtyTrial = 0;
    holyCrossEarringDexHundredTrial = 0;
    holyCrossEarringDexCnt = 1;

    recalculateHolyCrossEarringDexTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addHolyCrossEarringDexBuyCnt() {
    let buyCnt = document.getElementById('holy-cross-earring-swift-cnt');
    holyCrossEarringDexCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = holyCrossEarringDexCnt.toString();
    recalculateHolyCrossEarringDexTotalPrice();
}