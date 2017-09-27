export default function (state = 1, action) {
  switch (action.type) {
    case 'SET_ACTIVE_PAGE':
      return action.payload
    case 'GET_ALL_BOOKS':
    case 'BOOK_SELECTED':
    case 'BORROW_BOOK':
    case 'RETURN_BOOK':
    case 'SAVE_BOOK':
      return state
    default: 
      return 1
  }
}