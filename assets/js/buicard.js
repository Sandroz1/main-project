
document.addEventListener("DOMContentLoaded", function () {

  fetch("https://672885dc270bd0b97555ee35.mockapi.io/id/1")
  .then((response) => response.json())
  .then(({ frame }) => displayCards(frame));

  function displayCards(frame) {
    console.log(frame)
    fetch("https://672885dc270bd0b97555ee35.mockapi.io/repos")
      .then((response) => response.json())

      .then((data) =>
        document.getElementById("cards").appendChild(createCard(data[frame-1]))


      );
      spiner.style.display = "none";
  }

  const spiner = document.querySelector(".spiner");
  spiner.style.display = "flex";
  function createCard(item) {
    document.querySelector('.main__title').textContent = item.name;
    const card = document.createElement("div");
    card.className = "main__card";
    card.innerHTML = `
    
        <div class="main__card__container">
          <div class="main__card__text">
            <h3 class="main__card__title"> ${item.name}</h3>
            <p class="main__card__desc"> ${item.discriprion}</p>
          </div>       
          <iframe id="map1" src="${item.map}" width="500px" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="map-second"></iframe>
        </div>
                  <div class="main__card__images">
            <img class = "main__card__image" src="./assets/image/doscard/${item.img1}.svg" alt="Изображение отсутствует">
            <img class = "main__card__image" src="./assets/image/doscard/${item.img2}.svg" alt="Изображение отсутствует">
            <img class = "main__card__image" src="./assets/image/doscard/${item.img3}.svg" alt="Изображение отсутствует">
        </div>
        `;

    return card;
  }


});
