import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import {Link} from 'react-router-dom'
import { mobile } from '../responsive'

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
    ${mobile({ width: '75%'})}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
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
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const {isFetching, error} = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, {username, password})
    }

  return (
    <Container>
        <Wrapper>
            <Title>Login to your Account</Title>
            <Form>
                <Input 
                    placeholder='user name'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input 
                    placeholder='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleClick} disabled={isFetching} >LOGIN</Button>
                {error && <Error>Something went wrong</Error>}
                <Links>Forgot password?</Links>
                <Link to='/register'>
                    <Links>Create new Account</Links>
                </Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login