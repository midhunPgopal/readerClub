import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { mobile } from '../../responsive'
import ErrorNotice from '../../error/ErrorNotice'
import { loginStart, loginSuccess, loginFailure } from '../../redux/userRedux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

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
    padding: 5px;
    color: #f16969;
`
const Extra = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
toast.configure()
const Login = () => {
    const dispatch = useDispatch()

    const { isFetching } = useSelector(state => state.user)

    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const [errUser, setErrUser] = useState()
    const [errPassword, setErrPassword] = useState()

    const notify = () => toast.success('Now you can order', {
        position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const onSubmit = (data) => {
        setErrUser()
        setErrPassword()
        const login = async (dispatch) => {
            dispatch(loginStart())
            try {
                const res = await axios.post('http://localhost:3001/api/auth/login', data)
                notify()
                dispatch(loginSuccess(res.data))
            } catch (error) {
                error.response.data.user && setErrUser(error.response.data.user)
                error.response.data.password && setErrPassword(error.response.data.password)
                dispatch(loginFailure())
            }
        }
        login(dispatch, { data })
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Label>Username</Label>
                    <Input id="username" placeholder='Username' {...register('username', { required: true })} />
                    <Error>
                        {errors.username && errors.username.type === "required" && <span>This is required</span>}
                        {errUser && <ErrorNotice message={errUser} />}
                    </Error>
                    <Label>Password</Label>
                    <Input id="password" type='password' placeholder='Password' {...register('password', { required: true })} />
                    <Error>
                        {errors.password && errors.password.type === "required" && <span>This is required</span>}
                        {errPassword && <ErrorNotice message={errPassword} />}
                    </Error>
                    <Bottom>
                        <Button type='submit' disabled={isFetching}>LOGIN</Button>
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