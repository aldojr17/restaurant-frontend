import { Link } from "react-router-dom";

interface NavbarProps {
  active?: string;
  isLogged?: boolean;
}

const Navbar = ({ ...props }: NavbarProps) => {
  return (
    <nav className="navbar navbar-expand-lg mb-4">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
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
          </ul>
          {props.active === "auth" ? (
            ""
          ) : props.isLogged ? (
            <Link to={"/login"}>
              <button className="btn btn-outline-dark">Logout</button>
            </Link>
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
