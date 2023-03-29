import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { readUserReviews } from '../../store/review'
import DetailedReview from '../Reviews/DetailedReview'
import './profile.css'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.review.UserReviews)
    const user = useSelector(state => state.session?.user)
    const reviewsArray = Object.values(reviewsObj)


    useEffect(() => {
        dispatch(readUserReviews(user?.id))
    }, [dispatch, user])
    if(!user?.id) return <div>Please Log in or Sign-up</div>
    if(!reviewsObj) return null
    return (
        <>
            <div className="prof-main">
                <div className='prof-container'>
                    <img src='https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png' alt='none'></img>
                    <div className='prof-center'>
                        <div>
                            {user.first_name} {user.last_name}
                        </div>
                        <div>
                            From City, State
                        </div>
                        <div>
                        <i className="fa-regular fa-user"></i> Friends {' '}
                        <i className="fa-regular fa-star"></i> Reviews {' '}
                        <i className="fa-solid fa-camera"></i> Photos {' '}
                        </div>
                    </div>
                    <div>
                        placeholder
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
