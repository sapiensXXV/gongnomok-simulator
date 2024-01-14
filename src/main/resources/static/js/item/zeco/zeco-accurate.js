import * as util from "../../global/util.js";

// 속성 값들
let defaultAtkSpeed = 4;
let defaultDex = 0;
let defaultPhyAtk = 62;
let defaultAcc = 0;
let defaultPhyDef = 0;
let defaultAvailableCount = 7;

let zecoAccurateImgPath = '../img/item/weapon/zeco.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('zeco-accurate-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('zeco-accurate-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('zeco-accurate-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('zeco-accurate-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('zeco-accurate-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('zeco-accurate-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('zeco-accurate-10-percent-button');
let sixtyPerBtn = document.getElementById('zeco-accurate-60-percent-button');
let hundredPerBtn = document.getElementById('zeco-accurate-100-percent-button');
let resetBtn = document.getElementById('zeco-accurate-reset-button');

// 아이템 구매 횟수
let zecoAccurateCnt = 1;

// 주문서 시도 횟수
let zecoAccurateTenTrial = 0;
let zecoAccurateSixtyTrial = 0;
let zecoAccurateHundredTrial = 0;

// 가격 관련 input, button
let zecoAccuratePriceInput = document.getElementById('zeco-accurate-price'); // 아이템 가격
let zecoAccurateTenInput = document.getElementById('zeco-accurate-10-price'); // 10퍼센트 가격
let zecoAccurateSixtyInput = document.getElementById('zeco-accurate-60-price'); // 60퍼센트 가격
let zecoAccurateHundredInput = document.getElementById('zeco-accurate-100-price'); // 100퍼센트 가격
let zecoAccuratePriceResetBtn = document.getElementById('zeco-accurate-price-reset-btn') // 리셋 버튼

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
        resetZecoAccuratePrice();
        zecoAccuratePriceResetBtn.focus();
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
        zecoAccuratePriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
zecoAccuratePriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { zecoAccuratePriceResetBtn.blur() }

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
        success(5, 3, 3, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('zeco-accurate-10-used-cnt');
    zecoAccurateTenTrial++;
    usedCnt.textContent = zecoAccurateTenTrial.toString();
    recalculateZecoAccurateTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(3, 1, 2, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('zeco-accurate-60-used-cnt');
    zecoAccurateSixtyTrial++;
    usedCnt.textContent = zecoAccurateSixtyTrial.toString();
    recalculateZecoAccurateTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('zeco-accurate-100-used-cnt');
    zecoAccurateHundredTrial++;
    usedCnt.textContent = zecoAccurateHundredTrial.toString();
    recalculateZecoAccurateTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('zeco-accurate-phy-atk');
    defaultPhyAtk = 62
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('zeco-accurate-phy-atk');
    defaultPhyAtk = 63;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('zeco-accurate-phy-atk');
    defaultPhyAtk = 64;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('zeco-accurate-phy-atk');
    defaultPhyAtk = 65;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('zeco-accurate-phy-atk');
    defaultPhyAtk = 66;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('zeco-accurate-phy-atk');
    defaultPhyAtk = 67;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('zeco-accurate-phy-atk'); // 물리공격력
    let dexV = document.getElementById('zeco-accurate-dex'); // STR
    let accV = document.getElementById('zeco-accurate-acc');

    let dexInfo = document.getElementById('zeco-accurate-dex-info'); // STR 정보 텍스트
    let accInfo = document.getElementById('zeco-accurate-acc-info');

    let availableCnt = document.getElementById('zeco-accurate-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('zeco-accurate-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('zeco-accurate-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString()
    accV.title = defaultAcc.toString();

    dexInfo.hidden = true; accInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addZecoAccurateBuyCnt()
    }

    let title = document.getElementById('zeco-accurate-title');
    let alertTxt = document.getElementById('zeco-accurate-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;

}

function success(acc, phyAtk, dex, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('zeco-accurate-upgraded-count');
    let additionalElem = document.getElementById('zeco-accurate-additional');
    let title = document.getElementById('zeco-accurate-title');
    let availableCount = document.getElementById('zeco-accurate-upgrade-available-count');
    let phyAtkElem = document.getElementById('zeco-accurate-phy-atk');

    let dexElem = document.getElementById('zeco-accurate-dex');
    let accElem = document.getElementById('zeco-accurate-acc');

    let dexInfoElem = document.getElementById('zeco-accurate-dex-info');
    let accInfoElem = document.getElementById('zeco-accurate-acc-info');


    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + phyAtk).toString();
    dexElem.textContent = (parseInt(dexElem.textContent) + dex).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(dexElem.textContent) !== 0) {
        dexInfoElem.hidden = false;
    }
    if (parseInt(accElem.textContent) !== 0) {
        accInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('zeco-accurate-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('zeco-accurate-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('zeco-accurate-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('zeco-accurate-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('zeco-accurate-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('zeco-accurate-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('zeco-accurate-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = zecoAccurateImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('zeco-accurate-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = zecoAccurateImgPath
        gifImg.hidden = true;
    }, 1000);
}

zecoAccuratePriceInput.oninput = () => {
    recalculateZecoAccurateTotalPrice();
}

zecoAccurateTenInput.oninput = () => {
    recalculateZecoAccurateTotalPrice();
}

zecoAccurateSixtyInput.oninput = () => {
    recalculateZecoAccurateTotalPrice();
}

zecoAccurateHundredInput.oninput = () => {
    recalculateZecoAccurateTotalPrice();
}

function recalculateZecoAccurateTotalPrice() {
    let zecoAccuratePriceInputElem = document.getElementById('zeco-accurate-price');
    let tenInputElem = document.getElementById('zeco-accurate-10-price');
    let sixtyInputElem = document.getElementById('zeco-accurate-60-price');
    let hundredInputElem = document.getElementById('zeco-accurate-100-price');
    let usedPriceElem = document.getElementById('zeco-accurate-total-used-price');

    let price = parseInt(zecoAccuratePriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * zecoAccurateCnt +
        (
            tenInput * zecoAccurateTenTrial +
            sixtyInput * zecoAccurateSixtyTrial +
            hundredInput *
            zecoAccurateHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
zecoAccuratePriceResetBtn.addEventListener('click', function () {
    resetZecoAccuratePrice()
});

function resetZecoAccuratePrice() {
    let tenSuccessCnt = document.getElementById('zeco-accurate-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('zeco-accurate-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('zeco-accurate-100-success-cnt');
    let tenUsedCnt = document.getElementById('zeco-accurate-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('zeco-accurate-60-used-cnt');
    let hundredUsedCnt = document.getElementById('zeco-accurate-100-used-cnt');
    let itemCnt = document.getElementById('zeco-accurate-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    zecoAccurateTenTrial = 0;
    zecoAccurateSixtyTrial = 0;
    zecoAccurateHundredTrial = 0;
    zecoAccurateCnt = 1;

    recalculateZecoAccurateTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addZecoAccurateBuyCnt() {
    let buyCnt = document.getElementById('zeco-accurate-cnt');
    zecoAccurateCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = zecoAccurateCnt.toString();
    recalculateZecoAccurateTotalPrice();
}