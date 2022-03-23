import {createCardsData} from './data.js';
import {renderCards, showOneCard} from './draw-cards.js';
import {initValidation, synchronizeCheckinCheckout}  from './form-validation.js';
const cards = createCardsData();

renderCards(cards);
showOneCard();

initValidation();
synchronizeCheckinCheckout();
