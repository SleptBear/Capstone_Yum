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
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
            <form className="addLocationform" onSubmit={handleSubmit} encType='multipart/form-data'>
                <h1 className='Form-Title'>Add an Image</h1>
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
            {/* {(imageLoading) && <p>Loading...</p>} */}
            </form>
        </div>
    )
}

export default AddImage;
