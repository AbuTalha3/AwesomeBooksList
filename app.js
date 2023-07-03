// book class : represents a book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class handle UI tasks
class UI {
    static displayBooks(){
        const storeBooks = [
        { title: 'Book One', author: 'Nancy Drew', isbn: '897987'},
        { title: 'Book Two', author: 'J K Rolling', isbn: '898987'},
        { title: 'Book Three', author: 'Nancy Drew', isbn: '777987'},            
        ];
        const books = storeBooks;
        books.forEach((book) => UI.addBookTolList(book));
    }

    static addBookTolList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML =
        <><td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td></>;
        list.appendChild(row);

      }

      static deleteBook(el) {
        if(el) {
            if(Element.classList.contains('delete')) {
                el.parentElement.parentElement.remove
            }
        }
      }

      static clearFields() {
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';
      }
    }

//  store class handles storage ,store the book name class

// event: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event: add book 
document.querySelector('#book-form').addEventListener('submit',(e) => {
    // prevent actual submit
    e.preventDefault();
    // get form values
    const title= document.querySelector('#title').value;
    const author= document.querySelector('#author').value;
    const isbn= document.querySelector('#isbn').value;

    //instatiate a book
    const book = new Book(title, author, isbn);

    // add book to UI
    UI.addBookTolList(book);
    //clear feilds
    UI.clearFields(); 
 });
    //event: remove book
    document.querySelector('#book-list').addEventListener('click', (e) => {
        UI.deleteBook(e.target)
});







