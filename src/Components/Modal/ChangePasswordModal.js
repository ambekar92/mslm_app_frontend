import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import toast from 'react-hot-toast';

// Components
import { InputField } from '../../Components/formElements/InputField';

//Serivce
import ItemService from "../../services/supplier_appCommonService";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { addUser } from '../../redux/feature/userSlice';

const ChangePasswordModal = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  let userData = useSelector((state) => state?.user); // User Details from Store

  const [disabled, setDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formInputs, setFormInputs] = useState({
    "password":"",
    "newPassword":"",
    "confirmPassword":"",
    "_id":"",
    "role":""
  });

  // Handle form submission
  const handleSubmit = async () => {
    
    if(formInputs.password === "" || formInputs.newPassword === "" || formInputs.confirmPassword === ""){
      setErrorMsg('* Fields are mandatory');
      return;
    }else{
      setErrorMsg("")
    }

    if( formInputs.newPassword !== formInputs.confirmPassword ){
      setErrorMsg('* New and Confirm Password Not Matching');
      return;
    }

    const data = {
      "password": formInputs.password,
      "confirmPassword" : formInputs.confirmPassword,
      "_id":formInputs._id,
      "role":formInputs.role,
      "action": "Change_Password"
    };
    console.log(">> data ", data);

    const toastId = toast.loading('Loading...',{
      position: 'top-right',
    });
  
    setDisabled(true);
    await ItemService.userUpdate(data).then((item) => {
      // console.log('>> item!',item);
      if (item?.status === 200) {
        toast.success(item?.message || 'User Updated successfully', {
          duration: 2000,
          position: 'top-right',
        });

        // Update response value in Redux Store
        dispatch(addUser(data))

      } else {
        setErrorMsg('*'+ item?.message);
        toast.error(item?.message || "Please try again !!", {
          duration: 4000,
          position: 'top-right',
        });    
      }
      setDisabled(false);

    });

    toast.dismiss(toastId);
  };

  const onInputChange = ({target: {name, value}}) => { 
    setFormInputs(formInputs => ({...formInputs, [name]: value})); 
    // console.log("onInputChange => formInputs", formInputs); 
  }; 

  useEffect(() => {
    if (userData &&  userData?.data) {
      const {_id, role } = userData?.data;
      setFormInputs({
        _id,
        role,
        "password":"",
        "newPassword":"",
        "confirmPassword":"",
      });
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        props.onHide();        
      }
    };  
    document.addEventListener('keydown', handleEscapeKey);  
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [props, userData]);
  

  return (
    // backdrop="static"
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" 
        keyboard={false} size="lg" ref={ref}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change password
          <p className='subText'>Change your old password to new password</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
            <form className="space-y-4">
              <Row>
                <Col xs={12} md={12} lg={12} className='commLeftRightPadding'>
                  <InputField placeholder="Old password" className="inputBox" label="" id="oldPass" name="password" value={formInputs.password || ""} onChange={onInputChange}  />
                </Col>
                <Col xs={12} md={12} lg={12} className='commLeftRightPadding'>
                  <InputField placeholder="New password" className="inputBox" label="" id="newPass" name="newPassword" value={formInputs.newPassword || ""} onChange={onInputChange}  />
                </Col>
                <Col xs={12} md={12} lg={12} className='commLeftRightPadding'>
                  <InputField placeholder="Confirm password" className="inputBox" label="" id="confirmPass" name="confirmPassword" value={formInputs.confirmPassword || ""} onChange={onInputChange}  />
                </Col>
              </Row>

              <Row className='justify-end'>
                {/* <Col xs={4} md={2} lg={2} className='commLeftRightPadding'>               
                  <Button onClick={props.onHide} className='btn btn-danger my-2 w-full justify-center rounded-md'>Close</Button>
                </Col> */}
                <Col xs={6} md={3} lg={3} className='commLeftRightPadding'> 
                    <button type="button" onClick={handleSubmit} className="btn btn-primary mt-4 w-full justify-center rounded-md" disabled={disabled} >Save</button>                   
                </Col>
                <Col xs={12} md={12} lg={12} className='commLeftRightPadding'> 
                  <p className='errorMsg'> {errorMsg} </p>               
                </Col>
              </Row>
            </form>
      </Modal.Body>
    </Modal>
  );
});

export default ChangePasswordModal;