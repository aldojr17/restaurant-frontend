import { Link, useNavigate } from "react-router-dom";
import { CartIcon, HeartIcon } from "../Icon";

interface NavbarProps {
  active?: string;
  isLogged?: boolean;
  isAdmin?: boolean;
}

const Navbar = ({ ...props }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg mb-4">
      <div className="container">
        <Link to={props.isAdmin ? "/admin" : "/"} className="navbar-brand">
          Foodie
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {props.isAdmin ? (
              <>
                <li className="nav-item">
                  <Link
                    to={"/admin/menu"}
                    className={`nav-link ${
                      props.active === "menu" ? "active" : ""
                    }`}
                  >
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/admin/coupon"}
                    className={`nav-link ${
                      props.active === "coupon" ? "active" : ""
                    }`}
                  >
                    Coupon
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to={"/menu"}
                    className={`nav-link ${
                      props.active === "menu" ? "active" : ""
                    }`}
                  >
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Promotions
                  </a>
                </li>
                {props.isLogged ? (
                  <>
                    <li className="nav-item">
                      <Link
                        to={"/orders"}
                        className={`nav-link ${
                          props.active === "orders" ? "active" : ""
                        }`}
                      >
                        Orders
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/profile"}
                        className={`nav-link ${
                          props.active === "profile" ? "active" : ""
                        }`}
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </ul>
          {props.active === "auth" ? (
            ""
          ) : props.isLogged ? (
            <div className="d-flex gap-3 align-items-center">
              {!props.isAdmin ? (
                <>
                  <Link to={"/favorites"} className={`nav-link`}>
                    <HeartIcon fill={false} button />
                  </Link>
                  <Link to={"/cart"} className={`nav-link`}>
                    <CartIcon />
                  </Link>
                </>
              ) : (
                ""
              )}
              <button
                className="btn btn-outline-dark"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="btn btn-outline-dark">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
