import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 68;
let defaultDex = 0;
let defaultAcc = 0;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let rowerImgPath = '../img/item/weapon/bowman/rower.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('rower-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('rower-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('rower-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('rower-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('rower-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('rower-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('rower-10-percent-button');
let sixtyPerBtn = document.getElementById('rower-60-percent-button');
let hundredPerBtn = document.getElementById('rower-100-percent-button');
let resetBtn = document.getElementById('rower-reset-button');

// 아이템 구매 횟수
let rowerCnt = 1;

// 주문서 시도 횟수
let rowerTenTrial = 0;
let rowerSixtyTrial = 0;
let rowerHundredTrial = 0;

// 가격 관련 input, button
let rowerPriceInput = document.getElementById('rower-price'); // 아이템 가격
let rowerTenInput = document.getElementById('rower-10-price'); // 10퍼센트 가격
let rowerSixtyInput = document.getElementById('rower-60-price'); // 60퍼센트 가격
let rowerHundredInput = document.getElementById('rower-100-price'); // 100퍼센트 가격
let rowerPriceResetBtn = document.getElementById('rower-price-reset-btn') // 리셋 버튼

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
        resetRowerPrice();
        rowerPriceResetBtn.focus();
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
        rowerPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
rowerPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { rowerPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('rower-10-used-cnt');
    rowerTenTrial++;
    usedCnt.textContent = rowerTenTrial.toString();
    recalculateRowerTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('rower-60-used-cnt');
    rowerSixtyTrial++;
    usedCnt.textContent = rowerSixtyTrial.toString();
    recalculateRowerTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('rower-100-used-cnt');
    rowerHundredTrial++;
    usedCnt.textContent = rowerHundredTrial.toString();
    recalculateRowerTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('rower-phy-atk');
    defaultPhyAtk = 68
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('rower-phy-atk');
    defaultPhyAtk = 69
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('rower-phy-atk');
    defaultPhyAtk = 70
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('rower-phy-atk');
    defaultPhyAtk = 71
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('rower-phy-atk');
    defaultPhyAtk = 72
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('rower-phy-atk');
    defaultPhyAtk = 73
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('rower-phy-atk'); // 물리공격력
    let dexV = document.getElementById('rower-dex'); // DEX
    let accV = document.getElementById('rower-acc'); // ACC

    let dexInfo = document.getElementById('rower-dex-info');
    let accInfo = document.getElementById('rower-acc-info');

    let availableCnt = document.getElementById('rower-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('rower-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('rower-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    accV.textContent = defaultAcc.toString();

    dexInfo.hidden = true; accInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addRowerBuyCnt()
    }

    let title = document.getElementById('rower-title');
    let alertTxt = document.getElementById('rower-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, acc, dex, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('rower-upgraded-count');
    let additionalElem = document.getElementById('rower-additional');
    let title = document.getElementById('rower-title');
    let availableCount = document.getElementById('rower-upgrade-available-count');

    let phyAtkElem = document.getElementById('rower-phy-atk');
    let accElem = document.getElementById('rower-acc');
    let dexElem = document.getElementById('rower-dex');

    let accElemInfo = document.getElementById('rower-acc-info');
    let dexElemInfo = document.getElementById('rower-dex-info');

    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + phyAtk).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    dexElem.textContent = (parseInt(dexElem.textContent) + dex).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(accElem.textContent) !== 0) {
        accElemInfo.hidden = false;
    }
    if (parseInt(dexElem.textContent) !== 0) {
        dexElemInfo.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('rower-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('rower-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('rower-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('rower-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('rower-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('rower-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('rower-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = rowerImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('rower-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = rowerImgPath
        gifImg.hidden = true;
    }, 1000);
}



rowerPriceInput.oninput = () => {
    recalculateRowerTotalPrice()
}

rowerTenInput.oninput = () => {
    recalculateRowerTotalPrice();
}

rowerSixtyInput.oninput = () => {
    recalculateRowerTotalPrice();
}

rowerHundredInput.oninput = () => {
    recalculateRowerTotalPrice();
}

function recalculateRowerTotalPrice() {
    let rowerPriceInputElem = document.getElementById('rower-price');
    let tenInputElem = document.getElementById('rower-10-price');
    let sixtyInputElem = document.getElementById('rower-60-price');
    let hundredInputElem = document.getElementById('rower-100-price');
    let usedPriceElem = document.getElementById('rower-total-used-price');

    let price = parseInt(rowerPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * rowerCnt +
        (
            tenInput * rowerTenTrial +
            sixtyInput * rowerSixtyTrial +
            hundredInput *
            rowerHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
rowerPriceResetBtn.addEventListener('click', function () {
    resetRowerPrice()
});

function resetRowerPrice() {
    let tenSuccessCnt = document.getElementById('rower-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('rower-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('rower-100-success-cnt');
    let tenUsedCnt = document.getElementById('rower-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('rower-60-used-cnt');
    let hundredUsedCnt = document.getElementById('rower-100-used-cnt');
    let itemCnt = document.getElementById('rower-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    rowerTenTrial = 0;
    rowerSixtyTrial = 0;
    rowerHundredTrial = 0;
    rowerCnt = 1;

    recalculateRowerTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addRowerBuyCnt() {
    let buyCnt = document.getElementById('rower-cnt');
    rowerCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = rowerCnt.toString();
    recalculateRowerTotalPrice();
}