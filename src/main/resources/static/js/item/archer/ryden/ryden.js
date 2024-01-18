import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 45;
let defaultDex = 2;
let defaultAcc = 0;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let rydenImgPath = '../img/item/weapon/bowman/ry-den.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('ry-den-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('ry-den-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('ry-den-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('ry-den-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('ry-den-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('ry-den-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('ry-den-10-percent-button');
let sixtyPerBtn = document.getElementById('ry-den-60-percent-button');
let hundredPerBtn = document.getElementById('ry-den-100-percent-button');
let resetBtn = document.getElementById('ry-den-reset-button');

// 아이템 구매 횟수
let rydenCnt = 1;

// 주문서 시도 횟수
let rydenTenTrial = 0;
let rydenSixtyTrial = 0;
let rydenHundredTrial = 0;

// 가격 관련 input, button
let rydenPriceInput = document.getElementById('ry-den-price'); // 아이템 가격
let rydenTenInput = document.getElementById('ry-den-10-price'); // 10퍼센트 가격
let rydenSixtyInput = document.getElementById('ry-den-60-price'); // 60퍼센트 가격
let rydenHundredInput = document.getElementById('ry-den-100-price'); // 100퍼센트 가격
let rydenPriceResetBtn = document.getElementById('ry-den-price-reset-btn') // 리셋 버튼

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
        resetRydenPrice();
        rydenPriceResetBtn.focus();
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
        rydenPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
rydenPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { rydenPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('ry-den-10-used-cnt');
    rydenTenTrial++;
    usedCnt.textContent = rydenTenTrial.toString();
    recalculateRydenTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('ry-den-60-used-cnt');
    rydenSixtyTrial++;
    usedCnt.textContent = rydenSixtyTrial.toString();
    recalculateRydenTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('ry-den-100-used-cnt');
    rydenHundredTrial++;
    usedCnt.textContent = rydenHundredTrial.toString();
    recalculateRydenTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('ry-den-phy-atk');
    let dex = document.getElementById('ry-den-dex');
    defaultPhyAtk = 45;
    defaultDex = 2;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    dex.textContent = defaultDex.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('ry-den-phy-atk');
    let dex = document.getElementById('ry-den-dex');
    defaultPhyAtk = 46;
    defaultDex = 2;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    dex.textContent = defaultDex.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('ry-den-phy-atk');
    let dex = document.getElementById('ry-den-dex');
    defaultPhyAtk = 47;
    defaultDex = 2;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    dex.textContent = defaultDex.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('ry-den-phy-atk');
    let dex = document.getElementById('ry-den-dex');
    defaultPhyAtk = 48;
    defaultDex = 3;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    dex.textContent = defaultDex.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('ry-den-phy-atk');
    let dex = document.getElementById('ry-den-dex');
    defaultPhyAtk = 49;
    defaultDex = 3;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    dex.textContent = defaultDex.toString();
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('ry-den-phy-atk');
    let dex = document.getElementById('ry-den-dex');
    defaultPhyAtk = 50;
    defaultDex = 3;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    dex.textContent = defaultDex.toString();
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('ry-den-phy-atk'); // 물리공격력
    let dexV = document.getElementById('ry-den-dex'); // DEX
    let accV = document.getElementById('ry-den-acc'); // ACC

    // let dexInfo = document.getElementById('ry-den-dex-info');
    let accInfo = document.getElementById('ry-den-acc-info');

    let availableCnt = document.getElementById('ry-den-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('ry-den-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('ry-den-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    accV.textContent = defaultAcc.toString();

    // dexInfo.hidden = true;
    accInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addRydenBuyCnt()
    }

    let title = document.getElementById('ry-den-title');
    let alertTxt = document.getElementById('ry-den-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, acc, dex, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('ry-den-upgraded-count');
    let additionalElem = document.getElementById('ry-den-additional');
    let title = document.getElementById('ry-den-title');
    let availableCount = document.getElementById('ry-den-upgrade-available-count');

    let phyAtkElem = document.getElementById('ry-den-phy-atk');
    let accElem = document.getElementById('ry-den-acc');
    let dexElem = document.getElementById('ry-den-dex');

    let accElemInfo = document.getElementById('ry-den-acc-info');
    // let dexElemInfo = document.getElementById('ry-den-dex-info');

    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + phyAtk).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    dexElem.textContent = (parseInt(dexElem.textContent) + dex).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(accElem.textContent) !== 0) {
        accElemInfo.hidden = false;
    }
    /*
    if (parseInt(dexElem.textContent) !== 0) {
        dexElemInfo.hidden = false;
    }
    */
    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('ry-den-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('ry-den-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('ry-den-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('ry-den-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('ry-den-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('ry-den-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('ry-den-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = rydenImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('ry-den-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = rydenImgPath
        gifImg.hidden = true;
    }, 1000);
}



rydenPriceInput.oninput = () => {
    recalculateRydenTotalPrice()
}

rydenTenInput.oninput = () => {
    recalculateRydenTotalPrice();
}

rydenSixtyInput.oninput = () => {
    recalculateRydenTotalPrice();
}

rydenHundredInput.oninput = () => {
    recalculateRydenTotalPrice();
}

function recalculateRydenTotalPrice() {
    let rydenPriceInputElem = document.getElementById('ry-den-price');
    let tenInputElem = document.getElementById('ry-den-10-price');
    let sixtyInputElem = document.getElementById('ry-den-60-price');
    let hundredInputElem = document.getElementById('ry-den-100-price');
    let usedPriceElem = document.getElementById('ry-den-total-used-price');

    let price = parseInt(rydenPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * rydenCnt +
        (
            tenInput * rydenTenTrial +
            sixtyInput * rydenSixtyTrial +
            hundredInput *
            rydenHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
rydenPriceResetBtn.addEventListener('click', function () {
    resetRydenPrice()
});

function resetRydenPrice() {
    let tenSuccessCnt = document.getElementById('ry-den-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('ry-den-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('ry-den-100-success-cnt');
    let tenUsedCnt = document.getElementById('ry-den-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('ry-den-60-used-cnt');
    let hundredUsedCnt = document.getElementById('ry-den-100-used-cnt');
    let itemCnt = document.getElementById('ry-den-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    rydenTenTrial = 0;
    rydenSixtyTrial = 0;
    rydenHundredTrial = 0;
    rydenCnt = 1;

    recalculateRydenTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addRydenBuyCnt() {
    let buyCnt = document.getElementById('ry-den-cnt');
    rydenCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = rydenCnt.toString();
    recalculateRydenTotalPrice();
}