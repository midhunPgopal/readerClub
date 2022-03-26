import {loginStart, loginSuccess, loginFailure, logOut} from './userRedux'
import {publicRequest} from '../requestMethods'

export const loginOtp = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/auth/otpverify', user)
        alert('Login succesful')
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}
export const logout = async (dispatch) => {
    alert('User logged out')
    dispatch(logOut())
}