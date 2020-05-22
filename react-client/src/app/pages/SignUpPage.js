import { default as React, useState } from 'react';

import * as Routes from '../routes';
import { useAuth } from '../services';
import { useHistory } from 'react-router-dom';

const SignUpPage = ({children}) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const user = await signup(email, password);
    if (user) {
      history.push(Routes.BACKOFFICE_LANDING);
    }
  }

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signin" onSubmit={(ev) => handleSubmit(ev)}>
                  <div className="form-label-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={(ev) => setEmail(ev.target.value)} />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={(ev) => setPassword(ev.target.value)} />                    
                  </div>
                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign up</button>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;