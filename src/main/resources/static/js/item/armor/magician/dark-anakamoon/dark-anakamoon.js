import * as util from "../../../../global/util.js";

// 속성 값들
let darkAnakamoonImgPath = '../img/item/armor/dark-anakamoon.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let defaultInt = 5;
let defaultLuk = 1;
let defaultPhyDef = 52;
let defaultMgDef = 26;
let defaultMp = 25;
let defaultAvailableCount = 10;

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('dark-anakamoon-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('dark-anakamoon-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('dark-anakamoon-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('dark-anakamoon-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('dark-anakamoon-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('dark-anakamoon-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('dark-anakamoon-10-percent-button');
let sixtyPerBtn = document.getElementById('dark-anakamoon-60-percent-button');
let hundredPerBtn = document.getElementById('dark-anakamoon-100-percent-button');
let resetBtn = document.getElementById('dark-anakamoon-reset-button');

// 아이템 구매 횟수
let darkAnakamoonCnt = 1;

// 주문서 시도 횟수
let darkAnakamoonTenTrial = 0;
let darkAnakamoonSixtyTrial = 0;
let darkAnakamoonHundredTrial = 0;

// 가격 관련 input, button
let darkAnakamoonPriceInput = document.getElementById('dark-anakamoon-price'); // 아이템 가격
let darkAnakamoonTenInput = document.getElementById('dark-anakamoon-10-price'); // 10퍼센트 가격
let darkAnakamoonSixtyInput = document.getElementById('dark-anakamoon-60-price'); // 60퍼센트 가격
let darkAnakamoonHundredInput = document.getElementById('dark-anakamoon-100-price'); // 100퍼센트 가격
let darkAnakamoonPriceResetBtn = document.getElementById('dark-anakamoon-price-reset-btn') // 리셋 버튼

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
        resetDarkAnakamoonPrice();
        darkAnakamoonPriceResetBtn.focus();
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
        darkAnakamoonPriceResetBtn.blur();
    }
});

tenPerBtn.addEventListener('mouseup', tenPerBtnMouseUp);
sixtyPerBtn.addEventListener('mouseup', sixtyPerBtnMouseUp);
hundredPerBtn.addEventListener('mouseup', hundredPerBtnMouseUp);
resetBtn.addEventListener('mouseup', resetBtnMouseUp);
darkAnakamoonPriceResetBtn.addEventListener('mouseup', workGlovePriceResetBtnMouseUp);

function tenPerBtnMouseUp() { tenPerBtn.blur() }
function sixtyPerBtnMouseUp() { sixtyPerBtn.blur() }
function hundredPerBtnMouseUp() { hundredPerBtn.blur() }
function resetBtnMouseUp() { resetBtn.blur() }
function workGlovePriceResetBtnMouseUp() { darkAnakamoonPriceResetBtn.blur() }

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

    let usedCnt = document.getElementById('dark-anakamoon-10-used-cnt');
    darkAnakamoonTenTrial++;
    usedCnt.textContent = darkAnakamoonTenTrial.toString();
    recalculateDarkAnakamoonTotalPrice();
}

function sixtyPerBtnClicked() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('dark-anakamoon-60-used-cnt');
    darkAnakamoonSixtyTrial++;
    usedCnt.textContent = darkAnakamoonSixtyTrial.toString();
    recalculateDarkAnakamoonTotalPrice();
}

function hundredPerBtnClicked() {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('dark-anakamoon-100-used-cnt');
    darkAnakamoonHundredTrial++;
    usedCnt.textContent = darkAnakamoonHundredTrial.toString();
    recalculateDarkAnakamoonTotalPrice();
}

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-anakamoon-int');
    let luk = document.getElementById('dark-anakamoon-luk');
    let phyDef = document.getElementById('dark-anakamoon-phy-def');
    let mgDef = document.getElementById('dark-anakamoon-mg-def');
    let mp = document.getElementById('dark-anakamoon-mpdark-anakamoon-mp');

    defaultInt = 5;
    defaultLuk = 1;
    defaultPhyDef = 52;
    defaultMgDef = 26
    defaultMp = 25

    resetItem(false);

    int.textContent = defaultInt.toString();
    luk.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
    mp.textContent = defaultMp.toString();
});

oneUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-anakamoon-int');
    let luk = document.getElementById('dark-anakamoon-luk');
    let phyDef = document.getElementById('dark-anakamoon-phy-def');
    let mgDef = document.getElementById('dark-anakamoon-mg-def');
    let mp = document.getElementById('dark-anakamoon-mp');

    defaultInt = 5;
    defaultLuk = 1;
    defaultPhyDef = 53;
    defaultMgDef = 26
    defaultMp = 25

    resetItem(false);

    int.textContent = defaultInt.toString();
    luk.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
    mp.textContent = defaultMp.toString();
});

twoUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-anakamoon-int');
    let luk = document.getElementById('dark-anakamoon-luk');
    let phyDef = document.getElementById('dark-anakamoon-phy-def');
    let mgDef = document.getElementById('dark-anakamoon-mg-def');
    let mp = document.getElementById('dark-anakamoon-mp');

    defaultInt = 5;
    defaultLuk = 1;
    defaultPhyDef = 54;
    defaultMgDef = 27;
    defaultMp = 26;

    resetItem(false);

    int.textContent = defaultInt.toString();
    luk.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
    mp.textContent = defaultMp.toString();
});

threeUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-anakamoon-int');
    let luk = document.getElementById('dark-anakamoon-luk');
    let phyDef = document.getElementById('dark-anakamoon-phy-def');
    let mgDef = document.getElementById('dark-anakamoon-mg-def');
    let mp = document.getElementById('dark-anakamoon-mp');

    defaultInt = 5;
    defaultLuk = 2;
    defaultPhyDef = 55;
    defaultMgDef = 27;
    defaultMp = 26;

    resetItem(false);

    int.textContent = defaultInt.toString();
    luk.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
    mp.textContent = defaultMp.toString();
});

fourUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-anakamoon-int');
    let luk = document.getElementById('dark-anakamoon-luk');
    let phyDef = document.getElementById('dark-anakamoon-phy-def');
    let mgDef = document.getElementById('dark-anakamoon-mg-def');
    let mp = document.getElementById('dark-anakamoon-mp');

    defaultInt = 6;
    defaultLuk = 2;
    defaultPhyDef = 56;
    defaultMgDef = 28;
    defaultMp = 27;

    resetItem(false);

    int.textContent = defaultInt.toString();
    luk.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
    mp.textContent = defaultMp.toString();
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let int = document.getElementById('dark-anakamoon-int');
    let luk = document.getElementById('dark-anakamoon-luk');
    let phyDef = document.getElementById('dark-anakamoon-phy-def');
    let mgDef = document.getElementById('dark-anakamoon-mg-def');
    let mp = document.getElementById('dark-anakamoon-mp');

    defaultInt = 6;
    defaultLuk = 2;
    defaultPhyDef = 57;
    defaultMgDef = 29;
    defaultMp = 28;

    resetItem(false);

    int.textContent = defaultInt.toString();
    luk.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
    mp.textContent = defaultMp.toString();
});


/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let intV = document.getElementById('dark-anakamoon-int'); // INT
    let lukV = document.getElementById('dark-anakamoon-luk'); // LUK
    let phyDef = document.getElementById('dark-anakamoon-phy-def'); // 물리 방어력
    let mgDef = document.getElementById('dark-anakamoon-mg-def'); // 마법 방어력
    let mpV = document.getElementById('dark-anakamoon-mp') // MaxMP

    let availableCnt = document.getElementById('dark-anakamoon-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('dark-anakamoon-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('dark-anakamoon-additional');

    intV.textContent = defaultInt.toString();
    lukV.textContent = defaultLuk.toString();
    phyDef.textContent = defaultPhyDef.toString();
    mgDef.textContent = defaultMgDef.toString();
    mpV.textContent = defaultMp.toString();

    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true

    if (isNew) {
        addDarkAnakamoonBuyCnt()
    }

    let title = document.getElementById('dark-anakamoon-title');
    let alertTxt = document.getElementById('dark-anakamoon-available-alert-txt');
    util.changeColor(title, parseInt(intV.textContent) - defaultInt);
    alertTxt.hidden = true;
}

function success(int, mgDef, mp, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('dark-anakamoon-upgraded-count');
    let additionalElem = document.getElementById('dark-anakamoon-additional');
    let title = document.getElementById('dark-anakamoon-title');
    let availableCount = document.getElementById('dark-anakamoon-upgrade-available-count');

    let intElem = document.getElementById('dark-anakamoon-int');
    let mgDefElem = document.getElementById('dark-anakamoon-mg-def');
    let mpElem = document.getElementById('dark-anakamoon-mp');

    intElem.textContent = (parseInt(intElem.textContent) + int).toString();
    mgDefElem.textContent = (parseInt(mgDefElem.textContent) + mgDef).toString();
    mpElem.textContent = (parseInt(mpElem.textContent) + mp).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(intElem.textContent) - defaultInt)
    additionalElem.hidden = false;

    //sound
    util.playSuccessSound(); // 강화성공 소리 재생
    reduceAvailableCount(availableCount); // 강화 가능횟수 감소
    addSuccessCnt(percent)

    playSuccessEffect()
}

function addSuccessCnt(percent) {
    if (percent === 10) {
        let successCnt = document.getElementById('dark-anakamoon-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('dark-anakamoon-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('dark-anakamoon-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('dark-anakamoon-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('dark-anakamoon-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('dark-anakamoon-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('dark-anakamoon-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = darkAnakamoonImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('dark-anakamoon-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = darkAnakamoonImgPath
        gifImg.hidden = true;
    }, 1000);
}



darkAnakamoonPriceInput.oninput = () => {
    recalculateDarkAnakamoonTotalPrice()
}

darkAnakamoonTenInput.oninput = () => {
    recalculateDarkAnakamoonTotalPrice();
}

darkAnakamoonSixtyInput.oninput = () => {
    recalculateDarkAnakamoonTotalPrice();
}

darkAnakamoonHundredInput.oninput = () => {
    recalculateDarkAnakamoonTotalPrice();
}

function recalculateDarkAnakamoonTotalPrice() {
    let darkAnakamoonPriceInputElem = document.getElementById('dark-anakamoon-price');
    let tenInputElem = document.getElementById('dark-anakamoon-10-price');
    let sixtyInputElem = document.getElementById('dark-anakamoon-60-price');
    let hundredInputElem = document.getElementById('dark-anakamoon-100-price');
    let usedPriceElem = document.getElementById('dark-anakamoon-total-used-price');

    let price = parseInt(darkAnakamoonPriceInputElem.value);
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * darkAnakamoonCnt +
        (
            tenInput * darkAnakamoonTenTrial +
            sixtyInput * darkAnakamoonSixtyTrial +
            hundredInput *
            darkAnakamoonHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
darkAnakamoonPriceResetBtn.addEventListener('click', function () {
    resetDarkAnakamoonPrice()
});

function resetDarkAnakamoonPrice() {
    let tenSuccessCnt = document.getElementById('dark-anakamoon-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('dark-anakamoon-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('dark-anakamoon-100-success-cnt');
    let tenUsedCnt = document.getElementById('dark-anakamoon-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('dark-anakamoon-60-used-cnt');
    let hundredUsedCnt = document.getElementById('dark-anakamoon-100-used-cnt');
    let itemCnt = document.getElementById('dark-anakamoon-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    darkAnakamoonTenTrial = 0;
    darkAnakamoonSixtyTrial = 0;
    darkAnakamoonHundredTrial = 0;
    darkAnakamoonCnt = 1;

    recalculateDarkAnakamoonTotalPrice();
}

/**
 * 구매 이블윙즈 개수 증가
 */
function addDarkAnakamoonBuyCnt() {
    let buyCnt = document.getElementById('dark-anakamoon-cnt');
    darkAnakamoonCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = darkAnakamoonCnt.toString();
    recalculateDarkAnakamoonTotalPrice();
}