const popupProfile = document.querySelector('#profile-popup');
const popupCardButton = document.querySelector('#cards-popup');

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

const popupCloseProfileButton = document.querySelector('#close-profile');
const closeCardsPopupButton = document.querySelector('#close-cards');

const getProfileTitle = document.querySelector('.profile__title');
const getProfileSubtitle = document.querySelector('.profile__subtitle');

const editProfileForm = document.querySelector('.popup__container');
const nameProfileInput = editProfileForm.querySelector('input[name = "username"]');
const subtitleProfileInput = editProfileForm.querySelector('input[name = "subtitle"]');

export const formProfileElement = document.querySelector('#profile-form');
export const formCardElement = document.querySelector('#form-cards');

const cardsContainer = document.querySelector('.elements');
const inputTitleCard = document.querySelector('#input-title');
const inputlinkPicture = document.querySelector('#link-picture');

const popupImageButton = document.querySelector('#image-popup');
const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');
const popupCloseImageButton = document.querySelector('#close-image');
//>------------------------------------------------------------

/* Селекторы для формы */

export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
};
