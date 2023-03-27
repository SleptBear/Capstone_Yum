import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import NavSearch from './NavSearch.js';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	return (
		<div className='navStart'>
    		<nav className='navbar'>

      			<div className='logo'>
					{/* <button onClick={() => history.push('/')}>
					yum!
					</button>
        			<NavLink exact to="/">
						<i className="fa-solid fa-utensils"></i>
        			</NavLink> */}
        			<NavLink exact to="/">
						<i className="fa-solid fa-utensils"></i>
        			</NavLink>
      			</div>

	  			<div className='search-container'>
					<NavSearch />
	  			</div>

        		<div className='nav-modals'>
					<button onClick={() => history.push('/locations/new')}>
						Add your Location
					</button>
					<button onClick={() => history.push('/locations')}>
						Find Grub
					</button>
						{/* <NavLink exact to='/locations/new'>Add your Location</NavLink>
						<NavLink className="grub-finder" exact to='/locations'>Find Grub</NavLink> */}



                    {isLoaded && (
                    <div><ProfileButton user={sessionUser} /></div>
                    )}
    			</div>
          </nav>
      </div>
  );
}

export default Navigation;
