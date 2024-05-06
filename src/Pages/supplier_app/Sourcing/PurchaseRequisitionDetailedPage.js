import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

//Redux
import { useSelector } from "react-redux"; //useDispatch

//Components
import Layout from "../../../Layout/Layout";
import CreateRFQModal from "../../../Components/Modal/supplier_app/CreateRFQModal";
import Constants from "../../../common/Constants";
import CommonItemLevelDatatableModal from "../../../Components/Modal/supplier_app/CommonItemLevelDatatableModal";

const PurchaseRequisitionDetailedPage = () => {
  const navigate = useNavigate();
  localStorage.setItem("menu", "Sourcing");
  localStorage.setItem("submenu", "Purchase Requisition");

  let purchase_requisition_data = useSelector(
    (state) => state?.sourcing?.purchase_requisition?.data
  ); // User Details from Store

  let prNumber = useSelector(
    (state) => state?.sourcing?.purchase_requisition?.prNumber
  ); // User Details from Store

  // Format the price above to USD using the locale, style, and currency.
  // let USDollar = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [getHeaderData, setHeaderData] = useState(false);
  // const [totalRows, setTotalRows] = useState(10);
  // const [perPage, setPerPage] = useState(10);
  const [isCardVisible, setCardVisible] = useState(true);
  const [isCardVisible2, setCardVisible2] = useState(true);
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
  const toggleCardVisibility2 = () => {
    setCardVisible2(!isCardVisible2);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    if (prNumber) {
      let filteredData = purchase_requisition_data.filter(
        (item) => item.purchaseReqNumber === prNumber
      );
      console.log(">> filteredData", filteredData);
      setHeaderData(filteredData[0]);
      let itemData = filteredData[0]?.item;

      setData(itemData);
      setLoading(false);
    } else {
      navigate(Constants.SOURCING_PURCHASE_REQUISITION);
    }
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
  }, [prNumber]);

  const columns = [
    {
      name: "PR Number",
      selector: (row) => row.purchasingDocumentNo,
      sortable: true,
      width: "150px",
    },
    {
      name: "PR Line Items",
      selector: (row) => row.purchaseReqItem,
      sortable: true,
      width: "150px",
    },
    {
      name: "Item Text",
      cell: (row) => (
        <>
          <span
            style={{ marginLeft: "12px" }}
            onClick={() => lineItemShowModal(row.itemTextData)}
          >
            <i className="bi bi-calendar2-week iconTable"></i>
          </span>
          <span className="suppliersIcon"> {row.itemTextData?.length} </span>
        </>
      ),
      width: "150px",
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <span className="badge bg-warning text-dark">{row.statusItem}</span>
        </>
      ),
      width: "150px",
    },
    {
      name: "Material/Service",
      selector: (row) => row.materialCode,
      sortable: true,
      width: "150px",
    },

    {
      name: "Material Desc",
      selector: (row) => row.briefDescription,
      sortable: true,
      width: "150px",
    },
    {
      name: "Header Mat Code / Desc",
      selector: (row) => row.headerMaterialCode,
      sortable: true,
      width: "200px",
    },

    {
      name: "Quantity",
      selector: (row) => row.requestedQuantity,
      sortable: true,
      width: "120px",
    },
    {
      name: "UOM",
      selector: (row) => row.quantityUnit,
      sortable: true,
      width: "120px",
    },
    {
      name: "Price",
      selector: (row) => row.priceUnit,
      sortable: true,
      width: "120px",
    },
    {
      name: "Currency",
      selector: (row) => row.currency,
      sortable: true,
      width: "120px",
    },
    {
      name: "Material Group",
      selector: (row) => row.materialClass2,
      sortable: true,
      width: "200px",
    },
    {
      name: "Item Sourcing",
      selector: (row) => row.itemSourcing,
      sortable: true,
      width: "140px",
    },
    {
      name: "User Department",
      selector: (row) => row.userDepartment,
      sortable: true,
      width: "200px",
    },
    {
      name: "Procurement Category",
      selector: (row) => row.procurementCategory,
      sortable: true,
      width: "200px",
    },
    {
      name: "procurement Team",
      selector: (row) => row.procurementTeam,
      sortable: true,
      width: "200px",
    },
    {
      name: "Requisitioner",
      selector: (row) => row.nameOfRequisitioner,
      sortable: true,
      width: "200px",
    },
    {
      name: "Plant",
      selector: (row) => row.businessLocation,
      sortable: true,
      width: "200px",
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

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">
              Purchase Requisition Details : {prNumber}
            </h2>
            <p className="subText">Purchase Requisition Information </p>
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
                      <span className="iconLogo">HR</span>
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                      <span className="headerTitle">Header Details</span>
                      <span className="subHeaderTitle"> </span>
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
                        <span className="headerText">Document Type: </span>
                        <span className="headerSubText">
                          {getHeaderData?.purchaseReqDocumentType}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">PR Number: </span>
                        <span className="headerSubText">
                          {getHeaderData?.purchaseReqNumber}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Company: </span>
                        <span className="headerSubText">
                          {getHeaderData?.legalEntity}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Requested On: </span>
                        <span className="headerSubText">
                          {getHeaderData?.requestedOn}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Requested: </span>
                        <span className="headerSubText">
                          {getHeaderData?.nameOfRequisitioner}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">StatusHdr: </span>
                        <span className="headerSubText">
                          {getHeaderData?.statusHdr}
                        </span>
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
                      <span className="iconLogo">LI</span>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                      <span className="headerTitle">Line Items</span>
                      <span className="subHeaderTitle"> </span>
                    </Col>

                    <Col xs={4} md={2} lg={2} className="">
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
                    isCardVisible2 ? "visible" : ""
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

export default PurchaseRequisitionDetailedPage;
