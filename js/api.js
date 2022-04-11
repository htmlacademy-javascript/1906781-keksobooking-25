import {showLoadAlert} from './utils.js';

const GET_DATA_ADDRESS = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_ADDRESS = 'https://25.javascript.pages.academy/keksobooking';
const MESSAGE = 'К сожалению, не удалось загрузить данные. Сервер временно недоступен.';

const getData = (onSuccess) => {
  fetch(GET_DATA_ADDRESS)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((cards) => {
            onSuccess(cards);
          });
      } else {
        throw new Error(MESSAGE);
      }
    })
    .catch(() => {
      showLoadAlert(MESSAGE);
    });
};


const sendData = (onSuccess, onFail, body)=>{
  fetch(SEND_DATA_ADDRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((responce)=>{
      if(responce.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(()=>{
      onFail();
    });
};

export {getData, sendData};


