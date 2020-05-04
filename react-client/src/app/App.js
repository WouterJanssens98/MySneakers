import React from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';

import { ContactPage, HomePage, NotFoundPage, SignInPage, PostsPage, PostDetailPage } from './pages';
import { AdminPage } from './admin/pages';
import { BackofficeLayout, PageLayout, ErrorLayout, AuthLayout } from './layouts';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';
import * as Routes from './routes';
import { ApiProvider, AuthProvider } from './services';

import './app.scss';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ApiProvider>
          <Router basename='/'>
            <Switch>
              <RouteWithLayout exact path={Routes.LANDING} component={HomePage} layout={PageLayout} />
              <Redirect from={Routes.HOME} to={Routes.LANDING} />
              <RouteWithLayout exact path={Routes.CONTACT} component={ContactPage} layout={PageLayout} />
              <RouteWithLayout exact path={Routes.POSTS} component={PostsPage} layout={PageLayout} />
              <RouteWithLayout exact path={Routes.POST_DETAIL} component={PostDetailPage} layout={PageLayout} />
              <RouteWithLayout exact path={Routes.AUTH_SIGN_IN} component={SignInPage} layout={AuthLayout} />
              <AuthRouteWithLayout path={Routes.BACKOFFICE_LANDING} component={AdminPage} layout={BackofficeLayout} />
              <RouteWithLayout component={NotFoundPage} layout={ErrorLayout} />
            </Switch>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
