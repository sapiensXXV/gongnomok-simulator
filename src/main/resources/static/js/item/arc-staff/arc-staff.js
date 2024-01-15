import * as util from "../../global/util.js";

// 속성 값들
let defaultPhyAtk = 41;
let defaultMgAtk = 60;
let defaultAvailableCount = 7;

let arcStaffImgPath = '../img/item/weapon/arc-staff.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('arc-staff-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('arc-staff-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('arc-staff-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('arc-staff-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('arc-staff-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('arc-staff-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('arc-staff-10-percent-button');
let sixtyPerBtn = document.getElementById('arc-staff-60-percent-button');
let hundredPerBtn = document.getElementById('arc-staff-100-percent-button');
let resetBtn = document.getElementById('arc-staff-reset-button');

// 아이템 구매 횟수
let arcStaffCnt = 1;

// 주문서 시도 횟수
let arcStaffTenTrial = 0;
let arcStaffSixtyTrial = 0;
let arcStaffHundredTrial = 0;

// 가격 관련 input, button
let arcStaffPriceInput = document.getElementById('arc-staff-price'); // 아이템 가격
let arcStaffTenInput = document.getElementById('arc-staff-10-price'); // 10퍼센트 가격
let arcStaffSixtyInput = document.getElementById('arc-staff-60-price'); // 60퍼센트 가격
let arcStaffHundredInput = document.getElementById('arc-staff-100-price'); // 100퍼센트 가격
let arcStaffPriceResetBtn = document.getElementById('arc-staff-price-reset-btn') // 리셋 버튼

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
        resetArcStaffPrice();
        arcStaffPriceResetBtn.focus();
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
        arcStaffPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
arcStaffPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { arcStaffPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('arc-staff-10-used-cnt');
    arcStaffTenTrial++;
    usedCnt.textContent = arcStaffTenTrial.toString();
    recalculateArcStaffTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('arc-staff-60-used-cnt');
    arcStaffSixtyTrial++;
    usedCnt.textContent = arcStaffSixtyTrial.toString();
    recalculateArcStaffTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('arc-staff-100-used-cnt');
    arcStaffHundredTrial++;
    usedCnt.textContent = arcStaffHundredTrial.toString();
    recalculateArcStaffTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('arc-staff-mg-atk');
    let phyAtk = document.getElementById('arc-staff-phy-atk');
    defaultMgAtk = 60;
    defaultPhyAtk = 41;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('arc-staff-mg-atk');
    let phyAtk = document.getElementById('arc-staff-phy-atk');
    defaultMgAtk = 61;
    defaultPhyAtk = 42;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('arc-staff-mg-atk');
    let phyAtk = document.getElementById('arc-staff-phy-atk');
    defaultMgAtk = 62;
    defaultPhyAtk = 43;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('arc-staff-mg-atk');
    let phyAtk = document.getElementById('arc-staff-phy-atk');
    defaultMgAtk = 63;
    defaultPhyAtk = 44;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('arc-staff-mg-atk');
    let phyAtk = document.getElementById('arc-staff-phy-atk');
    defaultMgAtk = 64;
    defaultPhyAtk = 45;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('arc-staff-mg-atk');
    let phyAtk = document.getElementById('arc-staff-phy-atk');
    defaultMgAtk = 65;
    defaultPhyAtk = 46;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('arc-staff-phy-atk'); // 물리공격력
    let mgAtk = document.getElementById('arc-staff-mg-atk'); // 마법공격력
    let intV = document.getElementById('arc-staff-int'); // INT
    let mgDef = document.getElementById('arc-staff-mg-def'); // 마법 방어력

    let intInfo = document.getElementById('arc-staff-int-info'); // int 정보 텍스트
    let mgDefInfo = document.getElementById('arc-staff-mg-def-info'); // 마법 방어력 정보 텍스트

    let availableCnt = document.getElementById('arc-staff-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('arc-staff-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('arc-staff-additional');

    // 원래의 능력치로 초기화
    phyAtk.textContent = defaultPhyAtk.toString();
    mgAtk.textContent = defaultMgAtk.toString();
    intV.textContent = '0'
    mgDef.textContent = '0';

    intInfo.hidden = true; mgDefInfo.hidden = true;
    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addArcStaffBuyCnt()
    }

    let title = document.getElementById('arc-staff-title');
    let alertTxt = document.getElementById('arc-staff-available-alert-txt');
    util.changeColor(title, parseInt(mgAtk.textContent) - defaultMgAtk);
    alertTxt.hidden = true;

}

function success(mgAtk, intV, mgDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('arc-staff-upgraded-count');
    let additionalElem = document.getElementById('arc-staff-additional');
    let title = document.getElementById('arc-staff-title');
    let availableCount = document.getElementById('arc-staff-upgrade-available-count');
    let mgAtkElem = document.getElementById('arc-staff-mg-atk');
    let intElem = document.getElementById('arc-staff-int');
    let mgDefElem = document.getElementById('arc-staff-mg-def');

    let intInfoElem = document.getElementById('arc-staff-int-info');
    let mgDefInfoElem = document.getElementById('arc-staff-mg-def-info');

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
        let successCnt = document.getElementById('arc-staff-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('arc-staff-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('arc-staff-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('arc-staff-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('arc-staff-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('arc-staff-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('arc-staff-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = arcStaffImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('arc-staff-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = arcStaffImgPath
        gifImg.hidden = true;
    }, 1000);
}



arcStaffPriceInput.oninput = () => {
    recalculateArcStaffTotalPrice()
}

arcStaffTenInput.oninput = () => {
    recalculateArcStaffTotalPrice();
}

arcStaffSixtyInput.oninput = () => {
    recalculateArcStaffTotalPrice();
}

arcStaffHundredInput.oninput = () => {
    recalculateArcStaffTotalPrice();
}

function recalculateArcStaffTotalPrice() {
    let arcStaffPriceInputElem = document.getElementById('arc-staff-price');
    let tenInputElem = document.getElementById('arc-staff-10-price');
    let sixtyInputElem = document.getElementById('arc-staff-60-price');
    let hundredInputElem = document.getElementById('arc-staff-100-price');
    let usedPriceElem = document.getElementById('arc-staff-total-used-price');

    let price = parseInt(arcStaffPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * arcStaffCnt +
        (
            tenInput * arcStaffTenTrial +
            sixtyInput * arcStaffSixtyTrial +
            hundredInput *
            arcStaffHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
arcStaffPriceResetBtn.addEventListener('click', function () {
    resetArcStaffPrice()
});

function resetArcStaffPrice() {
    let tenSuccessCnt = document.getElementById('arc-staff-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('arc-staff-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('arc-staff-100-success-cnt');
    let tenUsedCnt = document.getElementById('arc-staff-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('arc-staff-60-used-cnt');
    let hundredUsedCnt = document.getElementById('arc-staff-100-used-cnt');
    let itemCnt = document.getElementById('arc-staff-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    arcStaffTenTrial = 0;
    arcStaffSixtyTrial = 0;
    arcStaffHundredTrial = 0;
    arcStaffCnt = 1;

    recalculateArcStaffTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addArcStaffBuyCnt() {
    let buyCnt = document.getElementById('arc-staff-cnt');
    arcStaffCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = arcStaffCnt.toString();
    recalculateArcStaffTotalPrice();
}