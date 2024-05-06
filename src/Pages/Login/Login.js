/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useEffect, useState } from "react";
import ItemService from "../../services/supplier_appCommonService";
import toast from 'react-hot-toast';
import ConstantsList from '../../common/Constants';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [headerName, setHeaderName] = useState();
  let [headerLogo, setHeaderLogo] = useState();
  const [forgotPassword, setForgotPassword] = useState(false);


  const getConfig = () => {
    ItemService.getConfig().then((items) => {
      setHeaderName(items.PRODUCT_NAME);
      setHeaderLogo(items.PRODUCT_LOGO);
    });
  };

  // USER LOGIN
  const handleLogin = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const toastId = toast.loading('Loading...',{
      position: 'top-right',
    });

    let obj = {
      email: email,
      password: password,
    };

    if(email === "" || password === ""){
      toast.error('Email and Password not be Empty !!', {
        duration: 3000,
        position: 'top-right',
      });
    }else{
      ItemService.login(obj).then((item) => {
        console.log('>> item >>',item);
        if (item?.status === 200) {
          toast.success(item?.message || 'User registered successfully', {
            duration: 2000,
            position: 'top-right',
          });
          window.location = ConstantsList.HOME;          
        } else {
          toast.error(item?.message || 'Invalid input', {
            duration: 4000,
            position: 'top-right',
          });    
        }
      });
    }
    

    toast.dismiss(toastId);
  };

  const handleForgotPass = async () => {
    // await new Promise(r => setTimeout(r, 1000))
    setForgotPassword(!forgotPassword);
  }

  useEffect(() => {
    console.log(">> Login Running");
    getConfig();
    const token = localStorage.getItem("token");
    if (token) {
      window.location = "/home";
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <main>
        <div className="container">
          <section className="section register d-flex flex-column align-items-center justify-content-center pt-2">
            <div className="container">
              <div className="row justify-content-center" style={{minHeight: "98vh"}}>
                <div className="col-md-4 col-sm-8 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-2">
                    <a
                      href={ConstantsList.LOGIN}
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src={headerLogo} alt="" className="loginLogo"/>
                      {/* <span className="d-lg-block supplier_app">{headerName}</span> */}
                    </a>                    
                  </div>

                  {!forgotPassword && 
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="pb-2">
                          <h5 className="card-title text-left">
                            Sign in to your account
                          </h5>
                        </div>

                        <form className="row g-3 needs-validation">
                          <div className="col-12 leftAl">
                            <label className="form-label">Email</label>
                            <div className="input-group has-validation">
                              <input
                                type="text"
                                name="email"
                                value={email || ""}
                                className="form-control"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-12 leftAl">
                            <label className="form-label">Password</label>
                            <div className="forgot-pass">
                              <a href="#javascript" className='form-check-label' onClick={handleForgotPass}> Forgot your password?</a>
                            </div>
                            <div className="input-group has-validation">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password || ""}
                                className="form-control"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              <button type="button" aria-label="Toggle password visibility" className="eyeCss absolute inset-y-0 right-0 flex items-center justify-center pr-3 h-full" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ?  <i className="bi bi-eye-fill"></i> :  <i className="bi bi-eye-slash-fill"></i>}
                              </button>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                <label className="form-check-label" htmlFor="rememberMe">Stay signed in</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <button
                              className="btn btn-primary w-100"
                              onClick={handleLogin}
                            >
                              Login
                            </button>
                          </div>                        
                        </form>
                      </div>
                    </div>
                  }

                  {forgotPassword && 
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="pb-2">
                          <h5 className="card-title text-left">
                            Reset your password
                          </h5>
                          <p className='subText'> Enter the email address associated with your account and we'll send you a link to reset your password. </p>
                        </div>

                        <form className="row g-3 needs-validation">
                          <div className="col-12 leftAl">
                            <label className="form-label">Email</label>
                            <div className="input-group has-validation">
                              <input
                                type="text"
                                name="email"
                                value={email || ""}
                                className="form-control"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-12">
                            <button
                              className="btn btn-primary w-100"
                              // onClick={handleLogin}
                            >
                              Continue
                            </button>
                            <div className="form-signin">
                              <a href="#javascript" className='form-signin-lable' onClick={handleForgotPass}> Return to sign in</a>
                            </div>
                          </div>                        
                        </form>
                      </div>
                    </div>
                  }

                  <div className="col-12">
                    <p className="small mb-0">
                      Don't have an account ? {" "}
                      <a href={ConstantsList.SUPPLIER_MASTER_CREATE} className="form-check-label">Supplier Registration</a>
                    </p>
                    {/* <div className="footer pt-2">
                      <a href="/" className='footerLink'> 
                        &copy; supplier_app
                      </a>
                      <a href="/" className='footerLink'> 
                        Privacy & terms
                      </a> 
                    </div> */}
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
