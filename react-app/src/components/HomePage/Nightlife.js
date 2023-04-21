import { useDispatch } from "react-redux"
import { searchThunk } from "../../store/search"
import { useHistory } from "react-router-dom"

const Nightlife = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = async () => {
        dispatch(searchThunk("drink"))
        .then(() => history.push('/search'))
      };

    return (
    <>
        <div className='category-box' onClick={handleSearch}>
        <i className="fa-solid fa-beer-mug-empty fa-2xl" style={{color: 'rgba(224,7,7,1)'}}></i>
        <h2>Bars</h2>
        </div>
    </>
    )
}


export default Nightlife
