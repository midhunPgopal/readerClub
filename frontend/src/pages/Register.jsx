import { useState } from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {publicRequest} from '../requestMethods'
import { mobile } from '../responsive'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
        url('https://wallpapercave.com/wp/wp2036907.jpg') center;
    background-size: cover;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: '75%', padding: '5px'})}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    ${mobile({ fontSize: '15px'})}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    ${mobile({ flexDirection: 'column'})}
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px'})}
`
const Agreement = styled.span`
    font-size: 14px;
    margin: 20px 0px;
    ${mobile({ fontSize: '8px'})}
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    ${mobile({ padding: '5px', fontSize:'10px'})}
`
const Error = styled.span`
    margin: 10px 0px;
    color: red;
`

const Register= () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const[error, setError] = useState()

    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        try {
            const newUser = {name, username, email, password, cpassword}
            await publicRequest.post('/auth/register', newUser)
            navigate('/login')
        } catch (error) {
            console.log(error);
            error.response.data.msg && setError(error.response.data.msg)
        }
    }

  return (
    <Container>
        <Wrapper>
            <Title>Create an Account</Title>
            <Form>
                <Input 
                    placeholder='name'
                    onChange={(e) => setName(e.target.value)}
                />
                <Input 
                    placeholder='user name'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input 
                    placeholder='email'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    placeholder='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}    
                />
                <Input 
                    placeholder='confirm password'
                    type='password'
                    onChange={(e) => setCpassword(e.target.value)}
                />
                <Agreement>By creating an account, I consent to the processing
                    of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={submit}>CREATE</Button>
                {error && <Error>Something went wrong</Error>}
            </Form>
        </Wrapper>       
    </Container>
  )
}

export default Register