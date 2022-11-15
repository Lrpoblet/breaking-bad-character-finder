/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

// -------AL CARGAR LA PÁGINA

//creamos funcion que rescata la info del servidor y le ponemos estructura

function renderCharacters(charactersData) {
  //comprobamos si alguno de los personajes está en la lista de favoritos
  const characterFavoritedIndex = charactersFavData.findIndex(
    (eachCharacterObj) => eachCharacterObj.char_id === charactersData.char_id
  );

  //creamos variable para asignar la clase Fav y delete
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
  const textStatus = document.createTextNode(charactersData.status);
  const closeContent = document.createTextNode('x');
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
