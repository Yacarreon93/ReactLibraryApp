import database from '../database'

let categories = database.categories
let books = database.books
let lastId = database.books[database.books.length - 1].id

function getlastId () {
  return ++lastId
}

function getAllBooks () {
  books = books.sort((a, b) => {
    return a.id === b.id ? 0 : a.id > b.id ? -1 : 1
  })
  return {
    type: 'GET_ALL_BOOKS',
    payload: books
  }
}

function searchBooks (term) {
  return {
    type: 'SEARCH_BOOKS',
    payload: books.filter((book) => (new RegExp(`${term}`, 'gi')).test(book.title))
  }
}

function addBook (book) {
  book.id = getlastId()
  books.push(book)
  return {
    type: 'ADD_BOOK',
    payload: books
  }
}

function deleteBook (id) {
  books = books.filter(book => book.id !== id)
  return {
    type: 'DELETE_BOOK',
    payload: books
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
  return {
    type: 'RETURN_BOOK',
    payload: borrowedBook
  }
}

export default {
  getAllBooks,
  searchBooks,
  addBook,
  deleteBook,
  selectBook,
  borrowBook,
  returnBook
}