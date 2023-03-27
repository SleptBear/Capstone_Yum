import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"
import './reviews.css'

const colors =  {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

function DynamicStars() {
    const stars = Array(5).fill(0);
    const [currentRating, setCurrentRating] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined)

    return (

        <div>
            {stars.map((_, index) => {
                const ratingValue = index + 1

                return (
                    <label>
                        <input
                        type='radio'
                        name={ratingValue}
                        onClick={() => setCurrentRating(ratingValue)}
                        />

                    <FaStar
                    size={24}
                    style={{
                        cursor: 'pointer'
                    }}
                    color={(hoverValue || currentRating) > index ? colors.orange: colors.grey}
                    onClick={() => setCurrentRating(index + 1)}
                    onMouseEnter={() => setHoverValue(index + 1)}
                    onMouseLeave={() => setHoverValue(undefined)}
                    />

                    </label>
                )
            })

            }

        </div>
    )
}

export default DynamicStars
