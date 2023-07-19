import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LocationsIndex from "./components/Locations/LocationsIndex";
import LocationDetails from "./components/Locations/LocationDetails";
import AddLocation from "./components/Forms/AddLocation";
import EditLocation from "./components/Forms/EditLocation";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Search from "./components/Navigation/Search";
import Home from "./components/HomePage";
import AddImage from "./components/Forms/AddImage";
import ChangeProfilePic from "./components/Forms/ChangeProfilePic";
import CreateReview from "./components/Forms/CreateReview";
import EditReview from "./components/Forms/EditReview";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ScrollToTop from "./context/ScrollToTop";
import PageNotFound from "./components/Navigation/PageNotFound";
import MapsHome from "./components/Locations/Gmaps/MapsHome";
import MapsPlaces from "./components/Locations/MapsIndex";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false);
  const spinner = document.getElementById('spinner');
  if(spinner){
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);

    }, 3000)
  }
  // const [isContent, setIsContent] = useState(false)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {!loading && isLoaded && (
      <ScrollToTop>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/locations/new">
            <AddLocation />
          </Route>
          <Route exact path="/locations/:id/edit">
            <EditLocation />
          </Route>
          <Route exact path="/locations/:id/photo">
            <AddImage />
          </Route>
          <Route exact path="/user/home/addImage">
            <ChangeProfilePic />
          </Route>
          <Route exact path="/locations">
            <LocationsIndex />
          </Route>
          <Route exact path="/locations/:id">
            <LocationDetails />
          </Route>
          <Route exact path="/locations/:id/review/new">
            <CreateReview />
          </Route>
          <Route exact path="/user/home">
            <ProfilePage />
          </Route>
          <Route exact path="/reviews/:id/edit">
            <EditReview />
          </Route>
          <Route exact path='/search'>
            <Search />
          </Route>
          {/* <Route exact path='/notfound'>
            <PageNotFound />
          </Route> */}
          {/* <Route exact path="/map">
            <MapsPlaces/>
          </Route> */}
          <Route>
            <PageNotFound path='*'/>
          </Route>
        </Switch>
      </ScrollToTop>
      )}
    </>
  );
}

export default App
