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

  static switchToTab(tabId) {
    const tab = document.querySelector(`#${tabId}`);
    if (tab) {
      // Trigger the click event on the tab element
      tab.click();

      // Navbar sgowing up onclicking so we need to Hide the navbar on mobile devices
      const navbar = document.querySelector('.close-navbar');
      if (navbar) {
        navbar.classList.remove('open-navbar');
      }
    }
  }

  static addBookTolList(books) {
    // const list = document.querySelector('#book-list');
    const row = document.querySelector('.booksContainer');
    const bookList = books.map(
      (book) => `
            <article class="d-flex flex-row justify-content-between border-bottom pb-3 mb-3">
          <div class="col-3 d-flex flex-row justify-content-between">
          <h2>${book.title}</h2>
          <h4> by ${book.author}</h4>
          </div>
            <button onclick="Book.removeBook('${book.id}')" class="btn btn-danger" >remove</button>
            </article>
    `,
    );

    const addNew = document.querySelector('#addNew');

    row.innerHTML =
      bookList.length === 0
        ? `<div class="d-flex flex-column justify-content-between align-items-center col-12 col-md-7 mx-auto">
        <h5 class=""> Add book to your collections </h5>
        <button class="btn btn-primary" onclick="Book.switchToTab('${addNew.id}')">

        Add book

       </button> </div>`
        : bookList.join('');
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.homePage');
    const form = document.querySelector('#message');
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
    /* eslint-disable no-plusplus */
    const id = this.count++;
    return `book_${id}`;
  }

  //   Remove Book
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

  // Navbar functions
  static handleClick() {
    // Navbar Variables and Functions
    const toggleNavBar = document.querySelector('.close-navbar');

    toggleNavBar.classList.toggle('open-navbar');
  }

  //   Hide All tab contents
  static selectTab(tabId) {
    const tabs = document.querySelectorAll('.nav-list');
    const tabContents = document.querySelectorAll('.tab-contents');

    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('active');
    });

    const tab = document.querySelector(`#${tabId}`);
    tab.classList.add('active');

    const content = document.querySelector(`#${tab.dataset.tabContent}`);
    content.classList.add('active');
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

const openNavIcon = document.querySelector('.nav-icon');
const closeNavIcon = document.querySelector('.close');
const navList = document.querySelectorAll('.nav-list');
openNavIcon.addEventListener('click', Book.handleClick);
closeNavIcon.addEventListener('click', Book.handleClick);

navList.forEach((navItem) => {
  navItem.addEventListener('click', Book.handleClick);
});

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.nav-list');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      Book.selectTab(tab.id);
    });
  });

  // Set default tab
  Book.selectTab(tabs[0].id);
});
