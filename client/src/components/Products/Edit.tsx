import React, { useState, useEffect, SyntheticEvent, FormEvent } from "react";
import axios from "../../axios-order";
import cookie from "js-cookie";
import Router from "next/router";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBIcon,
} from "mdbreact";

type EditProps = {
  id: string;
};

const Edit = ({ id }: EditProps): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setName(response.data.name);
        setBrand(response.data.brand);
        setPrice(response.data.price);
        setImage(response.data.image);
        setDescription(response.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const obj = {
      name,
      brand,
      price,
      image,
      description,
    };
    const token = cookie.get("jwtToken");
    await axios.patch(`/product/${id}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Router.push(`/product/${id}`);
  };

  return (
    <>
      <MDBContainer className="px-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol className="card mt-5" xl="6">
            <form onSubmit={onSubmit}>
              <p className="h5 text-center mt-4 mb-4">Edit Product</p>
              <div className="grey-text">
                <MDBInput
                  required
                  label="Name"
                  value={name}
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleNameChange}
                />
                <MDBInput
                  required
                  label="Brand"
                  value={brand}
                  icon="clone"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleBrandChange}
                />
                <MDBInput
                  required
                  label="Price"
                  value={price}
                  icon="coins"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handlePriceChange}
                />
                <MDBInput
                  required
                  label="image"
                  value={image}
                  icon="image"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleImageChange}
                />
                <MDBInput
                  required
                  label="description"
                  value={description}
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

export default Edit;
