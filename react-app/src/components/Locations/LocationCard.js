import React from "react";
import { useSelector } from "react-redux";
import './Card.css'

function LocationCard({location}) {

    console.log("prop", location)

    return (
        <div className="card-container">
            <div className="image-container">
                <img src={location.preview} alt='NOT FOUND'></img>
            </div>
            {/* <br></br> */}
        <div className="card-info">
            <div className="card-name">
                <h2>{location.id}. {location.name}</h2>
            </div>
            <div>
                Stars and number of reviews
            </div>
            <br></br>
            <div>
                types of food or category / filters
            </div>
            <br></br>
            <div>
                Hours: {location.operating_hours}
            </div>

            <div className="card-title">
                <h3>{location.city}, {location.state} </h3>
                sample review or description
                {/* <h3>{checkStar()} {checkAvg()}</h3> */}
            </div>
            <div>
            </div>
            {/* <br></br> */}
            <div className="card-body">
                {/* <div>$ {checkPrice()} night</div> */}
            </div>
        </div>
       </div>
    )
}

export default LocationCard
