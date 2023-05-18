import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocations, clearLocations } from "../../store/location";
import LocationCard from "./LocationCard";
import MapsHome from "./Gmaps/MapsHome";
import './index.css'

const LocationsIndex = ({ selectedCategory }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const locationsObj = useSelector(state => state.location)
    const searchObj = useSelector(state => state.search)
    // const filteredLocations = Object.values(searchObj)
    let locations = Object.values(locationsObj?.locations)
    const [selectedPlaceFromAllPlaces, setSelectedPlaceFromAllPlaces] =
    useState(null);
  const [selectedCategoryForPlaces, setSelectedCategoryForPlaces] =
    useState(selectedCategory);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getLocations());
        setIsLoading(false);
        return () => {
            dispatch(clearLocations());
          };
    }, [dispatch])

    if (selectedCategoryForPlaces && locations.length) {
        // console.log("filter locations", locations)
        let filteredPlacesArr = locations.filter(
          (el) => el.category === selectedCategoryForPlaces
        );
        locations = filteredPlacesArr;
      }

      if (!locationsObj) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img
              src="https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/6134707265a929f4cdfc1f6d_5.gif"
              alt="Loading"
            ></img>
          </div>
        );
      }

    if(!locations[0]) return null



    return (
        <>
        {isLoading ? (<p>Loading...</p>
        ) : (

            <div className="outside">

<section className="body-container">
    <div className="body-container-items">
        <div className="filter-container">
        <h2>Filters</h2>
        <hr style={{width: "95%"}}></hr>
        <div className="filters">

        <label>
          <input
            type="checkbox"
            onChange={() =>
                selectedCategoryForPlaces !== "Burgers"
                ? setSelectedCategoryForPlaces("Burgers")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Burgers"}
            ></input>{" "}
          Burgers
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
                selectedCategoryForPlaces !== "Chinese"
                ? setSelectedCategoryForPlaces("Chinese")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Chinese"}
          ></input>{" "}
          Chinese
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
                selectedCategoryForPlaces !== "Japanese"
                ? setSelectedCategoryForPlaces("Japanese")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Japanese"}
            ></input>{" "}
          Japanese
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
                selectedCategoryForPlaces !== "Mexican"
                ? setSelectedCategoryForPlaces("Mexican")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Mexican"}
            ></input>{" "}
          Mexican
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
                selectedCategoryForPlaces !== "Italian"
                ? setSelectedCategoryForPlaces("Italian")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Italian"}
            ></input>{" "}
          Italian
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
                selectedCategoryForPlaces !== "Seafood"
                ? setSelectedCategoryForPlaces("Seafood")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Seafood"}
            ></input>{" "}
          Seafood
        </label>
            </div>
            <hr style={{width: "95%"}}></hr>
        </div>
        <div className="all-cards-container">

        {locations?.map((location) => (
            <div
            key={location.id}
            onMouseOver={() => setSelectedPlaceFromAllPlaces(location)}
            onMouseOut={() => setSelectedPlaceFromAllPlaces(null)}
            >
            {console.log(location)}
            <Link key={location.id} to={`/locations/${location.id}`} style={{textDecoration: "none", color: 'black'}}>
            <LocationCard key={location.id} location={location} />
            </Link>
          </div>
        ))}

        </div>
        <div className="maps-api-container">
            {/* <img onClick={() => window.alert("Google Maps API Coming Soon")} src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg' alt="Maps API Container"></img> */}
            {locations?.length ? (
                <MapsHome
          locations={locations}
          selectedPlaceFromAllPlaces={selectedPlaceFromAllPlaces}
        />
      ) : (
        <MapsHome />
      )}
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
