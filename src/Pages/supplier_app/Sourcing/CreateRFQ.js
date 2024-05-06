/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Redux
import { useSelector } from "react-redux"; //useDispatch

//Components
import Layout from "../../../Layout/Layout";
import { InputField } from "../../../Components/formElements/InputField";
import { ComboboxField } from "../../../Components/formElements/ComboboxField";

const CreateRFQ = () => {
  localStorage.setItem("menu", "Sourcing");
  localStorage.setItem("submenu", "Request for Quotation");

  // Format the price above to USD using the locale, style, and currency.
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let dropdownOption = [
    {
      id: "1",
      name: "Sample Data 1",
    },
    {
      id: "2",
      name: "Sample Data 2",
    },
  ];

  const [data, setData] = useState([]);
  const [isCardVisible, setCardVisible] = useState(true);
  const [isCardVisible2, setCardVisible2] = useState(true);
  const [isCardVisible3, setCardVisible3] = useState(true);
  const [isCardVisible4, setCardVisible4] = useState(true);
  const [isCardVisible5, setCardVisible5] = useState(true);
  const [getAccessData, setAccessData] = useState("");

  const [formInputs, setFormInputs] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    companyName: "",
    _id: "",
  });

  const toggleCardVisibility = () => {
    setCardVisible(!isCardVisible);
  };
  const toggleCardVisibility2 = () => {
    setCardVisible2(!isCardVisible2);
  };
  const toggleCardVisibility3 = () => {
    setCardVisible3(!isCardVisible3);
  };
  const toggleCardVisibility4 = () => {
    setCardVisible4(!isCardVisible4);
  };
  const toggleCardVisibility5 = () => {
    setCardVisible5(!isCardVisible5);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setFormInputs((formInputs) => ({ ...formInputs, [name]: value }));
    // console.log("onInputChange => formInputs", formInputs);
  };

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Create Manual RFQ</h2>
            <p className="subText">Fill RFQ Details</p>
            <hr />

            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                   
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible ? "bi-chevron-right" : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">RT</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">RFQ Type</span>
                      <span className="subHeaderTitle">
                        Basic Information
                      </span>
                    </Col>

                    <Col xs={2} md={1} lg={1} className="">
                      <div className="filter">
                        <span
                          className="icon hide headerIcon"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i className="bi bi-three-dots"></i>
                        </span>
                        <ul
                          className="dropdown-menu dropdown-menu-end dropdown-menu-arrow hide menuList"
                          data-popper-placement="bottom-end"
                        >
                          <li className="dropdown-header text-start">
                            <h6>Menu</h6>
                          </li>

                      
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-arrow-clockwise"></i>
                              Refresh
                            </span>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </h2>

                <div
                  className={`accordion-collapse collapse show ${
                    isCardVisible ? "visible" : ""
                  }`}
                >
                  <div className="accordion-body">
                    <Row className="pt-2 pb-4">
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="RFQ Type"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Product Type"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Estimated RFQ Value *"
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Bid Type"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Number Of Evaluation"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Currency"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Tech Focal Point *"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Technical Approval Type"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible2
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility2}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">RH</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">RFQ Header</span>
                      <span className="subHeaderTitle">
                        Header Description
                      </span>
                    </Col>

                    <Col xs={2} md={1} lg={1} className="">
                      <div className="filter">
                        <span
                          className="icon hide headerIcon"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i className="bi bi-three-dots"></i>
                        </span>
                        <ul
                          className="dropdown-menu dropdown-menu-end dropdown-menu-arrow hide menuList"
                          data-popper-placement="bottom-end"
                        >
                          <li className="dropdown-header text-start">
                            <h6>Menu</h6>
                          </li>

                      
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-arrow-clockwise"></i>
                              Refresh
                            </span>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </h2>

                <div
                  className={`accordion-collapse collapse show ${
                    isCardVisible2 ? "visible" : ""
                  }`}
                >
                  <div className="accordion-body">
                    <Row className="pt-2 pb-4">
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Plant"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Buyer Responsible"
                          name="firstName"
                          placeholder=""
                          value={"400000 - Vasanthraman"}
                          onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="RFQ ID"
                          name="firstName"
                          placeholder=""
                          value={""}
                          onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Create / Initiator"
                          name="firstName"
                          placeholder=""
                          value={"Vasanthraman"}
                          onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Company Address"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="RFQ Version"
                          name="firstName"
                          placeholder=""
                          value={"v0"}
                          onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Buyer Email"
                          name="firstName"
                          placeholder=""
                          value={"v0"}
                          onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Billing Address"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Created On"
                          name="firstName"
                          placeholder=""
                          value={""}
                          onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Buyer Contact"
                          name="firstName"
                          placeholder=""
                          value={"9895656599"}
                          onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Delivery Address"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="RFQ Category"
                          name="firstName"
                          placeholder=""
                          value={"200-SAPMAT"}
                          onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                    </Row>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible3 ? "bi-chevron-right" : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility3}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">HI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Header Info</span>
                      <span className="subHeaderTitle">
                        Header Information
                      </span>
                    </Col>

                    <Col xs={2} md={1} lg={1} className="">
                      <div className="filter">
                        <span
                          className="icon hide headerIcon"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i className="bi bi-three-dots"></i>
                        </span>
                        <ul
                          className="dropdown-menu dropdown-menu-end dropdown-menu-arrow hide menuList"
                          data-popper-placement="bottom-end"
                        >
                          <li className="dropdown-header text-start">
                            <h6>Menu</h6>
                          </li>

                      
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-arrow-clockwise"></i>
                              Refresh
                            </span>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </h2>

                <div
                  className={`accordion-collapse collapse show ${
                    isCardVisible3 ? "visible" : ""
                  }`}
                >
                  <div className="accordion-body">
                    <Row className="pt-2 pb-4">
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                      className="inputBox"
                      label="Title"
                      name="title"
                      placeholder=""
                      value={formInputs.firstName || ""}
                      onChange={onInputChange}
                    />                        
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                      className="inputBox"
                      label="Opening Date (Time)"
                      name="Opening Date"
                      placeholder=""
                      value={formInputs.firstName || ""}
                      onChange={onInputChange}
                    />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Closing Date (Time)"
                          name="Closing Date"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Description"
                          name="description"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                       <ComboboxField
                          label="Type of Purchase"
                          placeholder=""
                          data={dropdownOption}
                          id="typeofpurchase"
                          iconClassName="dropdownIcon"
                          name="typeofpurchase"
                          setValue={formInputs.typeofpurchase || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                       <ComboboxField
                          label="Other Currencies"
                          placeholder=""
                          data={dropdownOption}
                          id="othercurrencies"
                          iconClassName="dropdownIcon"
                          name="othercurrencies"
                          setValue={formInputs.othercurrencies || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>
                    
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                       <ComboboxField
                          label="Payment Term"
                          placeholder=""
                          data={dropdownOption}
                          id="paymentterm"
                          iconClassName="dropdownIcon"
                          name="paymentterm"
                          setValue={formInputs.paymentterm || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                       <ComboboxField
                          label="INCO Terms"
                          placeholder=""
                          data={dropdownOption}
                          id="INCOTerms"
                          iconClassName="dropdownIcon"
                          name="INCOTerms"
                          setValue={formInputs.INCOTerms || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                       <ComboboxField
                          label="INCO Terms Location"
                          placeholder=""
                          data={dropdownOption}
                          id="INCOTermslocation"
                          iconClassName="dropdownIcon"
                          name="INCOTermslocation"
                          setValue={formInputs.INCOTermslocation || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                       <ComboboxField
                          label="Procurement Strategy"
                          placeholder=""
                          data={dropdownOption}
                          id="procurementstrategy"
                          iconClassName="dropdownIcon"
                          name="procurementstrategy"
                          setValue={formInputs.procurementstrategy || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                       <ComboboxField
                          label="Milestone Payments "
                          placeholder=""
                          data={dropdownOption}
                          id="milestonepayments"
                          iconClassName="dropdownIcon"
                          name="milestonepayments"
                          setValue={formInputs.milestonepayments || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      > <lable> Instructions Attachment</lable>
                        <input type="file" id="myfile" name="myfile" />
                      </Col>

                    </Row>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible4 ? "bi-chevron-right" : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility4}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">RE</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Reminders</span>
                      <span className="subHeaderTitle">
                        Reminders Section
                      </span>
                    </Col>

                    <Col xs={2} md={1} lg={1} className="">
                      <div className="filter">
                        <span
                          className="icon hide headerIcon"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i className="bi bi-three-dots"></i>
                        </span>
                        <ul
                          className="dropdown-menu dropdown-menu-end dropdown-menu-arrow hide menuList"
                          data-popper-placement="bottom-end"
                        >
                          <li className="dropdown-header text-start">
                            <h6>Menu</h6>
                          </li>

                      
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-arrow-clockwise"></i>
                              Refresh
                            </span>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </h2>

                <div
                  className={`accordion-collapse collapse show ${
                    isCardVisible4 ? "visible" : ""
                  }`}
                >
                  <div className="accordion-body">
                    <Row className="pt-2 pb-4">
                    <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Reminder Enabled "
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                          // className="dropdownOption"
                        />
                      </Col>

                    
                    </Row>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${isCardVisible4 ? "bi-chevron-right" : "bi-chevron-down"
                          }`}
                        onClick={toggleCardVisibility5}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">TD</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Tender Documents</span>
                      <span className="subHeaderTitle">
                        Tender Documents Form
                      </span>
                    </Col>

                    <Col xs={2} md={1} lg={1} className="">
                      <div className="filter">
                        <span
                          className="icon hide headerIcon"
                          data-bs-toggle="dropdown"
                          aria-expanded="true"
                        >
                          <i className="bi bi-three-dots"></i>
                        </span>
                        <ul
                          className="dropdown-menu dropdown-menu-end dropdown-menu-arrow hide menuList"
                          data-popper-placement="bottom-end"
                        >
                          <li className="dropdown-header text-start">
                            <h6>Menu</h6>
                          </li>

                      
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-arrow-clockwise"></i>
                              Refresh
                            </span>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </h2>

                <div
                  className={`accordion-collapse collapse show ${isCardVisible5 ? "visible" : ""
                    }`}
                >
                  <div className="accordion-body">

                    <Row className="pt-2 pb-4">
                      <Col
                        xs={12}
                        md={12}
                        lg={12}
                        className="commTopButtonRightLeftPadding"
                      >

                        <h1 class="card-title">Tender Documents :</h1>
                        <div class="row mb-3">
                          <label for="inputNumber" class="col-sm-2 col-form-label">1.1. SCOPE OF WORK  : </label>
                          <div class="col-sm-10">
                            <input class="form-control" type="file" id="formFile" />
                          </div>
                        </div>

                        <div class="row mb-3">
                          <label for="inputNumber" class="col-sm-2 col-form-label">1.2. DRAWING  : </label>
                          <div class="col-sm-10">
                            <input class="form-control" type="file" id="formFile" />
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="inputNumber" class="col-sm-2 col-form-label">1.3. ANNEXURES  :</label>
                          <div class="col-sm-10">
                            <input class="form-control" type="file" id="formFile" />
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="inputNumber" class="col-sm-2 col-form-label">1.4. OTHERS  : </label>
                          <div class="col-sm-10">
                            <input class="form-control" type="file" id="formFile" />
                          </div>
                        </div>

                        <h5 class="card-title"> Terms & Conditions and Company documents can be downloaded </h5>

                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck1" />
                          <label class="form-check-label" for="gridCheck1">
                            Terms and Conditions
                          </label>
                        </div>

                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck2" checked />
                          <label class="form-check-label" for="gridCheck2">
                            Code of Conduct
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck3" checked />
                          <label class="form-check-label" for="gridCheck3">
                            HSE Requirements
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck4" checked />
                          <label class="form-check-label" for="gridCheck4">
                            Engineering Standards
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck5" checked />
                          <label class="form-check-label" for="gridCheck5">
                            Others
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck6" checked />
                          <label class="form-check-label" for="gridCheck6">
                            Packaging Requirement
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck7" checked />
                          <label class="form-check-label" for="gridCheck7">
                            Trucking H&S Requirements
                          </label>
                        </div>

                      </Col>
                    </Row>


                  </div>
                </div>
              </div>
            </div>

          </div>
        </Col>
      </Row>
    </main>
  );
};

export default CreateRFQ;
