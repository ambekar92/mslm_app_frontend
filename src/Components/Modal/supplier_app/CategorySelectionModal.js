import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
// import toast from "react-hot-toast";
// import { Switch } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";

// Components
// import { InputField } from "../../formElements/InputField";
// import { ComboboxField } from "../../formElements/ComboboxField";
// import Loader from "../../Loader";
import Constants from "../../../common/Constants";

//Serivce
// import ItemService from "../../../services/supplier_appCommonService";

//Redux
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { addCategorySelectedData } from "../../../redux/feature/supplier_app/supplierSlice";
// import { getTeamData } from "../../../redux/feature/teamSlice";
// import { getLocationData } from "../../redux/feature/locationSlice";

const CategorySelectionModal = React.forwardRef((props, ref) => {
  // const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  let categorySelectionData = useSelector(
    (state) => state?.supplier?.category_selection?.data
  ); // User Details from Store
  // const _ = require('lodash');

  // let userData = useSelector((state) => state?.user.data); // User Details from Store
  // let location = useSelector((state) => state?.location); // User Details from Store
  // let compIdObj = { compId: userData.compId };

  // const [selectedItems, setSelectedItems] = useState([]);
  // const [supplierCategory, setAccessData] = useState("");
  const [disabled, setDisabled] = useState(true);
  // const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCardVisible, setCardVisible] = useState(true);
  const [getSelectedData, setSelectedData] = useState([]);
  // const [totalRows, setTotalRows] = useState(10);
  // const [perPage, setPerPage] = useState(10);

  const toggleCardVisibility = () => {
    setCardVisible(!isCardVisible);
  };

  const handleChange = ({ selectedRows }) => {
    setSelectedData(selectedRows);

    if (selectedRows.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  // Handle Submit IviteTeamMembers
  const handleSubmit = async () => {
    dispatch(addCategorySelectedData(getSelectedData));
    props.onHide();
    // const toastId = toast.loading("Loading...", {
    //   position: "top-right",
    // });
    // setDisabled(true);
    // await ItemService.inviteTeamMembers(data).then((item) => {
    //   // console.log('>> item!',item);
    //   if (item?.status === 200) {
    //     toast.success(item?.message || "User Invited successfully", {
    //       duration: 2000,
    //       position: "top-right",
    //     });
    //     setErrorMsg("");
    //     // Update response value in Redux Store
    //     dispatch(getTeamData(compIdObj));
    //   } else {
    //     toast.error(item?.message || "Please try again !!", {
    //       duration: 4000,
    //       position: "top-right",
    //     });
    //     setErrorMsg("*" + item?.message);
    //   }
    //   setDisabled(false);
    // });
    // toast.dismiss(toastId);
  };

  useEffect(() => {
    // setSelectedItems([]);

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        props.onHide();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [props]);

  const fetchUsers = async (page) => {
    setLoading(true);
    // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

    setData(categorySelectionData);
    // setTotalRows(categorySelectionData?.length);
    setLoading(false);
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   // const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  //   setData(categorySelectionData);
  //   setPerPage(perPage);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelectionData]);

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

  return (
    // backdrop="static"
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
      dialogClassName="modal-90w"
      ref={ref}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Category Selection
          {/* <p className="subText">
            At supplier_app, every person has a role, each with its own level of
            access.
          </p> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <form className="space-y-4">
          <Row>
            <Col xs={12} md={12} lg={12} className="commLeftRightPadding">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <Row className="accordion-button">
                      <Col xs={1} md={1} lg={1} className="text-left arrowBtn">
                        <i
                          className={`bi ${
                            isCardVisible
                              ? "bi-chevron-right"
                              : "bi-chevron-down"
                          }`}
                          onClick={() => toggleCardVisibility()}
                        ></i>
                      </Col>
                      <Col xs={1} md={1} lg={1} className="text-center logoBtn">
                        <span className="iconLogo">CS</span>
                      </Col>
                      <Col xs={12} md={9} lg={9}>
                        <span className="headerTitle">Category Selection</span>
                        <span className="subHeaderTitle">
                          View of Category Selection{" "}
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
                            paginationRowsPerPageOptions={
                              Constants.ROW_PER_PAGE
                            }
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
            </Col>
          </Row>

          <Row className="justify-end">
            <Col xs={6} md={2} lg={2} className="commLeftRightPadding">
              <button
                type="button"
                onClick={() => props.onHide()}
                className="btn btn-danger mt-4 w-full justify-center rounded-md"
              >
                Cancel
              </button>
            </Col>
            <Col xs={6} md={2} lg={2} className="commLeftRightPadding">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-4 w-full justify-center rounded-md"
                disabled={disabled}
              >
                Select
              </button>
            </Col>
            {/* <Col xs={12} md={12} lg={12} className="commLeftRightPadding">
              <p className="errorMsg"> {errorMsg} </p>
            </Col> */}
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export default CategorySelectionModal;
