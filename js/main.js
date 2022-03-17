import {createCardsData} from './data.js';
import {renderCards, showOneCard} from './draw-cards.js';
import { deactivatePage, activatePage} from './active-inactive.js';

const cards = createCardsData();

renderCards(cards);
showOneCard();


const isActive = false;

if (!isActive) {
  deactivatePage();
} else {
  activatePage();
}

