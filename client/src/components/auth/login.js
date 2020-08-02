import React, { useContext, useState } from 'react';
import bg from '../../images/image.jpg'
import { useHistory } from 'react-router-dom';
import userContext from '../../context/userContext';
import axios from 'axios';
import ErrorNotice from '../misc/error';
import { LOGIN_API } from '../misc/utils/api';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData } = useContext(userContext)
  const [error, setError] = useState();

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const logUser = { email, password };
      const logRes = await axios.post(LOGIN_API, logUser);
      setUserData({
        token: logRes.data.token,
        user: logRes.data.user
      });
      localStorage.setItem('auth-token',logRes.data.token)
      history.push('/home')
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  }


  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container">
    <div className="card login-card">
      <div className="row no-gutters">
        <div className="col-md-5">
          <img
            src={bg}
            alt="login"
            className="login-card-img"
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
          <div className="brand-wrapper">
            <img src="https://unfuddle.com/assets/product-summary-tasks-5a6d6625ed37fb42e18a61c2c24087ee.png" alt="logo" className="logo" />
          </div>
            <p className="login-card-description">Sign in</p>
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                name="login"
                id="login"
                className="btn btn-block login-btn mb-4"
                type="submit"
                defaultValue="Login"
              />
            </form>
            {error && (
              <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
              <p className="login-card-footer-text" >
                Don't have an account?{" "}
                <a href="/register" className="text-reset">
                  Register here
                </a>
              </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </main>
  );
};

export default Login;