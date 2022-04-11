import {clearPoints} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const roomsNumber = mapFilters.querySelector('#housing-rooms');
const housingPrice = mapFilters.querySelector('#housing-price');
const guestsNumber = mapFilters.querySelector('#housing-guests');

let filterTimer = null;

const checkType = (items) => housingType.value !== 'any' ? items.filter((item) => item.offer.type === housingType.value) : items;

const checkPrice = (items) => {
  switch(housingPrice.value) {
    case 'middle':
      return items.filter((item) => item.offer.price >= 10000 && item.offer.price <= 50000);
    case 'low':
      return items.filter((item) => item.offer.price < 10000);
    case 'high':
      return items.filter((item) => item.offer.price > 50000);
    default:
      return items;
  }
};

const checkRooms = (items) => roomsNumber.value !== 'any' ? items.filter((item) => item.offer.rooms === +(roomsNumber.value)) : items;

const checkGuests = (items) => guestsNumber.value !== 'any' ? items.filter((item) => item.offer.guests === +(guestsNumber.value)) : items;

const filterFeatures = (item, innerData) => {
  for(let i=0; i<innerData.length; i++){
    if(item.indexOf(innerData[i]) === -1) {
      return false;
    }
  }
  return true;
};

const findElement = (items, innerData) => innerData.length !== 0 ? items.filter((item) => item.offer.features !== undefined).filter((item) => filterFeatures(item.offer.features, innerData)) : items;

const checkFeatures = (items) => {
  const features = mapFilters.querySelectorAll('input[type = "checkbox"]:checked');
  const selectedFeatures = [];
  features.forEach((feature) => {
    selectedFeatures.push(feature.value);
  });
  return findElement(items, selectedFeatures);
};

const initFilters = (cards, RERENDER_DELAY, drawPoints) => {
  mapFilters.addEventListener('change', () => {
    clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      let sortedCards = [...cards];
      sortedCards = checkType(sortedCards);
      sortedCards = checkRooms(sortedCards);
      sortedCards = checkGuests(sortedCards);
      sortedCards = checkPrice(sortedCards);
      sortedCards = checkFeatures(sortedCards);
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
