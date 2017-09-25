import database from '../database'

export default function (state=null, action) {
  switch (action.type) {
    case 'GET_ALL_BOOKS':
    case 'SEARCH_BOOKS':
    case 'DELETE_BOOK':
    case 'ADD_BOOK':
      return action.payload
    case 'BORROW_BOOK':
    case 'RETURN_BOOK':
    case 'SAVE_BOOK':
      state = state.map(book => {
        if (book.id === action.payload.id) 
          return action.payload
        return book
      })
      return [[], ...state]
    default:
      return database.books
  }
}
