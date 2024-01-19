import * as util from "../../../global/util.js";

// 속성 값들
let defaultPhyAtk = 50;
let defaultPhyDef = 0;
let defaultDex = 0;
let defaultLuk = 0;
let defaultAcc = 5;
let defaultAvo = 5;
let defaultAvailableCount = 7;
let defaultUpgradedCount = 0;

let koreanFanImgPath = '../img/item/weapon/thief/korean-fan.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('korean-fan-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('korean-fan-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('korean-fan-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('korean-fan-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('korean-fan-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('korean-fan-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('korean-fan-10-percent-button');
let sixtyPerBtn = document.getElementById('korean-fan-60-percent-button');
let hundredPerBtn = document.getElementById('korean-fan-100-percent-button');
let resetBtn = document.getElementById('korean-fan-reset-button');

// 아이템 구매 횟수
let koreanFanCnt = 1;

// 주문서 시도 횟수
let koreanFanTenTrial = 0;
let koreanFanSixtyTrial = 0;
let koreanFanHundredTrial = 0;

// 가격 관련 input, button
let koreanFanPriceInput = document.getElementById('korean-fan-price'); // 아이템 가격
let koreanFanTenInput = document.getElementById('korean-fan-10-price'); // 10퍼센트 가격
let koreanFanSixtyInput = document.getElementById('korean-fan-60-price'); // 60퍼센트 가격
let koreanFanHundredInput = document.getElementById('korean-fan-100-price'); // 100퍼센트 가격
let koreanFanPriceResetBtn = document.getElementById('korean-fan-price-reset-btn') // 리셋 버튼

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
        resetKoreanFanPrice();
        koreanFanPriceResetBtn.focus();
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
        koreanFanPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
koreanFanPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { koreanFanPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('korean-fan-10-used-cnt');
    koreanFanTenTrial++;
    usedCnt.textContent = koreanFanTenTrial.toString();
    recalculateKoreanFanTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('korean-fan-60-used-cnt');
    koreanFanSixtyTrial++;
    usedCnt.textContent = koreanFanSixtyTrial.toString();
    recalculateKoreanFanTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('korean-fan-100-used-cnt');
    koreanFanHundredTrial++;
    usedCnt.textContent = koreanFanHundredTrial.toString();
    recalculateKoreanFanTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('korean-fan-phy-atk');
    let acc = document.getElementById('korean-fan-acc');
    let avo = document.getElementById('korean-fan-avo');
    defaultPhyAtk = 50
    defaultAcc = 5;
    defaultAvo = 5;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    acc.textContent = defaultAcc.toString();
    avo.textContent = defaultAvo.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('korean-fan-phy-atk');
    let acc = document.getElementById('korean-fan-acc');
    let avo = document.getElementById('korean-fan-avo');
    defaultPhyAtk = 51;
    defaultAcc = 5;
    defaultAvo = 5;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    acc.textContent = defaultAcc.toString();
    avo.textContent = defaultAvo.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('korean-fan-phy-atk');
    let acc = document.getElementById('korean-fan-acc');
    let avo = document.getElementById('korean-fan-avo');
    defaultPhyAtk = 52;
    defaultAcc = 5;
    defaultAvo = 5;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    acc.textContent = defaultAcc.toString();
    avo.textContent = defaultAvo.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('korean-fan-phy-atk');
    let acc = document.getElementById('korean-fan-acc');
    let avo = document.getElementById('korean-fan-avo');
    defaultPhyAtk = 53;
    defaultAcc = 6;
    defaultAvo = 5;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    acc.textContent = defaultAcc.toString();
    avo.textContent = defaultAvo.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('korean-fan-phy-atk');
    let acc = document.getElementById('korean-fan-acc');
    let avo = document.getElementById('korean-fan-avo');
    defaultPhyAtk = 54;
    defaultAcc = 6;
    defaultAvo = 6;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    acc.textContent = defaultAcc.toString();
    avo.textContent = defaultAvo.toString();
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('korean-fan-phy-atk');
    let acc = document.getElementById('korean-fan-acc');
    let avo = document.getElementById('korean-fan-avo');
    defaultPhyAtk = 55
    defaultAcc = 6;
    defaultAvo = 6;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
    acc.textContent = defaultAcc.toString();
    avo.textContent = defaultAvo.toString();
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('korean-fan-phy-atk'); // 물리공격력
    let lukV = document.getElementById('korean-fan-luk'); // LUK
    let phyDef = document.getElementById('korean-fan-phy-def'); // 물리방어력

    let lukInfo = document.getElementById('korean-fan-luk-info');
    let phyDefInfo = document.getElementById('korean-fan-phy-def-info');

    let availableCnt = document.getElementById('korean-fan-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('korean-fan-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('korean-fan-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    lukV.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();

    lukInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = defaultUpgradedCount.toString();
    additionalTitle.hidden = true

    if (isNew) {
        addKoreanFanBuyCnt()
    }

    let title = document.getElementById('korean-fan-title');
    let alertTxt = document.getElementById('korean-fan-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;
}

function success(phyAtk, luk, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('korean-fan-upgraded-count');
    let additionalElem = document.getElementById('korean-fan-additional');
    let title = document.getElementById('korean-fan-title');
    let availableCount = document.getElementById('korean-fan-upgrade-available-count');

    let phyAtkElem = document.getElementById('korean-fan-phy-atk');
    let lukElem = document.getElementById('korean-fan-luk');
    let phyDefElem = document.getElementById('korean-fan-phy-def');

    let lukElemInfo = document.getElementById('korean-fan-luk-info');
    let phyDefElemInfo = document.getElementById('korean-fan-phy-def-info');

    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + phyAtk).toString();
    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();
    phyDefElem.textContent = (parseInt(phyDefElem.textContent) + phyDef).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(lukElem.textContent) !== 0) {
        lukElemInfo.hidden = false;
    }
    if (parseInt(phyDefElem.textContent) !== 0) {
        phyDefElemInfo.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('korean-fan-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('korean-fan-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('korean-fan-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('korean-fan-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('korean-fan-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('korean-fan-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('korean-fan-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = koreanFanImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('korean-fan-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = koreanFanImgPath
        gifImg.hidden = true;
    }, 1000);
}



koreanFanPriceInput.oninput = () => {
    recalculateKoreanFanTotalPrice()
}

koreanFanTenInput.oninput = () => {
    recalculateKoreanFanTotalPrice();
}

koreanFanSixtyInput.oninput = () => {
    recalculateKoreanFanTotalPrice();
}

koreanFanHundredInput.oninput = () => {
    recalculateKoreanFanTotalPrice();
}

function recalculateKoreanFanTotalPrice() {
    let koreanFanPriceInputElem = document.getElementById('korean-fan-price');
    let tenInputElem = document.getElementById('korean-fan-10-price');
    let sixtyInputElem = document.getElementById('korean-fan-60-price');
    let hundredInputElem = document.getElementById('korean-fan-100-price');
    let usedPriceElem = document.getElementById('korean-fan-total-used-price');

    let price = parseInt(koreanFanPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * koreanFanCnt +
        (
            tenInput * koreanFanTenTrial +
            sixtyInput * koreanFanSixtyTrial +
            hundredInput *
            koreanFanHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
koreanFanPriceResetBtn.addEventListener('click', function () {
    resetKoreanFanPrice()
});

function resetKoreanFanPrice() {
    let tenSuccessCnt = document.getElementById('korean-fan-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('korean-fan-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('korean-fan-100-success-cnt');
    let tenUsedCnt = document.getElementById('korean-fan-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('korean-fan-60-used-cnt');
    let hundredUsedCnt = document.getElementById('korean-fan-100-used-cnt');
    let itemCnt = document.getElementById('korean-fan-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    koreanFanTenTrial = 0;
    koreanFanSixtyTrial = 0;
    koreanFanHundredTrial = 0;
    koreanFanCnt = 1;

    recalculateKoreanFanTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addKoreanFanBuyCnt() {
    let buyCnt = document.getElementById('korean-fan-cnt');
    koreanFanCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = koreanFanCnt.toString();
    recalculateKoreanFanTotalPrice();
}