import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 40;
let defaultDex = 0;
let defaultAcc = 0;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let battleBowImgPath = '../img/item/weapon/bowman/battle-bow.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('battle-bow-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('battle-bow-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('battle-bow-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('battle-bow-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('battle-bow-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('battle-bow-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('battle-bow-10-percent-button');
let sixtyPerBtn = document.getElementById('battle-bow-60-percent-button');
let hundredPerBtn = document.getElementById('battle-bow-100-percent-button');
let resetBtn = document.getElementById('battle-bow-reset-button');

// 아이템 구매 횟수
let battleBowCnt = 1;

// 주문서 시도 횟수
let battleBowTenTrial = 0;
let battleBowSixtyTrial = 0;
let battleBowHundredTrial = 0;

// 가격 관련 input, button
let battleBowPriceInput = document.getElementById('battle-bow-price'); // 아이템 가격
let battleBowTenInput = document.getElementById('battle-bow-10-price'); // 10퍼센트 가격
let battleBowSixtyInput = document.getElementById('battle-bow-60-price'); // 60퍼센트 가격
let battleBowHundredInput = document.getElementById('battle-bow-100-price'); // 100퍼센트 가격
let battleBowPriceResetBtn = document.getElementById('battle-bow-price-reset-btn') // 리셋 버튼

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
        resetBattleBowPrice();
        battleBowPriceResetBtn.focus();
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
        battleBowPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
battleBowPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { battleBowPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('battle-bow-10-used-cnt');
    battleBowTenTrial++;
    usedCnt.textContent = battleBowTenTrial.toString();
    recalculateBattleBowTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('battle-bow-60-used-cnt');
    battleBowSixtyTrial++;
    usedCnt.textContent = battleBowSixtyTrial.toString();
    recalculateBattleBowTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('battle-bow-100-used-cnt');
    battleBowHundredTrial++;
    usedCnt.textContent = battleBowHundredTrial.toString();
    recalculateBattleBowTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('battle-bow-phy-atk');
    defaultPhyAtk = 40
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('battle-bow-phy-atk');
    defaultPhyAtk = 41
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('battle-bow-phy-atk');
    defaultPhyAtk = 42
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('battle-bow-phy-atk');
    defaultPhyAtk = 43
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('battle-bow-phy-atk');
    defaultPhyAtk = 44
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('battle-bow-phy-atk');
    defaultPhyAtk = 45
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('battle-bow-phy-atk'); // 물리공격력
    let dexV = document.getElementById('battle-bow-dex'); // DEX
    let accV = document.getElementById('battle-bow-acc'); // ACC

    let dexInfo = document.getElementById('battle-bow-dex-info');
    let accInfo = document.getElementById('battle-bow-acc-info');

    let availableCnt = document.getElementById('battle-bow-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('battle-bow-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('battle-bow-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    accV.textContent = defaultAcc.toString();

    dexInfo.hidden = true; accInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addBattleBowBuyCnt()
    }

    let title = document.getElementById('battle-bow-title');
    let alertTxt = document.getElementById('battle-bow-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, acc, dex, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('battle-bow-upgraded-count');
    let additionalElem = document.getElementById('battle-bow-additional');
    let title = document.getElementById('battle-bow-title');
    let availableCount = document.getElementById('battle-bow-upgrade-available-count');

    let phyAtkElem = document.getElementById('battle-bow-phy-atk');
    let accElem = document.getElementById('battle-bow-acc');
    let dexElem = document.getElementById('battle-bow-dex');

    let accElemInfo = document.getElementById('battle-bow-acc-info');
    let dexElemInfo = document.getElementById('battle-bow-dex-info');

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
        let successCnt = document.getElementById('battle-bow-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('battle-bow-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('battle-bow-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('battle-bow-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('battle-bow-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('battle-bow-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('battle-bow-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = battleBowImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('battle-bow-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = battleBowImgPath
        gifImg.hidden = true;
    }, 1000);
}



battleBowPriceInput.oninput = () => {
    recalculateBattleBowTotalPrice()
}

battleBowTenInput.oninput = () => {
    recalculateBattleBowTotalPrice();
}

battleBowSixtyInput.oninput = () => {
    recalculateBattleBowTotalPrice();
}

battleBowHundredInput.oninput = () => {
    recalculateBattleBowTotalPrice();
}

function recalculateBattleBowTotalPrice() {
    let battleBowPriceInputElem = document.getElementById('battle-bow-price');
    let tenInputElem = document.getElementById('battle-bow-10-price');
    let sixtyInputElem = document.getElementById('battle-bow-60-price');
    let hundredInputElem = document.getElementById('battle-bow-100-price');
    let usedPriceElem = document.getElementById('battle-bow-total-used-price');

    let price = parseInt(battleBowPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * battleBowCnt +
        (
            tenInput * battleBowTenTrial +
            sixtyInput * battleBowSixtyTrial +
            hundredInput *
            battleBowHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
battleBowPriceResetBtn.addEventListener('click', function () {
    resetBattleBowPrice()
});

function resetBattleBowPrice() {
    let tenSuccessCnt = document.getElementById('battle-bow-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('battle-bow-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('battle-bow-100-success-cnt');
    let tenUsedCnt = document.getElementById('battle-bow-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('battle-bow-60-used-cnt');
    let hundredUsedCnt = document.getElementById('battle-bow-100-used-cnt');
    let itemCnt = document.getElementById('battle-bow-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    battleBowTenTrial = 0;
    battleBowSixtyTrial = 0;
    battleBowHundredTrial = 0;
    battleBowCnt = 1;

    recalculateBattleBowTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addBattleBowBuyCnt() {
    let buyCnt = document.getElementById('battle-bow-cnt');
    battleBowCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = battleBowCnt.toString();
    recalculateBattleBowTotalPrice();
}