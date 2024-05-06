import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";

import  userSlice  from "./feature/userSlice";

import  menuSlice  from "./feature/supplier_app/menuSlice";
import  sourcingSlice  from "./feature/supplier_app/sourcingSlice";
import  supplierSlice  from "./feature/supplier_app/supplierSlice";
import  purchasingSlice  from "./feature/supplier_app/purchasingSlice";
import  gatepassSlice  from "./feature/supplier_app/gatepassSlice";

const store = configureStore({
  reducer: {
    user : userSlice,

    menu : menuSlice,
    sourcing : sourcingSlice,
    supplier : supplierSlice,
    purchasing : purchasingSlice,
    gatepass : gatepassSlice,
  }
});

export default store;

// export const useAppDispatch = useDispatch;
// export const useAppSelector = useSelector;
