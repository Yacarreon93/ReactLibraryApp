import database from '../database'

let books = database.books
let lastId = database.books[database.books.length - 1].id
let limit = 3

function getlastId () {
  return ++lastId
}

function getAllBooks (page = 1) {
  books = books.sort((a, b) => {
    return a.id === b.id ? 0 : a.id > b.id ? -1 : 1
  })
  let pagedBooks = books.slice(0 + (limit * page) - limit, limit * page)
  return {
    type: 'GET_ALL_BOOKS',
    payload: pagedBooks
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
  return {
    type: 'SAVE_BOOK',
    payload: savedBook
  }
}

export default {
  getAllBooks,
  searchBooks,
  addBook,
  deleteBook,
  selectBook,
  borrowBook,
  returnBook,
  saveBook
}