/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemService from "../../../services/supplier_appCommonService";


const initialState = {
    rfq:{
        data:[],
        status:true,
    },
    purchase_requisition:{
        data:[],
        status:true,
        prNumber:''
    },
    quotation:{
        data:[],
        status:true,
    },
    status:true,
};

export const sourcingSlice = createSlice({
    name: "sourcing",
    initialState,
    reducers: {
        addPrDetailNumber(state, action){
            state.purchase_requisition.prNumber = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getRfqQuotation.fulfilled, (state,action)=>{
            state.rfq.data = action.payload;
            state.status = true;
        })
        .addCase(getPurchaseRequisition.fulfilled, (state,action)=>{
            state.purchase_requisition.data = action.payload;
            state.status = true;
        })
        .addCase(getQuotation.fulfilled, (state,action)=>{
            state.quotation.data = action.payload;
            state.status = true;
        })


    }
  });

export const { addPrDetailNumber} = sourcingSlice.actions;
export default sourcingSlice.reducer;

export const getRfqQuotation = createAsyncThunk('getRfqQuotation', async () =>{
    console.log(">> loaded getRfqQuotation");
    const res = await ItemService.getRfqQuotation();
    return res.data;
})

export const getPurchaseRequisition = createAsyncThunk('getPurchaseRequisition', async () =>{
    console.log(">> loaded getPurchaseRequisition");
    const res = await ItemService.getPurchaseRequisition();
    return res.data;
})

export const getQuotation = createAsyncThunk('getQuotation', async () =>{
    console.log(">> loaded getQuotation");
    const res = await ItemService.getQuotation();
    return res.data;
})
