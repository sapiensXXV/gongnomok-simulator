import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 80;
let defaultDex = 0;
let defaultAcc = 0;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let goldenHinkelImgPath = '../img/item/weapon/bowman/golden-hinkel.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('golden-hinkel-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('golden-hinkel-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('golden-hinkel-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('golden-hinkel-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('golden-hinkel-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('golden-hinkel-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('golden-hinkel-10-percent-button');
let sixtyPerBtn = document.getElementById('golden-hinkel-60-percent-button');
let hundredPerBtn = document.getElementById('golden-hinkel-100-percent-button');
let resetBtn = document.getElementById('golden-hinkel-reset-button');

// 아이템 구매 횟수
let goldenHinkelCnt = 1;

// 주문서 시도 횟수
let goldenHinkelTenTrial = 0;
let goldenHinkelSixtyTrial = 0;
let goldenHinkelHundredTrial = 0;

// 가격 관련 input, button
let goldenHinkelPriceInput = document.getElementById('golden-hinkel-price'); // 아이템 가격
let goldenHinkelTenInput = document.getElementById('golden-hinkel-10-price'); // 10퍼센트 가격
let goldenHinkelSixtyInput = document.getElementById('golden-hinkel-60-price'); // 60퍼센트 가격
let goldenHinkelHundredInput = document.getElementById('golden-hinkel-100-price'); // 100퍼센트 가격
let goldenHinkelPriceResetBtn = document.getElementById('golden-hinkel-price-reset-btn') // 리셋 버튼

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
        resetGoldenHinkelPrice();
        goldenHinkelPriceResetBtn.focus();
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
        goldenHinkelPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
goldenHinkelPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { goldenHinkelPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('golden-hinkel-10-used-cnt');
    goldenHinkelTenTrial++;
    usedCnt.textContent = goldenHinkelTenTrial.toString();
    recalculateGoldenHinkelTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('golden-hinkel-60-used-cnt');
    goldenHinkelSixtyTrial++;
    usedCnt.textContent = goldenHinkelSixtyTrial.toString();
    recalculateGoldenHinkelTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('golden-hinkel-100-used-cnt');
    goldenHinkelHundredTrial++;
    usedCnt.textContent = goldenHinkelHundredTrial.toString();
    recalculateGoldenHinkelTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('golden-hinkel-phy-atk');
    defaultPhyAtk = 80
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('golden-hinkel-phy-atk');
    defaultPhyAtk = 81
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('golden-hinkel-phy-atk');
    defaultPhyAtk = 82
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('golden-hinkel-phy-atk');
    defaultPhyAtk = 83
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('golden-hinkel-phy-atk');
    defaultPhyAtk = 84
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('golden-hinkel-phy-atk');
    defaultPhyAtk = 85
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('golden-hinkel-phy-atk'); // 물리공격력
    let dexV = document.getElementById('golden-hinkel-dex'); // DEX
    let accV = document.getElementById('golden-hinkel-acc'); // ACC

    let dexInfo = document.getElementById('golden-hinkel-dex-info');
    let accInfo = document.getElementById('golden-hinkel-acc-info');

    let availableCnt = document.getElementById('golden-hinkel-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('golden-hinkel-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('golden-hinkel-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    accV.textContent = defaultAcc.toString();

    dexInfo.hidden = true; accInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addGoldenHinkelBuyCnt()
    }

    let title = document.getElementById('golden-hinkel-title');
    let alertTxt = document.getElementById('golden-hinkel-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, acc, dex, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('golden-hinkel-upgraded-count');
    let additionalElem = document.getElementById('golden-hinkel-additional');
    let title = document.getElementById('golden-hinkel-title');
    let availableCount = document.getElementById('golden-hinkel-upgrade-available-count');

    let phyAtkElem = document.getElementById('golden-hinkel-phy-atk');
    let accElem = document.getElementById('golden-hinkel-acc');
    let dexElem = document.getElementById('golden-hinkel-dex');

    let accElemInfo = document.getElementById('golden-hinkel-acc-info');
    let dexElemInfo = document.getElementById('golden-hinkel-dex-info');

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
        let successCnt = document.getElementById('golden-hinkel-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('golden-hinkel-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('golden-hinkel-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('golden-hinkel-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('golden-hinkel-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('golden-hinkel-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('golden-hinkel-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = goldenHinkelImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('golden-hinkel-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = goldenHinkelImgPath
        gifImg.hidden = true;
    }, 1000);
}



goldenHinkelPriceInput.oninput = () => {
    recalculateGoldenHinkelTotalPrice()
}

goldenHinkelTenInput.oninput = () => {
    recalculateGoldenHinkelTotalPrice();
}

goldenHinkelSixtyInput.oninput = () => {
    recalculateGoldenHinkelTotalPrice();
}

goldenHinkelHundredInput.oninput = () => {
    recalculateGoldenHinkelTotalPrice();
}

function recalculateGoldenHinkelTotalPrice() {
    let goldenHinkelPriceInputElem = document.getElementById('golden-hinkel-price');
    let tenInputElem = document.getElementById('golden-hinkel-10-price');
    let sixtyInputElem = document.getElementById('golden-hinkel-60-price');
    let hundredInputElem = document.getElementById('golden-hinkel-100-price');
    let usedPriceElem = document.getElementById('golden-hinkel-total-used-price');

    let price = parseInt(goldenHinkelPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * goldenHinkelCnt +
        (
            tenInput * goldenHinkelTenTrial +
            sixtyInput * goldenHinkelSixtyTrial +
            hundredInput *
            goldenHinkelHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
goldenHinkelPriceResetBtn.addEventListener('click', function () {
    resetGoldenHinkelPrice()
});

function resetGoldenHinkelPrice() {
    let tenSuccessCnt = document.getElementById('golden-hinkel-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('golden-hinkel-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('golden-hinkel-100-success-cnt');
    let tenUsedCnt = document.getElementById('golden-hinkel-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('golden-hinkel-60-used-cnt');
    let hundredUsedCnt = document.getElementById('golden-hinkel-100-used-cnt');
    let itemCnt = document.getElementById('golden-hinkel-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    goldenHinkelTenTrial = 0;
    goldenHinkelSixtyTrial = 0;
    goldenHinkelHundredTrial = 0;
    goldenHinkelCnt = 1;

    recalculateGoldenHinkelTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addGoldenHinkelBuyCnt() {
    let buyCnt = document.getElementById('golden-hinkel-cnt');
    goldenHinkelCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = goldenHinkelCnt.toString();
    recalculateGoldenHinkelTotalPrice();
}