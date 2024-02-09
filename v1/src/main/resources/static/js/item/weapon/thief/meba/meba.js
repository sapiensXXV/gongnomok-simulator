import * as util from "../../../../global/util.js";

// 속성 값들
let defaultLuk = 0;
let defaultPhysicAtk = 22;
let defaultAcc = 0;
let defaultAvailableCount = 7;

let timer = null;

let gloveImgPath = '../img/item/weapon/thief/meba.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

// 옵션 버튼
let normalOptionBtn = document.getElementById('me-ba-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('me-ba-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('me-ba-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('me-ba-three-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('me-ba-10-percent-button');
let sixtyPerBtn = document.getElementById('me-ba-60-percent-button');
let hundredPerBtn = document.getElementById('me-ba-100-percent-button');
let resetBtn = document.getElementById('me-ba-reset-button');

// 아이템 구매 횟수
let mebaCnt = 1;

// 주문서 시도 횟수
let mebaTenTrial = 0;
let mebaSixtyTrial = 0;
let mebaHundredTrial = 0;

// 갸격관련 input, button
let mebaPriceInput = document.getElementById('me-ba-price'); // 아이템 가격
let mebaTenInput = document.getElementById('me-ba-10-price'); // 10퍼센트 가격
let mebaSixtyInput = document.getElementById('me-ba-60-price'); // 60퍼센트 가격
let mebaHundredInput = document.getElementById('me-ba-100-price'); // 100퍼센트 가격
let mebaPriceResetBtn = document.getElementById('me-ba-price-reset-btn') // 리셋 버튼

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
        resetMebaPrice();
        mebaPriceResetBtn.focus();
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
        mebaPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
mebaPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { mebaPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('me-ba-10-used-cnt');
    mebaTenTrial++
    usedCnt.textContent = mebaTenTrial.toString();
    recalculateMebaTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('me-ba-60-used-cnt');
    mebaSixtyTrial++
    usedCnt.textContent = mebaSixtyTrial.toString();
    recalculateMebaTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('me-ba-100-used-cnt');
    mebaHundredTrial++
    usedCnt.textContent = mebaHundredTrial.toString();
    recalculateMebaTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let mebaAtk = document.getElementById('me-ba-phy-atk');
    defaultPhysicAtk = 16
    resetItem(false);
    mebaAtk.textContent = defaultPhysicAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let mebaAtk = document.getElementById('me-ba-phy-atk');
    defaultPhysicAtk = 17
    resetItem(false);
    mebaAtk.textContent = (defaultPhysicAtk).toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let mebaAtk = document.getElementById('me-ba-phy-atk');
    defaultPhysicAtk = 18
    resetItem(false);
    mebaAtk.textContent = (defaultPhysicAtk).toString()
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let mebaAtk = document.getElementById('me-ba-phy-atk');
    let mebaLuk = document.getElementById('me-ba-luk');
    let mebaAcc = document.getElementById('me-ba-acc');
    let mebaAccInfo = document.getElementById('me-ba-acc-info');
    let mebaLukInfo = document.getElementById('me-ba-luk-info');

    let mebaAvailableCount = document.getElementById('me-ba-upgrade-available-count');
    let additionalElem = document.getElementById('me-ba-additional');
    let upgradedCount = document.getElementById('me-ba-upgraded-count');
    let titleElem = document.getElementById('me-ba-title');

    mebaAtk.textContent = defaultPhysicAtk.toString()
    mebaLuk.textContent = defaultLuk.toString()
    mebaAvailableCount.textContent = defaultAvailableCount.toString()
    mebaAcc.textContent = defaultAcc.toString()

    mebaAccInfo.hidden = true; mebaLukInfo.hidden = true;
    additionalElem.hidden = true;

    upgradedCount.textContent = '0'
    if (isNew) {
        addMebaBuyCnt();
    }

    let alertTxt = document.getElementById('me-ba-available-alert-txt');
    util.changeColor(titleElem, parseInt(mebaAtk.textContent) - defaultPhysicAtk);
    alertTxt.hidden = true;
}

function success(pyAtk, acc, luk, percent) {
    console.log('scroll success');
    let upgradedCountElem = document.getElementById('me-ba-upgraded-count');
    let additionalElem = document.getElementById('me-ba-additional');
    let pyAtkElem = document.getElementById('me-ba-phy-atk');
    let accElem = document.getElementById('me-ba-acc');
    let lukElem = document.getElementById('me-ba-luk');
    let accElemInfo = document.getElementById('me-ba-acc-info');
    let lukElemInfo = document.getElementById('me-ba-luk-info');
    let title = document.getElementById('me-ba-title');
    let availableCount = document.getElementById('me-ba-upgrade-available-count');

    pyAtkElem.textContent = (parseInt(pyAtkElem.textContent) + pyAtk).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(pyAtkElem.textContent) - defaultPhysicAtk)
    additionalElem.hidden = false;

    if (parseInt(accElem.textContent) !== 0) {
        accElemInfo.hidden = false;
    }
    if (parseInt(lukElem.textContent) !== 0) {
        lukElemInfo.hidden = false;
    }

    util.playSuccessSound(); // 성공 소리재생
    reduceAvailableCount(availableCount); // 업그레이드 가능 횟수 감소
    addSuccessCnt(percent) // 성공 카운트 증가
    playSuccessEffect() // 성공시 소리 재생
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('me-ba-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('me-ba-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('me-ba-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}

function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('me-ba-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('me-ba-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('me-ba-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('me-ba-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = gloveImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('me-ba-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = gloveImgPath
        gifImg.hidden = true;
    }, 1000);
}

/**
 * 주문서 총 사용가격 로직
 */

mebaPriceInput.oninput = () => {
    recalculateMebaTotalPrice()
}

mebaTenInput.oninput = () => {
    recalculateMebaTotalPrice();
}

mebaSixtyInput.oninput = () => {
    recalculateMebaTotalPrice();
}

mebaHundredInput.oninput = () => {
    recalculateMebaTotalPrice();
}

function recalculateMebaTotalPrice() {
    let mebaPriceInputElem = document.getElementById('me-ba-price');
    let tenInputElem = document.getElementById('me-ba-10-price');
    let sixtyInputElem = document.getElementById('me-ba-60-price');
    let hundredInputElem = document.getElementById('me-ba-100-price');
    let usedPriceElem = document.getElementById('me-ba-total-used-price');

    let price = parseInt(mebaPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * mebaCnt +
        (
            tenInput * mebaTenTrial +
            sixtyInput * mebaSixtyTrial +
            hundredInput * mebaHundredTrial
        )
    ).toLocaleString();
}

/**
 * 주문서 총 가격 리셋 로직
 */
mebaPriceResetBtn.addEventListener('click', function () {
    resetMebaPrice()
});

function resetMebaPrice() {
    let tenSuccessCnt = document.getElementById('me-ba-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('me-ba-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('me-ba-100-success-cnt');
    let tenUsedCnt = document.getElementById('me-ba-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('me-ba-60-used-cnt');
    let hundredUsedCnt = document.getElementById('me-ba-100-used-cnt');
    let itemCnt = document.getElementById('me-ba-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    mebaTenTrial = 0;
    mebaSixtyTrial = 0;
    mebaHundredTrial = 0;
    mebaCnt = 1
    recalculateMebaTotalPrice();
}

function addMebaBuyCnt() {
    let buyCnt = document.getElementById('me-ba-cnt');
    mebaCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = mebaCnt.toString();
    recalculateMebaTotalPrice();
}