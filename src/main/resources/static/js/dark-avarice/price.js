/**
 * 주문서 버튼
 */
let darkAvariceTenPercentBtn = document.getElementById('dark-avarice-10-percent-button');
let darkAvariceSixtyPercentBtn = document.getElementById('dark-avarice-60-percent-button');
let darkAvariceHundredPercentBtn = document.getElementById('dark-avarice-100-percent-button');
let darkAvaricePriceResetBtn = document.getElementById('dark-avarice-price-reset-btn');

/**
 * 주문서 시도 횟수
 */
let darkAvariceTenTrial = 0;
let darkAvariceSixtyTrial = 0;
let darkAvariceHundredTrial = 0;

/**
 * 주문서 버튼 클릭 로직
 * 주문서 시도횟수가 증가한다.
 */
darkAvariceTenPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    darkAvariceTenTrial++;
    recalculateDarkAvariceTotalPrice();
})

darkAvariceSixtyPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    darkAvariceSixtyTrial++;
    recalculateDarkAvariceTotalPrice();
});

darkAvariceHundredPercentBtn.addEventListener('click', function () {
    if (!checkCanProceed()) return;
    darkAvariceHundredTrial++;
    recalculateDarkAvariceTotalPrice();
});

/**
 * 사용가격 리셋
 */
darkAvaricePriceResetBtn.addEventListener('click', function () {
    darkAvariceTenTrial = 0;
    darkAvariceSixtyTrial = 0;
    darkAvariceHundredTrial = 0;
    recalculateDarkAvariceTotalPrice();
});

function recalculateDarkAvariceTotalPrice() {
    let tenInputElem = document.getElementById('dark-avarice-10-price');
    let sixtyInputElem = document.getElementById('dark-avarice-60-price');
    let hundredInputElem = document.getElementById('dark-avarice-100-price');
    let usedPriceElem = document.getElementById('dark-avarice-total-used-price');

    let tenInput = parseInt(tenInputElem.value);
    let sixtyInput = parseInt(sixtyInputElem.value);
    let hundredInput = parseInt(hundredInputElem.value);

    usedPriceElem.textContent = (
        tenInput * darkAvariceTenTrial +
        sixtyInput * darkAvariceSixtyTrial +
        hundredInput * darkAvariceHundredTrial
    ).toLocaleString();
}

function checkCanProceed() {
    let availableCount = document.getElementById('dark-avarice-upgrade-available-count');
    let count = parseInt(availableCount.textContent);
    return count > 0;

}