/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemService from "../../services/supplier_appCommonService";


const initialState = {
    data:[{
        "_id" : "6557065be1ab9d27d75cba66",
        "compId" : "55ce3f9a-6cc5-4114-b1ad-83d1941adb09",
        "firstName" : "Maruthi",
        "lastName" : "S",
        "password" : "$2b$12$Hre1E.ELkCbMaf0XHGeAkuXCDUF7eeWOOq/89kGEjFScQID3gxl0q",
        "email" : "maruthi@abc.com",
        "contactNumber" : "9844176733",
        "companyName" : "Workers Hive Pvt Ltd",
        "mailToken" : "d708oiwwrwrHir",
        "isMailValidated" : true,
        "role" : "ADMIN",
        "description" : "lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom lipsom ",
        "companyLogoPath" : "companyLogo/company_6557065be1ab9d27d75cba66.jpeg",
        "oldPassword" : "$2b$12$eVEYgM5Yc66U9dvY1pRtDuy/LSoFm8RcSlVywSYWt6wUVIlWPcSvO",
        "profileImgPath" : "profileImg/profile_6557065be1ab9d27d75cba66.jpeg",
        "paymentStatus" : "",
        "makePaymentStatus" : false,
        "forgotPasswordToken" : "InvalidToVerifyPasswordadf8oiokeHwioo",
        "modified_password_DT" : "2024-04-18 12:31:43",
        "timezone" : "Asia/Calcutta"
    }],
    status:true,
    config:[],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action){
            return {
                ...state,
                data:{
                    ...state.data,  ...action.payload
                },
            }

        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getLoginUserData.pending, (state,action)=>{
            state.status = false
        })
        .addCase(getLoginUserData.fulfilled, (state,action)=>{
            state.data = action.payload;
            state.status = true;
        })
        .addCase(getLoginUserData.rejected, (state,action)=>{
            state.status = false;
        })
        .addCase(getUserConfigData.fulfilled, (state,action)=>{
            state.config = action.payload;
        })
    }
  });

export const { addUser} = userSlice.actions;
export default userSlice.reducer;

export const getLoginUserData = createAsyncThunk('loginUser', async () =>{
    console.log(">> loaded LoginUserData");
    const res = await ItemService.getLoginUserData();
    return res.data[0];
})

export const getUserConfigData = createAsyncThunk('userConfig', async (param) =>{
    console.log(">> loaded getUserConfigData");
    const res = await ItemService.getUserConfigData(param);
    let obj = {
        AMOUNT_DIFF : res.AMOUNT_DIFF,
        PERCENTAGE_AMOUNT : res.PERCENTAGE_AMOUNT,
        COMP_PRICE_DATA: res.COMP_PRICE_DATA[0]
    }
    return obj;
})
