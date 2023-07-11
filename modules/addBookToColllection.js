const addBookToCollections = (bookCollection) => {
  // event listeners to nav. links

  // An event listener to the form submit button addition
  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    if (title && author !== '') {
      const book = { title, author };
      bookCollection.addBook(book);
      bookCollection.renderBookList();

      // Form inputs Reset
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';

      // Confirm if title and author are empty
    } else if (title === '') {
      bookCollection.showError('title', 'Title cannot be empty.');
    } else if (author === '') {
      bookCollection.showError('author', 'Author cannot be empty.');
    }
  });

  // List of books on page load render
  window.addEventListener('load', () => {
    bookCollection.renderBookList();
  });
};

export default addBookToCollections;
