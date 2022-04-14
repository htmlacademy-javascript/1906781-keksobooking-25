
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
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    validatedField.value = sliderElement.noUiSlider.get();
    cb(validatedField);
  });


  validatedField.value = '';
};

export {initSlider};
