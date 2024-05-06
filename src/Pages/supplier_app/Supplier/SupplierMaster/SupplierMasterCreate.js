/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";

//API
import ItemService from "../../../../services/supplier_appCommonService";

//Redux
import { useSelector, useDispatch } from "react-redux"; //useDispatch
import { getSupplierCategorySelection, getSupplierList } from "../../../../redux/feature/supplier_app/supplierSlice";
import { addCategorySelectedData } from "../../../../redux/feature/supplier_app/supplierSlice";

//Components
import Layout from "../../../../Layout/Layout";
import { InputField } from "../../../../Components/formElements/InputField";
import { ComboboxField } from "../../../../Components/formElements/ComboboxField";
import CategorySelectionModal from "../../../../Components/Modal/supplier_app/CategorySelectionModal";
import DataTable from "react-data-table-component";
import Constants from "../../../../common/Constants";


const SupplierMasterCreate = () => {
  const dispatch = useDispatch();
  localStorage.setItem("menu", "Supplier");
  localStorage.setItem("submenu", "List");
  let selectedCategoryData = useSelector((state) => state?.supplier?.selectedCategory); // User Details from Store
  // Format the price above to USD using the locale, style, and currency.
  // let USDollar = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCardVisible, setCardVisible] = useState(true);
  const [isCardVisible2, setCardVisible2] = useState(true);
  const [isCardVisible3, setCardVisible3] = useState(true);
  const [isCardVisible4, setCardVisible4] = useState(true);
  const [isCardVisible5, setCardVisible5] = useState(true);
  const [getAccessData, setAccessData] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [getSelectedData, setSelectedData] = useState([]);
  const [getDisabledRemove, setDisabledRemove] = useState(true);

  const toggleCardVisibility = () => {
    setCardVisible(!isCardVisible);
  };
  const toggleCardVisibility2 = () => {
    setCardVisible2(!isCardVisible2);
  };
  const toggleCardVisibility3 = () => {
    setCardVisible3(!isCardVisible3);
  };
  const toggleCardVisibility4 = () => {
    setCardVisible4(!isCardVisible4);
  };
  const toggleCardVisibility5 = () => {
    setCardVisible5(!isCardVisible5);
  };

  /* Modal Function */
  const categorySelection = () => {
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setFormInputs((formInputs) => ({ ...formInputs, [name]: value }));
    // console.log("onInputChange => formInputs", formInputs);
  };

  const [formInputs, setFormInputs] = useState({
    email: "",
    organisationName: "",
    version: "v0",
    status: "Not Invited",
    contactfirstName: "",
    contactlastName: "",
    contactNumber: "",
    roles: ["VENDOR"],
    category: ["VENDOR"],
    initiatedBy: "VENDOR",
    Initiator: "VENDOR",
    companyName: "",
    address: "",
    address2: "",
    city: "",
    state:"",
    country:"",
    cityPostalCode:"",
    ISOCertification: "",
    ICVCertificate: "",
    CompanyBrochure: "",
    purposeJustification: "",
    vendorCategory: [
      {
        categoryCode: "",
        subCategoryCode: "",
        vendorSubCategoryLongText: "",
        vendorCategoryText: ""
      }
    ],
  });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    dispatch(getSupplierCategorySelection()); // getSupplierCategorySelection store

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Datatables  
  const fetchUsers = async (page) => {
    setLoading(true);
    setData(selectedCategoryData);
    formInputs.vendorCategory = selectedCategoryData;
    setLoading(false);
  };


  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryData]);


  const columns = [

    {
      name: "Category",
      selector: (row) => row.vendorCategoryText || "--",
      sortable: true,
      width: "280px",
    },

    {
      name: "SubCategory",
      selector: (row) => row.vendorSubCategoryText || "--",
      sortable: true,
      width: "280px",
    },


    {
      name: "SubCategory Description",
      selector: (row) => row.vendorSubCategoryLongText || "--",
      sortable: true,
      width: "350px",
    },
    {
      name: "SubCategory Code",
      selector: (row) => row.vendorSubCategoryCode || "--",
      sortable: true,
      width: "250px",
    },

  ];

  const handleChange = ({ selectedRows }) => {
    let res = selectedCategoryData.filter(item => !selectedRows.some(obj => obj._id === item._id));
    setSelectedData(res);
    if (res.length === selectedRows.length || res.length === 0) {
      setDisabledRemove(false);
    } else {
      setDisabledRemove(true);
    }
  };

  const removeCategory = () => {
    dispatch(addCategorySelectedData(getSelectedData));
    setDisabledRemove(true);
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
    await ItemService.addSupplier(obj).then((item) => {
      console.log(">> item!", item);
      if (item?.status === 200) {
        toast.success(item?.message || "Deleted successfully", {
          duration: 3000,
          position: "top-right",
        });

        // Update response value in Redux Store
        dispatch(getSupplierList()); // event store
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
            <h2 className="mainTitle">Supplier Registration</h2>
            <p className="subText">Supplier Details</p>
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
                      <span className="iconLogo">BI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Basic Information</span>
                      <span className="subHeaderTitle">Basic Information</span>
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
                        <InputField
                          className="inputBox"
                          label="Supplier Name (as per the trade license)"
                          name="organisationName"
                          placeholder=""
                          value={formInputs.organisationName || ""}
                          onChange={onInputChange}
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
                          label=" Address Lines 1 / Street"
                          name="address"
                          placeholder=""
                          value={formInputs.address || ""}
                          onChange={onInputChange}
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
                          label="Address Line 2"
                          name="address2"
                          placeholder=""
                          value={formInputs.address2 || ""}
                          onChange={onInputChange}
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
                          label="City"
                          name="city"
                          placeholder=""
                          value={formInputs.city || ""}
                          onChange={onInputChange}
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
                          label="Country"
                          name="country"
                          placeholder=""
                          value={formInputs.country || ""}
                          onChange={onInputChange}
                        />
                      </Col>
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Country"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col> */}

                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="State / Emirate / Province (Region)"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col> */}
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="State"
                          name="state"
                          placeholder=""
                          value={formInputs.state || ""}
                          onChange={onInputChange}
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
                          label="Postal Code/PO Box"
                          name="cityPostalCode"
                          placeholder=""
                          value={formInputs.cityPostalCode || ""}
                          onChange={onInputChange}
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
                          label="Contact Title"
                          name="contactTitle"
                          placeholder=""
                          value={formInputs.contactTitle || ""}
                          onChange={onInputChange}
                        />
                      </Col>
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Contact Title"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col> */}
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Contact First Name"
                          name="contactfirstName"
                          placeholder=""
                          value={formInputs.contactfirstName || ""}
                          onChange={onInputChange}
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
                          label="Contact Last Name"
                          name="contactlastName"
                          placeholder=""
                          value={formInputs.contactlastName || ""}
                          onChange={onInputChange}
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
                          label="Contact Email"
                          name="email"
                          placeholder=""
                          value={formInputs.email || ""}
                          onChange={onInputChange}
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
                          label="Contact Number"
                          name="contactNumber"
                          placeholder=""
                          value={formInputs.contactNumber || ""}
                          onChange={onInputChange}
                        />
                      </Col>
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Contact Number"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col> */}
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
                      <span className="iconLogo">AI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">
                        Additional Information
                      </span>
                      <span className="subHeaderTitle">
                        Additional Information of Supplier
                      </span>
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
                  className={`accordion-collapse collapse show ${isCardVisible2 ? "visible" : ""
                    }`}
                >
                  <div className="accordion-body">
                    <Row className="pt-2 pb-4">
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Do you have ISO (9001, 14001, 45001) Certification?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.ISOCertification || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col> */}
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Do you have ISO (9001, 14001, 45001) Certification?"
                          name="ISOCertification"
                          placeholder=""
                          value={formInputs.ISOCertification || ""}
                          onChange={onInputChange}
                        />
                      </Col>
                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Purpose/Justification - please explain benefits Emirates Steel Arkan would get from registering your company"
                          name="firstName"
                          placeholder=""
                          value=""
                          onChange={onInputChange}
                          disabled={false}
                        />
                      </Col> */}

                      {/* <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label=" From the Suppliers ISO Certification, Please type in the box the specific commodity / service the company is certified for. *"
                          name="firstName"
                          placeholder=""
                          value={""}
                          onChange={onInputChange}
                          disabled={false}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Do you have a valid ICV Cert (UAE Suppliers only)"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setAccessData}
                        // className="dropdownOption"
                        />
                      </Col> */}
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Do you have a valid ICV Certification?"
                          name="ICVCertificate"
                          placeholder=""
                          value={formInputs.ICVCertificate || ""}
                          onChange={onInputChange}
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
                          label="Website and Company Brochure"
                          name="CompanyBrochure"
                          placeholder=""
                          value={formInputs.CompanyBrochure || ""}
                          onChange={onInputChange}
                          disabled={false}
                        />
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                          />
                        </div>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Purpose/Justification - Please explain benefits Our Company would get from registering your company?"
                          name="purposeJustification"
                          placeholder=""
                          value={formInputs.purposeJustification || ""}
                          onChange={onInputChange}
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
                        className={`bi ${isCardVisible3
                          ? "bi-chevron-right"
                          : "bi-chevron-down"
                          }`}
                        onClick={toggleCardVisibility3}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">CS</span>
                    </Col>
                    <Col xs={12} md={7} lg={7}>
                      <span className="headerTitle">Category Selection</span>
                      <span className="subHeaderTitle">
                        Select Required Category
                      </span>
                    </Col>
                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => categorySelection()}
                      >
                        <i className="bi bi-plus-lg"></i> Add Category
                      </button>
                    </Col>

                    <Col xs={4} md={1} lg={1} className="">
                      <button
                        className="btnTable"
                        onClick={() => removeCategory()}
                        disabled={getDisabledRemove}
                      >
                        <i className="bi bi-trash3"></i> Remove Category
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
                  className={`accordion-collapse collapse show ${isCardVisible3 ? "visible" : ""
                    }`}
                >
                  <div className="accordion-body">
                    <Row className="pt-2 pb-4">
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
                          onSelectedRowsChange={handleChange}
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

      <Row className="rowDirection">
        <Col xs={12} md={2} lg={2} className="">
          <button
            className="btnTable"
            onClick={handleSave}
            disabled={disabled}
          >
            <i className="bi bi-save"></i> Save
          </button>
        </Col>
      </Row>



      <CategorySelectionModal show={modalShow} onHide={() => hideModal()} />
    </main>
  );
};

export default SupplierMasterCreate;
