/* Импорты js файлов  */
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithConfirman from '../components/PopupWithConfirman.js';
import Api from '../components/Api.js';
import {
  profileEditButton,
  profileAddButton,
  formProfileElement,
  formCardElement,
  config,
  popupAvatarForm,
  iconPopupAvatar,
  cardConfig
} from '../components/utils/constants.js';

//>------------------------------------------------------------

/* Api */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '5ca70f3d-b1ff-450b-bde3-1054228d9549',
    'Content-Type': 'application/json'
  }
});
//>------------------------------------------------------------

/* Промис */

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);
    section.renderItems(cards.reverse());
  })
  .catch(err => {
    console.log(err);
  });
//>------------------------------------------------------------

/* Слушатель для дабавления новой карточки */

profileAddButton.addEventListener('click', function () {
  cardFormValidator.resetValidation();
  popupFormNewCard.open();
});
//>------------------------------------------------------------

/* Слушатель для дабавления профиля */

profileEditButton.addEventListener('click', function () {
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetValidation();
  popupFormProfile.open();
});
//>------------------------------------------------------------

/* Слушатель для дабавления аватара */

iconPopupAvatar.addEventListener('click', () => {
  avatarFormValidator.enableValidation();
  editPopupAvatar.open();
});
//>------------------------------------------------------------

/* Функция клика на карточку */

function handleCardClick(name, link) {
  popupImageZoom.open(name, link);
}
//>------------------------------------------------------------

/* Функция создание новых карточек */

function createNewCard(data) {
  const newCard = new Card(
    data,
    cardConfig,
    '#elements-template',
    handleCardClick,
    handleDelete,
    getId,
    id => {
      api
        .setLike(id)
        .then(res => {
          newCard.getLikesCount(res);
          newCard.changeLike(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    id => {
      api
        .deleteLike(id)
        .then(res => {
          newCard.getLikesCount(res);
          newCard.changeLike(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  );
  return newCard.generateCard();
}
//>------------------------------------------------------------

/* Функция проверки удаления карточки */

function handleDelete(data, deleteCard) {
  deleteCardPopup.open();
  deleteCardPopup.setData(data, deleteCard);
}
//>------------------------------------------------------------

/* Функция id */

function getId() {
  return userInfo.getUserId();
}
//>------------------------------------------------------------

/* Константа для попапа редактировать профиль */

const profileFormValidator = new FormValidator(config, formProfileElement);
profileFormValidator.enableValidation();
//>------------------------------------------------------------

/* Константа для попапа новое место */

const cardFormValidator = new FormValidator(config, formCardElement);
cardFormValidator.enableValidation();
//>------------------------------------------------------------

/* Константа для попапа аватар */

const avatarFormValidator = new FormValidator(config, popupAvatarForm);
avatarFormValidator.enableValidation();
//>------------------------------------------------------------

/* Костанта для попапа Zoom */

const popupImageZoom = new PopupWithImage('#image-popup');
popupImageZoom.setEventListeners();
//>------------------------------------------------------------

/* Класс Section для карточек */

const section = new Section(
  {
    renderer: cardObject => {
      const card = createNewCard(cardObject);
      section.addItem(card);
    }
  },
  '.elements'
);
//>------------------------------------------------------------

/* Селекторы для профиля */

const userInfo = new UserInfo({
  usernameSelector: '.profile__title',
  usersubtitleSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});
//>------------------------------------------------------------

/* Костанта для профиля попапа */

const popupFormProfile = new PopupWithForm({
  popupSelector: '#profile-popup',
  callbackFormSubmit: data => {
    popupFormProfile.showSaving(true);
    api
      .editUserInfo(data)
      .then(res => {
        userInfo.setUserInfo(res);
        popupFormProfile.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupFormProfile.showSaving(false);
      });
  }
});
popupFormProfile.setEventListeners();
//>------------------------------------------------------------

/* Костанта для попапа карточек */

const popupFormNewCard = new PopupWithForm({
  popupSelector: '#cards-popup',
  callbackFormSubmit: data => {
    popupFormNewCard.showSaving(true);
    api
      .addCard(data)
      .then(res => {
        const card = createNewCard(res);
        section.addItem(card);
        popupFormNewCard.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupFormNewCard.showSaving(false);
      });
  }
});
popupFormNewCard.setEventListeners();
//>------------------------------------------------------------

/* Костанта для попапа удаления карточки */

const deleteCardPopup = new PopupWithConfirman({
  popupSelector: '#delete-card',
  deleteCardApi: () => {
    const { data, deleteCard } = deleteCardPopup.getData();
    api
      .deleteCard(data._id)
      .then(() => {
        deleteCard();
        deleteCardPopup.close();
      })
      .catch(err => {
        console.log(err);
      });
  }
});
deleteCardPopup.setEventListeners();
//>------------------------------------------------------------

/* Костанта для попапа аватара */

const editPopupAvatar = new PopupWithForm({
  popupSelector: '#avatar-popup',
  callbackFormSubmit: data => {
    editPopupAvatar.showSaving(true);
    api
      .editAvatar(data)
      .then(res => {
        userInfo.setUserInfo(res);
        editPopupAvatar.close();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editPopupAvatar.showSaving(false);
      });
  }
});
editPopupAvatar.setEventListeners();
