import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'

import actions from '../actions/index'

class Main extends Component {

  componentWillMount () {
    this.props.getAllBooks()
  }

  render() {
    let { books, selectBook, searchBooks} = this.props
    return (
      <div>
        <SearchBar searchBooks={searchBooks} />
        <BookList books={books} selectBook={selectBook} history={this.props.history} />
      </div>
    )
  }

}

function mapStateToProps ({ books }) {
  return { books }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
