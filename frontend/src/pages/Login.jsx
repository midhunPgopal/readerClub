import styled from 'styled-components'

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
`
const Link = styled.a`
    margin: 5px 0px;
    font-size: 18px;
    text-decoration: underline;
    cursor: pointer;
`

const Login = () => {
  return (
    <Container>
        <Wrapper>
            <Title>Login to your Account</Title>
            <Form>
                <Input placeholder='user name'/>
                <Input placeholder='password'/>
                <Button>LOGIN</Button>
                <Link>Forgot password?</Link>
                <Link>Create new Account</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login