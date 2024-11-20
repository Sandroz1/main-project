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


// .......................
const cards = document.querySelector(".main__content__cards");
const btn11 = document.getElementById("btn1")
const btn22 = document.getElementById("btn2")
const btn33 = document.getElementById("btn3")
btns = document.querySelectorAll(".main__header__button")
const btn1 = document.getElementById("btn1").onclick = bat1;
const btn2 = document.getElementById("btn2").onclick = bat2;
const btn3 = document.getElementById("btn3").onclick = bat3;
const filterButtons = document.querySelectorAll('.main__header__filter');



pol = [];
let mainCount = 1
let filterCount = 1
function bat1(){
  localStorage.setItem("pagination", JSON.stringify('page 1'));
    mainCount = 1
    if(mainCount == 1){
        for(let i = 0; i < btns.length; i++){
            btns[i].style.background = '#FFFFFF'
       }
  btn11.style.background = '#FFB04F'

    }


    card1 = document.querySelectorAll(".main__content__card");
    for (let i = 0; i < card1.length; i++){
        cards.removeChild(card1[i])
    }

    const cardImages = ["./assets/image/dos1.svg","./assets/image/dos2.svg","./assets/image/dos3.svg"]
    const namesImages = ["Агурские водопады","Водопад Поликаря","Водопад Плачущие скалы"]
    const namesIClass = ["category1","category1","category2"]
    if (cardImages.length > 0){
    for (let i = 0; i < cardImages.length; i++) {
        

        const card = document.createElement("div");
        card.classList.add("main__content__card")
        card.dataset.name = namesIClass[i];
        card.innerHTML = `
        <div class="main__content__card__container" >
        <img src="${cardImages[i]}" alt="Card image cap">
        
          <h2 class="main__content__card__title"> ${namesImages[i]} </h2>
        </div>
        `;
        console.log(card);
        console.log(cards);
        
        
        cards.appendChild(card);
        
   }
   
}else{
    const card = document.createElement("div");
    card.classList.add("main__content__card");
    card.innerHTML = `
    <div class="main__content__card__container">

      <h2 class="main__content__card__none"> Ничего не найдено </h2>
    </div>
    `;
    console.log(card);
    console.log(cards);

    
    cards.appendChild(card);
}
const items = document.querySelectorAll('.main__content__card');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        console.log(items)

        items.forEach(item => {
 
            console.log()
            if (filterValue === 'all' || item.getAttribute('data-name') === filterValue) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
}

bat1()
localStorage.setItem("pagination", JSON.stringify('page 1'));

function bat2(){
  localStorage.setItem("pagination", JSON.stringify('page 2'));
    mainCount = 2
    if(mainCount == 2){
        for(let i = 0; i < btns.length; i++){
            btns[i].style.background = '#FFFFFF'
       }
        btn22.style.background = '#FFB04F'

    }

    card1 = document.querySelectorAll(".main__content__card");

    for (let i = 0; i < card1.length; i++){
        cards.removeChild(card1[i])
    }

    const cardImages = ["./assets/image/btn21.svg","./assets/image/btn22.svg","./assets/image/btn23.svg"]
    const namesImages = ["Дагомысские корыта","Ореховский водопад","Змейковидные водопады"]
    const namesIClass = ["category1","category1","category2"]

    if (cardImages.length > 0){
    for (let i = 0; i < cardImages.length; i++) {
        

        const card = document.createElement("div");
        card.classList.add("main__content__card");
        card.dataset.name = namesIClass[i];
        card.innerHTML = `
        <div class="main__content__card__container">
        <img src="${cardImages[i]}" alt="Card image cap">
        
          <h2 class="main__content__card__title"> ${namesImages[i]} </h2>
        </div>
        `;
        console.log(card);
        console.log(cards);
    
        
        cards.appendChild(card);
    }}else{
        const card = document.createElement("div");
        card.classList.add("main__content__card");
        card.innerHTML = `
        <div class="main__content__card__container">

          <h2 class="main__content__card__none"> Ничего не найдено </h2>
        </div>
        `;
        console.log(card);
        console.log(cards);
    
        
        cards.appendChild(card);
    }

    const items = document.querySelectorAll('.main__content__card');

    filterButtons.forEach(button => {
        
        button.addEventListener('click', function() {
          filterButtons[filterCount-1 ].style.background = '#fff'
          filterCount = 2
          console.log('filterCount')
  if(filterCount == 2){
      console.log('filterCount')
                    filterButtons[filterCount-1].style.background = '#FFB04F'

     
  }

        
            const filterValue = this.getAttribute('data-filter');
            console.log(items)
    
            items.forEach(item => {
     
                console.log()
                if (filterValue === 'all' || item.getAttribute('data-name') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

}
function bat3(){
  localStorage.setItem("pagination", JSON.stringify('page 3'));
    mainCount = 3
    if(mainCount == 3){
        for(let i = 0; i < btns.length; i++){
            btns[i].style.background = '#FFFFFF'
       }
  btn33.style.background = '#FFB04F'

    }

  
    card1 = document.querySelectorAll(".main__content__card");
   
    for (let i = 0; i < card1.length; i++){
        cards.removeChild(card1[i])
    }

    const cardImages = []
    const namesImages = ["Дагомысские корыта","Ореховский водопад","Змейковидные водопады"]

    if (cardImages.length > 0){
        for (let i = 0; i < cardImages.length; i++) {
        

            const card = document.createElement("div");
            card.classList.add("main__content__card");
            card.innerHTML = `
            <div  class="main__content__card__container">
            <img src="${cardImages[i]}" alt="Card image cap">
            
              <h2 class="main__content__card__title"> ${namesImages[i]} </h2>
            </div>
            `;
            console.log(card);
            console.log(cards);
        
            
            cards.appendChild(card);
        }
    }else{
        const card = document.createElement("div");
        card.classList.add("main__content__card");
        card.innerHTML = `
        <div class="main__content__card__container">

          <h2 class="main__content__card__none"> Ничего не найдено </h2>
        </div>
        `;
        console.log(card);
        console.log(cards);
    
        
        cards.appendChild(card);
    }

    
}

// if (mainCount == 1){
//     const cardImages = ["./assets/image/dos1.svg","./assets/image/dos2.svg","./assets/image/dos3.svg"]
//     const namesImages = ["Агурские водопады","Водопад Поликаря","Водопад Плачущие скалы"]
//     for (let i = 0; i < cardImages.length; i++) {
    
//         const card = document.createElement("div");
//         card.classList.add("main__content__card");
//         card.innerHTML = `
//         <div class="main__content__card__container">
//         <img src="${cardImages[i]}" alt="Card image cap">
        
//           <h2 class="main__content__card__title"> ${namesImages[i]} </h2>
//         </div>
//         `;
//         console.log(card);
//         console.log(cards);
        
        
//         cards.appendChild(card);
//     }
// }

let input = document.querySelector('#input');
    // let title = document.querySelectorAll('#title');
input.oninput = function(){

    let value = this.value.trim();
    let list = document.querySelectorAll('.main__content__card__title');  
    let card = document.querySelectorAll('.main__content__card');

    // list.style.display = 'none';

    list.forEach((elem,index) => {
        // console.log(elem.innerHTML);
        // console.log(card[index]);
        let {style, innerText} = elem
        let isElement = !!innerText.toLowerCase().search(value.toLowerCase())
        
        console.log(isElement);
        
        card[index].style.display = 'flex'; 
        
        console.log(card[index])
        
        if(!isElement) return
 
        card[index].style.display = 'none';
    })
}
 