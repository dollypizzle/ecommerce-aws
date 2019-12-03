import React, { useState, FormEvent, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import cookie from 'js-cookie';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';

const SignupForm = (props: {
  userSignupRequest: (arg0: {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password: string;
  }) => void;
}) => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleFirstnameChange = (event: FormEvent<HTMLInputElement>) =>
    setFirstname(event.currentTarget.value);

  const handleLastnameChange = (event: FormEvent<HTMLInputElement>) =>
    setLastname(event.currentTarget.value);

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) =>
    setEmail(event.currentTarget.value);

  const handlePhonenumberChange = (event: FormEvent<HTMLInputElement>) =>
    setPhonenumber(event.currentTarget.value);

  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) =>
    setPassword(event.currentTarget.value);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      firstname,
      lastname,
      email,
      phonenumber,
      password,
    };
    try {
      await props.userSignupRequest(data);
      Router.push('/products');
    } catch (error) {
      console.log(error.response);
    }
  };

  if (cookie.get('jwtToken')) {
    Router.push('/products');
  }

  return (
    <>
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center mb-5 py-3 px-5">
          <MDBCol className="mt-3" sm="12" md="8" lg="6">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={handleSubmit}>
                  <p className="h4 text-center py-2">Sign up</p>
                  <div className="grey-text">
                    <MDBInput
                      required
                      label="First name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      value={firstname}
                      onChange={handleFirstnameChange}
                    />
                    <MDBInput
                      required
                      label="Last name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      value={lastname}
                      onChange={handleLastnameChange}
                    />
                    <MDBInput
                      required
                      label="Your email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <MDBInput
                      required
                      label="Your phone-number"
                      icon="user"
                      group
                      type="number"
                      validate
                      error="wrong"
                      success="right"
                      value={phonenumber}
                      onChange={handlePhonenumberChange}
                    />
                    <MDBInput
                      required
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn className="btn btn-outline-black" type="submit">
                      Register
                      <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};

export default SignupForm;
