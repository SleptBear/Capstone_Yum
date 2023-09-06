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


    function handleFileSelect(e) {
        const files = e.target.files

        if (files.length > 0) {
            const file = files[0];

            if (file.type.startsWith('image/')) {

              const reader = new FileReader();

              reader.onload = () => {
                const imageDataUrl = reader.result;
                setImage(file);
              };
              reader.readAsDataURL(file);
            } else {
              alert('Please drop an image file.');
            }
          }
        }

    function handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
      }

      function handleFileDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');

        const files = e.dataTransfer.files;

        if (files.length > 0) {
          const file = files[0];

          if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = () => {
              const imageDataUrl = reader.result;
              setImage(file);
            };

            reader.readAsDataURL(file);
          } else {
            alert('Please drop an image file.');
          }
        }
      }

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

                <div
                className={`custom-file-upload ${image ? 'active' : ''}`}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleFileDrop(e)}
                >

                <input
                type='file'
                accept='image/*'
                onChange={(e) => handleFileSelect(e)}
                title='Please add Image of location'
                required
                >
                    {/* <i class="fa-solid fa-file-arrow-up"></i> */}
                </input>
                <img
                className="preview-image"
                src={image ? URL.createObjectURL(image) : ''}
                alt="Preview"
                    />
                    <span>{image ? image?.name : <i className="fa-solid fa-file-arrow-up"></i>}</span>
                    </div>
            </label>
            <br></br>
            <button className="submit-form" type="Submit" >Submit</button>
            </form>
            {/* <Footer /> */}
        </div>
    )
}

export default ChangeProfilePic;
