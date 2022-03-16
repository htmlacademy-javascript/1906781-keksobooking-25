import {createCardsData} from './data.js';
import {renderCards, showOneCard} from './draw-cards.js';

const cards = createCardsData();

renderCards(cards);
showOneCard();

