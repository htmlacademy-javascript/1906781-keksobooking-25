const getRandomInteger = (min, max) =>  (min < 0 || min >= max) ? 'Диапазон задан некорректно' : Math.floor(min + Math.random() * (max + 1 - min));

const getRandomFloat = (min, max, numberOfSigns) => (min < 0 || min >= max) ? 'Диапазон задан некорректно' : +(((Math.random() * (max - min) + min)).toFixed(numberOfSigns));

getRandomInteger (10, 100);
getRandomFloat (1.48, 10.52, 2);
