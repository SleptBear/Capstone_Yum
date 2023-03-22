import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { getLocations } from "../../store/location";
import LocationCard from "./LocationCard";

const LocationsIndex = () => {
    const dispatch = useDispatch();
    const locationsObj = useSelector(state => state.location.locations)
    const locations = Object.values(locationsObj)

    useEffect(() => {
        dispatch(getLocations())
    }, [dispatch])

    console.log("state Locations", locationsObj)
    console.log("locations array", locations)

    if(!locations[0]) return null

    return (
        <>
        <div className="outside">

<section className="body-container">
    <div className="body-container-items">
        {/* <LocationCard location={locations[0]} /> */}

        {
            locations.map(location => (
                // <Link key={location.id.toString()} to={`/locations/${location.id}`}>
                <LocationCard location={location} />
            // </Link>
                ))
            }

    </div>

</section>
</div>
        </>
    )

}

export default LocationsIndex;
