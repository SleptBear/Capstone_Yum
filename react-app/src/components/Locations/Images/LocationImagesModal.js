import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import './images.css'

function LocationImagesModal(location) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const locationObj = location.location.location
  const imagesArray = locationObj.images
  console.log("test", location.location.location)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = await dispatch(login(email, password));
//     if (data) {
//       setErrors(data);
//     } else {
//         closeModal()
//     }
//   };
if(!locationObj.name) return null
  return (
    <>
    <div className="image-modal">
      <h1>Photos for {`${locationObj?.name}`}</h1>
        <div className="all-images-container">

      {
          imagesArray.map(img => (
              <div key={img.id}>
                    <img src={img.img_url}></img>
                </div>
                ))
            }
        </div>
    </div>

    </>
  );
}

export default LocationImagesModal;
