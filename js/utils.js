const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getUniqueArayElement = (elements) => elements.splice(getRandomPositiveInteger(0, elements.length - 1), 1)[0];

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getSlicedShuffledArray = (elements, a, b) => {
  const copyOfItems = elements.slice();
  const result = [];
  while (copyOfItems.length > 0) {
    const random = getRandomPositiveInteger(0, copyOfItems.length - 1);
    const elem = copyOfItems.splice(random, 1)[0];
    result.push(elem);
  }
  return result.slice(0, getRandomPositiveInteger(a, b));
};

const generateNumbers = (arrayLength) => Array.from({length: arrayLength}, (item, number) => {
  number = number + 1;
  if(number < arrayLength) {
    number = `0${number}`;
  }
  return number;
});

const isUndefined = (item) => item === undefined;

export {getRandomPositiveInteger, getRandomPositiveFloat, getUniqueArayElement, getRandomArrayElement, getSlicedShuffledArray, generateNumbers, isUndefined};
