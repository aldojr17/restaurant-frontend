import { ModalWrapper } from "./style";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  message: string;
}

const ErrorModal = ({ show, handleClose, message }: IModalProps) => {
  return (
    <ModalWrapper
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="errorModal"
      tabIndex={-1}
      aria-labelledby="errorModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-3 text-danger" id="errorModalLabel">
              Error
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <span className="fs-5">{message}</span>
          </div>
          <div className="modal-footer px-0 mx-auto">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ErrorModal;
