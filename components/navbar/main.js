import { DOCUMENTATION } from './constants';
import './style.css';

const favorites = DOCUMENTATION.filter((doc) => doc.favorite);
const searchInput = document.querySelector('#menu-search');
const searchContainer = document.querySelector('.search-container');
const menuButton = document.querySelector('#menu-toggle');
const menuContent = document.querySelector('.menu-content');
const createLiTemplate = (url, title) => `
  <li>
    <a href="${url}" target="_blank">${title}</a>
  </li>
`;

const createUl = (listId, elementList) => {
    const ulTag = document.createElement('ul');
    ulTag.id = listId;
    elementList.forEach((element) => {
        const liTemplate = createLiTemplate(element.url, element.title);
        ulTag.innerHTML += liTemplate;
    });

    return ulTag;
};
const normalizeText = (text) => text.trim().toLowerCase();
const setupFavoritesList = () => {
    const favoritesListElement = document.querySelector('.menu-content>.favs');
    const favoritesUL = createUl('favs-list', favorites);
    favoritesListElement.append(favoritesUL);
};

const handleSearch = (ev) => {
    const { value } = ev.target; // los {} son para decir que queremos del objeto target la propiedad value
    const normalizedValue = normalizeText(value);
    const filteredDocumentation = DOCUMENTATION.filter((doc) => {
        const normalizedTitle = normalizeText(doc.title);
        return normalizedTitle.includes(normalizedValue);
    });

    const searchResultList = createUl('search-results', filteredDocumentation);
    const intermediateUl = document.querySelector('#search-results');
    if (intermediateUl) {
        intermediateUl.remove();
    }
    searchContainer.append(searchResultList);
};

const toggleMenu = () => {
    menuContent.classList.toggle('menu-content--show');
};

setupFavoritesList();

searchInput.addEventListener('input', handleSearch);
menuButton.addEventListener('click', toggleMenu);
