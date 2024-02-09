import * as util from "../../../../global/util.js";

let raggedyCapeLuckyImgPath = '../img/item/armor/raggedy-cape.png'
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 주문서 버튼
let tenPerBtn = document.getElementById('raggedy-cape-lucky-10-percent-button');
let sixtyPerBtn = document.getElementById('raggedy-cape-lucky-60-percent-button');
let hundredPerBtn = document.getElementById('raggedy-cape-lucky-100-percent-button');
let resetBtn = document.getElementById('raggedy-cape-lucky-reset-button');

// 아이템 구매 횟수
let raggedyCapeLuckyCnt = 1;

// 주문서 시도 횟수
let raggedyCapeLuckyTenTrial = 0;
let raggedyCapeLuckySixtyTrial = 0;
let raggedyCapeLuckyHundredTrial = 0;

// 가격 관련 button, input
let raggedyCapeLuckyPriceInput = document.getElementById('raggedy-cape-lucky-price'); // 아이템 가격
let raggedyCapeLuckyTenInput = document.getElementById('raggedy-cape-lucky-10-price'); // 10퍼센트 가격
let raggedyCapeLuckySixtyInput = document.getElementById('raggedy-cape-lucky-60-price'); // 60퍼센트 가격
let raggedyCapeLuckyHundredInput = document.getElementById('raggedy-cape-lucky-100-price'); // 100퍼센트 가격
let raggedyCapeLuckyPriceResetBtn = document.getElementById('raggedy-cape-lucky-price-reset-btn') // 리셋 버튼

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
        resetRaggedyCapeLuckyPrice()
        raggedyCapeLuckyPriceResetBtn.focus();
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
        raggedyCapeLuckyPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
raggedyCapeLuckyPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { raggedyCapeLuckyPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('raggedy-cape-lucky-10-used-cnt');
    raggedyCapeLuckyTenTrial++;
    usedCnt.textContent = raggedyCapeLuckyTenTrial.toString();
    reCalculateRaggedyCapeLuckyTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 60);

    } else {
        fail();

    }
    let usedCnt = document.getElementById('raggedy-cape-lucky-60-used-cnt');
    raggedyCapeLuckySixtyTrial++;
    usedCnt.textContent = raggedyCapeLuckySixtyTrial.toString();
    reCalculateRaggedyCapeLuckyTotalPrice();

}
function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return

    success(1, 100);
    let usedCnt = document.getElementById('raggedy-cape-lucky-100-used-cnt');
    raggedyCapeLuckyHundredTrial++;
    usedCnt.textContent = raggedyCapeLuckyHundredTrial.toString();
    reCalculateRaggedyCapeLuckyTotalPrice();

}

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let lukElem = document.getElementById('raggedy-cape-lucky-luk-info');
    let lukV = document.getElementById('raggedy-cape-lucky-luk');
    let availableCnt = document.getElementById('raggedy-cape-lucky-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('raggedy-cape-lucky-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('raggedy-cape-lucky-additional');

    lukV.textContent = '0';
    lukElem.hidden = true;

    availableCnt.textContent = '5'
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true
    if (isNew) {
        addRaggedyCapeLuckyBuyCnt()
    }

    let title = document.getElementById('raggedy-cape-lucky-title');
    let alertTxt = document.getElementById('raggedy-cape-lucky-available-alert-txt');
    util.changeColor(title, parseInt(lukV.textContent));
    alertTxt.hidden = true;
}

// LUK, 퍼센트
function success(luk, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('raggedy-cape-lucky-upgraded-count');
    let additionalElem = document.getElementById('raggedy-cape-lucky-additional');
    let title = document.getElementById('raggedy-cape-lucky-title');
    let availableCount = document.getElementById('raggedy-cape-lucky-upgrade-available-count');
    let lukElem = document.getElementById('raggedy-cape-lucky-luk');
    let lukInfoElem = document.getElementById('raggedy-cape-lucky-luk-info');

    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(lukElem.textContent)) // 기본값이 0이므로 빼는 값이 없다
    additionalElem.hidden = false;

    if (parseInt(lukElem.textContent) !== 0) {
        lukInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('raggedy-cape-lucky-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('raggedy-cape-lucky-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('raggedy-cape-lucky-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('raggedy-cape-lucky-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('raggedy-cape-lucky-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('raggedy-cape-lucky-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('raggedy-cape-lucky-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = raggedyCapeLuckyImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('raggedy-cape-lucky-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = raggedyCapeLuckyImgPath
        gifImg.hidden = true;
    }, 1000);
}

raggedyCapeLuckyPriceInput.oninput = () => {
    reCalculateRaggedyCapeLuckyTotalPrice()
}

raggedyCapeLuckyTenInput.oninput = () => {
    reCalculateRaggedyCapeLuckyTotalPrice();
}

raggedyCapeLuckySixtyInput.oninput = () => {
    reCalculateRaggedyCapeLuckyTotalPrice();
}

raggedyCapeLuckyHundredInput.oninput = () => {
    reCalculateRaggedyCapeLuckyTotalPrice();
}

function reCalculateRaggedyCapeLuckyTotalPrice() {
    let raggedyCapeLuckyPriceInputElem = document.getElementById('raggedy-cape-lucky-price');
    let tenInputElem = document.getElementById('raggedy-cape-lucky-10-price');
    let sixtyInputElem = document.getElementById('raggedy-cape-lucky-60-price');
    let hundredInputElem = document.getElementById('raggedy-cape-lucky-100-price');
    let usedPriceElem = document.getElementById('raggedy-cape-lucky-total-used-price');

    let price = parseInt(raggedyCapeLuckyPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * raggedyCapeLuckyCnt +
        (
            tenInput * raggedyCapeLuckyTenTrial +
            sixtyInput * raggedyCapeLuckySixtyTrial +
            hundredInput *
            raggedyCapeLuckyHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
raggedyCapeLuckyPriceResetBtn.addEventListener('click', function () {
    resetRaggedyCapeLuckyPrice()
});

function resetRaggedyCapeLuckyPrice() {
    let tenSuccessCnt = document.getElementById('raggedy-cape-lucky-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('raggedy-cape-lucky-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('raggedy-cape-lucky-100-success-cnt');
    let tenUsedCnt = document.getElementById('raggedy-cape-lucky-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('raggedy-cape-lucky-60-used-cnt');
    let hundredUsedCnt = document.getElementById('raggedy-cape-lucky-100-used-cnt');
    let itemCnt = document.getElementById('raggedy-cape-lucky-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    raggedyCapeLuckyTenTrial = 0;
    raggedyCapeLuckySixtyTrial = 0;
    raggedyCapeLuckyHundredTrial = 0;
    raggedyCapeLuckyCnt = 1;

    reCalculateRaggedyCapeLuckyTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addRaggedyCapeLuckyBuyCnt() {
    let buyCnt = document.getElementById('raggedy-cape-lucky-cnt');
    raggedyCapeLuckyCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = raggedyCapeLuckyCnt.toString();
    reCalculateRaggedyCapeLuckyTotalPrice();
}