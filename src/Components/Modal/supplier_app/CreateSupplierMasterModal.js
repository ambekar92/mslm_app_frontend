import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
// import toast from "react-hot-toast";
// import { Switch } from "@headlessui/react";
import { useNavigate } from 'react-router-dom';

// Components
// import { InputField } from "../../formElements/InputField";
import { ComboboxField } from "../../formElements/ComboboxField";
// import Loader from "../../Loader";
import Constants from "../../../common/Constants";

//Serivce
// import ItemService from "../../../services/supplier_appCommonService";

//Redux
import { useDispatch } from "react-redux";
// import { getTeamData } from "../../../redux/feature/teamSlice";
// import { getLocationData } from "../../redux/feature/locationSlice";

const CreateSupplierMasterMoal = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  // const _ = require('lodash');

  // let userData = useSelector((state) => state?.user.data); // User Details from Store
  // let location = useSelector((state) => state?.location); // User Details from Store
  // let compIdObj = { compId: userData.compId };

  // const [selectedItems, setSelectedItems] = useState([]);
  const [supplierCategory, setAccessData] = useState("");
  // const [disabled, setDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let dropdownOption = [
    {
      id: "1",
      name: "200-Spares and Operations Maintenance",
    },
    {
      id: "2",
      name: "300-RM",
    },
  ];

  const [formInputs, setFormInputs] = useState({
    supplierCategory: ""
  });

  // Handle Submit IviteTeamMembers
  const handleSubmit = async () => {
    if (
      formInputs.supplierCategory === "" 
    ) {
      setErrorMsg("* Fields are mandatory");
      return;
    } else {
      setErrorMsg("");
    }

    const data = {
      supplierCategory: formInputs.supplierCategory
    };
    console.log(">> data ", data);

    navigate(Constants.SUPPLIER_MASTER_CREATE);
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
    setFormInputs({
      supplierCategory: ""
    });
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

  // const onInputChange = ({ target: { name, value } }) => {
  //   setFormInputs((formInputs) => ({ ...formInputs, [name]: value }));
  // };

  useEffect(() => {
    setFormInputs((formInputs) => ({
      ...formInputs,
      supplierCategory: supplierCategory,
    }));
  }, [supplierCategory]);

  return (
    // backdrop="static"
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
      size="lg"
      ref={ref}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <i className="bi bi-plus-lg"></i> Create Supplier Master
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
              <ComboboxField
                label="Account Group"
                placeholder="please select the Account Group"
                data={dropdownOption}
                id="supplierCategory"
                iconClassName="dropdownIcon"
                name="supplierCategory"
                setValue={formInputs.supplierCategory || ""}
                getvalue={setAccessData}
                className="dropdownOption"
              />
            </Col>
          </Row>

          <Row className="justify-end">
            <Col xs={6} md={3} lg={3} className="commLeftRightPadding">
              <button
                type="button"
                onClick={()=> props.onHide()}
                className="btn btn-danger mt-4 w-full justify-center rounded-md"
              >
                Cancel
              </button>
            </Col>
            <Col xs={6} md={3} lg={3} className="commLeftRightPadding">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-4 w-full justify-center rounded-md"
              >
                Save
              </button>
            </Col>
            <Col xs={12} md={12} lg={12} className="commLeftRightPadding">
              <p className="errorMsg"> {errorMsg} </p>
            </Col>
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export default CreateSupplierMasterMoal;
