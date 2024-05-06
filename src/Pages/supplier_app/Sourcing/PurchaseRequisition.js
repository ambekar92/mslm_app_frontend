import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux"; //

//Components
import Layout from "../../../Layout/Layout";
import CreateRFQModal from "../../../Components/Modal/supplier_app/CreateRFQModal";
import Constants from "../../../common/Constants";
import CommonItemLevelDatatableModal from "../../../Components/Modal/supplier_app/CommonItemLevelDatatableModal";
import { addPrDetailNumber } from "../../../redux/feature/supplier_app/sourcingSlice";

const RequestForQuotation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.setItem("menu", "Sourcing");
  localStorage.setItem("submenu", "Purchase Requisition");
  let purchase_requisition_data = useSelector(
    (state) => state?.sourcing?.purchase_requisition?.data
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

  const detailedPage = (purchaseReqNumber) => {
    dispatch(addPrDetailNumber(purchaseReqNumber));
    navigate(Constants.SOURCING_PURCHASE_REQUISITION_DETAILED_PAGE);
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    // console.log(">> Here is printing > ", page);
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setData(purchase_requisition_data);
    // setTotalRows(purchase_requisition_data?.length);
    setLoading(false);
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  //   setData(purchase_requisition_data);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase_requisition_data]);

  const columns = [
    {
      name: "Ḍocument Type",
      selector: (row) => row.purchaseReqDocumentType,
      sortable: true,
      width: "150px",
    },
    {
      name: "Requisition Number",
      cell: (row) => (
        <button
          className="btnInfo"
          onClick={() => detailedPage(row.purchaseReqNumber)}
        >
          {row.purchaseReqNumber}{" "}
        </button>
      ),
      width: "160px",
    },
    {
      name: "Line Items",
      cell: (row) => (
        <>
          <span
            style={{ marginLeft: "12px" }}
            onClick={() => lineItemShowModal(row.item)}
          >
            <i className="bi bi-calendar2-week iconTable"></i>
          </span>
          <span className="suppliersIcon"> {row.item?.length} </span>
        </>
      ),
      width: "150px",
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">{row.statusHdr}</span>
        </>
      ),
      width: "150px",
    },
    {
      name: "Value",
      selector: (row) => row.prValue,
      sortable: true,
      width: "100px",
    },
    {
      name: "Currency",
      selector: (row) => row.item[0]?.currency,
      sortable: true,
      width: "120px",
    },
    {
      name: "RFQ Number",
      cell: (row) => (
        <button className="btnInfo">{row.rfqCollectiveNr|| "--"}  </button>
      ),
      
      width: "120px",
    },
    
    {
      name: "RFQ Status",
      cell: (row) => (
        <>
          <span className="badge rounded-pill bg-success-wh text-dark">
            Commercial{row.commOpen}
          </span>
        </>
      ),
      width: "150px",
    },
    {
      name: "RFQ Create On",
      selector: (row) => row.requestedOn,
      sortable: true,
      width: "150px",
    },

    {
      name: "HeaderText",
      selector: (row) => row.headerTextData[0]?.itemText || "--",
      sortable: true,
      width: "150px",
    },
    {
      name: "Release Date ",
      selector: (row) => row.purchaseReqRelDate,
      sortable: true,
      width: "150px",
    },
    {
      name: "Delivery Date ",
      selector: (row) => row.item[0]?.expectedDeliveryDate || "--",
      sortable: true,
      width: "120px",
    },
    {
      name: "Procurment Category",
      selector: (row) => row.item[0]?.procurementCategory,
      sortable: true,
      width: "180px",
    },
    {
      name: "User Department",
      selector: (row) => row.item[0]?.userDepartment,
      sortable: true,
      width: "180px",
    },

    {
      name: "Requisitioner",
      selector: (row) => row.item[0]?.nameOfRequisitioner,
      sortable: true,
      width: "160px",
    },
    {
      name: "Created By",
      selector: (row) => row.createdBy,
      sortable: true,
      width: "180px",
    },
    {
      name: "Purchasing Group",
      selector: (row) => row.item[0]?.procurementTeam,
      sortable: true,
      width: "180px",
    },
    {
      name: "Plant",
      selector: (row) => row.item[0]?.businessLocation,
      sortable: true,
      width: "140px",
    },
    {
      name: "Company",
      selector: (row) => row.legalEntity,
      sortable: true,
      width: "140px",
    },
  ];

  const lineItemColInfo = [
    {
      name: "PR Number",
      cell: (row) => <span>{row.purchasingDocumentNo} </span>,
      width: "180px",
    },
    {
      name: "PR Item Nr",
      cell: (row) => <span>{row.prItemNr} </span>,
      width: "180px",
    },
    {
      name: "Material Code",
      cell: (row) => <span>{row.materialCode} </span>,
      width: "180px",
    },
    {
      name: "Material Desc",
      cell: (row) => <span>{row.briefDescription} </span>,
      width: "180px",
    },
    {
      name: "Herder Material Desc",
      cell: (row) => <span>{row.headerMaterialCode} </span>,
      width: "180px",
    },

    {
      name: "Quantity",
      cell: (row) => <span>{row.requestedQuantity} </span>,
      width: "180px",
    },
    {
      name: "UOM",
      cell: (row) => <span>{row.quantityUnit} </span>,
      width: "180px",
    },
    {
      name: "Delivery Date",
      cell: (row) => <span>{row.expectedDeliveryDate} </span>,
      width: "180px",
    },
    {
      name: "Rate",
      cell: (row) => <span>{row.priceUnit} </span>,
      width: "180px",
    },
    {
      name: "Curreny",
      cell: (row) => <span>{row.currency} </span>,
      width: "180px",
    },
  ];

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Purchase Requisition</h2>
            <p className="subText">Purchase Requisition List</p>
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
                    <Col xs={12} md={5} lg={5}>
                      <span className="headerTitle">Purchase Requisition</span>
                      <span className="subHeaderTitle">
                        View of Purchase Requisition{" "}
                      </span>
                    </Col>

                    <Col xs={4} md={1} lg={1} className="">
                      <button className="btnTable" onClick={() => createRFQ()}>
                        <i className="bi bi-plus-lg"></i> Create RFQ
                      </button>
                    </Col>

                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-person"></i> Block/UnBlock
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-person"></i> Buyer Change
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-recycle"></i> Status Change
                      </button>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
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
