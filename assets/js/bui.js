const burger = document.querySelector(".burger__image");
burger.addEventListener("click", burgerf);
let counter = 0;
function burgerf() {
  const menu = document.querySelector(".header__burger");

  if (counter == 0) {
    menu.style.display = "flex";
    counter++;

    body.style.overflow = "hidden";
  } else if (counter == 1) {
    menu.style.display = "none";
    counter--;

    body.style.overflow = "auto";
  }
}

// .......................
document.addEventListener("DOMContentLoaded", function () {
  let allData = [];
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
      })
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

  function createCard(item) {
    const card = document.createElement("a");
    card.className = "main__content__card";

    card.innerHTML = `

          <img class = "main__content__image" src="./assets/image/dos${item.id}.svg" alt="Изображение отсутствует">
          <h3 class="main__content__card__title"> ${item.name}</h3>


        `;

    // <p>${item.description}</p>
    // <p>Категория: ${item.category}</p>

    return card;
  }

  function updatePagination(data) {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(data.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.className = "main__header__button";
      button.id = i;
      button.textContent = i;
      if (button.id == 1) {
        button.style.backgroundColor = "#00C8FF";
      }
      button.addEventListener("click", () => {
        btnAll.forEach((btn) => {
          btn.style.backgroundColor = "#fff";
        });

        currentPage = i;
        displayCards(allData, currentPage);
        button.style.backgroundColor = "#00C8FF";
      });
      paginationContainer.appendChild(button);
    }
    const btnAll = document.querySelectorAll(".main__header__button");
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
