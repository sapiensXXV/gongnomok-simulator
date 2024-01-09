/**
 * 주문서 버튼
 */
let workGloveTenPercentBtn = document.getElementById('work-glove-10-percent-button');
let workGloveSixtyPercentBtn = document.getElementById('work-glove-60-percent-button');
let workGloveHundredPercentBtn = document.getElementById('work-glove-100-percent-button');
let workGlovePriceResetBtn = document.getElementById('work-glove-price-reset-btn');

/**
 * 주문서 시도 횟수
 */
let workGloveTenTrial = 0;
let workGloveSixtyTrial = 0;
let workGloveHundredTrial = 0;

/**
 * 주문서 버튼 클릭 로직
 * 주문서 시도횟수가 증가한다.
 */
workGloveTenPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    workGloveTenTrial++;
    recalculateWorkGloveTotalPrice();
});

workGloveSixtyPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    workGloveSixtyTrial++;
    recalculateWorkGloveTotalPrice();
});

workGloveHundredPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    workGloveHundredTrial++;
    recalculateWorkGloveTotalPrice();
});

/**
 * 사용가격 리셋
 */
workGlovePriceResetBtn.addEventListener('click', function () {
    workGloveTenTrial = 0;
    workGloveSixtyTrial = 0;
    workGloveHundredTrial = 0;
    recalculateWorkGloveTotalPrice();
});

function recalculateWorkGloveTotalPrice() {
    let tenInputElem = document.getElementById('work-glove-10-price');
    let sixtyInputElem = document.getElementById('work-glove-60-price');
    let hundredInputElem = document.getElementById('work-glove-100-price');
    let usedPriceElem = document.getElementById('work-glove-total-used-price');

    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        tenInput * workGloveTenTrial +
        sixtyInput * workGloveSixtyTrial +
        hundredInput * workGloveHundredTrial
    ).toLocaleString();
}

function checkCanProceed() {
    let availableCount = document.getElementById('work-glove-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    return count > 0;

}