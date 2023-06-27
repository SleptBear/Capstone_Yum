import { useDispatch } from "react-redux"
import { searchThunk } from "../../store/search"
import { useHistory } from "react-router-dom"

const RestaurantCategory = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = async () => {
        dispatch(searchThunk("take-out"))
        .then(() => history.push('/locations'))
      };

    return (
    
        <div className='category-box' onClick={handleSearch}>
        <i className="fa-solid fa-burger fa-2xl" style={{color: 'rgba(224,7,7,1)'}}></i>
        <h2>Fast Food</h2>
        </div>

    )
}


export default RestaurantCategory
