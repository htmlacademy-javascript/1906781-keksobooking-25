import {createCardsData} from './data.js';
import { isUndefined } from './utils.js';

const CARD_TYPES = {
  'flat': 'Квартира',
  'palace': 'Дворец',
  'hotel': 'Отель',
  'house': 'Дом',
  'bungalow': 'Бунгало'
};


const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const fragment = document.createDocumentFragment();
const cards = createCardsData();
const renderCards = (() => {

  cards.forEach(({offer, author}) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__type').textContent = CARD_TYPES[offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    const featuresContainer = cardElement.querySelector('.popup__features');
    if (isUndefined(offer.features)) {
      featuresContainer.style.display = 'none';
    } else {
      const featuresList = featuresContainer.querySelectorAll('.popup__feature');
      const modifers = offer.features.map((feature) => `popup__feature--${feature}`);
      featuresList.forEach((featuresListItem) => {
        const modifer = featuresListItem.classList[1];
        if(!modifers.includes(modifer)) {
          featuresListItem.remove();
        }
      });
    }

    if(isUndefined(offer.description)) {
      cardElement.querySelector('.popup__description').style.display = 'none';
    } else {
      cardElement.querySelector('.popup__description').textContent = offer.description;
    }

    const photosContainer = cardElement.querySelector('.popup__photos');
    if (isUndefined(offer.photos)) {
      photosContainer.style.display = 'none';
    } else {
      const img = photosContainer.querySelector('.popup__photo');
      photosContainer.removeChild(img);
      for (let count = 0; count < offer.photos.length; count++) {
        const imgElementHTML = `<img src=${offer.photos[count]} class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
        photosContainer.insertAdjacentHTML('beforeend', imgElementHTML);
      }
    }

    cardElement.querySelector('.popup__avatar').src = author.avatar;
    fragment.append(cardElement);
  });
});
renderCards();

const showFirstCard = () => {
  const mapCanvas = document.querySelector('.map__canvas');
  mapCanvas.append(fragment.firstChild);
};

export {showFirstCard};

