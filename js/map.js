import {activatePage, deactivatePage} from './active-inactive.js';
import {renderCard} from './draw-cards.js';
const address = document.querySelector('#address');

deactivatePage();

const map = L.map('map-canvas')
  .on('load', activatePage)
  .setView({
    lat: 35.68949,
    lng: 139.69171,
  },10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.68949,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

marker.addTo(map);

marker.on('drag', (evt) => {
  address.value = evt.target.getLatLng();
  const latlng = evt.target.getLatLng();
  address.value = `${(latlng.lat).toFixed(5)}, ${(latlng.lng).toFixed(5)}`;
});

const resetMarker = () => {
  const latlng = L.latLng(35.68949, 139.69171);
  marker.setLatLng(latlng);
};

const pointsGroup = L.layerGroup().addTo(map);

const pointIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const drawPoint = (card) => {
  const {location} = card;
  const point = L.marker({
    lat: location.lat,
    lng: location.lng
  },
  {
    icon: pointIcon,
  });
  point
    .addTo(pointsGroup)
    .bindPopup(renderCard(card));
};

const drawPoints = (cards) => {
  cards.forEach((card) => {
    drawPoint(card);
  });
};

const clearPoints = () => {
  pointsGroup.clearLayers();
};

export {drawPoints, resetMarker, clearPoints};
