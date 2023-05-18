import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";

const MapsHome = ({ placesArr, selectedPlaceFromAllPlaces }) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [map, setMap] = useState(null);
  const apiKey = 'AIzaSyBsY8gj4A2wmK_zUZh3LZ0gr10tosNG9tA'

  const [selectedPlace, setSelectedPlace] = useState(
    selectedPlaceFromAllPlaces
  );

  useEffect(() => {
    setSelectedPlace(selectedPlaceFromAllPlaces);
  }, [selectedPlaceFromAllPlaces]);

  //This sets the center of the map. This must be set BEFORE the map loads
  const [currentPosition, setCurrentPosition] = useState({
    lat: +user?.lat || 42.3770029,
    lng: +user?.lng || -71.1188488,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBsY8gj4A2wmK_zUZh3LZ0gr10tosNG9tA",
  });

  const containerStyle = {
    width: "420px",
    height: "100vh",
    position: "relative",
    marginTop: "20px",
  };

  const iconCurrent = {
    // M - move to a point; L - draw a line from current point to a new point; Z - close the current path
    path: "M 8 0 L 10.472 6.472 L 17.472 7.472 L 12.472 12.472 L 13.472 19.472 L 8 16 L 2.528 19.472 L 3.528 12.472 L -1.472 7.472 L 5.528 6.472 Z",
    fillColor: "red",
    fillOpacity: 1,
    // border color
    strokeColor: "red",
    strokeWeight: 1,
    // size of the marker
    scale: 1.5,
  };

  const icon = {
    // M - move to a point; L - draw a line from current point to a new point; Z - close the current path
    path: "M 8 0 L 10.472 6.472 L 17.472 7.472 L 12.472 12.472 L 13.472 19.472 L 8 16 L 2.528 19.472 L 3.528 12.472 L -1.472 7.472 L 5.528 6.472 Z",
    fillColor: "#01b636",
    fillOpacity: 1,
    // border color
    strokeColor: "#74E39A",
    strokeWeight: 1,
    // size of the marker
    scale: 1.5,
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div className="map_page__container">
      <div
        style={{
          height: "100vh",
          width: "420px",
          position: "sticky",
          right: 0,
          top: 0,
        }}
      >
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={11}
            center={currentPosition}
            onUnmount={onUnmount}
          >
            <Marker
              position={currentPosition}
              title="Current"
              icon={iconCurrent}
              streetView={false}
            ></Marker>
            {placesArr?.length &&
              placesArr?.map((location) => (
                <Marker
                  key={location.id}
                  position={{ lat: +location.lat, lng: +location.lng }}
                  title={location.name}
                  icon={icon}
                  streetView={false}
                  style={{ cursor: "pointer" }}
                  onMouseOver={() => setSelectedPlace(location)}
                  onMouseOut={() => setSelectedPlace(null)}
                  onClick={() => history.push(`/locations/${location.id}`)}
                >
                  {selectedPlace?.id === location.id &&
                    selectedPlace.lat &&
                    selectedPlace.lng && (
                      <InfoWindow
                        position={{ lat: +location.lat, lng: +location.lng }}
                        // options={{ closeBox: false }}
                      >
                        <div>
                          <img
                            src={location.images[0].img_url}
                            alt={location.name}
                            style={{ height: "120px", width: "120px" }}
                          />
                          <div style={{ fontWeight: 500, fontSize: "14px" }}>
                            {location.name}
                          </div>
                          <div>{location.address}</div>
                          <div>
                            {location.city}, {location.state}
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                </Marker>
              ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default MapsHome;
