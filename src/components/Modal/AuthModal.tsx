import { Link } from "react-router-dom";

const AuthModal = () => {
  return (
    <div
      className="modal fade show d-block bg-secondary bg-opacity-50"
      id="modal"
      tabIndex={-1}
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body border-bottom border-2">
            <h2 className="text-success">Register Success</h2>
          </div>
          <div className="modal-footer border-0 mx-auto">
            <Link to="/login" replace={true}>
              <button type="button" className="btn btn-outline-primary fw-bold">
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
