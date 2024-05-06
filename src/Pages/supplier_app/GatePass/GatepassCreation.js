/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";

//API
import ItemService from "../../../services/supplier_appCommonService";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getGatepassList } from "../../../redux/feature/supplier_app/gatepassSlice";

//Components
import Layout from "../../../Layout/Layout";
import { InputField } from "../../../Components/formElements/InputField";
import { ComboboxField } from "../../../Components/formElements/ComboboxField";
import Constants from "../../../common/Constants";

const GatepassList = () => {
  const dispatch = useDispatch();
  localStorage.setItem("menu", "Gatepass");
  localStorage.setItem("submenu", "Create Gatepass");

  let asn_data = useSelector((state) => state?.purchasing?.asn?.data); // User Details from Store

  // Format the price above to USD using the locale, style, and currency.
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [isCardVisible, setCardVisible] = useState(true);
  const [isCardVisible2, setCardVisible2] = useState(true);
  const [getAccessData, setAccessData] = useState("");

  const [getASNNumberData, setASNNumberData] = useState("");
  const [getSelectedASN, setSelectedASN] = useState("");
  const [getASNItemData, setASNItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formInputs, setFormInputs] = useState({
    vendorInvoiceNo: "",
    vendorInvoiceDate: "",
    vendorCode: "",
    vehicleNumber: "",
    items: [],
  });
  const [disabled, setDisabled] = useState(false);

  // Load ASN Data to Dropdown
  useEffect(() => {
    let asnData = [];
    if (asn_data.length > 0) {
      asn_data?.map((item, index) =>
        asnData.push({
          id: index + 1,
          name: item.asnNumber,
        })
      );
      setASNNumberData(asnData);
    }
  }, [asn_data]);

  //Selected ASN
  useEffect(() => {
    // console.log(">>Selected ASN ", getSelectedASN);
    setLoading(true);
    let filteredData = asn_data.filter(
      (item) => item.asnNumber === getSelectedASN.name
    );
    // console.log(">> ", filteredData);
    let loadItemData = filteredData[0]?.items;
    setASNItemData(loadItemData);
    setLoading(false);
    setFormInputs(filteredData[0]);


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSelectedASN]);

  const columnsItem = [

    {
      name: "ASN Item",
      selector: (row) => row.asnItem,
      sortable: true,
      width: "180px",
    },
    {
      name: "PO Number",
      cell: (row) => (
        <button
          className="btnInfo"
          onClick={() => detailedPage(row.purchasingDocumentNr)}
        >
          {row.purchasingDocumentNr}{" "}
        </button>
      ),
      width: "150px",
    },
    {
      name: "PO Item",
      selector: (row) => row.purchasingDocumentItem,
      sortable: true,
      width: "180px",
    },

    {
      name: "Material",
      selector: (row) => row.materialCode,
      sortable: true,
      width: "180px",
    },
    {
      name: "Description",
      selector: (row) => row.briefDescription,
      sortable: true,
      width: "180px",
    },
    {
      name: "Order Quantity",
      selector: (row) => row.quantityInSalesUnit,
      sortable: true,
      width: "180px",
    },
    {
      name: "Order Unit",
      selector: (row) => row.orderUnit,
      sortable: true,
      width: "180px",
    },


  ];

  // Sample Data
  let dropdownOption = [
    {
      id: "1",
      name: "Sample Data 1",
    },
    {
      id: "2",
      name: "Sample Data 2",
    },
  ];

  const toggleCardVisibility = () => {
    setCardVisible(!isCardVisible);
  };
  const toggleCardVisibility2 = () => {
    setCardVisible2(!isCardVisible2);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setFormInputs((formInputs) => ({ ...formInputs, [name]: value }));
    // console.log("onInputChange => formInputs", formInputs);
  };

  // SAVE
  const handleSave = async () => {
    console.log(">> handleSave", formInputs);

    const toastId = toast.loading("Loading...", {
      position: "top-right",
    });
    let obj = {
      data: formInputs
    };
    setDisabled(true);
    await ItemService.getGatepassCreate(obj).then((item) => {
      console.log(">> item!", item);
      if (item?.status === 200) {
        toast.success(item?.message, {
          duration: 3000,
          position: "top-right",
        });

        // Update response value in Redux Store
        dispatch(getGatepassList()); // event store
      } else {
        toast.error(item?.message || "Please try again !!", {
          duration: 4000,
          position: "top-right",
        });
      }
    });
    toast.dismiss(toastId);
    setDisabled(false);
  };

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Gatepass Createion</h2>
            <p className="subText">Gatepass Createion Details</p>
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
                      <span className="iconLogo">GP</span>
                    </Col>
                    <Col xs={6} md={8} lg={8}>
                      <span className="headerTitle">Gatepass Creation</span>
                      <span className="subHeaderTitle">Header Information</span>
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

                    {/* <Col xs={4} md={2} lg={2} className="">
                      <button className="btnTable" onClick={() => createRFQ()}>
                        <i className="bi bi-plus-lg"></i> Create Manual RFQ
                      </button>
                    </Col>

                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-copy"></i> Copy RFQ
                      </button>
                    </Col>
                    */}

                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={handleSave}
                        disabled={disabled}
                      >
                        <i className="bi bi-plus-lg"></i> Create
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
                        <ComboboxField
                          label="ASN Number"
                          placeholder=""
                          data={getASNNumberData}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={getSelectedASN || ""}
                          getvalue={setSelectedASN}
                        // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Shipping Mode"
                          name="shippingMode"
                          placeholder=""
                          value={formInputs?.shippingMode || ""}
                          // onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Vendor Name"
                          name="organisationName"
                          placeholder=""
                          value={formInputs?.organisationName || ""}
                          // onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Invoice Number"
                          name="vendorInvoiceNo"
                          placeholder=""
                          value={formInputs?.vendorInvoiceNo || ""}
                          // onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Invoice Date"
                          name="vendorInvoiceDate"
                          placeholder=""
                          value={formInputs?.vendorInvoiceDate || ""}
                          // onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Invoice Amount"
                          name="vendorInvoiceAmount"
                          placeholder=""
                          value={formInputs?.vendorInvoiceAmount || ""}
                          // onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Invoice Currency"
                          name="vendorInvoiceCurrency"
                          placeholder=""
                          value={formInputs?.vendorInvoiceCurrency || ""}
                          // onChange={onInputChange}
                          disabled={true}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Vechicle In Date"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs?.rfqCategory || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Vechicle In Time"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs?.rfqCategory || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Vechicle Out Time"
                          placeholder=""
                          data={dropdownOption}
                          id="vehicleInOuttime"
                          iconClassName="dropdownIcon"
                          name="vehicleInOuttime"
                          setValue={formInputs?.vehicleInOuttime || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Driver Name"
                          placeholder=""
                          data={dropdownOption}
                          id="driverName"
                          iconClassName="dropdownIcon"
                          name="driverName"
                          setValue={formInputs?.driverName || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Driver Mobile Number"
                          placeholder=""
                          data={dropdownOption}
                          id="driverMobNr"
                          iconClassName="dropdownIcon"
                          name="driverMobNr"
                          setValue={formInputs?.driverMobNr || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
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
                      <span className="iconLogo">GP</span>
                    </Col>
                    <Col xs={6} md={8} lg={8}>
                      <span className="headerTitle">Gatepass Item</span>
                      <span className="subHeaderTitle">Item Information</span>
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

                    {/* <Col xs={4} md={2} lg={2} className="">
                      <button className="btnTable" onClick={() => createRFQ()}>
                        <i className="bi bi-plus-lg"></i> Create Manual RFQ
                      </button>
                    </Col>

                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => {
                          alert("asd");
                        }}
                      >
                        <i className="bi bi-copy"></i> Copy RFQ
                      </button>
                    </Col>
                    */}
                  </Row>
                </h2>

                <div
                  className={`accordion-collapse collapse show ${isCardVisible2 ? "visible" : ""
                    }`}
                >
                  <div className="accordion-body">
                    {/* Add Item Table*/}
                    <Row>
                      <Col xs={12} md={12} lg={12}>
                        <DataTable
                          title=""
                          columns={columnsItem}
                          data={getASNItemData}
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
    </main>
  );
};

export default GatepassList;
