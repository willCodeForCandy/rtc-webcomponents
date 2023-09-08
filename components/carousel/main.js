import { IMGS } from "./constants";
import "./style.css";

//SETUP
const carouselContainer = document.querySelector(".carousel-container");

const setCarouselTemplate = () => `
<div id="carousel" class="carousel">
    <ul class="scrollable-set"></ul>
    <div class="img-preview"></div>
</div>
`;

carouselContainer.innerHTML += setCarouselTemplate();

// LOGIC

const scrollingSetElement = document.querySelector(".scrollable-set");
const imgPreviewElement = document.querySelector(".img-preview");
let currentImgCount = 0;
let imgInterval;

const setScrollingSetTemplate = (image, index) => `
<li role="button" class="clickable">
  <img src="${image.src}" alt="${image.alt}" id="img-${index}" />
</li>
`;

const setupScrollableSet = () => {
  IMGS.forEach((img, index) => {
    scrollingSetElement.innerHTML += setScrollingSetTemplate(img, index);
  });
};

const setupCarouselInterval = () => {
  imgInterval = setInterval(() => {
    if (currentImgCount === IMGS.length - 1) {
      currentImgCount = 0;
    } else {
      currentImgCount++;
    }
    setImgPreview(IMGS[currentImgCount].src);
  }, 3000);
};

const setImgPreview = (imgSrc) => {
  imgPreviewElement.style.backgroundImage = `url(${imgSrc})`;

  const currentImg = document.querySelector(`img[src="${imgSrc}"]`);
  let imgIndex = Number(currentImg.id.split("-")[1]);
  currentImgCount = imgIndex;
  const scrollIndex = imgIndex - 1;
  scrollingSetElement.scrollBy({
    top:
      scrollIndex > 0
        ? scrollIndex * currentImg.clientHeight
        : -scrollingSetElement.clientHeight,
    behavior: "smooth",
  });
  clearInterval(imgInterval);
  setupCarouselInterval();
};

const changeImg = (ev) => {
  const img = ev.target.children[0];
  setImgPreview(img.getAttribute("src"));
  console.log("clicked");
};

const addListenerToScrollableElement = () => {
  const scrollables = document.querySelectorAll("li.clickable");
  scrollables.forEach((scrollable) => {
    scrollable.addEventListener("click", changeImg);
  });
};

setupScrollableSet();
setImgPreview(IMGS[0].src);
addListenerToScrollableElement();
setupCarouselInterval();
