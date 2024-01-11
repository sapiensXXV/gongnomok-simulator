import * as util from "../../global/util.js";

let blueRobeIntelImgPath = '../img/weapon/blue-sauna-robe.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 주문서 버튼
let tenPerBtn = document.getElementById('blue-robe-intel-10-percent-button');
let sixtyPerBtn = document.getElementById('blue-robe-intel-60-percent-button');
let hundredPerBtn = document.getElementById('blue-robe-intel-100-percent-button');
let resetBtn = document.getElementById('blue-robe-intel-reset-button');

// 아이템 구매 횟수
let blueRobeIntelCnt = 1;

// 주문서 시도 횟수
let blueRobeIntelTenTrial = 0;
let blueRobeIntelSixtyTrial = 0;
let blueRobeIntelHundredTrial = 0;

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
    } else if (input === 'q' || input === 'Q' || input === 'ㅂ' || input === 'ㅃ') {
        tenPerBtnClicked();
    } else if (input === 'w' || input === 'W' || input === 'ㅈ' || input === 'ㅉ') {
        sixtyPerBtnClicked()
    } else if (input === 'e' || input === 'E' || input === 'ㄷ' || input === 'ㄸ') {
        hundredPerBtnClicked()
    } else if (input === 'f' || input === 'F' || input === 'ㄹ') {
        resetblueRobeIntelPrice();
    }
});

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
        success(5, 3, 10, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('blue-robe-intel-10-used-cnt');
    blueRobeIntelTenTrial++;
    usedCnt.textContent = blueRobeIntelTenTrial.toString();
    reCalculateBlueRobeIntelTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);

    } else {
        fail();

    }
    let usedCnt = document.getElementById('blue-robe-intel-60-used-cnt');
    blueRobeIntelSixtyTrial++;
    usedCnt.textContent = blueRobeIntelSixtyTrial.toString();
    reCalculateBlueRobeIntelTotalPrice();

}
function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return

    success(1, 0, 0, 100);
    let usedCnt = document.getElementById('blue-robe-intel-100-used-cnt');
    blueRobeIntelHundredTrial++;
    usedCnt.textContent = blueRobeIntelHundredTrial.toString();
    reCalculateBlueRobeIntelTotalPrice();

}

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let intElem = document.getElementById('blue-robe-intel-int-info');
    let mgDefElem = document.getElementById('blue-robe-intel-mgdef-info');
    let mpElem = document.getElementById('blue-robe-intel-mp-info');
    let intV = document.getElementById('blue-robe-intel-int');
    let mgDefV = document.getElementById('blue-robe-intel-mgdef');
    let mpV = document.getElementById('blue-robe-intel-mp');
    let availableCnt = document.getElementById('blue-robe-intel-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('blue-robe-intel-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('blue-robe-intel-additional');

    intV.textContent = '0';
    mgDefV.textContent = '0';
    mpV.textContent = '0';

    intElem.hidden = true; mgDefElem.hidden = true; mpElem.hidden = true;

    availableCnt.textContent = '10'
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true
    if (isNew) {
        addBlueRobeIntelBuyCnt()
    }

    let title = document.getElementById('blue-robe-intel-title');
    let alertTxt = document.getElementById('blue-robe-intel-available-alert-txt');
    util.changeColor(title, parseInt(intV.textContent));
    alertTxt.hidden = true;
}

// DEX, 명중, 이동속도, 퍼센트
function success(int, mgdef, mp, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('blue-robe-intel-upgraded-count');
    let additionalElem = document.getElementById('blue-robe-intel-additional');
    let title = document.getElementById('blue-robe-intel-title');
    let availableCount = document.getElementById('blue-robe-intel-upgrade-available-count');
    let intElem = document.getElementById('blue-robe-intel-int');
    let mgDefElem = document.getElementById('blue-robe-intel-mgdef');
    let mgElem = document.getElementById('blue-robe-intel-mp');

    let intInfoElem = document.getElementById('blue-robe-intel-int-info');
    let mgDefInfoElem = document.getElementById('blue-robe-intel-mgdef-info');
    let mpInfoElem = document.getElementById('blue-robe-intel-mp-info');

    intElem.textContent = (parseInt(intElem.textContent) + int).toString();
    mgDefElem.textContent = (parseInt(mgDefElem.textContent) + mgdef).toString();
    mgElem.textContent = (parseInt(mgElem.textContent) + mp).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(intElem.textContent)) // 기본값이 0이므로 빼는 값이 없다
    additionalElem.hidden = false;

    if (parseInt(intElem.textContent) !== 0) {
        intInfoElem.hidden = false;
    }

    if (parseInt(mgDefElem.textContent) !== 0) {
        mgDefInfoElem.hidden = false;
    }

    if (parseInt(mgElem.textContent) !== 0) {
        mpInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('blue-robe-intel-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('blue-robe-intel-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('blue-robe-intel-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('blue-robe-intel-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('blue-robe-intel-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('blue-robe-intel-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('blue-robe-intel-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = blueRobeIntelImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('blue-robe-intel-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = blueRobeIntelImgPath
        gifImg.hidden = true;
    }, 1000);
}

let blueRobeIntelPriceInput = document.getElementById('blue-robe-intel-price'); // 아이템 가격
let blueRobeIntelTenInput = document.getElementById('blue-robe-intel-10-price'); // 10퍼센트 가격
let blueRobeIntelSixtyInput = document.getElementById('blue-robe-intel-60-price'); // 60퍼센트 가격
let blueRobeIntelHundredInput = document.getElementById('blue-robe-intel-100-price'); // 100퍼센트 가격
let blueRobeIntelPriceResetBtn = document.getElementById('blue-robe-intel-price-reset-btn') // 리셋 버튼

blueRobeIntelPriceInput.oninput = () => {
    reCalculateBlueRobeIntelTotalPrice()
}

blueRobeIntelTenInput.oninput = () => {
    reCalculateBlueRobeIntelTotalPrice();
}

blueRobeIntelSixtyInput.oninput = () => {
    reCalculateBlueRobeIntelTotalPrice();
}

blueRobeIntelHundredInput.oninput = () => {
    reCalculateBlueRobeIntelTotalPrice();
}

function reCalculateBlueRobeIntelTotalPrice() {
    let blueRobeIntelPriceInputElem = document.getElementById('blue-robe-intel-price');
    let tenInputElem = document.getElementById('blue-robe-intel-10-price');
    let sixtyInputElem = document.getElementById('blue-robe-intel-60-price');
    let hundredInputElem = document.getElementById('blue-robe-intel-100-price');
    let usedPriceElem = document.getElementById('blue-robe-intel-total-used-price');

    let price = parseInt(blueRobeIntelPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * blueRobeIntelCnt +
        (
            tenInput * blueRobeIntelTenTrial +
            sixtyInput * blueRobeIntelSixtyTrial +
            hundredInput *
            blueRobeIntelHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
blueRobeIntelPriceResetBtn.addEventListener('click', function () {
    resetblueRobeIntelPrice()
});

function resetblueRobeIntelPrice() {
    let tenSuccessCnt = document.getElementById('blue-robe-intel-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('blue-robe-intel-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('blue-robe-intel-100-success-cnt');
    let tenUsedCnt = document.getElementById('blue-robe-intel-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('blue-robe-intel-60-used-cnt');
    let hundredUsedCnt = document.getElementById('blue-robe-intel-100-used-cnt');
    let itemCnt = document.getElementById('blue-robe-intel-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    blueRobeIntelTenTrial = 0;
    blueRobeIntelSixtyTrial = 0;
    blueRobeIntelHundredTrial = 0;
    blueRobeIntelCnt = 1;

    reCalculateBlueRobeIntelTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addBlueRobeIntelBuyCnt() {
    let buyCnt = document.getElementById('blue-robe-intel-cnt');
    blueRobeIntelCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = blueRobeIntelCnt.toString();
    reCalculateBlueRobeIntelTotalPrice();
}