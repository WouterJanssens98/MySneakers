import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Routes from '../../routes';
import DashboardPage from './DashboardPage';
import PostCreatePage from './PostCreatePage';
import UserEditPage from './UserEditPage';
import PostsPage from './PostsPage';
import UsersPage from './UsersPage';
import PortfolioPage from './PortfolioPage';

const AdminPage = ({children}) => {

  return (
    <Fragment>
      <Route exact path={Routes.BACKOFFICE_LANDING}>
        <Redirect to={Routes.BACKOFFICE_DASHBOARD} />
      </Route>
      <Route exact path={Routes.BACKOFFICE_DASHBOARD} component={DashboardPage} />
      <Route exact path={Routes.BACKOFFICE_POSTS} component={PostsPage} />
      <Route exact path={Routes.BACKOFFICE_POSTS_CREATE} component={PostCreatePage} />
      <Route exact path={Routes.BACKOFFICE_USERS_EDIT} component={UserEditPage} />    
      <Route exact path={Routes.BACKOFFICE_USERS} component={UsersPage} />    
      <Route exact path={Routes.BACKOFFICE_PORTFOLIO} component={PortfolioPage} />    
    </Fragment>
  );
};

AdminPage.prototypes = {
  children: PropTypes.any
};

export default AdminPage;