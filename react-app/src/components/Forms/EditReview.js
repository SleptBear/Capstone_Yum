import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { editReview, readUserReviews } from "../../store/review";



const EditReview = () => {
    const dispatch = useDispatch();
    const id = useParams()
    const reviewId = id.id
    const history = useHistory();
    const user = useSelector(state => state.session?.user)
    const currentReview = useSelector(state => state.review?.UserReviews[reviewId])
    console.log("current", currentReview)
    const [rating, setRating] = useState(currentReview?.rating);
    const [review, setReview] = useState(currentReview?.review);

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(readUserReviews(user.id))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ReviewData = {
            "review": review,
            "rating": rating
        }

        dispatch(editReview(Number(reviewId), ReviewData))
        .then(async (res) => {
            const data = await res;
            console.log("Return review data in react", res)
            console.log("Return review data in react", data)
            if(data && data.errors) setErrors([data.errors])
            else {
                history.push(`/user/home`)
            }
        })
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if(data && data.errors) setErrors([data.errors])
        // })
    }

    return (
        <div className= "addLocationMain">

            <form className="addLocationform" onSubmit={handleSubmit}>
                <h1 className='Form-Title'>Thoughts?</h1>
                <ul className="error-message">
                {errors.map((error, idx) => (
                <li key={idx} className="error-text">
                    {error}
                </li>
                ))}
                </ul>
                <label className="Label">
                Review Details
                <textarea
            className="description-form"
            type="text"
            value={review}
            pattern="[-a-zA-Z0-9 .,;:?! ]*"
            placeholder="Give us your thoughts."
            maxLength={255}
            onChange={(e) => {
                setReview(e.target.value)
            }}
            required

            ></textarea>
            </label>
            <label className="Label">
                rating
              <select className="size-form"

                value={rating}
                required
                onChange={(e) => setRating(Number(e.target.value))}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>
            {/* <label className="Label">
                Image
            <input className="size-form"
            type="url"
            value={image}
            placeholder="Image"
            required
            onChange={(e) => {
                setImage(e.target.value)
            }}

            ></input>
            </label> */}
            <button className="submit-form" type="Submit" >Submit</button>
            </form>
        </div>
    )
}


export default EditReview
