import React, { useState, SyntheticEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProduct } from '../../store/actions/productActions';
import Router from 'next/router';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBIcon,
} from 'mdbreact';

export const AddProduct = (props: {
  createProduct: (arg0: {
    name: string;
    brand: string;
    price: string;
    image: string;
    description: string;
  }) => void;
}) => {
  const [name, setName] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleNameChange = (event: FormEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value);

  const handleBrandChange = (event: FormEvent<HTMLInputElement>) =>
    setBrand(event.currentTarget.value);

  const handlePriceChange = (event: FormEvent<HTMLInputElement>) =>
    setPrice(event.currentTarget.value);

  const handleImageChange = (event: FormEvent<HTMLInputElement>) =>
    setImage(event.currentTarget.value);

  const handleDescriptionChange = (event: FormEvent<HTMLInputElement>) =>
    setDescription(event.currentTarget.value);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      name,
      brand,
      price,
      image,
      description,
    };

    try {
      await props.createProduct(data);
      Router.push('/products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MDBContainer className="px-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol className="card mt-3" sm="12" md="8" lg="6">
            <form onSubmit={handleSubmit}>
              <p className="h5 text-center mt-4 mb-4">Add New Product</p>
              <div className="grey-text">
                <MDBInput
                  label="Name"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleNameChange}
                />
                <MDBInput
                  label="Brand"
                  icon="clone"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleBrandChange}
                />
                <MDBInput
                  label="Price"
                  icon="coins"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handlePriceChange}
                />
                <MDBInput
                  label="image"
                  icon="image"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleImageChange}
                />
                <MDBInput
                  label="description"
                  icon="info"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="text-center">
                <MDBBtn className="btn btn-outline-black  my-4" type="submit">
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

AddProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
};

export default connect(null, { createProduct })(AddProduct);
