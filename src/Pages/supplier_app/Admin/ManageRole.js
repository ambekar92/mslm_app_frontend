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

const ManageRole = () => {
  localStorage.setItem('menu','Admin');
  localStorage.setItem('submenu','Manage Role');

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

  const [isCardVisible, setCardVisible] = useState(true);
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
            <h2 className="mainTitle">Manage Role</h2>
            <p className="subText">Manage Role Details</p>
            <hr />

            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">

                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${isCardVisible ? "bi-chevron-right" : "bi-chevron-down"
                          }`}
                        onClick={toggleCardVisibility}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">MR</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Manage Role</span>
                      <span className="subHeaderTitle">
                        Basic Information
                      </span>
                    </Col>

                    {/* <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-plus-lg"></i> Change Buyer
                      </button>
                    </Col> */}

                    {/* <Col xs={4} md={2} lg={2} className="">
                      <button className="btnTable" onClick={() => createRFQ()}>
                        <i className="bi bi-plus-lg"></i> Create Manual RFQ
                      </button>
                    </Col>

                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-copy"></i> Copy RFQ
                      </button>
                    </Col>
                    */}

                    <Col xs={1} md={1} lg={1} className="text-right">
                      <span>
                        <i class="bi bi-arrow-clockwise"></i>
                      </span>
                    </Col>
                  </Row>
                </h2>

                <div
                  className={`accordion-collapse collapse show ${isCardVisible ? "visible" : ""
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


          </div>
        </Col>
      </Row>
    </main>
  );
};

export default ManageRole;
