import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display';

import Modal from '../components/Modal'

import actions from '../actions/index'

class BookDetail extends Component {

  constructor (props) {
    super(props)
    this.state = { book: this.props.activeBook }
    this.deleteBook = this.deleteBook.bind(this)
    this.onModalSubmit = this.onModalSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    let book = nextProps.activeBook
    this.setState({ book: nextProps.activeBook })
  }
  
  componentWillMount () {
    if (!this.state.book) 
    this.props.history.push('/')
  }
    
  deleteBook (book) {
    this.props.deleteBook(book.id)
    this.props.history.push('/')
  }
  
  onModalSubmit (user) {
    let book = this.state.book
    if (!book.user) this.props.borrowBook(book.id, user)
    else this.props.returnBook(book.id)
  }
  
  render () {    
    let book = this.state.book
    if (!book) return <div>No book selected</div>
    return (
      <div>
        <Modal onSubmit={this.onModalSubmit} isBorrowed={!!book.user}/>
        <div className="row marketing">
          <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="titleInput"><b>Title</b></label>
                <p>{book.title}</p>
                </div>
                <div className="form-group">
                <label htmlFor="authorInput"><b>Author</b></label>
                <p>{book.author}</p>
                </div>
                <div className="form-group">
                <label htmlFor="categoryInput"><b>Category</b></label>
                <p>{book.category}</p>                
                </div>
                <div className="form-group">
                <label htmlFor="publishedDateInput"><b>Published Date</b></label>
                <p>{book.published_date}</p>
                </div>
                <div className="form-group">
                <label htmlFor="borrowInput"><b>Status</b></label>
                <p>{!!book.user?'Borrowed':'Available'}</p>                
              </div>
              <ToggleDisplay if={!!book.user}>
                <div className="form-group">
                  <label htmlFor="userNameInput"><b>User name</b></label>
                  <p>{book.user}</p>
                </div>
              </ToggleDisplay>
              <button id="removeButton" className="btn btn-danger" onClick={() => this.deleteBook(book)}>Remove</button>
              &nbsp;
              <button id="borrowButton" className="btn btn-primary" data-toggle="modal" data-target="#myModal">{!book.user ? 'Borrow' : 'Return'}</button>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps ({ activeBook }) {
  return { activeBook }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
