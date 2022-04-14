
const initSlider = (sliderElement, validatedField, cb) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 1000,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) =>  value.toFixed(0),
      from: (value) => parseFloat(value),
    }
  }
  );
  sliderElement.noUiSlider.on('update', () => {
    validatedField.value = sliderElement.noUiSlider.get();
    cb(validatedField);
  });


  validatedField.value = '';
};

export {initSlider};
