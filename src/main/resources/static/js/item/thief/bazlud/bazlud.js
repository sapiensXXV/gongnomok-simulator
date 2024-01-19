import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 55;
let defaultPhyDef = 0;
let defaultDex = 0;
let defaultLuk = 0;
let defaultAcc = 0;
let defaultAvo = 0;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let bazludImgPath = '../img/item/weapon/thief/bazlud.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('bazlud-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('bazlud-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('bazlud-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('bazlud-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('bazlud-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('bazlud-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('bazlud-10-percent-button');
let sixtyPerBtn = document.getElementById('bazlud-60-percent-button');
let hundredPerBtn = document.getElementById('bazlud-100-percent-button');
let resetBtn = document.getElementById('bazlud-reset-button');

// 아이템 구매 횟수
let bazludCnt = 1;

// 주문서 시도 횟수
let bazludTenTrial = 0;
let bazludSixtyTrial = 0;
let bazludHundredTrial = 0;

// 가격 관련 input, button
let bazludPriceInput = document.getElementById('bazlud-price'); // 아이템 가격
let bazludTenInput = document.getElementById('bazlud-10-price'); // 10퍼센트 가격
let bazludSixtyInput = document.getElementById('bazlud-60-price'); // 60퍼센트 가격
let bazludHundredInput = document.getElementById('bazlud-100-price'); // 100퍼센트 가격
let bazludPriceResetBtn = document.getElementById('bazlud-price-reset-btn') // 리셋 버튼

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
        resetBazludPrice();
        bazludPriceResetBtn.focus();
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
        bazludPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
bazludPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { bazludPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('bazlud-10-used-cnt');
    bazludTenTrial++;
    usedCnt.textContent = bazludTenTrial.toString();
    recalculateBazludTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('bazlud-60-used-cnt');
    bazludSixtyTrial++;
    usedCnt.textContent = bazludSixtyTrial.toString();
    recalculateBazludTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('bazlud-100-used-cnt');
    bazludHundredTrial++;
    usedCnt.textContent = bazludHundredTrial.toString();
    recalculateBazludTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('bazlud-phy-atk');
    defaultPhyAtk = 55;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('bazlud-phy-atk');
    defaultPhyAtk = 56;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('bazlud-phy-atk');
    defaultPhyAtk = 57;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('bazlud-phy-atk');
    defaultPhyAtk = 58;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('bazlud-phy-atk');
    defaultPhyAtk = 59;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('bazlud-phy-atk');
    defaultPhyAtk = 60;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('bazlud-phy-atk'); // 물리공격력
    let lukV = document.getElementById('bazlud-luk'); // LUK
    let phyDef = document.getElementById('bazlud-phy-def'); // 물리방어력

    let lukInfo = document.getElementById('bazlud-luk-info');
    let phyDefInfo = document.getElementById('bazlud-phy-def-info');

    let availableCnt = document.getElementById('bazlud-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('bazlud-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('bazlud-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    lukV.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();

    lukInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addBazludBuyCnt()
    }

    let title = document.getElementById('bazlud-title');
    let alertTxt = document.getElementById('bazlud-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, luk, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('bazlud-upgraded-count');
    let additionalElem = document.getElementById('bazlud-additional');
    let title = document.getElementById('bazlud-title');
    let availableCount = document.getElementById('bazlud-upgrade-available-count');

    let phyAtkElem = document.getElementById('bazlud-phy-atk');
    let lukElem = document.getElementById('bazlud-luk');
    let phyDefElem = document.getElementById('bazlud-phy-def');

    let lukElemInfo = document.getElementById('bazlud-luk-info');
    let phyDefElemInfo = document.getElementById('bazlud-phy-def-info');

    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + phyAtk).toString();
    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();
    phyDefElem.textContent = (parseInt(phyDefElem.textContent) + phyDef).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(lukElem.textContent) !== 0) {
        lukElemInfo.hidden = false;
    }
    if (parseInt(phyDefElem.textContent) !== 0) {
        phyDefElemInfo.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('bazlud-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('bazlud-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('bazlud-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('bazlud-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('bazlud-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('bazlud-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('bazlud-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = bazludImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('bazlud-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = bazludImgPath
        gifImg.hidden = true;
    }, 1000);
}



bazludPriceInput.oninput = () => {
    recalculateBazludTotalPrice()
}

bazludTenInput.oninput = () => {
    recalculateBazludTotalPrice();
}

bazludSixtyInput.oninput = () => {
    recalculateBazludTotalPrice();
}

bazludHundredInput.oninput = () => {
    recalculateBazludTotalPrice();
}

function recalculateBazludTotalPrice() {
    let bazludPriceInputElem = document.getElementById('bazlud-price');
    let tenInputElem = document.getElementById('bazlud-10-price');
    let sixtyInputElem = document.getElementById('bazlud-60-price');
    let hundredInputElem = document.getElementById('bazlud-100-price');
    let usedPriceElem = document.getElementById('bazlud-total-used-price');

    let price = parseInt(bazludPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * bazludCnt +
        (
            tenInput * bazludTenTrial +
            sixtyInput * bazludSixtyTrial +
            hundredInput *
            bazludHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
bazludPriceResetBtn.addEventListener('click', function () {
    resetBazludPrice()
});

function resetBazludPrice() {
    let tenSuccessCnt = document.getElementById('bazlud-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('bazlud-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('bazlud-100-success-cnt');
    let tenUsedCnt = document.getElementById('bazlud-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('bazlud-60-used-cnt');
    let hundredUsedCnt = document.getElementById('bazlud-100-used-cnt');
    let itemCnt = document.getElementById('bazlud-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    bazludTenTrial = 0;
    bazludSixtyTrial = 0;
    bazludHundredTrial = 0;
    bazludCnt = 1;

    recalculateBazludTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addBazludBuyCnt() {
    let buyCnt = document.getElementById('bazlud-cnt');
    bazludCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = bazludCnt.toString();
    recalculateBazludTotalPrice();
}