import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearLocation } from '../../store/location'

// import { authenticate } from '../../store/session'

import { readUserReviews } from '../../store/review'
import DetailedReview from '../Reviews/DetailedReview'
import FavoritesCard from './FavoritesCard'
import './profile.css'
import { authenticate } from '../../store/session'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review)
    const reviewsObj = reviews.UserReviews
    const [page, setPage] = useState(1)

    const user = useSelector(state => state.session?.user)
    const userFavorites = user?.favorites
    const userLocations = user?.owned_locations
    let profilePic = user.prof_pic
    // console.log("profile pic", profilePic)
    const reviewsArray = Object.values(reviewsObj)

    const sortByDate = (arr) => {
        const sorter = (a, b) => {
            return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        }
        arr.sort(sorter);
    };
    // console.log("before", latestArray);
    sortByDate(reviewsArray);
    reviewsArray.reverse()


    useEffect(() => {
        dispatch(authenticate())
        dispatch(readUserReviews(user?.id))
        dispatch(clearLocation())
        // dispatch(authenticate())
    }, [dispatch])
    if(!user?.id) return <div>Please Log in or Sign-up</div>
    if(!reviews) return null
    if (profilePic === null) profilePic = "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png"
    // console.log(userFavorites)
    return (
        <>
            <div className="prof-main">
                <div className='prof-container'>
                    <div className='prof-img-container'>
                        <img src={profilePic} alt='none'></img>
                    </div>

                    {/* <img src='https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png' alt='none'></img> */}
                    <div className='prof-center'>
                        <div id='prof-name'>
                            {user.first_name} {user.last_name}
                        </div>
                        <div id='city-state'>
                            From {user.city}, {user.state}
                        </div>
                        <div>
                        <i className="fa-regular fa-user" style={{color: 'rgba(224,7,7,1)'}}></i> 0 {' '}
                        <i className="fa-regular fa-star" style={{color: 'rgba(224,7,7,1)'}}></i> {reviewsArray.length} {' '}
                        <i className="fa-solid fa-camera" style={{color: 'rgba(224,7,7,1)'}}></i> {user.images.length} {' '}
                        </div>
                    </div>
                    <div className='prof-right'>
                        <Link style={{ textDecoration: 'none', color: '#0073bb'}} to='/user/home/addImage'>
                        <div><i className="fa-solid fa-camera"></i> Change Profile Photo</div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: '#0073bb'}} to='/user/home'>
                        <div id='badLink'><i className="fa-solid fa-address-card"></i> Update Your Profile</div>

                        </Link>
                        <Link style={{ textDecoration: 'none', color: '#0073bb'}} to='/user/home'>
                        <div id='badLink'><i className="fa-solid fa-user-group"></i> Find Friends</div>

                        </Link>
                    </div>
                </div>
<br></br>
<br></br>
<br></br>
                <div className='prof-details-container'>

                    <div className='prof-page-buttons'>
                        <button style={{backgroundColor: page !== 1 ? "#f5f5f5" : "#e5e5e5"}} onClick={() => (setPage(1))}>Reviews</button>
                        <button style={{backgroundColor: page !== 2 ? "#f5f5f5" : "#e5e5e5"}}onClick={() => (setPage(2))}>Favorites</button>
                        <button style={{backgroundColor: page !== 3 ? "#f5f5f5" : "#e5e5e5"}}onClick={() => (setPage(3))}>Your Restaurants</button>

                    </div>
                {page === 1 ? (

                    <div className='prof-reviews'>
                <h2>User Reviews</h2>
                <hr style={{width: "100%"}}></hr>
        <div id='each-rev'>
            {reviewsArray.map(review => (
                <DetailedReview review={review} key={review.id}/>
                ))}
        </div>
                </div>
                ) : null

            }
            {page === 2 ?

                (
                    <div className='prof-fav-container'>
                        <h2 id="fav-header">Favorites</h2>
                        <hr style={{width: "95%"}}></hr>

                    {
                        userFavorites.map(location => (
                            <Link key={location.id} to={`/locations/${location.id}`} style={{textDecoration: "none", color: 'black'}}>
                            <FavoritesCard location={location} />
                        </Link>
                            ))
                        }
                    </div>
                    ) : null
                }
            {page === 3 ?

                (
                    <div className='prof-fav-container'>
                        <h2 id="fav-header">My Restaurants</h2>
                        <hr style={{width: "100%"}}></hr>

                    {
                        userLocations.map(location => (
                            <Link key={location.id} to={`/locations/${location.id}`} style={{textDecoration: "none", color: 'black'}}>
                            <FavoritesCard location={location} />
                        </Link>
                            ))
                        }
                    </div>
                    ) : null
                }

                </div>
                {/* <Footer /> */}
            </div>











        </>
    )
}


export default ProfilePage
