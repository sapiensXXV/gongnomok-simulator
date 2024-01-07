import { getRandomResult } from "../util.js";
import { changeColor } from "../util.js";
import { playFailSound } from "../util.js";
import { playSuccessSound } from "../util.js";

// import * from '../util.js'

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
    reset();
    darkAvariceAtk.textContent = defaultPhysicAtk.toString()
});

oneUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    reset();
    darkAvariceAtk.textContent = (defaultPhysicAtk + 1).toString()
});

twoUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    reset();
    darkAvariceAtk.textContent = (defaultPhysicAtk + 2).toString()
});

threeUpperOptionBtn.addEventListener('click', function() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    let darkAvariceLuk = document.getElementById('dark-avarice-luk');
    reset();
    darkAvariceAtk.textContent = (defaultPhysicAtk + 3).toString();
    darkAvariceLuk.textContent = (defaultLuk + 1).toString();
});

/**
 * 주문서 버튼 이벤트 리스너
 */
tenPerBtn.addEventListener('click', function() {
    // 10퍼센트 주문서 성공시 효과
    // 물리공격력+5
    // 명중률+3
    // LUK+1
    let result = getRandomResult(10);

    if (result) {
        success(5, 3, 1);
    } else {
        fail()
    }
})

sixtyPerBtn.addEventListener('click', function() {

});

hundredPerBtn.addEventListener('click', function () {

});

resetBtn.addEventListener('click', function () {

});

/**
 * 공용 함수
 */
function reset() {
    let darkAvariceAtk = document.getElementById('dark-avarice-phy-atk');
    let darkAvariceDef = document.getElementById('dark-avarice-def');
    let darkAvariceLuk = document.getElementById('dark-avarice-luk');
    let darkAvariceAvailableCount = document.getElementById('dark-avarice-upgrade-available-count');
    let darkAvariceAcc = document.getElementById('dark-avarice-acc');

    darkAvariceAtk.textContent = defaultPhysicAtk.toString()
    darkAvariceDef.textContent = defaultPhysicDef.toString()
    darkAvariceLuk.textContent = defaultLuk.toString()
    darkAvariceAvailableCount.textContent = defaultAvailableCount.toString()
    darkAvariceAcc.textContent = defaultAcc.toString()
    darkAvariceAcc.hidden = true; // 숨김. 주문서를 바르기 전에는 없는 옵션
}

function success(pyAtk, acc, luk) {
    let upgradedCountElem = document.getElementById('dark-avarice-upgraded-count');
    let pyAtkElem = document.getElementById('dark-avarice-phy-atk');
    let accElem = document.getElementById('dark-avarice-acc');
    let lukElem = document.getElementById('dark-avarice-luk');

    pyAtkElem.textContent = (parseInt(pyAtkElem.textContent) + pyAtk).toString();
    accElem.textContent = (parseInt(accElem.textContent) + acc).toString();
    lukElem.textContent = (parseInt(lukElem.textContent) + luk).toString();

    upgradedCountElem.textContent = (parseInt(upgradedCountElem.textContent) + 1).toString();
    changeColor(upgradedCountElem, parseInt(upgradedCountElem.textContent) + 1);

    if (parseInt(accElem) != 0) {
        accElem.hidden = false;
    }
    //sound
    playSuccessSound();
}

function fail() {
    playFailSound()
}

