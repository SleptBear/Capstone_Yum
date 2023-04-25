import { useHistory } from "react-router-dom"



const UserBar = (props) => {
    const history = useHistory()
    console.log(props)
    let locationId = props.locationId


    let bookmarkName = "fa-regular fa-bookmark"
    // const checkFavorites = () => {
        if(!props?.user?.id) bookmarkName = "fa-regular fa-bookmark"

        let favorites = props.user?.favorites
        if(favorites) {

            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].id === Number(locationId)) {
                    bookmarkName = "fa-solid fa-bookmark"
                } else {
                    bookmarkName = "fa-regular fa-bookmark"
                }
            }
        }
    // }

    const handleBookmark = async (e) => {
        e.preventDefault()
        // window.alert("TEST")
        // checkFavorites()
        return
    }

    return (
        <div className='topLeft'>
                    <div className='WriteReview'>
                    <button onClick={() => history.push(`/locations/${locationId}/review/new`)}><i className="fa-regular fa-star"></i> Write a Review</button>
                    </div>

                    <button onClick={() => history.push(`/locations/${locationId}/photo`)}><i className={bookmarkName}></i> Add Photo</button>
                    <button id='not-allowed' onClick={() => window.alert("Share currently in development")}><i className="fa-solid fa-arrow-up-from-bracket"></i> Share</button>
                    <button onClick={handleBookmark}><i className="fa-regular fa-bookmark"></i> Save</button>
                    <button id='not-allowed' onClick={() => window.alert("Follow currently in development")}><i className="fa-solid fa-plus"></i> Follow</button>
                </div>
    )
}

export default UserBar
