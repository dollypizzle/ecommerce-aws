import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from '../components/Form/SignupForm';
import { userSignupRequest } from '../store/actions/signupActions';

const SignupPage = (props: { userSignupRequest: any }) => {
  const { userSignupRequest } = props;
  return (
    <div>
      <SignupForm userSignupRequest={userSignupRequest} />
    </div>
  );
};

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};

export default connect(null, { userSignupRequest })(SignupPage);
