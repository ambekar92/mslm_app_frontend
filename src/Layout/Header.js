/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ItemService from "../services/supplier_appCommonService";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Constants from '../common/Constants';
import { Link } from "react-router-dom";
import { Image } from '../Components/formElements/Image';
import config from '../services/configuration'

//Redux
import { useSelector } from "react-redux";

const Header = () => {
  let [flag, setFlag] = useState(true);

  let userData = useSelector((state) => state?.user); // User Details from Store
  var timestamp = new Date().getTime();

  // let [headerName, setHeaderName] = useState();
  let [headerLogo, setHeaderLogo] = useState();

  const getConfig = () => {
    ItemService.getConfig().then(items => {
      // setHeaderName(items.PRODUCT_NAME);                
      setHeaderLogo(items.PRODUCT_LOGO);
      // saveConfigData(items);           
    });
  }

  const handleUpdate = (e) => {
    setFlag(!flag);
    if (flag === true) {
      document.body.classList.add("toggle-sidebar");
    } else {
      document.body.classList.remove("toggle-sidebar");
    }
  };

  const handleLogout = () => {
    let obj = { 'email': userData?.data?.email };
    ItemService.logout(obj).then(items => {
      if (items?.status === 401) {
        window.location = Constants.LOGIN;
      } else {
        console.log(">> Please check the Network ");
      }
    });
  }

  useEffect(() => {
    getConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">

          <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={handleUpdate}
          ></i>
          <Link to={Constants.UPCOMING_SHIFT} className="logo d-flex align-items-center">
            {/* <img src={headerLogo} alt="" className="headerLogo"/> */}
            <span className="d-none d-lg-block supplier_app">MSLM_APP</span>
          </Link >


        </div>

       
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="/"
                data-bs-toggle="dropdown"
              >
                { // setSelectedImage(config.BASE_URL + userData?.data?.profileImgPath)
                  userData?.data?.profileImgPath &&
                  <Image srcVal={config.BASE_URL + userData?.data?.profileImgPath + '?t=' + timestamp} alt="profile" styleVal={{ maxWidth: '100%' }} classNameVal='profileImageCss rounded-circle' />
                }
                {
                  !userData?.data?.profileImgPath &&
                  <img
                    src="assets/img/profile-img.png"
                    alt="Profile"
                    className="rounded-circle"
                  />
                }
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {userData?.data?.name}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6> {userData?.data[0]?.firstName}</h6>
                  <span><b>{userData?.data[0]?.email}</b></span><br />
                  <span>User ID: <b>898547</b></span><br />
                  {/* <span>Role: <b>{userData?.data?.roles?.toString()}</b></span><br /> */}
                  {/* <span>Category: <b>{userData?.data?.category?.toString()}</b></span><br /> */}
                  
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* <li>
                  <Link className="dropdown-item d-flex align-items-center" to={Constants.PROFILE}>
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link >
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li> */}

                {/* <li>
                  <Link className="dropdown-item d-flex align-items-center" to={Constants.COMPANY}>
                    <i className="bi bi-buildings"></i>
                    <span>Company</span>
                  </Link >
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li> */}

                <li>
                  <Link className="dropdown-item d-flex align-items-center" to={Constants.NOT_FOUND}>
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </Link >
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* <li>
                  <button className="dropdown-item d-flex align-items-center" onClick={handleLogout} >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </button>
                </li> */}

              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};


export default Header;
