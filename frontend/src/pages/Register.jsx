import { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { publicRequest } from '../requestMethods'
import { mobile } from '../responsive'
import ErrorNotice from '../error/ErrorNotice'

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
    ${mobile({ width: '75%', padding: '5px' })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    ${mobile({ fontSize: '15px' })}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    ${mobile({ flexDirection: 'column' })}
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 10px 0px 0px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const Bottom = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Agreement = styled.span`
    font-size: 14px;
    margin: 20px 0px;
    ${mobile({ fontSize: '8px' })}
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    ${mobile({ padding: '5px', fontSize: '10px' })}
`
const Error = styled.span`
    font-size: 14px;
    margin: 10px 0px;
    padding: 5px 10px;
    color: #f16969;
`
const Links = styled.a`
    margin: 10px px;
    font-size: 18px;
    text-decoration: underline;
    cursor: pointer;
`

const Register = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [err, setErr] = useState()

    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        try {
            const newUser = { name, username, email, mobile, password, cpassword }
            await publicRequest.post('/auth/register', newUser)
            alert('successful')
            navigate('/login')
        } catch (error) {
            error.response.data.msg && setErr(error.response.data.msg)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>Create an Account</Title>
                <Form>
                    <Input
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder='User name'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder='Email'
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder='Mobile'
                        type='number'
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <Input
                        placeholder='Password'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        placeholder='Confirm Password'
                        type='password'
                        onChange={(e) => setCpassword(e.target.value)}
                    />
                    <Agreement>By creating an account, I consent to the processing
                        of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Bottom>
                        <Button onClick={submit}>CREATE</Button>
                        <Error>
                            {err && <ErrorNotice message={err} />}
                        </Error>
                        <Link to='/login'>
                            <Links>Already have an account</Links>
                        </Link>
                    </Bottom>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register