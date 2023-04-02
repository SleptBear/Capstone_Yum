import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { readUserReviews } from '../../store/review'
import DetailedReview from '../Reviews/DetailedReview'
import './profile.css'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.review.UserReviews)
    const user = useSelector(state => state.session?.user)
    let profilePic = user.prof_pic
    // console.log("profile pic", profilePic)
    const reviewsArray = Object.values(reviewsObj)


    useEffect(() => {
        dispatch(readUserReviews(user?.id))
    }, [dispatch, user])
    if(!user?.id) return <div>Please Log in or Sign-up</div>
    if(!reviewsObj) return null
    if (profilePic === null) profilePic = "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png"
    return (
        <>
            <div className="prof-main">
                <div className='prof-container'>
                    <img src={profilePic} alt='none'></img>
                    {/* <img src='https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png' alt='none'></img> */}
                    <div className='prof-center'>
                        <div id='prof-name'>
                            {user.first_name} {user.last_name}
                        </div>
                        <div id='city-state'>
                            From {user.city}, {user.state}
                        </div>
                        <div>
                        <i className="fa-regular fa-user"></i> 0 {' '}
                        <i className="fa-regular fa-star"></i> {reviewsArray.length} {' '}
                        <i className="fa-solid fa-camera"></i> {user.images.length} {' '}
                        </div>
                    </div>
                    <div className='prof-right'>
                        <Link style={{ textDecoration: 'none', color: 'blue'}} to='/user/home/addImage'>
                        <div><i className="fa-solid fa-camera"></i> Change Profile Photo</div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'blue'}} to='/user/home'>
                        <div id='badLink'><i className="fa-solid fa-address-card"></i> Update Your Profile</div>

                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'blue'}} to='/user/home'>
                        <div id='badLink'><i className="fa-solid fa-user-group"></i> Find Friends</div>

                        </Link>
                    </div>
                </div>

                <div className='prof-reviews'>
                <h2>User Reviews</h2>
                <hr style={{width: "100%"}}></hr>
        <div id='each-rev'>
            {reviewsArray.map(review => (
                <DetailedReview review={review} key={review.id}/>
                ))}
        </div>
                </div>
            </div>











        </>
    )
}


export default ProfilePage
