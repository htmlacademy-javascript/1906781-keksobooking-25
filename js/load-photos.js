const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.avatar_preview');
const flatPhotoChooser = document.querySelector('#images');
const flatPhotoContainer = document.querySelector('.ad-form__photo');

flatPhotoContainer.insertAdjacentHTML('afterbegin', '<img src="" alt="Фото объекта размещения" width="40" height="44">');
const flatPhotoPreview = flatPhotoContainer.querySelector('img');
flatPhotoPreview.style.visibility = 'hidden';

const loadPhoto = (photoChooser, photoPreview) => {
  photoChooser.addEventListener('change', () => {
    const file = photoChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      photoPreview.src = URL.createObjectURL(file);
    }
    photoPreview.style.visibility = 'visible';
  });
};

const initPhotoLoad = () => {
  loadPhoto(avatarChooser, avatarPreview);
  loadPhoto(flatPhotoChooser, flatPhotoPreview);
};

const resetPhotoPreviews = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  flatPhotoPreview.src = '';
  flatPhotoPreview.style.visibility = 'hidden';
};

export {initPhotoLoad, resetPhotoPreviews};
