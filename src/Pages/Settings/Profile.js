import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toast from 'react-hot-toast';
import validator from 'validator';

// Components
import { InputField } from '../../Components/formElements/InputField';
import ChangePasswordModal from '../../Components/Modal/ChangePasswordModal';
import { Image } from '../../Components/formElements/Image';
import Layout  from '../../Layout/Layout';
import config from '../../services/configuration'
import Loader from "../../Components/Loader";

//Serivce
import ItemService from "../../services/supplier_appCommonService";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { addUser, getLoginUserData } from '../../redux/feature/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  let userData = useSelector((state) => state?.user); // User Details from Store
  
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formInputs, setFormInputs] = useState({
    "email":"",
    "firstName":"",
    "lastName":"",
    "contactNumber":"",
    "companyName":"",
    "_id":""
  });

  
  localStorage.setItem('menu','Profile');
  localStorage.setItem('submenu','-');
  
  const onInputChange = ({target: {name, value}}) => { 
    setFormInputs(formInputs => ({...formInputs, [name]: value})); 
    // console.log("onInputChange => formInputs", formInputs); 
  }; 

  const onInputChangePhone = ({target: {name, value}}) => { 
    if(validator.isNumeric(value) || value === ""){
      setFormInputs(formInputs => ({...formInputs, [name]: value})); 
      // console.log("onInputChange => formInputs", formInputs);       
    }
  }; 

  // Handle form submission
  const handleSubmit = async () => {
    
    if(formInputs.firstName === "" || formInputs.lastName === "" || formInputs.contactNumber === ""){
      setErrorMsg('* Fields are mandatory');
      return;
    }else{
      setErrorMsg("")
    }

    const data = {
      "firstName": formInputs.firstName,
      "lastName": formInputs.lastName,
      "contactNumber": formInputs.contactNumber,
      "_id":formInputs._id,
      "action": "Profile"
    };
    // console.log(">> data ", data);

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
        toast.error(item?.message || "Please try again !!", {
          duration: 4000,
          position: 'top-right',
        });    
      }
      setDisabled(false);

    });
    toast.dismiss(toastId);
  };

  //Upload Img to Backend
  const uploadImg = async (val) => {
    const { _id, role } = userData?.data;
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("image", val);
    formData.append("role", role);
    formData.append("action", "Profile");

    const toastId = toast.loading('Loading...',{
      position: 'top-right',
    });
  
    await ItemService.uploadImg(formData).then((item) => {
      // console.log('>> item!',item);
      if (item?.status === 200) {
        toast.success(item?.message || 'User Updated successfully', {
          duration: 2000,
          position: 'top-right',
        });

        // Update response value after calling the API and Update in Redux Store
        dispatch(getLoginUserData())
        
      } else {
        toast.error(item?.message || "Please try again !!", {
          duration: 4000,
          position: 'top-right',
        });    
      }
  
    });
    toast.dismiss(toastId);

    setSelectedImage(userData?.data?.profileImgPath);
  };

  const onUploadFileText = async (data) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }      

  }

  const handleFileSelect = (e) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      // Check if the selected file is an allowed image format
      if (allowedTypes.includes(selectedFile.type)) {
        // Display the selected image
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            const result = event.target.result;
            if (typeof result === 'string') {
              // console.log(">> result", result);

              uploadImg(e.target.files[0])
              setSelectedImage(result);
              setError(null); // Reset any previous error
            }
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // Display an error message if the selected file format is not allowed
        setError(`Please select a valid image file (${allowedTypes.join(', ')}).`);
        setSelectedImage(null);
      }
    }
  };

  /* Change Password Button Function */
  const changePasswordClick = () => {
    // console.log(">> Open Password Modal");   
    setModalShow(true)
  }

    // Populate initial form values from Zustand AuthStore user state
    useEffect(() => {
      if (userData &&  userData?.data) {
        const { firstName, lastName, contactNumber,email,_id } = userData?.data;
        setFormInputs({
          firstName,
          lastName,
          email,
          contactNumber,
          _id,
        });
  
        var timestamp = new Date().getTime();
        let res = (userData?.data?.profileImgPath) ? (config.BASE_URL + userData?.data?.profileImgPath + '?t='+ timestamp) : ""
        setSelectedImage(res)
      }
    }, [setFormInputs, userData]);
  
  return (
    <main className="settings main" id="main">
      <Layout/>
      <Row className=''>
        <Col xs={12} md={12}  className="rightSide rightPadding">

          <div className="rightSideInner">
            <h2 className='mainTitle'>Your Profile</h2>
            <p className='subText'>This is how your profile looks to other WorkerHive users.</p>
            <hr/>
              <form className="space-y-4">
                <Row>
                  <Col xs={12} md={12} lg={12} className='commLeftRightPadding text-center'>  
                    {/* Display the selected image */}
                    {
                      <Loader isLoading={!userData?.status} className={"text-center"}/>
                    }
                    {selectedImage && userData?.status && (
                      <Image srcVal={selectedImage} alt="profile" styleVal={{ maxWidth: '100%' }} classNameVal='profileImageCss' />
                    )}
                    {!selectedImage && userData?.status && (
                      <i className="bi bi-person-circle iconSize" onClick={onUploadFileText}></i>
                    )}  

                    {/* Display error message, if any */}
                    {error && <div className="error-message">{error}</div>}   

                    <p onClick={onUploadFileText} className='uploadPhoto' >Click here to upload the Image</p>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileSelect}
                    />
                  </Col>

                  <Col xs={12} md={6} lg={6} className='commLeftRightPadding'>
                    <InputField className="inputBox" label="First Name" name="firstName" placeholder='First Name' 
                    value={formInputs.firstName || ""} onChange={onInputChange} />
                  </Col>
                  <Col xs={12} md={6} lg={6} className='commLeftRightPadding'>
                    <InputField className="inputBox" label="Last Name" name="lastName" placeholder='Last Name'
                    value={formInputs.lastName || ""} onChange={onInputChange} />
                  </Col>
                  <Col xs={12} md={6} lg={6} className='commLeftRightPadding'>
                    <InputField className="inputBox" label="Email Id" name="email" placeholder='Email Id' disabled={true} 
                    value={formInputs.email || ""} onChange={onInputChange} />
                  </Col>
                  <Col xs={12} md={6} lg={6} className='commLeftRightPadding'>
                    <InputField className="inputBox" label="Contact Number" name="contactNumber" placeholder='Phone Number' maxLength='10' 
                    value={formInputs.contactNumber || ""} onChange={onInputChangePhone} />
                  </Col>
                </Row>

                <Row>
                  <Col xs={6} md={9} lg={9} className='commLeftRightPadding'>
                    <p className="mt-4 changePassword">
                      <span onClick={changePasswordClick}>Change password</span>
                    </p>
                  </Col>
                  <Col xs={6} md={3} lg={3} className='commLeftRightPadding'> 
                    <button type="button" onClick={handleSubmit} className="btn btn-primary mt-4 w-full justify-center rounded-md" disabled={disabled} >Save</button>
                  </Col>
                  <Col xs={12} md={12} lg={12} className='commLeftRightPadding'> 
                    <p className='errorMsg'> {errorMsg} </p>               
                  </Col>
                </Row>

              </form>

            <ChangePasswordModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>

        </Col>
      </Row>
    </main>
  );
};

export default Profile;
