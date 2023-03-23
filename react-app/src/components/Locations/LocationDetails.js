import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLocation } from '../../store/location'
import MiniLocation from './MiniLocation'


const LocationDetails = () => {
    const dispatch = useDispatch()
    const locationObj = useSelector(state => state.location.location)
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
            <div className='individual-image'>
            {imagesArray.map(image => (
                <img src={image.img_url} key={image.id} alt='not found' ></img>
            ))}
            </div>
        </div>
        <div className='over-images'>
            <MiniLocation location={locationObj}/>
        </div>
        <div className="location-details">
            <div className="details-left">
                <div className='topLeft'>
                    <button>Write a Review</button>
                    <button>Add Photo</button>
                    <button>Share</button>
                    <button>Save</button>
                    <button>Follow</button>
                </div>
                <div className='leftReviews-container'>
                    Reviews Component
                </div>
            </div>
            <div className='details-right'>
                right
            </div>
        </div>
    </div>

)

}


export default LocationDetails
