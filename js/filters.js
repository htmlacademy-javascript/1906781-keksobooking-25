import {clearPoints} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const roomsNumber = mapFilters.querySelector('#housing-rooms');
const housingPrice = mapFilters.querySelector('#housing-price');
const guestsNumber = mapFilters.querySelector('#housing-guests');

let filterTimer = null;

const checkType = (items) => {
  if(housingType.value !== 'any'){
    return items.filter((item) => item.offer.type === housingType.value);
  }
  return items;
};
const checkPrice = (items) => {
  if(housingPrice.value !== 'any'){
    if(housingPrice.value === 'middle') {
      return items.filter((item) => item.offer.price >= 10000 && item.offer.price <= 50000);
    } else if (housingPrice.value === 'low') {
      return items.filter((item) => item.offer.price < 10000);
    } else if (housingPrice.value === 'high') {
      return items.filter((item) => item.offer.price > 50000);
    }
  }
  return items;
};

const checkRooms = (items) => {
  if(roomsNumber.value !== 'any'){
    return items.filter((item) => item.offer.rooms === +(roomsNumber.value));
  }
  return items;
};

const checkGuests = (items) => {
  if(guestsNumber.value !== 'any'){
    return items.filter((item) => item.offer.guests === +(guestsNumber.value));
  }
  return items;
};

const filterFeatures = (item, innerData) => {
  for(let i=0; i<innerData.length; i++){
    if(item.indexOf(innerData[i]) === -1) {
      return false;
    }
  }
  return true;
};

const findElement = (items, innerData) => {
  if(innerData.length !== 0) {
    return items.filter((item) => item.offer.features !== undefined).filter((item) => filterFeatures(item.offer.features, innerData));
  }
  return items;
};

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

export {initFilters};
