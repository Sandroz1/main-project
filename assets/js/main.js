const burger = document.querySelector(".burger__image");
const menu = document.querySelector(".header__burger");
const body = document.querySelector("body");
let users = [];
let counter = 0;
window.addEventListener("load", () => {
  if (isAdmin === "true") {
    adminPanel.style.display = "flex";
  } else {
    adminPanel.style.display = "none";
  }
});
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

regLog = document.querySelector(".modal__login");
regPas = document.querySelector(".modal__password");
regbtn = document.querySelector(".header__links__registration");
logbtn = document.querySelector(".modal__registration__btn");
adminPanel = document.querySelector(".header__link-admin");
modalLogin = document.querySelector(".modal__registration");
modalExit = document.querySelector(".modal__registration__exit");
const url = "https://673b29ec339a4ce4451ae8c5.mockapi.io/login";
const isAdmin = localStorage.getItem("admin");
regbtn.addEventListener("click", () => {
  modalLogin.style.display = "flex";
});
modalExit.addEventListener("click", () => {
  modalLogin.style.display = "none";
});

async function fetchUsers() {
  const response = await fetch(url);
  const data = await response.json();
  users = data;
  qwe(users);
}

function qwe(mas) {
  const foundUser = mas.find((user) => user.password === regPas.value);
  const foundLogin = mas.find((user) => user.login === regLog.value);

  if (foundUser && foundLogin) {
    if (regLog.value === "admin") {
      localStorage.setItem("admin", true);
      modalLogin.style.display = "none";
      if (isAdmin) {
        adminPanel.style.display = "flex";
      } else {
        adminPanel.style.display = "none";
      }
    } else {
      alert(`Successful ${regPas.value}`);
      modalLogin.style.display = "none";
      localStorage.setItem("admin", false);
      adminPanel.style.display = "none";
    }
  } else {
    alert(`Неверный логин или пароль!`);
  }
}

logbtn.addEventListener("click", () => {
  fetchUsers();
});

const mapbutton = document.querySelector(".main__content__button");
const mapfirst = document.querySelector(".map-first");
const mapsecond = document.querySelector(".map-second");
let mapCount = 0;
mapbutton.addEventListener("click", mapcheck);
function mapcheck() {
  if (mapCount === 1) {
    mapfirst.style.display = "none";
    mapsecond.style.display = "flex";
    mapCount = 0;
  } else {
    mapfirst.style.display = "flex";
    mapsecond.style.display = "none";
    mapCount = 1;
  }
}

let hide = document.getElementById("hide");
let hide1 = document.getElementById("hide1");
let hide2 = document.getElementById("hide2");
let hide3 = document.getElementById("hide3");
hide.addEventListener("click", cardDel);
function cardDel() {
  hide.style.display = "none";
  hide1.style.display = "none";
  hide2.style.display = "none";
  hide3.style.display = "none";
}

document.getElementById("card1").onclick = cardAdd1;

function cardAdd1() {
  hide1.style.display = "flex";
  hide.style.display = "flex";
}

document.getElementById("card2").onclick = cardAdd2;

function cardAdd2() {
  hide2.style.display = "flex";
  hide.style.display = "flex";
}
document.getElementById("card3").onclick = cardAdd3;

function cardAdd3() {
  hide3.style.display = "flex";
  hide.style.display = "flex";
}

class Slider {
  constructor(
    sliderContainer,
    sliderLine,
    sliderImages,
    prevButton,
    nextButton
  ) {
    this.sliderContainer = document.querySelector(sliderContainer);
    this.sliderLine = document.querySelector(sliderLine);
    this.sliderImages = document.querySelectorAll(sliderImages);
    this.prevButton = document.querySelector(prevButton);
    this.nextButton = document.querySelector(nextButton);
    this.sliderCount = 0;
    this.sliderWidth = this.sliderImages[0].offsetWidth;

    this.init();
  }

  init() {
    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());
    this.updateSlider();
  }

  nextSlide() {
    this.sliderCount++;
    if (this.sliderCount >= this.sliderImages.length) {
      this.sliderCount = 0;
    }
    this.updateSlider();
  }

  prevSlide() {
    this.sliderCount--;
    if (this.sliderCount < 0) {
      this.sliderCount = this.sliderImages.length - 1;
    }
    this.updateSlider();
  }

  updateSlider() {
    this.sliderLine.style.transform = `translateX(${
      -this.sliderCount * this.sliderWidth
    }px)`;
  }
}

// Использование
const slider = new Slider(
  ".main__slider__container",
  ".main__slider__line",
  ".main__slider__image",
  ".main__slider__btn__prev",
  ".main__slider__btn__after"
);
