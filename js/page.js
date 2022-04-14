import {initPhotoLoad} from './load-photos.js';
import {synchronizeCheckinCheckout} from './form.js';
import {getData} from './api.js';
import {drawPoints} from './map.js';
import {initFilters, resetPoints} from './filters.js';

const RERENDER_DELAY = 500;

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapSelects = mapFilter.querySelectorAll('select');
const mapFieldset = mapFilter.querySelector('fieldset');
const slider = adForm.querySelector('.ad-form__slider');

const setDisabled = (element) => {
  element.disabled = true;
};

const removeDisabled = (element) => {
  element.disabled = false;
};

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  adFieldsets.forEach(setDisabled);
  setDisabled(slider);
  mapFilter.classList.add('map__filters--disabled');
  mapSelects.forEach(setDisabled);
  setDisabled(mapFieldset);
};

const onMapLoad = () => {
  adForm.classList.remove('ad-form--disabled');
  adFieldsets.forEach(removeDisabled);
  removeDisabled(slider);
  initPhotoLoad();
  synchronizeCheckinCheckout();
  getData((cards) => {
    drawPoints(cards);
    initFilters(cards, RERENDER_DELAY, drawPoints);
    resetPoints(() => {
      drawPoints(cards);
    });
  });
};

const onPointsLoad = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapSelects.forEach(removeDisabled);
  removeDisabled(mapFieldset);
};

export {deactivatePage, onMapLoad, onPointsLoad};


