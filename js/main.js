import { deactivatePage } from './active-inactive.js';
import {enableOfferForm, drawPoints} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit, resetByResetClick, onFormSubmit}  from './form.js';
import {initFilters} from './filters.js';
const RERENDER_DELAY = 2000;

deactivatePage();
enableOfferForm();
resetByResetClick();
getData((cards) => {
  drawPoints(cards);
  initFilters(cards, RERENDER_DELAY, drawPoints);
});

setUserFormSubmit(onFormSubmit);


