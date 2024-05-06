import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//Redux
import { useDispatch, useSelector } from "react-redux"; //useDispatch

//Components
import Layout from "../../../Layout/Layout";
import CreateRFQModal from "../../../Components/Modal/supplier_app/CreateRFQModal";
import Constants from "../../../common/Constants";
import CommonItemLevelDatatableModal from "../../../Components/Modal/supplier_app/CommonItemLevelDatatableModal";
import { getPurchaseOrder } from "../../../redux/feature/supplier_app/purchasingSlice";


//Serivce
import ItemService from "../../../services/supplier_appCommonService";

const PurchaseOrderDetailedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.setItem("menu", "Purchasing");
  localStorage.setItem("submenu", "Purchase Order");

  let userInfo = useSelector(
    (state) => state?.user?.data
  ); // User Details from Store

  let purchase_order_data = useSelector(
    (state) => state?.purchasing?.purchase_order?.data
  ); // User Details from Store

  let poNumber = useSelector(
    (state) => state?.purchasing?.purchase_order?.poNumber
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
    if (poNumber) {
      let filteredData = purchase_order_data.filter(
        (item) => item.purchasingDocumentNr === poNumber
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

  //   setData(purchase_order_data);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poNumber, purchase_order_data]);

  const columns = [
    {
      name: "PO Number",
      selector: (row) => poNumber,
      sortable: true,
      width: "150px",
    },
    {
      name: "PO Item",
      selector: (row) => row.purchaseDocumentItem,
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
      name: "Material/Service",
      selector: (row) => row.material,
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
      name: "Ack Status",
      cell: (row) => (
        <>
          <span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> {row.statusItem}</span>

        </>
      ),
      width: "150px",
    },

    {
      name: "Order Quantity",
      selector: (row) => row.purchaseQty,
      sortable: true,
      width: "150px",
    },
    {
      name: "Oder Unit",
      selector: (row) => row.orderUnit,
      sortable: true,
      width: "120px",
    },
    {
      name: "Unit Price",
      selector: (row) => row.netPrice,
      sortable: true,
      width: "120px",
    },
    {
      name: "Item Value",
      selector: (row) => row.totalPrice,
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
      name: "Tax Amount",
      selector: (row) => row.taxAmount,
      sortable: true,
      width: "200px",
    },
    {
      name: "Delivery Date",
      selector: (row) => row.confirmationDate,
      sortable: true,
      width: "140px",
    },
    {
      name: "Price Unit Qty",
      selector: (row) => row.priceUnit,
      sortable: true,
      width: "200px",
    },
    {
      name: "Tax Code",
      selector: (row) => row.taxId,
      sortable: true,
      width: "200px",
    },
    {
      name: "Tax Desc",
      selector: (row) => row.taxIdDesc,
      sortable: true,
      width: "200px",
    },
    {
      name: "Free Of Cost",
      selector: (row) => row.freeCost,
      sortable: true,
      width: "200px",
    },
    {
      name: "PR Req NO",
      selector: (row) => row.requestNumber,
      sortable: true,
      width: "200px",
    },
    {
      name: "PR Item No",
      selector: (row) => row.prItemNr,
      sortable: true,
      width: "200px",
    },
    {
      name: "ExcessTolerance",
      selector: (row) => row.excessTolerance,
      sortable: true,
      width: "200px",
    },
    {
      name: "ShortageTolerance",
      selector: (row) => row.shortageTolerance,
      sortable: true,
      width: "200px",
    }
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

  // Onclick on Table Header Button
  const handleButtonClick = async () => {


    await ItemService.AcknowledgePO(getHeaderData).then((item) => {
      if (item?.status === 200) {
        console.log("PO Acknowledged successfully");
        toast.success(item?.message || "PO Acknowledged successfully", {
          duration: 3000,
          position: "top-right",
        });

        dispatch(getPurchaseOrder());
        // Update response value after calling the API and Update in Redux Store
        //dispatch(addLocation())
        // dispatch(getLocationData(compIdObj));
      } else {
        console.log("PO Acknowledged Not successfully");

        toast.error(item?.message || "Please try again !!", {
          duration: 4000,
          position: "top-right",
        });
      }
    });



    // Call your API function here and pass listData to it
    // For example:
    // apiFunction(listData);
  };

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">
              Purchase Order Details : {poNumber}
            </h2>
            <p className="subText">Purchase Order Information </p>
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
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">PO Number: </span>
                        <span className="headerSubText">
                          {getHeaderData?.purchasingDocumentNr}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Ack Status: </span>
                        <span className="headerSubText">
                          {getHeaderData?.statusHdr}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">PO Date: </span>
                        <span className="headerSubText">
                          {getHeaderData?.purchaseDocumentDate}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">PO Value: </span>
                        <span className="headerSubText">
                          {getHeaderData?.poValue}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Open Value: </span>
                        <span className="headerSubText">
                          {getHeaderData?.openValue}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Delivered Value: </span>
                        <span className="headerSubText">
                          {getHeaderData?.deliverdValue}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Delivered Status: </span>
                        <span className="headerSubText">
                          {getHeaderData?.deliveredStatus}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Invoiced Value: </span>
                        <span className="headerSubText">
                          {getHeaderData?.invoicedValue}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Invoiced Status: </span>
                        <span className="headerSubText">
                          {getHeaderData?.invoicedStatus}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Paid Value: </span>
                        <span className="headerSubText">
                          {getHeaderData?.paidValue}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Vendor No: </span>
                        <span className="headerSubText">
                          {getHeaderData?.vendorNumber}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Vendor Name: </span>
                        <span className="headerSubText">
                          {getHeaderData?.vendorName}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Currency: </span>
                        <span className="headerSubText">
                          {getHeaderData?.currency}
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
                        className={`bi ${isCardVisible2
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                          }`}
                        onClick={toggleCardVisibility2}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">LI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Line Items</span>
                      <span className="subHeaderTitle"> </span>
                    </Col>

                    {
                      userInfo?.roles?.length > 0 &&
                      (userInfo?.roles[0] === 'VENDOR' ? true : false) &&
                      <Col xs={4} md={1} lg={1} className="">
                        <button
                          className="btnTable"
                          onClick={() => handleButtonClick()}
                        >
                          <i className="bi bi-check-circle"></i> Acknowledge
                        </button>
                      </Col>
                    }

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

export default PurchaseOrderDetailedPage;
