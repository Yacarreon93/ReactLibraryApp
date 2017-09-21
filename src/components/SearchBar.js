import React, { Component } from 'react'

class SearchBar extends Component {

  constructor (props) {
    super(props)
    this.state = { term: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ term: event.target.value })
    this.props.searchBooks(event.target.value)
  }

  render () {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
              value={this.state.term} 
              onChange={this.handleChange} />
          </div>
        </div>
      </div>
    )
  }

}

export default SearchBar
