export function getRandomResult(percentage) {
    const count = percentage / 10;
    let result = Math.floor(Math.random() * 10 + 1);
    if (result >= 1 && result <= count) return true;
    else return false;
}

export function reduceCount(object) {
    object.textContent = (parseInt(object.textContent) - 1).toString()
}

export function changeColor(object, value) {
    if (value <= 0){
        object.style.color = "#ffffff"
    } else if (value >= 1 && value <= 5) {
        object.style.color = "#E7A700"
    } else if (value >= 6 && value <= 22) {
        object.style.color = "#789CD5"
    } else if (value >= 23 && value <= 39) {
        object.style.color = "#A201DA"
    } else if (value >= 40) {
        object.style.color = "yellow"
    }
}

export function playFailureSound() {
    let failMp3 = new Audio('../sound/scroll/fail.mp3');
    failMp3.volume = 0.15
    failMp3.currentTime = 0;
    failMp3.play();
}

export function playSuccessSound() {
    let successMp3 = new Audio('../sound/scroll/success.mp3');
    successMp3.volume = 0.15
    successMp3.currentTime = 0;
    successMp3.play();
}

