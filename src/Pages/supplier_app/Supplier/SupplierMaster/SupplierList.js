import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux"; //useDispatch

//Components
import Layout from "../../../../Layout/Layout";
import CreateSupplierMasterModal from "../../../../Components/Modal/supplier_app/CreateSupplierMasterModal";
import Constants from "../../../../common/Constants";
import CommonItemLevelDatatableModal from "../../../../Components/Modal/supplier_app/CommonItemLevelDatatableModal";
import { addsupplierID } from "../../../../redux/feature/supplier_app/supplierSlice";

const SupplierList = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.setItem("menu", "Supplier");
  localStorage.setItem("submenu", "List");
  let supplierData = useSelector((state) => state?.supplier.data); // User Details from Store

  // Format the price above to USD using the locale, style, and currency.
  // let USDollar = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [totalRows, setTotalRows] = useState(10);
  // const [perPage, setPerPage] = useState(10);
  const [isCardVisible, setCardVisible] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const [getItemLevelData, setItemLevelData] = useState([]);
  const [getItemLevelColumns, setItemLevelColumns] = useState([]);
  const [getModalTitle, setModalTitle] = useState("");

  const [itemLevelModalShow, setItemLevelModalShow] = useState(false);

  const detailedPage = (supplierID) => {
    dispatch(addsupplierID(supplierID));
    navigate(Constants.SUPPLIER_DETAILED_PAGE_CREATE);
  };

  const itemLevelHideModal = () => {
    setItemLevelModalShow(false);
  };
  // OnClick on categoryItem  Data
  const categoryItemShowModal = (itemLevelData) => {
    setItemLevelData(itemLevelData);
    setItemLevelColumns(categoryItemColInfo);
    setModalTitle("Category Details");
    setItemLevelModalShow(true);
  };

  // OnClick on Certificate document Data
  const certificateDocumentShowModal = (itemLevelData) => {
    setItemLevelData(itemLevelData);
    setItemLevelColumns(certificateDocumentColInfo);
    setModalTitle("Certificate document Details");
    setItemLevelModalShow(true);
  };

  const toggleCardVisibility = () => {
    setCardVisible(!isCardVisible);
  };

  /* Modal Function */
  const createRFQ = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setData(supplierData);
    // setTotalRows(supplierData?.length);
    setLoading(false);
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
  }, [supplierData]);

  const columns = [
    {
      name: "Collaboration",
      cell: (row) => (
        <>
          <span>
            <i className="bi bi-git iconTable"></i>
          </span>
          <span>
            <i className="bi bi-collection-play iconTable"></i>
          </span>
          <span>
            <i className="bi bi-stack iconTable"></i>
          </span>
        </>
      ),
      width: "150px",
    },
    {
      name: "Profile",
      width: "80px",
      cell: (row) => (
        <img
          src="assets/img/profile-img.png"
          alt="Profile"
          className="rounded-circle profileImageCss"
          style={{ width: "40px" }}
        />
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category || "--",
      sortable: true,
      width: "120px",
    },
    {
      name: "Supplier ID",
      cell: (row) => (
        <button className="btnInfo" onClick={() => detailedPage(row.AssociateNumber)}>{row.AssociateNumber} </button>
      ),
      width: "120px",
    },
    {
      name: "Version",
      selector: (row) => row.version || "--",
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">{row.status}</span>
        </>
      ),
      width: "120px",
    },

    {
      name: "Supplier Name",
      selector: (row) => row.organisationName,
      sortable: true,
      width: "180px",
    },
    {
      name: "SAP Number",
      selector: (row) => row.sapAssociateNumber || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Contact Person",
      selector: (row) => row.contactfirstName || "--",
      sortable: true,
      width: "150px",
    },

    {
      name: "Contact Number",
      selector: (row) => row.contactNumber || "--",
      sortable: true,
      width: "150px",
    },


    // {
    //   name: "Contact",
    //   selector: (row) => row.mobileNumber?.e164Number || "--",
    //   sortable: true,
    //   width: "140px",
    // },

    {
      name: "EMail",
      selector: (row) => row.email,
      sortable: true,
      width: "250px",
    },
    {
      name: "User Id",
      selector: (row) => row.userId  || "--",
      sortable: true,
      width: "120px",
    },
    {
      name: "Initiator",
      selector: (row) => row.initiatedBy || "--",
      sortable: true,
      width: "100px",
    },
    {
      name: "Supplier 360",
      cell: (row) => <button className="btnInfo">{"View"} </button>,

      width: "150px",
    },
    {
      name: "Financial Health",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Evaluation Score",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "ESG score",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "100px",
    },
    {
      name: "ICV Score %",
      selector: (row) => row.totalScore || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Category",
      cell: (row) => (
        <>
          <span
            style={{ marginLeft: "12px" }}
            onClick={() => categoryItemShowModal(row.vendorCategory)}
          >
            <i className="bi bi-calendar2-week iconTable"></i>
          </span>
          <span className="suppliersIcon"> {row.vendorCategory?.length} </span>
        </>
      ),
      width: "120px",
    },
    {
      name: "Certificate document",
      cell: (row) => (
        <>
          <span
            style={{ marginLeft: "12px" }}
            onClick={() =>
              certificateDocumentShowModal(row.certificatesAndDetails)
            }
          >
            <i className="bi bi-calendar2-week iconTable"></i>
          </span>
          <span className="suppliersIcon">
            {" "}
            {row.certificatesAndDetails?.length > 0
              ? row.certificatesAndDetails?.length
              : "0"}{" "}
          </span>
        </>
      ),
      width: "150px",
    },
    {
      name: "Created Date",
      selector: (row) => row.createdAt,
      sortable: true,
      width: "160px",
    },
    {
      name: "Company Code",
      cell: (row) => (
        <>
          <span> {row.legalEntity} </span>
        </>
      ),
      width: "120px",
    },
    {
      name: "Block Reason",
      selector: (row) => row.rfqTechFocalPerson,
      sortable: true,
      width: "130px",
    },
    {
      name: "SAP Remark",
      selector: (row) => row.rfqTechTargetDate,
      sortable: true,
      width: "140px",
    },
    {
      name: "SAP Error Msg",
      selector: (row) => row.extensionCount,
      sortable: true,
      width: "140px",
    },

    {
      name: "SAP Reprocess",
      cell: (row) => (
        <>
          <button className="btnTable">Reprocess {row.publish}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Send Invite",
      cell: (row) => (
        <>
          <button className="btnTable">Invite {row.publish}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Re-Invite",
      cell: (row) => (
        <>
          <button className="btnTable">Re-Invite {row.publish}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Edit Supplier",
      cell: (row) => (
        <>
          <button className="btnTable">Edit {row.publish}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Deactivate",
      cell: (row) => (
        <>
          <button className="btnTable">Deactivate {row.publish}</button>
        </>
      ),
      width: "140px",
    },
  ];

  const categoryItemColInfo = [
    {
      name: "Category Code",
      cell: (row) => <span>{row.categoryCode} </span>,
      width: "180px",
    },
    {
      name: "Sub Category Code",
      cell: (row) => <span>{row.subCategoryCode} </span>,
      width: "180px",
    },
    {
      name: "Vendor Category",
      cell: (row) => <span>{row.vendorCategoryText} </span>,
      width: "180px",
    },
    {
      name: "Vendor Sub Category",
      cell: (row) => <span>{row.vendorSubCategoryLongText} </span>,
      width: "180px",
    },
  ];

  const certificateDocumentColInfo = [
    {
      name: "Certificate Type",
      cell: (row) => <span>{row.idType} </span>,
      width: "180px",
    },
    {
      name: "Certificate Number",
      cell: (row) => <span>{row.idNumber} </span>,
      width: "180px",
    },
    {
      name: "Expiry Date",
      cell: (row) => <span>{row.idValidTo} </span>,
      width: "180px",
    },
    {
      name: "Issueing Authority/Accreditation",
      cell: (row) => <span>{row.instituteIssued} </span>,
      width: "180px",
    },
    {
      name: "Certificate Attachement",
      cell: (row) => <span>{row.subCategoryCode} </span>,
      width: "180px",
    },
    {
      name: "Vendor Block",
      cell: (row) => <span>{row.subCategoryCode} </span>,
      width: "180px",
    },
    {
      name: "Remainder",
      cell: (row) => <span>{row.subCategoryCode} </span>,
      width: "180px",
    },
  ];

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Supplier</h2>
            <p className="subText">Supplier List</p>
            <hr />

            <div className="accordion" id="accordionExample">
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
                      <span className="iconLogo">SL</span>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                      <span className="headerTitle">Supplier List</span>
                      <span className="subHeaderTitle">
                        View of Supplier List{" "}
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

                    <Col xs={4} md={1} lg={1} className="">
                      <button className="btnTable" onClick={() => createRFQ()}>
                        <i className="bi bi-plus-lg"></i> Supplier Request
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-cursor"></i> Send Invite
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-envelope"></i> Broadcast
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        {/* <i className="bi bi-justify"></i> */}
                         Deactivate List
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        {/* <i className="bi bi-justify"></i>  */}
                        Category List
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button className="btnTable" onClick={() => createRFQ()}>
                        {/* <i className="bi bi-justify"></i>  */}
                        Dealership List
                      </button>
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible ? "visible" : ""
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
                          paginationRowsPerPageOptions={Constants.ROW_PER_PAGE}
                          pagination
                          // paginationServer
                          // paginationTotalRows={totalRows}
                          // onChangeRowsPerPage={handlePerRowsChange}
                          // onChangePage={handlePageChange}
                          selectableRows
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

      <CreateSupplierMasterModal show={modalShow} onHide={() => hideModal()} />

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

export default SupplierList;
