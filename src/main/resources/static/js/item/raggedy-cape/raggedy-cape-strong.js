import * as util from "../../global/util.js";

let raggedyCapeStrongImgPath = '../img/item/armor/raggedy-cape.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 주문서 버튼
let tenPerBtn = document.getElementById('raggedy-cape-strong-10-percent-button');
let sixtyPerBtn = document.getElementById('raggedy-cape-strong-60-percent-button');
let hundredPerBtn = document.getElementById('raggedy-cape-strong-100-percent-button');
let resetBtn = document.getElementById('raggedy-cape-strong-reset-button');

// 아이템 구매 횟수
let raggedyCapeStrongCnt = 1;

// 주문서 시도 횟수
let raggedyCapeStrongTenTrial = 0;
let raggedyCapeStrongSixtyTrial = 0;
let raggedyCapeStrongHundredTrial = 0;

// 가격 관련 button, input
let raggedyCapeStrongPriceInput = document.getElementById('raggedy-cape-strong-price'); // 아이템 가격
let raggedyCapeStrongTenInput = document.getElementById('raggedy-cape-strong-10-price'); // 10퍼센트 가격
let raggedyCapeStrongSixtyInput = document.getElementById('raggedy-cape-strong-60-price'); // 60퍼센트 가격
let raggedyCapeStrongHundredInput = document.getElementById('raggedy-cape-strong-100-price'); // 100퍼센트 가격
let raggedyCapeStrongPriceResetBtn = document.getElementById('raggedy-cape-strong-price-reset-btn') // 리셋 버튼

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
        resetRaggedyCapeStrongPrice()
        raggedyCapeStrongPriceResetBtn.focus();
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
        raggedyCapeStrongPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
raggedyCapeStrongPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { raggedyCapeStrongPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('raggedy-cape-strong-10-used-cnt');
    raggedyCapeStrongTenTrial++;
    usedCnt.textContent = raggedyCapeStrongTenTrial.toString();
    reCalculateRaggedyCapeStrongTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 60);

    } else {
        fail();

    }
    let usedCnt = document.getElementById('raggedy-cape-strong-60-used-cnt');
    raggedyCapeStrongSixtyTrial++;
    usedCnt.textContent = raggedyCapeStrongSixtyTrial.toString();
    reCalculateRaggedyCapeStrongTotalPrice();

}
function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return

    success(1, 100);
    let usedCnt = document.getElementById('raggedy-cape-strong-100-used-cnt');
    raggedyCapeStrongHundredTrial++;
    usedCnt.textContent = raggedyCapeStrongHundredTrial.toString();
    reCalculateRaggedyCapeStrongTotalPrice();

}

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let strElem = document.getElementById('raggedy-cape-strong-str-info');
    let strV = document.getElementById('raggedy-cape-strong-str');
    let availableCnt = document.getElementById('raggedy-cape-strong-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('raggedy-cape-strong-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('raggedy-cape-strong-additional');

    strV.textContent = '0';
    strElem.hidden = true;

    availableCnt.textContent = '5'
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true
    if (isNew) {
        addRaggedyCapeStrongBuyCnt()
    }

    let title = document.getElementById('raggedy-cape-strong-title');
    let alertTxt = document.getElementById('raggedy-cape-strong-available-alert-txt');
    util.changeColor(title, parseInt(strV.textContent));
    alertTxt.hidden = true;
}

// DEX, 명중, 이동속도, 퍼센트
function success(str, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('raggedy-cape-strong-upgraded-count');
    let additionalElem = document.getElementById('raggedy-cape-strong-additional');
    let title = document.getElementById('raggedy-cape-strong-title');
    let availableCount = document.getElementById('raggedy-cape-strong-upgrade-available-count');
    let strElem = document.getElementById('raggedy-cape-strong-str');
    let strInfoElem = document.getElementById('raggedy-cape-strong-str-info');

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
        let successCnt = document.getElementById('raggedy-cape-strong-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('raggedy-cape-strong-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('raggedy-cape-strong-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('raggedy-cape-strong-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('raggedy-cape-strong-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('raggedy-cape-strong-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('raggedy-cape-strong-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = raggedyCapeStrongImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('raggedy-cape-strong-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = raggedyCapeStrongImgPath
        gifImg.hidden = true;
    }, 1000);
}

raggedyCapeStrongPriceInput.oninput = () => {
    reCalculateRaggedyCapeStrongTotalPrice()
}

raggedyCapeStrongTenInput.oninput = () => {
    reCalculateRaggedyCapeStrongTotalPrice();
}

raggedyCapeStrongSixtyInput.oninput = () => {
    reCalculateRaggedyCapeStrongTotalPrice();
}

raggedyCapeStrongHundredInput.oninput = () => {
    reCalculateRaggedyCapeStrongTotalPrice();
}

function reCalculateRaggedyCapeStrongTotalPrice() {
    let raggedyCapeStrongPriceInputElem = document.getElementById('raggedy-cape-strong-price');
    let tenInputElem = document.getElementById('raggedy-cape-strong-10-price');
    let sixtyInputElem = document.getElementById('raggedy-cape-strong-60-price');
    let hundredInputElem = document.getElementById('raggedy-cape-strong-100-price');
    let usedPriceElem = document.getElementById('raggedy-cape-strong-total-used-price');

    let price = parseInt(raggedyCapeStrongPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * raggedyCapeStrongCnt +
        (
            tenInput * raggedyCapeStrongTenTrial +
            sixtyInput * raggedyCapeStrongSixtyTrial +
            hundredInput *
            raggedyCapeStrongHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
raggedyCapeStrongPriceResetBtn.addEventListener('click', function () {
    resetRaggedyCapeStrongPrice()
});

function resetRaggedyCapeStrongPrice() {
    let tenSuccessCnt = document.getElementById('raggedy-cape-strong-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('raggedy-cape-strong-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('raggedy-cape-strong-100-success-cnt');
    let tenUsedCnt = document.getElementById('raggedy-cape-strong-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('raggedy-cape-strong-60-used-cnt');
    let hundredUsedCnt = document.getElementById('raggedy-cape-strong-100-used-cnt');
    let itemCnt = document.getElementById('raggedy-cape-strong-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    raggedyCapeStrongTenTrial = 0;
    raggedyCapeStrongSixtyTrial = 0;
    raggedyCapeStrongHundredTrial = 0;
    raggedyCapeStrongCnt = 1;

    reCalculateRaggedyCapeStrongTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addRaggedyCapeStrongBuyCnt() {
    let buyCnt = document.getElementById('raggedy-cape-strong-cnt');
    raggedyCapeStrongCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = raggedyCapeStrongCnt.toString();
    reCalculateRaggedyCapeStrongTotalPrice();
}