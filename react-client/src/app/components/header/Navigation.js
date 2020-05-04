import { default as React } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import * as Routes from '../../routes';

import Logo from '../../_static/images/logo192.png';
import { useAuth } from '../../services';

const Navigation = ({children}) => {
  const { currentUser, logout} = useAuth();
  let history = useHistory();

  const handleLogout = async () => {
    const success = await logout();
    history.push(Routes.AUTH_SIGN_IN);
  }

  return (
    <nav className="navbar navbar-expand-lg  navbar-light bg-light">
      <Link className="navbar-brand" to={Routes.LANDING}>
        <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
        Grafische en Digitale Media
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse  justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav d-flex">
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.LANDING}>Home</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.POSTS}>Nieuws</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.CONTACT}>Contact</NavLink>
          {!!currentUser
           ? (
            <div class="dropdown dropleft">
              <button class="btn btn-link dropdown-toggle auth-toggle" type="button" id="accountMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={currentUser.avatar} alt="" />
              </button>
              <div class="dropdown-menu" aria-labelledby="accountMenu">
                <NavLink className="dropdown-item" activeClassName="active" to={Routes.BACKOFFICE_LANDING}>Dashboard</NavLink>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" type="button" onClick={handleLogout}>Logout</button>
              </div>
            </div>
           ) 
           : (
            <NavLink className="nav-item nav-link" activeClassName="active" to={Routes.AUTH_SIGN_IN}>Sign In</NavLink>
           )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navigation;