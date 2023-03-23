import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { readReviews } from "../../store/review"


function MiniReviews() {
    const dispatch = useDispatch()
    const id = useParams();
    console.log(id)

    useEffect(() => {
        dispatch(readReviews(id?.id))
    }, [dispatch])

    return null
}


export default MiniReviews
