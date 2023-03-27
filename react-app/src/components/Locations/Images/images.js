import React, { useState } from "react"
import { useDispatch } from "react-redux"
import OpenModalButton from "../../OpenModalButton"
import LocationImagesModal from "./LocationImagesModal"
import './images.css'



function AllImages(location) {
    const dispatch= useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    console.log("prop", location?.location)
    if(!location?.location.id) return null

    const closeMenu = () => setShowMenu(false);
    return (
        <div className="mini-images">
            {/* <button onClick={() => window.alert("Photo Modal Coming Soon")}>See all Photos</button> */}
            {/* <button onClick={() => OpenModalButton({LocationImagesModal}) }>See all Photos</button> */}
            <OpenModalButton
              buttonText="All Photos"
              onItemClick={closeMenu}
              modalComponent={<LocationImagesModal location={location}/>}
            />
        </div>
    )
}


export default AllImages
