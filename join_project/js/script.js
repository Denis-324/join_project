//====================================================================================================================================
// Функция которая проверят подддреживает ли браузер формат изображений webP
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
//====================================================================================================================================

//====================================================================================================================================
// Бургер меню

const iconMenu = document.querySelector(".menu__icon");
const menu = document.querySelector(".menu");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    iconMenu.classList.toggle("_active");
    menu.classList.toggle("_active");
  });
  menu.addEventListener("click", function (e) {
    iconMenu.classList.toggle("_active");
    menu.classList.toggle("_active");
  });
}

//===================================================================================================================================
//модальные окна

//в переменную popupLinks получаем все объекты с классом .popup-link
const popupLinks = document.querySelectorAll(".popup-link");
//получаем тег body (для блокировки скрола)
const body = document.querySelector("body");
//получаем все объекты с классом .lock-padding (для того что бы контент не двиался при исчезноваении скрола)
const lockPadding = document.querySelectorAll(".lock-padding");
//перменная для устранения двойных нажатий
let unlock = true;

const timeout = 800;
// проверяем налчие перменной popupLinks
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    //каждый найденный элмент помещаем в перменную popupLink
    const popupLink = popupLinks[index];
    //вешаем на popupLink событие клик
    popupLink.addEventListener("click", function (e) {
      //убираем значем # из атрибута href
      const popupName = popupLink.getAttribute("href").replace("#", "");
      //помещаем попап найденный попап в переменную curentPopup
      const curentPopup = document.getElementById(popupName);
      //отправляем попап в функцию которая открывает попап
      popupOpen(curentPopup);
      //запрет перезагрузки страницы при клике на открытие попапа
      e.preventDefault();
    });
  }
}
//функция закрывающая попап
const popupCloseIcon = document.querySelectorAll(".close-popup");
//проверяем наличие popupCloseIcon
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    //найденные объекты помещаем в переменную el
    const el = popupCloseIcon[index];
    //вещаем событие клик
    el.addEventListener("click", function (e) {
      //при событии клик отправляем el в функцию popupClose
      // функция закроет попап у ближашего родителя с классом .popup
      popupClose(el.closest(".popup"));
      //запрет перезагрузки страницы при клике на закрытие попапа
      e.preventDefault();
    });
  }
}
//функиця открывающая попап
function popupOpen(curentPopup) {
  //проверяем наличие объекта и открыта ли переменная unlock
  if (curentPopup && unlock) {
    //получаем объект с классом .popup у которого есть класс .open
    const popupActive = document.querySelector(".popup.open");
    //и усли popupActive сущетвует, то закрываем его
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      // блокируем скрол окна браузера
      bodyLock();
    }
    //добавляем  к попапу класс open
    curentPopup.classList.add("open");
    // вещаем событие при клике
    curentPopup.addEventListener("click", function (e) {
      // проверям что бы окно не закрывось при клике на контент внутри попапа
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}
//функция закрващая попап (передаем в нее открытые попапы)
function popupClose(popupActive, doUnlock = true) {
  // проверяем , нужно ли показывать скрол при закрытии опаппа
  if (unlock) {
    //закрываем попап
    popupActive.classList.remove("open");
    if (doUnlock) {
      //запрещаем  появляться скролу если ссылка на попап находится в нутри попапа
      bodyUnLock();
    }
  }
}
//функция которая убирает скрол при открытии попаппа
function bodyLock() {
  //узнаем ширину полосы скрола
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  // добавляем к body величину ширины скролла, что бы контент не съезжал при исчезновании скрола
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
//функция которая добавляет скрол при закрытии попаппа
function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
//закрытие попапа по esc
document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});
//====================================================================================================================================

//====================================================================================================================================
//aнимация при прокрутки

//создаем класс, который будет отвечать за анимацию
const animItems = document.querySelectorAll(`._anim-items`);
// делаем проверку существовния данного класса
if (animItems.length > 0) {
  window.addEventListener(`scroll`, animOnScroll);

  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      //получем впеременную animItem каждый их элментов массива
      const animItem = animItems[index];
      //узнаем высоту полученного объекта
      const animItemHeight = animItem.offsetHeight;
      //узнаем позицию объекта относителлно верха
      const animItemOffSet = offset(animItem).top;
      //коэффициект регулирующий момент старта анимации
      const animStart = 4;
      // высота окна бруазера - высота объекта / 4
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      // если объект выше высоты окна браузера то
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      //опеделяем момент появления объекта
      if (
        pageYOffset > animItemOffSet - animItemPoint &&
        pageYOffset < animItemOffSet + animItemHeight
      ) {
        animItem.classList.add(`active-scroll`);
        // иначе мы убираем этот класс (для повтороно анимирования объекта)
      } else {
        if (!animItem.classList.contains(`_anim-no-hide`)) {
          animItem.classList.remove(`active-scroll`);
        }
      }
    }
  }
  //функция расчитывающая позицию объекта
  function offset(el) {
    const rect = el.getBoundingClientRect();
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  //задержка вызова функции
  setTimeout(() => {
    animOnScroll();
  }, 300);
}
//====================================================================================================================================

//====================================================================================================================================

//Слайдер
new Swiper(".image-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 60,
    stretch: 0,
    depth: 450,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  nested: true,
  slideToClickedSlide: false,
});
//====================================================================================================================================
new Swiper(".image-slider2", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2000,
    stopOnLastSlide: true,
    disableOnInteraction: false,
  },
  speed: 900,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
    1180: {
      slidesPerView: 4,
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
