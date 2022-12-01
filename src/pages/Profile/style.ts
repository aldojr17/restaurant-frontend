import styled from "styled-components";

export const CouponWrapper = styled.div`
  max-height: 80vh;
  overflow-x: auto;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
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
