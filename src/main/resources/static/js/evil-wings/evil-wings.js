import * as util from "../util.js";

// 속성 값들
let defaultAtkSpeed = 4;
let defaultPhyAtk = 53;
let defaultMgAtk = 80;
let defaultAvailableCount = 7;
let defaultAcc = 0;

let gloveImgPath = '../img/weapon/work-glove.png';
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

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 80;
    defaultPhyAtk = 53
    reset();
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 81;
    defaultPhyAtk = 54;
    reset();
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 82;
    defaultPhyAtk = 55;
    reset();
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 83;
    defaultPhyAtk = 56;
    reset();
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

fourUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 84;
    defaultPhyAtk = 57
    reset();
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});

fiveUpperOptionBtn.addEventListener('click', function() {
    let mgAtk = document.getElementById('evil-wings-mg-atk');
    let phyAtk = document.getElementById('evil-wings-phy-atk');
    defaultMgAtk = 85;
    defaultPhyAtk = 58
    reset();
    mgAtk.textContent = defaultMgAtk.toString()
    phyAtk.textContent = defaultPhyAtk.toString()
});


/**
 * 주문서 버튼 이벤트 리스너
 */
tenPerBtn.addEventListener('click', function() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(10)) {
        success(5, 3, 1);
    } else {
        fail()
    }
})

sixtyPerBtn.addEventListener('click', function() {
    if (!checkAvailableCount()) return
    if (util.getRandomResult(60)) {
        success(2, 1, 0);
    } else {
        fail();
    }
});

hundredPerBtn.addEventListener('click', function () {
    if (!checkAvailableCount()) return
    success(1, 0, 0);
});

resetBtn.addEventListener('click', function () {
    reset();
});

/**
 * 공용 함수
 */
function reset() {
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

    let title = document.getElementById('evil-wings-title');
    util.changeColor(title, parseInt(mgAtk.textContent) - defaultMgAtk);
}

function success(mgAtk, intV, mgDef) {
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
    playSuccessEffect()
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
    if (count <= 0) {
        alert('강화 횟수를 초과하였습니다');
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
        gifImg.src = gloveImgPath
        gifImg.hidden = true;
    }, 1000);
}

function playFailEffect() {
    clearTimeout(timer);
    let gifImg = document.getElementById('evil-wings-gif-img');
    gifImg.hidden = false;
    gifImg.src = failureGifPath;
    timer = setTimeout(function () {
        gifImg.src = gloveImgPath
        gifImg.hidden = true;
    }, 1000);
}
