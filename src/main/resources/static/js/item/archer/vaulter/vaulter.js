import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 55;
let defaultDex = 0;
let defaultAcc = 0;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let vaulterImgPath = '../img/item/weapon/bowman/vaulter2000.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('vaulter-2000-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('vaulter-2000-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('vaulter-2000-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('vaulter-2000-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('vaulter-2000-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('vaulter-2000-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('vaulter-2000-10-percent-button');
let sixtyPerBtn = document.getElementById('vaulter-2000-60-percent-button');
let hundredPerBtn = document.getElementById('vaulter-2000-100-percent-button');
let resetBtn = document.getElementById('vaulter-2000-reset-button');

// 아이템 구매 횟수
let vaulterCnt = 1;

// 주문서 시도 횟수
let vaulterTenTrial = 0;
let vaulterSixtyTrial = 0;
let vaulterHundredTrial = 0;

// 가격 관련 input, button
let vaulterPriceInput = document.getElementById('vaulter-2000-price'); // 아이템 가격
let vaulterTenInput = document.getElementById('vaulter-2000-10-price'); // 10퍼센트 가격
let vaulterSixtyInput = document.getElementById('vaulter-2000-60-price'); // 60퍼센트 가격
let vaulterHundredInput = document.getElementById('vaulter-2000-100-price'); // 100퍼센트 가격
let vaulterPriceResetBtn = document.getElementById('vaulter-2000-price-reset-btn') // 리셋 버튼

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
        resetVaulterPrice();
        vaulterPriceResetBtn.focus();
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
        vaulterPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
vaulterPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { vaulterPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('vaulter-2000-10-used-cnt');
    vaulterTenTrial++;
    usedCnt.textContent = vaulterTenTrial.toString();
    recalculateVaulterTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('vaulter-2000-60-used-cnt');
    vaulterSixtyTrial++;
    usedCnt.textContent = vaulterSixtyTrial.toString();
    recalculateVaulterTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('vaulter-2000-100-used-cnt');
    vaulterHundredTrial++;
    usedCnt.textContent = vaulterHundredTrial.toString();
    recalculateVaulterTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('vaulter-2000-phy-atk');
    defaultPhyAtk = 55
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('vaulter-2000-phy-atk');
    defaultPhyAtk = 56
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('vaulter-2000-phy-atk');
    defaultPhyAtk = 57
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('vaulter-2000-phy-atk');
    defaultPhyAtk = 58
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('vaulter-2000-phy-atk');
    defaultPhyAtk = 59
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('vaulter-2000-phy-atk');
    defaultPhyAtk = 60
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('vaulter-2000-phy-atk'); // 물리공격력
    let dexV = document.getElementById('vaulter-2000-dex'); // DEX
    let accV = document.getElementById('vaulter-2000-acc'); // ACC

    let dexInfo = document.getElementById('vaulter-2000-dex-info');
    let accInfo = document.getElementById('vaulter-2000-acc-info');

    let availableCnt = document.getElementById('vaulter-2000-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('vaulter-2000-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('vaulter-2000-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    accV.textContent = defaultAcc.toString();

    dexInfo.hidden = true; accInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addVaulterBuyCnt()
    }

    let title = document.getElementById('vaulter-2000-title');
    let alertTxt = document.getElementById('vaulter-2000-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, acc, dex, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('vaulter-2000-upgraded-count');
    let additionalElem = document.getElementById('vaulter-2000-additional');
    let title = document.getElementById('vaulter-2000-title');
    let availableCount = document.getElementById('vaulter-2000-upgrade-available-count');

    let phyAtkElem = document.getElementById('vaulter-2000-phy-atk');
    let accElem = document.getElementById('vaulter-2000-acc');
    let dexElem = document.getElementById('vaulter-2000-dex');

    let accElemInfo = document.getElementById('vaulter-2000-acc-info');
    let dexElemInfo = document.getElementById('vaulter-2000-dex-info');

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
        let successCnt = document.getElementById('vaulter-2000-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('vaulter-2000-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('vaulter-2000-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('vaulter-2000-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('vaulter-2000-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('vaulter-2000-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('vaulter-2000-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = vaulterImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('vaulter-2000-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = vaulterImgPath
        gifImg.hidden = true;
    }, 1000);
}



vaulterPriceInput.oninput = () => {
    recalculateVaulterTotalPrice()
}

vaulterTenInput.oninput = () => {
    recalculateVaulterTotalPrice();
}

vaulterSixtyInput.oninput = () => {
    recalculateVaulterTotalPrice();
}

vaulterHundredInput.oninput = () => {
    recalculateVaulterTotalPrice();
}

function recalculateVaulterTotalPrice() {
    let vaulterPriceInputElem = document.getElementById('vaulter-2000-price');
    let tenInputElem = document.getElementById('vaulter-2000-10-price');
    let sixtyInputElem = document.getElementById('vaulter-2000-60-price');
    let hundredInputElem = document.getElementById('vaulter-2000-100-price');
    let usedPriceElem = document.getElementById('vaulter-2000-total-used-price');

    let price = parseInt(vaulterPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * vaulterCnt +
        (
            tenInput * vaulterTenTrial +
            sixtyInput * vaulterSixtyTrial +
            hundredInput *
            vaulterHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
vaulterPriceResetBtn.addEventListener('click', function () {
    resetVaulterPrice()
});

function resetVaulterPrice() {
    let tenSuccessCnt = document.getElementById('vaulter-2000-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('vaulter-2000-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('vaulter-2000-100-success-cnt');
    let tenUsedCnt = document.getElementById('vaulter-2000-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('vaulter-2000-60-used-cnt');
    let hundredUsedCnt = document.getElementById('vaulter-2000-100-used-cnt');
    let itemCnt = document.getElementById('vaulter-2000-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    vaulterTenTrial = 0;
    vaulterSixtyTrial = 0;
    vaulterHundredTrial = 0;
    vaulterCnt = 1;

    recalculateVaulterTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addVaulterBuyCnt() {
    let buyCnt = document.getElementById('vaulter-2000-cnt');
    vaulterCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = vaulterCnt.toString();
    recalculateVaulterTotalPrice();
}