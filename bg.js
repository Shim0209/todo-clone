const body = document.querySelector("body");

const ImageURL = ["https://i.pinimg.com/originals/b6/5e/9c/b65e9c76080aa98d83ded3ed1c6c7057.png",
                "https://s3.ap-northeast-2.amazonaws.com/st.dangidata/hobby_conects/data/review/photo/a1212650d4a2567e6b01e3e640c86a67.jpeg",
                "https://post-phinf.pstatic.net/MjAxOTA1MzFfMjY0/MDAxNTU5Mjg5MDA2OTQ3.eTe8sdp10p_6LExlnDDz-fZmET_1_xG5r_iS7S4-fo4g.H3QnwxIn3JwVBWEOm4GPosefZ0Ss093n-R-avgNesAQg.PNG/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C1.PNG?type=w1200"];
const IMG_NUMBER = 2;

function paintImage(imageNumber) {
    const image = new Image();
    image.src = `${ImageURL[imageNumber]}`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();