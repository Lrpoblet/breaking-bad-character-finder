/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

//creamos listener a los articulos para seleccionar favoritos
function addCharactersListerers() {
  const allCharacters = document.querySelectorAll('.js_character');

  for (const eachCharacter of allCharacters) {
    eachCharacter.addEventListener('click', handleClickCharacter);
  }
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
