let guideImgBtn = document.getElementById('guide-img-btn');
console.log(guideImgBtn);
guideImgBtn.addEventListener('click', function () {
    console.log('button clicked!!')
    let guideImg = document.getElementById('header-guide-img');
    if (guideImg.style.display === 'none') {
        guideImgBtn.textContent = "가이드 닫기 💡"
        guideImg.style.display = 'inline'
    }
    else if (guideImg.style.display === 'inline') {
        guideImgBtn.textContent = "가이드 펼치기 4💡"
        guideImg.style.display = 'none';
    }
});