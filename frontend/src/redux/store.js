import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userRedux'
import adminReducer from './adminRedux'

export default configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer
    }
})