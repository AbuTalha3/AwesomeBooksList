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
    // const books = Store.getBooks();

    const books = JSON.parse(localStorage.getItem('books'));

    UI.addBookTolList(books);
  }

  static addBookTolList(books) {
    // const list = document.querySelector('#book-list');
    const row = document.querySelector('.booksContainer');
    const bookList = books.map(
      (book) => `
            <article class="d-flex flex-row justify-content-between border-bottom pb-3 mb-3">
            <h2>${book.title}</h2>
            <h4>${book.author}</h4>
            <button onclick="Store.removeBook('${book.id}')" class="btn btn-danger" >remove</button>
            </article>
    `,
    );

    row.innerHTML = bookList.join('');

    // list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // vanish in three seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
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
    Store.saveBooks(books);
  }

  //   Save books to locastorage
  static saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  static count = 0;
  //   Declare unique Id
  static uniqueId() {
    const id = Store.count++;
    return `book_${id}`;
  }

  static removeBook(id) {
    let books = Store.getBooks();
    // Filter books based on the remove button id and return the res
    books = books.filter((book) => book.id !== id);

    // show success message
    UI.showAlert('Book Removed', 'danger');

    // Then save to local storage again
    Store.saveBooks(books);

    // Then render the remaining books again
    UI.displayBooks();
  }
}

// event: display books
window.addEventListener('DOMContentLoaded', UI.displayBooks);

// event: add book
const addBook = document.querySelector('.addBook');

addBook.addEventListener('click', (e) => {
  // prevent actual submit
  e.preventDefault();

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

    //add book to store
    Store.addBook(book);

    // show success message
    UI.showAlert('Book Added', 'success');

    // Render books
    UI.displayBooks();

    //clear feilds
    UI.clearFields();
  }
});
