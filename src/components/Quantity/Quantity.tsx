import React from "react";
import InputNumber from "../../pages/MenuDetail/style";
import { IOrderDetailPayload } from "../../redux/order/types";

interface IQuantityProps {
  setInput: React.Dispatch<React.SetStateAction<IOrderDetailPayload>>;
  input: IOrderDetailPayload;
}

const Quantity = ({ setInput, input }: IQuantityProps) => {
  return (
    <>
      <button
        className="btn btn-outline-dark col-lg-1 col-2"
        onClick={() => {
          if (input.qty - 1 !== 0) {
            setInput({ ...input, qty: input.qty - 1 });
          }
        }}
      >
        -
      </button>
      <div className="col-lg-2 col">
        <InputNumber
          type="number"
          className="form-control text-center"
          name="qty"
          value={input.qty}
          readOnly
        />
      </div>
      <button
        className="btn btn-outline-dark col-lg-1 col-2"
        onClick={() => setInput({ ...input, qty: input.qty + 1 })}
      >
        +
      </button>
    </>
  );
};

export default Quantity;
