document.addEventListener("DOMContentLoaded", function () {
  const url = "https://672885dc270bd0b97555ee35.mockapi.io/id";
  const id = 1;
  const urll = `${url}/${id}`;

  const cardsContainer = document.getElementById("cards");
  const searchInput = document.getElementById("input");
  const filterButtons = document.querySelectorAll(".main__header__filter");
  const paginationContainer = document.querySelector(".main__header__slide");
  const loader = document.querySelector(".loader");
  const sortButton = document.querySelector(".sort-button");
  const spiner = document.querySelector(".spiner ");
  const spinerB = document.querySelector(".spiner-back");

  let currentPage = 1;
  const itemsPerPage = 10;
  let filteredData = [];
  let allData = [];
  let currentBlock = 0;
  let currentFilter = "all";
  let currentSearchTerm = "";
  let isSortedByPopularityAsc = null; // переменная для отслеживания состояния сортировки
  let searchTimeout;

  function displayCards(data) {
    cardsContainer.innerHTML = "";
    data.forEach((item) => {
      console.log(item);
      const card = createCard(item);
      cardsContainer.appendChild(card);
      card.addEventListener("click", async () => {
        window.location.href = `./buicard.html?id=${item.id}`;
      });
    });
  }

  function createCard(item) {
    const card = document.createElement("div");
    card.className = "main__content__card";

    card.innerHTML = `
          <img class = "main__content__image" src="./assets/image/doscard/${item.img1}.svg" alt="Изображение отсутствует">
          <h3 class="main__content__card__title"> ${item.name}</h3>
        `;
    return card;
  }


  function updatePagination(totalPages) {
    debugger
    paginationContainer.innerHTML = "";
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
          currentBlock = block;
          loadPageData(currentPage);
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

  function loadPageData(page) {
    spiner.style.display = "flex";
    spinerB.style.display = "flex";
    let pagURL = `https://672885dc270bd0b97555ee35.mockapi.io/repos?page=${page}&limit=${itemsPerPage}`;

    if (currentFilter !== "all") {
      pagURL += `&category=${currentFilter}`;
    }
    if (currentSearchTerm) {
      pagURL += `&name=${currentSearchTerm}`;
    }
    if (isSortedByPopularityAsc !== null) {
      const sortOrder = isSortedByPopularityAsc ? "asc" : "desc";
      pagURL += `&sortBy=popularity&order=${sortOrder}`;
    }

    fetch(pagURL)
      .then((response) => response.json())
      .then((data) => {
        displayCards(data);
        spiner.style.display = "none";
        spinerB.style.display = "none";
      })
      .catch((error) => {
        console.error(error);
        spiner.style.display = "none";
        spinerB.style.display = "none";
      });
  }

  function filterData(category) {
    currentFilter = category;
    spiner.style.display = "flex";
    spinerB.style.display = "flex";
    if (category === "all") {
      fetch("https://672885dc270bd0b97555ee35.mockapi.io/repos")
        .then((response) => response.json())
        .then((data) => {
          allData = data;
          filteredData = allData;
          const totalPages = Math.ceil(filteredData.length / itemsPerPage);
          updatePagination(totalPages);
          loadPageData(currentPage);
          spiner.style.display = "none";
          spinerB.style.display = "none";
        })
        .catch((error) => {
          console.error(error);
          spiner.style.display = "none";
          spinerB.style.display = "none";
        });
    } else {
      fetch(
        `https://672885dc270bd0b97555ee35.mockapi.io/repos?category=${category}`
      )
        .then((response) => response.json())
        .then((data) => {
          allData = data;
          filteredData = allData;
          const totalPages = Math.ceil(filteredData.length / itemsPerPage);
          updatePagination(totalPages);
          loadPageData(currentPage);
          spiner.style.display = "none";
          spinerB.style.display = "none";
        })
        .catch((error) => {
          console.error(error);
          spiner.style.display = "none";
          spinerB.style.display = "none";
        });
    }
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
    spiner.style.display = "flex";
    spinerB.style.display = "flex";
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearchTerm = searchInput.value.toLowerCase();

      // Фильтруем данные на стороне клиента
      filteredData = allData.filter((item) =>
        item.name.toLowerCase().includes(currentSearchTerm)
      );

      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
      updatePagination(totalPages);
      loadPageData(currentPage);
      spiner.style.display = "none";
      spinerB.style.display = "none";
    }, 500);
  });

  // Сортировка по популярности
  sortButton.addEventListener("click", () => {
    spiner.style.display = "flex";
    spinerB.style.display = "flex";
    isSortedByPopularityAsc = !isSortedByPopularityAsc; // сброс флаг сортировки

    const sortOrder = isSortedByPopularityAsc ? "asc" : "desc";

    let sortUrl = `https://672885dc270bd0b97555ee35.mockapi.io/repos?sortBy=popularity&order=${sortOrder}`;
    if (isSortedByPopularityAsc) {
      sortButton.style.backgroundColor = "red";
    } else {
      sortButton.style.backgroundColor = "rgb(0, 200, 255)";
    }
    // Добавляем параметры фильтрации и поиска если они есть
    if (currentFilter !== "all") {
      sortUrl += `&category=${currentFilter}`;
    }
    if (currentSearchTerm) {
      sortUrl += `&name=${currentSearchTerm}`;
    }

    fetch(sortUrl)
      .then((response) => response.json())
      .then((data) => {
        allData = data;
        filteredData = allData;
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        updatePagination(totalPages);
        loadPageData(currentPage);
        spiner.style.display = "none";
        spinerB.style.display = "none";
      })
      .catch((error) => {
        console.error(error);
        spiner.style.display = "none";
        spinerB.style.display = "none";
      });
  });

  // Инициализация
  spiner.style.display = "flex";
  spinerB.style.display = "flex";

  fetch("https://672885dc270bd0b97555ee35.mockapi.io/repos")
    .then((response) => response.json())
    .then((data) => {
      spiner.style.display = "none";
      spinerB.style.display = "none";

      allData = data;
      filteredData = allData;
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
      updatePagination(totalPages);
      loadPageData(currentPage);
    })
    .catch((error) => {
      console.error(error);
      spiner.style.display = "none";
      spinerB.style.display = "none";
    });
});
