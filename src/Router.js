/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'   
import { Routes, Route, Navigate } from 'react-router-dom';
// import ConstantsList from './common/Constants';

// import Layout  from './Layout/Layout';
import Page404 from './Pages/404Page';
// import Login from './Pages/Login/Login';
// import Register from './Pages/Login/Register';

// supplier_app Starts
// import HOME from './Pages/supplier_app';
// import DASHBOARD from './Pages/supplier_app/Dashboard';
    
// supplier_app Ends

// import Company from './Pages/Settings/Company';
// import Profile from './Pages/Settings/Profile';
import Dashboard from './Pages/mslm_app/Dashboard';

//Redux
import { useDispatch } from "react-redux";
// import { getLoginUserData} from './redux/feature/userSlice';
// import { getRfqQuotation, getPurchaseRequisition, getQuotation } from './redux/feature/supplier_app/sourcingSlice';
// import { getSupplierList} from './redux/feature/supplier_app/supplierSlice';
// import { getPurchaseOrder, getGoodsReceivedNote, getASN } from './redux/feature/supplier_app/purchasingSlice';
// import { getGatepassList} from './redux/feature/supplier_app/gatepassSlice';

import { getMenuOnUserRole } from './redux/feature/supplier_app/menuSlice';

// Assume this is your authentication check function
const isAuthenticated = () => {
    // Check if the token is present or valid
    const token = localStorage.getItem('token');
    return !!token;
  };

const PrivateRoute = ({ children }) => {
    console.log(">> RouterNav >> user isAuthenticated >> " , isAuthenticated());
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

function RouterNav() {
    // console.log(">> RouterNav >> ");
    const dispatch = useDispatch();

    useEffect(() => {
        // const userData = JSON.parse(localStorage.getItem('userData'));
        let localData = localStorage.getItem('userData');
        let userData={}
        if(localData){
            userData = JSON.parse(localData);
            // let userInfoObj = {                
            //     "vendorId" : userData?.data?.userId,
            //     "role" : (userData?.data?.roles?.length > 0 ? userData?.data?.roles[0]:""), 
            // }

            // // USER & MENU
            // dispatch(getLoginUserData());    // userSlice store     
            dispatch(getMenuOnUserRole());    // userSlice store     

            // // - SOURCING
            // dispatch(getRfqQuotation());    // RfqQuotation store       
            // dispatch(getPurchaseRequisition());    // getPurchaseRequisition store     
            // dispatch(getQuotation());    // getPurchaseRequisition store     
            
            // // - SUPPILER
            // dispatch(getSupplierList());    // RfqQuotation store     
              
            // // - PURCHASING
            // dispatch(getPurchaseOrder(userInfoObj));    // RfqQuotation store       
            // dispatch(getGoodsReceivedNote());    // RfqQuotation store  
            // dispatch(getASN());    // RfqQuotation store  

            // // - GATEPASS
            // dispatch(getGatepassList());    // RfqQuotation store       
        }            
    });

    return(
        <>  
            {/* <Page404/> */}
            <Routes>                                      
                {/* Public route */}
                <Route exact path='*' element={<Page404 />}></Route>
                <Route exact path='/' element={<Dashboard />}></Route>
                <Route exact path='/license-manager-list' element={<Dashboard />}></Route>
                
                {/* <Route  exact path={ConstantsList.SUPPLIER_MASTER_CREATE}  element={ <SUPPLIER_MASTER_CREATE/> } /> */}

                {/* <Route exact path={ConstantsList.LOGIN} element={<Login/>}></Route>                
                <Route exact path={ConstantsList.REGISTER} element={<Register/>}></Route>      */}

                {/* Private route */}
                {/* <Route  exact path={ConstantsList.COMPANY}  element={ <PrivateRoute>  <Company/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.PROFILE}  element={ <PrivateRoute> <Profile/>  </PrivateRoute>  } /> */}

                {/* supplier_app Starts here */}
                {/* <Route  exact path={ConstantsList.HOME}  element={ <PrivateRoute> <HOME/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.DASHBOARD}  element={ <PrivateRoute> <DASHBOARD/>  </PrivateRoute>  } />

                <Route  exact path={ConstantsList.SUPPILER_REGISTRATION}  element={ <PrivateRoute> <SUPPILER_REGISTRATION/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SUPPILER_LIST}  element={ <PrivateRoute> <SUPPILER_LIST/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SUPPILER_MASS_UPLOAD}  element={ <PrivateRoute> <SUPPILER_MASS_UPLOAD/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SUPPLIER_DETAILED_PAGE_CREATE}  element={ <PrivateRoute> <SUPPLIER_DETAILED_PAGE_CREATE/>  </PrivateRoute>  } />

                <Route  exact path={ConstantsList.SOURCING_PURCHASE_REQUISITION}  element={ <PrivateRoute> <SOURCING_PURCHASE_REQUISITION/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SOURCING_REQUEST_FOR_QUOTATION}  element={ <PrivateRoute> <SOURCING_REQUEST_FOR_QUOTATION/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SOURCING_CREATE_RFQ}  element={ <PrivateRoute> <SOURCING_CREATE_RFQ/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SOURCING_QUOTATION}  element={ <PrivateRoute> <SOURCING_QUOTATION/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SOURCING_PURCHASE_REQUISITION_DETAILED_PAGE}  element={ <PrivateRoute> <SOURCING_PURCHASE_REQUISITION_DETAILED_PAGE/>  </PrivateRoute>  } />
               
                <Route  exact path={ConstantsList.POCOLLABRATION_PURCHASE_ORDER}  element={ <PrivateRoute> <POCOLLABRATION_PURCHASE_ORDER/>  </PrivateRoute>  } />      
                <Route  exact path={ConstantsList.POCOLLABRATION_GOODS_RECEIVED_NOTE}  element={ <PrivateRoute> <POCOLLABRATION_GOODS_RECEIVED_NOTE/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.POCOLLABRATION_SERVICE_ENTRY_SHEET}  element={ <PrivateRoute> <POCOLLABRATION_SERVICE_ENTRY_SHEET/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.POCOLLABRATION_INVOICE}  element={ <PrivateRoute> <POCOLLABRATION_INVOICE/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.POCOLLABRATION_PAYMENT}  element={ <PrivateRoute> <POCOLLABRATION_PAYMENT/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.POCOLLABRATION_PURCHASE_ORDER_DETAIL_PAGE}  element={ <PrivateRoute> <POCOLLABRATION_PURCHASE_ORDER_DETAIL_PAGE/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.POCOLLABRATION_ASN}  element={ <PrivateRoute> <POCOLLABRATION_ASN/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.POCOLLABRATION_ASN_DETAIL_PAGE}  element={ <PrivateRoute> <POCOLLABRATION_ASN_DETAIL_PAGE/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.POCOLLABRATION_SCHEDULING_AGREEMENT}  element={ <PrivateRoute> <POCOLLABRATION_SCHEDULING_AGREEMENT/>  </PrivateRoute>  } />

                <Route  exact path={ConstantsList.SAPREPROCESS_GRN_REPROCESS}  element={ <PrivateRoute> <SAPREPROCESS_GRN_REPROCESS/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SAPREPROCESS_SES_REPROCESS}  element={ <PrivateRoute> <SAPREPROCESS_SES_REPROCESS/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.SAPREPROCESS_INVOICE_REPROCESS}  element={ <PrivateRoute> <SAPREPROCESS_INVOICE_REPROCESS/>  </PrivateRoute>  } />


                <Route  exact path={ConstantsList.ADMIN_MANAGE_ROLE}  element={ <PrivateRoute> <ADMIN_MANAGE_ROLE/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.ADMIN_MANAGE_USER}  element={ <PrivateRoute> <ADMIN_MANAGE_USER/>  </PrivateRoute>  } />

                <Route  exact path={ConstantsList.AUCTION_REVERSE_AUCTION_LIST}  element={ <PrivateRoute> <AUCTION_REVERSE_AUCTION_LIST/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.AUCTION_REVERSE_AUCTION_HISTORY}  element={ <PrivateRoute> <AUCTION_REVERSE_AUCTION_HISTORY/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.AUCTION_FORWARD_AUCTION_LIST}  element={ <PrivateRoute> <AUCTION_FORWARD_AUCTION_LIST/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.AUCTION_FORWARD_AUCTION_HISTORY}  element={ <PrivateRoute> <AUCTION_FORWARD_AUCTION_HISTORY/>  </PrivateRoute>  } />

                <Route  exact path={ConstantsList.CONTRACTMANAGEMENT_CONTRACT_GENERATE_LIST}  element={ <PrivateRoute> <CONTRACTMANAGEMENT_CONTRACT_GENERATE_LIST/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.CONTRACTMANAGEMENT_CONTRACT_REVIEW_LIST}  element={ <PrivateRoute> <CONTRACTMANAGEMENT_CONTRACT_REVIEW_LIST/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.CONTRACTMANAGEMENT_CONTRACT_DRAFT_TO_FINAL_LIST}  element={ <PrivateRoute> <CONTRACTMANAGEMENT_CONTRACT_DRAFT_TO_FINAL_LIST/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.CONTRACTMANAGEMENT_MONITORING_LIST}  element={ <PrivateRoute> <CONTRACTMANAGEMENT_MONITORING_LIST/>  </PrivateRoute>  } />

                <Route  exact path={ConstantsList.GATEPASS_GATEPASS_LIST}  element={ <PrivateRoute> <GATEPASS_GATEPASS_LIST/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.GATEPASS_GATEPASS_CREATE}  element={ <PrivateRoute> <GATEPASS_GATEPASS_CREATE/>  </PrivateRoute>  } />
                <Route  exact path={ConstantsList.GATEPASS_GATEPASS_DETAIL_PAGE}  element={ <PrivateRoute> <GATEPASS_GATEPASS_DETAIL_PAGE/>  </PrivateRoute>  } /> */}
                
                {/* supplier_app ENDs here */}

                {/* <Route exact path='/test' element={<Test />}></Route> */}
            </Routes>  
            {/* <Footer/> */}
        </>
    );
}


export default RouterNav;