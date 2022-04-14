import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import { logOut } from '../../redux/userRedux'

const Button = styled.button`
margin: 20px;
padding: 10px;
border: none;
background-color: teal;
color: white;
cursor: pointer;

&:hover {
  background-color: #26e090fe;
}

`
const Form = styled.form`
    margin-left: 50px;
`
const Input = styled.input`
    width: 300px;
    margin: 10px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const Error = styled.span`
    font-size: 14px;
    padding: 5px;
    color: #f16969;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonContainer = styled.div`
    margin: 20px;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
toast.configure()
function UserDetails() {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.currentUser)
    const { register, handleSubmit, formState: { errors } } = useForm()

    let userId = null
    let header = null

    if (user) {
        userId = user.user._id
        header = user.accessToken
    }
    const [flag, setFlag] = useState(false)
    const [check, setCheck] = useState(false)
    const [data, setData] = useState(false)
    const [address, setAddress] = useState()

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })
    const notifyError = (msg) => toast.error(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const getUserDetails = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/userDetails/' + userId, { headers: { header } })
            if (res.data.length > 0) {
                setCheck(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getAddress = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/address/' + userId, { headers: { header } })
            console.log(res.data);
            setAddress(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const addUserDetails = async (data) => {
        try {
            const payload = { ...data, userId }
            const res = await axios.post('http://localhost:3001/api/userdetails/', payload, { headers: { header, userId } })
            setFlag(false)
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
            error.response.data.msg && notifyError(error.response.data.msg)
            error.response.data.status && dispatch(logOut()) && notifyError(error.response.data.msg)
        }
    }
    const addAddress = async (data) => {
        try {
            const payload = { ...data, userId }
            const res = await axios.post('http://localhost:3001/api/address/', payload, { headers: { header, userId } })
            setData(false)
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
            error.response.data.msg && notifyError(error.response.data.msg)
            error.response.data.status && dispatch(logOut()) && notifyError(error.response.data.msg)
        }
    }
    useEffect(() => {
        getUserDetails()
        getAddress()
    }, [])
    return (
        <>
            {check ?
                <Button>Update User Details</Button> :
                <Button onClick={() => setFlag(true)}>Add User Details</Button>
            }
            <Button onClick={() => setData(true)}>Add Address</Button>
            {flag &&
                <Form onSubmit={handleSubmit(addUserDetails)}>
                    <InputContainer>
                        <Label>Gender
                            <Input id="gender" type='text' placeholder='Gender if you wish to save' {...register('gender')} />
                        </Label>
                        <Label>Proffession
                            <Input id="pincode" type='text' placeholder='Your pincode' {...register('pincode', { required: true })} />
                            <Error>
                                {errors.pincode && errors.pincode.type === "required" && <span>This is required</span>}
                            </Error>
                        </Label>
                        <Label>Image source link
                            <Input id="landmark" type='text' placeholder='Image source link' {...register('landmark')} />
                        </Label>
                    </InputContainer>
                    <ButtonContainer>
                        <ButtonSubmit type='submit'>Add</ButtonSubmit>
                    </ButtonContainer>
                </Form>
            }
            {data &&
                <Form onSubmit={handleSubmit(addAddress)}>
                    <InputContainer>
                        <Label>Address
                            <Input id="address" type='text' placeholder='Full address' {...register('address', { required: true })} />
                            <Error>
                                {errors.address && errors.address.type === "required" && <span>This is required</span>}
                            </Error>
                        </Label>
                        <Label>Pincode
                            <Input id="pincode" type='number' placeholder='pincode code' {...register('pincode', { required: true, minLength: 6, maxLength: 6 })} />
                            <Error>
                                {errors.pincode && errors.pincode.type === "required" && <span>This is required</span>}
                                {errors.pincode && errors.pincode.type === "maxLength" && <span>Max length exceeded</span>}
                                {errors.pincode && errors.pincode.type === "minLength" && <span>Min length of 6 required</span>}
                            </Error>
                        </Label>
                        <Label>Landmark
                            <Input id="landmark" type='text' placeholder='Landmark(optional)' {...register('landmark')} />
                        </Label>
                    </InputContainer>
                    <ButtonContainer>
                        <ButtonSubmit type='submit'>Add</ButtonSubmit>
                    </ButtonContainer>
                </Form>
            }
        </>
    )
}

export default UserDetails