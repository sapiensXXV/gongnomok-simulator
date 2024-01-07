export function getRandomResult(percentage) {
    const count = percentage / 10;
    let result = Math.floor(Math.random() * 10 + 1);
    if (result >= 1 && result <= count) return true;
    else return false;
}

export function reduceCount(object) {
    object.innerHTML = (parseInt(object.innerHTML) - 1).toString()
}

// const reduceCount = function(countObject) {
//     countObject.innerHTML = (parseInt(countObject.innerHTML) - 1).toString()
// }

export function changeColor(object, value) {
    if (value <= 0){
        object.style.color = "#ffffff"
    } else if (value >= 1 && value <= 5) {
        object.style.color = "#E7A700"
    } else if (value >= 6 && value <= 22) {
        object.style.color = "#789CD5"
    } else if (value >= 23 && value <= 39) {
        object.style.color = "purple"
    } else if (value >= 40) {
        object.style.color = "yellow"
    }
}