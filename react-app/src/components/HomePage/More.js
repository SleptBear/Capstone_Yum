
import { useHistory } from "react-router-dom"

const More = () => {

    const history = useHistory();

    return (
    
        <div className='category-box' onClick={() => history.push('/locations')}>
        <i className="fa-solid fa-ellipsis-vertical fa-2xl" style={{color: 'rgba(224,7,7,1)'}}></i>
        <h2>More</h2>
        </div>

    )
}


export default More
