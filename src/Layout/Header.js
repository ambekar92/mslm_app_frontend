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
            <img src={headerLogo} alt="" className="headerLogo"/>
            {/* <span className="d-none d-lg-block supplier_app">{headerName}</span> */}
          </Link >


        </div>

        {/* <div className="d-flex align-items-center justify-content-between">
          <Navbar className="navBarHive">
            <Container>
              <Nav className="me-auto">
                <Link to={Constants.UPCOMING_SHIFT} className="subMenu">
                  Shifts
                </Link >
                <Link to={Constants.NOT_FOUND} className="subMenu">
                  Invoices
                </Link >
                <Link to={Constants.NOT_FOUND} className="subMenu">
                  History
                </Link >
              </Nav>
            </Container>
          </Navbar>
        </div> */}

        {/* <div className="search-bar">
          <form
            className="search-form d-flex align-items-center">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            {/* <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="/">
                <i className="bi bi-search"></i>
              </a>
            </li> */}

            {/* <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="/"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="/">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="/">Show all notifications</a>
                </li>
              </ul>
            </li> */}

            {/* <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="/"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="/">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="/">
                    <img
                      src="assets/img/messages-1.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="/">
                    <img
                      src="assets/img/messages-2.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="/">
                    <img
                      src="assets/img/messages-3.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                  <a href="/">Show all messages</a>
                </li>
              </ul>
            </li>  */}

            {/* <li className="nav-item dropdown">     
              <span className="nav-link nav-icon">          
                <i className="bi bi-arrow-repeat" onClick={handleReload}></i>   
              </span>           
            </li> */}

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
                  <h6> {userData?.data?.firstName}</h6>
                  <span><b>{userData?.data?.email}</b></span><br />
                  <span>User ID: <b>{userData?.data?.userId?.toString()}</b></span><br />
                  {/* <span>Role: <b>{userData?.data?.roles?.toString()}</b></span><br /> */}
                  <span>Category: <b>{userData?.data?.category?.toString()}</b></span><br />
                  
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item d-flex align-items-center" to={Constants.PROFILE}>
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link >
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

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

                <li>
                  <button className="dropdown-item d-flex align-items-center" onClick={handleLogout} >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </button>
                </li>

              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};


export default Header;
