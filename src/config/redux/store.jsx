import { configureStore } from "@reduxjs/toolkit";
import { productRedusers } from "../productStore/productStor";

export const store = configureStore({
  reducer: {
    productRedusers,
  },
});
