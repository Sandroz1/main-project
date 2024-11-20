const form_btn = document.querySelector(".main__button-create");
const form = document.querySelector(".main__form__container");
let formCount = 0;
form_btn.addEventListener("click", formcheck);

function formcheck() {
  if (formCount === 1) {
    formCount--;
    form.style.scale = 0;
    form.style.height = 0;
    form_btn.textContent = "Создать Форму";
  } else if (formCount === 0) {
    form.style.scale = 1;
    form.style.height = "100%";
    form_btn.textContent = "Скрыть Форму";
    formCount++;
  }
}
const pol = [];

const buttonSend = document.querySelector(".main__form__send-form");

let buttonNumber = document.querySelector(".main__form__number");

let reg = /[A-Za-zA-Яа-яЁё]/g;
buttonNumber.oninput = (e) => {
  e.target.value = e.target.value.replace(reg, "");
};

buttonSend.addEventListener("click", funcSend);

function funcSend() {
  let inputName = document.querySelector(".main__form__name").value;
  const buttonMessage = document.querySelector(".main__form__message").value;

  let formObj = {
    name1: "",
    message1: "",
    number1: 0,
  };
  formObj.name1 = inputName;
  formObj.message1 = buttonMessage;
  formObj.number1 = buttonNumber.value;

  pol.push(formObj);
  localStorage.setItem("input", JSON.stringify(pol));
  inputName = 0;
  document.querySelector(".main__form__name").value = "";
  document.querySelector(".main__form__message").value = "";
  document.querySelector(".main__form__number").value = "";
}

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
