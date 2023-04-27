import { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Route, useHistory, useParams } from 'react-router-dom'
import { addImage } from '../../store/location'
import Footer from '../Footer'

import "./forms.css"

const AddImage = () => {
    const id = useParams()
    const locationId = id?.id
    // console.log(locationId)

    const [image, setImage] = useState('')
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault()

    const imgData = {
        image_url: image
    }

        dispatch(addImage(locationId, imgData))

        .then(async (res) => history.push(`/locations/${locationId}`))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors)
        //   });
    }

    return (
        <div className= "addLocationMain">

            <form className="addLocationform" onSubmit={handleSubmit}>
                <h1 className='Form-Title'>Add an Image</h1>
                <ul className="error-message">
                {errors.map((error, idx) => (
                <li key={idx} className="error-text">
                    {error}
                </li>
                ))}
                </ul>

            <label className="Label">
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
            </label>
            <button className="submit-form" type="Submit" >Submit</button>
            </form>
                <Footer />
        </div>
    )
}

export default AddImage;
