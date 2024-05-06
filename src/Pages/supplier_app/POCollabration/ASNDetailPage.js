/* eslint-disable no-unused-vars */
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

const ASNDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.setItem("menu", "Purchasing");
  localStorage.setItem("submenu", "Advanced Shipping Notice");


  let asn_data = useSelector(
    (state) => state?.purchasing?.asn?.data
  ); // User Details from Store

  let asnNumber = useSelector(
    (state) => state?.purchasing?.asn?.asnNumber
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
    if (asnNumber) {
      let filteredData = asn_data.filter(
        (item) => item.asnNumber === asnNumber
      );
      console.log(">> filteredData", filteredData);
      setHeaderData(filteredData[0]);
      let itemData = filteredData[0]?.items;

      setData(itemData);
      setLoading(false);
    } else {
      navigate(Constants.POCOLLABRATION_ASN);
    }
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
  }, [asnNumber,asn_data]);

  const columns = [
    {
      name: "ASN Item Number",
      selector: (row) => row.asnItem,
      sortable: true,
      width: "180px",
    },
    {
      name: "PO Number",
      selector: (row) => row.purchasingDocumentNr,
      sortable: true,
      width: "150px",
    },
    {
      name: "PO Item",
      selector: (row) => row.purchasingDocumentItem,
      sortable: true,
      width: "150px",
    },
     {
      name: "Schedule Number",
      selector: (row) => row.scheduleNr,
      sortable: true,
      width: "180px",
    },
    {
      name: "Material/Service",
      selector: (row) => row.materialCode,
      sortable: true,
      width: "180px",
    },

    {
      name: "Material Desc",
      selector: (row) => row.briefDescription,
      sortable: true,
      width: "180px",
    },   
 
    {
      name: "Order Quantity",
      selector: (row) => row.quantityInSalesUnit,
      sortable: true,
      width: "150px",
    },
   
    {
      name: "UOM",
      selector: (row) => row.orderUnit,
      sortable: true,
      width: "150px",
    },
   
   
    {
      name: "Plant",
      selector: (row) => row.businessLocation,
      sortable: true,
      width: "200px",
    },
    {
      name: "ShortageLocation",
      selector: (row) => row.storagePlace,
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
    // const handleButtonClick = async () => {

  
    //   await ItemService.AcknowledgePO(getHeaderData).then((item) => {
    //     if (item?.status === 200) {
    //       console.log("PO Acknowledged successfully");
    //       toast.success(item?.message || "PO Acknowledged successfully", {
    //         duration: 3000,
    //         position: "top-right",
    //       });
  
    //       dispatch(getPurchaseOrder());   
    //       // Update response value after calling the API and Update in Redux Store
    //       //dispatch(addLocation())
    //       // dispatch(getLocationData(compIdObj));
    //     } else {
    //       console.log("PO Acknowledged Not successfully");

    //       toast.error(item?.message || "Please try again !!", {
    //         duration: 4000,
    //         position: "top-right",
    //       });
    //     }
    //   });



    // Call your API function here and pass listData to it
    // For example:
    // apiFunction(listData);
    // };

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">
              ASN Details : {asnNumber}
            </h2>
            <p className="subText">ASN Information </p>
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
                        <span className="headerText">ASN No: </span>
                        <span className="headerSubText">
                          {getHeaderData?.asnNumber}
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
                          {getHeaderData?.statusHdr}
                        </span>
                      </Col>
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
                        <span className="headerText">Net wt: </span>
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
                        <span className="headerText">Challan No: </span>
                        <span className="headerSubText">
                          {getHeaderData?.challanNo}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Challan Date: </span>
                        <span className="headerSubText">
                          {getHeaderData?.challanDate}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Disp Date: </span>
                        <span className="headerSubText">
                          {getHeaderData?.despatchDate}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Truck No: </span>
                        <span className="headerSubText">
                          {getHeaderData?.vehicleNumber}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Exp Del Date: </span>
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
                        <span className="headerText">Eway Bill No: </span>
                        <span className="headerSubText">
                          {getHeaderData?.eWayBillNo}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Eway Bill Val: </span>
                        <span className="headerSubText">
                          {getHeaderData?.eWayBillValue}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Trnsp / Courier: </span>
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
                          {getHeaderData?.organisationName}
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
                          {getHeaderData?.userId}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Lr No: </span>
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
                        <span className="headerText">Lr Date: </span>
                        <span className="headerSubText">
                          {getHeaderData?.currency}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Ldg Place: </span>
                        <span className="headerSubText">
                          {getHeaderData?.currency}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Del Place: </span>
                        <span className="headerSubText">
                          {getHeaderData?.currency}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Shipment Type: </span>
                        <span className="headerSubText">
                          {getHeaderData?.shippingType}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Invoice Number: </span>
                        <span className="headerSubText">
                          {getHeaderData?.currency}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Invoice Date: </span>
                        <span className="headerSubText">
                          {getHeaderData?.currency}
                        </span>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <span className="headerText">Barcode: </span>
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
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Line Items</span>
                      <span className="subHeaderTitle"> </span>
                    </Col>
{/* 
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => handleButtonClick()}
                      >
                        <i className="bi bi-check-circle"></i> Acknowledge
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

export default ASNDetailPage;
