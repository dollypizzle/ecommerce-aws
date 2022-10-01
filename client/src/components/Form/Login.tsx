import React, { useState, FormEvent, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { login } from '../../store/actions/authActions';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput,
} from 'mdbreact';

export const Login = (props: {
  login: (arg0: { email: string; password: string }) => void;
}) => {
  if (cookie.get('jwtToken')) {
    Router.push('/products');
  }

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) =>
    setEmail(event.currentTarget.value);
  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) =>
    setPassword(event.currentTarget.value);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      await props.login(data);
      Router.push('/products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MDBContainer
        className="px-5"
        style={{ marginTop: '58px', marginBottom: '55px' }}
      >
        <MDBRow className="d-flex justify-content-center">
          <MDBCol className="card mt-3" sm="12" md="8" lg="6">
            <form onSubmit={handleSubmit}>
              <p className="h5 text-center mt-4 mb-4">Login</p>
              <div className="grey-text">
                <MDBInput
                  required
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleEmailChange}
                />
                <MDBInput
                  required
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="text-center py-4 mt-3">
                <MDBBtn className="btn btn-outline-black" type="submit">
                  Submit
                  <MDBIcon far icon="paper-plane" className="ml-2" />
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
