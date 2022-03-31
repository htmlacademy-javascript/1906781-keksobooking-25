import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');

const onPopUpEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage () {
  if (body.contains(document.querySelector('.success'))) {
    body.removeChild(document.querySelector('.success'));
  } else {
    body.removeChild(document.querySelector('.error'));
  }
  document.removeEventListener('keydown', onPopUpEscKeyDown);
  document.removeEventListener('click', onScreenClick);
}

function onScreenClick () {
  closeMessage();
}

const addMessagesEvents = (node) => {
  node.addEventListener('keydown', onPopUpEscKeyDown);
  node.addEventListener('click', onScreenClick);
};
const showSuccessAlert = (() => {
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');
  const successFragment = document.createDocumentFragment();
  const successMessageElement = templateSuccess.cloneNode(true);
  successFragment.append(successMessageElement);
  body.append(successFragment);
  addMessagesEvents(document);
});

const showErrorAlert =(() => {
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const errorFragment = document.createDocumentFragment();
  const errorMessageElement = templateError.cloneNode(true);
  errorFragment.append(errorMessageElement);
  body.append(errorFragment);
  document.addEventListener('keydown', onPopUpEscKeyDown);
  addMessagesEvents(document);
});

export {showSuccessAlert, showErrorAlert};
