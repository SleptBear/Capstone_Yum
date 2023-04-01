import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    history.push(`/`);
    dispatch(logout());
    // closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
    <div className="user-menu">

      <button onClick={openMenu}>
        <i className="fa-solid fa-circle-user" id='prof-user'></i>
      </button>
    </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li><NavLink style={{ textDecoration: 'none', color: 'black'}} exact to='/user/home'><i className="fa-solid fa-user-large"></i>About {user.first_name} {user.last_name}</NavLink></li>
            <li id='badLink' onClick={() => window.alert('Coming Soon')}><i className="fa-solid fa-user-group"></i> Find Friends</li>
            <li id='badLink' onClick={() => window.alert('Coming Soon')}><i className="fa-solid fa-gear"></i> Account Settings</li>
            <li onClick={() => handleLogout()} id='logout-button'>
            <i class="fa-solid fa-right-from-bracket"></i>
              Logout
              {/* <button onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>Log Out</button> */}
            </li>
          </>
        ) : (
          <>
          <div className="in-or-out">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              />
          </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
