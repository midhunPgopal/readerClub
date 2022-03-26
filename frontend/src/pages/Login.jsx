import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// import { login } from '../redux/apiCalls'
import { Link } from 'react-router-dom'
import { mobile } from '../responsive'
import ErrorNotice from '../error/ErrorNotice'
import { loginStart, loginSuccess, loginFailure } from '../redux/userRedux'
import { publicRequest } from '../requestMethods'

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
    display
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
const Links = styled.a`
    margin: 5px 0px;
    font-size: 18px;
    text-decoration: underline;
    cursor: pointer;
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

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState()
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault()
        const login = async (dispatch, user) => {
            dispatch(loginStart())
            try {
                const res = await publicRequest.post('/auth/login', user)
                alert('Login succesful')
                dispatch(loginSuccess(res.data))
            } catch (error) {
                error.response.data.msg && setErr(error.response.data.msg)
                dispatch(loginFailure())
            }
        }
        login(dispatch, { username, password })
    }

    return (
        <Container>
            <Wrapper>
                <Extra>
                    <Link to='/otplogin' style={{ textDecoration: 'none' }}>
                        OTP Login
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        Home
                    </Link>
                </Extra>
                <Title>Login to your Account</Title>
                <Form>
                    <Input
                        placeholder='User name'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder='Password'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Bottom>
                        <Button onClick={handleClick} disabled={isFetching} >LOGIN</Button>
                        <Error>
                        {err && <ErrorNotice message={err}/>}
                        </Error>
                        <Links>Forgot password?</Links>
                        <Link to='/register'>
                            <Links>Create new Account</Links>
                        </Link>
                    </Bottom>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login