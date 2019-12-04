import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import cookie from 'js-cookie';

import { MDBContainer } from 'mdbreact';

export interface IntProd {
  _id: string;
  image: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  owner: string;
}

type ShowProps = {
  id: string;
};

export interface IntUser {
  _id: string;
}

const Show = ({ id }: ShowProps) => {
  const [product, setProduct] = useState<IntProd | null>(null);

  const [user, setUser] = useState<IntUser | null>(null);

  useEffect(() => {
    const authUser = cookie.get('user');
    if (authUser) {
      setUser(JSON.parse(authUser));
    }

    const fecthData = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);

  const tabRow = () => {
    return (
      product && (
        <Table obj={product} userId={user && user._id} key={product._id} />
      )
    );
  };

  return (
    <>
      <MDBContainer>{tabRow()}</MDBContainer>;
    </>
  );
};

export default Show;
