import * as util from "../../global/util.js";

// 속성 값들
let defaultBgAvailableCnt = 7;
let defaultPhyAtk = 30
let defaultDex = 4;
let defaultAvo = 3;
let defaultAcc = 0;
let defaultLuk = 0;

let bloodGiganticImgPath = '../img/weapon/blood-gigantic.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('blood-gigantic-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('blood-gigantic-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('blood-gigantic-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('blood-gigantic-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('blood-gigantic-four-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('blood-gigantic-10-percent-button');
let sixtyPerBtn = document.getElementById('blood-gigantic-60-percent-button');
let hundredPerBtn = document.getElementById('blood-gigantic-100-percent-button');
let resetBtn = document.getElementById('blood-gigantic-reset-button');

// 아이템 구매 횟수
let bloodGiganticCnt = 1;

// 주문서 시도 횟수
let bloodGiganticTenTrial = 0;
let bloodGiganticSixtyTrial = 0;
let bloodGiganticHundredTrial = 0;

let bloodGiganticPriceInput = document.getElementById('blood-gigantic-price'); // 아이템 가격
let bloodGiganticTenInput = document.getElementById('blood-gigantic-10-price'); // 10퍼센트 가격
let bloodGiganticSixtyInput = document.getElementById('blood-gigantic-60-price'); // 60퍼센트 가격
let bloodGiganticHundredInput = document.getElementById('blood-gigantic-100-price'); // 100퍼센트 가격
let bloodGiganticPriceResetBtn = document.getElementById('blood-gigantic-price-reset-btn') // 리셋 버튼

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
        resetBloodGiganticPrice();
        bloodGiganticPriceResetBtn.focus();
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
        bloodGiganticPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
bloodGiganticPriceResetBtn.addEventListener('mouseup', bloodGiganticPriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function bloodGiganticPriceResetBtnMouseUp() { bloodGiganticPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('blood-gigantic-10-used-cnt');
    bloodGiganticTenTrial++;
    usedCnt.textContent = bloodGiganticTenTrial.toString();
    recalculateBloodGiganticTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('blood-gigantic-60-used-cnt');
    bloodGiganticSixtyTrial++;
    usedCnt.textContent = bloodGiganticSixtyTrial.toString();
    recalculateBloodGiganticTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('blood-gigantic-100-used-cnt');
    bloodGiganticHundredTrial++;
    usedCnt.textContent = bloodGiganticHundredTrial.toString();
    recalculateBloodGiganticTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {

    let phyAtk = document.getElementById('blood-gigantic-phy-atk');
    let dexV= document.getElementById('blood-gigantic-dex');
    let avoV = document.getElementById('blood-gigantic-avo');

    defaultPhyAtk = 30;
    defaultDex = 3;
    defaultAvo = 3;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    avoV.textContent = defaultAvo.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('blood-gigantic-phy-atk');
    let dexV= document.getElementById('blood-gigantic-dex');
    let avoV = document.getElementById('blood-gigantic-avo');

    defaultPhyAtk = 31;
    defaultDex = 4;
    defaultAvo = 3;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    avoV.textContent = defaultAvo.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('blood-gigantic-phy-atk');
    let dexV= document.getElementById('blood-gigantic-dex');
    let avoV = document.getElementById('blood-gigantic-avo');

    defaultPhyAtk = 32;
    defaultDex = 4;
    defaultAvo = 3;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    avoV.textContent = defaultAvo.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('blood-gigantic-phy-atk');
    let dexV= document.getElementById('blood-gigantic-dex');
    let avoV = document.getElementById('blood-gigantic-avo');

    defaultPhyAtk = 33;
    defaultDex = 5;
    defaultAvo = 4;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    avoV.textContent = defaultAvo.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('blood-gigantic-phy-atk');
    let dexV= document.getElementById('blood-gigantic-dex');
    let avoV = document.getElementById('blood-gigantic-avo');

    defaultPhyAtk = 34;
    defaultDex = 5;
    defaultAvo = 4;
    resetItem(false);

    phyAtk.textContent = defaultPhyAtk.toString();
    dexV.textContent = defaultDex.toString();
    avoV.textContent = defaultAvo.toString();
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('blood-gigantic-phy-atk'); // 물리공격력
    let accV = document.getElementById('blood-gigantic-acc'); // 명중률
    let lukV = document.getElementById('blood-gigantic-luk'); // LUK
    let lukInfo = document.getElementById('blood-gigantic-luk-info'); // LUK 정보 텍스트
    let accInfo = document.getElementById('blood-gigantic-acc-info'); // 명중률 정보 텍스트
    let availableCnt = document.getElementById('blood-gigantic-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('blood-gigantic-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('blood-gigantic-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    accV.textContent = defaultAcc.toString();
    lukV.textContent = defaultLuk.toString();

    availableCnt.textContent = defaultBgAvailableCnt.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true


    lukInfo.hidden = true; accInfo.hidden = true;

    if (isNew) {
        addBloodGiganticBuyCnt()
    }

    let title = document.getElementById('blood-gigantic-title');
    let alertTxt = document.getElementById('blood-gigantic-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(atk, acc, luk, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('blood-gigantic-upgraded-count');
    let additionalElem = document.getElementById('blood-gigantic-additional');
    let title = document.getElementById('blood-gigantic-title');
    let availableCount = document.getElementById('blood-gigantic-upgrade-available-count');
    let phyAtkElem = document.getElementById('blood-gigantic-phy-atk');
    let accElem = document.getElementById('blood-gigantic-acc');
    let lukElem = document.getElementById('blood-gigantic-luk');

    let lukInfoElem = document.getElementById('blood-gigantic-luk-info');
    let accInfoElem= document.getElementById('blood-gigantic-acc-info');

    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + atk).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();


    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(lukElem.textContent) !== 0) {
        lukInfoElem.hidden = false;
    }

    if (parseInt(accElem.textContent) != 0) {
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
        let successCnt = document.getElementById('blood-gigantic-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('blood-gigantic-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('blood-gigantic-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('blood-gigantic-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('blood-gigantic-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('blood-gigantic-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('blood-gigantic-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = bloodGiganticImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('blood-gigantic-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = bloodGiganticImgPath
        gifImg.hidden = true;
    }, 1000);
}

bloodGiganticPriceInput.oninput = () => {
    recalculateBloodGiganticTotalPrice()
}

bloodGiganticTenInput.oninput = () => {
    recalculateBloodGiganticTotalPrice();
}

bloodGiganticSixtyInput.oninput = () => {
    recalculateBloodGiganticTotalPrice();
}

bloodGiganticHundredInput.oninput = () => {
    recalculateBloodGiganticTotalPrice();
}

function recalculateBloodGiganticTotalPrice() {
    let bloodGiganticPriceInputElem = document.getElementById('blood-gigantic-price');
    let tenInputElem = document.getElementById('blood-gigantic-10-price');
    let sixtyInputElem = document.getElementById('blood-gigantic-60-price');
    let hundredInputElem = document.getElementById('blood-gigantic-100-price');
    let usedPriceElem = document.getElementById('blood-gigantic-total-used-price');

    let price = parseInt(bloodGiganticPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * bloodGiganticCnt +
        (
            tenInput * bloodGiganticTenTrial +
            sixtyInput * bloodGiganticSixtyTrial +
            hundredInput *
            bloodGiganticHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
bloodGiganticPriceResetBtn.addEventListener('click', function () {
    resetBloodGiganticPrice()
});

function resetBloodGiganticPrice() {
    let tenSuccessCnt = document.getElementById('blood-gigantic-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('blood-gigantic-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('blood-gigantic-100-success-cnt');
    let tenUsedCnt = document.getElementById('blood-gigantic-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('blood-gigantic-60-used-cnt');
    let hundredUsedCnt = document.getElementById('blood-gigantic-100-used-cnt');
    let itemCnt = document.getElementById('blood-gigantic-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    bloodGiganticTenTrial = 0;
    bloodGiganticSixtyTrial = 0;
    bloodGiganticHundredTrial = 0;
    bloodGiganticCnt = 1;

    recalculateBloodGiganticTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addBloodGiganticBuyCnt() {
    let buyCnt = document.getElementById('blood-gigantic-cnt');
    bloodGiganticCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = bloodGiganticCnt.toString();
    recalculateBloodGiganticTotalPrice();
}