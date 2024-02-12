const modal = document.querySelector("dialog")
const newEntry = document.querySelector(".new-entry")
const addBook = document.querySelector(".add-book")
const closeModal = document.querySelector(".cancel")
const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookPages = document.querySelector("#pages")
const bookFinished = document.querySelector("#checkbox")
const libraryBody = document.querySelector(".library-body")

let myLibrary = []

newEntry.addEventListener("click", e => {
    modal.showModal()
})

addBook.addEventListener("click", e => {
    e.preventDefault() 
    
    const title = bookTitle.value
    const author = bookAuthor.value
    const pages = bookPages.value
    const finished = bookFinished.checked
    
    let newBook = createNewBook(title, author, pages, finished)
    myLibrary = [...myLibrary, newBook]
    displayBook()
    
    bookTitle.value = ""
    bookAuthor.value = ""
    bookPages.value = 0
    bookFinished.checked = false
    modal.close()

})

closeModal.addEventListener("click", e => {
    modal.close()
})

function Book(title, author, pages, finished = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.finished = finished
    this.id = myLibrary.length > 0 ? myLibrary[myLibrary.length - 1].id + 1 : 1
}

function createNewBook(title, author, pages, finished) {
    return new Book(title, author, pages, finished)
}

function displayBook() {

    libraryBody.innerHTML = myLibrary.map(book => `
    <div id = "book-container">
        <div class = "book-title">${book.title}</div>
        <div class = "author">${book.author}</div>
        <div class = "pages">${book.pages ? `${book.pages} pages` : ""}</div>
        <div class = ${book.finished ? "read" : "unread"} id = "tool-bar" data-id = ${book.id}>
            <div class="read-status">
                <span data-id = ${book.id}> ${book.finished ? "Completed!" : "Not Completed" } </span>
                <svg class="icon" id="check" data-id = ${book.id} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
                    <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="delete-book">
                <span>Delete</span>
                <img src = "./img/close.svg" class = "icon" id = "close" data-id = ${book.id}>
            </div>
        </div>
    </div>
    `).join("")

    deleteBtns = document.querySelectorAll("#close")
    deleteBtns.forEach(button => {
        button.addEventListener("click", e => {
            let bookId = Number(e.target.dataset.id)
            deleteBook(bookId)
        })
    })

    readBtns = document.querySelectorAll("#check")
    readBtns.forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault()
            if (!e.target.hasAttribute("data-id")) return
            let bookId = Number(e.target.dataset.id)
            readBook(bookId)
        })
    })

}

function deleteBook(bookId) {
    myLibrary = myLibrary.filter(book => book.id !== bookId)
    displayBook()
}

function readBook(bookId) {

    myLibrary.forEach(book => {
        if (book.id === bookId) {
            book.finished = book.finished ? false : true
        }
    })

    displayBook()
}