const form = document.querySelector('.ad-form');
const roomsNumber = form.querySelector('#room_number');
const guestsNumber = form.querySelector('#capacity');
const guestsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const messagesForErrors = {
  '1': 'В 1-й комнате размещается 1 гость',
  '2': 'В 2-х комнатах размещается 2 гостя или менее',
  '3': 'В 3-х комнатах размещается 3 гостя или менее',
  '100': 'В 100 комнатах невозможно размещение гостей'
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
});

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const onRoomsOrGuestsNumberChange = (evt) => {
  if(evt.target.closest('#room_number') || evt.target.closest('#capacity')) {
    pristine.validate(roomsNumber);
  }
};

const validateGuestsAndRoomsNumber = () => guestsOptions[roomsNumber.value].includes(guestsNumber.value);
const getGuestsErrorMessage = () => messagesForErrors[roomsNumber.value];
pristine.addValidator(roomsNumber, validateGuestsAndRoomsNumber, getGuestsErrorMessage);

form.addEventListener('change', onRoomsOrGuestsNumberChange);

const initValidation = () => {
  form.addEventListener('submit', onFormSubmit);
};

export {initValidation};

