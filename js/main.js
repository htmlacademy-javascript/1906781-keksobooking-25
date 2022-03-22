import {createCardsData} from './data.js';
import {renderCards, showOneCard} from './draw-cards.js';
import { deactivatePage, activatePage} from './active-inactive.js';
import {initValidation}  from './form-validation.js';
const cards = createCardsData();

renderCards(cards);
showOneCard();


const isActive = true;

if (!isActive) {
  deactivatePage();
} else {
  activatePage();
}

initValidation();
