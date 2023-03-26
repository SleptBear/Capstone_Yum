import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLocation } from '../../store/location'
import MiniLocation from './MiniLocation'
import LocationReviews from '../Reviews/LocationReviews'
import AllImages from './Images/images'


const LocationDetails = () => {
    const dispatch = useDispatch()
    const locationObj = useSelector(state => state.location.location)
    const reviewObj = useSelector(state => state.review.LocationReviews)
    const id = useParams()
    const locationId = id.id
    const imagesArray = locationObj.images

    useEffect(() => {
        dispatch(getLocation(locationId))
    }, [dispatch, locationId])
    if(!locationObj.id) return null




    return (

        <div className='details-container'>
        <div className='some-images'
    //     style={{
    // backgroundImage: `url(${imagesArray[0].img_url})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "stretch",
    // width: "2000px"}}
    >
            {imagesArray.map(image => (
            <div className='individual-image'>
                <img src={image.img_url} key={image.id} alt='not found' ></img>
            </div>
            ))}
        </div>
        <div className='over-images'>
            <MiniLocation location={locationObj} />
            <AllImages location={locationObj} reviews={reviewObj} />
        </div>
        <div className="location-details">
            <div className="details-left">
                <div className='topLeft'>
                    <div className='WriteReview'>
                    <button onClick={() => window.alert("Coming Soon")}><i class="fa-regular fa-star"></i> Write a Review</button>
                    </div>

                    <button onClick={() => window.alert("Coming Soon")}><i class="fa-solid fa-camera"></i> Add Photo</button>
                    <button onClick={() => window.alert("Coming Soon")}><i class="fa-solid fa-arrow-up-from-bracket"></i> Share</button>
                    <button onClick={() => window.alert("Coming Soon")}><i class="fa-regular fa-bookmark"></i> Save</button>
                    <button onClick={() => window.alert("Coming Soon")}><i class="fa-solid fa-plus"></i> Follow</button>
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
                    <div><i class="fa-solid fa-up-right-from-square"></i></div>
                </div>
                <div className='phone-section'>
                    <div>{locationObj.phone}</div>
                    <div><i class="fa-solid fa-phone-volume"></i></div>
                </div>
                <div className='message-section'>
                    <div>Message the Business</div>
                    <div><i class="fa-solid fa-comment-dots"></i></div>

                </div>
            </div>
        </div>
    </div>

)

}


export default LocationDetails
