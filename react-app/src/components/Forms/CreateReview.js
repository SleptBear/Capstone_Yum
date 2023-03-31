import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'

import { addReview } from "../../store/review";



const CreateReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session?.user)
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const id = useParams()
    const locationId = id.id

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ReviewData = {
            "review": review,
            "rating": rating
        }

        dispatch(addReview(Number(locationId), ReviewData))
        .then(async (res) => {
            const data = await res.json();
            console.log("Return review data in react", data)
            if(data && data.errors) setErrors([data.errors])
            if (res.ok) {
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
            <label className="Label" style={{alignItems: 'center'}}>
                {/* rating */}
                <ReactStars
                        count={5}
                        value={rating}
                        onChange={setRating}
                        size={22}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
              {/* <select className="size-form"

                value={rating}
                required
                // onChange={(e) => setRating(Number(e.target.value))}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select> */}
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


export default CreateReview
