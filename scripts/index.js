/* Массив с карточками */

const initialCards = [
  {
    name: 'Дельфины',
    link: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Морской котик',
    link: 'https://images.unsplash.com/photo-1565413294262-fa587c396965?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Императорскиe пингвины',
    link: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Китовая акула',
    link: 'https://images.unsplash.com/photo-1544552866-49ce864ff896?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Манта',
    link: 'https://images.unsplash.com/photo-1510253782297-404c4da27214?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
  },
  {
    name: 'Касатка',
    link: 'https://images.unsplash.com/photo-1624807903172-57c657c75fdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
  }
];
//>------------------------------------------------------------

let popup = document.querySelector('.popup');
let cardsPopup = document.querySelector('#cards-popup');

let profileEditButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');

let popupClose = document.querySelector('.popup__close');
let closePopup = document.querySelector('#close-popup');

let getTitle = document.querySelector('.profile__title');
let getSubtitle = document.querySelector('.profile__subtitle');

let editForm = document.querySelector('.popup__container');
let editFormCards = document.querySelector('#cards-container');
let nameInput = editForm.querySelector('input[name = "username"]');
let subtitleInput = editForm.querySelector('input[name = "subtitle"]');

let formElement = document.querySelector('.popup__form');
let formCardsElement = document.querySelector('#form-cards');

let elements = document.querySelector('.elements');
let inputTitle = document.querySelector('#input-title');
let linkPicture = document.querySelector('#link-picture');

let ImagePopup = document.querySelector('#image-popup');
let zoomContainer = document.querySelector('.popup__zoom-container');
let popupImage = document.querySelector('.popup__image');
let popupDescription = document.querySelector('.popup__description');
let closeImage = document.querySelector('#close-image');
let elementsImage = document.querySelector('.elements__image');

//>------------------------------------------------------------

/* Открытие попапа. Добавление текста в форму */

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = getTitle.textContent;
  subtitleInput.value = getSubtitle.textContent;
});
//>------------------------------------------------------------

/* Функция закрытия попапа */

function close() {
  popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', close);
//>------------------------------------------------------------

/* Функция для submit */

function handleFormSubmit(evt) {
  evt.preventDefault();
  getTitle.textContent = nameInput.value;
  getSubtitle.textContent = subtitleInput.value;

  close();
}

formElement.addEventListener('submit', handleFormSubmit);
//>------------------------------------------------------------

/* Открытие попапа для карточек. */

function openCards() {
  cardsPopup.classList.add('popup_opened');
}
profileAddButton.addEventListener('click', openCards);
//>------------------------------------------------------------

/* Функция закрытия попапа для карточек */

function closeCards() {
  cardsPopup.classList.remove('popup_opened');
}

closePopup.addEventListener('click', closeCards);
//>------------------------------------------------------------

/* Добавление карточек при нажатие кнопки submit */

function handleFormNewItemSubmit(evt) {
  evt.preventDefault();

  addCard();

  formCardsElement.reset();

  closeCards();
}
formCardsElement.addEventListener('submit', handleFormNewItemSubmit);
//>------------------------------------------------------------

/* Функция добавления карточки */

function addCard() {
  elements.prepend(createNewCard(inputTitle.value, linkPicture.value));
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

  /* Функция открытия картинки */

  cardImage.addEventListener('click', function () {
    ImagePopup.classList.add('popup_opened');
  });

  //>------------------------------------------------------------
  cardImage.style.cursor = 'pointer';
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
  elements.append(createNewCard(card.name, card.link));
});
//>------------------------------------------------------------

/* Zoom карточки */
elements.addEventListener('click', function (event) {
  popupImage.src = event.target.src;
  popupDescription.textContent = event.target.alt;
});
//>------------------------------------------------------------

/* Закрытие zoom карточки */

closeImage.addEventListener('click', function () {
  ImagePopup.classList.remove('popup_opened');
});
