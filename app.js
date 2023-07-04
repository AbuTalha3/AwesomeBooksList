// book class : represents a book
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// UI class handle UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    UI.addBookTolList(books);
  }

  static addBookTolList(books) {
    // const list = document.querySelector('#book-list');
    console.log(books);
    const row = document.querySelector('.booksContainer');
    const bookList = books.map(
      (book) => `
            <article class="d-flex flex-row justify-content-between">
            <h2>${book.title}</h2>
            <h4>${book.author}</h4>
            <button class="btn btn-danger btn-sm">remove</button></article>
    `,
    );

    row.innerHTML = bookList.join('');

    // list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // vanish in three seconds
    setTimeout(() => document.querySelector('.alret').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

//  store class handles storage, store the book name class
class Store {
  static getBooks() {
    let books = JSON.parse(localStorage.getItem('books')) || [];

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  //   Declare unique Id
  static uniqueId() {
    let count = 0;
    const id = count++;
    return `book_${id}`;
  }

  static removeBook(id) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// event: display books
window.addEventListener('DOMContentLoaded', UI.displayBooks);

// event: add book
const addBook = document.querySelector('.addBook');

addBook.addEventListener('click', (e) => {
  // prevent actual submit
  e.preventDefault();

  console.log('here');
  // get form values
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const Id = Store.uniqueId();
  // validate
  if (title.value === '' || author.value === '') {
    UI.showAlert('please fill in all feilds', 'danger');
  } else {
    //instatiate a book
    const book = new Book(title.value, author.value, Id);

    // add book to UI
    UI.addBookTolList(book);

    //add book to store
    Store.addBook(book);

    // show success message
    UI.showAlert('Book Added', 'success');

    //clear feilds
    UI.clearFields();
  }
});

//event: remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // remove book from UI
  UI.deleteBook(e.target);

  // remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show success message
  UI.showAlert('Book Removed', 'success');
});
