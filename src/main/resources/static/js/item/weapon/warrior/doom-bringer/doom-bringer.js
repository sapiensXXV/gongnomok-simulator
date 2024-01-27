import * as util from "../../../../global/util.js";

// 속성 값들
let defaultStr = 0;
let defaultPhyAtk = 85;
let defaultPhyDef = 0;
let defaultAvailableCount = 7;

let doomBringerImgPath = '../img/item/weapon/doom-bringer.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('doom-bringer-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('doom-bringer-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('doom-bringer-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('doom-bringer-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('doom-bringer-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('doom-bringer-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('doom-bringer-10-percent-button');
let sixtyPerBtn = document.getElementById('doom-bringer-60-percent-button');
let hundredPerBtn = document.getElementById('doom-bringer-100-percent-button');
let resetBtn = document.getElementById('doom-bringer-reset-button');

// 아이템 구매 횟수
let doomBringerCnt = 1;

// 주문서 시도 횟수
let doomBringerTenTrial = 0;
let doomBringerSixtyTrial = 0;
let doomBringerHundredTrial = 0;

// 가격 관련 input, button
let doomBringerPriceInput = document.getElementById('doom-bringer-price'); // 아이템 가격
let doomBringerTenInput = document.getElementById('doom-bringer-10-price'); // 10퍼센트 가격
let doomBringerSixtyInput = document.getElementById('doom-bringer-60-price'); // 60퍼센트 가격
let doomBringerHundredInput = document.getElementById('doom-bringer-100-price'); // 100퍼센트 가격
let doomBringerPriceResetBtn = document.getElementById('doom-bringer-price-reset-btn') // 리셋 버튼

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
        resetDoomBringerPrice();
        doomBringerPriceResetBtn.focus();
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
        doomBringerPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
doomBringerPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { doomBringerPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('doom-bringer-10-used-cnt');
    doomBringerTenTrial++;
    usedCnt.textContent = doomBringerTenTrial.toString();
    recalculateDoomBringerTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('doom-bringer-60-used-cnt');
    doomBringerSixtyTrial++;
    usedCnt.textContent = doomBringerSixtyTrial.toString();
    recalculateDoomBringerTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('doom-bringer-100-used-cnt');
    doomBringerHundredTrial++;
    usedCnt.textContent = doomBringerHundredTrial.toString();
    recalculateDoomBringerTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('doom-bringer-phy-atk');
    defaultPhyAtk = 85;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('doom-bringer-phy-atk');
    defaultPhyAtk = 86;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('doom-bringer-phy-atk');
    defaultPhyAtk = 87;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('doom-bringer-phy-atk');
    defaultPhyAtk = 88;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('doom-bringer-phy-atk');
    defaultPhyAtk = 89;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('doom-bringer-phy-atk');
    defaultPhyAtk = 90;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('doom-bringer-phy-atk'); // 물리공격력
    let strV = document.getElementById('doom-bringer-str'); // STR
    let strInfo = document.getElementById('doom-bringer-str-info'); // STR 정보 텍스트
    let phyDef = document.getElementById('doom-bringer-phy-def'); // 물리방어력
    let phyDefInfo = document.getElementById('doom-bringer-phy-def-info'); // 물리방어력 정보 텍스트
    let availableCnt = document.getElementById('doom-bringer-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('doom-bringer-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('doom-bringer-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    strV.textContent = defaultStr.toString()
    phyDef.textContent = defaultPhyDef.toString();

    strInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addDoomBringerBuyCnt()
    }

    let title = document.getElementById('doom-bringer-title');
    let alertTxt = document.getElementById('doom-bringer-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;

}

function success(phyAtk, strV, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('doom-bringer-upgraded-count');
    let additionalElem = document.getElementById('doom-bringer-additional');
    let title = document.getElementById('doom-bringer-title');
    let availableCount = document.getElementById('doom-bringer-upgrade-available-count');
    let phyAtkElem = document.getElementById('doom-bringer-phy-atk');

    let strElem = document.getElementById('doom-bringer-str');
    let strInfoElem = document.getElementById('doom-bringer-str-info');

    let phyDefElem = document.getElementById('doom-bringer-phy-def');
    let phyDefInfoElem = document.getElementById('doom-bringer-phy-def-info');


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
        let successCnt = document.getElementById('doom-bringer-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('doom-bringer-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('doom-bringer-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('doom-bringer-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('doom-bringer-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('doom-bringer-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('doom-bringer-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = doomBringerImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('doom-bringer-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = doomBringerImgPath
        gifImg.hidden = true;
    }, 1000);
}



doomBringerPriceInput.oninput = () => {
    recalculateDoomBringerTotalPrice()
}

doomBringerTenInput.oninput = () => {
    recalculateDoomBringerTotalPrice();
}

doomBringerSixtyInput.oninput = () => {
    recalculateDoomBringerTotalPrice();
}

doomBringerHundredInput.oninput = () => {
    recalculateDoomBringerTotalPrice();
}

function recalculateDoomBringerTotalPrice() {
    let doomBringerPriceInputElem = document.getElementById('doom-bringer-price');
    let tenInputElem = document.getElementById('doom-bringer-10-price');
    let sixtyInputElem = document.getElementById('doom-bringer-60-price');
    let hundredInputElem = document.getElementById('doom-bringer-100-price');
    let usedPriceElem = document.getElementById('doom-bringer-total-used-price');

    let price = parseInt(doomBringerPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * doomBringerCnt +
        (
            tenInput * doomBringerTenTrial +
            sixtyInput * doomBringerSixtyTrial +
            hundredInput *
            doomBringerHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
doomBringerPriceResetBtn.addEventListener('click', function () {
    resetDoomBringerPrice()
});

function resetDoomBringerPrice() {
    let tenSuccessCnt = document.getElementById('doom-bringer-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('doom-bringer-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('doom-bringer-100-success-cnt');
    let tenUsedCnt = document.getElementById('doom-bringer-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('doom-bringer-60-used-cnt');
    let hundredUsedCnt = document.getElementById('doom-bringer-100-used-cnt');
    let itemCnt = document.getElementById('doom-bringer-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    doomBringerTenTrial = 0;
    doomBringerSixtyTrial = 0;
    doomBringerHundredTrial = 0;
    doomBringerCnt = 1;

    recalculateDoomBringerTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addDoomBringerBuyCnt() {
    let buyCnt = document.getElementById('doom-bringer-cnt');
    doomBringerCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = doomBringerCnt.toString();
    recalculateDoomBringerTotalPrice();
}