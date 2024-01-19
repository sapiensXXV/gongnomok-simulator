import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 72;
let defaultPhyDef = 0;
let defaultDex = 0;
let defaultLuk = 0;
let defaultAcc = 0;
let defaultAvo = 0;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let getaImgPath = '../img/item/weapon/thief/geta.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('geta-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('geta-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('geta-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('geta-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('geta-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('geta-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('geta-10-percent-button');
let sixtyPerBtn = document.getElementById('geta-60-percent-button');
let hundredPerBtn = document.getElementById('geta-100-percent-button');
let resetBtn = document.getElementById('geta-reset-button');

// 아이템 구매 횟수
let getaCnt = 1;

// 주문서 시도 횟수
let getaTenTrial = 0;
let getaSixtyTrial = 0;
let getaHundredTrial = 0;

// 가격 관련 input, button
let getaPriceInput = document.getElementById('geta-price'); // 아이템 가격
let getaTenInput = document.getElementById('geta-10-price'); // 10퍼센트 가격
let getaSixtyInput = document.getElementById('geta-60-price'); // 60퍼센트 가격
let getaHundredInput = document.getElementById('geta-100-price'); // 100퍼센트 가격
let getaPriceResetBtn = document.getElementById('geta-price-reset-btn') // 리셋 버튼

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
        resetGetaPrice();
        getaPriceResetBtn.focus();
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
        getaPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
getaPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { getaPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('geta-10-used-cnt');
    getaTenTrial++;
    usedCnt.textContent = getaTenTrial.toString();
    recalculateGetaTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('geta-60-used-cnt');
    getaSixtyTrial++;
    usedCnt.textContent = getaSixtyTrial.toString();
    recalculateGetaTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('geta-100-used-cnt');
    getaHundredTrial++;
    usedCnt.textContent = getaHundredTrial.toString();
    recalculateGetaTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('geta-phy-atk');
    defaultPhyAtk = 72;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('geta-phy-atk');
    defaultPhyAtk = 73;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('geta-phy-atk');
    defaultPhyAtk = 74;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('geta-phy-atk');
    defaultPhyAtk = 75;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('geta-phy-atk');
    defaultPhyAtk = 76;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('geta-phy-atk');
    defaultPhyAtk = 77;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('geta-phy-atk'); // 물리공격력
    let lukV = document.getElementById('geta-luk'); // LUK
    let phyDef = document.getElementById('geta-phy-def'); // 물리방어력

    let lukInfo = document.getElementById('geta-luk-info');
    let phyDefInfo = document.getElementById('geta-phy-def-info');

    let availableCnt = document.getElementById('geta-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('geta-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('geta-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    lukV.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();

    lukInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addGetaBuyCnt()
    }

    let title = document.getElementById('geta-title');
    let alertTxt = document.getElementById('geta-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, luk, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('geta-upgraded-count');
    let additionalElem = document.getElementById('geta-additional');
    let title = document.getElementById('geta-title');
    let availableCount = document.getElementById('geta-upgrade-available-count');

    let phyAtkElem = document.getElementById('geta-phy-atk');
    let lukElem = document.getElementById('geta-luk');
    let phyDefElem = document.getElementById('geta-phy-def');

    let lukElemInfo = document.getElementById('geta-luk-info');
    let phyDefElemInfo = document.getElementById('geta-phy-def-info');

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
        let successCnt = document.getElementById('geta-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('geta-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('geta-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('geta-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('geta-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('geta-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('geta-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = getaImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('geta-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = getaImgPath
        gifImg.hidden = true;
    }, 1000);
}

getaPriceInput.oninput = () => {
    recalculateGetaTotalPrice()
}

getaTenInput.oninput = () => {
    recalculateGetaTotalPrice();
}

getaSixtyInput.oninput = () => {
    recalculateGetaTotalPrice();
}

getaHundredInput.oninput = () => {
    recalculateGetaTotalPrice();
}

function recalculateGetaTotalPrice() {
    let getaPriceInputElem = document.getElementById('geta-price');
    let tenInputElem = document.getElementById('geta-10-price');
    let sixtyInputElem = document.getElementById('geta-60-price');
    let hundredInputElem = document.getElementById('geta-100-price');
    let usedPriceElem = document.getElementById('geta-total-used-price');

    let price = parseInt(getaPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * getaCnt +
        (
            tenInput * getaTenTrial +
            sixtyInput * getaSixtyTrial +
            hundredInput *
            getaHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
getaPriceResetBtn.addEventListener('click', function () {
    resetGetaPrice()
});

function resetGetaPrice() {
    let tenSuccessCnt = document.getElementById('geta-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('geta-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('geta-100-success-cnt');
    let tenUsedCnt = document.getElementById('geta-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('geta-60-used-cnt');
    let hundredUsedCnt = document.getElementById('geta-100-used-cnt');
    let itemCnt = document.getElementById('geta-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    getaTenTrial = 0;
    getaSixtyTrial = 0;
    getaHundredTrial = 0;
    getaCnt = 1;

    recalculateGetaTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addGetaBuyCnt() {
    let buyCnt = document.getElementById('geta-cnt');
    getaCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = getaCnt.toString();
    recalculateGetaTotalPrice();
}