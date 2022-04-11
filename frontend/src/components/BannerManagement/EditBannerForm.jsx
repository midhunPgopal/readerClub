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
const EditBannerForm = ({ preloadedData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const id = location.pathname.split('/')[2]

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })

    const notify = () => {
        toast('Banner updated', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const updateBanner = async (data) => {
        await axios.put('http://localhost:3001/api/banner/' + id, data, { headers: { header } })
        notify()
        navigate('/admin')
    }

    return (
        <Form onSubmit={handleSubmit(updateBanner)}>
            <InputContainer>
                <Label>Title</Label>
                <Input id="title" type='text' placeholder='Title' {...register('title', { required: true })} />
                <Error>
                    {errors.title && errors.title.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Description</Label>
                <Input id="description" type='text' placeholder='About the book' {...register('description', { required: true })} />
                <Error>
                    {errors.description && errors.description.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Offer description</Label>
                <Input id="offerDescription" type='text' placeholder='Offer description' {...register('offerDescription', { required: true })} />
                <Error>
                    {errors.offerDescription && errors.offerDescription.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Offer code</Label>
                <Input id="offerCode" type='text' placeholder='Offer code' {...register('offerCode', { required: true })} />
                <Error>
                    {errors.offerCode && errors.offerCode.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Image source link</Label>
                <Input id="img" type='text' placeholder='Image source link' {...register('img', { required: true })} />
                <Error>
                    {errors.img && errors.img.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Background Colour</Label>
                <Input id="bg" type='text' placeholder='background colour' {...register('bg', { required: true })} />
                <Error>
                    {errors.bg && errors.bg.type === "required" && <span>This is required</span>}
                </Error>
            </InputContainer>
            <ButtonContainer>
                <ButtonSubmit type='submit'>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditBannerForm