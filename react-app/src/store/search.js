import { getLocations } from "./location"

const CREATE_SEARCH = "search/create"
const CLEAR_SEARCH = "search/clear"

const createSearch = (search) => ({
    type: CREATE_SEARCH,
    payload: search
})

const clearSearch = () => ({
    type: CLEAR_SEARCH,
    payload: []
})

//THUNK

export const searchThunk = (search) => async (dispatch) => {
    const response = await fetch(`/api/search/${search}`);

    if (response.ok){
        const data = await response.json()
        dispatch(createSearch(data))
        dispatch(getLocations())
        // console.log(data)
        // dispatch(clearSearchThunk())
        return data
    }

}

export const clearSearchThunk = () => async (dispatch) => {
        dispatch(clearSearch())
}

//initial state

const initialState = {}

export const search = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case CREATE_SEARCH:
            newState = {}
            action.payload.forEach(result =>
                newState[result.id] = result)
            return newState
        case CLEAR_SEARCH:
            newState = {}
            return newState


      default:
        return state;
    }
}
