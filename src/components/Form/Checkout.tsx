import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IntProps } from '../Products/Body';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBCardBody,
  MDBBtn,
} from 'mdbreact';

const CheckOut = (props: IntProps) => {
  const cart = props.cart;

  const ProductTable = styled(MDBTable)`
    td {
      vertical-align: middle;
    }
  `;

  const [column] = useState([
    {
      label: 'Product',
      field: 'product',
    },
    {
      label: 'QTY',
      field: 'qty',
    },
    {
      label: 'AMT',
      field: 'amount',
    },
  ]);

  const rows:
    | {
        [rest: string]: any;
        clickEvent?: (() => void) | undefined;
        colspan?: number | undefined;
      }[]
    | { product: JSX.Element[]; qty: string; amount: JSX.Element }[]
    | undefined = [];
  cart.addedItems.map(
    (item: { name: React.ReactNode; quantity: number; price: number }) => {
      return rows.push({
        product: [
          <h5 className="mt-3">
            <strong>{item.name}</strong>
          </h5>,
        ],
        qty: `${item.quantity}`,
        amount: (
          <strong>
            ₦
            {(item.quantity * item.price)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </strong>
        ),
      });
    }
  );

  return (
    <MDBContainer>
      <div></div>
      <MDBRow>
        <MDBCol md="6" className="card mt-4 px-2">
          <h4 className="text-center mt-1">Checkout</h4>
          <form>
            <div className="grey-text">
              <MDBInput
                label="First Name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Last Name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Shipping Address"
                icon="tag"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
            </div>
          </form>
        </MDBCol>
        <MDBCol md="6">
          <h4 className="text-center mt-4">Your Order Summary</h4>
          <MDBCardBody>
            <ProductTable className="product-table" responsive>
              <MDBTableHead
                className="font-weight-bold"
                color="mdb-color lighten-5"
                columns={column}
              />
              <MDBTableBody rows={rows} />
            </ProductTable>
            <div>
              <MDBBtn color="success">
                <a href="/pay" className="text-reset">
                  Pay: ₦
                  {cart.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </a>
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

const mapStateToProps = (state: { cart: any }) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, null)(CheckOut);
