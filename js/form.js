import {initSlider} from './add-nouislider.js';
import {showSuccessAlert, showErrorAlert} from './form-submit-messages.js';
import {sendData} from './api.js';
import {resetMarker} from './map.js';
import {resetFilters} from './filters.js';
import {resetPhotoPreviews} from './load-photos.js';

const DEFAULT_PRICE = 1000;

const GuestsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const ErrorMessages = {
  '1': 'В 1-й комнате размещается 1 гость',
  '2': 'В 2-х комнатах размещается 2 гостя или менее',
  '3': 'В 3-х комнатах размещается 3 гостя или менее',
  '100': 'В 100 комнатах невозможно размещение гостей'
};

const form = document.querySelector('.ad-form');
const roomsNumber = form.querySelector('#room_number');
const guestsNumber = form.querySelector('#capacity');
const housingType = form.querySelector('#type');
const price = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const submitButton = form. querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

let minPrice = DEFAULT_PRICE;

const blockSubmitButton = (() => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуется...';
});

const unblockSubmitButton = (() => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
});

const getMinPrice = (value) => {
  switch (value) {
    case 'bungalow':
      return 0;
    case 'flat':
      return 1000;
    case 'hotel':
      return 3000;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
  }
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',

});

const onRoomsGuestsChange = (evt) => {
  if(evt.target.closest('#room_number') || evt.target.closest('#capacity')) {
    pristine.validate(roomsNumber);
  }
};

const validateGuestsRoomsNumber = () => GuestsOptions[roomsNumber.value].includes(guestsNumber.value);
const getGuestsErrorMessage = () => ErrorMessages[roomsNumber.value];
pristine.addValidator(roomsNumber, validateGuestsRoomsNumber, getGuestsErrorMessage);

form.addEventListener('change', onRoomsGuestsChange);

const onHousingTypeChange = () => {
  minPrice = getMinPrice(housingType.value);
  price.placeholder = minPrice;
  pristine.validate(price);
};

const validateMinPrice = () => price.value >= minPrice;
const getErrorPriceMessage = () => `Укажите цену не менее ${minPrice} руб. за ночь`;
pristine.addValidator(price, validateMinPrice, getErrorPriceMessage);

housingType.addEventListener ('change', onHousingTypeChange);

initSlider(sliderElement, price, pristine.validate);

const resetPage = () => {
  form.reset();
  sliderElement.noUiSlider.updateOptions({
    start: DEFAULT_PRICE,
  });
  price.placeholder = DEFAULT_PRICE;
  price.value = '';
  minPrice = DEFAULT_PRICE;
  resetMarker();
  pristine.reset();
  resetFilters();
  resetPhotoPreviews();
};

const resetByResetClick = () => {
  resetButton.addEventListener('click', () => {
    resetPage();
  });
};

const onFormSubmit = () => {
  resetPage();
  showSuccessAlert();
  unblockSubmitButton();
};

const onFail = () => {
  showErrorAlert();
  unblockSubmitButton();
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
        },
        () => {
          onFail();
        },
        new FormData(evt.target),
      );
    }
  });
};

const onCheckinChange = () => {
  checkout.value = checkin.value;
};

const onCheckoutChange = () => {
  checkin.value = checkout.value;
};

const synchronizeCheckinCheckout = () => {
  checkin.addEventListener('change', onCheckinChange);
  checkout.addEventListener('change', onCheckoutChange);
};


export {setUserFormSubmit, synchronizeCheckinCheckout, resetByResetClick, onFormSubmit};

