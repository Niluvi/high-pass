window.addEventListener('DOMContentLoaded', function() {
    // ____________________ anchors__________________
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function(c) {
c.preventDefault();
const blockID = anchor.getAttribute('href');
document.querySelector('' + blockID).scrollIntoView({
behavior: "smooth",
block: "start",
});
  });
};

// ____________________ burger __________________
const open = document.querySelector('.burger__open-btn');
const list = document.querySelector('.burger-list');
const close = document.querySelector('.burger-close-item');
const body = document.querySelector('.body');
const tableLink = document.querySelectorAll('.tablet-nav__link-nav')

 open.addEventListener('click', function() {
   list.classList.add('burger-list-open')
  body.classList.add('body-stop')
 })

 close.addEventListener('click', function() {
  list.classList.remove('burger-list-open')
  body.classList.remove('body-stop')
})

tableLink.forEach(s => {
  s.addEventListener('click', function() {
    list.classList.remove('burger-list-open')
    body.classList.remove('body-stop')
  })
})

 // ____________________ sarch __________________
  document.querySelector('.tablet-nav__search-active').addEventListener('click', function() {
    document.querySelector('.tablet-nav__search-cont').classList.add('tablet-nav__search-visible')
    document.querySelector('.tablet-nav__search-active').classList.add('tablet-nav__start-block')
  })

  document.querySelector('.tablet-nav__search-close').addEventListener('click', function() {
    document.querySelector('.tablet-nav__search-cont').classList.remove('tablet-nav__search-visible')
    document.querySelector('.tablet-nav__search-active').classList.remove('tablet-nav__start-block')
  })

   // ____________________ about-valid __________________
  const validAbout = new JustValidate('#about-form',
  {
    errorLabelCssClass: 'just-validate-error-label',
    errorLabelStyle: {
      color: '#F06666',
    },
  },
  ); //

  validAbout
  .addField('.about__email', [
    {
      rule: 'required',
      errorMessage: 'Заполните поле',
    },
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    },
  ])

  // __________________ contact-valid __________________
  const validCont= new JustValidate('#contact-form',
  {
    errorLabelCssClass: 'just-validate-error-label',
    errorLabelStyle: {
      color: '#FF3030',
    },
  },
  ); //

  validCont
  .addField('.contact__data-email', [
    {
      rule: 'required',
      errorMessage: 'Заполните поле',
    },
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    },
  ]) //

  .addField('.contact__data-name', [
    {
      rule: 'required',
      errorMessage: 'Заполните поле',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Не менее 3 символов',
    },

    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Не более 30 символов',
    },
  ]) //



  // MAP
    function init(){
        var myMap = new ymaps.Map("map", {
            // center: [55.76735240624188,37.62796961868461], //desktop/tablet
            center: [55.76709408854958,37.63147753300475], // mobile
            zoom: 15
        });
        // 
        // _____
        // Создание геообъекта с типом точка (метка).
        
        var myPlacemark = new ymaps.Placemark([55.770413043899865,37.63630819144057], {}, {
          iconLayout: 'default#image',
          iconImageHref: './images/png/map_marker.png',
          iconImageSize: [12, 12],
          iconImageOffset: [-10, -10]
      });
      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myPlacemark); 

      // Deleted
      myMap.controls.remove('zoomControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('typeSelector');
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('geolocationControl');
      myMap.controls.remove('rulerControl');
      myMap.controls.remove('fullscreenControl');
      myMap.behaviors.disable(['scrollZoom']);
    }
    ymaps.ready(init);

    // close-address 
    document.querySelector('.contact__close-btn').addEventListener('click', function() {
      document.querySelector('.contact__inform').classList.add('contact__inform-close')
    });
   
    
// end DOM
})