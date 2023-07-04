// book class : represents a book
class Book {
    constructor(title, author, id){
        this.title = title;
        this.author = author;
        this.id = id;
    }
  }
  
  // UI class handle UI tasks
  class UI {
    static displayBooks() {
        const books = Store.getBooks();
  
        books.forEach((book) => UI.addBookTolList(book));
    }
  
    static addBookTolList(book) {
        const list = document.querySelector('#book-list');
  
        const row = document.createElement('tr');
        
        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.id}</td>
        <td><a href="#" class= "btn btn-danger btn-sm delete">X</a></td>
        `;
  
        list.appendChild(row);
      }
  
      static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
          }
        }
        
        static showAlert(message, className) {
            const div = document.createElement('div')
            div.className = `alert alert-${className}`;
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector('.container');
            const form = document.querySelector('#book-form');
            container.insertBefore(div, form);
  
            // vanish in three seconds
            setTimeout(() => document.querySelector('.alret').remove(), 3000);
        }
      
      static clearFields() {
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#id').value ='';
      }
    }
  
        //  store class handles storage ,store the book name class
  class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
  
        return books;
    }
  
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(id) {
        const books = Store.getBooks();
  
        books.forEach((book, index) => {
            if(book.id === id) {
                books.splice(index, 1);
            }
        });
  
        localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // event: display books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // event: add book 
  document.querySelector('#book-form').addEventListener('submit',(e) => {
       // prevent actual submit
    e.preventDefault();   
  
    // get form values
    const title= document.querySelector('#title').value;
    const author= document.querySelector('#author').value;
    const id= document.querySelector('#id').value;
  
    // validate
    if(title === '' || author === '' || id === '') {
        UI.showAlertlert('please fill in all feilds','danger');
    } else {
        //instatiate a book
        const book = new Book(title, author, id);
    
        // add book to UI
        UI.addBookTolList(book);
  
        //add book to store
        Store.addBook(book);
    
        // show success message
        UI.showAlert('Book Added', 'success')
  
        //clear feilds
        UI.clearFields(); 
    }
  });
  
        //event: remove book
    document.querySelector('#book-list').addEventListener('click', (e) => {       
        // remove book from UI
        UI.deleteBook(e.target)
  
        // remove book from store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
        // show success message
        UI.showAlert('Book Removed', 'success')
  });