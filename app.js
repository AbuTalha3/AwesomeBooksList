// book class : represents a book
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  // UI class handle UI tasks
  static displayBooks() {
    // const books = Store.getBooks();

    const books = JSON.parse(localStorage.getItem('books'));

    Book.addBookTolList(books);
  }

  static addBookTolList(books) {
    // const list = document.querySelector('#book-list');
    const row = document.querySelector('.booksContainer');
    const bookList = books.map(
      (book) => `
            <article class="d-flex flex-row justify-content-between border-bottom pb-3 mb-3">
            <h2>${book.title}</h2>
            <h4>${book.author}</h4>
            <button onclick="Book.removeBook('${book.id}')" class="btn btn-danger" >remove</button>
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

  //  store class handles storage, store the book name class

  static getBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];

    return books;
  }

  static addBook(book) {
    const books = this.getBooks();
    books.push(book);
    this.saveBooks(books);
  }

  //   Save books to locastorage
  static saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  static count = 0;

  //   Declare unique Id
  static uniqueId() {
    const id = this.count++;
    return `book_${id}`;
  }

  static removeBook(id) {
    let books = this.getBooks();

    // Filter books based on the remove button id and return the res
    books = books.filter((book) => book.id !== id);

    // show success message
    this.showAlert('Book Removed', 'danger');

    // Then save to local storage again
    this.saveBooks(books);

    // Then render the remaining books again
    this.displayBooks();
  }
}

// event: display books
window.addEventListener('DOMContentLoaded', Book.displayBooks);

// event: add book
const addBook = document.querySelector('.addBook');

addBook.addEventListener('click', (e) => {
  // prevent actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const Id = Book.uniqueId();

  // validate
  if (title.value === '' || author.value === '') {
    Book.showAlert('please fill in all feilds', 'danger');
  } else {
    //  Instatiate a book
    const book = new Book(title.value, author.value, Id);

    //  Add book to store
    Book.addBook(book);

    // show success message
    Book.showAlert('Book Added', 'success');

    // Render books
    Book.displayBooks();

    //  Clear feilds
    Book.clearFields();
  }
});
