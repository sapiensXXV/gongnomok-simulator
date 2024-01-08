let staticImg = "../img/weapon/work-glove.png";
let gifImg = "../gif/failure-150.gif";
let tmpBtn = document.getElementById('tmp-button');

tmpBtn.addEventListener('click', function () {
    console.log('event!')
    const image = document.getElementById('tmp-img');
    let gloveImg = document.getElementById('tmp-work-glove-img');
    image.hidden = false;

    image.src = gifImg
    setTimeout(function () {
        // image.src = staticImg;
        // image.style.width = (gloveImg.clientWidth).toString()
        // image.style.height = (gloveImg.clientHeight).toString()
        image.src = staticImg
        image.hidden = true;
    }, 350);

});