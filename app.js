//  declare btn, title and author variable using querySelector
const AddBookBtn = document.querySelector('.addBook');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const booksContainer = document.querySelector('.booksContainer');

// Decalre bookCollections array
let bookCollections = JSON.parse(window.localStorage.getItem('books')) || [];

// Decalare uniqueId for each books
let count = 0;
function uniqueId() {
  /* eslint-disable no-plusplus */
  const id = count++;
  return `book_${id}`;
}

// Decalre a addBooks function, push the value of title and author in the bookCollection array
function addBooks() {
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    bookCollections.push({
      id: uniqueId(),
      title: bookTitle.value,
      author: bookAuthor.value,
    });
  }
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

//  Added Collection of books part.
function renderBooks() {
  const storedBooks = JSON.parse(window.localStorage.getItem('books'));

  if (storedBooks) {
    const displayBook = storedBooks.map(
      (book) => `
              <article class="d-flex flex-row justify-content-between pb-3 border-bottom">

              <h2> ${book.title} </h2>
              <p> ${book.author} </p>

              <button onclick="removeBook('${book.id}')" class="removeBtn"> Remove </button>

              </article>

              `,
    );

    booksContainer.innerHTML = displayBook.join('');
  }
}

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
  bookCollections = bookCollections.filter((book) => book.id !== id);
  saveBooks();
  renderBooks();
}

window.addEventListener('DOMContentLoaded', () => {
  renderBooks();
});
