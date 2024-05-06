import config from './configuration'
import ConstantsList from '../common/Constants';

// this block needed to get the login Token and Login user _id 
let localData = localStorage.getItem('userData');
let userData={}
if(localData){
    userData = JSON.parse(localData);
}

/* Service Function starts here */

//POST - getMenuOnUserRole
async function getMenuOnUserRole(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getMenu";
    return callGET(api_url, param);
}

// get info from the configuration.js file
async function getConfig() {
    return config;
}

//POST - Get User Login Details using _id
async function getLoginUserData() { // This method calling from Redux
    let api_url= config.BASE_URL + 'api/getUserDetails';
    let param = {"_id" : userData.data._id}
    return callPOST(api_url, param);
}

// API Error Handling
async function handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
}

// API Error Handling
async function handleError(error) {
    console.log(error.message);
}

// Common GET Method 
async function callGET(api_url) {
    return fetch(api_url,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization": 'Bearer '+ userData.token
                }
            }).then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                if(items.responseCode !== 401){
                    // console.log(">> GET Service Call",items);
                    return items;
                }else{
                    console.log(">> Session Timeout",items);
                    localStorage.setItem('token',''); 
                    localStorage.setItem('userData','');
                    window.location = ConstantsList.LOGIN;
                }            
            }).catch(error => {
                console.log(">> e", error);
                handleError(error);
            });
}

// Common POST Method
async function callPOST(api_url,param) {
    // console.log(">> check URL", api_url);
    return await fetch(api_url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization": 'Bearer '+ userData.token
                },
                body:JSON.stringify(param)
            }).then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                // console.log(">> Service Login Data",items);
                if(items.responseCode !== 401){
                    // console.log(">> POST Service Call",items);
                    return items;
                }else{
                    console.log(">> Session Timeout",items);
                    localStorage.setItem('token',''); 
                    localStorage.setItem('userData','');
                    window.location = ConstantsList.LOGIN;
                }     
               
            }).catch(error => {
                handleError(error);
            });
}

// Common POST Method for Upload
async function callPOSTUpload(api_url,param) {
    // console.log(">>callPOSTUpload param ", param);
    return await fetch(api_url,{
                method:'POST',
                headers:{
                    // 'Content-Type': 'multipart/form-data',
                    "Authorization": 'Bearer '+ userData.token,
                },
                body:param
            }).then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                // console.log(">> Service Login Data",items);
                if(items.responseCode !== 401){
                    // console.log(">> POST Service Call",items);
                    return items;
                }else{
                    console.log(">> Session Timeout",items);
                    localStorage.setItem('token',''); 
                    localStorage.setItem('userData','');
                    window.location = ConstantsList.LOGIN;
                }     
               
            }).catch(error => {
                handleError(error);
            });
}


//POST - LOGIN USER
async function login(param) {
    let api_url= config.BASE_URL + 'api/login';
    return fetch(api_url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify(param)
            }).then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                if(items.status === 200){
                    console.log(">> Service Login Data",items);
                    localStorage.setItem('token',items.token); 
                    localStorage.setItem('userData',JSON.stringify(items)); 
                    // sessionStorage.setItem('token',items.token); 
                    return items;
                }else{
                    return items;
                }
              
            }).catch(error => {
                handleError(error);
            });
}

//POST - LOGOUT USER
async function logout(param) {
    let api_url= config.BASE_URL + 'api/logout';
    return fetch(api_url,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authentication": 'Bearer '+ userData.token
        },
        body:JSON.stringify(param)
    }).then(response => {
        if (!response.ok) {
            handleResponseError(response);
        }
        return response.json();
    }).then(items => {
        console.log(">> Service Logout",items);
        localStorage.setItem('token',''); 
        localStorage.setItem('userData',''); 
        return items;
    }).catch(error => {
        handleError(error);
    });
}

//POST - REGISTER USER
async function registerUser(param) {
    let api_url= config.BASE_URL + 'api/register';
    return callPOST(api_url,param);
}

//POST - USER PROFILE IMAGE UPLOAD 
async function uploadImg(param) {
    let api_url= config.BASE_URL + 'api/uploadImg';
    return callPOSTUpload(api_url,param);
}

/* ---------------------------- Sourcing --------------------------------*/

//POST - getRfqQuotation
async function getRfqQuotation(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getRequestForQuotation";
    return callPOST(api_url, param);
}
//POST - getPurchaseRequisition
async function getPurchaseRequisition(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getPurchaseRequisition";
    return callPOST(api_url, param);
}
//POST - getQuotation
async function getQuotation(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getQuotation";
    return callPOST(api_url, param);
}


/* ---------------------------- Supplier --------------------------------*/

//POST - getSupplierList
async function getSupplierList(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getSupplierList";
    return callPOST(api_url, param);
}
//POST - getSupplierCategorySelection
async function getSupplierCategorySelection(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getSupplierCategorySelection";
    return callPOST(api_url, param);
}
//POST - getSupplierCategorySelection
async function addSupplier(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/addSupplier";
    return callPOST(api_url, param);
}

/* ---------------------------- PO COLLABRATION --------------------------------*/
//POST - getPurchaseOrder
async function getPurchaseOrder(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getPurchaseOrder";
    return callPOST(api_url, param);
}

//POST - getGoodsReceivedNote
async function getGoodsReceivedNote(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getGoodsReceivedNote";
    return callPOST(api_url, param);
}

//POST - getASN
async function getASN(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getasn";
    return callPOST(api_url, param);
}

/* ---------------------------- Gatepass --------------------------------*/
//POST - getGatepassList
async function getGatepassList(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/getGatepassList";
    return callPOST(api_url, param);
}

//POST - getGatepass Create
async function getGatepassCreate(param) { // This method calling from Redux
    let api_url= config.BASE_URL + "api/addGatepass";
    return callPOST(api_url, param);
}

const func = {
    login,
    logout,
    registerUser,
    uploadImg,
    getConfig,
    getMenuOnUserRole,
    getLoginUserData,
    handleResponseError,
    handleError,
    callGET,
    callPOST,
    callPOSTUpload,

    getRfqQuotation,
    getPurchaseRequisition,
    getQuotation,

    getSupplierList,
    getSupplierCategorySelection,
    addSupplier,

    getPurchaseOrder,
    getGoodsReceivedNote,
    getASN,

    getGatepassList,
    getGatepassCreate,
};

export default func;