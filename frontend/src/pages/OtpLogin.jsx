import { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { publicRequest } from '../requestMethods'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '../redux/userRedux'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), 
        url('https://wallpapercave.com/wp/wp2036914.jpg') center;
    background-size: cover;
`
const Wrapper = styled.div`
    width: 35%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: '75%' })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`
const Bottom = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Button = styled.button`
    width: 30%;
    border: none;
    padding: 10px 5px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;

    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`
const Error = styled.span`
    font-size: 18px;
    padding: 5px 10px;
    color: #f16969;
`
const Extra = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`

const OtpLogin = () => {
    const [mobile, setMobile] = useState('')
    const [number, setNumber] = useState()
    const [otp, setOtp] = useState()
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.user)
    const [err, setErr] = useState()

    const submitNumber = async (e) => {
        e.preventDefault()
        try {
            const response = await publicRequest.post('/auth/otplogin', { mobile })
            setNumber(response.data.mobile)
            setErr()
        } catch (error) {
            error.response.data.msg && setErr(error.response.data.msg)
        }
    }
    const submitOtp = async (e) => {
        e.preventDefault()
        const loginOtp = async (dispatch, user) => {
            dispatch(loginStart())
            try {
                const res = await publicRequest.post('/auth/otpverify', user)
                alert('Login succesful')
                dispatch(loginSuccess(res.data))
            } catch (error) {
                dispatch(loginFailure())
            }
        }       
        loginOtp(dispatch, { number, otp })
    }

    return (
        <Container>
            <Wrapper>
            <Extra>
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        Password Login
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        Home
                    </Link>
                </Extra>
                <Title>Registered mobile number</Title>
                <Form>
                    <Input
                        placeholder='Mobile'
                        type='number'
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <Bottom>
                        <Button onClick={submitNumber}>ENTER</Button>
                        {err && <Error>{err}</Error>}
                    </Bottom>
                    {number &&
                        <Form>
                            <Input
                                placeholder='OTP'
                                type='number'
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Bottom>
                                <Button onClick={submitOtp} disabled={isFetching}>SUBMIT</Button>
                            </Bottom>
                        </Form>
                    }
                </Form>
            </Wrapper>
        </Container>
    )
}

export default OtpLogin