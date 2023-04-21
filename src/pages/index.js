/* Импорты js файлов  */
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import { initialCards } from '../components/utils/array.js';
import {
  profileEditButton,
  profileAddButton,
  formProfileElement,
  formCardElement,
  config
} from '../components/utils/constants.js';

//>------------------------------------------------------------

/* Константа для попапа редактировать профиль */

const profileFormValidator = new FormValidator(config, formProfileElement);
profileFormValidator.enableValidation();
//>------------------------------------------------------------

/* Константа для попапа новое место */

const cardFormValidator = new FormValidator(config, formCardElement);
cardFormValidator.enableValidation();
//>------------------------------------------------------------

const userInfo = new UserInfo({
  usernameSelector: '.profile__title',
  usersubtitleSelector: '.profile__subtitle'
});
//>------------------------------------------------------------

/* Класс Section для карточек */

const section = new Section(
  {
    items: initialCards.reverse(),
    renderer: cardObject => {
      const card = createNewCard(cardObject);
      section.addItem(card);
    }
  },
  '.elements'
);

section.renderItems();
//>------------------------------------------------------------

profileEditButton.addEventListener('click', function () {
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetValidation();
  popupFormProfile.open();
});
//>------------------------------------------------------------

profileAddButton.addEventListener('click', function () {
  cardFormValidator.resetValidation();
  popupFormNewCard.open();
});
//>------------------------------------------------------------

/* Костанта для профиля попапа */

const popupFormProfile = new PopupWithForm('#profile-popup', {
  callbackFormSubmit: data => {
    userInfo.setUserInfo(data.username, data.subtitle);
    popupFormProfile.close();
  }
});
//>------------------------------------------------------------

/* Костанта для попапа карточек */

const popupFormNewCard = new PopupWithForm('#cards-popup', {
  callbackFormSubmit: cardObject => {
    const card = createNewCard(cardObject);
    section.addItem(card);
    popupFormNewCard.close();
  }
});

popupFormProfile.setEventListeners();
popupFormNewCard.setEventListeners();
//>------------------------------------------------------------

/* Костанта для попапа Zoom */

const popupImageZoom = new PopupWithImage('#image-popup');
popupImageZoom.setEventListeners();

/* Функция клика на карточку */

function handleCardClick(name, link) {
  popupImageZoom.open(name, link);
}

/* Функция создание новых карточек */

function createNewCard(data) {
  const newCard = new Card(data, '#elements-template', handleCardClick);
  return newCard.generateCard();
}
