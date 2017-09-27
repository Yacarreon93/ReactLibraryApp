import database from '../database'

let books = database.books
let currentBooks = books

let lastId = books[books.length - 1].id
let activePage = 1
let pageLimit = 3

// Utils

function getlastId () {
  return ++lastId
}

function getPageLimit () {
  return pageLimit
}

function getCountOfCurrentBooks () {
  return currentBooks.length
}

function sortBooks (books) {
  return books.sort((a, b) => {
    return a.id === b.id ? 0 : a.id > b.id ? -1 : 1
  })
}

function pageBooks (books) {
  return books.slice((pageLimit * activePage) - pageLimit, pageLimit * activePage)
}

function filterBooks (books, term) {
  return books.filter((book) => (new RegExp(`${term}`, 'gi')).test(book.title))
}

function insertBook (book) {
  book.id = getlastId()
  books.push(book)
  return books
}

function removeBook (id) {
  books = books.filter(book => book.id !== id)
  return books
}

// Actions

function getBooks () {
  currentBooks = sortBooks(books)
  return {
    type: 'GET_ALL_BOOKS',
    payload: pageBooks(currentBooks)
  }
}

function searchBooks (term) {
  activePage = 1
  currentBooks = filterBooks(books, term)
  return {
    type: 'SEARCH_BOOKS',
    payload: pageBooks(currentBooks)
  }
}

function addBook (book) {
  activePage = 1
  currentBooks = insertBook(book)
  return {
    type: 'ADD_BOOK',
    payload: pageBooks(currentBooks)
  }
}

function deleteBook (id) {
  activePage = 1
  currentBooks = removeBook(id)
  return {
    type: 'DELETE_BOOK',
    payload: pageBooks(currentBooks)
  }
}

function selectBook (book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}

function borrowBook (id, user) {
  let borrowedBook
  books = books.map((book) => {
    if (book.id === id) {
      book.user = user
      borrowedBook = book
    }
    return book
  })
  currentBooks = books
  return {
    type: 'BORROW_BOOK',
    payload: borrowedBook
  }
}

function returnBook (id) {
  let borrowedBook
  books = books.map((book) => {
    if (book.id === id) {
      delete book.user
      borrowedBook = book
    }
    return book
  })
  currentBooks = books
  return {
    type: 'RETURN_BOOK',
    payload: borrowedBook
  }
}

function saveBook (id, data) {
  let savedBook
  books = books.map((book) => {
    if (book.id === id) {      
      for (let key in data) {
        book[key] = data[key]
      }
      savedBook = book
    }
    return book
  })
  currentBooks = books
  return {
    type: 'SAVE_BOOK',
    payload: savedBook
  }
}

function setActivePage (page = 1) {
  activePage = page
  return {
    type: 'SET_ACTIVE_PAGE',
    payload: activePage
  }
}

export default {
  getBooks,
  searchBooks,
  addBook,
  deleteBook,
  selectBook,
  borrowBook,
  returnBook,
  saveBook,
  getPageLimit,
  setActivePage,
  getCountOfCurrentBooks
}