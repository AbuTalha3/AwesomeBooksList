import handleNav from './modules/navbar.js';
import BookCollection from './modules/bookCollection.js';

handleNav();
const collections = new BookCollection();
collections.init();
