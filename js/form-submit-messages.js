import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const createMessageElement = (item) => {
  const fragment = document.createDocumentFragment();
  const itemFragment = item.cloneNode(true);
  fragment.append(itemFragment);
  body.append(fragment);
};

createMessageElement(templateSuccess);
const successMessage = body.querySelector('.success');
successMessage.style.visibility = 'hidden';

createMessageElement(templateError);
const errorMessage = body.querySelector('.error');
errorMessage.style.visibility = 'hidden';

const errorButton = errorMessage.querySelector('.error__button');

const onPopUpEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage () {
  successMessage.style.visibility = 'hidden';
  errorMessage.style.visibility = 'hidden';
  document.removeEventListener('keydown', onPopUpEscKeyDown);
  document.removeEventListener('click', onMessageClick);
}

function onMessageClick () {
  closeMessage();
}

const addMessagesEvents = (node) => {
  node.addEventListener('keydown', onPopUpEscKeyDown);
  node.addEventListener('click', onMessageClick);
};
const showSuccessAlert = (() => {
  body.insertBefore(errorMessage, successMessage);
  successMessage.style.visibility = 'visible';
  addMessagesEvents(document);
});

const showErrorAlert =(() => {
  body.insertBefore(successMessage, errorMessage);
  errorMessage.style.visibility = 'visible';
  addMessagesEvents(document);
  errorButton.addEventListener('click', onMessageClick);
});

export {showSuccessAlert, showErrorAlert};
