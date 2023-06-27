import { useDispatch } from "react-redux"
import { searchThunk } from "../../store/search"
import { useHistory } from "react-router-dom"

const HomeServices = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = async () => {
        dispatch(searchThunk("coffee"))
        .then(() => history.push('/locations'))
      };

    return (

        <div className='category-box' onClick={handleSearch}>
        <i className="fa-solid fa-mug-saucer fa-2xl" style={{color: 'rgba(224,7,7,1)'}}></i>
        <h2>Diners</h2>
        </div>
    
    )
}


export default HomeServices
