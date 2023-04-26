import Skeleton from "react-loading-skeleton";

const ReviewSkeleton = () {
    return (
        <div className="review-skeleton">
        <div className="top-skel">
            <Skeleton />
        </div>
        <div className="mid-skel">
            <Skeleton />
        </div>
        <div className="bot-skel">
            <Skeleton />
        </div>
        </div>
    )
}


export default ReviewSkeleton
