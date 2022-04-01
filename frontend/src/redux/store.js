import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userRedux'
import cartReducer from './cartRedux'

export default configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
})