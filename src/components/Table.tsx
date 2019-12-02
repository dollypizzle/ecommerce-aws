import React from 'react';
import { MDBCol } from 'mdbreact';
import styled from 'styled-components';

interface IntProps {
  obj: {
    image: string;
    name: string;
  };
}

const ImgP = styled.img`
  height: 240px;
  width: 100% !important;
  object-fit: cover !important;
`;

const TableImg = (props: IntProps) => {
  return (
    <MDBCol className="mt-4" sm="6" md="3">
      <ImgP src={props.obj.image} alt="" />
      <div className="text-center mt-2">
        <strong>{props.obj.name}</strong>
      </div>
    </MDBCol>
  );
};

export default TableImg;
