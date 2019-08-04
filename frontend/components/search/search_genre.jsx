import React from 'react'

function SearchGenre(props) {
  return (
    <div className='search-genre'>
      <h4>Genre:</h4>
      <label> Indie
                <input type="checkbox" name="genre" value='indie' />
      </label>
      <label> Action
                <input type="checkbox" name="genre" value='action' />
      </label>
      <label> Adventure
                <input type="checkbox" name="genre" value='adventure' />
      </label>
      <label> Casual
                <input type="checkbox" name="genre" value='casual' />
      </label>
      <label> Strategy
                <input type="checkbox" name="genre" value='strategy' />
      </label>
      <label> RPG
                <input type="checkbox" name="genre" value='rpg' />
      </label>
      <label> Simulation
                <input type="checkbox" name="genre" value='simulation' />
      </label>
      <label> Sports
                <input type="checkbox" name="genre" value='sports' />
      </label>
      <label> Racing
                <input type="checkbox" name="genre" value='racing' />
      </label>
      <label> MMO
                <input type="checkbox" name="genre" value='mmo' />
      </label>
      <label> Platform
                <input type="checkbox" name="genre" value='platform' />
      </label>
    </div>
  )
}

export default SearchGenre