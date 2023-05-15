import { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Route, useHistory, useParams } from 'react-router-dom'
import { changeProfilePic } from '../../store/session'

import "./forms.css"

const ChangeProfilePic = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()

    const imgData = {
        image
    }

        dispatch(changeProfilePic(imgData))

        .then(async (res) => history.push(`/user/home`))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors)
        //   });
    }

    return (
        <div className= "addLocationMain">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form className="addLocationform" onSubmit={handleSubmit}>
                <h1 className='Form-Title'>Change Profile Pic</h1>
                <ul className="error-message">
                {errors.map((error, idx) => (
                <li key={idx} className="error-text">
                    {error}
                </li>
                ))}
                </ul>

            <label className="Label">

                <input
                type='file'
                className='custom-file-upload'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
                >
                </input>
            {/* <input className="size-form"
            type="url"
            value={image}
            placeholder="Image"
            required
            onChange={(e) => {
                setImage(e.target.value)
            }}

            ></input> */}
            </label>
            <br></br>
            <button className="submit-form" type="Submit" >Submit</button>
            </form>
            {/* <Footer /> */}
        </div>
    )
}

export default ChangeProfilePic;
