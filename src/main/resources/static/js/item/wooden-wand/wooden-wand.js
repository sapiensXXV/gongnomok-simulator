import * as util from "../../global/util.js";

// 속성 값들
let defaultPhyAtk = 15;
let defaultMgAtk = 23;
let defaultAvailableCount = 7;

let woodenWandImgPath = '../img/item/weapon/wooden-wand.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 주문서 버튼
let tenPerBtn = document.getElementById('wooden-wand-10-percent-button');
let sixtyPerBtn = document.getElementById('wooden-wand-60-percent-button');
let hundredPerBtn = document.getElementById('wooden-wand-100-percent-button');
let resetBtn = document.getElementById('wooden-wand-reset-button');

// 아이템 구매 횟수
let woodenWandCnt = 1;

// 주문서 시도 횟수
let woodenWandTenTrial = 0;
let woodenWandSixtyTrial = 0;
let woodenWandHundredTrial = 0;

// 가격 관련 input, button
let woodenWandPriceInput = document.getElementById('wooden-wand-price'); // 아이템 가격
let woodenWandTenInput = document.getElementById('wooden-wand-10-price'); // 10퍼센트 가격
let woodenWandSixtyInput = document.getElementById('wooden-wand-60-price'); // 60퍼센트 가격
let woodenWandHundredInput = document.getElementById('wooden-wand-100-price'); // 100퍼센트 가격
let woodenWandPriceResetBtn = document.getElementById('wooden-wand-price-reset-btn') // 리셋 버튼

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
        resetWoodenWandPrice();
        woodenWandPriceResetBtn.focus();
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
        woodenWandPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
woodenWandPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { woodenWandPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('wooden-wand-10-used-cnt');
    woodenWandTenTrial++;
    usedCnt.textContent = woodenWandTenTrial.toString();
    recalculateWoodenWandTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('wooden-wand-60-used-cnt');
    woodenWandSixtyTrial++;
    usedCnt.textContent = woodenWandSixtyTrial.toString();
    recalculateWoodenWandTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('wooden-wand-100-used-cnt');
    woodenWandHundredTrial++;
    usedCnt.textContent = woodenWandHundredTrial.toString();
    recalculateWoodenWandTotalPrice();
}

/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('wooden-wand-phy-atk'); // 물리공격력
    let mgAtk = document.getElementById('wooden-wand-mg-atk'); // 마법공격력
    let intV = document.getElementById('wooden-wand-int'); // INT
    let mgDef = document.getElementById('wooden-wand-mg-def'); // 마법 방어력

    let intInfo = document.getElementById('wooden-wand-int-info'); // int 정보 텍스트
    let mgDefInfo = document.getElementById('wooden-wand-mg-def-info'); // 마법 방어력 정보 텍스트

    let availableCnt = document.getElementById('wooden-wand-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('wooden-wand-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('wooden-wand-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    mgAtk.textContent = defaultMgAtk.toString();
    intV.textContent = '0'
    mgDef.textContent = '0';

    intInfo.hidden = true; mgDefInfo.hidden = true;
    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addWoodenWandBuyCnt()
    }

    let title = document.getElementById('wooden-wand-title');
    let alertTxt = document.getElementById('wooden-wand-available-alert-txt');
    util.changeColor(title, parseInt(mgAtk.textContent) - defaultMgAtk);
    alertTxt.hidden = true;

}

function success(mgAtk, intV, mgDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('wooden-wand-upgraded-count');
    let additionalElem = document.getElementById('wooden-wand-additional');
    let title = document.getElementById('wooden-wand-title');
    let availableCount = document.getElementById('wooden-wand-upgrade-available-count');
    let mgAtkElem = document.getElementById('wooden-wand-mg-atk');
    let intElem = document.getElementById('wooden-wand-int');
    let mgDefElem = document.getElementById('wooden-wand-mg-def');

    let intInfoElem = document.getElementById('wooden-wand-int-info');
    let mgDefInfoElem = document.getElementById('wooden-wand-mg-def-info');

    mgAtkElem.textContent = (parseInt(mgAtkElem.textContent) + mgAtk).toString();
    intElem.textContent = (parseInt(intElem.textContent) + intV).toString();
    mgDefElem.textContent = (parseInt(mgDefElem.textContent) + mgDef).toString();


    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(mgAtkElem.textContent) - defaultMgAtk)
    additionalElem.hidden = false;

    if (parseInt(intElem.textContent) !== 0) {
        intInfoElem.hidden = false;
    }
    if (parseInt(mgDefElem.textContent) !== 0) {
        mgDefInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('wooden-wand-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('wooden-wand-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('wooden-wand-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('wooden-wand-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('wooden-wand-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('wooden-wand-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('wooden-wand-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = woodenWandImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('wooden-wand-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = woodenWandImgPath
        gifImg.hidden = true;
    }, 1000);
}

woodenWandPriceInput.oninput = () => {
    recalculateWoodenWandTotalPrice()
}

woodenWandTenInput.oninput = () => {
    recalculateWoodenWandTotalPrice();
}

woodenWandSixtyInput.oninput = () => {
    recalculateWoodenWandTotalPrice();
}

woodenWandHundredInput.oninput = () => {
    recalculateWoodenWandTotalPrice();
}

function recalculateWoodenWandTotalPrice() {
    let woodenWandPriceInputElem = document.getElementById('wooden-wand-price');
    let tenInputElem = document.getElementById('wooden-wand-10-price');
    let sixtyInputElem = document.getElementById('wooden-wand-60-price');
    let hundredInputElem = document.getElementById('wooden-wand-100-price');
    let usedPriceElem = document.getElementById('wooden-wand-total-used-price');

    let price = parseInt(woodenWandPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * woodenWandCnt +
        (
            tenInput * woodenWandTenTrial +
            sixtyInput * woodenWandSixtyTrial +
            hundredInput *
            woodenWandHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
woodenWandPriceResetBtn.addEventListener('click', function () {
    resetWoodenWandPrice()
});

function resetWoodenWandPrice() {
    let tenSuccessCnt = document.getElementById('wooden-wand-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('wooden-wand-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('wooden-wand-100-success-cnt');
    let tenUsedCnt = document.getElementById('wooden-wand-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('wooden-wand-60-used-cnt');
    let hundredUsedCnt = document.getElementById('wooden-wand-100-used-cnt');
    let itemCnt = document.getElementById('wooden-wand-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    woodenWandTenTrial = 0;
    woodenWandSixtyTrial = 0;
    woodenWandHundredTrial = 0;
    woodenWandCnt = 1;

    recalculateWoodenWandTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addWoodenWandBuyCnt() {
    let buyCnt = document.getElementById('wooden-wand-cnt');
    woodenWandCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = woodenWandCnt.toString();
    recalculateWoodenWandTotalPrice();
}