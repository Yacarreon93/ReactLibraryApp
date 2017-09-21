import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display';

class Modal extends Component {

  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSubmit (event) {
    event.preventDefault()
    let user = this.refs.userInput && this.refs.userInput.value
    this.props.onSubmit(user)
    this.refs.closeModal.click()
  }

  onCancel () {
    if (this.refs.userInput) this.refs.userInput.value = ''
  }

  render () {
    return (
      <div ref="myModal" className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{!this.props.isBorrowed?'Borrow':'Return'} this book</h4>
            </div>
            <form id="borrowBookForm" onSubmit={this.onSubmit}>
              <ToggleDisplay if={!this.props.isBorrowed}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="userInput">Type the user's name</label>
                    <input ref="userInput" type="text" className="form-control" id="userInput" placeholder="Enter name" required />
                  </div>
                </div>
              </ToggleDisplay>
              <div className="modal-footer">
                <button ref="closeModal" type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.onCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">{!this.props.isBorrowed?'Borrow':'Return'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default Modal