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
import { addASNDetailNumber } from "../../../redux/feature/supplier_app/purchasingSlice";


const ASN = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.setItem('menu','Purchasing');
  localStorage.setItem('submenu','Advanced Shipping Notice');

  let asn_data = useSelector(
    (state) => state?.purchasing?.asn?.data
  ); // User Details from Store

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

  const detailedPage = (ansNumber) => {
    console.log("ansNumber",ansNumber);
    dispatch(addASNDetailNumber(ansNumber));
    navigate(Constants.POCOLLABRATION_ASN_DETAIL_PAGE);
  };
  const fetchUsers = async (page) => {
    setLoading(true);
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setData(asn_data);
    // setTotalRows(asn_data?.length);
    setLoading(false);
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  //   setData(asn_data);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asn_data]);

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
      name: "ASN Number",
      cell: (row) => (
       <button className="btnInfo" onClick={() => detailedPage(row.asnNumber)}>{row.asnNumber} </button>
      ),
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
      name: "ASN Date",
      selector: (row) => row.asnDate || "--",
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">{row.statusHdr}</span>
        </>
      ),
      width: "120px",
    },
    {
      name: "SAP IBD ",
      selector: (row) => row.sapInboundDelivery,
      sortable: true,
      width: "180px",
    },
    {
      name: "Invoice Number",
      selector: (row) => row.vendorInvoiceNo,
      sortable: true,
      width: "180px",
    },
    {
      name: "Invoice Date",
      selector: (row) => row.vendorInvoiceDate || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Invoice Value",
      selector: (row) => row.vendorInvoiceAmount || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Currency",
      selector: (row) => row.vendorInvoiceCurrency,
      sortable: true,
      width: "140px",
    },
    {
      name: "Supplier Name",
      selector: (row) => row.organisationName,
      sortable: true,
      width: "180px",
    },
    {
      name: "PO/SA Number",
      selector: (row) => row?.purchasingDocumentNr || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "PO/SA Date",
      selector: (row) => row?.purchaseDocumentDate || "--",
      sortable: true,
      width: "150px",
    },   
    {
      name: "Shipping Type",
      cell: (row) => (
        <>
          <span> {row.shippingType} </span>
        </>
      ),
      width: "120px",
    },
  

    {
      name: "Delivery Status",
      cell: (row) => (
        <>
          <button className="btnTable">{row.deliveredStatus}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Invoice Status",
      cell: (row) => (
        <>
          <button className="btnTable">{row.invoicedStatus}</button>
        </>
      ),
      width: "140px",
    },
    {
      name: "Payment Status",
      cell: (row) => (
        <>
          <button className="btnTable">{row.paymentStatus}</button>
        </>
      ),
      width: "140px",
    },
  ];

  const lineItemColInfo = [
    {
      name: "Item Number",
      cell: (row) => <span>{row.purchasingDocumentNr} </span>,
      width: "180px",
    },
    {
      name: "Material",
      cell: (row) => <span>{row.material} </span>,
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
      cell: (row) => <span>{row.purchaseQty} </span>,
      width: "220px",
    },
    {
      name: "UOM",
      cell: (row) => <span>{row.orderUnit} </span>,
      width: "220px",
    },
    {
      name: "Delivery Date",
      cell: (row) => <span>{row.deliveryDate} </span>,
      width: "220px",
    },
    {
      name: "PR",
      cell: (row) => <span>{row.requestNumber} </span>,
      width: "220px",
    },
    {
      name: "PR Item",
      cell: (row) => <span>{row.prItemNr} </span>,
      width: "220px",
    },
  ];

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
                <h2 className='mainTitle'>Advanced Shipping Notice</h2>
              <p className='subText'>Advanced Shipping Notice</p>
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
                    <Col xs={12} md={3} lg={3}>
                      <span className="headerTitle">ASN List</span>
                      <span className="subHeaderTitle">
                        View of ASN List{" "}
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
                        <i className="bi bi-plus-lg"></i> Request Supplier for
                        ACK
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

export default ASN;
