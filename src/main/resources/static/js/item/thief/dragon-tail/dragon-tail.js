import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 85;
let defaultPhyDef = 0;
let defaultLuk = 0;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let dragonTailImgPath = '../img/item/weapon/thief/dragon-tail.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('dragon-tail-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('dragon-tail-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('dragon-tail-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('dragon-tail-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('dragon-tail-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('dragon-tail-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('dragon-tail-10-percent-button');
let sixtyPerBtn = document.getElementById('dragon-tail-60-percent-button');
let hundredPerBtn = document.getElementById('dragon-tail-100-percent-button');
let resetBtn = document.getElementById('dragon-tail-reset-button');

// 아이템 구매 횟수
let dragonTailCnt = 1;

// 주문서 시도 횟수
let dragonTailTenTrial = 0;
let dragonTailSixtyTrial = 0;
let dragonTailHundredTrial = 0;

// 가격 관련 input, button
let dragonTailPriceInput = document.getElementById('dragon-tail-price'); // 아이템 가격
let dragonTailTenInput = document.getElementById('dragon-tail-10-price'); // 10퍼센트 가격
let dragonTailSixtyInput = document.getElementById('dragon-tail-60-price'); // 60퍼센트 가격
let dragonTailHundredInput = document.getElementById('dragon-tail-100-price'); // 100퍼센트 가격
let dragonTailPriceResetBtn = document.getElementById('dragon-tail-price-reset-btn') // 리셋 버튼

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
        resetDragonTailPrice();
        dragonTailPriceResetBtn.focus();
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
        dragonTailPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
dragonTailPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { dragonTailPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('dragon-tail-10-used-cnt');
    dragonTailTenTrial++;
    usedCnt.textContent = dragonTailTenTrial.toString();
    recalculateDragonTailTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('dragon-tail-60-used-cnt');
    dragonTailSixtyTrial++;
    usedCnt.textContent = dragonTailSixtyTrial.toString();
    recalculateDragonTailTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('dragon-tail-100-used-cnt');
    dragonTailHundredTrial++;
    usedCnt.textContent = dragonTailHundredTrial.toString();
    recalculateDragonTailTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('dragon-tail-phy-atk');
    defaultPhyAtk = 85
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('dragon-tail-phy-atk');
    defaultPhyAtk = 86
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('dragon-tail-phy-atk');
    defaultPhyAtk = 87
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('dragon-tail-phy-atk');
    defaultPhyAtk = 88
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('dragon-tail-phy-atk');
    defaultPhyAtk = 89
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('dragon-tail-phy-atk');
    defaultPhyAtk = 90
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('dragon-tail-phy-atk'); // 물리공격력
    let lukV = document.getElementById('dragon-tail-luk'); // LUK
    let phyDef = document.getElementById('dragon-tail-phy-def'); // 물리방어력

    let lukInfo = document.getElementById('dragon-tail-luk-info');
    let phyDefInfo = document.getElementById('dragon-tail-phy-def-info');

    let availableCnt = document.getElementById('dragon-tail-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('dragon-tail-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('dragon-tail-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    lukV.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();

    lukInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addDragonTailBuyCnt()
    }

    let title = document.getElementById('dragon-tail-title');
    let alertTxt = document.getElementById('dragon-tail-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, luk, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('dragon-tail-upgraded-count');
    let additionalElem = document.getElementById('dragon-tail-additional');
    let title = document.getElementById('dragon-tail-title');
    let availableCount = document.getElementById('dragon-tail-upgrade-available-count');

    let phyAtkElem = document.getElementById('dragon-tail-phy-atk');
    let lukElem = document.getElementById('dragon-tail-luk');
    let phyDefElem = document.getElementById('dragon-tail-phy-def');

    let lukElemInfo = document.getElementById('dragon-tail-luk-info');
    let phyDefElemInfo = document.getElementById('dragon-tail-phy-def-info');

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
        let successCnt = document.getElementById('dragon-tail-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('dragon-tail-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('dragon-tail-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('dragon-tail-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('dragon-tail-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('dragon-tail-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('dragon-tail-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = dragonTailImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('dragon-tail-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = dragonTailImgPath
        gifImg.hidden = true;
    }, 1000);
}



dragonTailPriceInput.oninput = () => {
    recalculateDragonTailTotalPrice()
}

dragonTailTenInput.oninput = () => {
    recalculateDragonTailTotalPrice();
}

dragonTailSixtyInput.oninput = () => {
    recalculateDragonTailTotalPrice();
}

dragonTailHundredInput.oninput = () => {
    recalculateDragonTailTotalPrice();
}

function recalculateDragonTailTotalPrice() {
    let dragonTailPriceInputElem = document.getElementById('dragon-tail-price');
    let tenInputElem = document.getElementById('dragon-tail-10-price');
    let sixtyInputElem = document.getElementById('dragon-tail-60-price');
    let hundredInputElem = document.getElementById('dragon-tail-100-price');
    let usedPriceElem = document.getElementById('dragon-tail-total-used-price');

    let price = parseInt(dragonTailPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * dragonTailCnt +
        (
            tenInput * dragonTailTenTrial +
            sixtyInput * dragonTailSixtyTrial +
            hundredInput *
            dragonTailHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
dragonTailPriceResetBtn.addEventListener('click', function () {
    resetDragonTailPrice()
});

function resetDragonTailPrice() {
    let tenSuccessCnt = document.getElementById('dragon-tail-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('dragon-tail-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('dragon-tail-100-success-cnt');
    let tenUsedCnt = document.getElementById('dragon-tail-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('dragon-tail-60-used-cnt');
    let hundredUsedCnt = document.getElementById('dragon-tail-100-used-cnt');
    let itemCnt = document.getElementById('dragon-tail-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    dragonTailTenTrial = 0;
    dragonTailSixtyTrial = 0;
    dragonTailHundredTrial = 0;
    dragonTailCnt = 1;

    recalculateDragonTailTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addDragonTailBuyCnt() {
    let buyCnt = document.getElementById('dragon-tail-cnt');
    dragonTailCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = dragonTailCnt.toString();
    recalculateDragonTailTotalPrice();
}