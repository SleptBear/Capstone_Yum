import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal'
import { useState } from "react";
import { deleteReview } from "../../store/review";

const RemoveReviewButton = ({rev}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        dispatch(deleteReview(rev.id))
        closeModal()
        return null
    }
    return (
        <div className="loc-rem-modal">
            <h2>Delete Review?</h2>
                <button
                onClick={() => handleDelete()}
                className="submit-form"
                style={{backgroundColor: 'dark red'}}>
                    Yes
                </button>
        </div>
    )
}

export default RemoveReviewButton
