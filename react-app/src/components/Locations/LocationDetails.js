import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getLocation } from '../../store/location'
import MiniLocation from './MiniLocation'
import LocationReviews from '../Reviews/LocationReviews'
import AllImages from './Images/images'
import { readReviews } from '../../store/review'


const LocationDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useSelector(state => state.location)
    const locationObj = location.location
    const review = useSelector(state => state.review)
    const reviewObj = review.LocationReviews
    const id = useParams()
    const locationId = id.id
    const imagesArray = locationObj.images

    useEffect(() => {
        dispatch(getLocation(locationId))
        // .then(dispatch(readReviews(locationId)))
    }, [dispatch, locationId, reviewObj])


    if(!locationObj.id) return null
    // if(!reviewObj) return null
    let copyArray = imagesArray.slice(0,5)
    // let reviewsArray = Object.values(reviewObj)
    // console.log("here", reviewsArray)
    // let props = {
    //     'location': locationObj,
    //     'reviews': reviewObj
    // }




    return (

        <div className='details-container'>
        <div className='some-images'
    //     style={{
    // backgroundImage: `url(${imagesArray[0].img_url})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "stretch",
    // width: "2000px"}}
    >
            {copyArray.map(image => (
            <div className='individual-image' key={image.id}>
                <img src={image.img_url} alt='not found' ></img>
            </div>
            ))}
        </div>
        <div className='over-images'>
            <MiniLocation location={locationObj}/>
            <AllImages location={locationObj} />
        </div>
        <div className="location-details">
            <div className="details-left">
                <div className='topLeft'>
                    <div className='WriteReview'>
                    <button onClick={() => history.push(`/locations/${locationId}/review/new`)}><i className="fa-regular fa-star"></i> Write a Review</button>
                    </div>

                    <button onClick={() => history.push(`/locations/${locationId}/photo`)}><i className="fa-solid fa-camera"></i> Add Photo</button>
                    <button onClick={() => window.alert("Coming Soon")}><i className="fa-solid fa-arrow-up-from-bracket"></i> Share</button>
                    <button onClick={() => window.alert("Coming Soon")}><i className="fa-regular fa-bookmark"></i> Save</button>
                    <button onClick={() => window.alert("Coming Soon")}><i className="fa-solid fa-plus"></i> Follow</button>
                </div>
                {/* <br></br> */}
                {/* <hr style={{width: "90%", height: "1px", color: "#ebebeb"}}></hr> */}
                <div className='leftReviews-container'>
                    <LocationReviews />
                </div>
            </div>
            <div className='details-right'>
                <div className='Website-Section'>
                    <div>https://www.RestaurantName.com</div>
                    <a onClick={() => window.alert("Outside Link coming soon")}><i className="fa-solid fa-up-right-from-square"></i></a>
                </div>
                <hr></hr>
                <div className='phone-section'>
                    <div>{locationObj.phone}</div>
                    <div><i className="fa-solid fa-phone-volume"></i></div>
                </div>
                <hr></hr>
                <div className='message-section'>
                    <div>Message the Business</div>
                    <a onClick={() => window.alert("messages coming soon")}><i className="fa-solid fa-comment-dots"></i></a>

                </div>
            </div>
        </div>
    </div>

)

}


export default LocationDetails
