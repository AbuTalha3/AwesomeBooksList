class BookList {
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
    // event listeners to nav. links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        // Active class removal from all nav. items
        navLinks.forEach((navLink) => {
          navLink.classList.remove('active');
        });

        // Active class to the clicked nav item addition
        link.classList.add('active');

        const sectionId = link.getAttribute('href').substring(1);
        this.showSection(sectionId);
      });
    });

    // An event listener to the form submit button addition
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      if (title && author !== '') {
        const book = { title, author };
        this.addBook(book);
        this.renderBookList();

        // Form inputs Reset
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';

        // Confirm if title and author are empty
      } else if (title === '') {
        this.showError('title', 'Title cannot be empty.');
      } else if (author === '') {
        this.showError('author', 'Author cannot be empty.');
      }
    });

    // List of books on page load render
    window.addEventListener('load', () => {
      this.renderBookList();
    });
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

  showSection = (sectionId) => {
    // Hide contents sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach((section) => {
      section.classList.add('hidden');
    });

    // Display the selected content section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
  };
}

const bookList = new BookList();
bookList.init();

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.getElementById('datetime').innerHTML = `${date} ${time}`;
}

// Recieve updateDateTime 
setInterval(updateDateTime, 1000);