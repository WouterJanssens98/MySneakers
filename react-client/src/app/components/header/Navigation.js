import { default as React } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import * as Routes from '../../routes';

import './Header.scss';
import Logo from '../../_static/images/logo192.png';
import { useAuth } from '../../services';
import mysneakerswhite from '../../_static/images/mysneakers-white.png';

const Navigation = ({children}) => {
  const { currentUser, logout} = useAuth();
  let history = useHistory();
    
  const handleLogout = async () => {
    const success = await logout();
    history.push(Routes.AUTH_SIGN_IN);
  }

  return (
    <nav id="navbar" className="navbar navbar-expand-lg  navbar-light">
      <Link className="navbar-brand" to={Routes.HOME}>
        <img src={mysneakerswhite} width="auto" height="25" className="d-inline-block align-top" alt="" />
         
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse  justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav d-flex">
          <NavLink id="navtekst" className="nav-item nav-link" activeClassName="active" to={Routes.SEARCH}>Home</NavLink>
          <NavLink  id="navtekst" className="nav-item nav-link" activeClassName="active" to={Routes.LANDING}>All Sneakers</NavLink>
          {!!currentUser
           ? (
            <div class="dropdown dropleft">
              <button class="btn btn-link dropdown-toggle auth-toggle" type="button" id="accountMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src='https://w7.pngwing.com/pngs/557/749/png-transparent-computer-icons-avatar-user-profile-blog-personal-heroes-recruiter-conversation.png' alt="" />
              </button>
              <div class="dropdown-menu" aria-labelledby="accountMenu">
                <NavLink className="dropdown-item" activeClassName="active" to={Routes.BACKOFFICE_LANDING}>Dashboard</NavLink>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" type="button" onClick={handleLogout}>Logout</button>
              </div>
            </div>
           ) 
           : (
             <div  className="navbar-nav d-flex">
            <NavLink id="navtekst" className="nav-item nav-link" activeClassName="active" to={Routes.AUTH_SIGN_IN}>Sign In</NavLink>
            <NavLink id="navtekst" className="nav-item nav-link" activeClassName="active" to={Routes.AUTH_SIGNUP}>Sign Up</NavLink>
            </div>
           )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navigation;