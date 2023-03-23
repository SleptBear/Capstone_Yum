import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navStart'>
    		<nav className='navbar'>

      			<div className='logo'>
        			<NavLink exact to="/">
		  				<i className="fa-solid fa-utensils"></i>
        			</NavLink>
      			</div>

	  			<div className='search-container'>
					Search Container
	  			</div>

        		<div className='nav-modals'>

						<NavLink className="grub-finder" exact to='/locations'>Find Grub</NavLink>



                    {isLoaded && (
                    <div><ProfileButton user={sessionUser} /></div>
                    )}
    			</div>
          </nav>
      </div>
  );
}

export default Navigation;
