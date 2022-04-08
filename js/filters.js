import {clearPoints} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const roomsNumber = mapFilters.querySelector('#housing-rooms');
const housingPrice = mapFilters.querySelector('#housing-price');
const guestsNumber = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

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

const findElement = (items, innerData) => {
  let data = [];
  data = items.filter((item) => item.offer.features !== undefined);
  data = data.map((item, index, array) => {
    for (let counter = 0; counter < innerData.length; counter++) {
      if(!item.offer.features.includes(innerData[counter])) {
        array.splice(index, 1);
      }
    }
  });
  return data;
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
      housingFeatures.addEventListener('change', () => checkFeatures(sortedCards));
      clearPoints();
      drawPoints(sortedCards);
    }, RERENDER_DELAY);
  });
};

export {initFilters};
