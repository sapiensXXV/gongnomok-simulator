import * as util from "../../global/util.js";

let defaultAvailableCnt = 5;
let defaultUpgradedCnt = 0;
let defaultPhyDef = 19;
let defaultMgDef = 24;
let defaultStr = 0;
let defaultDex = 0;
let defaultInt = 0;
let defaultLuk = 0;
let defaultHp = 0;
let defaultMp = 0;

let redGaiaStrongImgPath = '../img/item/armor/raggedy-cape.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

let normalOptionBtn = document.getElementById('red-gaia-cape-strong-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('red-gaia-cape-strong-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('red-gaia-cape-strong-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('red-gaia-cape-strong-three-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('red-gaia-cape-strong-10-percent-button');
let sixtyPerBtn = document.getElementById('red-gaia-cape-strong-60-percent-button');
let hundredPerBtn = document.getElementById('red-gaia-cape-strong-100-percent-button');
let resetBtn = document.getElementById('red-gaia-cape-strong-reset-button');

// 아이템 구매 횟수
let redGaiaStrongCnt = 1;

// 주문서 시도 횟수
let redGaiaStrongTenTrial = 0;
let redGaiaStrongSixtyTrial = 0;
let redGaiaStrongHundredTrial = 0;

// 가격 관련 button, input
let redGaiaStrongPriceInput = document.getElementById('red-gaia-cape-strong-price'); // 아이템 가격
let redGaiaStrongTenInput = document.getElementById('red-gaia-cape-strong-10-price'); // 10퍼센트 가격
let redGaiaStrongSixtyInput = document.getElementById('red-gaia-cape-strong-60-price'); // 60퍼센트 가격
let redGaiaStrongHundredInput = document.getElementById('red-gaia-cape-strong-100-price'); // 100퍼센트 가격
let redGaiaStrongPriceResetBtn = document.getElementById('red-gaia-cape-strong-price-reset-btn') // 리셋 버튼

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
        resetRedGaiaStrongPrice()
        redGaiaStrongPriceResetBtn.focus();
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
        redGaiaStrongPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
redGaiaStrongPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { redGaiaStrongPriceResetBtn.blur() }

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
        success(3, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('red-gaia-cape-strong-10-used-cnt');
    redGaiaStrongTenTrial++;
    usedCnt.textContent = redGaiaStrongTenTrial.toString();
    reCalculateRedGaiaStrongTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 60);

    } else {
        fail();

    }
    let usedCnt = document.getElementById('red-gaia-cape-strong-60-used-cnt');
    redGaiaStrongSixtyTrial++;
    usedCnt.textContent = redGaiaStrongSixtyTrial.toString();
    reCalculateRedGaiaStrongTotalPrice();

}
function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return

    success(1, 100);
    let usedCnt = document.getElementById('red-gaia-cape-strong-100-used-cnt');
    redGaiaStrongHundredTrial++;
    usedCnt.textContent = redGaiaStrongHundredTrial.toString();
    reCalculateRedGaiaStrongTotalPrice();

}

normalOptionBtn.addEventListener('click', function() {
    let phyDef = document.getElementById('red-gaia-cape-strong-phy-def');
    let mgDef = document.getElementById('red-gaia-cape-strong-mg-def');
    defaultPhyDef = 19;
    defaultMgDef = 24
    resetItem(false);
    phyDef.textContent = defaultPhyDef.toString()
    mgDef.textContent = defaultMgDef.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyDef = document.getElementById('red-gaia-cape-strong-phy-def');
    let mgDef = document.getElementById('red-gaia-cape-strong-mg-def');
    defaultPhyDef = 19;
    defaultMgDef = 25
    resetItem(false);
    phyDef.textContent = defaultPhyDef.toString()
    mgDef.textContent = defaultMgDef.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyDef = document.getElementById('red-gaia-cape-strong-phy-def');
    let mgDef = document.getElementById('red-gaia-cape-strong-mg-def');
    defaultPhyDef = 20;
    defaultMgDef = 26
    resetItem(false);
    phyDef.textContent = defaultPhyDef.toString()
    mgDef.textContent = defaultMgDef.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyDef = document.getElementById('red-gaia-cape-strong-phy-def');
    let mgDef = document.getElementById('red-gaia-cape-strong-mg-def');
    defaultPhyDef = 21;
    defaultMgDef = 27
    resetItem(false);
    phyDef.textContent = defaultPhyDef.toString()
    mgDef.textContent = defaultMgDef.toString()
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let strElem = document.getElementById('red-gaia-cape-strong-str-info');
    let strV = document.getElementById('red-gaia-cape-strong-str');
    let availableCnt = document.getElementById('red-gaia-cape-strong-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('red-gaia-cape-strong-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('red-gaia-cape-strong-additional');

    strV.textContent = defaultStr.toString();
    strElem.hidden = true;

    availableCnt.textContent = defaultAvailableCnt.toString();
    upgradeSuccessCnt.textContent = defaultUpgradedCnt.toString();
    additionalTitle.hidden = true
    if (isNew) {
        addRedGaiaStrongBuyCnt()
    }

    let title = document.getElementById('red-gaia-cape-strong-title');
    let alertTxt = document.getElementById('red-gaia-cape-strong-available-alert-txt');
    util.changeColor(title, parseInt(strV.textContent));
    alertTxt.hidden = true;
}

// DEX, 명중, 이동속도, 퍼센트
function success(str, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('red-gaia-cape-strong-upgraded-count');
    let additionalElem = document.getElementById('red-gaia-cape-strong-additional');
    let title = document.getElementById('red-gaia-cape-strong-title');
    let availableCount = document.getElementById('red-gaia-cape-strong-upgrade-available-count');
    let strElem = document.getElementById('red-gaia-cape-strong-str');
    let strInfoElem = document.getElementById('red-gaia-cape-strong-str-info');

    strElem.textContent = (parseInt(strElem.textContent) + str).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(strElem.textContent)) // 기본값이 0이므로 빼는 값이 없다
    additionalElem.hidden = false;

    if (parseInt(strElem.textContent) !== 0) {
        strInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('red-gaia-cape-strong-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('red-gaia-cape-strong-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('red-gaia-cape-strong-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('red-gaia-cape-strong-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('red-gaia-cape-strong-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('red-gaia-cape-strong-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('red-gaia-cape-strong-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = redGaiaStrongImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('red-gaia-cape-strong-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = redGaiaStrongImgPath
        gifImg.hidden = true;
    }, 1000);
}

redGaiaStrongPriceInput.oninput = () => {
    reCalculateRedGaiaStrongTotalPrice()
}

redGaiaStrongTenInput.oninput = () => {
    reCalculateRedGaiaStrongTotalPrice();
}

redGaiaStrongSixtyInput.oninput = () => {
    reCalculateRedGaiaStrongTotalPrice();
}

redGaiaStrongHundredInput.oninput = () => {
    reCalculateRedGaiaStrongTotalPrice();
}

function reCalculateRedGaiaStrongTotalPrice() {
    let redGaiaStrongPriceInputElem = document.getElementById('red-gaia-cape-strong-price');
    let tenInputElem = document.getElementById('red-gaia-cape-strong-10-price');
    let sixtyInputElem = document.getElementById('red-gaia-cape-strong-60-price');
    let hundredInputElem = document.getElementById('red-gaia-cape-strong-100-price');
    let usedPriceElem = document.getElementById('red-gaia-cape-strong-total-used-price');

    let price = parseInt(redGaiaStrongPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * redGaiaStrongCnt +
        (
            tenInput * redGaiaStrongTenTrial +
            sixtyInput * redGaiaStrongSixtyTrial +
            hundredInput *
            redGaiaStrongHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
redGaiaStrongPriceResetBtn.addEventListener('click', function () {
    resetRedGaiaStrongPrice()
});

function resetRedGaiaStrongPrice() {
    let tenSuccessCnt = document.getElementById('red-gaia-cape-strong-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('red-gaia-cape-strong-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('red-gaia-cape-strong-100-success-cnt');
    let tenUsedCnt = document.getElementById('red-gaia-cape-strong-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('red-gaia-cape-strong-60-used-cnt');
    let hundredUsedCnt = document.getElementById('red-gaia-cape-strong-100-used-cnt');
    let itemCnt = document.getElementById('red-gaia-cape-strong-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    redGaiaStrongTenTrial = 0;
    redGaiaStrongSixtyTrial = 0;
    redGaiaStrongHundredTrial = 0;
    redGaiaStrongCnt = 1;

    reCalculateRedGaiaStrongTotalPrice();
}

function addRedGaiaStrongBuyCnt() {
    let buyCnt = document.getElementById('red-gaia-cape-strong-cnt');
    redGaiaStrongCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = redGaiaStrongCnt.toString();
    reCalculateRedGaiaStrongTotalPrice();
}