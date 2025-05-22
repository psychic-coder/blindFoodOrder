import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  completed: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      state.completed = false;
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
      state.completed = false;
    },
    completeOrders: (state) => {
      if (state.orders.length > 0) {
        state.completed = true;
        state.orders = [];
      }
    },
    expireOrders: (state) => {
      state.orders = [];
      state.completed = false;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.completed = false;
    },
  },
});

export const {
  addOrder,
  deleteOrder,
  clearOrders,
  completeOrders,
  expireOrders,
  setOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
