/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Loader from "../Components/Loader";
import TimeDisplay from "../Components/TimeDisplay";
import menuDataFile from "../../services/data.json";

//Redux
import { useSelector } from "react-redux";

const Leftside = () => {
  let [getMenu, setMenu] = useState([]);
  let userData = useSelector((state) => state?.user); // User Details from Store
  let menuData = useSelector((state) => state?.menu); // User Details from Store

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get from Menu.json
  const loadMenu = () => {
    // Get Data from Store
    setMenu(menuDataFile?.data);
  };

  const LoadParent = ({ value }) => {
    let selectedMenu = localStorage.getItem("menu");

    if (value.children.length > 0) {
      // parent dropdown menu
      let selectedSubMenu = localStorage.getItem("submenu");
      let childItem = value?.children.map(function (child_item, i) {
        let specCase;

        // if (child_item?.roleInfo.includes(userData?.data?.role)) {
        if (child_item?.name === selectedSubMenu) {
          specCase = "nav-link subMenu active";
        } else {
          specCase = "subMenu collapsed";
        }

        let child = (
          <li key={child_item?.name} className="nav-item">
            <Link to={child_item?.hrefLink} className={specCase}>
              <i className={child_item?.icon}></i>
              <span>{child_item?.name}</span>
            </Link>
          </li>
        );
        return child;

        // } else {
        //   return " "
        // }
      });

      let specCase;
      let subMenuStatus;
      // if (value?.roleInfo.includes(userData?.data?.role)) {
      if (value.name === selectedMenu) {
        specCase = "nav-link collapsed dropdownMenu";
        subMenuStatus = "nav-content collapse show";
      } else {
        specCase = "nav-link collapsed";
        subMenuStatus = "nav-content collapse";
      }

      return (
        <li key={value.name} className="nav-item">
          <a
            className={specCase}
            data-bs-target={value.data_bs_targetp}
            data-bs-toggle="collapse"
            href="/"
          >
            <i className={value.icon}></i>
            <span>{value.name}</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id={value.data_bs_target}
            className={subMenuStatus}
            data-bs-parent="#sidebar-nav"
          >
            {childItem}
          </ul>
        </li>
      );

      // } else {
      //   return " "
      // }
    } else {
      // Without Child Menu
      let specCase;
      // if (value?.roleInfo.includes(userData?.data?.role)) {
      if (value.name === selectedMenu) {
        specCase = "nav-link active";
      } else {
        specCase = "nav-link collapsed";
      }

      return (
        <>
          <li key={value.name} className="nav-item">
            <Link to={value.hrefLink} className={specCase}>
              <i className={value.icon}></i>
              <span>{value.name}</span>
            </Link>
          </li>
          <Outlet />
        </>
      );

      // } else {
      //   return " "
      // }
    }
  };

  useEffect(() => {
    // console.log(">> Menu Loaded ");
    loadMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData]);

  return (
    <>
      <div className="main-sidebar">
        <aside id="sidebar" className="sidebar">
          <nav>
            <ul className="sidebar-nav" id="sidebar-nav">
              {
                <Loader
                  isLoading={!userData?.status}
                  className={"text-center"}
                />
              }

              {/* Menu */}
              {userData?.status && getMenu?.length
                ? getMenu.map((value, index) => {
                    return <LoadParent key={index} value={value} />;
                  })
                : null}
            </ul>
          </nav>
          <TimeDisplay timezone={userTimezone} />
        </aside>
      </div>
    </>
  );
};

export default Leftside;
