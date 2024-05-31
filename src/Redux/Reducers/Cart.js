import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
    subTotal: 0,
    total: 0,
  },
  reducers: {
    saveAllProducts: (state, action) => {
      return { ...state, items: action.payload };
    },
    quantityChange: (state, action) => {
      const { id, value } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      );
    },
    updateSubTotal: (state, action) => {
      return { ...state, subTotal: action.payload };
    },
    updateTotal: (state, action) => {
      return { ...state, total: action.payload };
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const { saveAllProducts, quantityChange, updateSubTotal, updateTotal, removeItem } = CartSlice.actions;
export default CartSlice.reducer;
