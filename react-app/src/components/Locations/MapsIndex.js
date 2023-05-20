import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLocations, getLocations } from "../../store/location";
import LocationCard from "./LocationCard";
import { Link } from "react-router-dom";
import MapsHome from "./Gmaps/MapsHome";

export default function MapsPlaces({ selectedCategory }) {
  const dispatch = useDispatch();
  const placesObj = useSelector((state) => state.location.locations);
  let placesArr = Object.values(placesObj);
  const [selectedPlaceFromAllPlaces, setSelectedPlaceFromAllPlaces] =
    useState(null);
  const [selectedCategoryForPlaces, setSelectedCategoryForPlaces] =
    useState(selectedCategory);

  useEffect(() => {
    dispatch(getLocations());
    return () => {
      dispatch(clearLocations());
    };
  }, [dispatch]);

  if (selectedCategoryForPlaces && placesArr.length) {
    console.log("filter locations", placesArr)
    let filteredPlacesArr = placesArr.filter(
      (el) => el.category === selectedCategoryForPlaces
    );
    placesArr = filteredPlacesArr;
  }

  if (!placesObj) {
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

  return (
    <div className="allPinsPage">
      <div className="filters">
        <h2>Filters</h2>
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
      <div className="places">
        <h2>All places</h2>
        {placesArr?.map((location) => (
          <div
            key={location.id}
            onMouseOver={() => setSelectedPlaceFromAllPlaces(location)}
            onMouseOut={() => setSelectedPlaceFromAllPlaces(null)}
          >
            {/* {console.log(location)} */}
            <Link key={location.id} to={`/locations/${location.id}`} style={{textDecoration: "none", color: 'black'}}>
            <LocationCard key={location.id} location={location} />
            </Link>
          </div>
        ))}
      </div>
      {placesArr?.length ? (
        <MapsHome
          placesArr={placesArr}
          selectedPlaceFromAllPlaces={selectedPlaceFromAllPlaces}
        />
      ) : (
        <MapsHome />
      )}
    </div>
  );
}
