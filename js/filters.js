import {clearPoints} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const roomsNumber = mapFilters.querySelector('#housing-rooms');
const housingPrice = mapFilters.querySelector('#housing-price');
const guestsNumber = mapFilters.querySelector('#housing-guests');

let filterTimer = null;

const checkType = (item) => housingType.value === 'any' ? true : item.offer.type === housingType.value;

const checkPrice = (item) => {
  if (housingPrice.value === 'any') {
    return true;
  } else {
    switch (housingPrice.value) {
      case 'middle':
        return item.offer.price >= 10000 && item.offer.price <= 50000;
      case 'low':
        return item.offer.price < 10000;
      case 'high':
        return item.offer.price > 50000;
    }
  }
};

const checkRooms = (item) => roomsNumber.value === 'any' ? true : item.offer.rooms === +(roomsNumber.value);
const checkGuests = (item) => guestsNumber.value === 'any' ? true : item.offer.guests === +(guestsNumber.value);

const filterFeatures = (item, innerData) => {
  for(let i=0; i<innerData.length; i++){
    if(item.indexOf(innerData[i]) === -1) {
      return false;
    }
  }
  return true;
};

const findElement = (item, innerData) => innerData.length === 0 ? true : item.offer.features !== undefined && filterFeatures(item.offer.features, innerData);

const checkFeatures = (item) => {
  const selectedFeatures = Array.from(mapFilters.querySelectorAll('input[name = "features"]:checked')).map((element) => element.value);
  return findElement(item, selectedFeatures);
};

const filterItem = (item) => checkType(item)&&checkPrice(item)&&checkGuests(item)&&checkRooms(item)&&checkFeatures(item);

const initFilters = (cards, RERENDER_DELAY, drawPoints) => {
  mapFilters.addEventListener('change', () => {
    clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      let sortedCards = [...cards];
      sortedCards = sortedCards.filter((item) => (filterItem(item)));
      clearPoints();
      drawPoints(sortedCards);
    }, RERENDER_DELAY);
  });
};

const resetFilters = () => {
  mapFilters.reset();
};

const resetPoints = (cb) => {
  mapFilters.addEventListener('reset', () => {
    clearPoints();
    cb();
  });
};

export {initFilters, resetFilters, resetPoints};
