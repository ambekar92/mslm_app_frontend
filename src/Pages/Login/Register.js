import React, { useState,useEffect } from 'react';
import {InputField} from '../../Components/formElements/InputField';
import CheckCircle from '../../Components/Icons/CheckCircle';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../common.scss';
import toast from 'react-hot-toast';
import useService from "../../services/supplier_appCommonService";
import ConstantsList from '../../common/Constants';

const Register =()=> {
  const [showPassword, setShowPassword] = useState(false);
  let [headerLogo, setHeaderLogo] = useState();
  const [formInputs, setFormInputs] = useState({
    "email":"",
    "password":"",
    "firstName":"",
    "lastName":"",
    "contactNumber":"",
    "companyName":""
  });
    
  const onInputChange = ({target: {name, value}}) => { 
    setFormInputs(formInputs => ({...formInputs, [name]: value})); 
    // console.log("onInputChange => formInputs", formInputs); 
  }; 

  const getConfig = () => {
    useService.getConfig().then((items) => {
      setHeaderLogo(items.PRODUCT_LOGO);
    });
  };

  // OnSubmit Function
  const handleSubmitClick = async (event) => {
    event.preventDefault();

// | Status Code | Message                       | Description                                                  |
// |-------------|------------------------------ |--------------------------------------------------------------|
// | 201         | `User registered successfully`| The user, company, and profile were created successfully.    |
// | 400         | `Invalid input`               | The provided input failed validation.                        |
// | 401         | `Email already exists`        | The provided email is already in use.                        |
// | 402         | `Signup failed`               | User registration failed.                                    |
// | 403         | `Company creation failed`     | Company data could not be inserted.                          |
// | 404         | `Profile creation failed`     | Profile data could not be inserted.                          |
// | 500         | `Email check failed`          | An error occurred while checking if the email exists.        |

    // console.log(">> formInputs", formInputs);
    try {
      const toastId = toast.loading('Loading...',{
        position: 'top-right',
      });

      if(formInputs.email === '' || formInputs.password === '' || formInputs.firstName === '' || formInputs.lastName === '' || formInputs.contactNumber === '' || formInputs.companyName === ''){
        toast.error('Fields not be Empty !!', {
          duration: 3000,
          position: 'top-right',
        });
      }else{
        const responseData = useService.registerUser(formInputs);
        responseData.then((item) => {
          // console.log(">> item", item);        
          if (item?.status === 200) {
            // If Register is successful
            toast.success(item?.message || 'User registered successfully', {
              duration: 2000,
              position: 'top-right',
            });
            // window.location = "ConstantsList.LOGIN"
          } else if (item?.status === 400) {
            toast.error(item?.message || 'Invalid input', {
              duration: 4000,
              position: 'top-right',
            });
          } else if (item?.status === 401) {
            toast.error(item?.message || 'Email already exists', {
              duration: 4000,
              position: 'top-right',
            });
          } else if (item?.status === 402) {
            toast.error(item?.message || 'Signup failed', {
              duration: 4000,
              position: 'top-right',
            });
          } else if (item?.status === 403) {
            toast.error(item?.message || 'Company creation failed', {
              duration: 4000,
              position: 'top-right',
            });
          } else if (item?.status === 404) {
            toast.error(item?.message || 'Profile creation failed', {
              duration: 4000,
              position: 'top-right',
            });
          } else if (item?.status === 500) {
            toast.error(item?.message || 'Email check failed', {
              duration: 4000,
              position: 'top-right',
            });
          } else {
            // If register is unsuccessful, show error
            toast.error(item?.message || 'An error occurred during register.', {
              duration: 4000,
              position: 'top-right',
            });
          }
        })
      }
    toast.dismiss(toastId);
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
      // setServerError('An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    console.log(">> Register Running");
    getConfig();
   
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
    <div className="registerPage md:pt-14">
    <Container>
      
      <Row className="justify-content-md-center">
        <Col xs={12} md={10} lg={10} className='indexValue'>          
          <Row>
            <Col xs={12} md={6} lg={6}>
            <Col xs={12} md={12} lg={12} className='mb-4 mt-4 hidden md:block'>  
                <img
                  src={headerLogo}
                  className='logo'
                  alt={'logo'}
                />
                {/* <h2 className='mainTitle mt-15 hidden md:block supplier_app' style={{marginLeft:"72px"}}>supplier_app</h2> */}
            </Col>

            <Col xs={12} md={12} lg={12} className='text-center mb-4 mt-4 md:hidden' style={{paddingLeft:"72px"}}>  
                <img
                  src={headerLogo}
                  className='logo'
                  alt={'logo'}
                  style={{marginLeft:"10px"}}
                />
                <h2 className='mainTitle mt-18 supplier_app' style={{marginTop:"-46px"}}>supplier_app</h2>
            </Col>
            
            {/* <h2 className='mainTitleSm mt-15 md:hidden supplier_app'>supplier_app</h2> */}
              <div className="flex flex-col justify-center  box1 d-none d-sm-block mr-4">
                <div className="flex items-center">
                  <CheckCircle className="text-blue-600" />
                  <h3 className="boxTitle ml-4">Get started quickly</h3>
                </div>                
                <p className="text-gray-600 ml-10 subBoxTitle">Integrate with developer-friendly APIs or choose low-code or pre-built solutions.</p>
                
                <div className="flex items-center">
                  <CheckCircle className="text-maroon-600" />
                  <h3 className="boxTitle ml-4">Support any business model</h3>
                </div>                
                <p className="text-gray-600 ml-10 subBoxTitle">E-commerce, subscriptions, SaaS platforms, marketplaces, and more—all within a unified platform.</p>


                <div className="flex items-center">
                  <CheckCircle className="text-maroon-600" />
                  <h3 className="boxTitle ml-4">Join millions of businesses</h3>
                </div>                
                <p className="text-gray-600 ml-10 subBoxTitle">supplier_app is trusted by ambitious startups and enterprises of every size.</p>

                <div className="footer">
                  <a href="/"  className='footerLink'> 
                    &copy; supplier_app
                  </a>
                  <a href="/"  className='footerLink'> 
                    Privacy & terms
                  </a> 
                  {/* <p className='footerLinkText'> - Made with ❤️ boston</p>                */}
                </div>
              </div>

              
            </Col>

            <Col xs={12} md={6} lg={6}>
              <div className="flex flex-col justify-center ">
                <div className="box2">
                <h2 className="text-base/7 font-bold text-gray-900 mb-4 mainTitleBox2">Create your supplier_app account</h2>
                  
                    <form className="space-y-4">
                    <Row>
                      <Col xs={12} md={6} lg={6} className="commLeftRightPadding">
                        <InputField className="inputBox" label="First Name" name="firstName" value={formInputs.firstName || ""} onChange={onInputChange} required={true} />
                      </Col>
                      <Col xs={12} md={6} lg={6} className="commLeftRightPadding">
                        <InputField className="inputBox" label="Last Name" name="lastName"  value={formInputs.lastName || ""} onChange={onInputChange} required={true}/>
                      </Col>
                      <Col xs={12} md={6} lg={6} className="commLeftRightPadding">
                        <InputField className="inputBox" label="Company Name" name="companyName" value={formInputs.companyName || ""} onChange={onInputChange} required={true}/>
                      </Col>
                      <Col xs={12} md={6} lg={6} className="commLeftRightPadding">
                        <InputField className="inputBox" label="Contact Number" name="contactNumber" value={formInputs.contactNumber || ""} type="tel" onChange={onInputChange} required={true} />
                      </Col>
                      <Col xs={12} md={6} lg={6} className="commLeftRightPadding">
                        <InputField className="inputBox" label="Email" name="email" type="email" value={formInputs.email || ""} onChange={onInputChange} required={true} />
                      </Col>
                      <Col xs={12} md={6} lg={6} className="commLeftRightPadding">
                        <div className="relative">
                          <InputField className="inputBox" label="Password" name="password" value={formInputs.password || ""} type={showPassword ? 'text' : 'password'} onChange={onInputChange} required={true} />
                          <button type="button" aria-label="Toggle password visibility" className="eyeCss absolute inset-y-0 right-0 flex items-center justify-center pr-3 h-full" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ?  <i className="bi bi-eye-fill"></i> :  <i className="bi bi-eye-slash-fill"></i>}
                          </button>
                        </div>
                      </Col>
                    </Row>                            
                    
                    <button type="submit" onClick={handleSubmitClick} className="btn btn-primary flex w-full justify-center rounded-md mt-4" >Create Account</button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-500">
                      Already a member?{' '}
                      <a href={ConstantsList.LOGIN} onClick={()=>localStorage.setItem('register',false)} className="singIn font-semibold text-maroon-600 hover:text-maroon-500">Sign in</a>
                    </p>
                </div>
              </div>
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
    </div>
    </>
  );  
}

export default Register;
