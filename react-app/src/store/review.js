const ADD_REVIEW = 'reviews/addReview'
const READ_LOCATIONS_REVIEWS = 'reviews/readLocationReviews'
const DELETE_REVIEW = 'reviews/deleteReview'
const EDIT_REVIEW = 'reviews/editReview' // editing/update a review


const actionAddReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

const actionReadReview = (reviews) => ({
    type: READ_LOCATIONS_REVIEWS,
    payload: reviews
})

export const actionUpdateReview = (reviews) => ({
    type: EDIT_REVIEW,
    payload: reviews
})

const actionDeleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

//THUNKS
export const addReview = (id, review) => async (dispatch) => {

    console.log("REVIEW", review)
    console.log("ID", id)
    const response = await fetch(`/api/reviews` , {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            location_id: id,
            review: review.review,
            rating: review.rating
        })
    })
    // console.log("RESPONSE", response)
    if (response.ok) {
        const review = await response.json();
        console.log("good review", review)
        // dispatch(addReview(review))

    }
    console.log("review return response", response)
    return response
}

export const readReviews = (locationId) => async (dispatch) => {
    const response = await fetch(`/api/locations/${locationId}/reviews`)
    const reviews = await response.json()
    if (response.ok) dispatch(actionReadReview(reviews))
    return response
}

export const editReview = (updatedReview) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${updatedReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateReview(data))
        return data
    }
}



export const deleteReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(actionDeleteReview(data))
        return data
    }
}

//initial state

let initialState = {
    LocationReviews:{},
    UserReviews:{},
    AllReviews:{}
}
//REDUCER

        const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case READ_LOCATIONS_REVIEWS:
            newState = { ...state}
            let reviewsCopy = {}

            action.payload.reviews.forEach(review => {
                reviewsCopy[review.id] = review
            })
            newState.LocationReviews = reviewsCopy
            return newState
        case ADD_REVIEW:
            newState = {...state}
            let newStateCopy = {...newState.LocationReviews}
            newStateCopy[action.payload.id] = action.payload
            newState.allLocations = newStateCopy
            return newState

        case EDIT_REVIEW:
            const updatedReviews = { ...state.reviews }
            updatedReviews[action.payload.id] = action.payload
            return { ...state, reviews: updatedReviews }
        case DELETE_REVIEW:
            newState = {...state}
            let reviewCopy = {...newState.LocationReviews}
            delete reviewCopy[action.payload.id]
            newState.LocationReviews = reviewCopy
            return newState
        default:
            return state;
    }
}

export default reviewsReducer
