export default function (state = null, action) {
  switch (action.type) {
    case 'BOOK_SELECTED':
    case 'BORROW_BOOK':
    case 'RETURN_BOOK':
    case 'SAVE_BOOK':
      return Object.assign({}, action.payload)
    default: 
      return state
  }
}