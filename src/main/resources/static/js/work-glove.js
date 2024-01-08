import { getRandomResult } from "./util.js";
import { reduceCount } from "./util.js";
import { changeColor } from "./util.js";

// import "./util.js";

const tenPercentButton =  document.getElementById('work-glove-10-percent-button')
const sixtyPercentButton =  document.getElementById('work-glove-60-percent-button')
const hundredPercentButton =  document.getElementById('work-glove-100-percent-button')
const resetButton = document.getElementById('work-glove-reset-button')
const workGloveTitle = document.getElementById('work-glove-title')

let upgradedCountObject = document.getElementById('work-glove-upgraded-count');
let titleAdditionalObject = document.getElementById('work-glove-additional');

//audio
let successSound = new Audio('../sound/scroll/success.mp3')
let failSound = new Audio('../sound/scroll/fail.mp3')

/**
 * 1. 업그레이드 가능 횟수가 남아있는지 확인한다.
 * 2. 각 퍼센티지마다 true, false를 반환하는 메서드를 사용한다.
 * 3. 성공시 음성파일 재생 후 늘어난 공격력을 HTML에 반영한다. (텍스트 변경)
 * 4. 실패하면 음성 파일만 재생한다.
 * 5. 업그레이드 가능횟수를 줄인다.
 */
tenPercentButton.addEventListener('click', function () {
    let glovePowerObject = document.getElementById('work-glove-power')
    let glovePowerTextObject = document.getElementById('work-glove-power-text')
    let availableCountObject = document.getElementById('work-glove-upgrade-available-count')
    let glovePower = parseInt(glovePowerObject.innerHTML)
    let availableCount = parseInt(availableCountObject.innerHTML)
    let upgradedCount = parseInt(upgradedCountObject.innerHTML);

    if (availableCount <= 0) return

    let result = getRandomResult(10);
    console.log('강화성공=[' + result + ']')

    // 강화 성공시 공격력 증가
    if (result) {
        glovePowerObject.innerHTML = (glovePower + 3).toString()
        success(glovePowerTextObject, upgradedCount, glovePower + 3);
    } else {
        fail()
    }

    reduceCount(availableCountObject)
});


sixtyPercentButton.addEventListener('click', function () {
    let glovePowerObject = document.getElementById('work-glove-power')
    let glovePowerTextObject = document.getElementById('work-glove-power-text')
    let availableCountObject = document.getElementById('work-glove-upgrade-available-count')
    let glovePower = parseInt(glovePowerObject.innerHTML)
    let availableCount = parseInt(availableCountObject.innerHTML)
    let upgradedCount = parseInt(upgradedCountObject.innerHTML);

    if (availableCount <= 0) return

    let result = getRandomResult(60);
    console.log('강화성공=[' + result + ']')

    // 강화 성공시 공격력 증가
    if (result) {
        glovePowerObject.innerHTML = (glovePower + 2).toString()
        success(glovePowerTextObject, upgradedCount, glovePower + 2);
    } else {
        fail();
    }

    reduceCount(availableCountObject)
});

hundredPercentButton.addEventListener('click', function () {
    let glovePowerObject = document.getElementById('work-glove-power')
    let glovePowerTextObject = document.getElementById('work-glove-power-text')
    let availableCountObject = document.getElementById('work-glove-upgrade-available-count')
    let glovePower = parseInt(glovePowerObject.innerHTML)
    let availableCount = parseInt(availableCountObject.innerHTML)
    let upgradedCount = parseInt(upgradedCountObject.innerHTML);

    if (availableCount <= 0) {
        alert('강화 횟수를 초과하였습니다')
        return
    }

    // 100 퍼센트는 무조건 성공
    glovePowerObject.innerHTML = (glovePower + 1).toString()
    success(glovePowerTextObject, upgradedCount, glovePower + 1);
    reduceCount(availableCountObject)
});

resetButton.addEventListener('click', function () {
    resetItem();
});

function success(glovePowerTextObject, upgradedCount, newGlovePower) {
    glovePowerTextObject.hidden = false
    titleAdditionalObject.hidden = false

    upgradedCountObject.innerHTML = (upgradedCount + 1).toString();
    changeColor(workGloveTitle, newGlovePower)

    successSound.currentTime = 0
    successSound.play()
}

function fail() {
    failSound.currentTime = 0
    failSound.play()
}

function resetItem() {
    let glovePowerObject = document.getElementById('work-glove-power')
    let glovePowerTextObject = document.getElementById('work-glove-power-text')
    let availableCountObject = document.getElementById('work-glove-upgrade-available-count')

    // changeColor(workGloveTitle, 0)
    workGloveTitle.style.color = "white"
    glovePowerObject.innerHTML = '0'
    glovePowerTextObject.hidden = true
    availableCountObject.innerHTML = '5'
    upgradedCountObject.innerHTML = '0'
    titleAdditionalObject.hidden = true
}

