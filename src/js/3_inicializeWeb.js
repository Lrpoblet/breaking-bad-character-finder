/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

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
      loading.innerHTML =
        'There was a problem downloading the information from the server, sorry for the inconvenience.';
    });
}
