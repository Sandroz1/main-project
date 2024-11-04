
const slider = document.querySelector('.main__slider__container')
const sliderLine = document.querySelector('.main__slider__line')
const sliderImage = document.querySelector('.main__slider__image')
const sliderImageAll = document.querySelectorAll('.main__slider__image')
const sliderPrev = document.querySelector('.main__slider__btn__prev')
const sliderAfter = document.querySelector('.main__slider__btn__after')
const body = document.querySelector('body')
let sliderCount = 0
// let sliderWidth = sliderImage.offsetWidth
let sliderWidthAll = sliderImage.offsetWidth
console.log(sliderWidthAll)

// sliderPrev.addEventListener('click', nextslide);
sliderAfter.addEventListener('click',nextslide)
sliderPrev.addEventListener('click',afterslide)

function nextslide(){
  sliderCount ++;
  if (sliderCount >= sliderImageAll.length) {
    sliderCount = 0
  }
  rollSlider()
  console.log(sliderCount)
}





function afterslide(){
  sliderCount -= 1;

  if (sliderCount < 0){
    sliderCount = sliderImageAll.length-1

  }
  rollSlider()
  console.log(sliderCount)
}

function rollSlider(){
  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidthAll}px )`;
}


const mapbutton = document.querySelector('.main__content__button')
const mapfirst = document.querySelector('.map-first')
const mapsecond = document.querySelector('.map-second')
let mapCount = 0;
mapbutton.addEventListener('click',mapcheck)
function mapcheck(){
    if (mapCount === 1) {
        mapfirst.style.display = 'none'
        mapsecond.style.display = 'flex'
        mapCount = 0
    }
    else{
        mapfirst.style.display = 'flex'
        mapsecond.style.display = 'none'
        mapCount = 1
    }

}


let hide = document.getElementById('hide');
let hide1 = document.getElementById('hide1');
let hide2 = document.getElementById('hide2');
let hide3 = document.getElementById('hide3');
hide.addEventListener('click', cardDel)
function cardDel(){
  hide.style.display = 'none';
  hide1.style.display = 'none'
  hide2.style.display = 'none';
  hide3.style.display = 'none';
}

document.getElementById('card1').onclick = cardAdd1;
console.log(card1);


function cardAdd1(){
  hide1.style.display = 'flex';
  hide.style.display = 'flex';
}

document.getElementById('card2').onclick = cardAdd2;

function cardAdd2(){
  hide2.style.display = 'flex';
  hide.style.display = 'flex';
}
document.getElementById('card3').onclick = cardAdd3;

function cardAdd3(){
  hide3.style.display = 'flex';
  hide.style.display = 'flex';
}

const burger = document.querySelector(".burger__image")
burger.addEventListener("click",burgerf)
let counter = 0
function burgerf(){
  const menu = document.querySelector(".header__burger");

  if (counter == 0){
    menu.style.display = 'flex';
    counter++
    console.log(counter)
    body.style.overflow = 'hidden'


  }else if(counter == 1){
    menu.style.display = 'none';
    counter--
    console.log(counter)
    body.style.overflow = 'auto'
  }

}
