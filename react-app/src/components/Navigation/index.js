import React from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import NavSearch from './NavSearch.js';
import AddLocationButton from './AddLocationButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const params = useParams()
	if(!isLoaded) return null

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
        			<NavLink className='home-select' exact to="/">
						{/* <div className='home-select'> */}
						<h1 style={{color: 'gray'}}>Yum!</h1>
						<i className="fa-solid fa-utensils"></i>

						{/* </div> */}
        			</NavLink>
      			</div>

	  			<div className='search-container'>
					<NavSearch />
	  			</div>

        		<div className='nav-modals'>
					<AddLocationButton user={sessionUser}/>
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
