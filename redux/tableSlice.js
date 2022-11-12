import { createSlice } from '@reduxjs/toolkit'

const tableSlice = createSlice({
  name: 'tableCart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
      state.quantity += 1
      state.total += action.payload.price * action.payload.quantity
    },
    removeProduct: (state, action) => {
      const removeProducts = state.products.filter((item) => item._id !== action.payload._id)
      state.products = removeProducts
      state.quantity -= 1
      state.total -= action.payload.price * action.payload.quantity
    },
    reset: (state) => {
      state.products = []
      state.quantity = 0
      state.total = 0
    },
  },
})

export const { addProduct, removeProduct, reset } = tableSlice.actions
export default tableSlice.reducer
