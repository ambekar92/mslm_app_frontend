import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";

//Redux
import { useSelector, useDispatch } from "react-redux"; //useDispatch

//Components
import Layout from "../../../Layout/Layout";
import CreateSupplierMasterModal from "../../../Components/Modal/supplier_app/CreateSupplierMasterModal";
import Constants from "../../../common/Constants";

const GRNReprocess = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  localStorage.setItem('menu', 'SAP Reprocess');
  localStorage.setItem('submenu', 'GRN Reprocess');

  let goods_received_noteData = useSelector((state) => state?.purchasing?.goods_received_note?.data); // User Details from Store

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
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setData(goods_received_noteData);
    // setTotalRows(goods_received_noteData?.length);
    setLoading(false);
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  //   setData(goods_received_noteData);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goods_received_noteData]);

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
      name: "Material Document",
      cell: (row) => (
        <button className="btnInfo">{row.materialDocument} </button>
      ),
      width: "150px",
    },
    {
      name: "Line Items",
      cell: (row) => (
        <>
          <span style={{ marginLeft: "12px" }}>
            <i className="bi bi-calendar2-week iconTable"></i>
          </span>
          <span className="suppliersIcon"> {row.items?.length} </span>
        </>
      ),
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">{row.deliveryStatus}</span>
        </>
      ),
      width: "120px",
    },


    {
      name: "Date",
      selector: (row) => row.shippmentDate || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Posted On",
      selector: (row) => row.postedOn || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Value",
      selector: (row) => row.sumOfGrn || "--",
      sortable: true,
      width: "100px",
    },
    {
      name: "Currency",
      selector: (row) => row.currency || "--",

      width: "150px",
    },
    {
      name: "Purchase Order",
      selector: (row) => row.items[0]?.purchasingDocumentNr || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "SAP GRN",
      selector: (row) => row.sapDocumentNumber,
      sortable: true,
      width: "200px",
    },
    {
      name: "Supplier",
      selector: (row) => row.vendorNumber,
      sortable: true,
      width: "180px",
    },
    {
      name: "Delivery Note",
      selector: (row) => row.deliveryNoteNo || "--",
      sortable: true,
      width: "140px",
    },



    {
      name: "Bill of Lading",
      selector: (row) => row.billOfLading || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Invoice",
      selector: (row) => row.sap_rfq || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Invoice Status",
      cell: (row) => (
        <>
          <span className="badge rounded-pill bg-success text-dark">{row.invoiceStatus}</span>
        </>
      ),
      width: "120px",
    },

  ];

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Goods Received Note</h2>
            <p className="subText">Goods Received Note List</p>
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
                      <span className="iconLogo">SL</span>
                    </Col>
                    <Col xs={12} md={7} lg={7}>
                      <span className="headerTitle">Goods Received Note List</span>
                      <span className="subHeaderTitle">
                        View of Goods Received Note List{" "}
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

                    <Col xs={4} md={3} lg={3} className="">
                      <button className="btnTable" onClick={() => {
                          alert("asd");
                        }}>
                        <i className="bi bi-x-circle"></i> Deletion
                      </button>
                    </Col>


                    <Col xs={1} md={1} lg={1} className="text-right">
                      <span>
                        <i className="bi bi-bar-chart headerIcon mr-3"></i>
                      </span>
                      <span>
                        <i className="bi bi-download headerIcon mr-2"></i>
                      </span>
                      <span>
                        <i className="bi bi-funnel headerIcon"></i>
                      </span>
                    </Col>
                    {/* <Col xs={1} md={1} lg={1} className="text-right" style={{marginLeft: "80px"}}>
                      <div className="button-container">
                        <button className="btnTable left-button" id="left-button">
                          <i className="bi bi-chevron-left"></i>
                        </button>
                        <button className="btnTable right-button">
                          <i className="bi bi-chevron-right" id="right-button"></i>
                        </button>
                      </div>
                    </Col> */}
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
    </main>
  );
};

export default GRNReprocess;
