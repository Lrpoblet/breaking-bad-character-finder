/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

// ------> buscador

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
