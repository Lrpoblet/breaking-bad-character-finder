/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

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

function renderFilteredList(charactersSearchList) {
  charactersList.innerHTML = '';
  for (const characterData of charactersSearchList) {
    charactersList.appendChild(renderCharacters(characterData));
  }
  addCharactersListerers();
}

function renderFav() {
  charactersFavList.innerHTML = '';
  for (const characterFav of charactersFavData) {
    charactersFavList.appendChild(renderCharacters(characterFav));
  }
  addCCloseListerers();
}
