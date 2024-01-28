import * as util from "../../../../global/util.js";

// 속성 값들
let defaultAtkSpeed = 4;
let defaultStr = 0;
let defaultPhyAtk = 55;
let defaultPhyDef = 0;
let defaultAvailableCount = 7;

let lionHeartImgPath = '../img/item/weapon/lion-heart.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('lion-heart-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('lion-heart-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('lion-heart-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('lion-heart-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('lion-heart-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('lion-heart-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('lion-heart-10-percent-button');
let sixtyPerBtn = document.getElementById('lion-heart-60-percent-button');
let hundredPerBtn = document.getElementById('lion-heart-100-percent-button');
let resetBtn = document.getElementById('lion-heart-reset-button');

// 아이템 구매 횟수
let lionHeartCnt = 1;

// 주문서 시도 횟수
let lionHeartTenTrial = 0;
let lionHeartSixtyTrial = 0;
let lionHeartHundredTrial = 0;

// 가격 관련 input, button
let lionHeartPriceInput = document.getElementById('lion-heart-price'); // 아이템 가격
let lionHeartTenInput = document.getElementById('lion-heart-10-price'); // 10퍼센트 가격
let lionHeartSixtyInput = document.getElementById('lion-heart-60-price'); // 60퍼센트 가격
let lionHeartHundredInput = document.getElementById('lion-heart-100-price'); // 100퍼센트 가격
let lionHeartPriceResetBtn = document.getElementById('lion-heart-price-reset-btn') // 리셋 버튼

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
        resetLionHeartPrice();
        lionHeartPriceResetBtn.focus();
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
        lionHeartPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
lionHeartPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { lionHeartPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('lion-heart-10-used-cnt');
    lionHeartTenTrial++;
    usedCnt.textContent = lionHeartTenTrial.toString();
    recalculateLionHeartTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('lion-heart-60-used-cnt');
    lionHeartSixtyTrial++;
    usedCnt.textContent = lionHeartSixtyTrial.toString();
    recalculateLionHeartTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('lion-heart-100-used-cnt');
    lionHeartHundredTrial++;
    usedCnt.textContent = lionHeartHundredTrial.toString();
    recalculateLionHeartTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-heart-phy-atk');
    defaultPhyAtk = 55
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-heart-phy-atk');
    defaultPhyAtk = 56;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-heart-phy-atk');
    defaultPhyAtk = 57;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-heart-phy-atk');
    defaultPhyAtk = 58;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-heart-phy-atk');
    defaultPhyAtk = 59;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-heart-phy-atk');
    defaultPhyAtk = 60;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('lion-heart-phy-atk'); // 물리공격력
    let strV = document.getElementById('lion-heart-str'); // STR
    let strInfo = document.getElementById('lion-heart-str-info'); // STR 정보 텍스트
    let phyDef = document.getElementById('lion-heart-phy-def'); // 물리방어력
    let phyDefInfo = document.getElementById('lion-heart-phy-def-info'); // 물리방어력 정보 텍스트
    let availableCnt = document.getElementById('lion-heart-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('lion-heart-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('lion-heart-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    strV.textContent = defaultStr.toString()
    phyDef.textContent = defaultPhyDef.toString();

    strInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addLionHeartBuyCnt()
    }

    let title = document.getElementById('lion-heart-title');
    let alertTxt = document.getElementById('lion-heart-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;

}

function success(phyAtk, strV, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('lion-heart-upgraded-count');
    let additionalElem = document.getElementById('lion-heart-additional');
    let title = document.getElementById('lion-heart-title');
    let availableCount = document.getElementById('lion-heart-upgrade-available-count');
    let phyAtkElem = document.getElementById('lion-heart-phy-atk');

    let strElem = document.getElementById('lion-heart-str');
    let strInfoElem = document.getElementById('lion-heart-str-info');

    let phyDefElem = document.getElementById('lion-heart-phy-def');
    let phyDefInfoElem = document.getElementById('lion-heart-phy-def-info');


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
        let successCnt = document.getElementById('lion-heart-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('lion-heart-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('lion-heart-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('lion-heart-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('lion-heart-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('lion-heart-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('lion-heart-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = lionHeartImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('lion-heart-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = lionHeartImgPath
        gifImg.hidden = true;
    }, 1000);
}



lionHeartPriceInput.oninput = () => {
    recalculateLionHeartTotalPrice()
}

lionHeartTenInput.oninput = () => {
    recalculateLionHeartTotalPrice();
}

lionHeartSixtyInput.oninput = () => {
    recalculateLionHeartTotalPrice();
}

lionHeartHundredInput.oninput = () => {
    recalculateLionHeartTotalPrice();
}

function recalculateLionHeartTotalPrice() {
    let lionHeartPriceInputElem = document.getElementById('lion-heart-price');
    let tenInputElem = document.getElementById('lion-heart-10-price');
    let sixtyInputElem = document.getElementById('lion-heart-60-price');
    let hundredInputElem = document.getElementById('lion-heart-100-price');
    let usedPriceElem = document.getElementById('lion-heart-total-used-price');

    let price = parseInt(lionHeartPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * lionHeartCnt +
        (
            tenInput * lionHeartTenTrial +
            sixtyInput * lionHeartSixtyTrial +
            hundredInput *
            lionHeartHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
lionHeartPriceResetBtn.addEventListener('click', function () {
    resetLionHeartPrice()
});

function resetLionHeartPrice() {
    let tenSuccessCnt = document.getElementById('lion-heart-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('lion-heart-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('lion-heart-100-success-cnt');
    let tenUsedCnt = document.getElementById('lion-heart-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('lion-heart-60-used-cnt');
    let hundredUsedCnt = document.getElementById('lion-heart-100-used-cnt');
    let itemCnt = document.getElementById('lion-heart-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    lionHeartTenTrial = 0;
    lionHeartSixtyTrial = 0;
    lionHeartHundredTrial = 0;
    lionHeartCnt = 1;

    recalculateLionHeartTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addLionHeartBuyCnt() {
    let buyCnt = document.getElementById('lion-heart-cnt');
    lionHeartCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = lionHeartCnt.toString();
    recalculateLionHeartTotalPrice();
}