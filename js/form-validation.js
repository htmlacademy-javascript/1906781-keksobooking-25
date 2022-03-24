import {initSlider} from './add-nouislider.js';

const form = document.querySelector('.ad-form');
const roomsNumber = form.querySelector('#room_number');
const guestsNumber = form.querySelector('#capacity');
const housingType = form.querySelector('#type');
const price = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const guestsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const errorMessages = {
  '1': 'В 1-й комнате размещается 1 гость',
  '2': 'В 2-х комнатах размещается 2 гостя или менее',
  '3': 'В 3-х комнатах размещается 3 гостя или менее',
  '100': 'В 100 комнатах невозможно размещение гостей'
};

const minPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
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

const validateGuestsRoomsNumber = () => guestsOptions[roomsNumber.value].includes(guestsNumber.value);
const getGuestsErrorMessage = () => errorMessages[roomsNumber.value];
pristine.addValidator(roomsNumber, validateGuestsRoomsNumber, getGuestsErrorMessage);

form.addEventListener('change', onRoomsGuestsChange);

const onHousingTypeChange = () => {
  price.placeholder = minPrices[housingType.value];
  pristine.validate(price);
};

const validateMinPrice = () => price.value >= minPrices[housingType.value];
const getErrorPriceMessage = () => `Укажите цену не менее ${minPrices[housingType.value]} руб. за ночь`;
pristine.addValidator(price, validateMinPrice, getErrorPriceMessage);


housingType.addEventListener ('change', onHousingTypeChange);

initSlider(sliderElement, price, pristine.validate);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const initValidation = () => {
  form.addEventListener('submit', onFormSubmit);
};

const validatePrice = () => {
  pristine.validate(price);
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

synchronizeCheckinCheckout();


export {initValidation, synchronizeCheckinCheckout, validatePrice};

