/* eslint-disable no-console */
'use strict';

const loading = document.querySelector('.js_loading');
const charactersList = document.querySelector('.js_characters');
const charactersFavList = document.querySelector('.js_fav');
const textInput = document.querySelector('.js_textinput');
const btn = document.querySelector('.js_btn');

let charactersData = [];
let charactersSearch = [];
let charactersFavData = [];

// -------AL CARGAR LA PÁGINA

//creamos funcion que rescata la info del servidor y le ponemos estructura

function renderCharacters(charactersData) {
  //creamos los elementos
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  // ----> meto la img en un div para que no se deforme?
  const imgElem = document.createElement('img');
  const titleElement = document.createElement('h3');
  const statusElement = document.createElement('p');

  //creamos el contenido que rescataremos del servidor
  const textTitle = document.createTextNode(charactersData.name);
  const textStatus = document.createTextNode(charactersData.occupation);
  // -----> ¡¡¡¡ SUSUTITUIR POR STATUS !!!! <--------------
  imgElem.setAttribute('src', charactersData.img);
  imgElem.setAttribute('alt', `${charactersData.name}`);

  //añadimos id(gancho) para poder identificarlo y meterlo en favoritos
  liElement.setAttribute('id', `${charactersData.char_id}`);

  //metemos el contenido en los elementos
  titleElement.appendChild(textTitle);
  statusElement.appendChild(textStatus);

  articleElement.appendChild(imgElem);
  articleElement.appendChild(titleElement);
  articleElement.appendChild(statusElement);

  liElement.appendChild(articleElement);

  //añadimos estilos
  articleElement.classList.add('article-character');
  liElement.classList.add('li-character');
  liElement.classList.add('js_character');
  imgElem.classList.add('img');

  const characters = liElement;
  return characters;
}

//creamos listener a los articulos para seleccionar favoritos
function addCharactersListerers() {
  const allCharacters = document.querySelectorAll('.js_character');

  for (const eachCharacter of allCharacters) {
    eachCharacter.addEventListener('click', handleClickCharacter);
  }
}

//pintamos la información creada previamente en el HTML

function renderCharactersList(charactersDataList) {
  loading.innerHTML = '';
  for (const characterData of charactersDataList) {
    charactersList.appendChild(renderCharacters(characterData));
  }
  //activamos listener de los articulos
  addCharactersListerers();
}

//rescatamos la lista del servidor y lo guardamos en el local storage
const characterListStored = JSON.parse(localStorage.getItem('characterList'));

//creamos condicional para que en caso de que ya esté guardada la info en LS la rescate de ahí en vez de hacer petición
if (characterListStored !== null) {
  charactersData = characterListStored;
  renderCharactersList(charactersData);
} else {
  fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((data) => {
      charactersData = data;
      localStorage.setItem('characterList', JSON.stringify(charactersData));
      renderCharactersList(charactersData);
    })
    .catch((error) => {
      console.error(error);
    });
}

// ------> buscador

function renderFilteredList(charactersSearchList) {
  charactersList.innerHTML = '';
  for (const characterData of charactersSearchList) {
    charactersList.appendChild(renderCharacters(characterData));
  }
  addCharactersListerers();
}

function charactersSearched() {
  const inputValue = textInput.value.toLowerCase();
  const searchUrl = `https://breakingbadapi.com/api/characters?name=${inputValue}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      charactersSearch = data;
      renderFilteredList(charactersSearch);
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleClick(event) {
  event.preventDefault();
  charactersSearched();
}

// -------------> Favoritos

//funcion para añadirle la clase al hacer click
function selectFav(event) {
  event.currentTarget.classList.toggle('fav');
}

function addFav(event) {
  //usando attributo gancho buscamos el objeto con los datos del articulo donde se ha hecho click.
  const characterSelected = charactersData.find(
    (eachCharacterObj) =>
      //el currentTarget nos devuelve un string, por lo que lo convertimos en número
      eachCharacterObj.char_id === parseInt(event.currentTarget.id)
  );

  //guardamos el index del objeto para poder hacer el condicional y saber la posición para deseleccionar
  const characterFavoritedIndex = charactersFavData.findIndex(
    (eachCharacterObj) =>
      eachCharacterObj.char_id === parseInt(event.currentTarget.id)
  );

  //si no está en la lista de favoritos dará -1 y por tanto lo añadiremos,
  if (characterFavoritedIndex === -1) {
    charactersFavData.push(characterSelected);
  } //si da algún valor lo quitamos de favoritos utilizando su index y así sabemos desde qué posición querremos quitar
  else {
    charactersFavData.splice(characterFavoritedIndex, 1);
  }

  renderFav();
}

function renderFav() {
  charactersFavList.innerHTML = '';
  for (const characterFav of charactersFavData) {
    charactersFavList.appendChild(renderCharacters(characterFav));
  }
}

function handleClickCharacter() {
  selectFav(event);
  addFav(event);
}

function handleEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    charactersSearched();
  }
}

btn.addEventListener('click', handleClick);
textInput.addEventListener('keypress', handleEnter);
