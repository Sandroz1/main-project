document.addEventListener("DOMContentLoaded", function () {
  let allData = [];
  let previousData = []; // Сохраняем предыдущие данные
  const url = "https://672885dc270bd0b97555ee35.mockapi.io/id";
  const id = 1;
  const urll = `${url}/${id}`;

  function displayCards(data, page) {
    cardsContainer.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach((item) => {
      console.log(item);
      const card = createCard(item);
      const modal = document.querySelector(".modal");
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
        // Здесь можно добавить код для открытия модального окна

        modal.style.display = "flex";
        document.querySelector(".modal__text").textContent = item.discriprion;
        document.getElementById("map1").src = item.map;
        card.href = "./buicard.html";
      });
      modal.addEventListener("click", () => {
        modal.style.display = "none";
      });
      cardsContainer.appendChild(card);
    });
  }

  const cardsContainer = document.getElementById("cards");
  const searchInput = document.getElementById("input");
  const filterButtons = document.querySelectorAll(".main__header__filter");
  const paginationContainer = document.querySelector(".main__header__slide");

  let currentPage = 1;
  const itemsPerPage = 3;
  let filteredData = [];
  let currentBlock = 0; // Добавляем переменную для сохранения текущего блока пагинации
  let currentFilter = "all"; // Добавляем переменную для сохранения текущего фильтра

  function createCard(item) {
    const card = document.createElement("a");
    card.className = "main__content__card";

    card.innerHTML = `
          <img class = "main__content__image" src="./assets/image/doscard/${item.img1}.svg" alt="Изображение отсутствует">
          <h3 class="main__content__card__title"> ${item.name}</h3>
        `;

    return card;
  }

  function updatePagination(data) {
    const paginationContainer = document.querySelector(".main__header__slide");
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(data.length / itemsPerPage);

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
          currentBlock = block; // Обновляем текущий блок пагинации
          displayCards(allData, currentPage);
          renderButtons(currentBlock);
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
    currentFilter = category; // Сохраняем текущий фильтр
    if (category === "all") {
      filteredData = allData;
    } else {
      filteredData = allData.filter((item) => item.category === category);
    }
    currentPage = 1;
    currentBlock = 0; // Сбрасываем блок пагинации при фильтрации
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
    currentBlock = 0; // сбрасываю блок пагинации при поиске
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

      previousData = data;
      allData = data; // Сохраняем данные в переменную
      filteredData = allData; // Начальные данные
      filterData(currentFilter); // Применяем сохраненный фильтр
      displayCards(filteredData, currentPage); // Отображаем карточки на текущей странице
      updatePagination(filteredData); // Обновляем пагинацию с учетом текущего блока
    })
    .catch((error) => {
      console.error(error);
      spiner.style.display = "none";
    });
});
