import React from "react";

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCardImage } from "mdbreact";

const CheckOut = () => {
  return (
    <>
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center px-2">
          <MDBCol className="card mt-3" sm="12" md="8" lg="6">
            <MDBCardImage
              top
              alt="Payment receieved"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_G-hdfTx54NgNK-SBO1rhJTgija8NUUIjJHz6jR4WBHODhJ0eEw&s"
              waves
            />
            <hr />
            <h3 className="text-center">Your Order has been receieved</h3>
            <MDBBtn className="btn btn-black">
              <a className="text-white" href={`/products`}>
                Continue shopping
              </a>
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
export default CheckOut;
