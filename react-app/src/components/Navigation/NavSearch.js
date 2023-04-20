import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchThunk, searchThunk } from '../../store/search';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const NavSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const searchResult = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory()

//   console.log("SEARCH" , searchResult)
  const handleSearch = async () => {
    dispatch(searchThunk(searchTerm))
    .then(() => {
      history.push('/search')
      setSearchTerm('')
      // clearSearchThunk()
    }
    )
    // (() => clearSearchThunk())

    // window.alert("Search Feature in Development")
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
        placeholder='Search Feature Testing'
        value={searchTerm}
        // readOnly
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={enterKey}
        />
        <button className="searchbutton"onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button>

      </div>
  );
};

export default NavSearch;
