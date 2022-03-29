const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFieldsets = adForm.querySelectorAll('fieldset');
const mapSelects = mapFilters.querySelectorAll('select');
const mapFieldset = mapFilters.querySelector('fieldset');

const setDisabled = (element) => element.setAttribute('disabled', true);
const removeDisabled = (element) => element.removeAttribute('disabled');

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  adFieldsets.forEach(setDisabled);
  mapFilters.classList.add('map__filters--disabled');
  mapSelects.forEach(setDisabled);
  setDisabled(mapFieldset);
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  adFieldsets.forEach(removeDisabled);
  mapFilters.classList.remove('map__filters--disabled');
  mapSelects.forEach(removeDisabled);
  removeDisabled(mapFieldset);
};

export {activatePage, deactivatePage};


