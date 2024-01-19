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

let redGaiaIntelImgPath = '../img/item/armor/raggedy-cape.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

let normalOptionBtn = document.getElementById('red-gaia-cape-intel-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('red-gaia-cape-intel-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('red-gaia-cape-intel-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('red-gaia-cape-intel-three-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('red-gaia-cape-intel-10-percent-button');
let sixtyPerBtn = document.getElementById('red-gaia-cape-intel-60-percent-button');
let hundredPerBtn = document.getElementById('red-gaia-cape-intel-100-percent-button');
let resetBtn = document.getElementById('red-gaia-cape-intel-reset-button');

// 아이템 구매 횟수
let redGaiaIntelCnt = 1;

// 주문서 시도 횟수
let redGaiaIntelTenTrial = 0;
let redGaiaIntelSixtyTrial = 0;
let redGaiaIntelHundredTrial = 0;

// 가격 관련 button, input
let redGaiaIntelPriceInput = document.getElementById('red-gaia-cape-intel-price'); // 아이템 가격
let redGaiaIntelTenInput = document.getElementById('red-gaia-cape-intel-10-price'); // 10퍼센트 가격
let redGaiaIntelSixtyInput = document.getElementById('red-gaia-cape-intel-60-price'); // 60퍼센트 가격
let redGaiaIntelHundredInput = document.getElementById('red-gaia-cape-intel-100-price'); // 100퍼센트 가격
let redGaiaIntelPriceResetBtn = document.getElementById('red-gaia-cape-intel-price-reset-btn') // 리셋 버튼

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
        resetRedGaiaIntelPrice()
        redGaiaIntelPriceResetBtn.focus();
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
        redGaiaIntelPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
redGaiaIntelPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { redGaiaIntelPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('red-gaia-cape-intel-10-used-cnt');
    redGaiaIntelTenTrial++;
    usedCnt.textContent = redGaiaIntelTenTrial.toString();
    reCalculateRedGaiaIntelTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 60);

    } else {
        fail();

    }
    let usedCnt = document.getElementById('red-gaia-cape-intel-60-used-cnt');
    redGaiaIntelSixtyTrial++;
    usedCnt.textContent = redGaiaIntelSixtyTrial.toString();
    reCalculateRedGaiaIntelTotalPrice();

}
function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return

    success(1, 100);
    let usedCnt = document.getElementById('red-gaia-cape-intel-100-used-cnt');
    redGaiaIntelHundredTrial++;
    usedCnt.textContent = redGaiaIntelHundredTrial.toString();
    reCalculateRedGaiaIntelTotalPrice();

}

normalOptionBtn.addEventListener('click', function() {
    let phyDef = document.getElementById('red-gaia-cape-intel-phy-def');
    let mgDef = document.getElementById('red-gaia-cape-intel-mg-def');
    defaultPhyDef = 19;
    defaultMgDef = 24
    resetItem(false);
    phyDef.textContent = defaultPhyDef.toString()
    mgDef.textContent = defaultMgDef.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyDef = document.getElementById('red-gaia-cape-intel-phy-def');
    let mgDef = document.getElementById('red-gaia-cape-intel-mg-def');
    defaultPhyDef = 19;
    defaultMgDef = 25
    resetItem(false);
    phyDef.textContent = defaultPhyDef.toString()
    mgDef.textContent = defaultMgDef.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyDef = document.getElementById('red-gaia-cape-intel-phy-def');
    let mgDef = document.getElementById('red-gaia-cape-intel-mg-def');
    defaultPhyDef = 20;
    defaultMgDef = 26
    resetItem(false);
    phyDef.textContent = defaultPhyDef.toString()
    mgDef.textContent = defaultMgDef.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyDef = document.getElementById('red-gaia-cape-intel-phy-def');
    let mgDef = document.getElementById('red-gaia-cape-intel-mg-def');
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

    let intElem = document.getElementById('red-gaia-cape-intel-int-info');
    let intV = document.getElementById('red-gaia-cape-intel-int');
    let availableCnt = document.getElementById('red-gaia-cape-intel-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('red-gaia-cape-intel-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('red-gaia-cape-intel-additional');

    intV.textContent = defaultInt.toString();
    intElem.hidden = true;

    availableCnt.textContent = defaultAvailableCnt.toString();
    upgradeSuccessCnt.textContent = defaultUpgradedCnt.toString();
    additionalTitle.hidden = true
    if (isNew) {
        addRedGaiaIntelBuyCnt()
    }

    let title = document.getElementById('red-gaia-cape-intel-title');
    let alertTxt = document.getElementById('red-gaia-cape-intel-available-alert-txt');
    util.changeColor(title, parseInt(intV.textContent));
    alertTxt.hidden = true;
}

// INT, 명중, 이동속도, 퍼센트
function success(int, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('red-gaia-cape-intel-upgraded-count');
    let additionalElem = document.getElementById('red-gaia-cape-intel-additional');
    let title = document.getElementById('red-gaia-cape-intel-title');
    let availableCount = document.getElementById('red-gaia-cape-intel-upgrade-available-count');
    let intElem = document.getElementById('red-gaia-cape-intel-int');
    let intInfoElem = document.getElementById('red-gaia-cape-intel-int-info');

    intElem.textContent = (parseInt(intElem.textContent) + int).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(intElem.textContent)) // 기본값이 0이므로 빼는 값이 없다
    additionalElem.hidden = false;

    if (parseInt(intElem.textContent) !== 0) {
        intInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('red-gaia-cape-intel-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('red-gaia-cape-intel-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('red-gaia-cape-intel-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('red-gaia-cape-intel-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('red-gaia-cape-intel-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('red-gaia-cape-intel-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('red-gaia-cape-intel-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = redGaiaIntelImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('red-gaia-cape-intel-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = redGaiaIntelImgPath
        gifImg.hidden = true;
    }, 1000);
}

redGaiaIntelPriceInput.oninput = () => {
    reCalculateRedGaiaIntelTotalPrice()
}

redGaiaIntelTenInput.oninput = () => {
    reCalculateRedGaiaIntelTotalPrice();
}

redGaiaIntelSixtyInput.oninput = () => {
    reCalculateRedGaiaIntelTotalPrice();
}

redGaiaIntelHundredInput.oninput = () => {
    reCalculateRedGaiaIntelTotalPrice();
}

function reCalculateRedGaiaIntelTotalPrice() {
    let redGaiaIntelPriceInputElem = document.getElementById('red-gaia-cape-intel-price');
    let tenInputElem = document.getElementById('red-gaia-cape-intel-10-price');
    let sixtyInputElem = document.getElementById('red-gaia-cape-intel-60-price');
    let hundredInputElem = document.getElementById('red-gaia-cape-intel-100-price');
    let usedPriceElem = document.getElementById('red-gaia-cape-intel-total-used-price');

    let price = parseInt(redGaiaIntelPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * redGaiaIntelCnt +
        (
            tenInput * redGaiaIntelTenTrial +
            sixtyInput * redGaiaIntelSixtyTrial +
            hundredInput *
            redGaiaIntelHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
redGaiaIntelPriceResetBtn.addEventListener('click', function () {
    resetRedGaiaIntelPrice()
});

function resetRedGaiaIntelPrice() {
    let tenSuccessCnt = document.getElementById('red-gaia-cape-intel-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('red-gaia-cape-intel-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('red-gaia-cape-intel-100-success-cnt');
    let tenUsedCnt = document.getElementById('red-gaia-cape-intel-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('red-gaia-cape-intel-60-used-cnt');
    let hundredUsedCnt = document.getElementById('red-gaia-cape-intel-100-used-cnt');
    let itemCnt = document.getElementById('red-gaia-cape-intel-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    redGaiaIntelTenTrial = 0;
    redGaiaIntelSixtyTrial = 0;
    redGaiaIntelHundredTrial = 0;
    redGaiaIntelCnt = 1;

    reCalculateRedGaiaIntelTotalPrice();
}

function addRedGaiaIntelBuyCnt() {
    let buyCnt = document.getElementById('red-gaia-cape-intel-cnt');
    redGaiaIntelCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = redGaiaIntelCnt.toString();
    reCalculateRedGaiaIntelTotalPrice();
}