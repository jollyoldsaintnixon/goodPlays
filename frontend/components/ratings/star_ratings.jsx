import React from 'react'

export default class StarRatings extends React.Component {

    starList() {
        const { top_id } = this.props
        const star_list = []
        // cb function for each star
        const selectStar = e => {
            e.preventDefault()
            e.stopPropagation()
            const id = e.target.id
            const idx = parseInt(id.split('-')[1]) // this gets the number in the id as an integer
            debugger
            for (let i = 0; i < idx; i++) {
                const cash_star = $(`#star-` + i)
                    .addClass('selected-star-' + top_id) // added the game_id to the class for jquerying purposes later.  The rating is based on the number of stars on the page corresponding to this exact class
            }   
            for (let i = idx + 1; i < 5; i++) {
                const cash_star = $(`#star-` + i)
                    .removeClass('selected-star-' + top_id)
            }
            if (idx !== 0) {  // can't go less than 1 star
                const cash_star = $(`#star-` + idx)
                    .toggleClass('selected-star-' + top_id)
            }
        }
        for (let i = 0; i < 5; i++) {
            // create the actual star with id based on i and the cb
            let star
            if (i < 3) { // first three stars selected by default
                star = <span className={`fa fa-star top-level-star selected-star-${top_id}`} id={`star-${i}`}
                    key={`star-${i}`} onClick={selectStar}></span>
            } else {
                star = <span className="fa fa-star top-level-star" id={`star-${i}`}
                    key={`star-${i}`} onClick={selectStar}></span>
            }
            star_list.push(star)
        }
        return star_list
    }

    render() {
        
        return (
        <ul>
            {/* <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span> */}
            {this.starList()}
        </ul>)
    }
}