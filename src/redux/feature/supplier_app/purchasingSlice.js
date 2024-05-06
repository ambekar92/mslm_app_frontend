/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemService from "../../../services/supplier_appCommonService";


const initialState = {
    purchase_order:{
        data:[],
        status:true,
        poNumber:''
    },
    single_purchase_order:{
        data:{},
        status:true,
    },
    goods_received_note:{
        data:[],
        status:true,
    },
    asn:{
        data:[],
        status:true,
        asnNumber:''
    },
    // status:true,
};

export const purchasingSlice = createSlice({
    name: "purchasing",
    initialState,
    reducers: {
        addRfqData(state, action){
            return {
                ...state,
                data:{
                    ...state.data,  ...action.payload
                },
            }

        },
        addPoDetailNumber(state,action){
            state.purchase_order.poNumber = action.payload
        },
        addASNDetailNumber(state,action){
            state.asn.asnNumber = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getPurchaseOrder.fulfilled, (state,action)=>{
            state.purchase_order.data = action.payload;
            state.status = true;
        })
        .addCase(getGoodsReceivedNote.fulfilled, (state,action)=>{
            state.goods_received_note.data = action.payload;
            state.status = true;
        })
        .addCase(getASN.fulfilled, (state,action)=>{
            state.asn.data = action.payload;
            state.status = true;
        })

    }
  });

export const { addUser} = purchasingSlice.actions;
export default purchasingSlice.reducer;

export const { addPoDetailNumber, addASNDetailNumber} = purchasingSlice.actions;

export const getPurchaseOrder = createAsyncThunk('getPurchaseOrder', async (param) =>{
    console.log(">> loaded getPurchaseOrder");
    const res = await ItemService.getPurchaseOrder(param);
    return res.data;
})
export const getGoodsReceivedNote = createAsyncThunk('getGoodsReceivedNote', async () =>{
    console.log(">> loaded getGoodsReceivedNote");
    const res = await ItemService.getGoodsReceivedNote();
    return res.data;
})
export const getASN = createAsyncThunk('getASN', async () =>{
    console.log(">> loaded getASN");
    const res = await ItemService.getASN();
    return res.data;
})

