import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchThunk } from '../../store/search';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const NavSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const searchResult = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

//   console.log("SEARCH" , searchResult)
  const handleSearch = async () => {
    if (searchTerm.length < 1) {
    // return history.push('/search')
    return
    }
    dispatch(searchThunk(searchTerm.trim()))
    .then(() => history.push('/search'))
      setSearchTerm('')
  };

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  return (
    <div className="search-bar">
        <input
        type="input" className="inputbar"
        // placeholder='Search Feature Testing'
        value={searchTerm}
        // readOnly
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={enterKey}
        required
        />
        <button className="searchbutton"onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button>

      </div>
  );
};

export default NavSearch;
