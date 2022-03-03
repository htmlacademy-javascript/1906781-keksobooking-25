import {getRandomPositiveInteger, getRandomPositiveFloat, getUniqueArayElement, getRandomArrayElement, getSlicedShuffledArray, generateNumbers} from './utils.js';

const FLATS_COUNT = 10;

const TITLES = [
  'Сдам квартиру 60кв.м центр города посуточно',
  'Сдам квартиру посуточно',
  'Уютная квартира со всем удобствами',
  'Квартира в новом ЖК',
  'Уютная квартира в центре'
];
const MIN_PRICE = 25000;
const MAX_PRICE = 50000;
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const MIN_ROOMS_QUANTITY = 1;
const MAX_ROOMS_QUANTITY = 5;
const MIN_GUESTS_QUANTITY = 1;
const MAX_GUESTS_QUANTITY = 10;
const CHECKIN_CHECKOUT_OPTIONS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const MIN_FEATURES_QUANTITY = 1;
const MAX_FEATURES_QUANTITY = 6;
const DESCRIPTIONS = [
  'Двухкомнатная квартира в центре города. В шаговой доступности море, и вся инфраструктура. Квартира после ремонта , светлая чистая. Одна спальня. в Зале диван раскладной, на балконе возможно поставить диван на одного человека. Кухня. Стиральная машинка',
  'Уютная квартира с новым стильным ремонтом и панорамными окнами ждет Вас. К Вашим услугам вся необходимая бытовая техника: два кондиционера, WI-FI, стиральная машина с функцией сушки и посудомоечная, телевизор smart и мебель для комфортного семейного отдыха.',
  'Уютная студия в доме премиум класса в центре Сочи в тихом районе вблизи парковой зоны.',
  'Хочу предложить Вам очень уютные, чистые квартиры, расположенные в пешей доступности до центра города Сочи. В моих квартирах сделан качественный ремонт в мае 2021 года, вся техника и мебель новая.',
  'Уютная светлая квартира, с великолепным видом на море. Вы можете наслаждаться великолепными закатами, наблюдать парусные гонки. В квартире есть всё для комфортного отдыха! '
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const MIN_PHOTOS_QUANTITY = 1;
const MAX_PHOTOS_QUANTITY = 3;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const numberOfDigits = 5;
const avatarNumbers = generateNumbers(FLATS_COUNT);
const createFlat = () => {
  const lat = getRandomPositiveFloat(MIN_LAT, MAX_LAT, numberOfDigits);
  const lng =  getRandomPositiveFloat(MIN_LNG, MAX_LNG, numberOfDigits);
  return {
    author: {
      avatar: `img/avatars/user${getUniqueArayElement(avatarNumbers)}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms:getRandomPositiveInteger(MIN_ROOMS_QUANTITY, MAX_ROOMS_QUANTITY),
      guests: getRandomPositiveInteger(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY),
      checkin: getRandomArrayElement(CHECKIN_CHECKOUT_OPTIONS),
      checkout: getRandomArrayElement(CHECKIN_CHECKOUT_OPTIONS),
      features: getSlicedShuffledArray(FEATURES, MIN_FEATURES_QUANTITY, MAX_FEATURES_QUANTITY),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getSlicedShuffledArray(PHOTOS, MIN_PHOTOS_QUANTITY, MAX_PHOTOS_QUANTITY)
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};
const createFlats = () => Array.from({length: FLATS_COUNT}, createFlat);
export {createFlats};
