import * as util from "../../global/util.js";

// 속성 값들
let defaultBrownScarabUpgradeAvailableCnt = 7;
let defaultPhyAtk = 34;
let defaultPhyDef = 3;
let defaultAcc = 0;
let defaultLuk = 4;

let brownScarabImgPath = '../img/item/weapon/brown-scarab.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('brown-scarab-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('brown-scarab-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('brown-scarab-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('brown-scarab-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('brown-scarab-four-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('brown-scarab-10-percent-button');
let sixtyPerBtn = document.getElementById('brown-scarab-60-percent-button');
let hundredPerBtn = document.getElementById('brown-scarab-100-percent-button');
let resetBtn = document.getElementById('brown-scarab-reset-button');

// 아이템 구매 횟수
let brownScarabCnt = 1;

// 주문서 시도 횟수
let brownScarabTenTrial = 0;
let brownScarabSixtyTrial = 0;
let brownScarabHundredTrial = 0;

let brownScarabPriceInput = document.getElementById('brown-scarab-price'); // 아이템 가격
let brownScarabTenInput = document.getElementById('brown-scarab-10-price'); // 10퍼센트 가격
let brownScarabSixtyInput = document.getElementById('brown-scarab-60-price'); // 60퍼센트 가격
let brownScarabHundredInput = document.getElementById('brown-scarab-100-price'); // 100퍼센트 가격
let brownScarabPriceResetBtn = document.getElementById('brown-scarab-price-reset-btn') // 리셋 버튼

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
        resetBrownScarabPrice();
        brownScarabPriceResetBtn.focus();
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
        brownScarabPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
brownScarabPriceResetBtn.addEventListener('mouseup', brownScarabPriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function brownScarabPriceResetBtnMouseUp() { brownScarabPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('brown-scarab-10-used-cnt');
    brownScarabTenTrial++;
    usedCnt.textContent = brownScarabTenTrial.toString();
    recalculateBrownScarabTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('brown-scarab-60-used-cnt');
    brownScarabSixtyTrial++;
    usedCnt.textContent = brownScarabSixtyTrial.toString();
    recalculateBrownScarabTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('brown-scarab-100-used-cnt');
    brownScarabHundredTrial++;
    usedCnt.textContent = brownScarabHundredTrial.toString();
    recalculateBrownScarabTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('brown-scarab-phy-atk');
    let phyDef = document.getElementById('brown-scarab-phy-def');
    let lukV= document.getElementById('brown-scarab-luk');

    defaultPhyAtk = 34;
    defaultPhyDef = 3;
    defaultLuk = 4;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    lukV.textContent = defaultLuk.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('brown-scarab-phy-atk');
    let phyDef = document.getElementById('brown-scarab-phy-def');
    let lukV= document.getElementById('brown-scarab-luk');

    defaultPhyAtk = 35;
    defaultPhyDef = 3;
    defaultLuk = 4;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    lukV.textContent = defaultLuk.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('brown-scarab-phy-atk');
    let phyDef = document.getElementById('brown-scarab-phy-def');
    let lukV= document.getElementById('brown-scarab-luk');

    defaultPhyAtk = 36;
    defaultPhyDef = 4;
    defaultLuk = 4;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    lukV.textContent = defaultLuk.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('brown-scarab-phy-atk');
    let phyDef = document.getElementById('brown-scarab-phy-def');
    let lukV= document.getElementById('brown-scarab-luk');

    defaultPhyAtk = 37;
    defaultPhyDef = 4;
    defaultLuk = 5;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    lukV.textContent = defaultLuk.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('brown-scarab-phy-atk');
    let phyDef = document.getElementById('brown-scarab-phy-def');
    let lukV= document.getElementById('brown-scarab-luk');

    defaultPhyAtk = 38;
    defaultPhyDef = 4;
    defaultLuk = 5;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    lukV.textContent = defaultLuk.toString();
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('brown-scarab-phy-atk'); // 물리공격력
    let accV = document.getElementById('brown-scarab-acc'); // 명중률
    let lukV = document.getElementById('brown-scarab-luk'); // LUK
    let accInfo = document.getElementById('brown-scarab-acc-info'); // 명중률 정보 텍스트
    let availableCnt = document.getElementById('brown-scarab-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('brown-scarab-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('brown-scarab-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    accV.textContent = defaultAcc.toString();
    lukV.textContent = defaultLuk.toString();

    availableCnt.textContent = defaultBrownScarabUpgradeAvailableCnt.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    accInfo.hidden = true;

    if (isNew) {
        addBrownScarabBuyCnt()
    }

    let title = document.getElementById('brown-scarab-title');
    let alertTxt = document.getElementById('brown-scarab-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(atk, acc, luk, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('brown-scarab-upgraded-count'); // 업그레이드 성공 카운트
    let additionalElem = document.getElementById('brown-scarab-additional'); // 업그레이드 성공 정보 텍스트 ex. (+3)
    let title = document.getElementById('brown-scarab-title'); // 장비이름
    let availableCount = document.getElementById('brown-scarab-upgrade-available-count'); // 업그레이드 가능 횟수
    let phyAtkElem = document.getElementById('brown-scarab-phy-atk'); //물리공격력
    let accElem = document.getElementById('brown-scarab-acc'); // 명중률
    let lukElem = document.getElementById('brown-scarab-luk'); // LUK

    // 기존에 포함되지 않던 옵션 정보
    let accInfoElem= document.getElementById('brown-scarab-acc-info');

    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + atk).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();

    // 업그레이드 성공 정보를 1올린다
    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false; // 업그레이드 성공표시 숨김 해제

    // 기존에 없는 옵션 보이도록 처리
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
        let successCnt = document.getElementById('brown-scarab-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('brown-scarab-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('brown-scarab-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('brown-scarab-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('brown-scarab-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('brown-scarab-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('brown-scarab-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = brownScarabImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('brown-scarab-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = brownScarabImgPath
        gifImg.hidden = true;
    }, 1000);
}

brownScarabPriceInput.oninput = () => {
    recalculateBrownScarabTotalPrice()
}

brownScarabTenInput.oninput = () => {
    recalculateBrownScarabTotalPrice();
}

brownScarabSixtyInput.oninput = () => {
    recalculateBrownScarabTotalPrice();
}

brownScarabHundredInput.oninput = () => {
    recalculateBrownScarabTotalPrice();
}

function recalculateBrownScarabTotalPrice() {
    let brownScarabPriceInputElem = document.getElementById('brown-scarab-price');
    let tenInputElem = document.getElementById('brown-scarab-10-price');
    let sixtyInputElem = document.getElementById('brown-scarab-60-price');
    let hundredInputElem = document.getElementById('brown-scarab-100-price');
    let usedPriceElem = document.getElementById('brown-scarab-total-used-price');

    let price = parseInt(brownScarabPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * brownScarabCnt +
        (
            tenInput * brownScarabTenTrial +
            sixtyInput * brownScarabSixtyTrial +
            hundredInput *
            brownScarabHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
brownScarabPriceResetBtn.addEventListener('click', function () {
    resetBrownScarabPrice()
});

function resetBrownScarabPrice() {
    let tenSuccessCnt = document.getElementById('brown-scarab-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('brown-scarab-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('brown-scarab-100-success-cnt');
    let tenUsedCnt = document.getElementById('brown-scarab-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('brown-scarab-60-used-cnt');
    let hundredUsedCnt = document.getElementById('brown-scarab-100-used-cnt');
    let itemCnt = document.getElementById('brown-scarab-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    brownScarabTenTrial = 0;
    brownScarabSixtyTrial = 0;
    brownScarabHundredTrial = 0;
    brownScarabCnt = 1;

    recalculateBrownScarabTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addBrownScarabBuyCnt() {
    let buyCnt = document.getElementById('brown-scarab-cnt');
    brownScarabCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = brownScarabCnt.toString();
    recalculateBrownScarabTotalPrice();
}