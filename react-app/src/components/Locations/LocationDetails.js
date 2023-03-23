import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLocation } from '../../store/location'


const LocationDetails = () => {
    const dispatch = useDispatch()
    const locationObj = useSelector(state => state.location.location)
    const id = useParams()
    const locationId = id.id
    console.log(id)

    useEffect(() => {
        dispatch(getLocation(locationId))
    }, [dispatch])

    if(!locationObj) return null
    
    return (

        <div className='details-container'>
        <div className='some-images'>
            images container
        </div>
        <div className="location-details">
            <div className="details-left">
                left
            </div>
            <div className='details-right'>
                right
            </div>
        </div>
    </div>

)

}


export default LocationDetails
