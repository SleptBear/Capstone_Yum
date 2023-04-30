import { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Route, useHistory, useParams } from 'react-router-dom'
import { addImage } from '../../store/location'

import "./forms.css"

const AddImage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const id = useParams()
    const locationId = id?.id
    // console.log(locationId)
    const [image, setImage] = useState(null)
    // const [imageLoading, setImageLoading] = useState(null)
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()

    const imgData = {
        image
    }
    // setImageLoading(true)

        dispatch(addImage(locationId, imgData))

        .then(async (res) => history.push(`/locations/${locationId}`))

        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors)
        //   });

    }
    return (
        <div className= "addLocationMain">

            <form className="addLocationform" onSubmit={handleSubmit} encType='multipart/form-data'>
                <h1 className='Form-Title'>Add an Image</h1>
                <ul className="error-message">
                {errors.map((error, idx) => (
                <li key={idx} className="error-text">
                    {error}
                </li>
                ))}
                </ul>

            <label className="Label" id='file-input'>

                <input
                className='custom-file-upload'
                id='file-input'
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
                required
                >
                </input>
                    {/* <label htmlFor='file-input'><i className="fa-solid fa-file-arrow-up"></i> Choose File...</label>
                <div id='file-display'>
                <strong>Chosen File: </strong>
                <div>{image?.name || "None"}</div>
                </div> */}
            </label>
            <button className="submit-form" type="Submit" >Submit</button>
            {/* {(imageLoading) && <p>Loading...</p>} */}
            </form>
        </div>
    )
}

export default AddImage;
