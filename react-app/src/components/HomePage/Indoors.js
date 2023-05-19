import { useDispatch } from "react-redux"
import { searchThunk } from "../../store/search"
import { useHistory } from "react-router-dom"

const ActiveLife = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = async () => {
        dispatch(searchThunk("inside"))
        .then(() => history.push('/locations'))
      };

    return (
    <>
        <div className='category-box' onClick={handleSearch}>
        <i className="fa-solid fa-person-shelter fa-2xl" style={{color: 'rgba(224,7,7,1)'}}></i>
        <h2>Indoors</h2>
        </div>
    </>
    )
}


export default ActiveLife
