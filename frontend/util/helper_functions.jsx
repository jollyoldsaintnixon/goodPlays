import React from 'react'

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