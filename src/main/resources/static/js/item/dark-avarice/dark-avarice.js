import * as util from "../../global/util.js";

// 속성 값들
let defaultAtkSpeed = 4;
let defaultPhysicAtk = 22;
let defaultPhysicDef = 4;
let defaultLuk = 4;
let defaultAvailableCount = 7;
let defaultAcc = 0;

let timer = null;

let gloveImgPath = '../img/weapon/work-glove.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

// 옵션 버튼
let normalOptionBtn = document.getElementById('dark-avarice-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('dark-avarice-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('dark-avarice-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('dark-avarice-three-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('dark-avarice-10-percent-button');
let sixtyPerBtn = document.getElementById('dark-avarice-60-percent-button');
let hundredPerBtn = document.getElementById('dark-avarice-100-percent-button');
let resetBtn = document.getElementById('dark-avarice-reset-button');

// 아이템 구매 횟수
let darkAvariceCnt = 1;

// 주문서 시도 횟수
let darkAvariceTenTrial = 0;
let darkAvariceSixtyTrial = 0;
let darkAvariceHundredTrial = 0;

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
    } else if (input === 'q' || input === 'Q' || input === 'ㅂ' || input == 'ㅃ') {
        tenPerBtnClicked();
    } else if (input === 'w' || input == 'W' || input === 'ㅈ' || input === 'ㅉ') {
        sixtyPerBtnClicked()
    } else if (input === 'e' || input == 'E' || input === 'ㄷ' || input === 'ㄸ') {
        resetDarkAvaricePrice()
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
        success(5, 3, 1, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('dark-avarice-10-used-cnt');
    darkAvariceTenTrial++
    usedCnt.textContent = darkAvariceTenTrial.toString();
    recalculateDarkAvariceTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('dark-avarice-60-used-cnt');
    darkAvariceSixtyTrial++
    usedCnt.textContent = darkAvariceSixtyTrial.toString();
    recalculateDarkAvariceTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('dark-avarice-100-used-cnt');
    darkAvariceHundredTrial++
    usedCnt.textContent = darkAvariceHundredTrial.toString();
    recalculateDarkAvariceTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    defaultPhysicAtk = 22
    resetItem(false);
    darkAvariceAtk.textContent = defaultPhysicAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    defaultPhysicAtk = 23
    resetItem(false);
    darkAvariceAtk.textContent = (defaultPhysicAtk).toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    defaultPhysicAtk = 24
    resetItem(false);
    darkAvariceAtk.textContent = (defaultPhysicAtk).toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    let darkAvariceLuk = document.getElementById('dark-avarice-luk');
    defaultPhysicAtk = 25
    resetItem(false);
    darkAvariceAtk.textContent = (defaultPhysicAtk).toString();
    darkAvariceLuk.textContent = (defaultLuk + 1).toString();
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {

    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    let darkAvariceDef = document.getElementById('dark-avarice-phy-def');
    let darkAvariceLuk = document.getElementById('dark-avarice-luk');
    let darkAvariceAvailableCount = document.getElementById('dark-avarice-upgrade-available-count');
    let darkAvariceAcc = document.getElementById('dark-avarice-acc');
    let darkAvariceAccText = document.getElementById('dark-avarice-acc-text');
    let additionalElem = document.getElementById('dark-avarice-additional');
    let upgradedCount = document.getElementById('dark-avarice-upgraded-count');
    let titleElem = document.getElementById('dark-avarice-title');


    darkAvariceAtk.textContent = defaultPhysicAtk.toString()
    darkAvariceDef.textContent = defaultPhysicDef.toString()
    darkAvariceDef.textContent = defaultPhysicDef.toString()
    darkAvariceLuk.textContent = defaultLuk.toString()
    darkAvariceAvailableCount.textContent = defaultAvailableCount.toString()
    darkAvariceAcc.textContent = defaultAcc.toString()
    darkAvariceAccText.hidden = true; // 숨김. 주문서를 바르기 전에는 없는 옵션
    additionalElem.hidden = true;
    upgradedCount.textContent = '0'

    if (isNew) {
        addDarkAvariceBuyCnt();
    }

    let alertTxt = document.getElementById('dark-avarice-available-alert-txt');
    util.changeColor(titleElem, parseInt(darkAvariceAtk.textContent) - defaultPhysicAtk);
    alertTxt.hidden = true;
}

function success(pyAtk, acc, luk, percent) {
    console.log('scroll success');
    let upgradedCountElem = document.getElementById('dark-avarice-upgraded-count');
    let additionalElem = document.getElementById('dark-avarice-additional');
    let pyAtkElem = document.getElementById('dark-avarice-phy-atk');
    let accElem = document.getElementById('dark-avarice-acc');
    let lukElem = document.getElementById('dark-avarice-luk');
    let accElemText = document.getElementById('dark-avarice-acc-text');
    let title = document.getElementById('dark-avarice-title');
    let availableCount = document.getElementById('dark-avarice-upgrade-available-count');

    pyAtkElem.textContent = (parseInt(pyAtkElem.textContent) + pyAtk).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(pyAtkElem.textContent) - defaultPhysicAtk)
    additionalElem.hidden = false;

    if (parseInt(accElem.textContent) !== 0) {
        accElemText.hidden = false;
    }

    util.playSuccessSound(); // 성공 소리재생
    reduceAvailableCount(availableCount); // 업그레이드 가능 횟수 감소
    addSuccessCnt(percent) // 성공 카운트 증가
    playSuccessEffect() // 성공시 소리 재생
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('dark-avarice-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('dark-avarice-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('dark-avarice-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}

function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('dark-avarice-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('dark-avarice-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('dark-avarice-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('dark-avarice-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = gloveImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('dark-avarice-gif-img');
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
let darkAvaricePriceInput = document.getElementById('dark-avarice-price'); // 아이템 가격
let darkAvariceTenInput = document.getElementById('dark-avarice-10-price'); // 10퍼센트 가격
let darkAvariceSixtyInput = document.getElementById('dark-avarice-60-price'); // 60퍼센트 가격
let darkAvariceHundredInput = document.getElementById('dark-avarice-100-price'); // 100퍼센트 가격
let darkAvaricePriceResetBtn = document.getElementById('dark-avarice-price-reset-btn') // 리셋 버튼

darkAvaricePriceInput.oninput = () => {
    recalculateDarkAvariceTotalPrice()
}

darkAvariceTenInput.oninput = () => {
    recalculateDarkAvariceTotalPrice();
}

darkAvariceSixtyInput.oninput = () => {
    recalculateDarkAvariceTotalPrice();
}

darkAvariceHundredInput.oninput = () => {
    recalculateDarkAvariceTotalPrice();
}

function recalculateDarkAvariceTotalPrice() {
    let darkAvaricePriceInputElem = document.getElementById('dark-avarice-price');
    let tenInputElem = document.getElementById('dark-avarice-10-price');
    let sixtyInputElem = document.getElementById('dark-avarice-60-price');
    let hundredInputElem = document.getElementById('dark-avarice-100-price');
    let usedPriceElem = document.getElementById('dark-avarice-total-used-price');

    let price = parseInt(darkAvaricePriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * darkAvariceCnt +
        (
            tenInput * darkAvariceTenTrial +
            sixtyInput * darkAvariceSixtyTrial +
            hundredInput * darkAvariceHundredTrial
        )
    ).toLocaleString();
}

/**
 * 주문서 총 가격 리셋 로직
 */
darkAvaricePriceResetBtn.addEventListener('click', function () {
    resetDarkAvaricePrice()
});

function resetDarkAvaricePrice() {
    let tenSuccessCnt = document.getElementById('dark-avarice-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('dark-avarice-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('dark-avarice-100-success-cnt');
    let tenUsedCnt = document.getElementById('dark-avarice-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('dark-avarice-60-used-cnt');
    let hundredUsedCnt = document.getElementById('dark-avarice-100-used-cnt');
    let itemCnt = document.getElementById('dark-avarice-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    darkAvariceTenTrial = 0;
    darkAvariceSixtyTrial = 0;
    darkAvariceHundredTrial = 0;
    darkAvariceCnt = 1
    recalculateDarkAvariceTotalPrice();
}

function addDarkAvariceBuyCnt() {
    let buyCnt = document.getElementById('dark-avarice-cnt');
    darkAvariceCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = darkAvariceCnt.toString();
    recalculateDarkAvariceTotalPrice();
}