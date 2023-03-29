import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"
import ReactStars from 'react-rating-stars-component';
import './reviews.css'

const colors =  {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

function Stars(rating) {
    // const stars = Array(5).fill(0);
    const [currentRating, setCurrentRating] = useState(rating.rating);
    console.log("inside stars props", rating)
    // // console.log("inside stars currentRating", currentRating)

    // if(!rating?.rating) return null
    return (
        <ReactStars
   count={5}
   value={currentRating}
   size={20}
   isHalf={true}
   edit={false}
   activeColor="#ffd700"
   
                          />
        // <div>
        //     {stars.map((_, index) => {

        //         return (

        //             <FaStar
        //             key={index}
        //             size={24}
        //             color={(currentRating) > index ? colors.orange: colors.grey}
        //             />
        //         )
        //     })
        //     }
        // </div>
    // <ReactStars
    // count={5}
    // value={currentRating}
    // // onChange={setCurrentRating}
    // size={22}
    // isHalf={true}
    // emptyIcon={<i className="far fa-star"></i>}
    // halfIcon={<i className="fa fa-star-half-alt"></i>}
    // fullIcon={<i className="fa fa-star"></i>}
    // activeColor="#ffd700"
    // />
    )
}

export default Stars
