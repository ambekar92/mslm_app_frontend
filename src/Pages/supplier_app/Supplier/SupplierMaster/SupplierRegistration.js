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
import {
  getSupplierCategorySelection,
  getSupplierList,
} from "../../../../redux/feature/supplier_app/supplierSlice";
import { addCategorySelectedData } from "../../../../redux/feature/supplier_app/supplierSlice";

//Components
import Layout from "../../../../Layout/Layout";
import { InputField } from "../../../../Components/formElements/InputField";
import { ComboboxField } from "../../../../Components/formElements/ComboboxField";
import CategorySelectionModal from "../../../../Components/Modal/supplier_app/CategorySelectionModal";
import DataTable from "react-data-table-component";
import Constants from "../../../../common/Constants";

const SupplierRegistration = () => {
  const dispatch = useDispatch();
  localStorage.setItem("menu", "Supplier");
  localStorage.setItem("submenu", "Supplier Registration");
  let selectedCategoryData = useSelector(
    (state) => state?.supplier?.selectedCategory
  ); // User Details from Store
  let userInfo = useSelector((state) => state?.user?.data); // User Details from Store

  // Format the price above to USD using the locale, style, and currency.
  // let USDollar = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  let dropdownOption = [
    {
      id: "1",
      name: "Yes",
    },
    {
      id: "2",
      name: "No",
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCardVisible, setCardVisible] = useState(true);
  const [isCardVisible2, setCardVisible2] = useState(true);
  const [isCardVisible3, setCardVisible3] = useState(true);
  const [isCardVisible4, setCardVisible4] = useState(true);
  const [isCardVisible5, setCardVisible5] = useState(true);
  const [isCardVisible6, setCardVisible6] = useState(true);
  const [isCardVisible7, setCardVisible7] = useState(true);
  const [isCardVisible8, setCardVisible8] = useState(true);
  const [isCardVisible9, setCardVisible9] = useState(true);
  const [isCardVisible10, setCardVisible10] = useState(true);
  const [isCardVisible11, setCardVisible11] = useState(true);
  const [isCardVisible12, setCardVisible12] = useState(true);
  const [isCardVisible13, setCardVisible13] = useState(true);
  const [isCardVisible14, setCardVisible14] = useState(true);
  const [isCardVisible15, setCardVisible15] = useState(true);
  const [isCardVisible16, setCardVisible16] = useState(true);

  const [getDropdownData, setDropdownData] = useState("");
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
  const toggleCardVisibility6 = () => {
    setCardVisible6(!isCardVisible6);
  };
  const toggleCardVisibility7 = () => {
    setCardVisible7(!isCardVisible7);
  };
  const toggleCardVisibility8 = () => {
    setCardVisible8(!isCardVisible8);
  };
  const toggleCardVisibility9 = () => {
    setCardVisible9(!isCardVisible9);
  };
  const toggleCardVisibility10 = () => {
    setCardVisible10(!isCardVisible10);
  };
  const toggleCardVisibility11 = () => {
    setCardVisible11(!isCardVisible11);
  };
  const toggleCardVisibility12 = () => {
    setCardVisible12(!isCardVisible12);
  };
  const toggleCardVisibility13 = () => {
    setCardVisible13(!isCardVisible13);
  };
  const toggleCardVisibility14 = () => {
    setCardVisible14(!isCardVisible14);
  };
  const toggleCardVisibility15 = () => {
    setCardVisible15(!isCardVisible15);
  };
  const toggleCardVisibility16 = () => {
    setCardVisible16(!isCardVisible16);
  };
  /* Modal Function */
  const categorySelection = () => {
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
  };

  const [formInputs, setFormInputs] = useState({
    organisationName: "",
    companyName: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: ["VENDOR"],
    category: ["VENDOR"],
    address: "",
    address2: "",
    city: "",
    countryCode: "",
    country: "",
    stateRegion: "",
    regionCode: "",
    cityPostalCode: "",
    contactTitle: "",
    contactNumber: "",
    contactfirstName: "",
    contactlastName: "",
    contactEmail: "",
    contactPhoneNr: "",
    contactPosition: "",
    humanRightsIssue: {
      HarassmentPolicy: "",
      ChildLabourPolicy: "",
      ForcedLabourPolicy: "",
      WorkingHoursPolicy: "",
      DiscriminationAtWorkPolicy: "",
      FreedomOfAssociationPolicy: "",
      CommuncationFullyUnderstood: "",
      ConflictMineralsIndigenousPeople: "",
    },
    financialDetails: {
      turnover1: "",
      turnover2: "",
    },
    categorySpecificInformation: {},
    bankDetails: [
      {
        bankNotListed: "",
        bankAccountNumber: "",
        bankKey: "",
        bankName: "",
        bankCountry: "",
        bankAddress: "",
        iban: "",
        AccountHolderName: "",
        bankCompanyletterhead: "",
        bankConfirmationLetter: "",
        chipsCode: "",
        swiftIfscCode: "",
        bankInfoTemplate: "",
        preferredCurrency: "",
      },
    ],
  });

  const [disabled, setDisabled] = useState(false);
  const [getDisabledStatus, setDisabledStatus] = useState(false);
  const [forms, setForms] = useState([]);

  const addForm = () => {
    setForms([...forms, {}]); // Add an empty object to the forms array
  };

  const removeForm = (indexToRemove) => {
    setForms(forms.filter((form, index) => index !== indexToRemove));
  };

  // On Change of the input
  const onInputChange = ({ target: { name, value } }) => {
    setFormInputs((formInputs) => ({ ...formInputs, [name]: value }));
    // console.log("onInputChange => formInputs", formInputs);
  };

  // Get Dropdown data select
  useEffect(() => {
    // console.log(">> data ss", getDropdownData);
    if (getDropdownData?.name) {
      setFormInputs((formInputs) => ({
        ...formInputs,
        [getDropdownData?.textField]: getDropdownData?.name,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDropdownData]);

  // MODIFY
  const handleModify = async () => {
    setDisabledStatus(false);
  };

  // SAVE
  const handleSave = async () => {
    console.log(">> handleSave", formInputs);

    const toastId = toast.loading("Loading...", {
      position: "top-right",
    });
    let obj = {
      data: formInputs,
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

  useEffect(() => {
    dispatch(getSupplierCategorySelection()); // getSupplierCategorySelection store

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userInfo?.roles?.length > 0) {
      if (userInfo?.roles[0] === "VENDOR") {
        setDisabledStatus(true);
        setFormInputs(userInfo);
        setData(userInfo?.vendorCategory);
      } else {
        setDisabledStatus(false);
        setData([]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // Datatables
  const fetchUsers = async (page) => {
    setLoading(true);
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);
    setData(selectedCategoryData);
    // setTotalRows(selectedCategoryData?.length);
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
    let res = selectedCategoryData.filter(
      (item) => !selectedRows.some((obj) => obj._id === item._id)
    );
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

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner PageCommonCSS">
            <h2 className="mainTitle">Supplier Registration</h2>
            <p className="subText">Supplier Details</p>
            <hr />
            {/* 01 */}
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
                      <span className="iconLogo">BI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Basic Information</span>
                      <span className="subHeaderTitle">
                        Supplier Basic Information
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
                        <InputField
                          className="inputBox"
                          label="Supplier Name"
                          name="organisationName"
                          extraLabel="As per the Trade license"
                          placeholder=""
                          value={formInputs.organisationName || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          label="Status  "
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          label=" Block Reason"
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          label="SAP ID"
                          name="firstName"
                          extraLabel="SAP Vendor ID"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          label="Initiator"
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          label="Initiator By"
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          label="Initiator Name"
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 02 */}
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
                      <span className="iconLogo">GI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">General Information</span>
                      <span className="subHeaderTitle">
                        Supplier General Information
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible2 ? "visible" : ""
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
                          label=" Name of Company Owner as on license "
                          extraLabel="Name of Company Owner as on license"
                          name="firstName"
                          placeholder=""
                          value=""
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
                        <InputField
                          className="inputBox"
                          label="Upload Company Logo"
                          name="firstName"
                          placeholder=""
                          value={""}
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
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Website and Company Brochure"
                          name="firstName"
                          placeholder=""
                          value={""}
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
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 03 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible3
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility3}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">CA</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Company Address</span>
                      <span className="subHeaderTitle">
                        Address of the Company
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible3 ? "visible" : ""
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
                          label=" Address Lines 1 / Street"
                          name="address"
                          placeholder=""
                          value={formInputs.address || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          disabled={getDisabledStatus}
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
                          disabled={getDisabledStatus}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Country"
                          placeholder=""
                          data={dropdownOption}
                          id="country"
                          iconClassName="dropdownIcon"
                          name="country"
                          setValue={formInputs.country || ""}
                          getvalue={setDropdownData}
                          disabled={getDisabledStatus}
                        />
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="State / Emirate / Province (Region)"
                          placeholder=""
                          data={dropdownOption}
                          id="state"
                          iconClassName="dropdownIcon"
                          name="state"
                          setValue={formInputs.state || ""}
                          getvalue={setDropdownData}
                          disabled={getDisabledStatus}
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
                          label="Postal Code/PO Box"
                          name="cityPostalCode"
                          placeholder=""
                          value={formInputs.cityPostalCode || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          label="Supplier Name (as per the trade license)"
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
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
                          label="SAP Supplier Name (as per the trade license)"
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
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
                          label="Version "
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
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
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
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
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
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
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                        />
                      </Col>

                      <Col
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
                          getvalue={setDropdownData}
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
                          label="State / Emirate / Province (Region)"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Postal Code/PO Box"
                          name="firstName"
                          placeholder=""
                          value={formInputs.firstName || ""}
                          onChange={onInputChange}
                        />
                      </Col> */}
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 04 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible4
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility4}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">CP</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Contact Person</span>
                      <span className="subHeaderTitle">
                        Contact Person Details
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible4 ? "visible" : ""
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
                          label="Job Title"
                          placeholder=""
                          data={dropdownOption}
                          id="contactTitle"
                          iconClassName="dropdownIcon"
                          name="contactTitle"
                          setValue={formInputs.contactTitle || ""}
                          getvalue={setDropdownData}
                          disabled={getDisabledStatus}
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
                          label="Contact Title"
                          placeholder=""
                          data={dropdownOption}
                          id="contactTitle"
                          iconClassName="dropdownIcon"
                          name="contactTitle"
                          setValue={formInputs.contactTitle || ""}
                          getvalue={setDropdownData}
                          disabled={getDisabledStatus}
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
                          label="Contact First Name"
                          name="contactfirstName"
                          placeholder=""
                          value={formInputs.contactfirstName || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
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
                          disabled={getDisabledStatus}
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
                          name="contactEmail"
                          placeholder=""
                          value={formInputs.contactEmail || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Contact Number"
                          placeholder=""
                          data={dropdownOption}
                          id="contactPhoneNr"
                          iconClassName="dropdownIcon"
                          name="contactPhoneNr"
                          setValue={formInputs.contactPhoneNr || ""}
                          getvalue={setDropdownData}
                          disabled={getDisabledStatus}
                          // className="dropdownOption"
                        />
                      </Col>{" "}
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <InputField
                          className="inputBox"
                          label="Additional User ID"
                          name="contactEmail"
                          placeholder=""
                          value={formInputs.contactEmail || ""}
                          onChange={onInputChange}
                          disabled={getDisabledStatus}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 05 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible5
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility5}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">CD</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">
                        Commodity / Service Details
                      </span>
                      <span className="subHeaderTitle">
                        Commodity and Service Description
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible5 ? "visible" : ""
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
                          label="Commodity / services offered"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 06 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible6
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility6}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">CS</span>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <span className="headerTitle">Category Selection</span>
                      <span className="subHeaderTitle">
                        Select Required Category
                      </span>
                    </Col>
                    <Col xs={4} md={2} lg={2} className="">
                      <button
                        className="btnTable"
                        onClick={() => categorySelection()}
                      >
                        <i className="bi bi-plus-lg"></i> Add Category
                      </button>
                    </Col>

                    <Col xs={4} md={2} lg={2} className="">
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible6 ? "visible" : ""
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
            {/* 07 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible7
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility7}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">AI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">
                        AE Country Specific Information
                      </span>
                      <span className="subHeaderTitle">
                        AE Country Specific Information
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible7 ? "visible" : ""
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
                          label="Does your Company have a In Country Value (ICV) Certificate?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label=" Name of Owner"
                          name="firstName"
                          placeholder=""
                          value=""
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
                        <InputField
                          className="inputBox"
                          label="ICV score % and Certificate "
                          name="firstName"
                          placeholder=""
                          value={""}
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
                        <ComboboxField
                          label="ICV Expiration Date"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="VAT Registration Number Certificate "
                          name="firstName"
                          placeholder=""
                          value={""}
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
                        <ComboboxField
                          label="VAT Registration Expiration Date"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Trade License Number and Certificate "
                          name="firstName"
                          placeholder=""
                          value={""}
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
                        <ComboboxField
                          label="Trade License Expiry Date"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label=" is company FreeZone Listed?"
                          name="firstName"
                          placeholder=""
                          value=""
                          onChange={onInputChange}
                          disabled={false}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 08 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible8
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility8}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">BK</span>
                    </Col>
                    <Col xs={12} md={8} lg={8}>
                      <span className="headerTitle">Bank Information</span>
                      <span className="subHeaderTitle">
                        Bank Information (Please add all your Bank Accounts)
                      </span>
                    </Col>
                    <Col xs={4} md={2} lg={2} className="">
                      <button className="btnTable" onClick={() => addForm()}>
                        <i className="bi bi-plus-lg"></i> Add Bank Info
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible8 ? "visible" : ""
                  }`}
                >
                  <div className="accordion-body">
                    <Row className="pt-2 pb-4">
                      <Col
                        xs={12}
                        md={12}
                        lg={12}
                        className="commTopButtonRightLeftPadding"
                      >
                        <h4>Bank Information Section 1</h4>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        lg={4}
                        className="commTopButtonRightLeftPadding"
                      >
                        <ComboboxField
                          label="Is the Company bank included on list?"
                          placeholder=""
                          data={dropdownOption}
                          id="bankNotListed"
                          iconClassName="dropdownIcon"
                          name="bankNotListed"
                          setValue={formInputs.bankNotListed || ""}
                          getvalue={setDropdownData}
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
                          label="Bank A/C Number"
                          placeholder=""
                          data={dropdownOption}
                          id="bankAccountNumber"
                          iconClassName="dropdownIcon"
                          name="bankAccountNumber"
                          setValue={formInputs.bankAccountNumber || ""}
                          getvalue={setDropdownData}
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
                          label="BankID"
                          placeholder=""
                          data={dropdownOption}
                          id="bankKey"
                          iconClassName="dropdownIcon"
                          name="bankKey"
                          setValue={formInputs.bankKey || ""}
                          getvalue={setDropdownData}
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
                          label="Bank Name"
                          placeholder=""
                          data={dropdownOption}
                          id="bankName"
                          iconClassName="dropdownIcon"
                          name="bankName"
                          setValue={formInputs.bankName || ""}
                          getvalue={setDropdownData}
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
                          label="Bank Country"
                          placeholder=""
                          data={dropdownOption}
                          id="bankCountry"
                          iconClassName="dropdownIcon"
                          name="bankCountry"
                          setValue={formInputs.bankCountry || ""}
                          getvalue={setDropdownData}
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
                          label="Branch Address"
                          placeholder=""
                          data={dropdownOption}
                          id="bankAddress"
                          iconClassName="dropdownIcon"
                          name="bankAddress"
                          setValue={formInputs.bankAddress || ""}
                          getvalue={setDropdownData}
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
                          label="IBAN"
                          placeholder=""
                          data={dropdownOption}
                          id="iban"
                          iconClassName="dropdownIcon"
                          name="iban"
                          setValue={formInputs.iban || ""}
                          getvalue={setDropdownData}
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
                          label="Name of Beneficiary"
                          placeholder=""
                          extraLabel="Name of Beneficiary (Bank Account Holder Name) as per company /trade license"
                          data={dropdownOption}
                          id="AccountHolderName"
                          iconClassName="dropdownIcon"
                          name="AccountHolderName"
                          setValue={formInputs.AccountHolderName || ""}
                          getvalue={setDropdownData}
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
                          label="Preferred Currency"
                          placeholder=""
                          data={dropdownOption}
                          id="preferredCurrency"
                          iconClassName="dropdownIcon"
                          name="preferredCurrency"
                          setValue={formInputs.preferredCurrency || ""}
                          getvalue={setDropdownData}
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
                          label="Swift IFSC Code"
                          placeholder=""
                          data={dropdownOption}
                          id="swiftIfscCode"
                          iconClassName="dropdownIcon"
                          name="swiftIfscCode"
                          setValue={formInputs.swiftIfscCode || ""}
                          getvalue={setDropdownData}
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
                          label="Company letterhead"
                          extraLabel="Upload the filled template on company letterhead , signed by authorized person with company seal "
                          name="bankCompanyletterhead"
                          placeholder=""
                          value={""}
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
                          label="Confirmation letter"
                          extraLabel="Do you have a Confirmation letter from the bank( mandatory for bank updates ) "
                          name="bankConfirmationLetter"
                          placeholder=""
                          value={""}
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
                          label="Correspondence Bank Details"
                          extraLabel="Correspondence Bank Details /Chips code/ ACH/ EFT/ ABA/ FED "
                          name="chipsCode"
                          placeholder=""
                          value={""}
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
                    </Row>

                    {/* To Load Dynamic Bank Info Form */}
                    {forms &&
                      forms?.map((item, index) => (
                        <div key={index}>
                          <Row className="pt-2 pb-4">
                            <Col
                              xs={12}
                              md={12}
                              lg={12}
                              className="commTopButtonRightLeftPadding"
                            >
                              <hr />
                              <h5>Bank Information Section {index + 2}</h5>
                              <span
                                className="deleteIconAccordion"
                                onClick={() => removeForm(index)}
                              >
                                {" "}
                                <i className="bi bi-x-circle"></i>{" "}
                              </span>
                            </Col>
                            <Col
                              xs={12}
                              md={4}
                              lg={4}
                              className="commTopButtonRightLeftPadding"
                            >
                              <ComboboxField
                                label="Is the Company bank included on list?"
                                placeholder=""
                                data={dropdownOption}
                                id="bankNotListed"
                                iconClassName="dropdownIcon"
                                name="bankNotListed"
                                setValue={formInputs.bankNotListed || ""}
                                getvalue={setDropdownData}
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
                                label="Bank A/C Number"
                                placeholder=""
                                data={dropdownOption}
                                id="bankAccountNumber"
                                iconClassName="dropdownIcon"
                                name="bankAccountNumber"
                                setValue={formInputs.bankAccountNumber || ""}
                                getvalue={setDropdownData}
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
                                label="BankID"
                                placeholder=""
                                data={dropdownOption}
                                id="bankKey"
                                iconClassName="dropdownIcon"
                                name="bankKey"
                                setValue={formInputs.bankKey || ""}
                                getvalue={setDropdownData}
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
                                label="Bank Name"
                                placeholder=""
                                data={dropdownOption}
                                id="bankName"
                                iconClassName="dropdownIcon"
                                name="bankName"
                                setValue={formInputs.bankName || ""}
                                getvalue={setDropdownData}
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
                                label="Bank Country"
                                placeholder=""
                                data={dropdownOption}
                                id="bankCountry"
                                iconClassName="dropdownIcon"
                                name="bankCountry"
                                setValue={formInputs.bankCountry || ""}
                                getvalue={setDropdownData}
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
                                label="Branch Address"
                                placeholder=""
                                data={dropdownOption}
                                id="bankAddress"
                                iconClassName="dropdownIcon"
                                name="bankAddress"
                                setValue={formInputs.bankAddress || ""}
                                getvalue={setDropdownData}
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
                                label="IBAN"
                                placeholder=""
                                data={dropdownOption}
                                id="iban"
                                iconClassName="dropdownIcon"
                                name="iban"
                                setValue={formInputs.iban || ""}
                                getvalue={setDropdownData}
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
                                label="Name of Beneficiary"
                                placeholder=""
                                extraLabel="Name of Beneficiary (Bank Account Holder Name) as per company /trade license"
                                data={dropdownOption}
                                id="AccountHolderName"
                                iconClassName="dropdownIcon"
                                name="AccountHolderName"
                                setValue={formInputs.AccountHolderName || ""}
                                getvalue={setDropdownData}
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
                                label="Preferred Currency"
                                placeholder=""
                                data={dropdownOption}
                                id="preferredCurrency"
                                iconClassName="dropdownIcon"
                                name="preferredCurrency"
                                setValue={formInputs.preferredCurrency || ""}
                                getvalue={setDropdownData}
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
                                label="Swift IFSC Code"
                                placeholder=""
                                data={dropdownOption}
                                id="swiftIfscCode"
                                iconClassName="dropdownIcon"
                                name="swiftIfscCode"
                                setValue={formInputs.swiftIfscCode || ""}
                                getvalue={setDropdownData}
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
                                label="Company letterhead"
                                extraLabel="Upload the filled template on company letterhead , signed by authorized person with company seal "
                                name="bankCompanyletterhead"
                                placeholder=""
                                value={""}
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
                                label="Confirmation letter"
                                extraLabel="Do you have a Confirmation letter from the bank( mandatory for bank updates ) "
                                name="bankConfirmationLetter"
                                placeholder=""
                                value={""}
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
                                label="Correspondence Bank Details"
                                extraLabel="Correspondence Bank Details /Chips code/ ACH/ EFT/ ABA/ FED "
                                name="chipsCode"
                                placeholder=""
                                value={""}
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
                          </Row>
                        </div>
                        // <AddBankInfo
                        //   key={index}
                        //   formIndex={index}
                        // />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {/* 09 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible9
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility9}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">FI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Financial Information</span>
                      <span className="subHeaderTitle">
                        Please provide your company's turnover for the last 2
                        years, supported by documentary evidence
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible9 ? "visible" : ""
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
                          label="Financial Year"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Year 1 - Turnover  "
                          extraLabel="Year 1 - Company turnover supported by documentary evidence"
                          name="turnover1"
                          placeholder=""
                          value={""}
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
                          label="Year 2 - Turnover "
                          extraLabel="Year 2 - Company turnover supported by documentary evidence"
                          name="turnover2"
                          placeholder=""
                          value={""}
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
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 10 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible10
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility10}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">CD</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">
                        Company Documents & Certificates
                      </span>
                      <span className="subHeaderTitle">
                        Company Documents & Certificates
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible10 ? "visible" : ""
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
                          label="Overseas Tax Registration Number "
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Issuing Authority / Accreditation Body for Overseas suppliers "
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
                        <InputField
                          className="inputBox"
                          label="Chamber Incorporation Certificate Copy"
                          name="firstName"
                          placeholder=""
                          value={""}
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
                          label="Chamber Incorporation Expiry Date "
                          name="firstName"
                          placeholder=""
                          value={""}
                          onChange={onInputChange}
                          disabled={false}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 11 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible11
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility11}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">BM</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">
                        Business Continuity Management
                      </span>
                      <span className="subHeaderTitle">
                        Business Continuity Management
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible11 ? "visible" : ""
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
                          label="Does your Company have a Business Continuity Management (BCM) Plan / Policy"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
                        />
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 12 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible12
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility12}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">BI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">
                        Business & Brand Information
                      </span>
                      <span className="subHeaderTitle">
                        Category Specific Information
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible12 ? "visible" : ""
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
                          label="Dealership Set-up Type"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="MRO commodity / category for the selected brand "
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Brand Name"
                          name="firstName"
                          placeholder=""
                          value={""}
                          onChange={onInputChange}
                          disabled={false}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 13 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible13
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility13}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">CI</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">
                        Category Specific Information
                      </span>
                      <span className="subHeaderTitle">
                        Category Specific Information
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible13 ? "visible" : ""
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
                          label="Do you have ISO 17025 certificate?"
                          placeholder=""
                          data={dropdownOption}
                          id="havingIso17025"
                          iconClassName="dropdownIcon"
                          name="havingIso17025"
                          setValue={formInputs.havingIso17025 || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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
                        <ComboboxField
                          label="Do you have qualified safety officer?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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
                        <ComboboxField
                          label="Do you have ISO 45001 certificate?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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
                        <ComboboxField
                          label="Do you have ISO 9001 certificate?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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
                        <ComboboxField
                          label="Do you have ISO 14001 certificate?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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
                        <ComboboxField
                          label="Do you have Power of Attorney Certificate?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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
                        <ComboboxField
                          label="Do you have a company HSE Management System manual?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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
                        <ComboboxField
                          label="Do you have a procedure for HSE Auditing and Inspection?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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
                        <ComboboxField
                          label="Does your organization have a skills and competency training/development system in place (Technical and HSE)?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
                        />
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 14 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible14
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility14}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">RS</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Responsible Sourcing</span>
                      <span className="subHeaderTitle">
                        Category Specific Information
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible14 ? "visible" : ""
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
                          label="Do you stay up to date with local laws / regulations and any changes to ensure that your supply chain is compliant with environmental and ethical laws?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Do you have a written Business Ethics or business integrity policy/ procedure or Code of Conduct in place?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Do you have a written policy/procedure on prohibiting bribery, corruption and fraud within your business?"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Do you have a written procedure to assess and address risk across your supply chain? "
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label=" Are you involved in projects or efforts to improve the local community"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 15 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible15
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility15}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">HR</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">Human Rights</span>
                      <span className="subHeaderTitle">
                        For which of the following working conditions and human
                        rights issues does your company have a policy/procedure
                        in place?
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible15 ? "visible" : ""
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
                          label="Child Labour"
                          placeholder=""
                          data={dropdownOption}
                          id="ChildLabourPolicy"
                          iconClassName="dropdownIcon"
                          name="ChildLabourPolicy"
                          setValue={formInputs.ChildLabourPolicy || ""}
                          getvalue={setDropdownData}
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
                          label="Working hours / Remuneration"
                          placeholder=""
                          data={dropdownOption}
                          id="WorkingHoursPolicy"
                          iconClassName="dropdownIcon"
                          name="WorkingHoursPolicy"
                          setValue={formInputs.WorkingHoursPolicy || ""}
                          getvalue={setDropdownData}
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
                          label="Conflict minerals and indigenous people"
                          placeholder=""
                          data={dropdownOption}
                          id="ConflictMineralsIndigenousPeople"
                          iconClassName="dropdownIcon"
                          name="ConflictMineralsIndigenousPeople"
                          setValue={
                            formInputs.ConflictMineralsIndigenousPeople || ""
                          }
                          getvalue={setDropdownData}
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
                          label="Discrimination at work"
                          placeholder=""
                          data={dropdownOption}
                          id="DiscriminationAtWorkPolicy"
                          iconClassName="dropdownIcon"
                          name="DiscriminationAtWorkPolicy"
                          setValue={formInputs.DiscriminationAtWorkPolicy || ""}
                          getvalue={setDropdownData}
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
                          label="Freedom of association"
                          placeholder=""
                          data={dropdownOption}
                          id="FreedomOfAssociationPolicy"
                          iconClassName="dropdownIcon"
                          name="FreedomOfAssociationPolicy"
                          setValue={formInputs.FreedomOfAssociationPolicy || ""}
                          getvalue={setDropdownData}
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
                          label="Communication in a language that is fully understood by your employees"
                          placeholder=""
                          data={dropdownOption}
                          id="CommuncationFullyUnderstood"
                          iconClassName="dropdownIcon"
                          name="CommuncationFullyUnderstood"
                          setValue={
                            formInputs.CommuncationFullyUnderstood || ""
                          }
                          getvalue={setDropdownData}
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
                          label="Forced labour"
                          placeholder=""
                          data={dropdownOption}
                          id="ForcedLabourPolicy"
                          iconClassName="dropdownIcon"
                          name="ForcedLabourPolicy"
                          setValue={formInputs.ForcedLabourPolicy || ""}
                          getvalue={setDropdownData}
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
                          label="Harassment"
                          placeholder=""
                          data={dropdownOption}
                          id="HarassmentPolicy"
                          iconClassName="dropdownIcon"
                          name="HarassmentPolicy"
                          setValue={formInputs.HarassmentPolicy || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* 16 */}
            <div className="accordion mb-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <Row className="accordion-button">
                    <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                      <i
                        className={`bi ${
                          isCardVisible16
                            ? "bi-chevron-right"
                            : "bi-chevron-down"
                        }`}
                        onClick={toggleCardVisibility16}
                      ></i>
                    </Col>
                    <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                      <span className="iconLogo">ES</span>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                      <span className="headerTitle">
                        Environmental Stewardship
                      </span>
                      <span className="subHeaderTitle">
                        For which of the following do you conduct environmental
                        impact assessment?
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
                  className={`accordion-collapse collapse show ${
                    isCardVisible16 ? "visible" : ""
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
                          label="Biodiversity"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Energy consumption"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Waste generation"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Climate change"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
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
                          label="Water consumption"
                          placeholder=""
                          data={dropdownOption}
                          id="rfqCategory"
                          iconClassName="dropdownIcon"
                          name="rfqCategory"
                          setValue={formInputs.rfqCategory || ""}
                          getvalue={setDropdownData}
                          // className="dropdownOption"
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

      <div className="pageFooter">
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
          <Col xs={12} md={2} lg={2} className="">
            <button className="btnTable" onClick={handleModify}>
              <i className="bi bi-save"></i> Modify
            </button>
          </Col>
          <Col xs={12} md={2} lg={2} className="">
            <button className="btnTable">
              <i className="bi bi-save"></i> Save as Draft
            </button>
          </Col>
          {/* <Col xs={12} md={2} lg={2} className="">
            <button className="btnTable">
              <i className="bi bi-save"></i> Excel Download
            </button>
          </Col> */}
        </Row>
      </div>

      <CategorySelectionModal show={modalShow} onHide={() => hideModal()} />
    </main>
  );
};

export default SupplierRegistration;
