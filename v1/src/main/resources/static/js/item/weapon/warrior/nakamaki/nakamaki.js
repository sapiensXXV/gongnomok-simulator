import * as util from "../../../../global/util.js";

// 속성 값들
let defaultAtkSpeed = 4;
let defaultStr = 0;
let defaultPhyAtk = 57;
let defaultPhyDef = 0;
let defaultAvailableCount = 7;

let nakamakiImgPath = '../img/item/weapon/nakamaki.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('nakamaki-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('nakamaki-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('nakamaki-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('nakamaki-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('nakamaki-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('nakamaki-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('nakamaki-10-percent-button');
let sixtyPerBtn = document.getElementById('nakamaki-60-percent-button');
let hundredPerBtn = document.getElementById('nakamaki-100-percent-button');
let resetBtn = document.getElementById('nakamaki-reset-button');

// 아이템 구매 횟수
let nakamakiCnt = 1;

// 주문서 시도 횟수
let nakamakiTenTrial = 0;
let nakamakiSixtyTrial = 0;
let nakamakiHundredTrial = 0;

// 가격 관련 input, button
let nakamakiPriceInput = document.getElementById('nakamaki-price'); // 아이템 가격
let nakamakiTenInput = document.getElementById('nakamaki-10-price'); // 10퍼센트 가격
let nakamakiSixtyInput = document.getElementById('nakamaki-60-price'); // 60퍼센트 가격
let nakamakiHundredInput = document.getElementById('nakamaki-100-price'); // 100퍼센트 가격
let nakamakiPriceResetBtn = document.getElementById('nakamaki-price-reset-btn') // 리셋 버튼

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
        resetNakamakiPrice();
        nakamakiPriceResetBtn.focus();
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
        nakamakiPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
nakamakiPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { nakamakiPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('nakamaki-10-used-cnt');
    nakamakiTenTrial++;
    usedCnt.textContent = nakamakiTenTrial.toString();
    recalculateNakamakiTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('nakamaki-60-used-cnt');
    nakamakiSixtyTrial++;
    usedCnt.textContent = nakamakiSixtyTrial.toString();
    recalculateNakamakiTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('nakamaki-100-used-cnt');
    nakamakiHundredTrial++;
    usedCnt.textContent = nakamakiHundredTrial.toString();
    recalculateNakamakiTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('nakamaki-phy-atk');
    defaultPhyAtk = 57
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('nakamaki-phy-atk');
    defaultPhyAtk = 58;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('nakamaki-phy-atk');
    defaultPhyAtk = 59;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('nakamaki-phy-atk');
    defaultPhyAtk = 60;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('nakamaki-phy-atk');
    defaultPhyAtk = 61;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let phyAtk = document.getElementById('nakamaki-phy-atk');
    defaultPhyAtk = 62;
    resetItem(false);
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('nakamaki-phy-atk'); // 물리공격력
    let strV = document.getElementById('nakamaki-str'); // STR
    let strInfo = document.getElementById('nakamaki-str-info'); // STR 정보 텍스트
    let phyDef = document.getElementById('nakamaki-phy-def'); // 물리방어력
    let phyDefInfo = document.getElementById('nakamaki-phy-def-info'); // 물리방어력 정보 텍스트
    let availableCnt = document.getElementById('nakamaki-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('nakamaki-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('nakamaki-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    strV.textContent = defaultStr.toString()
    phyDef.textContent = defaultPhyDef.toString();

    strInfo.hidden = true; phyDefInfo.hidden = true;

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addNakamakiBuyCnt()
    }

    let title = document.getElementById('nakamaki-title');
    let alertTxt = document.getElementById('nakamaki-available-alert-txt');
    util.changeColor(title, parseInt(phyAtk.textContent) - defaultPhyAtk);
    alertTxt.hidden = true;

}

function success(phyAtk, strV, phyDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('nakamaki-upgraded-count');
    let additionalElem = document.getElementById('nakamaki-additional');
    let title = document.getElementById('nakamaki-title');
    let availableCount = document.getElementById('nakamaki-upgrade-available-count');
    let phyAtkElem = document.getElementById('nakamaki-phy-atk');

    let strElem = document.getElementById('nakamaki-str');
    let strInfoElem = document.getElementById('nakamaki-str-info');

    let phyDefElem = document.getElementById('nakamaki-phy-def');
    let phyDefInfoElem = document.getElementById('nakamaki-phy-def-info');


    phyAtkElem.textContent = (parseInt(phyAtkElem.textContent) + phyAtk).toString();
    strElem.textContent = (parseInt(strElem.textContent) + strV).toString();
    phyDefElem.textContent = (parseInt(phyDefElem.textContent) + phyDef).toString();


    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(phyAtkElem.textContent) - defaultPhyAtk)
    additionalElem.hidden = false;

    if (parseInt(strElem.textContent) !== 0) {
        strInfoElem.hidden = false;
    }
    if (parseInt(phyDefElem.textContent) !== 0) {
        phyDefInfoElem.hidden = false;
    }

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('nakamaki-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('nakamaki-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('nakamaki-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('nakamaki-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('nakamaki-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('nakamaki-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('nakamaki-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = nakamakiImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('nakamaki-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = nakamakiImgPath
        gifImg.hidden = true;
    }, 1000);
}



nakamakiPriceInput.oninput = () => {
    recalculateNakamakiTotalPrice()
}

nakamakiTenInput.oninput = () => {
    recalculateNakamakiTotalPrice();
}

nakamakiSixtyInput.oninput = () => {
    recalculateNakamakiTotalPrice();
}

nakamakiHundredInput.oninput = () => {
    recalculateNakamakiTotalPrice();
}

function recalculateNakamakiTotalPrice() {
    let nakamakiPriceInputElem = document.getElementById('nakamaki-price');
    let tenInputElem = document.getElementById('nakamaki-10-price');
    let sixtyInputElem = document.getElementById('nakamaki-60-price');
    let hundredInputElem = document.getElementById('nakamaki-100-price');
    let usedPriceElem = document.getElementById('nakamaki-total-used-price');

    let price = parseInt(nakamakiPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * nakamakiCnt +
        (
            tenInput * nakamakiTenTrial +
            sixtyInput * nakamakiSixtyTrial +
            hundredInput *
            nakamakiHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
nakamakiPriceResetBtn.addEventListener('click', function () {
    resetNakamakiPrice()
});

function resetNakamakiPrice() {
    let tenSuccessCnt = document.getElementById('nakamaki-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('nakamaki-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('nakamaki-100-success-cnt');
    let tenUsedCnt = document.getElementById('nakamaki-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('nakamaki-60-used-cnt');
    let hundredUsedCnt = document.getElementById('nakamaki-100-used-cnt');
    let itemCnt = document.getElementById('nakamaki-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    nakamakiTenTrial = 0;
    nakamakiSixtyTrial = 0;
    nakamakiHundredTrial = 0;
    nakamakiCnt = 1;

    recalculateNakamakiTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addNakamakiBuyCnt() {
    let buyCnt = document.getElementById('nakamaki-cnt');
    nakamakiCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = nakamakiCnt.toString();
    recalculateNakamakiTotalPrice();
}