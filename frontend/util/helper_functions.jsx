import React from 'react'
import { Link } from 'react-router-dom'

export const update = (field, component) => {
  return event => {
    component.setState({ [field]: event.target.value })
  }
}

export const errorsList = (errors) => {
    errors.map((error, idx) => {
    return <li key={`error-${idx}`}>{error}</li>
  })
}

export const stringFilter = (items, searchString) => {  
  if (searchString === '') {
    return items
  }
  
  let filtered = []

  items.forEach(item => {
    if (item.title.toLowerCase().includes(searchString.toLowerCase())) {
      filtered.push(item)
    }
  })
  
  return filtered
}

export const genreFilter = (items, array) => {
  
  if (array.length === 0 || array.includes('all')) {
    return items
  }
  let filtered = []
  // debugger
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (items[i].genres.includes(array[j])) {
        filtered.push(items[i])
        break
      }
    }
  }
  
  return filtered
}

export const categoryFilter = (items, array) => {

  if (array.length === 0 || array.includes('all')) {
    return items
  }
  let filtered = []

  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (items[i].categories.includes(array[j])) {
        filtered.push(items[i])
        break
      }
    }
  }

  return filtered
}

export const dateFilter = (items, startDate, endDate) => {
  if (startDate === null && endDate === null) {
    return items
  }
  let filtered = []

  for (let i = 0; i < items.length; i++) {
    if (items[i].release_date > startDate || startDate === null) {
      if (items[i].release_date < endDate || endDate === null) {
        filtered.push(items[i])
      }
    }
  }

  return filtered
}

export const priceFilter = (items, low, high) => {
  if (!low && !high) {
    return items
  }
  
  if (low) {
    items = items.filter(item => item.price >= low)
  }
  if (high) {
    
    items = items.filter(item => item.price <= high)
  }


  return items
}

export const randomElement = array => {
  return array[Math.floor(Math.random() * array.length)]
}

export const ulFromArray = (array, className) => {
  const intro = className === 'game-genres' ? 'Genres: ' : 'Categories: ' 
  const split = array.map((ele, idx) => {
    return (
      <li key={`${className}-${idx}`}>{ele}</li>
    )
  })
  return <ul className={className}>{intro}{split}</ul>
}



export const idsToObjects = (ids, objects) => {
  return ids.map(id => {
    return objects[id]
  })
}

export const swapClass = (className, component) => {
  return (e) => {
    // debugger
    e.preventDefault()
    component.setState({ className: className })
  }
}