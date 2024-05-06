/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemService from "../../../services/supplier_appCommonService";

const initialState = {
    data:[],
    status:true,
    gatepassNr:''
};

export const gatepassSlice = createSlice({
    name: "gatepass",
    initialState,
    reducers: {
        addGatepassDetailNumber(state,action){
            state.gatepassNr = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getGatepassList.fulfilled, (state,action)=>{
            state.data = action.payload;
            state.status = true;
        })        
    }
  });

export const { addGatepassDetailNumber } = gatepassSlice.actions;
export default gatepassSlice.reducer;

export const getGatepassList = createAsyncThunk('getGatepassList', async () =>{
    console.log(">> loaded getGatepassList");
    const res = await ItemService.getGatepassList();
    return res.data;
})

