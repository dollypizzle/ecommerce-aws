import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '../../axios-order';
import Body from './Body';
import cookie from 'js-cookie';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdbreact';

export const Products = () => {
  const [product, setProduct] = useState<[]>([]);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get('/products');
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);

  const user = cookie.get('user');

  const tabRow = () => {
    return (
      product &&
      product.map(function(object, i) {
        return <Body obj={object} key={i} />;
      })
    );
  };

  const userLinks = (
    <p className="lead">
      <MDBBtn outline color="black" className="mb-5">
        <MDBIcon icon="clone" className="mr-2"></MDBIcon>{' '}
        <Link href="/add">
          <a style={{ color: 'black' }}>Add New Product</a>
        </Link>
      </MDBBtn>
    </p>
  );

  const guestLinks = <div></div>;

  return (
    <>
      <MDBContainer className="mt-3 text-center">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron>
              <h2 className="h1 display-3">Dolmart Phone Hub</h2>
              <hr className="my-2" />
              {user ? userLinks : guestLinks}
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>

        <MDBRow>{tabRow()}</MDBRow>
      </MDBContainer>
    </>
  );
};

export default Products;
