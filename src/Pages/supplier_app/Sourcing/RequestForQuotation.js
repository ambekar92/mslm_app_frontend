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
  localStorage.setItem("submenu", "Request for Quotation");
  let rfqData = useSelector((state) => state?.sourcing?.rfq?.data); // User Details from Store

  // Format the price above to USD using the locale, style, and currency.
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [totalRows, setTotalRows] = useState(10);
  // const [perPage, setPerPage] = useState(10);
  const [isCardVisible, setCardVisible] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const [getItemLevelData, setItemLevelData] = useState([]);
  const [getItemLevelColumns, setItemLevelColumns] = useState([]);
  const [getModalTitle, setModalTitle] = useState('');

  const [itemLevelModalShow, setItemLevelModalShow] = useState(false);

  const itemLevelHideModal = () => {
    setItemLevelModalShow(false);
  };
  // OnClick on Line Item Level Data
  const lineItemLevelShowModal = (itemLevelData) => {
    setItemLevelData(itemLevelData);
    setItemLevelColumns(LineItemsColInfo);
    setModalTitle("Line Item Level Details");
    setItemLevelModalShow(true);
  };

  // OnClick on Supplier List Data
  const supplierListShowModal = (itemLevelData) => {
    setItemLevelData(itemLevelData);
    setItemLevelColumns(supplierListColInfo);
    setModalTitle("Supplier List Details");
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
    // console.log(">> Here is printing > ", page);
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setData(rfqData);
    // setTotalRows(rfqData?.length);
    setLoading(false);
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  //   setData(rfqData);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rfqData]);

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
      name: "RFQ Number",
      cell: (row) => (
        <button className="btnInfo">{row.rfqCollectiveNr} </button>
      ),
      width: "120px",
    },
    {
      name: "Line Items",
      cell: (row) => (
        <>
          <span style={{ marginLeft: "12px" }} onClick={() => lineItemLevelShowModal(row.items)}>
            <i className="bi bi-calendar2-week iconTable"></i>
          </span>
          <span className="suppliersIcon"> {row.items?.length} </span>
        </>
      ),
      width: "120px",
    },

    {
      name: "Version",
      selector: (row) => row.rfqVersion,
      sortable: true,
      width: "100px",
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">{row.rfqStatus}</span>
        </>
      ),
      width: "80px",
    },
    {
      name: "Title",
      selector: (row) => row.rfqTitle,
      sortable: true,
      width: "250px",
    },


    {
      name: "Supplier List",
      cell: (row) => (
        <>
          <span style={{ marginLeft: "12px" }} onClick={() => supplierListShowModal(row.supplierList)}>
            <i className="bi bi-calendar2-week iconTable"></i>
          </span>
          <span className="suppliersIcon"> {row.supplierList?.length} </span>
        </>
      ),
      width: "120px",
    },

    {
      name: "SAP RFQ",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "SAP Requisition",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: " SAP Order ",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: " Value",
      selector: (row) => USDollar.format(row.prValue),
      sortable: true,
      width: "120px",
    },
    {
      name: "Currency",
      selector: (row) => row.rfqCurrency,
      sortable: true,
      width: "100px",
    },

    {
      name: "Countdown Timer",
      selector: (row) => row.closingDate + " - " + row.openingDate,
      sortable: true,
      width: "270px",
    },
    {
      name: "Open Date ",
      selector: (row) => row.openingDate,
      sortable: true,
      width: "140px",
    },
    {
      name: "Close Date",
      selector: (row) => row.closingDate,
      sortable: true,
      width: "160px",
    },
    {
      name: "Procurment Category",
      selector: (row) => row.rfqCategory,
      sortable: true,
      width: "200px",
    },
    {
      name: "Technical User",
      selector: (row) => row.rfqTechFocalPerson,
      sortable: true,
      width: "130px",
    },
    {
      name: "Tech Target Date",
      selector: (row) => row.rfqTechTargetDate,
      sortable: true,
      width: "140px",
    },
    {
      name: "Extension Count",
      selector: (row) => row.extensionCount,
      sortable: true,
      width: "140px",
    },

    {
      name: "Publish",
      cell: (row) => (
        <>
          <button className="btnTable">Approved {row.publish}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Technical",
      cell: (row) => (
        <>
          <button className="btnTable">Approved {row.techOpen}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Commercial",
      cell: (row) => (
        <>
          <button className="btnTable">Approved {row.commOpen}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Order",
      cell: (row) => (
        <>
          <button className="btnTable">Approved {row.order}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Company",
      cell: (row) => (
        <>
          <span> {row.legalEntity} </span>
        </>
      ),
      width: "120px",
    },
    {
      name: "Buyer Responsible",
      selector: (row) => row.buyerName,
      sortable: true,
      width: "190px",
    },
    {
      name: "Buyer Contact",
      selector: (row) => row.buyeremailId,
      sortable: true,
      width: "210px",
    },
    {
      name: "Envelope Step",
      selector: (row) => row.rfqEnvelopType,
      sortable: true,
      width: "125px",
    },
    {
      name: "Envelope Type",
      cell: (row) => (
        <>
          <span className="badge bg-danger">{row.bidType}</span>
        </>
      ),
      width: "115px",
    },
    {
      name: "Product",
      selector: (row) => row.productType,
      sortable: true,
      width: "110px",
    },
  ];

  const supplierListColInfo = [
       
    {
      name: "Supplier Name",
      selector: (row) => row.schAssociateNumber,
      sortable: true,
      width: "180px",
    }, 
    {
      name: "Supplier Name",
      selector: (row) => row.BPName,
      sortable: true,
      width: "200px",
    }, 
    {
      name: "Supplier Status",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">{row.supplierStatus}</span>
        </>
      ),
      width: "180px",
    },
    {
      name: "Quotation Status",
      cell: (row) => (
        <>
          <span className="badge rounded-pill bg-info text-dark">{row.quotationStatus}</span>
        </>
      ),
      width: "180px",
    },
    {
      name: "Mail",
      selector: (row) => row.rfqAssociateEmail || "--",
      sortable: true,
      width: "250px",
    },
    {
      name: "Contact",
      selector: (row) => row.rfqAssociateContact,
      sortable: true,
      width: "200px",
    },   
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
      width: "140px",
    },
    {
      name: "ICV Validity",
      selector: (row) => row.icvValidity,
      sortable: true,
      width: "160px",
    },
    {
      name: "ICV Value",
      selector: (row) => row.icvValue,
      sortable: true,
      width: "150px",
    },
    
    
  ];

  const LineItemsColInfo = [
    
   

    {
      name: "RFQ Item Number",
      selector: (row) => row.schRfqItemNr,
      sortable: true,
      width: "180px",
    },
    {
      name: "PR Number",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">{row.purchaseDocumentNr}</span>
        </>
      ),
      width: "200px",
    },
    {
      name: "Material Code",
      selector: (row) => row.materialCode,
      sortable: true,
      width: "250px",
    },
    {
      name: "Material Desc",
      selector: (row) => row.briefDescription,
      sortable: true,
      width: "250px",
    },
    {
      name: "Quantity Unit",
      selector: (row) => row.prQuantityUnit || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      width: "250px",
    },
    {
      name: "Item Rate",
      selector: (row) => row.internalRate,
      sortable: true,
      width: "250px",
    }, 

  
   
  ];

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Request For Quotation</h2>
            <p className="subText">Request For Quotation List</p>
            <hr />

            <div className="accordion" id="accordionExample">
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
                      <span className="iconLogo">RQ</span>
                    </Col>
                    <Col xs={12} md={5} lg={5}>
                      <span className="headerTitle">Request For Quotation</span>
                      <span className="subHeaderTitle">
                        View of Request For Quotation{" "}
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
                        <i className="bi bi-plus-lg"></i> Create Manual
                      </button>
                    </Col>

                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-copy"></i> Copy
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-person"></i>  Buyer Change
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-recycle"></i>  Status Change
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-x-circle"></i> Cancellation

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
                  className={`accordion-collapse collapse show ${isCardVisible ? "visible" : ""
                    }`}
                // aria-labelledby="headingOne"
                // data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <Row>
                      <Col xs={12} md={12} lg={12}>
                        <DataTable
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
