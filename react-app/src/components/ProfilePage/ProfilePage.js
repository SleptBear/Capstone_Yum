import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { readReviews } from '../../store/review'
import DetailedReview from '../Reviews/DetailedReview'
import './profile.css'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.review.LocationReviews)
    const user = useSelector(state => state.session?.user)
    const reviewsArray = Object.values(reviewsObj)


    useEffect(() => {
        dispatch(readReviews(user?.id))
    }, [dispatch, user])

    return (
        <>
            <div className="prof-main">
                <div className='prof-reviews'>
                <h2>User Reviews</h2>
        <div>
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
