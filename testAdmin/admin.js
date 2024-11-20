document.addEventListener("DOMContentLoaded", function () {
  let allData = [];
  const url = "https://672885dc270bd0b97555ee35.mockapi.io/id";
  const id = 1;
  const urll = `${url}/${id}`;

  const cardsContainer = document.getElementById("cards");
  const searchInput = document.getElementById("input");
  const filterButtons = document.querySelectorAll(".main__header__filter");
  const paginationContainer = document.querySelector(".main__header__slide");

  let currentPage = 1;
  const itemsPerPage = 3;
  let filteredData = [];

  function createCard(item) {
    const card = document.createElement("a");
    card.className = "main__content__card";

    card.innerHTML = `
      <img class="main__content__image" src="./image/doscard/${item.img1}.svg" alt="Изображение отсутствует">
      <div class="main__content__container"> 
        <h3 class="main__content__card__title">${item.name}</h3>
        <button id="del-btn" class="btn__card-delete">удалить</button>
      </div>
    `;

    return card;
  }

  function displayCards(data, page) {
    cardsContainer.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach((item, index) => {
      console.log(item);
      const card = createCard(item);
      const modal = document.querySelector(".modal");
      const buttonDel = card.querySelector(".btn__card-delete"); // Находим кнопку удаления внутри карточки
      let newData = {
        frame: item.id,
      };

      card.addEventListener("click", async () => {
        try {
          const response = await fetch(urll, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          });

          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }

          const data = await response.json();
          console.log("Success:", data);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }

        // для модалки
        // modal.style.display = "flex";
        // document.querySelector(".modal__text").textContent = item.discriprion;
        // document.getElementById("map1").src = item.map;
        // card.href = "./buicard.html";
      });

      buttonDel.addEventListener("click", async () => {
        // Удаление объекта на сервере
        const response = await fetch(
          `https://672885dc270bd0b97555ee35.mockapi.io/repos/${item.id}`,
          {
            method: "DELETE",
          }
        );

        // Удаление объекта из allData
        allData = allData.filter((dataItem) => dataItem.id !== item.id);

        // Обновление отображения карточек и пагинации
        displayCards(allData, currentPage);
        updatePagination(allData);
      });

      cardsContainer.appendChild(card);
    });
  }

  function updatePagination(data) {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(data.length / itemsPerPage);
    let currentBlock = 0;

    function renderButtons(block) {
      paginationContainer.innerHTML = "";
      if (block > 0) {
        const buttonB = document.createElement("button");
        buttonB.className = "main__header__button-back";
        buttonB.textContent = "<";
        buttonB.addEventListener("click", () => {
          renderButtons(block - 1);
        });
        paginationContainer.appendChild(buttonB);
      }

      for (let i = 1; i <= 3; i++) {
        const pageNumber = block * 3 + i;
        if (pageNumber > totalPages) break;

        const button = document.createElement("button");
        button.className = "main__header__button";
        button.id = pageNumber;
        button.textContent = pageNumber;
        if (pageNumber == currentPage) {
          button.style.backgroundColor = "#00C8FF";
        }
        button.addEventListener("click", () => {
          currentPage = pageNumber;
          displayCards(allData, currentPage);
          renderButtons(Math.floor((currentPage - 1) / 3));
        });
        paginationContainer.appendChild(button);
      }
      if ((block + 1) * 3 < totalPages) {
        const buttonF = document.createElement("button");
        buttonF.className = "main__header__button-front";
        buttonF.textContent = ">";
        buttonF.addEventListener("click", () => {
          renderButtons(block + 1);
        });
        paginationContainer.appendChild(buttonF);
      }
    }

    renderButtons(currentBlock);
  }

  function filterData(category) {
    if (category === "all") {
      filteredData = allData;
    } else {
      filteredData = allData.filter((item) => item.category === category);
    }
    currentPage = 1;
    displayCards(filteredData, currentPage);
    updatePagination(filteredData);
  }

  // Смена цвета по нажатию на кнопку
  filterButtons.forEach((button) => {
    filterButtons[0].style.backgroundColor = "#00C8FF";
    button.addEventListener("click", () => {
      filterButtons.forEach((button) => {
        button.style.backgroundColor = "#fff";
      });
      button.style.backgroundColor = "#00C8FF";
      filterData(button.dataset.filter);
    });
  });

  // Поиск
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filteredData = allData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    displayCards(filteredData, currentPage);
    updatePagination(filteredData);
  });

  // Инициализация
  const spiner = document.querySelector(".spiner");
  spiner.style.display = "flex";

  fetch("https://672885dc270bd0b97555ee35.mockapi.io/repos")
    .then((response) => response.json())
    .then((data) => {
      spiner.style.display = "none";
      allData = data; // Сохраняем данные в переменную allData
      filteredData = allData; // Начальные данные
      displayCards(filteredData, currentPage); // Отображаем карточки на первой странице
      updatePagination(filteredData); // Обновляем пагинацию
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      spiner.style.display = "none";
    });
});

document.getElementById("submitCard").addEventListener("click", function () {
  const cardText = document.getElementById("cardText").value;
  const uploadedImage = localStorage.getItem("uploadedImage");

  if (cardText) {
    const cardData = {
      name: cardText,
      // discriprion:
      //   "Струи воды переливаются и играют в лучах солнца , со скал потоки воды стекают неравномерно ,есть широкие потоки, есть места где струятся слезы. Ориентировочно ширина водопада метров 30 . Сама скала очень красива , она покрыта мхом , вечнозеленой растительностью. Место просто изумительно и незабываемо .",
      category: "category 3",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.462027038491!2d39.68551095544225!3d43.80477499679469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f42f2c8bb2893f%3A0xd3255e1c74f898dc!2z0JLQvtC00L7Qv9Cw0LQg0J_Qu9Cw0YfRg9GJ0LjQtSDRgdC60LDQu9GL!5e0!3m2!1sru!2sru!4v1730726179809!5m2!1sru!2sru",
      img1: "NoImage",
      img2: "NoImage",
      img3: "NoImage",
    };

    // Отправляем данные на сервер
    fetch("https://672885dc270bd0b97555ee35.mockapi.io/repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });
    alert("Карточка успешно загружена без изображения!");
  } else {
    alert("Пожалуйста, заполните все поля и загрузите изображение.");
  }
});
