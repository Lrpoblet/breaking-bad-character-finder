/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

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
  event.stopPropagation();
  renderFav();
  renderCharactersList(charactersData);
}
