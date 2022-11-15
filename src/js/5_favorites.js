/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

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

function handleClickCharacter(event) {
  selectFav(event);
  addFav(event);
}
