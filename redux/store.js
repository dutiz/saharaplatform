import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cartSlice'
import tableRecuder from './tableSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    tableCart: tableRecuder,
  },
})
