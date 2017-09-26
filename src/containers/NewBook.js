import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CategoryAutocompleter from '../components/CategoryAutocompleter'

import actions from '../actions/index'

class NewBook extends Component {

  constructor (props) {
    super(props)
    this.state = { category: '' }
    this.onChangeCategory = this.onChangeCategory.bind(this)
    this.onClickCategory = this.onClickCategory.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onChangeCategory (event) {
    this.state.category = event.target.value
    this.setState(this.state)
  }

  onClickCategory (category) {
    this.state.category = category
    this.setState(this.state)
  }

  onFormSubmit (event) {
    event.preventDefault()
    // @TODO: validate data
    let book = {
      title: this.refs.titleInput.value,
      author: this.refs.authorInput.value,
      category: this.refs.categoryInput.value,
      published_date: (new Date(this.refs.publishedDateInput.value)).toDateString()
    }
    this.props.addBook(book)
    this.props.history.push('/')
  }

  render () {
    return (
      <div className="row marketing">
        <div className="col-lg-12">
          <form id="newBookForm" onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <label htmlFor="titleInput">Title</label>
              <input ref="titleInput" type="text" className="form-control" id="titleInput" placeholder="Enter title" required />
            </div>
            <div className="form-group">
              <label htmlFor="authorInput">Author</label>
              <input ref="authorInput" type="text" className="form-control" id="authorInput" placeholder="Enter author" required />
            </div>
            <div className="form-group">
              <label htmlFor="categoryInput">Category</label>
              <input 
                required
                id="categoryInput" 
                ref="categoryInput" 
                type="text" 
                className="form-control" 
                placeholder="Enter category" 
                onChange={this.onChangeCategory}
                value={this.state.category} />
              <CategoryAutocompleter term={this.state.category} onClick={this.onClickCategory} />
            </div>
            <div className="form-group">
              <label htmlFor="publishedDateInput">Published Date</label>
              <input ref="publishedDateInput" type="date" className="form-control" id="publishedDateInput" placeholder="Enter date" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatchToProps)(NewBook)
