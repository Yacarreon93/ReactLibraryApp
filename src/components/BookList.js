import React, { Component } from 'react'

function onClick (event, props, book) {
  event.preventDefault()
  props.selectBook(book)
  props.history.push('/book/detail')
}

function renderBookList (props) {
  return props.books.map((book, index) => {
    return (
      <div key={index}>
        <h4><a href="/book/detail" onClick={(event) => onClick(event, props, book)}>{book.title}</a></h4>
        <p><b>Author:</b> {book.author}</p>
        <p><b>Category:</b> {book.category}</p>
        <p><b>Published date:</b> {book.published_date}</p>
        <p><b>Status:</b> {!!book.user?'Borrowed':'Available'}</p>
        <hr />
      </div>
    )
  })
}

function BookList (props) {
    return (
      <div className="row marketing">
        <div className="col-lg-12">
          {renderBookList(props)}
        </div>
      </div>
    )
}

export default BookList