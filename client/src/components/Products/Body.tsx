import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import {
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardFooter,
} from 'mdbreact';

type Prod = {
  _id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  description: string;
};

export interface IntProps {
  [x: string]: any;
  obj: Prod;
}

const Body = (props: IntProps) => {
  const handleClick = (product: Prod) => {
    props.addToCart(product);
    alert('Item added to cart!');
  };
  return (
    <MDBCol className="col-sm-12 col-lg-3 col-md-4 pb-1">
      <MDBCard
        className="mb-lg-0 my-4"
        style={{ maxHeight: '34rem' }}
        cascade
        ecommerce
        wide
      >
        <MDBCardImage cascade top alt="" src={props.obj.image} waves />
        <hr />
        <MDBCardBody cascade className="text-center">
          <MDBCardTitle>
            <p>
              <strong>{props.obj.name}</strong>
            </p>
          </MDBCardTitle>{' '}
          {/* <MDBBtn color="primary"> */}
          <Link
            href={`/product?id=${props.obj._id}`}
            as={`/product/${props.obj._id}`}
          >
            <a className="btn btn-black mb-4">More info</a>
          </Link>
          {/* </MDBBtn> */}
          <MDBCol>
            <span className="float-left">
              Price: ₦{' '}
              {props.obj.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              {/* {props.obj.price} */}
            </span>

            <span className="float-right">
              <MDBCol placement="top">
                <MDBBtn
                  tag="a"
                  onClick={() => {
                    handleClick(props.obj);
                  }}
                  size="lg"
                  className="p-1 m-0 mr-2 z-depth-0"
                >
                  <MDBIcon icon="shopping-cart" />
                </MDBBtn>
              </MDBCol>
            </span>
          </MDBCol>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; data: {} }) => void
) => {
  return {
    addToCart: (product: {}) => {
      dispatch(addToCart(product));
    },
  };
};

export default connect(null, mapDispatchToProps)(Body);
