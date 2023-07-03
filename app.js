//  declare btn, title and author variable using querySelector
const AddBookBtn = document.querySelector('.addBook');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');

// Decalre bookCollections array
const bookCollections = [];

// Decalre a addBooks function, push the value of title and author in the bookCollection array
function addBooks() {
  bookCollections.push({ title: bookTitle.value, author: bookAuthor.value });
}

// Decalre a clearInput function, to clear the input value unpon clicking the button
function clearInput() {
  bookTitle.value = '';
  bookAuthor.value = '';
}

// Add eventListener to the button, to run each both functions everytime the button is clicked
AddBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBooks();
  clearInput();
  console.log(bookCollections);
});
