'use strict';

document.querySelector('.map').classList.remove('map--faded');

var types = ['flat', 'house', 'bungalo'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var minPrice = 1000;
var maxPrice = 1000000;
var rooms = ['1 комната', '2 комнаты', '3 комнаты', '4 комнаты', '5 комнат'];
var minGuest = 1;
var maxGuest = 6;
var times = ['12-00', '13-00', '14-00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var featuresMin = 0;
var featuresMax = featuresList.length;
var minXLocation = 300;
var maxXLocation = 900;
var minYLocation = 100;
var maxYLocation = 500;

var similarAds = [];

for (var i = 1; i <= 8; i++) {
  similarAds.push(makeObjectOnMap());
}

var similarButtonElement = document.querySelector('.map__pins');
var similarButtonTemplate = document.querySelector('template').content.querySelector('button.map__pin');

var similarArticleTemplate = document.querySelector('template').content.querySelector('article');
var similarArticleElement = document.querySelector('section.map');

// Вставляем кнопки
var fragment = document.createDocumentFragment();
for (i = 0; i < 8; i++) {
  fragment.appendChild(renderButtonMap(similarAds));
  var fragmentArticle = fragment.appendChild(renderArticleMap(similarAds));
}
similarButtonElement.appendChild(fragment); // отрисовка кнопки
similarArticleElement.appendChild(fragmentArticle); // отрисовка описания

function makeObjectOnMap() {
  var xCoord = getRandomNumber(minXLocation, maxXLocation);
  var yCoord = getRandomNumber(minYLocation, maxYLocation);

  return {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: titles[i - 1],
      address: xCoord + ', ' + yCoord,
      price: getRandomNumber(minPrice, maxPrice),
      type: getRandomNumberOfArray(types),
      rooms: getRandomNumberOfArray(rooms),
      guests: getRandomNumber(minGuest, maxGuest),
      checkin: getRandomNumberOfArray(times),
      checkout: getRandomNumberOfArray(times),
      features: makeRandomLengthArray(featuresList),
      description: '',
      photos: []
    },
    location: {
      x: xCoord,
      y: yCoord
    }
  };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumberOfArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function makeRandomLengthArray(array) {
  return array.slice(getRandomNumber(featuresMin, featuresMax));
}

function renderButtonMap(array) {
  var buttonElement = similarButtonTemplate.cloneNode(true);
  buttonElement.querySelector('img').src = array[i].author.avatar;
  buttonElement.style.left = array[i].location.x - 20 + 'px';
  buttonElement.style.top = array[i].location.y - 20 + 'px';

  return buttonElement;
}

function renderArticleMap(array) {
  var articleElement = similarArticleTemplate.cloneNode(true);
  articleElement.querySelector('h3').textContent = array[i].offer.title;
  articleElement.querySelector('small').textContent = array[i].offer.address;
  articleElement.querySelector('.popup__price').textContent = array[i].offer.price + '&#x20BD;/ночь';

  var typeOfAccommodation;
  if (array[i].offer.type === 'flat') {
    typeOfAccommodation = 'Квартира';
  } else if (array[i].offer.type === 'bungalo') {
    typeOfAccommodation = 'Бунгало';
  } else {
    typeOfAccommodation = 'Дом';
  }

  articleElement.querySelector('h4').textContent = typeOfAccommodation;
  articleElement.querySelector('h4').nextElementSibling.textContent = array[i].offer.rooms + ' для ' + array[i].offer.guests + ' гостей';
  articleElement.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + array[i].offer.checkin + ', выезд до ' + array[i].offer.checkout;
  var listItems = [];
  for (var j = 0; j < array[i].offer.features.length; j++) {
    listItems.push('<li class="feature feature--' + array[i].offer.features[j] + '"></li>');
  }
  articleElement.querySelector('.popup__features').innerHTML = listItems.join(' ');
  articleElement.querySelector('.popup__avatar').src = array[i].author.avatar;

  return articleElement;
}
