import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

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
const EditCategoryForm = ({ preloadedData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const user = useSelector(state => state.user)
    const header = user.currentUser.accessToken
    const userId = user.currentUser.user._id
    const id = location.pathname.split('/')[2]

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })

    const notify = (msg) => {
        toast(msg, {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const updateAddress = async (data) => {
        const res = await axios.put('http://localhost:3001/api/address/' + id, data, { headers: { header, userId } })
        notify(res.data.msg)
        navigate('/account')
    }

    return (
        <Form onSubmit={handleSubmit(updateAddress)}>
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
                <ButtonSubmit type='submit'>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditCategoryForm