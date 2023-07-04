//  declare btn, title and author variable using querySelector
const AddBookBtn = document.querySelector('.addBook');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const booksContainer = document.querySelector('.booksContainer');

// Decalre bookCollections array
const bookCollections = JSON.parse(window.localStorage.getItem('books')) || [];

// Decalre a addBooks function, push the value of title and author in the bookCollection array
function addBooks() {
  bookCollections.push({
    title: bookTitle.value,
    author: bookAuthor.value,
  });
}

// Decalre a clearInput function, to clear the input value unpon clicking the button
function clearInput() {
  bookTitle.value = '';
  bookAuthor.value = '';
}

// Save bookCollections to localstorage
function saveBooks() {
  window.localStorage.setItem('books', JSON.stringify(bookCollections));
}

// Render collection of books


// Add eventListener to the button, to run each both functions everytime the button is clicked
AddBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBooks();
  saveBooks();
  renderBooks();
  clearInput();
});

/* eslint-disable no-unused-vars */
function removeBook(id) {
  const indexOfBookToRemove = bookCollections.filter((book) => book.id === id);

  if (indexOfBookToRemove !== -1) {
    bookCollections.splice(indexOfBookToRemove, 1);
    saveBooks();
    renderBooks();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderBooks();
});
