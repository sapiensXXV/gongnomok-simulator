// import { getRandomResult } from "../util.js";
// import { changeColor } from "../util.js";
// import { playFailureSound } from "../util.js";
// import { playSuccessSound } from "../util.js";

import * as util from "../util.js";
import {changeColor} from "../util.js";

// 속성 값들
let defaultAtkSpeed = 4;
let defaultPhysicAtk = 22;
let defaultPhysicDef = 4;
let defaultLuk = 4;
let defaultAvailableCount = 7;
let defaultAcc = 0;

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

/**
 * 옵션 버튼 이벤트 리스너
 */
normalOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    defaultPhysicAtk = 22
    reset();
    darkAvariceAtk.textContent = defaultPhysicAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    defaultPhysicAtk = 23
    reset();
    darkAvariceAtk.textContent = (defaultPhysicAtk).toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    defaultPhysicAtk = 24
    reset();
    darkAvariceAtk.textContent = (defaultPhysicAtk).toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    let darkAvariceLuk = document.getElementById('dark-avarice-luk');
    defaultPhysicAtk = 25
    reset();
    darkAvariceAtk.textContent = (defaultPhysicAtk).toString();
    darkAvariceLuk.textContent = (defaultLuk + 1).toString();
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
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    let darkAvariceDef = document.getElementById('dark-avarice-phy-def');
    let darkAvariceLuk = document.getElementById('dark-avarice-luk');
    let darkAvariceAvailableCount = document.getElementById('dark-avarice-upgrade-available-count');
    let darkAvariceAcc = document.getElementById('dark-avarice-acc');
    let darkAvariceAccText = document.getElementById('dark-avarice-acc-text');
    let additionalElem = document.getElementById('dark-avarice-additional');
    let upgradedCount = document.getElementById('dark-avarice-upgraded-count');

    darkAvariceAtk.textContent = defaultPhysicAtk.toString()
    darkAvariceDef.textContent = defaultPhysicDef.toString()
    darkAvariceDef.textContent = defaultPhysicDef.toString()
    darkAvariceLuk.textContent = defaultLuk.toString()
    darkAvariceAvailableCount.textContent = defaultAvailableCount.toString()
    darkAvariceAcc.textContent = defaultAcc.toString()
    darkAvariceAccText.hidden = true; // 숨김. 주문서를 바르기 전에는 없는 옵션
    additionalElem.hidden = true;

    let title = document.getElementById('dark-avarice-title');
    changeColor(title, parseInt(darkAvariceAtk.textContent) - defaultPhysicAtk);
    upgradedCount.textContent = '0'
}

function success(pyAtk, acc, luk) {
    console.log('success');
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
    // util.changeColor(title, parseInt(upgradedCountElem.textContent) + 1);
    util.changeColor(title, parseInt(pyAtkElem.textContent) - defaultPhysicAtk)
    additionalElem.hidden = false;

    if (parseInt(accElem.textContent) !== 0) {
        accElemText.hidden = false;
    }
    //sound
    util.playSuccessSound();
    reduceAvailableCount(availableCount);
}


function fail() {
    let availableCount = document.getElementById('dark-avarice-upgrade-available-count');
    reduceAvailableCount(availableCount);
    console.log('fail!')
    util.playFailureSound()
}

function reduceAvailableCount(availableCount) {
    availableCount.textContent = (parseInt(availableCount.textContent) - 1).toString();
}

function checkAvailableCount() {
    let availableCount = document.getElementById('dark-avarice-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    if (count <= 0) {
        alert('강화 횟수를 초과하였습니다');
        return false;
    }
    return true;
}
