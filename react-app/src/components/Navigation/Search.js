import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchThunk } from '../../store/search';
import { Link, useHistory } from 'react-router-dom';
import LocationCard from '../Locations/LocationCard';
import Footer from '../Footer'


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchResult = useSelector(state => state.search);
  const filteredLocations = Object.values(searchResult)
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("SEARCH" , searchResult)
  const handleSearch = async () => {
    dispatch(searchThunk(searchTerm));
  };

//   return (
//     <div>
//       {/* <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//       <button onClick={handleSearch}>Search</button> */}
//       {searchResult && Object.keys(searchResult).length > 0 ? (
//         Object.values(searchResult).map((location) => (
//           <div key={location.id}>
//             <h3>{location.name}</h3>
//             <p>{location.description}</p>
//             <p>{location.price}</p>
//           </div>
//         ))
//       ) : (
//         <p>No search results found.</p>
//       )}
//     </div>
//   );
if (!filteredLocations[0]) history.push('/notfound')
return (
    <>
    <div className="outside">

<section className="body-container">
<div className="body-container-items">
    {/* <div className="filters">
        filter component in development
    </div> */}
    <div className="all-cards-container">

    {
        filteredLocations.map(location => (
            <Link key={location.id} to={`/locations/${location.id}`} style={{textDecoration: "none", color: 'black'}}>
                <LocationCard location={location} />
            </Link>
            ))
    }

    </div>
    <div className="maps-api-container">
        <img onClick={() => window.alert("Google Maps API Coming Soon")} src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg' alt="Maps API Container"></img>
    </div>
</div>

</section>
</div>
{/* <Footer /> */}
    </>
)
};

export default Search;
