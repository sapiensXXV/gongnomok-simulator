import * as util from "../../../../global/util.js";

// 속성 값들
let defaultStr = 0;
let defaultPhyAtk = 90;
let defaultPhyDef = 0;
let defaultAvailableCount = 7;

let heavenGateImgPath = '../img/item/weapon/heaven-gate.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('heaven-gate-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('heaven-gate-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('heaven-gate-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('heaven-gate-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('heaven-gate-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('heaven-gate-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('heaven-gate-10-percent-button');
let sixtyPerBtn = document.getElementById('heaven-gate-60-percent-button');
let hundredPerBtn = document.getElementById('heaven-gate-100-percent-button');
let resetBtn = document.getElementById('heaven-gate-reset-button');

// 아이템 구매 횟수
let heavenGateCnt = 1;

// 주문서 시도 횟수
let heavenGateTenTrial = 0;
let heavenGateSixtyTrial = 0;
let heavenGateHundredTrial = 0;

// 가격 관련 input, button
let heavenGatePriceInput = document.getElementById('heaven-gate-price'); // 아이템 가격
let heavenGateTenInput = document.getElementById('heaven-gate-10-price'); // 10퍼센트 가격
let heavenGateSixtyInput = document.getElementById('heaven-gate-60-price'); // 60퍼센트 가격
let heavenGateHundredInput = document.getElementById('heaven-gate-100-price'); // 100퍼센트 가격
let heavenGatePriceResetBtn = document.getElementById('heaven-gate-price-reset-btn') // 리셋 버튼

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
        resetHeavenGatePrice();
        heavenGatePriceResetBtn.focus();
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
        heavenGatePriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
heavenGatePriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { heavenGatePriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('heaven-gate-10-used-cnt');
    heavenGateTenTrial++;
    usedCnt.textContent = heavenGateTenTrial.toString();
    recalculateHeavenGateTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('heaven-gate-60-used-cnt');
    heavenGateSixtyTrial++;
    usedCnt.textContent = heavenGateSixtyTrial.toString();
    recalculateHeavenGateTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('heaven-gate-100-used-cnt');
    heavenGateHundredTrial++;
    usedCnt.textContent = heavenGateHundredTrial.toString();
    recalculateHeavenGateTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('heaven-gate-phy-atk');
    defaultPhyAtk = 90;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('heaven-gate-phy-atk');
    defaultPhyAtk = 91;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('heaven-gate-phy-atk');
    defaultPhyAtk = 92;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('heaven-gate-phy-atk');
    defaultPhyAtk = 93;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('heaven-gate-phy-atk');
    defaultPhyAtk = 94;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('heaven-gate-phy-atk');
    defaultPhyAtk = 95;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('heaven-gate-phy-atk'); // 물리공격력
    let strV = document.getElementById('heaven-gate-str'); // STR
    let strInfo = document.getElementById('heaven-gate-str-info'); // STR 정보 텍스트
    let phyDef = document.getElementById('heaven-gate-phy-def'); // 물리방어력
    let phyDefInfo = document.getElementById('heaven-gate-phy-def-info'); // 물리방어력 정보 텍스트
    let availableCnt = document.getElementById('heaven-gate-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('heaven-gate-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('heaven-gate-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    strV.textContent = defaultStr.toString()
    phyDef.textContent = defaultPhyDef.toString();

    strInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addHeavenGateBuyCnt()
    }

    let title = document.getElementById('heaven-gate-title');
    let alertTxt = document.getElementById('heaven-gate-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;

}

function success(phyAtk, strV, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('heaven-gate-upgraded-count');
    let additionalElem = document.getElementById('heaven-gate-additional');
    let title = document.getElementById('heaven-gate-title');
    let availableCount = document.getElementById('heaven-gate-upgrade-available-count');
    let phyAtkElem = document.getElementById('heaven-gate-phy-atk');

    let strElem = document.getElementById('heaven-gate-str');
    let strInfoElem = document.getElementById('heaven-gate-str-info');

    let phyDefElem = document.getElementById('heaven-gate-phy-def');
    let phyDefInfoElem = document.getElementById('heaven-gate-phy-def-info');


    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + phyAtk).toString();
    strElem.textContent = (parseInt(strElem.textContent) + strV).toString();
    phyDefElem.textContent = (parseInt(phyDefElem.textContent) + phyDef).toString();


    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(strElem.textContent) !== 0) {
        strInfoElem.hidden = false;
    }
    if (parseInt(phyDefElem.textContent) !== 0) {
        phyDefInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('heaven-gate-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('heaven-gate-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('heaven-gate-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('heaven-gate-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('heaven-gate-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('heaven-gate-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('heaven-gate-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = heavenGateImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('heaven-gate-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = heavenGateImgPath
        gifImg.hidden = true;
    }, 1000);
}



heavenGatePriceInput.oninput = () => {
    recalculateHeavenGateTotalPrice()
}

heavenGateTenInput.oninput = () => {
    recalculateHeavenGateTotalPrice();
}

heavenGateSixtyInput.oninput = () => {
    recalculateHeavenGateTotalPrice();
}

heavenGateHundredInput.oninput = () => {
    recalculateHeavenGateTotalPrice();
}

function recalculateHeavenGateTotalPrice() {
    let heavenGatePriceInputElem = document.getElementById('heaven-gate-price');
    let tenInputElem = document.getElementById('heaven-gate-10-price');
    let sixtyInputElem = document.getElementById('heaven-gate-60-price');
    let hundredInputElem = document.getElementById('heaven-gate-100-price');
    let usedPriceElem = document.getElementById('heaven-gate-total-used-price');

    let price = parseInt(heavenGatePriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * heavenGateCnt +
        (
            tenInput * heavenGateTenTrial +
            sixtyInput * heavenGateSixtyTrial +
            hundredInput *
            heavenGateHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
heavenGatePriceResetBtn.addEventListener('click', function () {
    resetHeavenGatePrice()
});

function resetHeavenGatePrice() {
    let tenSuccessCnt = document.getElementById('heaven-gate-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('heaven-gate-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('heaven-gate-100-success-cnt');
    let tenUsedCnt = document.getElementById('heaven-gate-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('heaven-gate-60-used-cnt');
    let hundredUsedCnt = document.getElementById('heaven-gate-100-used-cnt');
    let itemCnt = document.getElementById('heaven-gate-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    heavenGateTenTrial = 0;
    heavenGateSixtyTrial = 0;
    heavenGateHundredTrial = 0;
    heavenGateCnt = 1;

    recalculateHeavenGateTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addHeavenGateBuyCnt() {
    let buyCnt = document.getElementById('heaven-gate-cnt');
    heavenGateCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = heavenGateCnt.toString();
    recalculateHeavenGateTotalPrice();
}