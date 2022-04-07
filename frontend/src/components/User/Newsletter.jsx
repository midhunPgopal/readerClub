import styled from 'styled-components'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useForm } from 'react-hook-form'
import { mobile } from '../../responsive';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
import ErrorNotice from '../../error/ErrorNotice';

const Container = styled.div`
    height: 60vh;
    background-color: #e6bfe681;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`

const Description = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: 'center' })}
`

const Form = styled.form`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1 px solid lightgray;
`
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const Error = styled.span`
    font-size: 14px;
    padding: 5px;
    color: #f16969;
`

toast.configure()
const Newsletter = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const[err, setErr] = useState()

    const notify = () => toast.success('Subscribed', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const onSubmit = async (data) => {
        try {
            setErr()
            await axios.post('http://localhost:3001/api/newsletter', data)
            notify()
        } catch (error) {
            error.response.data.msg && setErr(error.response.data.msg)
        }
    }
    
    return (
        <Container>
            <Title>NewsLetter</Title>
            <Description>Get timely updates from our side..</Description>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input id="email" placeholder='Enter your email here' {...register('email', {
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })} />
                <Error>
                    {errors.email && errors.email.type === "required" && <span>This is required</span>}
                    {errors.email && errors.email.type === "pattern" && <span>Invalid email</span>}
                    {err && <ErrorNotice message={err} />}
                </Error>
                <Button type='submit'>
                    <SendOutlinedIcon />
                </Button>
            </Form>
        </Container>
    )
}

export default Newsletter