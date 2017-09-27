import { combineReducers } from 'redux';

import BooksReducer from './reducer_books'
import ActiveBook from './reducer_active_book'
import ActivePage from './reducer_active_page'

const rootReducer = combineReducers({
  books: BooksReducer,
  activeBook: ActiveBook,
  activePage: ActivePage
});

export default rootReducer;
