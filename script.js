class Book{
constructor(
    title='Unknown',
    author='Unknown',
    pages='0',
    isRead=false
    ){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.isRead=isRead;
    }
}
class Library{
constructor(){
    this.books=[];
}

addBook(newBook){
    if(!this.isInLibrary(newBook)){
        this.books.push(newBook);
        return "The Book add successfully";
    }
    else{
        return "The Book is already exist";
    }
}
removBook(title,author){
    const index=this.findIndexByTitleAndAuthor(title,author);
    if(index!=-1){
        this.books.splice(index,1);
        return "The Book removed successfully";
    }
    else{
        return "Book not found";
    }
}
editBookTitle(title,author,newTitle){
   const index= this.findIndexByTitleAndAuthor(title,author);
   if(index!=-1){
    this.books[index].title = newTitle;
    return "Book title edited successfully.";
   }
   else{
    return "Book not found ";
   }
}
editBookAuthor(title,author,newAuthor){
    const index= this.findIndexByTitleAndAuthor(title,author);
    if(index!=-1){
     this.books[index].author = newAuthor;
     return "Book author edited successfully.";
    }
    else{
     return "Book not found ";
    }
 }
searchBook(title,author){
    return this.books[this.findIndexByTitleAndAuthor(title,author)];
}
findIndexByTitleAndAuthor(title,author){
    return this.books.findIndex(book=>book.title===title && book.author===author);
}   
isInLibrary(check){
    return this.books.findIndexByTitleAndAuthor(check.title,check.author);
}

}
const library=new Library();

// Header Section
const loading = document.getElementById("loading");
const loggedOut = document.getElementById("loggedOut");
const loggedIn = document.getElementById("loggedIn");
const logintbt = document.getElementById("logintbt");
const Accountbt = document.getElementById("Accountbt");
const logOutbt = document.getElementById("logOutbt");

// Main Section
const addBookbt = document.getElementById("addBookbt");
const BookGrid = document.getElementById("BookGrid");

// Form Section
const addBookdata = document.getElementById("addBookdata");
const addBookForm = document.getElementById("addBookForm");
const title = document.getElementById("title");
const Author = document.getElementById("Author");
const pages = document.getElementById("pages");
const isReadcheckbox = document.getElementById("isReadcheckbox");
const errorMsg = document.getElementById("errorMsg");
//  model ==bookdATA
// Modal Section
const accountModal = document.getElementById("accountModal");
const overlay = document.getElementById("overlay");
const setupNavbar=(user)=>{
    if(user){
        loggedIn.classList.add('active');
        loggedOut.classList.remove('active');
    }
    else{
        loggedIn.classList.remove('active');
        loggedOut.classList.add('active');
    }
    loading.classList.remove('active');
}
setupAccountModal = (user) => {
    if (user) {
        accountModal.innerHTML = `
      <p>Logged in as</p>
      <p><strong>${user.email.split('@')[0]}</strong></p>`
    }
    else{
        accountModal.innerHTML = ''
    }
}
const openAddBookModal=()=>{
    addBookForm.reset();
    addBookdata.classList.add('active');
    overlay.classList.add('active');
}
const closeAddBookModal = () => {
    addBookdata.classList.remove('active');
    overlay.classList.remove('active');
    errorMsg.classList.remove('active');
    errorMsg.textContent = '';
}
const openAccountModal = () => {
    accountModal.classList.add('active');
    overlay.classList.add('active');
}
const closeAccountModal = () => {
    accountModal.remove('active');
    overlay.classList.remove('active');
}
const closeAllModals = () => {
    closeAddBookModal();
    closeAccountModal();
    }
const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
}
const updateBooksGrid = () => {
    resetBooksGrid();
    for (let book of library.books) {
        createBookCard(book)
      }
}
const resetBooksGrid = () => {
    booksGrid.innerHTML = ''

}
const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const buttonGroup = document.createElement('div')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')
  
    bookCard.classList.add('book-card')
    buttonGroup.classList.add('button-group')
    readBtn.classList.add('btn')
    removeBtn.classList.add('btn')
    readBtn.onclick = toggleRead
    removeBtn.onclick = removeBook
  
    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.textContent = 'Remove'
  
    if (book.isRead) {
      readBtn.textContent = 'Read'
      readBtn.classList.add('btn-light-green')
    } else {
      readBtn.textContent = 'Not read'
      readBtn.classList.add('btn-light-red')
    }
  
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    buttonGroup.appendChild(readBtn)
    buttonGroup.appendChild(removeBtn)
    bookCard.appendChild(buttonGroup)
    booksGrid.appendChild(bookCard)
  }
  const getBookFromInput =()=>{
        return new Book(
            title.value,
            author.value,
            pages.value,
            isReadcheckbox.checked
        )
  }
  const addBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromInput()
    const message = library.addBook(newBook)
    if (message === 'The Book add successfully') {
      updateBooksGrid()
      closeAddBookModal()
    }
    else {
      errorMsg.textContent = message
      errorMsg.classList.add('active')
    }

  }
  const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
      '"',
      ''
    )
  
    if (auth.currentUser) {
      removeBookDB(title)
    } else {
      library.removeBook(title)
      saveLocal()
      updateBooksGrid()
    }
  }
  const toggleRead = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
      '"',
      ''
    )
    const book = library.getBook(title)
  
    if (auth.currentUser) {
      toggleBookIsReadDB(book)
    } else {
      book.isRead = !book.isRead
      saveLocal()
      updateBooksGrid()
    }
  }
  accountBtn.onclick = openAccountModal
  addBookBtn.onclick = openAddBookModal
  overlay.onclick = closeAllModals
  addBookForm.onsubmit = addBook
  window.onkeydown = handleKeyboardInput
  
  // Local Storage
  
  const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library.books))
  }
  
  const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'))
    if (books) {
      library.books = books.map((book) => JSONToBook(book))
    } else {
      library.books = []
    }
  }  

