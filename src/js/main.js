/* eslint-disable no-console */
'use strict';

const loading = document.querySelector('.js_loading');
const charactersList = document.querySelector('.js_characters');
const btn = document.querySelector('.js_btn');
const textInput = document.querySelector('.js_textinput');

//const charactersFavList = document.querySelector('.js_fav');

let charactersData = [];
let charactersSearch = [];
//let charactersFavData = [];

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

  //creamos el contenido
  const textTitle = document.createTextNode(charactersData.name);
  const textStatus = document.createTextNode(charactersData.occupation);
  //SUSUTITUIR POR STATUS
  imgElem.setAttribute('src', charactersData.img);
  imgElem.setAttribute('alt', `${charactersData.name}`);

  //metemos el contenido en los elementos
  titleElement.appendChild(textTitle);
  statusElement.appendChild(textStatus);

  articleElement.appendChild(imgElem);
  articleElement.appendChild(titleElement);
  articleElement.appendChild(statusElement);

  liElement.appendChild(articleElement);

  //añadimos estilos
  liElement.classList.add('li-character');
  imgElem.classList.add('img');

  const characters = liElement;
  return characters;
}

//la pintamos en el html

function renderCharactersList(charactersDataList) {
  loading.innerHTML = '';
  for (const characterData of charactersDataList) {
    charactersList.appendChild(renderCharacters(characterData));
  }
}

//rescatamos la lista del servidor

fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((data) => {
    charactersData = data;
    renderCharactersList(charactersData);
  })
  .catch((error) => {
    console.error(error);
  });

// ------> buscador

function renderFilteredList(charactersSearchList) {
  charactersList.innerHTML = '';
  for (const characterData of charactersSearchList) {
    charactersList.appendChild(renderCharacters(characterData));
  }
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

btn.addEventListener('click', handleClick);
