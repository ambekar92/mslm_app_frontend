import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";

//Redux
import { useSelector, useDispatch } from "react-redux"; //useDispatch

// import ConstantsList from '../../../common/Constants';

//Components
import Layout from "../../../Layout/Layout";
import CreateSupplierMasterModal from "../../../Components/Modal/supplier_app/CreateSupplierMasterModal";
import Constants from "../../../common/Constants";
import CommonItemLevelDatatableModal from "../../../Components/Modal/supplier_app/CommonItemLevelDatatableModal";
import { useNavigate } from "react-router-dom";
import { addGatepassDetailNumber } from "../../../redux/feature/supplier_app/gatepassSlice";


const GatepassList = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const navigate = useNavigate();

  localStorage.setItem("menu", "Gatepass");
  localStorage.setItem("submenu", "-");
  let gatepass_data = useSelector((state) => state?.gatepass?.data); // User Details from Store


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
  const createRFQ = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const detailedPage = (gatepassNr) => {
    console.log("gatepassNr", gatepassNr);
    dispatch(addGatepassDetailNumber(gatepassNr));
    navigate(Constants.GATEPASS_GATEPASS_DETAIL_PAGE);
  };
  const fetchUsers = async (page) => {
    setLoading(true);
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setData(gatepass_data);
    // setTotalRows(gatepass_data?.length);
    setLoading(false);
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  //   setData(gatepass_data);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gatepass_data]);

  const columns = [
   
    {
      name: "Gatepass Number",
      cell: (row) => (
        <button className="btnInfo" onClick={() => detailedPage(row.gatepassNr)}>{row.gatepassNr} </button>
      ),
      width: "200px",
    },
    {
      name: "ASN",
      selector: (row) => row.asnNumber || "--",
      sortable: true,
      width: "200px",
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
      name: "Invoice Number",
      selector: (row) => row.vendorInvoiceNo || "--",
      sortable: true,
      width: "200px",
    },
    {
      name: "Vehicle Number",
      selector: (row) => row.vehicleNumber || "--",
      sortable: true,
      width: "200px",
    },
    {
      name: "Vehicle In Date",
      selector: (row) => row.vehicleInDate || "--",
      sortable: true,
      width: "200px",
    },
    {
      name: "Vehicle In Time",
      selector: (row) => row.vehicleIntime || "--",
      sortable: true,
      width: "200px",
    },{
      name: "Vendor name",
      selector: (row) => row.organisationName || "--",
      sortable: true,
      width: "200px",
    },
    
  
  ];

  const lineItemColInfo = [
    {
      name: "gatepassNr",
      cell: (row) => <span>{row.gatepassNr} </span>,
      width: "180px",
    },
    {
      name: "Item Number",
      cell: (row) => <span>{row.gatepassItemNr} </span>,
      width: "180px",
    },
    {
      name: "Material",
      cell: (row) => <span>{row.materialCode} </span>,
      width: "180px",
    },
    {
      name: "Material Desc",
      cell: (row) => <span>{row.briefDescription} </span>,
      width: "220px",
    },
    {
      name: "Material Group",
      cell: (row) => <span>{row.materialClass2} </span>,
      width: "220px",
    },
    {
      name: "Quantity",
      cell: (row) => <span>{row.orderquantity} </span>,
      width: "220px",
    },
    {
      name: "UOM",
      cell: (row) => <span>{row.uom} </span>,
      width: "220px",
    },
    {
      name: "Delivery Date",
      cell: (row) => <span>{row.createdOn} </span>,
      width: "220px",
    }
  ];

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Gatepass List</h2>
            <p className="subText">Gatepass List Details</p>
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
                      <span className="iconLogo">GP</span>
                    </Col>
                    <Col xs={12} md={3} lg={3}>
                      <span className="headerTitle">Gatepass List</span>
                      <span className="subHeaderTitle">
                        View of Gatepass List{" "}
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
                      <button className="btnTable" onClick={() => createRFQ()}>
                        <i className="bi bi-plus-lg"></i> Create Gatepass
                      </button>
                    </Col>

                    <Col xs={4} md={4} lg={4} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-x-circle"></i> Deletion
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

export default GatepassList;
