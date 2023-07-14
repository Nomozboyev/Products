import { createSlice } from "@reduxjs/toolkit";

export const { actions: productActions, reducer: productRedusers } =
  createSlice({
    name: "Products",
    initialState: {
      products: [],
      spin: false,
      selectedRowKeys: [],
      control: false,
      token:  ''
    },
    reducers: {
      productData(state, actions) {
        const data = actions.payload;
        data.forEach((el) => {
          state.products = [
            ...state.products,
            {
              id: el.id,
              key: el.id,
              code: el.code,
              color: el.color,
              createdAt: el.createdAt,
              description: el.description,
              image: el.image,
              madeIn: el.madeIn,
              name: el.name,
              price: el.price,
              priceInSale: el.priceInSale,
              passwor: el.passwor,
              email: el.email,
              brand: el.brand,
            },
          ];
        });
      },
      spinFincsion(state, actions) {
        state.spin = actions.payload;
      },

      reRenderData(state) {
        state.products = [];
      },
      setSelectedRowKeys(state, actions) {
        state.selectedRowKeys = actions.payload;
      },
      referesh(state) {
        state.control = !state.control;
      },
      token(state, actions) {
        state.token = actions.payload;
      },
    },
  });
