import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AddFavorite, RemoveFavorite } from "../../store/session"
import { useEffect } from "react"



const UserBar = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    // console.log(props)
    let locationId = props.locationId
    let bookmarkName = "fa-regular fa-bookmark"

    const handleBookmark = async (e) => {
        e.preventDefault()
        if (bookmarkName === 'fa-regular fa-bookmark') {
            // window.alert("not saved to saved")
            dispatch(AddFavorite(locationId))
        }
        if (bookmarkName === 'fa-solid fa-bookmark') {
            // window.alert("saved to not saved")
            dispatch(RemoveFavorite(locationId))
        }
        // dispatch(RemoveFavorite(locationId));

    }

    // useEffect(() => {

        if(!props?.user?.id) bookmarkName = "fa-regular fa-bookmark"

        let favorites = props.user?.favorites
        if(favorites) {
            console.log("USERS FAVORITES", favorites)

            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i]?.id === Number(locationId)) {
                    bookmarkName = "fa-solid fa-bookmark"
                }
            }
        }

    // }, [dispatch, props.user ])


    // if(!props.user?.id) return null
    return (
        <div className='topLeft'>
                    <div className='WriteReview'>
                    <button onClick={() => history.push(`/locations/${locationId}/review/new`)}><i className="fa-regular fa-star"></i> Write a Review</button>
                    </div>

                    <button onClick={() => history.push(`/locations/${locationId}/photo`)}><i className="fa-solid fa-camera"></i> Add Photo</button>
                    {/* <button id='not-allowed' onClick={() => window.alert("Share currently in development")}><i className="fa-solid fa-arrow-up-from-bracket"></i> Share</button> */}
                    <button onClick={handleBookmark}><i className={bookmarkName}></i> Save</button>
                    {/* <button id='not-allowed' onClick={() => window.alert("Follow currently in development")}><i className="fa-solid fa-plus"></i> Follow</button> */}
                </div>
    )
}

export default UserBar
