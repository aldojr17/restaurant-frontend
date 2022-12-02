import styled from "styled-components";

export const OrderStatusWrapper = styled.div`
  &.delivery-preparing {
    background-color: #ffe09c;
  }

  &.delivery-on-the-way {
    background-color: #579eff;
    color: #ffffff;
  }

  &.delivery-received {
    background-color: #aad4b3;
  }
`;
