/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

//Redux
import { useSelector } from "react-redux"; //useDispatch

//Components
import Layout from "../../../../Layout/Layout";
import CreateRFQModal from "../../../../Components/Modal/supplier_app/CreateRFQModal";
import Constants from "../../../../common/Constants";
import CommonItemLevelDatatableModal from "../../../../Components/Modal/supplier_app/CommonItemLevelDatatableModal";
import { InputField } from "../../../../Components/formElements/InputField";
import { TextAreaField } from "../../../../Components/formElements/TextAreaField";

const SupplierDetailedPage = () => {
  const navigate = useNavigate();
  localStorage.setItem("menu", "Supplier");
  localStorage.setItem("submenu", "Supplier List");

  let supplierData = useSelector((state) => state?.supplier?.data); // User Details from Store

  let supplierID = useSelector((state) => state?.supplier?.supplierID); // User Details from Store

  // Format the price above to USD using the locale, style, and currency.
  // let USDollar = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  const [data, setData] = useState([]);
  const [getBankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [getHeaderData, setHeaderData] = useState(false);
  // const [totalRows, setTotalRows] = useState(10);
  // const [perPage, setPerPage] = useState(10);

  const [isCardVisible, setCardVisible] = useState(true);
  const [isCardVisible2, setCardVisible2] = useState(true);
  const [isCardVisible3, setCardVisible3] = useState(true);


  const [modalShow, setModalShow] = useState(false);
  const [getItemLevelData, setItemLevelData] = useState([]);
  const [getItemLevelColumns, setItemLevelColumns] = useState([]);
  const [getModalTitle, setModalTitle] = useState("");

  const [itemLevelModalShow, setItemLevelModalShow] = useState(false);

  const itemLevelHideModal = () => {
    setItemLevelModalShow(false);
  };
  // OnClick on lineItem  Data
  // eslint-disable-next-line no-unused-vars
  const lineItemShowModal = (itemLevelData) => {
    setItemLevelData(itemLevelData);
    setItemLevelColumns(lineItemColInfo);
    setModalTitle("Line Item Details");
    setItemLevelModalShow(true);
  };

  const toggleCardVisibility = () => {
    setCardVisible(!isCardVisible);
  };
  const toggleCardVisibility2 = () => {
    setCardVisible2(!isCardVisible2);
  };
  const toggleCardVisibility3 = () => {
    setCardVisible3(!isCardVisible3);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    console.log(">> supplierID", supplierID);
    if (supplierID) {
      let filteredData = supplierData.filter(
        (item) => item.AssociateNumber === supplierID
      );
      console.log(">> filteredData", filteredData);
      setHeaderData(filteredData[0]);

      // vendorCategory table data
      let itemData = filteredData[0]?.vendorCategory;
      let bankDetails = filteredData[0]?.bankDetails;

      setData(itemData);
      setBankDetails(bankDetails);

      setLoading(false);
    } else {
      navigate(Constants.SUPPILER_LIST);
    }
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  //   setData(supplierData);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierID]);

  const columns = [
    {
      name: "Category",
      selector: (row) => row.vendorCategoryText,
      sortable: true,
      width: "250px",
    },
    {
      name: "SubCategory",
      selector: (row) => row.vendorSubCategoryText,
      sortable: true,
      width: "200px",
    },

    {
      name: "SubCategory Description",
      selector: (row) => row.vendorSubCategoryLongText,
      sortable: true,
      width: "350px",
    },
    {
      name: "Category Code",
      selector: (row) => row.vendorCategoryCode,
      sortable: true,
      width: "250px",
    },
    {
      name: "SubCategory Code",
      selector: (row) => row.vendorSubCategoryCode,
      sortable: true,
      width: "250px",
    },
  ];

  const lineItemColInfo = [
    {
      name: "Item Text Code",
      cell: (row) => <span>{row.documentId} </span>,
      width: "200px",
    },
    {
      name: "Item Text",
      cell: (row) => <span>{row.prItemNr} </span>,
      width: "250px",
    },
  ];

  const bankDetailsCol = [
    {
      name: "iban",
      selector: (row) => row.iban,
      sortable: true,
      width: "150px",
    },
    {
      name: "bankName",
      selector: (row) => row.bankName,
      sortable: true,
      width: "150px",
    },
  ]

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Supplier Details : {supplierID}</h2>
            <p className="subText">Supplier Information </p>
            <hr />

            {/* #1 */}
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
                      <span className="iconLogo">HR</span>
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                      <span className="headerTitle">Header Details</span>
                      <span className="subHeaderTitle"> </span>
                    </Col>
                  </Row>
                </h2>

                <div
                  className={`accordion-collapse collapse show ${isCardVisible ? "visible" : ""
                    }`}
                >
                  <div className="accordion-body">
                    <Row className="pt-2 pb-4">
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Company/Organisation"
                          name="organisationName"
                          placeholder=""
                          value={getHeaderData?.organisationName}
                          // onChange={onInputChange}
                          disabled={true}
                        />
                      </Col> */}
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Company/Organisation: </span>
                        <span className="headerSubText">
                          {getHeaderData?.organisationName}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Status: </span>
                        <span className="headerSubText">
                          {getHeaderData?.status}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Address Lines 1 / Street: </span>
                        <span className="headerSubText">
                          {getHeaderData?.address}
                        </span>
                      </Col>
                     
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Address Lines 2: </span>
                        <span className="headerSubText">
                          {getHeaderData?.address2}
                        </span>
                      </Col>
                      
                      
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">
                          Mobile internationalNumber:{" "}
                        </span>
                        <span className="headerSubText">
                          {getHeaderData?.mobileNumber?.internationalNumber}
                        </span>
                      </Col> */}
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">City: </span>
                        <span className="headerSubText">
                          {getHeaderData?.city}
                        </span>
                      </Col> */}
                       <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Address Lines 2: </span>
                        <span className="headerSubText">
                          {getHeaderData?.address2}
                        </span>
                      </Col>
                     
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">State: </span>
                        <span className="headerSubText">
                          {getHeaderData?.state}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Country: </span>
                        <span className="headerSubText">
                          {getHeaderData?.country}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Contact Person: </span>
                        <span className="headerSubText">
                          {getHeaderData?.contactfirstName}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Contact Number: </span>
                        <span className="headerSubText">
                          {getHeaderData?.contactNumber}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Contact Email: </span>
                        <span className="headerSubText">
                          {getHeaderData?.email}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>

            {/* #2 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${isCardVisible2
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                          }`}
                        onClick={toggleCardVisibility2}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">CS</span>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                      <span className="headerTitle">Category Selection</span>
                      <span className="subHeaderTitle"> </span>
                    </Col>

                    {/* <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-person"></i> Block
                      </button>
                    </Col>
                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-person"></i>UnBlock
                      </button>
                    </Col>

                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-x-circle"></i> Deletion
                      </button>
                    </Col> */}

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
                              <i className="bi bi-bar-chart mr-3"></i>
                              Chart
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-download mr-2"></i>
                              Download
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-funnel"></i>
                              Filter
                            </span>
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
                  // id="acc"
                  className={`accordion-collapse collapse show ${isCardVisible2 ? "visible" : ""
                    }`}
                // aria-labelledby="headingOne"
                // data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <Row>
                      <Col xs={12} md={12} lg={12}>
                        <DataTable
                          title=""
                          columns={columns}
                          data={data}
                          progressPending={loading}
                          pagination
                          // paginationServer
                          // paginationTotalRows={totalRows}
                          // onChangeRowsPerPage={handlePerRowsChange}
                          // onChangePage={handlePageChange}
                          selectableRows
                          paginationRowsPerPageOptions={Constants.ROW_PER_PAGE}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>

            {/* #3 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${isCardVisible3
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                          }`}
                        onClick={toggleCardVisibility3}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">AI</span>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                      <span className="headerTitle">Additional Information</span>
                      <span className="subHeaderTitle"> </span>
                    </Col>

                    {/* <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-person"></i> Block
                      </button>
                    </Col>
                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-person"></i>UnBlock
                      </button>
                    </Col>

                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-x-circle"></i> Deletion
                      </button>
                    </Col> */}

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
                              <i className="bi bi-bar-chart mr-3"></i>
                              Chart
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-download mr-2"></i>
                              Download
                            </span>
                          </li>
                          <li>
                            <span className="dropdown-item headerIcon">
                              <i className="bi bi-funnel"></i>
                              Filter
                            </span>
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
                  // id="acc"
                  className={`accordion-collapse collapse show ${isCardVisible3 ? "visible" : ""
                    }`}
                // aria-labelledby="headingOne"
                // data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {/* <Row>
                      <Col xs={12} md={12} lg={12}>
                        <DataTable
                          title=""
                          columns={bankDetailsCol}
                          data={getBankDetails}
                          progressPending={loading}
                          pagination
                          // paginationServer
                          // paginationTotalRows={totalRows}
                          // onChangeRowsPerPage={handlePerRowsChange}
                          // onChangePage={handlePageChange}
                          selectableRows
                          paginationRowsPerPageOptions={Constants.ROW_PER_PAGE}
                        />
                      </Col>
                    </Row> */}
                    <Row className="pt-2 pb-4">
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Do you have ISO (9001, 14001, 45001) Certification?: </span>
                        <span className="headerSubText">
                          {getHeaderData?.ISOCertification}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Do you have a valid ICV Certification?: </span>
                        <span className="headerSubText">
                          {getHeaderData?.ICVCertificate}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Website and Company Brochure: </span>
                        <span className="headerSubText">
                          {getHeaderData?.CompanyBrochure}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Purpose/Justification - Please explain benefits Our Company would get from registering your company?: </span>
                        <span className="headerSubText">
                          {getHeaderData?.purposeJustification}
                        </span>
                      </Col>
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">
                          Mobile internationalNumber:{" "}
                        </span>
                        <span className="headerSubText">
                          {getHeaderData?.mobileNumber?.internationalNumber}
                        </span>
                      </Col> */}
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">City: </span>
                        <span className="headerSubText">
                          {getHeaderData?.city}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">State: </span>
                        <span className="headerSubText">
                          {getHeaderData?.state}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Country: </span>
                        <span className="headerSubText">
                          {getHeaderData?.country}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Contact Person: </span>
                        <span className="headerSubText">
                          {getHeaderData?.contactfirstName}
                        </span>
                      </Col> */}
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Contact Number: </span>
                        <span className="headerSubText">
                          {getHeaderData?.contactNumber}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Contact Email: </span>
                        <span className="headerSubText">
                          {getHeaderData?.email}
                        </span>
                      </Col> */}
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <CreateRFQModal show={modalShow} onHide={() => hideModal()} />

      <CommonItemLevelDatatableModal
        show={itemLevelModalShow}
        onHide={() => itemLevelHideModal()}
        columns={getItemLevelColumns}
        data={getItemLevelData}
        title={getModalTitle}
      />
    </main>
  );
};

export default SupplierDetailedPage;
