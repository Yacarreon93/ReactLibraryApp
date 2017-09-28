import React from 'react'

import utils from  '../utils'

function renderPages (props) {
  let links = []
  let countPages = Math.ceil(utils.getCountOfCurrentBooks() / utils.getPageLimit())
  for (let i = 1; i <= countPages; i++) {
    links.push(
      <li key={i}>
        <a className={props.active === i && 'active'} onClick={(event) => props.onClick(event.target.innerHTML)}>{i}</a>
      </li>
    )
  }
  return links
}

function Pages (props) {
  return (
    <div className="row">
      <div className="col-sm-12">      
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {renderPages(props)}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Pages