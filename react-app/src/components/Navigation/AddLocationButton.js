import React from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';


function AddLocationButton(props) {
    const history = useHistory();
    // console.log(props)
    if(props?.user == null) return null
    return (
            <button onClick={() => history.push('/locations/new')}>
				Add Location
			</button>
            )
}



export default AddLocationButton
