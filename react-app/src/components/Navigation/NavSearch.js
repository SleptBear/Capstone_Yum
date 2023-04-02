import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { searchThunk } from '../../store/search';
// import { Link } from 'react-router-dom';

const NavSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchResult = useSelector(state => state);
  const dispatch = useDispatch();

//   console.log("SEARCH" , searchResult)
  const handleSearch = async () => {
    // dispatch(searchThunk(searchTerm));
    window.alert("Search Feature in Development")
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
        placeholder='Search Feature in Development'
        value={searchTerm}
        readOnly
        // onChange={(e) => setSearchTerm(e.target.value)}
        // onKeyDown={enterKey}
        />
        <button className="searchbutton"onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button>

      </div>
  );
};

export default NavSearch;
