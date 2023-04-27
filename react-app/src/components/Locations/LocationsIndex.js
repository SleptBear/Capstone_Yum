import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocations } from "../../store/location";
import LocationCard from "./LocationCard";
import './index.css'

const LocationsIndex = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const locationsObj = useSelector(state => state.location)
    const searchObj = useSelector(state => state.search)
    const filteredLocations = Object.values(searchObj)
    const locations = Object.values(locationsObj?.locations)

    useEffect(() => {
        setIsLoading(true);
        dispatch(getLocations());
        setIsLoading(false);
    }, [dispatch])

    // console.log("Locations Index Render")

    // console.log("locations reversed array", Locations)

    if(!locations[0]) return null
    // console.log("all Locations", locations)
    // console.log("search Locations", filteredLocations)
    let data = locations
    // if (filteredLocations[0]) data = filteredLocations


    return (
        <>
        {isLoading ? (<p>Loading...</p>
        ) : (

            <div className="outside">

<section className="body-container">
    <div className="body-container-items">
        {/* <div className="filters">
            filter component in development
        </div> */}
        <div className="all-cards-container">

        {
            data.map(location => (
                <Link key={location.id} to={`/locations/${location.id}`} style={{textDecoration: "none", color: 'black'}}>
                    <LocationCard location={location} />
                </Link>
                ))
        }

        </div>
        <div className="maps-api-container">
            <img onClick={() => window.alert("Google Maps API Coming Soon")} src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg' alt="Maps API Container"></img>
        </div>
    </div>

</section>
</div>
                )}
                {/* <Footer />  */}
        </>
    )

}

export default LocationsIndex;
