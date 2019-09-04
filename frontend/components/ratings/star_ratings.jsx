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
            for (let i = 0; i < idx; i++) {
                const cash_star = $(`#star-` + i)
                    .addClass('selected-star-' + top_id)
            }
            for (let i = idx + 1; i < 5; i++) {
                const cash_star = $(`#star-` + i)
                    .removeClass('selected-star-' + top_id)
            }
            const cash_star = $(`#star-` + idx)
                .toggleClass('selected-star-' + top_id)
        }
        for (let i = 0; i < 5; i++) {
            // create the actual star with id based on i and the cb
            const star = <span className="fa fa-star" id={`star-${i}`}
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