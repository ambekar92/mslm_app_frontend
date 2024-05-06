import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toast from 'react-hot-toast';

// Components
import { InputField } from '../../Components/formElements/InputField';
import { TextAreaField } from '../../Components/formElements/TextAreaField';
import { Image } from '../../Components/formElements/Image';
import Layout  from '../../Layout/Layout';
import config from '../../services/configuration'
import Loader from "../../Components/Loader";

//Serivce
import ItemService from "../../services/supplier_appCommonService";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { addUser, getLoginUserData } from '../../redux/feature/userSlice';

  // Define forms here...
const Company = () => {
  const dispatch = useDispatch();
  let userData = useSelector((state) => state?.user); // User Details from Store
  
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formInputs, setFormInputs] = useState({
    "companyName":"",
    "description":"",
    "role":"",
    "_id":""
  });

  localStorage.setItem('menu','Company');
  localStorage.setItem('submenu','-');
  
  const onInputChange = ({target: {name, value}}) => { 
    setFormInputs(formInputs => ({...formInputs, [name]: value})); 
  }; 

// Handle form submission
const handleSubmit = async () => {
    
  if(formInputs.companyName === "" || formInputs.description === ""){
    setErrorMsg('* Fields are mandatory');
    return;
  }else{
    setErrorMsg("")
  }

  const data = {
    "companyName": formInputs.companyName,
    "description": formInputs.description,
    "_id":formInputs._id,
    "action": "Company",
    "role": formInputs.role
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
    formData.append("action", "Company");

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

    setSelectedImage(userData?.data?.companyLogoPath);
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

  // Populate initial form values from Zustand AuthStore user state
  useEffect(() => {
    if (userData &&  userData?.data) {
      const { companyName, description, _id, role } = userData?.data;
      setFormInputs({
        companyName,
        description,
        role,
        _id,
      });

      var timestamp = new Date().getTime();
      let res = (userData?.data?.companyLogoPath) ? (config.BASE_URL + userData?.data?.companyLogoPath + '?t='+ timestamp) : ""
      setSelectedImage(res)
    }
  }, [setFormInputs, userData]);
  
  return (
      <main className="settings main" id="main">
        <Layout/>
        <Row className=''>
          <Col xs={12} md={12}  className="rightSide rightPadding">

            <div className="rightSideInner">
              <h2 className='mainTitle'>Company</h2>
              <p className='subText'>Joined in 2023</p>
              <hr/>
                <form className="space-y-4">
                  <Row>
                    <Col xs={12} md={12} lg={12} className='commLeftRightPadding text-center'>
                      {/* Display the selected image */}
                      {
                      <Loader isLoading={!userData?.status} className={"text-center"}/>
                      }
                      {selectedImage && userData?.status && (
                        <Image srcVal={selectedImage} alt="logo" styleVal={{ maxWidth: '100%' }} classNameVal='companyImageCss' />
                      )}
                      {!selectedImage && userData?.status && (
                        <i className="bi bi-buildings iconSize" onClick={onUploadFileText}></i>
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

                    <Col xs={12} md={12} lg={12} className='commLeftRightPadding'>
                      <InputField placeholder="Company Name" className="inputBox" label="" name="companyName"  
                      value={formInputs.companyName || ""} onChange={onInputChange}  />
                    </Col>
                    <Col xs={12} md={12} lg={12} className='commLeftRightPadding'>
                      <TextAreaField placeholder="Description" className="inputBox" label="" name="description" style={{height:"100px"}}
                      value={formInputs.description || ""} onChange={onInputChange} />
                    </Col>
                    
                  </Row>

                  <Row className='justify-end'>
                    <Col xs={6} md={3} lg={3} className='commLeftRightPadding'> 
                      <button type="button" onClick={handleSubmit} className="btn btn-primary mt-4 w-full justify-center rounded-md" disabled={disabled} >Save</button>
                    </Col>
                    <Col xs={12} md={12} lg={12} className='commLeftRightPadding'> 
                      <p className='errorMsg'> {errorMsg} </p>               
                    </Col>
                  </Row>

                </form>
            </div>

          </Col>
        </Row>
      </main>
  );
};

export default Company;
