const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.avatar_preview');
const flatPhotoChooser = document.querySelector('#images');
const flatPhotoContainer = document.querySelector('.ad-form__photo');

flatPhotoContainer.insertAdjacentHTML('afterbegin', '<img src="" alt="Аватар пользователя" width="40" height="44">');
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

export {initPhotoLoad};
