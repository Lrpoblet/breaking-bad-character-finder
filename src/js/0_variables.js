/* eslint-disable no-unused-vars */
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

//rescatamos las listas del servidor y guardamos en el local storage
const characterListStored = JSON.parse(localStorage.getItem('characterList'));
const favListStored = JSON.parse(localStorage.getItem('favList'));
