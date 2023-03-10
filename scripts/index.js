const popupProfile = document.querySelector('#profile-popup');
const popupCardButton = document.querySelector('#cards-popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupCloseProfileButton = document.querySelector('#close-profile');
const closeCardsPopupButton = document.querySelector('#close-cards');

const getProfileTitle = document.querySelector('.profile__title');
const getProfileSubtitle = document.querySelector('.profile__subtitle');

const editProfileForm = document.querySelector('.popup__container');
const nameProfileInput = editProfileForm.querySelector('input[name = "username"]');
const subtitleProfileInput = editProfileForm.querySelector('input[name = "subtitle"]');

const formProfileElement = document.querySelector('#profile-form');
const formCardElement = document.querySelector('#form-cards');

const cardsContainer = document.querySelector('.elements');
const inputTitleCard = document.querySelector('#input-title');
const inputlinkPicture = document.querySelector('#link-picture');

const popupImageButton = document.querySelector('#image-popup');
const zoomContainer = document.querySelector('.popup__zoom-container');
const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');
const popupCloseImageButton = document.querySelector('#close-image');
const elementsImage = document.querySelector('.elements__image');
//>------------------------------------------------------------

/* Сохранение текста в попапе профиля */

function saveProfile() {
  nameProfileInput.value = getProfileTitle.textContent;
  subtitleProfileInput.value = getProfileSubtitle.textContent;
}
/* Открытие попапа */

function openPopup(popupProfile) {
  popupProfile.classList.add('popup_opened');
  saveProfile();
}

profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
});
//>------------------------------------------------------------

/* Функция закрытия попапа */

function closePopup(popupProfile) {
  popupProfile.classList.remove('popup_opened');
}

popupCloseProfileButton.addEventListener('click', function () {
  closePopup(popupProfile);
});
//>------------------------------------------------------------

/* Функция для submit */

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  getProfileTitle.textContent = nameProfileInput.value;
  getProfileSubtitle.textContent = subtitleProfileInput.value;

  closePopup(popupProfile);
}

formProfileElement.addEventListener('submit', handleFormProfileSubmit);
//>------------------------------------------------------------

/* Открытие попапа для карточек. */

profileAddButton.addEventListener('click', function () {
  openPopup(popupCardButton);
});
//>------------------------------------------------------------

/* Функция закрытия попапа для карточек */

closeCardsPopupButton.addEventListener('click', function () {
  closePopup(popupCardButton);
});
//>------------------------------------------------------------

/* Добавление карточек при нажатие кнопки submit */

function handleFormNewItemSubmit(evt) {
  evt.preventDefault();

  addCard();

  formCardElement.reset();

  closePopup(popupCardButton);
}
formCardElement.addEventListener('submit', handleFormNewItemSubmit);
//>------------------------------------------------------------

/* Функция добавления карточки */

function addCard() {
  cardsContainer.prepend(createNewCard(inputTitleCard.value, inputlinkPicture.value));
}
//>------------------------------------------------------------

/* Функция для новой карточки */

function createNewCard(newName, newLink) {
  let newCard = document.querySelector('#elements-template').content.cloneNode(true);
  let elementsItem = newCard.querySelector('.elements__item');
  let cardTitle = newCard.querySelector('.elements__title');
  let cardImage = newCard.querySelector('.elements__image');

  cardTitle.textContent = newName;
  cardImage.setAttribute('src', newLink);
  cardImage.setAttribute('alt', cardTitle.textContent);
  //>------------------------------------------------------------

  /* Zoom карточки */

  cardsContainer.addEventListener('click', function (event) {
    popupImage.src = event.target.cardImage;
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupDescription.textContent = event.target.alt;
    console.log(cardImage);
  });
  //>------------------------------------------------------------

  /* Функция открытия картинки */

  cardImage.addEventListener('click', function () {
    openPopup(popupImageButton);
  });
  //>------------------------------------------------------------

  /* Функция для изменения сердечка на черное */

  elementsItem.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  //>------------------------------------------------------------

  /* Удаление карточки */

  const elementsDelete = newCard.querySelector('.elements__delete');
  function deleteImage() {
    const elementsContainer = elementsDelete.closest('.elements__item');
    elementsContainer.remove();
  }

  elementsDelete.addEventListener('click', deleteImage);

  return newCard;
}
//>------------------------------------------------------------

/* Функция для перебирание карточек в массиве */

initialCards.forEach(card => {
  cardsContainer.append(createNewCard(card.name, card.link));
});
//>------------------------------------------------------------

/* Закрытие zoom карточки */

popupCloseImageButton.addEventListener('click', function () {
  closePopup(popupImageButton);
});
