import { useEffect } from "react"
import { useDispatch } from "react-redux"


function MiniReviews() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch()
    }, [dispatch])

    return null
}


export default MiniReviews
