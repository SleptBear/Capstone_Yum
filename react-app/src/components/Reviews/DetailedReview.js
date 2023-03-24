// import { useEffect } from "react"
// import { useDispatch } from "react-redux"


function DetailedReview(review) {
    // const dispatch = useDispatch()
    const rev = review?.review


    // useEffect(() => {

    // }, [dispatch])
    return (
        <div>
            Rating: {rev.rating} 
        </div>
    )
}


export default DetailedReview
