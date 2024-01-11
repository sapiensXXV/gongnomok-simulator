import * as util from "../../global/util.js";

let blueRobeSwiftImgPath = '../img/weapon/blue-sauna-robe.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 주문서 버튼
let tenPerBtn = document.getElementById('blue-robe-swift-10-percent-button');
let sixtyPerBtn = document.getElementById('blue-robe-swift-60-percent-button');
let hundredPerBtn = document.getElementById('blue-robe-swift-100-percent-button');
let resetBtn = document.getElementById('blue-robe-swift-reset-button');

// 아이템 구매 횟수
let blueRobeSwiftCnt = 1;

// 주문서 시도 횟수
let blueRobeSwiftTenTrial = 0;
let blueRobeSwiftSixtyTrial = 0;
let blueRobeSwiftHundredTrial = 0;

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
     }else if (input === 'f' || input === 'F' || input === 'ㄹ') {
        resetBlueRobeSwiftPrice();
    }
});

/**
 * 주문서 버튼 이벤트 리스너
 */
tenPerBtn.addEventListener('click', tenPerBtnClicked);
sixtyPerBtn.addEventListener('click', sixtyPerBtnClicked);
hundredPerBtn.addEventListener('click', hundredPerBtnClicked);

function tenPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(10)) {
        success(5, 3, 1, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('blue-robe-swift-10-used-cnt');
    blueRobeSwiftTenTrial++;
    usedCnt.textContent = blueRobeSwiftTenTrial.toString();
    reCalculateBlueRobeSwiftTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('blue-robe-swift-60-used-cnt');
    blueRobeSwiftSixtyTrial++;
    usedCnt.textContent = blueRobeSwiftSixtyTrial.toString();
    reCalculateBlueRobeSwiftTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('blue-robe-swift-100-used-cnt');
    blueRobeSwiftHundredTrial++;
    usedCnt.textContent = blueRobeSwiftHundredTrial.toString();
    reCalculateBlueRobeSwiftTotalPrice();
}

resetBtn.addEventListener('click', function () {
    resetItem(true);
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let dexElem = document.getElementById('blue-robe-swift-dex-info');
    let accElem = document.getElementById('blue-robe-swift-acc-info');
    let mvsElem = document.getElementById('blue-robe-swift-mvs-info');
    let dexV = document.getElementById('blue-robe-swift-dex');
    let accV = document.getElementById('blue-robe-swift-acc');
    let mvsV = document.getElementById('blue-robe-swift-mvs');
    let availableCnt = document.getElementById('blue-robe-swift-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('blue-robe-swift-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('blue-robe-swift-additional');

    dexV.textContent = '0';
    accV.textContent = '0';
    mvsV.textContent = '0';

    dexElem.hidden = true; accElem.hidden = true; mvsElem.hidden = true;

    availableCnt.textContent = '10'
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true
    if (isNew) {
        addBlueRobeSwiftBuyCnt()
    }

    let title = document.getElementById('blue-robe-swift-title');
    let alertTxt = document.getElementById('blue-robe-swift-available-alert-txt');
    util.changeColor(title, parseInt(dexV.textContent));
    alertTxt.hidden = true;
}

// DEX, 명중, 이동속도, 퍼센트
function success(dex, acc, mvs, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('blue-robe-swift-upgraded-count');
    let additionalElem = document.getElementById('blue-robe-swift-additional');
    let title = document.getElementById('blue-robe-swift-title');
    let availableCount = document.getElementById('blue-robe-swift-upgrade-available-count');
    let dexElem = document.getElementById('blue-robe-swift-dex');
    let accElem = document.getElementById('blue-robe-swift-acc');
    let mvsElem = document.getElementById('blue-robe-swift-mvs');

    let dexInfoElem = document.getElementById('blue-robe-swift-dex-info');
    let accInfoElem = document.getElementById('blue-robe-swift-acc-info');
    let mvsInfoElem = document.getElementById('blue-robe-swift-mvs-info');

    dexElem.textContent = (parseInt(dexElem.textContent) + dex).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    mvsElem.textContent = (parseInt(mvsElem.textContent) + mvs).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(dexElem.textContent)) // 기본값이 0이므로 빼는 값이 없다
    additionalElem.hidden = false;

    if (parseInt(dexElem.textContent) !== 0) {
        dexInfoElem.hidden = false;
    }

    if (parseInt(accElem.textContent) !== 0) {
        accInfoElem.hidden = false;
    }

    if (parseInt(mvsElem.textContent) !== 0) {
        mvsInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('blue-robe-swift-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('blue-robe-swift-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('blue-robe-swift-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('blue-robe-swift-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('blue-robe-swift-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('blue-robe-swift-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('blue-robe-swift-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = blueRobeSwiftImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('blue-robe-swift-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = blueRobeSwiftImgPath
        gifImg.hidden = true;
    }, 1000);
}

let blueRobeSwiftPriceInput = document.getElementById('blue-robe-swift-price'); // 아이템 가격
let blueRobeSwiftTenInput = document.getElementById('blue-robe-swift-10-price'); // 10퍼센트 가격
let blueRobeSwiftSixtyInput = document.getElementById('blue-robe-swift-60-price'); // 60퍼센트 가격
let blueRobeSwiftHundredInput = document.getElementById('blue-robe-swift-100-price'); // 100퍼센트 가격
let blueRobeSwiftPriceResetBtn = document.getElementById('blue-robe-swift-price-reset-btn') // 리셋 버튼

blueRobeSwiftPriceInput.oninput = () => {
    reCalculateBlueRobeSwiftTotalPrice()
}

blueRobeSwiftTenInput.oninput = () => {
    reCalculateBlueRobeSwiftTotalPrice();
}

blueRobeSwiftSixtyInput.oninput = () => {
    reCalculateBlueRobeSwiftTotalPrice();
}

blueRobeSwiftHundredInput.oninput = () => {
    reCalculateBlueRobeSwiftTotalPrice();
}

function reCalculateBlueRobeSwiftTotalPrice() {
    let blueRobeSwiftPriceInputElem = document.getElementById('blue-robe-swift-price');
    let tenInputElem = document.getElementById('blue-robe-swift-10-price');
    let sixtyInputElem = document.getElementById('blue-robe-swift-60-price');
    let hundredInputElem = document.getElementById('blue-robe-swift-100-price');
    let usedPriceElem = document.getElementById('blue-robe-swift-total-used-price');

    let price = parseInt(blueRobeSwiftPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * blueRobeSwiftCnt +
        (
            tenInput * blueRobeSwiftTenTrial +
            sixtyInput * blueRobeSwiftSixtyTrial +
            hundredInput *
            blueRobeSwiftHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
blueRobeSwiftPriceResetBtn.addEventListener('click', function () {
    resetBlueRobeSwiftPrice()
});

function resetBlueRobeSwiftPrice() {
    let tenSuccessCnt = document.getElementById('blue-robe-swift-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('blue-robe-swift-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('blue-robe-swift-100-success-cnt');
    let tenUsedCnt = document.getElementById('blue-robe-swift-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('blue-robe-swift-60-used-cnt');
    let hundredUsedCnt = document.getElementById('blue-robe-swift-100-used-cnt');
    let itemCnt = document.getElementById('blue-robe-swift-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    blueRobeSwiftTenTrial = 0;
    blueRobeSwiftSixtyTrial = 0;
    blueRobeSwiftHundredTrial = 0;
    blueRobeSwiftCnt = 1;

    reCalculateBlueRobeSwiftTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addBlueRobeSwiftBuyCnt() {
    let buyCnt = document.getElementById('blue-robe-swift-cnt');
    blueRobeSwiftCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = blueRobeSwiftCnt.toString();
    reCalculateBlueRobeSwiftTotalPrice();
}