import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    ${mobile({ flexDirection: 'column' })}
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
flex: 1;
`
const ButtonContainer = styled.div`
flex: 1;
margin: 20px;
display: flex;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
`
toast.configure()
const EditCategoryForm = ({ preloadedData }) => {

    const notify = () => {
        toast('Category updated', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })

    const updateCategory = async (data) => {
        await axios.put('http://localhost:3001/api/categories/' + id, data, { headers: { header } })
        notify()
        navigate('/admincategory')
    }

    return (
        <Form onSubmit={handleSubmit(updateCategory)}>
            <InputContainer>
                <Input id="category" type='text' placeholder='Category' {...register('category', { required: true })} />
                <Error>
                    {errors.category && errors.category.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="img" type='text' placeholder='Image source link' {...register('img', { required: true })} />
                <Error>
                    {errors.img && errors.img.type === "required" && <span>This is required</span>}
                </Error>
            </InputContainer>
            <ButtonContainer>
                <ButtonSubmit type='submit'>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditCategoryForm