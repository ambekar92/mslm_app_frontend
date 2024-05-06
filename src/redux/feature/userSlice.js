/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemService from "../../services/supplier_appCommonService";


const initialState = {
    data:[],
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
