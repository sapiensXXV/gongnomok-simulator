import * as util from "../../../../global/util.js";

// 속성 값들
let defaultStr = 0;
let defaultPhyAtk = 95;
let defaultPhyDef = 0;
let defaultAvailableCount = 7;

let devilSunriseImgPath = '../img/item/weapon/devil-sunrise.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('devil-sunrise-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('devil-sunrise-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('devil-sunrise-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('devil-sunrise-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('devil-sunrise-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('devil-sunrise-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('devil-sunrise-10-percent-button');
let sixtyPerBtn = document.getElementById('devil-sunrise-60-percent-button');
let hundredPerBtn = document.getElementById('devil-sunrise-100-percent-button');
let resetBtn = document.getElementById('devil-sunrise-reset-button');

// 아이템 구매 횟수
let devilSunriseCnt = 1;

// 주문서 시도 횟수
let devilSunriseTenTrial = 0;
let devilSunriseSixtyTrial = 0;
let devilSunriseHundredTrial = 0;

// 가격 관련 input, button
let devilSunrisePriceInput = document.getElementById('devil-sunrise-price'); // 아이템 가격
let devilSunriseTenInput = document.getElementById('devil-sunrise-10-price'); // 10퍼센트 가격
let devilSunriseSixtyInput = document.getElementById('devil-sunrise-60-price'); // 60퍼센트 가격
let devilSunriseHundredInput = document.getElementById('devil-sunrise-100-price'); // 100퍼센트 가격
let devilSunrisePriceResetBtn = document.getElementById('devil-sunrise-price-reset-btn') // 리셋 버튼

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
        resetDevilSunrisePrice();
        devilSunrisePriceResetBtn.focus();
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
        devilSunrisePriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
devilSunrisePriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { devilSunrisePriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('devil-sunrise-10-used-cnt');
    devilSunriseTenTrial++;
    usedCnt.textContent = devilSunriseTenTrial.toString();
    recalculateDevilSunriseTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('devil-sunrise-60-used-cnt');
    devilSunriseSixtyTrial++;
    usedCnt.textContent = devilSunriseSixtyTrial.toString();
    recalculateDevilSunriseTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('devil-sunrise-100-used-cnt');
    devilSunriseHundredTrial++;
    usedCnt.textContent = devilSunriseHundredTrial.toString();
    recalculateDevilSunriseTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('devil-sunrise-phy-atk');
    defaultPhyAtk = 95;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('devil-sunrise-phy-atk');
    defaultPhyAtk = 96;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('devil-sunrise-phy-atk');
    defaultPhyAtk = 97;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('devil-sunrise-phy-atk');
    defaultPhyAtk = 98;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('devil-sunrise-phy-atk');
    defaultPhyAtk = 99;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('devil-sunrise-phy-atk');
    defaultPhyAtk = 100;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('devil-sunrise-phy-atk'); // 물리공격력
    let strV = document.getElementById('devil-sunrise-str'); // STR
    let strInfo = document.getElementById('devil-sunrise-str-info'); // STR 정보 텍스트
    let phyDef = document.getElementById('devil-sunrise-phy-def'); // 물리방어력
    let phyDefInfo = document.getElementById('devil-sunrise-phy-def-info'); // 물리방어력 정보 텍스트
    let availableCnt = document.getElementById('devil-sunrise-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('devil-sunrise-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('devil-sunrise-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    strV.textContent = defaultStr.toString()
    phyDef.textContent = defaultPhyDef.toString();

    strInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addDevilSunriseBuyCnt()
    }

    let title = document.getElementById('devil-sunrise-title');
    let alertTxt = document.getElementById('devil-sunrise-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;

}

function success(phyAtk, strV, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('devil-sunrise-upgraded-count');
    let additionalElem = document.getElementById('devil-sunrise-additional');
    let title = document.getElementById('devil-sunrise-title');
    let availableCount = document.getElementById('devil-sunrise-upgrade-available-count');
    let phyAtkElem = document.getElementById('devil-sunrise-phy-atk');

    let strElem = document.getElementById('devil-sunrise-str');
    let strInfoElem = document.getElementById('devil-sunrise-str-info');

    let phyDefElem = document.getElementById('devil-sunrise-phy-def');
    let phyDefInfoElem = document.getElementById('devil-sunrise-phy-def-info');


    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + phyAtk).toString();
    strElem.textContent = (parseInt(strElem.textContent) + strV).toString();
    phyDefElem.textContent = (parseInt(phyDefElem.textContent) + phyDef).toString();


    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(strElem.textContent) !== 0) {
        strInfoElem.hidden = false;
    }
    if (parseInt(phyDefElem.textContent) !== 0) {
        phyDefInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('devil-sunrise-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('devil-sunrise-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('devil-sunrise-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('devil-sunrise-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('devil-sunrise-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('devil-sunrise-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('devil-sunrise-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = devilSunriseImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('devil-sunrise-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = devilSunriseImgPath
        gifImg.hidden = true;
    }, 1000);
}



devilSunrisePriceInput.oninput = () => {
    recalculateDevilSunriseTotalPrice()
}

devilSunriseTenInput.oninput = () => {
    recalculateDevilSunriseTotalPrice();
}

devilSunriseSixtyInput.oninput = () => {
    recalculateDevilSunriseTotalPrice();
}

devilSunriseHundredInput.oninput = () => {
    recalculateDevilSunriseTotalPrice();
}

function recalculateDevilSunriseTotalPrice() {
    let devilSunrisePriceInputElem = document.getElementById('devil-sunrise-price');
    let tenInputElem = document.getElementById('devil-sunrise-10-price');
    let sixtyInputElem = document.getElementById('devil-sunrise-60-price');
    let hundredInputElem = document.getElementById('devil-sunrise-100-price');
    let usedPriceElem = document.getElementById('devil-sunrise-total-used-price');

    let price = parseInt(devilSunrisePriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * devilSunriseCnt +
        (
            tenInput * devilSunriseTenTrial +
            sixtyInput * devilSunriseSixtyTrial +
            hundredInput *
            devilSunriseHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
devilSunrisePriceResetBtn.addEventListener('click', function () {
    resetDevilSunrisePrice()
});

function resetDevilSunrisePrice() {
    let tenSuccessCnt = document.getElementById('devil-sunrise-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('devil-sunrise-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('devil-sunrise-100-success-cnt');
    let tenUsedCnt = document.getElementById('devil-sunrise-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('devil-sunrise-60-used-cnt');
    let hundredUsedCnt = document.getElementById('devil-sunrise-100-used-cnt');
    let itemCnt = document.getElementById('devil-sunrise-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    devilSunriseTenTrial = 0;
    devilSunriseSixtyTrial = 0;
    devilSunriseHundredTrial = 0;
    devilSunriseCnt = 1;

    recalculateDevilSunriseTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addDevilSunriseBuyCnt() {
    let buyCnt = document.getElementById('devil-sunrise-cnt');
    devilSunriseCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = devilSunriseCnt.toString();
    recalculateDevilSunriseTotalPrice();
}