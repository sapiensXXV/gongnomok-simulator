import * as util from "../../../../global/util.js";

// 속성 값들
let defaultInt = 4;
let defaultPhyDef = 30
let defaultMgDef = 60;
let defaultAvailableCount = 7;

let darkSeraphisImgPath = '../img/item/armor/dark-seraphis.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('dark-seraphis-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('dark-seraphis-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('dark-seraphis-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('dark-seraphis-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('dark-seraphis-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('dark-seraphis-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('dark-seraphis-10-percent-button');
let sixtyPerBtn = document.getElementById('dark-seraphis-60-percent-button');
let hundredPerBtn = document.getElementById('dark-seraphis-100-percent-button');
let resetBtn = document.getElementById('dark-seraphis-reset-button');

// 아이템 구매 횟수
let darkSeraphisCnt = 1;

// 주문서 시도 횟수
let darkSeraphisTenTrial = 0;
let darkSeraphisSixtyTrial = 0;
let darkSeraphisHundredTrial = 0;

// 가격 관련 input, button
let darkSeraphisPriceInput = document.getElementById('dark-seraphis-price'); // 아이템 가격
let darkSeraphisTenInput = document.getElementById('dark-seraphis-10-price'); // 10퍼센트 가격
let darkSeraphisSixtyInput = document.getElementById('dark-seraphis-60-price'); // 60퍼센트 가격
let darkSeraphisHundredInput = document.getElementById('dark-seraphis-100-price'); // 100퍼센트 가격
let darkSeraphisPriceResetBtn = document.getElementById('dark-seraphis-price-reset-btn') // 리셋 버튼

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
        resetDarkSeraphisPrice();
        darkSeraphisPriceResetBtn.focus();
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
        darkSeraphisPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
darkSeraphisPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { darkSeraphisPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('dark-seraphis-10-used-cnt');
    darkSeraphisTenTrial++;
    usedCnt.textContent = darkSeraphisTenTrial.toString();
    recalculateDarkSeraphisTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('dark-seraphis-60-used-cnt');
    darkSeraphisSixtyTrial++;
    usedCnt.textContent = darkSeraphisSixtyTrial.toString();
    recalculateDarkSeraphisTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 100);

    let usedCnt = document.getElementById('dark-seraphis-100-used-cnt');
    darkSeraphisHundredTrial++;
    usedCnt.textContent = darkSeraphisHundredTrial.toString();
    recalculateDarkSeraphisTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-seraphis-mg-int');
    let phyDef = document.getElementById('dark-seraphis-phy-def');
    let mgDef = document.getElementById('dark-seraphis-mg-def');

    defaultInt = 4;
    defaultPhyDef = 30;
    defaultMgDef = 60;

    resetItem(false);
    int.textContent = defaultInt.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-seraphis-mg-int');
    let phyDef = document.getElementById('dark-seraphis-phy-def');
    let mgDef = document.getElementById('dark-seraphis-mg-def');

    defaultInt = 4;
    defaultPhyDef = 31;
    defaultMgDef = 61;

    resetItem(false);
    int.textContent = defaultInt.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-seraphis-mg-int');
    let phyDef = document.getElementById('dark-seraphis-phy-def');
    let mgDef = document.getElementById('dark-seraphis-mg-def');

    defaultInt = 4;
    defaultPhyDef = 32;
    defaultMgDef = 62;

    resetItem(false);
    int.textContent = defaultInt.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-seraphis-mg-int');
    let phyDef = document.getElementById('dark-seraphis-phy-def');
    let mgDef = document.getElementById('dark-seraphis-mg-def');

    defaultInt = 5;
    defaultPhyDef = 33;
    defaultMgDef = 63;

    resetItem(false);
    int.textContent = defaultInt.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-seraphis-mg-int');
    let phyDef = document.getElementById('dark-seraphis-phy-def');
    let mgDef = document.getElementById('dark-seraphis-mg-def');

    defaultInt = 5;
    defaultPhyDef = 34;
    defaultMgDef = 64;

    resetItem(false);
    int.textContent = defaultInt.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-seraphis-mg-int');
    let phyDef = document.getElementById('dark-seraphis-phy-def');
    let mgDef = document.getElementById('dark-seraphis-mg-def');

    defaultInt = 5;
    defaultPhyDef = 34;
    defaultMgDef = 65;

    resetItem(false);
    int.textContent = defaultInt.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyDef = document.getElementById('dark-seraphis-phy-def'); // 물리공격력
    let mgDef = document.getElementById('dark-seraphis-mg-def'); // 마법공격력
    let intV = document.getElementById('dark-seraphis-int'); // INT

    let availableCnt = document.getElementById('dark-seraphis-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('dark-seraphis-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('dark-seraphis-additional');

    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
    intV.textContent = defaultInt.toString();

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addDarkSeraphisBuyCnt()
    }

    let title = document.getElementById('dark-seraphis-title');
    let alertTxt = document.getElementById('dark-seraphis-available-alert-txt');
    util.changeColor(title, parseInt(intV.textContent) - defaultInt);
    alertTxt.hidden = true;

}

function success(int, percent) {
    console.log('scroll success');

    let upgradedCountElem = document.getElementById('dark-seraphis-upgraded-count');
    let additionalElem = document.getElementById('dark-seraphis-additional');
    let title = document.getElementById('dark-seraphis-title');
    let availableCount = document.getElementById('dark-seraphis-upgrade-available-count');
    let intElem = document.getElementById('dark-seraphis-int');

    intElem.textContent = (parseInt(intElem.textContent) + int).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(intElem.textContent) - defaultInt)
    additionalElem.hidden = false;

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('dark-seraphis-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('dark-seraphis-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('dark-seraphis-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('dark-seraphis-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('dark-seraphis-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('dark-seraphis-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('dark-seraphis-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = darkSeraphisImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('dark-seraphis-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = darkSeraphisImgPath
        gifImg.hidden = true;
    }, 1000);
}



darkSeraphisPriceInput.oninput = () => {
    recalculateDarkSeraphisTotalPrice()
}

darkSeraphisTenInput.oninput = () => {
    recalculateDarkSeraphisTotalPrice();
}

darkSeraphisSixtyInput.oninput = () => {
    recalculateDarkSeraphisTotalPrice();
}

darkSeraphisHundredInput.oninput = () => {
    recalculateDarkSeraphisTotalPrice();
}

function recalculateDarkSeraphisTotalPrice() {
    let darkSeraphisPriceInputElem = document.getElementById('dark-seraphis-price');
    let tenInputElem = document.getElementById('dark-seraphis-10-price');
    let sixtyInputElem = document.getElementById('dark-seraphis-60-price');
    let hundredInputElem = document.getElementById('dark-seraphis-100-price');
    let usedPriceElem = document.getElementById('dark-seraphis-total-used-price');

    let price = parseInt(darkSeraphisPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * darkSeraphisCnt +
        (
            tenInput * darkSeraphisTenTrial +
            sixtyInput * darkSeraphisSixtyTrial +
            hundredInput *
            darkSeraphisHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
darkSeraphisPriceResetBtn.addEventListener('click', function () {
    resetDarkSeraphisPrice()
});

function resetDarkSeraphisPrice() {
    let tenSuccessCnt = document.getElementById('dark-seraphis-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('dark-seraphis-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('dark-seraphis-100-success-cnt');
    let tenUsedCnt = document.getElementById('dark-seraphis-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('dark-seraphis-60-used-cnt');
    let hundredUsedCnt = document.getElementById('dark-seraphis-100-used-cnt');
    let itemCnt = document.getElementById('dark-seraphis-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    darkSeraphisTenTrial = 0;
    darkSeraphisSixtyTrial = 0;
    darkSeraphisHundredTrial = 0;
    darkSeraphisCnt = 1;

    recalculateDarkSeraphisTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addDarkSeraphisBuyCnt() {
    let buyCnt = document.getElementById('dark-seraphis-cnt');
    darkSeraphisCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = darkSeraphisCnt.toString();
    recalculateDarkSeraphisTotalPrice();
}