import React from 'react'

import database from '../database'

function renderCategories (categories, props) {
  let index = 1
  return categories
  .filter(category => props.term && (new RegExp(`${props.term}`, 'gi')).test(category))
  .map(category => <li key={index++} style={{cursor: 'pointer'}} onClick={event => props.onClick(event.target.innerHTML)}>{category}</li>)
}

function CategoryAutocompleter (props) {
  let categories = database.categories
  return (
    <div>
      {renderCategories(categories, props)}
    </div>
  )
}

export default CategoryAutocompleter