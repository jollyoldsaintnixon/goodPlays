import React from 'react'

export default class StarRatings extends React.Component {

    starList() {
        const { top_id } = this.props
        const star_list = []
        // cb function for each star
        const selectStar = e => {
            e.preventDefault()
            e.stopPropagation()
            const all_cash_stars = $('.top-level-star')
                .removeClass('null-star')
            const id = e.target.id
            const idx = parseInt(id.split('-')[1]) // this gets the number in the id as an integer
            
            if (idx !== 0 ) {  // can't go less than 1 star 
                const cash_star = $(`#star-` + idx)
                const next_star = $(`#star-` + (idx + 1))
                if (!next_star.hasClass('selected-star-' + top_id)) { // only toggle if clicking the last selected star
                    cash_star.toggleClass('selected-star-' + top_id)
                }
                for (let i = 0; i < idx; i++) {
                    const cash_star = $(`#star-` + i)
                        .addClass('selected-star-' + top_id) // added the game_id to the class for jquerying purposes later.  The rating is based on the number of stars on the page corresponding to this exact class
                }   
                for (let i = idx + 1; i < 5; i++) {
                    const cash_star = $(`#star-` + i)
                        .removeClass('selected-star-' + top_id)
                }
                    
            }
            if (idx === 0) {
                const cash_star = $(`#star-` + idx)
                const cash_selected = $('.selected-star-' + top_id)

                if (cash_star.hasClass('selected-star-' + top_id)) {
                    if (cash_selected.length === 1) {
                        all_cash_stars.addClass('null-star').removeClass('selected-star-' + top_id)
                    } else {
                        for (let i = idx + 1; i < 5; i++) {
                            const cash_star = $(`#star-` + i)
                                .removeClass('selected-star-' + top_id)
                        }                       
                    }
                } else {
                    cash_star.toggleClass('selected-star-' + top_id)
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            // create the actual star with id based on i and the cb
            let star = <span className="fa fa-star top-level-star null-star" id={`star-${i}`}
                    key={`star-${i}`} onClick={selectStar}></span>

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