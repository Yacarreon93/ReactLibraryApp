import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display';

import Modal from '../components/Modal'
import CategoryAutocompleter from '../components/CategoryAutocompleter'

import actions from '../actions/index'

class BookDetail extends Component {

  constructor (props) {
    super(props)
    this.state = { 
      book: this.props.activeBook,
      isEditing: false
    }
    this.saveBook = this.saveBook.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
    this.toggleEdition = this.toggleEdition.bind(this)    
    this.onChangeField = this.onChangeField.bind(this)
    this.onModalSubmit = this.onModalSubmit.bind(this)
    this.onClickCategory = this.onClickCategory.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ book: nextProps.activeBook })
  }
  
  componentWillMount () {
    if (!this.state.book) 
    this.props.history.push('/')
  }

  saveBook (event) {
    event.preventDefault()
    // @TODO: validate data
    let data = {
      title: this.state.updatedBook.title,
      author: this.state.updatedBook.author,
      category: this.state.updatedBook.category,
      published_date: (new Date(this.state.updatedBook.published_date)).toDateString()
    }
    this.props.saveBook(this.state.book.id, data)
    let newState = Object.assign({}, this.state)
    newState.isEditing = false
    this.setState(newState)
  }
    
  deleteBook (book) {
    this.props.deleteBook(book.id)
    this.props.history.push('/')
  }
  
  toggleEdition () {
    let newState = Object.assign({}, this.state)
    newState.isEditing = !newState.isEditing
    if (newState.isEditing) {
      newState.updatedBook = Object.assign({}, this.state.book)
    }
    this.setState(newState)
  }

  onChangeField (event) {
    let key = event.target.id.replace('Input', '')
    let value = event.target.value
    if (key.includes('date')) value = new Date(value).toDateString()
    let newState = Object.assign({}, this.state)
    newState.updatedBook[key] = value
    this.setState(newState)
  }
  
  onModalSubmit (user) {
    let book = this.state.book
    if (!book.user) this.props.borrowBook(book.id, user)
    else this.props.returnBook(book.id)
  }

  onClickCategory (category) {
    let newState = Object.assign({}, this.state)
    newState.updatedBook.category = category
    this.setState(newState)
  }
  
  getformattedDate (date) {
    let formattedDate = new Date(date)
    let day = ("0" + formattedDate.getDate()).slice(-2)
    let month = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
    formattedDate = formattedDate.getFullYear() + "-" + month + "-" + day
    return formattedDate;
  }
  
  render () {
    let book = this.state.book
    let updatedBook = this.state.updatedBook || {}
    if (!book) return <div>No book selected</div>
    return (
      <div>
        <Modal onSubmit={this.onModalSubmit} isBorrowed={!!book.user}/>
        <div className="row marketing">
          <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="titleInput"><b>Title</b></label>
                {!this.state.isEditing && <p>{book.title}</p>}
                <ToggleDisplay if={this.state.isEditing}>
                  <input ref="titleInput" type="text" className="form-control" id="titleInput" placeholder="Enter title" value={updatedBook.title} onChange={this.onChangeField} required />
                </ToggleDisplay>
              </div>
              <div className="form-group">
                <label htmlFor="authorInput"><b>Author</b></label>
                {!this.state.isEditing && <p>{book.author}</p>}  
                <ToggleDisplay if={this.state.isEditing}>
                  <input ref="authorInput" type="text" className="form-control" id="authorInput" placeholder="Enter author" value={updatedBook.author} onChange={this.onChangeField} required />
                </ToggleDisplay>
              </div>
              <div className="form-group">
                <label htmlFor="categoryInput"><b>Category</b></label>
                {!this.state.isEditing && <p>{book.category}</p>}
                <ToggleDisplay if={this.state.isEditing}>
                  <input 
                    required 
                    id="categoryInput" 
                    ref="categoryInput" 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter category" 
                    value={updatedBook.category} 
                    onChange={this.onChangeField} />
                  <CategoryAutocompleter term={updatedBook.category} onClick={this.onClickCategory} />
                </ToggleDisplay>    
              </div>
              <div className="form-group">
                <label htmlFor="published_dateInput"><b>Published Date</b></label>
                {!this.state.isEditing && <p>{book.published_date}</p>}
                <ToggleDisplay if={this.state.isEditing}>
                  <input ref="published_dateInput" type="date" className="form-control" id="published_dateInput" placeholder="Enter date" value={this.getformattedDate(updatedBook.published_date)} onChange={this.onChangeField} required />
                </ToggleDisplay>
              </div>
              <ToggleDisplay if={!this.state.isEditing}>
                <div className="form-group">
                  <label htmlFor="borrowInput"><b>Status</b></label>
                  <p>{!!book.user?'Borrowed':'Available'}</p>                
                </div>
              </ToggleDisplay>
              <ToggleDisplay if={!this.state.isEditing && !!book.user}>
                <div className="form-group">
                  <label htmlFor="userNameInput"><b>User name</b></label>
                  <p>{book.user}</p>
                </div>
              </ToggleDisplay>
              <ToggleDisplay if={!this.state.isEditing}>
                <button id="removeButton" className="btn btn-danger" onClick={() => this.deleteBook(book)}>Remove</button>
                &nbsp;
                <button id="editButton" className="btn btn-warning" onClick={this.toggleEdition}>Edit</button>
                &nbsp;
                <button id="borrowButton" className="btn btn-primary" data-toggle="modal" data-target="#myModal">{!book.user ? 'Borrow' : 'Return'}</button>
              </ToggleDisplay>
              <ToggleDisplay if={this.state.isEditing}>
                <button id="cancelButton" className="btn btn-danger" onClick={this.toggleEdition}>Cancel</button>
                &nbsp;
                <button id="saveButton" className="btn btn-priamry" onClick={this.saveBook}>Save</button>
              </ToggleDisplay>
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
