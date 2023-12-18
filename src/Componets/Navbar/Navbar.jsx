import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../Assets/images/freshcart-logo.svg";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { cartContext } from "../../Context/cartContext";

export default function Navbar() {
  let { cartNum } = useContext(cartContext);

  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="">
            <img src={logo} alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken != null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="home"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="products" > Products
                  </NavLink>
                </li>
                {/* <li className="nav-item relative">
                  <NavLink className="nav-link active " aria-current="page" to="Cart" >Cart
                  </NavLink>

                  {cartNum === 0 ? (
                    ""
                  ) : (
                    <span className="position-absolute top-0 badge_left translate-middle badge rounded-pill bg-danger">
                      {cartNum}
                    </span>
                  )}
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="Wishlist" > Wishlist
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="Categories" > Categories
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="Brands" >
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="allorders" >
                  Myordres
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={style.social + " nav-item"}>
                <i className="fa-brands fa-facebook mx-2"></i>
                <i className="fa-brands fa-twitter mx-2"></i>
                <i className="fa-brands fa-instagram mx-2"></i>
                <i className="fa-brands fa-tiktok mx-2"></i>
                <i className="fa-brands fa-linkedin mx-2"></i>
                <i className="fa-brands fa-youtube mx-2"></i>
                {userToken != null ? (
                <Link className="relative" to={"/cart"}>
                  <i className="fa-solid fa-cart-shopping cartcar px-4  "></i>
                  {cartNum ? (
                  <span className="position-absolute top-0 badge_left translate-middle badge rounded-pill bg-danger">
                      {cartNum}
                    </span>
                  ) : (
                    ''
                  )}
                </Link>):''}
              </li>
              {userToken != null ? (
                <li onClick={logout} className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="Login"
                  >
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="Login"
                    >
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="Register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
