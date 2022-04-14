const getHousingType = (value) => {
  switch(value) {
    case 'flat':
      return 'Квартира';
    case 'hotel':
      return 'Отель';
    case 'palace':
      return 'Дворец';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
  }
};

const renderFeatures = ((object, element) => {
  const featuresContainer = element.querySelector('.popup__features');
  if ('features' in object) {
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    const modifers = object.features.map((feature) => `popup__feature--${feature}`);
    featuresList.forEach((featuresListItem) => {
      const modifer = featuresListItem.classList[1];
      if(!modifers.includes(modifer)) {
        featuresListItem.remove();
      }
    });
  } else {
    featuresContainer.style.display = 'none';
  }
});

const renderOfferPhotos = ((object, element) => {
  const photosContainer = element.querySelector('.popup__photos');
  if ('photos' in object) {
    const img = photosContainer.querySelector('.popup__photo');
    photosContainer.removeChild(img);
    object.photos.forEach((item) => {
      const imgElementHTML = `<img src=${item} class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
      photosContainer.insertAdjacentHTML('beforeend', imgElementHTML);
    });
  } else {
    photosContainer.style.display = 'none';
  }
});

const renderCard = (({offer, author}) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getHousingType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  renderFeatures(offer, cardElement);

  if('description' in offer) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    cardElement.querySelector('.popup__description').style.display = 'none';
  }

  renderOfferPhotos(offer, cardElement);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  return cardElement;
});


export {renderCard};

