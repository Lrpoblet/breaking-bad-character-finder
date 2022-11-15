/* eslint-disable no-console */
'use strict';

const loading = document.querySelector('.js_loading');
const charactersList = document.querySelector('.js_characters');
const charactersFavList = document.querySelector('.js_fav');
const textInput = document.querySelector('.js_textinput');
const btn = document.querySelector('.js_btn');
const btnDelete = document.querySelector('.js_btn-delete');
const btnAllCharacters = document.querySelector('.js_all');

let charactersData = [];
let charactersSearch = [];
let charactersFavData = [];

// -------AL CARGAR LA PÁGINA

//creamos funcion que rescata la info del servidor y le ponemos estructura

function renderCharacters(charactersData) {
  //comprobamos si alguno de los personajes está en la lista de favoritos
  const characterFavoritedIndex = charactersFavData.findIndex(
    (eachCharacterObj) => eachCharacterObj.char_id === charactersData.char_id
  );

  //creamos variable para asignar la clase Fav
  let classFav = '';
  let classDelete = '';
  //devuelve -1 si no es favorito
  if (characterFavoritedIndex === -1) {
    classFav = 'none';
    classDelete = 'hidden';
  } else {
    classFav = 'fav';
    classDelete = 'close';
  }

  //creamos los elementos
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const imgElem = document.createElement('img');
  const titleElement = document.createElement('h3');
  const statusElement = document.createElement('p');
  const close = document.createElement('p');

  //creamos el contenido que rescataremos del servidor
  const textTitle = document.createTextNode(charactersData.name);
  const textStatus = document.createTextNode(charactersData.occupation);
  const closeContent = document.createTextNode('x');
  // -----> ¡¡¡¡ SUSUTITUIR POR STATUS !!!! <--------------
  imgElem.setAttribute('src', charactersData.img);
  imgElem.setAttribute('alt', `${charactersData.name}`);

  //añadimos id(gancho) para poder identificarlo y meterlo en favoritos
  liElement.setAttribute('id', `${charactersData.char_id}`);
  close.setAttribute('id', `${charactersData.char_id}`);

  //metemos el contenido en los elementos
  titleElement.appendChild(textTitle);
  statusElement.appendChild(textStatus);
  close.appendChild(closeContent);

  articleElement.appendChild(imgElem);
  articleElement.appendChild(titleElement);
  articleElement.appendChild(statusElement);
  articleElement.appendChild(close);
  liElement.appendChild(articleElement);

  //añadimos estilos
  articleElement.classList.add('article-character');
  liElement.classList.add('js_character');
  imgElem.classList.add('img');
  close.classList.add(classDelete);
  close.classList.add('js_close');
  liElement.classList.add(classFav);

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
  charactersList.innerHTML = '';
  for (const characterData of charactersDataList) {
    charactersList.appendChild(renderCharacters(characterData));
  }
  //activamos listener de los articulos
  addCharactersListerers();
}

//rescatamos las listas del servidor y guardamos en el local storage
const characterListStored = JSON.parse(localStorage.getItem('characterList'));
const favListStored = JSON.parse(localStorage.getItem('favList'));

//creamos if para que en caso de que exista una lista de favoritos guardada en el local storage, la pinte
if (favListStored !== null) {
  charactersFavData = favListStored;
  renderFav();
}

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

function handleEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    charactersSearched();
  }
}

function handleClickAll(event) {
  event.preventDefault();
  renderCharactersList(charactersData);
  textInput.value = '';
}

// -------------> Favoritos

//funcion para añadirle la clase al hacer click
function selectFav(event) {
  event.currentTarget.classList.remove('none');
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

  //si no está en la lista de favoritos dará -1 y por tanto lo añadiremos, en ambos casos lo guardamos en el local storage
  if (characterFavoritedIndex === -1) {
    charactersFavData.push(characterSelected);
    localStorage.setItem('favList', JSON.stringify(charactersFavData));
  } //si da algún valor lo quitamos de favoritos utilizando su index y así sabemos desde qué posición querremos quitar
  else {
    charactersFavData.splice(characterFavoritedIndex, 1);
    localStorage.setItem('favList', JSON.stringify(charactersFavData));
  }

  renderFav();
}

function renderFav() {
  charactersFavList.innerHTML = '';
  for (const characterFav of charactersFavData) {
    charactersFavList.appendChild(renderCharacters(characterFav));
  }
  addCCloseListerers();
}

function handleClickCharacter(event) {
  selectFav(event);
  addFav(event);
}

// -------------> Borrar favoritos

//Borrar todos

function deleteFavCharacters() {
  charactersFavList.innerHTML = '';
  charactersFavData = [];

  localStorage.setItem('favList', JSON.stringify(charactersFavData));
}

function handleClickDelete() {
  deleteFavCharacters();
  renderCharactersList(charactersData);
}

//Borrar seleccionado

function handleClose(event) {
  //guardamos el index del objeto para poder hacer el condicional y saber la posición para deseleccionar
  const characterFavoritedIndex = charactersFavData.findIndex(
    (eachCharacterObj) =>
      eachCharacterObj.char_id === parseInt(event.currentTarget.id)
  );

  //si devuelve posicion es que está en la lista y por tanto lo queremos quitar
  if (characterFavoritedIndex !== -1) {
    charactersFavData.splice(characterFavoritedIndex, 1);

    localStorage.setItem('favList', JSON.stringify(charactersFavData));
  }

  renderFav();
  renderCharactersList(charactersData);
}

function addCCloseListerers() {
  const allCloses = document.querySelectorAll('.js_close');

  for (const eachCharacter of allCloses) {
    eachCharacter.addEventListener('click', handleClose);
  }
}

btn.addEventListener('click', handleClick);
textInput.addEventListener('keypress', handleEnter);
btnDelete.addEventListener('click', handleClickDelete);
btnAllCharacters.addEventListener('click', handleClickAll);
