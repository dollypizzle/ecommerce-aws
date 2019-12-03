import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Link from "next/link";
import { IntProps } from "../Products/Body";
import cookie from "js-cookie";

import {
  removeItem,
  addQuantity,
  subtractQuantity,
} from "../../store/actions/cartActions";

import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
} from "mdbreact";

const ImgCart = styled.img`
  max-height: 150px;
  min-width: 50px;
`;

const Btn = styled(MDBBtn)`
  border-radius: 2px;
`;

const Boot = styled.div`
  padding-bottom: 10em;
`;

const ProductTable = styled(MDBTable)`
  td {
    vertical-align: middle;
    &:nth-child(6) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`;

export const Cart = (props: IntProps) => {
  const handleRemove = (product: {}) => {
    props.removeItem(product);
  };
  //to add the quantity
  const handleAddQuantity = (product: {}) => {
    props.addQuantity(product);
  };
  //to substract from the quantity
  const handleSubtractQuantity = (product: {}) => {
    props.subtractQuantity(product);
  };

  const cart = props.cart;

  const [cols] = useState([
    {
      label: "",
      field: "img",
    },
    {
      label: "Product",
      field: "product",
    },

    {
      label: "Price",
      field: "price",
    },
    {
      label: "QTY",
      field: "qty",
    },
    {
      label: "Amount",
      field: "amount",
    },
    {
      label: "",
      field: "button",
    },
  ]);

  const rows:
    | {
        [rest: string]: any;
        clickEvent?: (() => void) | undefined;
        colspan?: number | undefined;
      }[]
    | {
        img: JSX.Element;
        product: JSX.Element[];
        price: string;
        qty: string;
        amount: JSX.Element;
        button: JSX.Element;
      }[]
    | undefined = [];
  cart.addedItems.map(
    (item: {
      image: string | undefined;
      name: React.ReactNode;
      price: number;
      quantity: number;
      _id: {};
    }) => {
      return rows.push({
        img: (
          <ImgCart src={item.image} alt="" className="img-fluid z-depth-0" />
        ),

        product: [
          <h5 className="mt-3">
            <strong>{item.name}</strong>
          </h5>,
        ],
        price: `₦${item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`,
        qty: `${item.quantity}`,
        amount: (
          <strong>
            ₦
            {(item.quantity * item.price)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </strong>
        ),

        button: (
          <>
            <MDBBtn
              title="Increase quantity"
              color="success"
              size="sm"
              onClick={() => {
                handleAddQuantity(item._id);
              }}
            >
              <i className="fas fa-plus-circle"></i>
            </MDBBtn>
            <MDBBtn
              title="Decrease quantity"
              color="info"
              size="sm"
              disbaled={item.quantity === 1}
              onClick={() => {
                handleSubtractQuantity(item._id);
              }}
            >
              <i className="fas fa-minus-circle"></i>
            </MDBBtn>
            <MDBBtn
              title="Remove item"
              color="danger"
              size="sm"
              onClick={() => {
                handleRemove(item._id);
              }}
            >
              <i className="fas fa-trash"></i>
            </MDBBtn>
          </>
        ),
      });
    }
  );

  const user = cookie.get("jwtToken");

  const userLinks = (
    <Btn color="success">
      <Link href={"/checkout"}>
        <a className="text-reset">Proceed to Checkout</a>
      </Link>
    </Btn>
  );

  const guestLinks = (
    <Btn color="success">
      <Link href={"/login"}>
        <a className="text-reset">Proceed to Checkout</a>
      </Link>
    </Btn>
  );

  return cart.addedItems.length > 0 ? (
    <>
      <MDBRow className="my-2 ml-3 mr-1 mb-4" center>
        <MDBCol>
          <MDBCard className="w-100">
            <MDBCardBody>
              <ProductTable className="product-table" responsive>
                <MDBTableHead
                  className="font-weight-bold"
                  color="mdb-color lighten-5"
                  columns={cols}
                />
                <MDBTableBody rows={rows} />
              </ProductTable>
            </MDBCardBody>
          </MDBCard>
          <div className="text-center indigo-text">
            <h2 className="my-4">
              <strong>Total:</strong> ₦
              {cart.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </h2>
            <Btn className="mr-3">
              <Link href={"/products"}>
                <a className="text-reset">Continue Shopping</a>
              </Link>
            </Btn>
            {user ? userLinks : guestLinks}
          </div>
        </MDBCol>
      </MDBRow>
    </>
  ) : (
    <>
      <h3
        className="text-center"
        style={{ marginTop: "212px", marginBottom: "211px" }}
      >
        <strong>Your cart is empty</strong>
      </h3>
    </>
  );
};

const mapStateToProps = (state: { cart: {} }) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch: {
  (arg0: { type: string; id: string }): void;
  (arg0: { type: string; id: string }): void;
  (arg0: { type: string; id: string }): void;
}) => {
  return {
    removeItem: (product: string) => {
      dispatch(removeItem(product));
    },
    addQuantity: (product: string) => {
      dispatch(addQuantity(product));
    },
    subtractQuantity: (product: string) => {
      dispatch(subtractQuantity(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
