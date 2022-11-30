import { CSSProperties } from "react";
import styled from "styled-components";

interface ModalProps {
  ModalStyle?: CSSProperties;
}

export const ModalWrapper = styled.div<ModalProps>`
  background-color: rgba(0, 0, 0, 0.5);
  ${(props) => (props.ModalStyle ? { ...props.ModalStyle } : "")}
`;
