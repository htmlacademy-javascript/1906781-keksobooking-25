import { deactivatePage } from './page.js';
import {enableOfferForm, drawPoints} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit, resetByResetClick, onFormSubmit}  from './form.js';
import {initFilters, resetPoints} from './filters.js';

const RERENDER_DELAY = 1000;

deactivatePage();
enableOfferForm();
resetByResetClick();
getData((cards) => {
  drawPoints(cards);
  initFilters(cards, RERENDER_DELAY, drawPoints);
  resetPoints(() => {
    drawPoints(cards);
  });
});

setUserFormSubmit(onFormSubmit);


