import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal'
import { useState, useEffect } from "react";
import { deleteLocation } from "../../store/location";
import { useParams } from "react-router-dom";
import { getLocation } from "../../store/location";
import { authenticate } from '../../store/session'

const RemoveLocationButton = ({locationId}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // useEffect(() => {
    //     dispatch(getLocation(locationId))
    // }, [dispatch])

    const handleRemove = async (e) => {
        // e.preventDefault()
        dispatch(deleteLocation(locationId))
        .then(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors([data.errors])
            if(res.ok) {
            history.push(`/`)
            closeModal()
            dispatch(authenticate())
            }
        })

    }
    return (
        <div className="loc-rem-modal">
            <h2>Delete Business?</h2>
                <button
                onClick={() => handleRemove()}
                className="submit-form"
                style={{backgroundColor: 'dark red'}}>
                    Yes
                </button>
        </div>
    )
}

export default RemoveLocationButton
