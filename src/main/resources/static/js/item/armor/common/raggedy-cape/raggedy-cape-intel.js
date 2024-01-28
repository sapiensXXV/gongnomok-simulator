import * as util from "../../../../global/util.js";

let raggedyCapeIntelImgPath = '../img/item/armor/raggedy-cape.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 주문서 버튼
let tenPerBtn = document.getElementById('raggedy-cape-intel-10-percent-button');
let sixtyPerBtn = document.getElementById('raggedy-cape-intel-60-percent-button');
let hundredPerBtn = document.getElementById('raggedy-cape-intel-100-percent-button');
let resetBtn = document.getElementById('raggedy-cape-intel-reset-button');

// 아이템 구매 횟수
let raggedyCapeIntelCnt = 1;

// 주문서 시도 횟수
let raggedyCapeIntelTenTrial = 0;
let raggedyCapeIntelSixtyTrial = 0;
let raggedyCapeIntelHundredTrial = 0;

// 가격 관련 button, input
let raggedyCapeIntelPriceInput = document.getElementById('raggedy-cape-intel-price'); // 아이템 가격
let raggedyCapeIntelTenInput = document.getElementById('raggedy-cape-intel-10-price'); // 10퍼센트 가격
let raggedyCapeIntelSixtyInput = document.getElementById('raggedy-cape-intel-60-price'); // 60퍼센트 가격
let raggedyCapeIntelHundredInput = document.getElementById('raggedy-cape-intel-100-price'); // 100퍼센트 가격
let raggedyCapeIntelPriceResetBtn = document.getElementById('raggedy-cape-intel-price-reset-btn') // 리셋 버튼

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
        resetraggedyCapeIntelPrice()
        raggedyCapeIntelPriceResetBtn.focus();
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
        raggedyCapeIntelPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
raggedyCapeIntelPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { raggedyCapeIntelPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('raggedy-cape-intel-10-used-cnt');
    raggedyCapeIntelTenTrial++;
    usedCnt.textContent = raggedyCapeIntelTenTrial.toString();
    reCalculateraggedyCapeIntelTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 60);

    } else {
        fail();

    }
    let usedCnt = document.getElementById('raggedy-cape-intel-60-used-cnt');
    raggedyCapeIntelSixtyTrial++;
    usedCnt.textContent = raggedyCapeIntelSixtyTrial.toString();
    reCalculateraggedyCapeIntelTotalPrice();

}
function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return

    success(1, 100);
    let usedCnt = document.getElementById('raggedy-cape-intel-100-used-cnt');
    raggedyCapeIntelHundredTrial++;
    usedCnt.textContent = raggedyCapeIntelHundredTrial.toString();
    reCalculateraggedyCapeIntelTotalPrice();

}

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let intElem = document.getElementById('raggedy-cape-intel-int-info');
    let intV = document.getElementById('raggedy-cape-intel-int');
    let availableCnt = document.getElementById('raggedy-cape-intel-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('raggedy-cape-intel-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('raggedy-cape-intel-additional');

    intV.textContent = '0';
    intElem.hidden = true;

    availableCnt.textContent = '5'
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true
    if (isNew) {
        addRaggedyCapeIntelBuyCnt()
    }

    let title = document.getElementById('raggedy-cape-intel-title');
    let alertTxt = document.getElementById('raggedy-cape-intel-available-alert-txt');
    util.changeColor(title, parseInt(intV.textContent));
    alertTxt.hidden = true;
}

// INT, 퍼센트
function success(int, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('raggedy-cape-intel-upgraded-count');
    let additionalElem = document.getElementById('raggedy-cape-intel-additional');
    let title = document.getElementById('raggedy-cape-intel-title');
    let availableCount = document.getElementById('raggedy-cape-intel-upgrade-available-count');
    let intElem = document.getElementById('raggedy-cape-intel-int');
    let intInfoElem = document.getElementById('raggedy-cape-intel-int-info');

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
        let successCnt = document.getElementById('raggedy-cape-intel-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('raggedy-cape-intel-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('raggedy-cape-intel-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('raggedy-cape-intel-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('raggedy-cape-intel-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('raggedy-cape-intel-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('raggedy-cape-intel-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = raggedyCapeIntelImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('raggedy-cape-intel-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = raggedyCapeIntelImgPath
        gifImg.hidden = true;
    }, 1000);
}

raggedyCapeIntelPriceInput.oninput = () => {
    reCalculateraggedyCapeIntelTotalPrice()
}

raggedyCapeIntelTenInput.oninput = () => {
    reCalculateraggedyCapeIntelTotalPrice();
}

raggedyCapeIntelSixtyInput.oninput = () => {
    reCalculateraggedyCapeIntelTotalPrice();
}

raggedyCapeIntelHundredInput.oninput = () => {
    reCalculateraggedyCapeIntelTotalPrice();
}

function reCalculateraggedyCapeIntelTotalPrice() {
    let raggedyCapeIntelPriceInputElem = document.getElementById('raggedy-cape-intel-price');
    let tenInputElem = document.getElementById('raggedy-cape-intel-10-price');
    let sixtyInputElem = document.getElementById('raggedy-cape-intel-60-price');
    let hundredInputElem = document.getElementById('raggedy-cape-intel-100-price');
    let usedPriceElem = document.getElementById('raggedy-cape-intel-total-used-price');

    let price = parseInt(raggedyCapeIntelPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * raggedyCapeIntelCnt +
        (
            tenInput * raggedyCapeIntelTenTrial +
            sixtyInput * raggedyCapeIntelSixtyTrial +
            hundredInput *
            raggedyCapeIntelHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
raggedyCapeIntelPriceResetBtn.addEventListener('click', function () {
    resetraggedyCapeIntelPrice()
});

function resetraggedyCapeIntelPrice() {
    let tenSuccessCnt = document.getElementById('raggedy-cape-intel-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('raggedy-cape-intel-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('raggedy-cape-intel-100-success-cnt');
    let tenUsedCnt = document.getElementById('raggedy-cape-intel-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('raggedy-cape-intel-60-used-cnt');
    let hundredUsedCnt = document.getElementById('raggedy-cape-intel-100-used-cnt');
    let itemCnt = document.getElementById('raggedy-cape-intel-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    raggedyCapeIntelTenTrial = 0;
    raggedyCapeIntelSixtyTrial = 0;
    raggedyCapeIntelHundredTrial = 0;
    raggedyCapeIntelCnt = 1;

    reCalculateraggedyCapeIntelTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addRaggedyCapeIntelBuyCnt() {
    let buyCnt = document.getElementById('raggedy-cape-intel-cnt');
    raggedyCapeIntelCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = raggedyCapeIntelCnt.toString();
    reCalculateraggedyCapeIntelTotalPrice();
}