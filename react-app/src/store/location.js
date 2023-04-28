const NEW_LOCATION = 'location/newLocation'
const LOAD_LOCATIONS = 'location/loadLocations'
const EDIT_LOCATION = 'location/editLocation'
const DELETE_LOCATION = 'location/deleteLocation'
const LOAD_ONE_LOCATION = 'location/loadOneLocation'
const ADD_IMAGE = 'location/addImage'

export const actionCreateLocation = (location) => ({
    type: NEW_LOCATION,
    location
})
export const actionReadLocation = (location) => ({
    type: LOAD_ONE_LOCATION,
    location
})
export const actionReadLocations = (locations) => ({
    type: LOAD_LOCATIONS,
    locations
})
export const actionUpdateLocation = (location) => ({
    type: EDIT_LOCATION,
    location
})
export const actionDeleteLocation = (id) => ({
    type: DELETE_LOCATION,
    id
})
export const actionAddImage = (img) => ({
    type: ADD_IMAGE,
    payload: img
})

export const addImage = (locationId, imgData) => async dispatch => {
    console.log(locationId)
    console.log(imgData.image)
    const formData = new FormData();
    console.log(formData)
    formData.append("image", imgData.image);
    // formData["image"] = imgData.image;
    console.log('formData', formData)

    const res = await fetch(`/api/locations/${locationId}/images`, {
        method: 'POST',
        // headers: {
        //     "Content-Type": ''
        // },
        body: formData
    })


    let data = await res.json()
    return data
}

export const getLocations = () => async dispatch => {
    const res = await fetch('/api/locations');
    // console.log("res", res)
    if (res.ok) {
    const locations = await res.json();
    // console.log("res json", locations)
    let normalizedLocations = {}
    let spotsArray = locations
    // console.log( locations Array', spotsArray)

        spotsArray.forEach(spot => {
            normalizedLocations[spot.id] = spot
        });
        // console.log(' locations', locations)
        // console.log('normalized locations', normalizedLocations)
        dispatch(actionReadLocations(normalizedLocations))
    }
    return res
}

export const getLocation = (locationId) => async dispatch => {
    const res = await fetch(`/api/locations/${locationId}`);

    const location = await res.json();
    if (res.ok) {

        dispatch(actionReadLocation(location))
    }
    return location
}


export const createLocation = (location, imgData) => async dispatch => {
    // console.log("locationData", location)
    const res = await fetch('/api/locations', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(location)
})

let data =await res.json()
if (res.ok) {

    const formData = new FormData();
    console.log(formData)
    formData.append("image", imgData.image);
    // formData["image"] = imgData.image;
    console.log('formData', formData)

    const res2 = await fetch(`/api/locations/${data.id}/images`, {
        method: 'POST',
        body: formData
    })
    if(res2.ok) {
        const data2 = await res2.json();
        data.images = data2
    }

    // dispatch(getSpot(data.id))
    console.log("DATA=========>", data)
    dispatch(actionCreateLocation(data))
    return data
}
// if (data.errors) {
    //     return data.errors;
    // }
    // console.log('test')
    // console.log("RES=========>", res)
    // console.log("DATA=========>", data)
return data
}

export const updateLocation = (location, locationId) => async dispatch => {
    console.log(location)
    const res = await fetch(`/api/locations/${locationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(location)
    })
    if(res.ok) {
        console.log(res)
    }
    // console.log("response", res)
    // const data = await res.json();
    // console.log('updated spot', data)
    // console.log('res status', res.ok)
    // console.log("update data", data)
    return res
}



export const deleteLocation = (locationId) => async dispatch => {
    console.log(locationId)
    const res = await fetch(`/api/locations/${locationId}`, {
        method: 'DELETE'})
        // let data;
        if (res.ok) {
            // data = await res.json();
            dispatch(actionDeleteLocation(locationId))
            // dispatch(actionReadSpots())
            //todo for all thunks return data to send back to component for error handeling
        }
    // console.log("res", res)
    return res
}

const initialState = { locations: {}, location: {} }

export default function locationReducer(state = initialState, action) {
    let newState = { ...state}
    switch (action.type) {
        case NEW_LOCATION:
            // newState[action.spot.id] = action.spot
            newState = { ...state, locations: {...state.locations}, location: {...state.location} }
            newState.locations[action.location.id] = action.location
            // newState.spot = action.spot
            //todo go back to normalizing data here in reducer to account for differing state shapes of spot and spots
            //todo think about chaining thunk dispatches
            //todo can try to add get state to thunk if feature still not working
            return newState

        case LOAD_LOCATIONS:
            newState.locations = {...action.locations}
            newState.location = {}
            // newState.spot = {}
            return newState

        case LOAD_ONE_LOCATION:
            newState = { ...state, locations: {}, location: {...state.location} }
            newState.location = action.location
            // newState.spots = {}
            return newState

        case EDIT_LOCATION:
            newState = { ...state, locations: {...state.locations}, location: {...state.location} }
            newState.location = action.location
            // console.log("UPDATE TEST", newState)
            return newState

        case DELETE_LOCATION:
            // newState = { ...state, spots: {...state.spots}, spot: {...state.spot}
            newState = {...state, locations: {...state.locations}, location: {...state.location}}
            delete newState.locations[action.id]
            newState.location = {}
            return newState

        default:
            return state;
    }
}
