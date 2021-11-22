var maxImgIndex = 15;
var curTargetIndex;
var isGameOver = false;
var initImg = document.getElementById("initImg");
var resultImg = document.getElementById("resultImg")
function getRandom(min, max) {
    max++;
    var dec = max - min;
    return Math.floor(Math.random() * dec + min);
}

function initDictionary() {
    curTargetIndex = getRandom(0, maxImgIndex);
    var dictinaryDom = document.querySelector(".dictionary");
    dictinaryDom.innerHTML = "";
    for (var i = 0; i < 100; i++) {
        var imgIndex;
        if (i % 9 === 0) {
            imgIndex = curTargetIndex;
        }
        else {
            imgIndex = getRandom(0, maxImgIndex);
        }
        dictinaryDom.innerHTML += `<div class="item"><span class="number">${i}</span><span class="value"><img src="./img/values/${imgIndex}.png" alt=""></span></div>`;
    }
}

initDictionary();

document.querySelector(".panel").addEventListener("click", function (e) {
    if (isGameOver) {
        return;
    }
    e.currentTarget.style.transition = "all 2s cubic-bezier(0.1, 0.68, 0.53, 0.98)";
    e.currentTarget.style.transform = "rotate(1800deg)";
})

document.querySelector(".panel").addEventListener("transitionend", function (e) {
    e.currentTarget.style.transition = "none";
    e.currentTarget.style.transform = "rotate(0deg)";
    initImg.style.opacity = 0;
    resultImg.src = `./img/values/${curTargetIndex}.png`;
    resultImg.style.opacity = 1;
    isGameOver = true;
})