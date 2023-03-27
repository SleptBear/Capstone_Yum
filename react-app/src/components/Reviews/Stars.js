import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"
import './reviews.css'

const colors =  {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

function Stars(rating) {
    const stars = Array(5).fill(0);
    const [currentRating, setCurrentRating] = useState(Math.floor(rating.rating));
    console.log("inside stars", rating.rating)

    return (
        <div>
            {stars.map((_, index) => {
                const ratingValue = index + 1

                return (

                    <FaStar
                    key={index}
                    size={24}
                    color={(currentRating) > index ? colors.orange: colors.grey}
                    />
                )
            })
            }
        </div>
    )
}

export default Stars
