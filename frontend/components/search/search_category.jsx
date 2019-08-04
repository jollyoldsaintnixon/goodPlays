import React from 'react'

function SearchCategory(props) {
  return (
    <div className='search-category'>
      <h4>Category</h4>
      <label> Single Player:
        <input type="checkbox" name="category" value='single-player' />
      </label>
      <label> Multi Player:
        <input type="checkbox" name="category" value='multi-player' />
      </label>
      <label> Cooperative:
        <input type="checkbox" name="category" value='cooperative' />
      </label>
    </div>
  )
}

export default SearchCategory