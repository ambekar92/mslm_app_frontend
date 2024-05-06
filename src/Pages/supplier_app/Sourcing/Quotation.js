import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";

//Redux
import { useSelector } from "react-redux"; //useDispatch

//Components
import Layout from "../../../Layout/Layout";
import CreateRFQModal from "../../../Components/Modal/supplier_app/CreateRFQModal";
import Constants from "../../../common/Constants";
import CommonItemLevelDatatableModal from "../../../Components/Modal/supplier_app/CommonItemLevelDatatableModal";

const RequestForQuotation = () => {
  localStorage.setItem("menu", "Sourcing");
  localStorage.setItem("submenu", "Quotation");
  let quotationData = useSelector((state) => state?.sourcing?.quotation?.data); // User Details from Store

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

  const itemLevelHideModal = () => {
    setItemLevelModalShow(false);
  };
  // OnClick on lineItem  Data
  const lineItemShowModal = (itemLevelData) => {
    setItemLevelData(itemLevelData);
    setItemLevelColumns(lineItemColInfo);
    setModalTitle("Line Item Details");
    setItemLevelModalShow(true);
  };

  const toggleCardVisibility = () => {
    setCardVisible(!isCardVisible);
  };

  /* Modal Function */
  // eslint-disable-next-line no-unused-vars
  const createRFQ = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    // console.log(">> Here is printing > ", page);
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setData(quotationData);
    // setTotalRows(quotationData?.length);
    setLoading(false);
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  //   setData(quotationData);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotationData]);

  const columns = [
    {
      name: "Quotation Number",
      cell: (row) => <button className="btnInfo">{row.QuotationNr} </button>,
      width: "150px",
    },
    {
      name: "Line Items",
      cell: (row) => (
        <>
          <span
            style={{ marginLeft: "12px" }}
            onClick={() => lineItemShowModal(row.items)}
          >
            <i className="bi bi-calendar2-week iconTable"></i>
          </span>
          <span className="suppliersIcon"> {row.items?.length} </span>
        </>
      ),
      width: "120px",
    },

    {
      name: "Quotation Version",
      selector: (row) => row.version,
      sortable: true,
      width: "150px",
    },
    {
      name: "Quotation Status",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">
            {row.quotationStatus}
          </span>
        </>
      ),
      width: "130px",
    },
    {
      name: "Quotation Value ",
      selector: (row) => row.quotationItemTotalValue,
      sortable: true,
      width: "140px",
    },
    {
      name: "Quotation Currency",
      selector: (row) => row.bidderCurrency,
      sortable: true,
      width: "160px",
    },
    {
      name: "Quotation Date",
      selector: (row) => row.quotationSubmissionDate,
      sortable: true,
      width: "190px",
    },

    {
      name: "RFQ Number",
      cell: (row) => (
        <button className="btnInfo">{row.rfqCollectiveNr} </button>
      ),
      width: "120px",
    },
    {
      name: "RFQ Version",
      selector: (row) => row.rfqVersion || "--",
      sortable: true,
      width: "130px",
    },
    {
      name: " RFQ Status",
      cell: (row) => (
        <>
          <span className="badge rounded-pill bg-success text-dark">
            Success
          </span>
        </>
      ),
      width: "100px",
    },
    {
      name: "RFQ Open Date",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "180px",
    },
    {
      name: "RFQ Close Date",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "180px",
    },
    {
      name: "Revised Closing Date",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "180px",
    },
    {
      name: "RFQ Category",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "180px",
    },
    {
      name: "Buyer Responsible",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "180px",
    },
    {
      name: "RFQ Type",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "180px",
    },
    {
      name: "Product Type",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "180px",
    },

    {
      name: "Submitted By",
      selector: (row) => row.quotationSubmittedBy,
      sortable: true,
      width: "150px",
    },

    {
      name: "TQ",
      selector: (row) => row.extensionCount,
      sortable: true,
      width: "140px",
    },
    {
      name: "UP",
      selector: (row) => row.extensionCount,
      sortable: true,
      width: "140px",
    },
    {
      name: "CQ",
      selector: (row) => row.extensionCount,
      sortable: true,
      width: "140px",
    },

    {
      name: "Company",
      selector: (row) => row.rfqTechFocalPerson,
      sortable: true,
      width: "130px",
    },
    {
      name: "Plant",
      selector: (row) => row.rfqTechTargetDate,
      sortable: true,
      width: "140px",
    },
  ];

  const lineItemColInfo = [
    {
      name: "Item Number",
      cell: (row) => <span>{row.schRfqItemNr} </span>,
      width: "150px",
    },
    
    {
      name: "Material",
      cell: (row) => <span>{row.materialCode} </span>,
      width: "150px",
    },
    {
      name: "Brief Description",
      cell: (row) => <span>{row.briefDescription} </span>,
      width: "220px",
    },
    {
      name: "Quantity",
      cell: (row) => <span>{row.quantity} </span>,
      width: "150px",
    },
    {
      name: "RFQ Quantity",
      cell: (row) => <span>{row.rfxQuantity} </span>,
      width: "150px",
    },
    {
      name: "UOM",
      cell: (row) => <span>{row.rfxQuantityUnit} </span>,
      width: "150px",
    },
    {
      name: "Unit",
      cell: (row) => <span>{row.unitPrice} </span>,
      width: "150px",
    },
    {
      name: "Total",
      cell: (row) => <span>{row.lineTotal} </span>,
      width: "150px",
    },
    {
      name: "IncoTerms",
      cell: (row) => <span>{row.incoTerms} </span>,
      width: "150px",
    },
    {
      name: "IncoTerms Location",
      cell: (row) => <span>{row.incoTermsLocation} </span>,
      width: "150px",
    },
  ];

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Quotation</h2>
            <p className="subText">Quotation List</p>
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
                      <span className="iconLogo">RQ</span>
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                      <span className="headerTitle">Quotation</span>
                      <span className="subHeaderTitle">View of Quotation </span>
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

export default RequestForQuotation;
