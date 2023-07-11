import addBookToCollections from './addBookToColllection.js';

export default class BookCollection {
  constructor() {
    // array that hold the books list
    this.books = JSON.parse(localStorage.getItem('books')) || [];

    // Get the error elements for author and title
    this.errorElements = {
      author: document.getElementById('authorError'),
      title: document.getElementById('titleError'),
    };
  }

  init() {
    addBookToCollections(this);
  }

  addBook(book) {
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  showError(type, message) {
    const errorElement = this.errorElements[type];
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById(type).style.marginBottom = '1rem';
    this.resetInputError();
  }

  resetInputError() {
    setTimeout(() => {
      this.errorElements.title.style.display = 'none';
      this.errorElements.author.style.display = 'none';
    }, 2000);
  }

  renderBookList() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    // List books page header
    const h1 = document.createElement('h1');
    h1.textContent = 'Awesome Books Data';
    bookList.appendChild(h1);

    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.removeBook(index);
        this.renderBookList();
      });

      li.appendChild(removeBtn);
      bookList.appendChild(li);
    });
  }
}
