import styled from 'styled-components'

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
    font-size: 12px;
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

const Register= () => {
  return (
    <Container>
        <Wrapper>
            <Title>Create an Account</Title>
            <Form>
                <Input placeholder='first name'/>
                <Input placeholder='last name'/>
                <Input placeholder='user name'/>
                <Input placeholder='email'/>
                <Input placeholder='password'/>
                <Input placeholder='confirm password'/>
                <Agreement>By creating an account, I consent to the processing
                    of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button>CREATE</Button>
            </Form>
        </Wrapper>       
    </Container>
  )
}

export default Register