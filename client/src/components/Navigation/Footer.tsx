import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';
import styled from 'styled-components';

const Foot = styled(MDBFooter)`
  position: relative;
  width: 100%;
  background-color: black;
`;

const Footer = () => {
  return (
    <Foot style={{ marginTop: '50px' }} className="font-small" id="MyFoot">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <p className="text-monospace">
            {' '}
            Dolmart Designed by Mabawonku Olusegun with Stutord
          </p>
        </MDBContainer>
      </div>
    </Foot>
  );
};

export default Footer;
