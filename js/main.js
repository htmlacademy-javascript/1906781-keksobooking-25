import './map.js';
import {drawPoints} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit, synchronizeCheckinCheckout, resetByResetClick, resetPage}  from './form.js';


getData((cards) => {
  drawPoints(cards);
  resetByResetClick(() => drawPoints(cards));
});

setUserFormSubmit(() => {
  resetPage(()=>getData((cards) => {
    drawPoints(cards);
  }));
});
synchronizeCheckinCheckout();

