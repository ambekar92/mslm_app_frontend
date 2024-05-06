/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemService from "../../../services/supplier_appCommonService";


const initialState = {
    data:[],
    category_selection:{
        data:[],
        status:true,
    },
    selectedCategory:[],
    status:true,
    supplierID:''
};

export const supplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {
        addCategorySelectedData(state, action){
          state.selectedCategory = action.payload || [];
        },
        addsupplierID(state, action){
            state.supplierID = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getSupplierList.fulfilled, (state,action)=>{
            state.data = action.payload;
            state.status = true;
        })
        .addCase(getSupplierCategorySelection.fulfilled, (state,action)=>{
            state.category_selection.data = action.payload;
            state.status = true;
        })
    }
  });

export const { addCategorySelectedData, addsupplierID } = supplierSlice.actions;
export default supplierSlice.reducer;

export const getSupplierList = createAsyncThunk('getSupplierList', async () =>{
    console.log(">> loaded getSupplierList");
    const res = await ItemService.getSupplierList();
    return res.data;
})
export const getSupplierCategorySelection = createAsyncThunk('getSupplierCategorySelection', async () =>{
    console.log(">> loaded getSupplierCategorySelection");
    const res = await ItemService.getSupplierCategorySelection();
    return res.data;
})
