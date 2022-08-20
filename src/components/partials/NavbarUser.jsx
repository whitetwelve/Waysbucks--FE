import React, { useContext} from "react";
import Logo from "../../assets/img/logo-waysbook.png";
import Blank from "../../assets/img/blank-profile.png";
import Cart from "../../assets/img/keranjang.png"
import Profile from "../../assets/img/user.png"
import { UserContext } from "../../context/user-context";
import "../../assets/css/Navbar.css"
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/img/logout.png"


function NavbarUser({ plusOne }) {

    const [state, dispatch] = useContext(UserContext)
    const imgProfile = state.user.image
    const moving = useNavigate()

    const moveToProfile = () => {
        moving('/profile')
    }

    const moveToHome = () => {
        moving('/')
    }

    const moveToCart = () => {
      moving('/cart')
  }

    const Logout = () => {
      dispatch({
          type:"LOGOUT"
      })
      moving("/Auth")
    }


  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid">
          <span id="counter-plus" class="badge rounded-pill bg-danger" style={{position:"absolute", top:"35px", right:"90px"}}> 
                {plusOne}
              <span class="visually-hidden">
                  unread messages
              </span> 
          </span>
            <a className="navbar-brand">
              <img id="logo-nav" src={Logo} onClick={moveToHome} width="75" height="75" alt="" />
            </a>
            <div className="d-flex align-items-center">
              <div className="justify-content-end d-flex me-2">
                <a onClick={moveToCart} style={{ textDecoration: "none",
                  cursor:'pointer'}}>
                <img src={Cart} alt="" className="me-3" height="30px" width="30px"/>
                </a>
              </div>

              <div
                className="justify-content-end d-flex"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        className="rounded-circle border border-danger border-2"
                        src={imgProfile ? `http://localhost:5000/uploads/`+ imgProfile : Blank}
                        width="50"
                        height="50"
                        alt=""
                      />
                    </a>
                    <div id="dropdown-menu" className="dropdown-menu shadow-lg" aria-labelledby="navbarDropdown">
                    <div id="triangle" className="position-absolute"></div>
                      <a id="profile-nav" className="dropdown-item" onClick={ moveToProfile }>
                        <img src={Profile} alt="" height="20px" width="20px" /> Profile
                      </a>
                      <div className="dropdown-divider"></div>
                      <a id="profile-nav" className="dropdown-item" onClick={ Logout } style={{cursor:'pointer'}}>
                        <img src={LogoutIcon} alt="" height="20px" width="20px"/> Log out
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarUser;
