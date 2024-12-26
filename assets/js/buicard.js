class Reviews {
  constructor(
  ) {
    this.url = "https://672885dc270bd0b97555ee35.mockapi.io/repos";
    this.reviewsList = document.getElementById("reviews-list");
    this.reviewForm = document.getElementById("review-form");
    this.nameInput = document.getElementById("name");
    this.textInput = document.getElementById("text");
    this.id = new URLSearchParams(window.location.search).get("id");
    this.attractionUrl = `${this.url}/${this.id}`;
    this.loadReviews();
    this.setupForm();
  }

  loadReviews() {
    fetch(this.attractionUrl)
      .then((response) => response.json())
      .then((data) => {
        const reviews = data.rewiews || [];
        this.reviewsList.innerHTML = "";
        reviews.forEach((review) => {
          this.reviewsList.appendChild(this.createReviewElement(review));
        });
      })
      .catch((error) => console.error("Error loading reviews:", error));
  }

  createReviewElement(review) {
    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `
        <p class='rewiew__name-text'><strong>${review.name}</strong>:</p>
        <p class='rewiew__desc-text'>${review.text}</p>
        <button class="delete-review" data-id="${review.id}">Удалить</button>
      `;
    div
      .querySelector(".delete-review")
      .addEventListener("click", () => this.deleteReview(review.id));
    return div;
  }

  deleteReview(reviewId) {
    fetch(this.attractionUrl)
      .then((response) => response.json())
      .then((data) => {
        data.rewiews = data.rewiews.filter((review) => review.id !== reviewId);
        this.updateAttraction(data);
      })
      .catch((error) => console.error("Error deleting review:", error));
  }

  updateAttraction(data) {
    fetch(this.attractionUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => this.loadReviews())
      .catch((error) => console.error("Error updating attraction:", error));
  }

  setupForm() {
    this.reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (
        this.nameInput.value.trim() === "" ||
        this.textInput.value.trim() === ""
      ) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }

      const newReview = {
        id: Date.now().toString(),
        name: this.nameInput.value,
        text: this.textInput.value,
      };

      fetch(this.attractionUrl)
        .then((response) => response.json())
        .then((data) => {
          if (!data.rewiews) data.rewiews = [];
          data.rewiews.push(newReview);
          this.updateAttraction(data);
          this.nameInput.value = "";
          this.textInput.value = "";
        })
        .catch((error) =>
          console.error("Error fetching attraction data:", error)
        );
    });
  }
}
new  Reviews();

class BurgerMenu {
  constructor() {
    this.burger = document.querySelector(".burger__image");
    this.menu = document.querySelector(".header__burger");
    this.body = document.querySelector("body");
    this.counter = 0;

    this.burger.addEventListener("click", () => this.toggleMenu());
  }

  toggleMenu() {
    if (this.counter === 0) {
      this.menu.style.display = "flex";
      this.counter++;
    } else {
      this.menu.style.display = "none";
      this.counter--;
    }
  }
}

new BurgerMenu();

class AttractionCard {
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
    this.id = this.urlParams.get("id");
    this.url = `https://672885dc270bd0b97555ee35.mockapi.io/repos/${this.id}`;
    this.spiner = document.querySelector(".spiner");
    this.rewiews = document.querySelector(".reviews");
    this.spiner.style.display = "flex";
    this.loadCard();
  }
  loadCard() {
    fetch(this.url)
      .then((response) => response.json())
      .then((item) => {
        this.spiner.style.display = "none";
        this.rewiews.style.display = "block";
        this.displayCard(item);
      })
      .catch((error) => {
        console.error(error);
        this.spiner.style.display = "none";
        this.rewiews.style.display = "block";
      });
  }
  displayCard(item) {
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
    this.setupModal(card);
  }

  setupModal(card) {
    const images = card.querySelectorAll(".main__card__image");
    const modal = card.querySelector(".modal");
    const modalImage = card.querySelector(".modal__image");
    const modalBack = card.querySelector(".modal__back");
    const modalFront = card.querySelector(".modal__front");
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
}

new AttractionCard();
 