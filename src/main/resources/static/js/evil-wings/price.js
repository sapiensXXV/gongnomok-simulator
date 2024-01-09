/**
 * 주문서 버튼
 */
let evilWingsTenPercentBtn = document.getElementById('evil-wings-10-percent-button');
let evilWingsSixtyPercentBtn = document.getElementById('evil-wings-60-percent-button');
let evilWingsHundredPercentBtn = document.getElementById('evil-wings-100-percent-button');
let evilWingsResetBtn = document.getElementById('evil-wings-price-reset-btn');

/**
 * 주문서 시도 횟수
 */
let evilWingsTenTrial = 0;
let evilWingsSixtyTrial = 0;
let evilWingsHundredTrial = 0;

/**
 * 주문서 버튼 클릭 로직
 * 주문서 시도횟수가 증가한다.
 */
evilWingsTenPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    evilWingsTenTrial++;
    recalculateEvilWingsTotalPrice();
});

evilWingsSixtyPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    evilWingsSixtyTrial++;
    recalculateEvilWingsTotalPrice();
});

evilWingsHundredPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    evilWingsHundredTrial++;
    recalculateEvilWingsTotalPrice();
});

/**
 * 사용가격 리셋
 */
evilWingsResetBtn.addEventListener('click', function () {
    evilWingsTenTrial = 0;
    evilWingsSixtyTrial = 0;
    evilWingsHundredTrial = 0;
    recalculateEvilWingsTotalPrice();
});

function recalculateEvilWingsTotalPrice() {
    let tenInputElem = document.getElementById('evil-wings-10-price');
    let sixtyInputElem = document.getElementById('evil-wings-60-price');
    let hundredInputElem = document.getElementById('evil-wings-100-price');
    let usedPriceElem = document.getElementById('evil-wings-total-used-price');

    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        tenInput * evilWingsTenTrial +
        sixtyInput * evilWingsSixtyTrial +
        hundredInput * evilWingsHundredTrial
    ).toLocaleString();
}

function checkCanProceed() {
    let availableCount = document.getElementById('evil-wings-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    return count > 0;

}