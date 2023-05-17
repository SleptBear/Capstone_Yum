import { useDispatch } from "react-redux"
import { searchThunk } from "../../store/search"
import { useHistory } from "react-router-dom"
const Automotive = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = async () => {
        dispatch(searchThunk("fast"))
        .then(() => history.push('/search'))
      };
    return (
    <>
        <div className='category-box' onClick={handleSearch}>
        <i className="fa-solid fa-parachute-box fa-2xl" style={{color: 'rgba(224,7,7,1)'}}></i>
        <h2>Delivery</h2>
        </div>
    </>
    )
}


export default Automotive
