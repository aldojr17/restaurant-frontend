import styled from "styled-components";

const DivCategory = styled.div`
  height: 5rem;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #d3d3d3;
  }
`;

export const HomeWrapper = styled.div`
  min-height: 70vh;
`;

export const MenuTitle = styled.h1`
  font-size: 96px;
  word-break: break-word;

  @media screen and (max-width: 768px) {
    font-size: 72px;
  }

  @media screen and (max-width: 576px) {
    font-size: 48px;
  }
`;

export const AddToCartButton = styled.button`
  width: 4rem;
  height: 4rem;
  right: -2rem;
`;

export const ButtonWrapper = styled.div`
  height: 6rem;
`;

export const HomeImg = styled.img`
  height: auto;

  @media screen and (min-width: 992px) {
    height: 500px;
  }
`;

export default DivCategory;
