import "./style.css";
import { TECHNOLOGIES_URL } from "./constants";

// SETUP
const $gallery = document.querySelector("#gallery-container");
const createModalTemplate = () => `
<div id="modal" class="modal">
  <div class="modal-header">
    <h2 class="modal-title"></h2>
    <button class="modal-close-btn">❌</button>
  </div>
  <div class="modal-body"></div>
</div>`;
$gallery.innerHTML += createModalTemplate();

// LOGIC
const $loading = document.querySelector("#loading-bar");
const $modal = document.querySelector("#modal");
const $modalTitle = document.querySelector(".modal-title");
const $modalBody = document.querySelector(".modal-body");
let cards = [];

const countStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= rating && i <= 5; i++) {
    stars.push("<span>⭐</span>");
  }
  return stars.join("");
};

const createCardTemplate = (technology, $padre) => {
  const divCard = document.createElement("div");

  divCard.classList.add("card");
  divCard.setAttribute("id", `${technology.id}`);

  divCard.innerHTML = `
  <h3>${technology.name}</h3>
  <div class="image-container">
    <img src="${technology.logo + `?random=${technology.id}`}" alt="${
    technology.name
  } logo" />
  </div>
  <div class="score-container">
    ${countStars(technology.score)} (${technology.reviews} opiniones)
  </div>`;

  divCard.addEventListener("click", showModal);

  $padre.appendChild(divCard);
};

const populateGallery = (galleryContentList) => {
  $loading.remove();
  galleryContentList.forEach((item) => {
    createCardTemplate(item, $gallery);
  });
};

// fetch(TECHNOLOGIES_URL)
//   .then((res) => res.json())
//   .then((cardsData) => {
//     cards = cardsData;
//     populateGallery(cards);
//   });

const getTechnologies = async () => {
  const res = await fetch(TECHNOLOGIES_URL);
  const cardsData = await res.json();

  cards = cardsData;
  populateGallery(cards);
};

const setModalData = (data) => {
  $modalTitle.innerHTML = data.name;
  $modalBody.innerHTML = `
    <div class="modal-img">
      <img src="${data.logo + `?random=${data.id}`}" alt="${data.name} logo" />
    </div>
    <p>Valorado con ${data.score} estrellas por ${data.reviews} usuarios.</p>
    `;
};

const showModal = (event) => {
  const cardId = event.target.id;
  const cardData = cards.find((card) => card.id === cardId);
  setModalData(cardData);
  console.log(cardData);
  $modal.style.display = "block";
};

const addModalListener = () => {
  const closeBtn = document.querySelector(".modal-close-btn");
  closeBtn.addEventListener("click", () => {
    $modal.style.display = "none";
  });
};

getTechnologies();
addModalListener();
