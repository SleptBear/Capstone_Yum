const NEW_LOCATION = 'location/newLocation'
const LOAD_LOCATION = 'location/loadLocation'
const EDIT_LOCATION = 'location/editLocation'
const DELETE_LOCATION = 'location/deleteLocation'
const LOAD_ONE_LOCATION = 'location/loadOneLocation'
// const ADD_IMAGE = 'product/addImage'

export const actionCreateLocation = (spot) => ({
    type: CREATE,
    spot
})
export const actionReadLocation = (spots) => ({
    type: READ_ALL,
    spots
})
export const actionReadLocations = (spot) => ({
    type: READ_ONE,
    spot
})
export const actionUpdateLocation = (spot) => ({
    type: UPDATE,
    spot
})
export const actionDeleteLocation = (id) => ({
    type: DELETE,
    id
})

export const getLocations = () => async dispatch => {
    const res = await csrfFetch('/api/locations/');
    // console.log("res", res)
    if (res.ok) {
    const locations = await res.json();
    // console.log("res json", locations)
    let normalizedLocations = {}
    let spotsArray = locations.Locations
    // console.log( locations Array', spotsArray)

        spotsArray.forEach(spot => {
            normalizedSpots[spot.id] = spot
        });
        // console.log('normalized locations', normalizedSpots)
        dispatch(actionReadLocations(normalizedLocations))
    }
    return res
}


export const createLocation = (spot, imgData) => async dispatch => {

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
})


if (res.ok) {
    const data = await res.json()
    const res2 = await csrfFetch(`/api/spots/${data.id}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(imgData)
    })
    if(res2.ok) {
        const data2 = await res2.json();
        data.previewImage = data2.url
    }


    // dispatch(getSpot(data.id))
    dispatch(actionCreateSpot(data))

        return data
    }


}
