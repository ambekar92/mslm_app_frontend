/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ItemService from "../../../services/supplier_appCommonService";


const initialState = {
    data:[],
    status:false,
};

export const menuSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getMenuOnUserRole.fulfilled, (state,action)=>{
            state.data = action.payload;
            state.status = true;
        })
    }
  });

// export const { addCategorySelectedData } = menuSlice.actions;
export default menuSlice.reducer;

export const getMenuOnUserRole = createAsyncThunk('getMenuOnUserRole', async () =>{
    console.log(">> loaded getMenuOnUserRole");
    const res = await ItemService.getMenuOnUserRole();
    return res.data;
})

