import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getLocation } from '../../store/location'
import MiniLocation from './MiniLocation'
import LocationReviews from '../Reviews/LocationReviews'
import AllImages from './Images/images'
import UserBar from './UserBar'

const LocationDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [isLoading, setIsLoading] = useState(false)
    const location = useSelector(state => state.location)
    const locationObj = location.location
    const review = useSelector(state => state.review)
    const session = useSelector(state => state.session)
    const reviewObj = review.LocationReviews
    const userObj = session?.user
    const id = useParams()
    const locationId = id.id
    const imagesArray = locationObj.images

    useEffect(() => {
        // setIsLoading(true)
        dispatch(getLocation(locationId))
        // setIsLoading(false)
        // .then(dispatch(readReviews(locationId)))
    }, [dispatch, locationId, session])


    if(!locationObj.id) return null
    // if(!reviewObj) return null
    let copyArray = imagesArray.slice(0,5)
    // let reviewsArray = Object.values(reviewObj)
    // console.log("here", reviewsArray)
    // let props = {
    //     'location': locationObj,
    //     'reviews': reviewObj
    // }

    const handleBookmark = async (e) => {
        e.preventDefault()
        window.alert("TEST")
        return
    }



    return (


        <div className='details-container'>
            {/* {isLoading ? (<p>Loadiing...</p>
            ) : ( */}

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
            {/* )} */}
        <div className='over-images'>
            <MiniLocation location={locationObj}/>
            <AllImages location={locationObj} />
        </div>
        <div className="location-details">
            <div className="details-left">
                <UserBar locationId={locationId} user={userObj}/>

                <div className='leftReviews-container'>
                    <LocationReviews location={locationObj}/>
                </div>
            </div>
            <div className='details-right'>
                <div className='Website-Section'>
                    <div>https://www.RestaurantName.com</div>
                    <a id="not-allowed" onClick={() => window.alert("Outside Link coming soon")}><i className="fa-solid fa-up-right-from-square"></i></a>
                </div>
                <hr></hr>
                <div className='phone-section'>
                    <div>{locationObj.phone}</div>
                    <div><i className="fa-solid fa-phone-volume"></i></div>
                </div>
                <hr></hr>
                <div className='message-section'>
                    <div>Message the Business</div>
                    <a id="not-allowed" onClick={() => window.alert("messages coming soon")}><i className="fa-solid fa-comment-dots"></i></a>

                </div>
            </div>
        </div>
        {/* <Footer /> */}
    </div>

)

}


export default LocationDetails
