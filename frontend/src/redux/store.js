import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userRedux'
import cartReducer from './cartRedux'
import adminReducer from './adminRedux'

export default configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        admin: adminReducer
    }
})