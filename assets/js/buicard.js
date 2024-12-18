////////////////////ОТЗЫВЫ///////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const url = "https://672885dc270bd0b97555ee35.mockapi.io/repos";
  const reviewsList = document.getElementById("reviews-list");
  const reviewForm = document.getElementById("review-form");
  const nameInput = document.getElementById("name");
  const textInput = document.getElementById("text");

  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    console.error("ID достопримечательности не найден в URL");
    return;
  }

  const attractionUrl = `${url}/${id}`;
  function loadReviews() {
    fetch(attractionUrl)
      .then((response) => response.json())
      .then((data) => {
        const reviews = data.rewiews || [];
        reviewsList.innerHTML = "";
        reviews.forEach((review) => {
          reviewsList.appendChild(createReviewElement(review));
        });
      })
      .catch((error) => console.error("Error loading reviews:", error));
  }

  function createReviewElement(review) {
    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `
      <p class='rewiew__name-text'><strong>${review.name}</strong>:</p>
      <p class='rewiew__desc-text'>${review.text}</p>
      <button class="delete-review" data-id="${review.id}">Удалить</button>
    `;
    div
      .querySelector(".delete-review")
      .addEventListener("click", () => deleteReview(review.id));
    return div;
  }

  // Функция для удаления отзыва
  function deleteReview(reviewId) {
    fetch(attractionUrl)
      .then((response) => response.json())
      .then((data) => {
        data.rewiews = data.rewiews.filter((review) => review.id !== reviewId);
        updateAttraction(data);
      })
      .catch((error) => console.error("Error deleting review:", error));
  }

  // Функция для обновления данных достопримечательности
  function updateAttraction(data) {
    fetch(attractionUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => loadReviews())
      .catch((error) => console.error("Error updating attraction:", error));
  }

  // Обработчик отправки формы
  reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const newReview = {
      id: Date.now().toString(), // случ айди
      name: nameInput.value,
      text: textInput.value,
    };

    fetch(attractionUrl)
      .then((response) => response.json())
      .then((data) => {
        if (!data.rewiews) data.rewiews = [];
        data.rewiews.push(newReview);
        updateAttraction(data);
        nameInput.value = "";
        textInput.value = "";
      })
      .catch((error) =>
        console.error("Error fetching attraction data:", error)
      );
  });

  // Загрузка отзывов
  loadReviews();
});

///////////////////////////////////////////

const burger = document.querySelector(".burger__image");
const menu = document.querySelector(".header__burger");
const body = document.querySelector("body");

let counter = 0;

function burgerf() {
  if (counter === 0) {
    menu.style.display = "flex";
    counter++;
    // body.style.overflow = "hidden";
  } else {
    menu.style.display = "none";
    counter--;
    // body.style.overflow = "auto";
  }
}

burger.addEventListener("click", burgerf);

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    console.error("ID is missing in URL");
    return;
  }

  const url = `https://672885dc270bd0b97555ee35.mockapi.io/repos/${id}`;

  function displayCard(item) {
    const card = document.createElement("div");
    card.className = "main__card";
    card.innerHTML = `
      <h1 class="main__title">${item.name}</h1>
      <div class="main__card__container">
        <div class="main__card__text">
          <h3 class="main__card__title">${item.name}</h3>
          <p class="main__card__desc">${item.discriprion}</p>
        </div>       
        <iframe id="map1" src="${item.map}" width="500px" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="map-second"></iframe>
      </div>
      <div class="main__card__images">
        <img class="main__card__image" src="./assets/image/doscard/${item.img1}.svg" alt="Изображение отсутствует">
        <img class="main__card__image" src="./assets/image/doscard/${item.img2}.svg" alt="Изображение отсутствует">
        <img class="main__card__image" src="./assets/image/doscard/${item.img3}.svg" alt="Изображение отсутствует">
      </div>
      <div class="modal-overlay" id="modalOverlay">
        <div class="modal">
          <p class="modal__back modal__btn"> < </p>
          <img src="" alt="" class="modal__image">
          <p class="modal__front modal__btn"> > </p>
        </div>
      </div>
    `;

    document.querySelector(".main__container").appendChild(card);

    const images = document.querySelectorAll(".main__card__image");
    const modal = document.querySelector(".modal");
    const modalImage = document.querySelector(".modal__image");
    const modalBack = document.querySelector(".modal__back");
    const modalFront = document.querySelector(".modal__front");
    let currentIndex = 0;
    images.forEach((elem, index) => {
      elem.addEventListener("click", () => {
        currentIndex = index;
        const urlI = elem.getAttribute("src");
        modalImage.src = urlI;
        modal.style.display = "flex";
      });
    });
    modalBack.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        const backSrc = images[currentIndex].getAttribute("src");
        modalImage.src = backSrc;
      }
    });
    modalFront.addEventListener("click", () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        const nextSrc = images[currentIndex].getAttribute("src");
        modalImage.src = nextSrc;
      }
    });
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  const spiner = document.querySelector(".spiner");
  const rewiews = document.querySelector(".reviews");
  spiner.style.display = "flex";

  fetch(url)
    .then((response) => response.json())
    .then((item) => {
      spiner.style.display = "none";
      rewiews.style.display = "block";
      displayCard(item);
    })
    .catch((error) => {
      console.error(error);
      spiner.style.display = "none";
      rewiews.style.display = "block";
    });
});
