import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import Pages from '../components/Pages'

import actions from '../actions'

class Main extends Component {

  constructor (props) {
    super(props)
    this.onClickPageLink = this.onClickPageLink.bind(this)
  }

  componentWillMount () {
    this.props.getBooks()
  }

  onClickPageLink (page) {
    this.props.setActivePage(page)
    this.props.getBooks()
  }

  render() {
    let { books, selectBook, searchBooks } = this.props
    return (
      <div>
        <SearchBar searchBooks={searchBooks} />
        <Pages active={this.props.activePage} onClick={this.onClickPageLink} />
        <BookList books={books} selectBook={selectBook} history={this.props.history} />
      </div>
    )
  }

}

function mapStateToProps ({ activePage, books }) {
  return { activePage, books }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
