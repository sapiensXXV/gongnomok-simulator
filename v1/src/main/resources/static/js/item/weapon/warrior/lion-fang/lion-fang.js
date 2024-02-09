import * as util from "../../../../global/util.js";

// 속성 값들
let defaultAtkSpeed = 4;
let defaultStr = 0;
let defaultPhyAtk = 70;
let defaultPhyDef = 0;
let defaultAvailableCount = 7;

let lionFangImgPath = '../img/item/weapon/lion-fang.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('lion-fang-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('lion-fang-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('lion-fang-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('lion-fang-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('lion-fang-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('lion-fang-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('lion-fang-10-percent-button');
let sixtyPerBtn = document.getElementById('lion-fang-60-percent-button');
let hundredPerBtn = document.getElementById('lion-fang-100-percent-button');
let resetBtn = document.getElementById('lion-fang-reset-button');

// 아이템 구매 횟수
let lionFangCnt = 1;

// 주문서 시도 횟수
let lionFangTenTrial = 0;
let lionFangSixtyTrial = 0;
let lionFangHundredTrial = 0;

// 가격 관련 input, button
let lionFangPriceInput = document.getElementById('lion-fang-price'); // 아이템 가격
let lionFangTenInput = document.getElementById('lion-fang-10-price'); // 10퍼센트 가격
let lionFangSixtyInput = document.getElementById('lion-fang-60-price'); // 60퍼센트 가격
let lionFangHundredInput = document.getElementById('lion-fang-100-price'); // 100퍼센트 가격
let lionFangPriceResetBtn = document.getElementById('lion-fang-price-reset-btn') // 리셋 버튼

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
        resetLionFangPrice();
        lionFangPriceResetBtn.focus();
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
        lionFangPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
lionFangPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { lionFangPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('lion-fang-10-used-cnt');
    lionFangTenTrial++;
    usedCnt.textContent = lionFangTenTrial.toString();
    recalculateLionFangTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('lion-fang-60-used-cnt');
    lionFangSixtyTrial++;
    usedCnt.textContent = lionFangSixtyTrial.toString();
    recalculateLionFangTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('lion-fang-100-used-cnt');
    lionFangHundredTrial++;
    usedCnt.textContent = lionFangHundredTrial.toString();
    recalculateLionFangTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-fang-phy-atk');
    defaultPhyAtk = 70;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-fang-phy-atk');
    defaultPhyAtk = 71;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-fang-phy-atk');
    defaultPhyAtk = 72;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-fang-phy-atk');
    defaultPhyAtk = 73;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-fang-phy-atk');
    defaultPhyAtk = 74;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('lion-fang-phy-atk');
    defaultPhyAtk = 75;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('lion-fang-phy-atk'); // 물리공격력
    let strV = document.getElementById('lion-fang-str'); // STR
    let strInfo = document.getElementById('lion-fang-str-info'); // STR 정보 텍스트
    let phyDef = document.getElementById('lion-fang-phy-def'); // 물리방어력
    let phyDefInfo = document.getElementById('lion-fang-phy-def-info'); // 물리방어력 정보 텍스트
    let availableCnt = document.getElementById('lion-fang-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('lion-fang-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('lion-fang-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    strV.textContent = defaultStr.toString()
    phyDef.textContent = defaultPhyDef.toString();

    strInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addLionFangBuyCnt()
    }

    let title = document.getElementById('lion-fang-title');
    let alertTxt = document.getElementById('lion-fang-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;

}

function success(phyAtk, strV, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('lion-fang-upgraded-count');
    let additionalElem = document.getElementById('lion-fang-additional');
    let title = document.getElementById('lion-fang-title');
    let availableCount = document.getElementById('lion-fang-upgrade-available-count');
    let phyAtkElem = document.getElementById('lion-fang-phy-atk');

    let strElem = document.getElementById('lion-fang-str');
    let strInfoElem = document.getElementById('lion-fang-str-info');

    let phyDefElem = document.getElementById('lion-fang-phy-def');
    let phyDefInfoElem = document.getElementById('lion-fang-phy-def-info');


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
        let successCnt = document.getElementById('lion-fang-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('lion-fang-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('lion-fang-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('lion-fang-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('lion-fang-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('lion-fang-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('lion-fang-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = lionFangImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('lion-fang-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = lionFangImgPath
        gifImg.hidden = true;
    }, 1000);
}



lionFangPriceInput.oninput = () => {
    recalculateLionFangTotalPrice()
}

lionFangTenInput.oninput = () => {
    recalculateLionFangTotalPrice();
}

lionFangSixtyInput.oninput = () => {
    recalculateLionFangTotalPrice();
}

lionFangHundredInput.oninput = () => {
    recalculateLionFangTotalPrice();
}

function recalculateLionFangTotalPrice() {
    let lionFangPriceInputElem = document.getElementById('lion-fang-price');
    let tenInputElem = document.getElementById('lion-fang-10-price');
    let sixtyInputElem = document.getElementById('lion-fang-60-price');
    let hundredInputElem = document.getElementById('lion-fang-100-price');
    let usedPriceElem = document.getElementById('lion-fang-total-used-price');

    let price = parseInt(lionFangPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * lionFangCnt +
        (
            tenInput * lionFangTenTrial +
            sixtyInput * lionFangSixtyTrial +
            hundredInput *
            lionFangHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
lionFangPriceResetBtn.addEventListener('click', function () {
    resetLionFangPrice()
});

function resetLionFangPrice() {
    let tenSuccessCnt = document.getElementById('lion-fang-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('lion-fang-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('lion-fang-100-success-cnt');
    let tenUsedCnt = document.getElementById('lion-fang-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('lion-fang-60-used-cnt');
    let hundredUsedCnt = document.getElementById('lion-fang-100-used-cnt');
    let itemCnt = document.getElementById('lion-fang-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    lionFangTenTrial = 0;
    lionFangSixtyTrial = 0;
    lionFangHundredTrial = 0;
    lionFangCnt = 1;

    recalculateLionFangTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addLionFangBuyCnt() {
    let buyCnt = document.getElementById('lion-fang-cnt');
    lionFangCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = lionFangCnt.toString();
    recalculateLionFangTotalPrice();
}