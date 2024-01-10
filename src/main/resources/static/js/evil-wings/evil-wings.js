import * as util from "../util.js";

// 속성 값들
let defaultAtkSpeed = 4;
let defaultPhyAtk = 53;
let defaultMgAtk = 80;
let defaultAvailableCount = 7;
let defaultAcc = 0;

let evilWingsImgPath = '../img/weapon/evil-wings.png';
let successGifPath = '../gif/success.gif';
let failureGifPath = '../gif/failure.gif';

let timer = null;

// 옵션 버튼
let normalOptionBtn = document.getElementById('evil-wings-normal-option-btn');
let oneUpperOptionBtn = document.getElementById('evil-wings-one-upper-option-btn');
let twoUpperOptionBtn = document.getElementById('evil-wings-two-upper-option-btn');
let threeUpperOptionBtn = document.getElementById('evil-wings-three-upper-option-btn');
let fourUpperOptionBtn = document.getElementById('evil-wings-four-upper-option-btn');
let fiveUpperOptionBtn = document.getElementById('evil-wings-five-upper-option-btn');

// 주문서 버튼
let tenPerBtn = document.getElementById('evil-wings-10-percent-button');
let sixtyPerBtn = document.getElementById('evil-wings-60-percent-button');
let hundredPerBtn = document.getElementById('evil-wings-100-percent-button');
let resetBtn = document.getElementById('evil-wings-reset-button');

// 아이템 구매 횟수
let evilWingsCnt = 1;

// 주문서 시도 횟수
let evilWingsTenTrial = 0;
let evilWingsSixtyTrial = 0;
let evilWingsHundredTrial = 0;

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 80;
    defaultPhyAtk = 53
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 81;
    defaultPhyAtk = 54;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 82;
    defaultPhyAtk = 55;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 83;
    defaultPhyAtk = 56;
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 84;
    defaultPhyAtk = 57
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 85;
    defaultPhyAtk = 58
    resetItem(false);
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 주문서 버튼 이벤트 리스너
 */
tenPerBtn.addEventListener('click', function() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(10)) {
        success(5, 3, 1, 10);
    } else {
        fail()
    }

    let usedCnt = document.getElementById('evil-wings-10-used-cnt');
    evilWingsTenTrial++;
    usedCnt.textContent = evilWingsTenTrial.toString();
    recalculateEvilWingsTotalPrice();
})

sixtyPerBtn.addEventListener('click', function() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0, 60);
    } else {
        fail();
    }

    let usedCnt = document.getElementById('evil-wings-60-used-cnt');
    evilWingsSixtyTrial++;
    usedCnt.textContent = evilWingsSixtyTrial.toString();
    recalculateEvilWingsTotalPrice();
});

hundredPerBtn.addEventListener('click', function () {
    if (!checkAvailableCount()) return
    success(1, 0, 0, 100);

    let usedCnt = document.getElementById('evil-wings-100-used-cnt');
    evilWingsHundredTrial++;
    usedCnt.textContent = evilWingsHundredTrial.toString();
    recalculateEvilWingsTotalPrice();
});

resetBtn.addEventListener('click', function () {
    resetItem(true);
});

/**
 * 공용 함수
 */
export function resetItem(isNew) {
    let phyAtk = document.getElementById('evil-wings-phy-atk'); // 물리공격력
    let mgAtk = document.getElementById('evil-wings-mg-atk'); // 마법공격력
    let intV = document.getElementById('evil-wings-int'); // INT
    let intInfo = document.getElementById('evil-wings-int-info'); // int 정보 텍스트
    let availableCnt = document.getElementById('evil-wings-upgrade-available-count'); // 강화 가능 횟수
    let upgradeSuccessCnt = document.getElementById('evil-wings-upgraded-count'); // 강화 성공 횟수
    let additionalTitle = document.getElementById('evil-wings-additional');

    phyAtk.textContent = defaultPhyAtk.toString();
    mgAtk.textContent = defaultMgAtk.toString();
    intV.textContent = '0'
    intInfo.hidden = true
    availableCnt.textContent = defaultAvailableCount.toString()
    upgradeSuccessCnt.textContent = '0';
    additionalTitle.hidden = true
    if (isNew) {
        addBuyCnt()
    }

    let title = document.getElementById('evil-wings-title');
    let alertTxt = document.getElementById('evil-wings-available-alert-txt');
    util.changeColor(title, parseInt(mgAtk.textContent) - defaultMgAtk);
    alertTxt.hidden = true;

}

function success(mgAtk, intV, mgDef, percent) {
    console.log(' scroll success');

    let upgradedCountElem = document.getElementById('evil-wings-upgraded-count');
    let additionalElem = document.getElementById('evil-wings-additional');
    let title = document.getElementById('evil-wings-title');
    let availableCount = document.getElementById('evil-wings-upgrade-available-count');
    let mgAtkElem = document.getElementById('evil-wings-mg-atk');
    let intElem = document.getElementById('evil-wings-int');
    let mgDefElem = document.getElementById('evil-wings-mg-def');

    let intInfoElem = document.getElementById('evil-wings-int-info');

    mgAtkElem.textContent = (parseInt(mgAtkElem.textContent) + mgAtk).toString();
    intElem.textContent = (parseInt(intElem.textContent) + intV).toString();
    mgDefElem.textContent = (parseInt(mgDefElem.textContent) + mgDef).toString();


    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    util.changeColor(title, parseInt(mgAtkElem.textContent) - defaultMgAtk)
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
        let successCnt = document.getElementById('evil-wings-10-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 60) {
        let successCnt = document.getElementById('evil-wings-60-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    } else if (percent === 100) {
        let successCnt = document.getElementById('evil-wings-100-success-cnt');
        successCnt.textContent = (parseInt(successCnt.textContent) + 1).toString();
    }
}


function fail() {
    console.log('scroll fail')

    let availableCount = document.getElementById('evil-wings-upgrade-available-count');
    reduceAvailableCount(availableCount);
    util.playFailureSound()
    playFailEffect()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('evil-wings-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    let alertTxt = document.getElementById('evil-wings-available-alert-txt');
    if (count <= 0) {
        alertTxt.hidden = false;
        return false;
    }
    return true;
}

function playSuccessEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('evil-wings-gif-img');
    gifImg.hidden = false;
    gifImg.src = successGifPath;
    timer = setTimeout(function () {
        gifImg.src = evilWingsImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('evil-wings-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = evilWingsImgPath
        gifImg.hidden = true;
    }, 1000);
}

let evilWingsPriceInput = document.getElementById('evil-wings-price');
let evilWingsTenInput = document.getElementById('evil-wings-10-price'); // 10퍼센트 가격
let evilWingsSixtyInput = document.getElementById('evil-wings-60-price'); // 60퍼센트 가격
let evilWingsHundredInput = document.getElementById('evil-wings-100-price'); // 100퍼센트 가격
let evilWingsPriceResetBtn = document.getElementById('evil-wings-price-reset-btn') // 리셋 버튼

evilWingsPriceInput.oninput = () => {
    recalculateEvilWingsTotalPrice()
}

evilWingsTenInput.oninput = () => {
    recalculateEvilWingsTotalPrice();
}

evilWingsSixtyInput.oninput = () => {
    recalculateEvilWingsTotalPrice();
}

evilWingsHundredInput.oninput = () => {
    recalculateEvilWingsTotalPrice();
}

function recalculateEvilWingsTotalPrice() {
    let evilWingsPriceInputElem = document.getElementById('evil-wings-price');
    let tenInputElem = document.getElementById('evil-wings-10-price');
    let sixtyInputElem = document.getElementById('evil-wings-60-price');
    let hundredInputElem = document.getElementById('evil-wings-100-price');
    let usedPriceElem = document.getElementById('evil-wings-total-used-price');

    let price = parseInt(evilWingsPriceInputElem.value)
    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        price * evilWingsCnt +
        (
            tenInput * evilWingsTenTrial +
            sixtyInput * evilWingsSixtyTrial +
            hundredInput *
            evilWingsHundredTrial
        )
    ).toLocaleString();
}

/**
 * 가격 리셋 로직
 */
evilWingsPriceResetBtn.addEventListener('click', function () {
    resetEvilWingsPrice()
});

function resetEvilWingsPrice() {
    let tenSuccessCnt = document.getElementById('evil-wings-10-success-cnt');
    let sixtySuccessCnt = document.getElementById('evil-wings-60-success-cnt');
    let hundredSuccessCnt = document.getElementById('evil-wings-100-success-cnt');
    let tenUsedCnt = document.getElementById('evil-wings-10-used-cnt');
    let sixtyUsedCnt = document.getElementById('evil-wings-60-used-cnt');
    let hundredUsedCnt = document.getElementById('evil-wings-100-used-cnt');
    let itemCnt = document.getElementById('evil-wings-cnt');

    tenSuccessCnt.textContent = '0';
    sixtySuccessCnt.textContent = '0';
    hundredSuccessCnt.textContent = '0';
    tenUsedCnt.textContent = '0';
    sixtyUsedCnt.textContent = '0';
    hundredUsedCnt.textContent = '0';
    itemCnt.textContent = '1';

    evilWingsTenTrial = 0;
    evilWingsSixtyTrial = 0;
    evilWingsHundredTrial = 0;
    evilWingsCnt = 1;

    recalculateEvilWingsTotalPrice();
}

/**
 * 아이템 갯수 증가 로직
 */

function addBuyCnt() {
    let buyCnt = document.getElementById('evil-wings-cnt');
    evilWingsCnt++; // 아이템 소모 갯수를 증가시킨다
    buyCnt.textContent = evilWingsCnt.toString();
    recalculateEvilWingsTotalPrice();
}