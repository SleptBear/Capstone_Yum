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
import Home from "./components/HomePage";
import Footer from "./components/Footer";
import AddImage from "./components/Forms/AddImage";
import CreateReview from "./components/Forms/CreateReview";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
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
        </Switch>

      )}
      <Footer />
    </>
  );
}

export default App;
