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
const EditProductForm = ({preloadedData}) => {
    const notify = () => {
        toast('Produt details updated', {
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
  
  const onSubmit = async (data) => {
    await axios.put('http://localhost:3001/api/products/' + id, data, { headers: { header } })
    notify()
    navigate('/admin')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Input id="title" type='text' placeholder='Title' {...register('title', { required: true })} />
              <Error>
                {errors.title && errors.title.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="description" type='text' placeholder='About the book' {...register('description', { required: true })} />
              <Error>
                {errors.description && errors.description.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="author" type='text' placeholder='Author' {...register('author', { required: true })} />
              <Error>
                {errors.author && errors.author.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="publisher" type='text' placeholder='Publisher' {...register('publisher', { required: true })} />
              <Error>
                {errors.publisher && errors.publisher.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="publishedAt" type='date' placeholder='Published on' {...register('publishedAt', { required: true })} />
              <Error>
                {errors.publishedAt && errors.publishedAt.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="img" type='text' placeholder='Image source link' {...register('img', { required: true })} />
              <Error>
                {errors.img && errors.img.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="category" type='text' placeholder='Separate the categories by a coma' {...register('category', { required: true })} />
              <Error>
                {errors.category && errors.category.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="chapter" type='text' placeholder='Separate the chapters by a coma' {...register('chapter', { required: true })} />
              <Error>
                {errors.chapter && errors.chapter.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="price" type='number' placeholder='Selling Price' {...register('price', { required: true })} />
              <Error>
                {errors.price && errors.price.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="offer" type='text' placeholder='Offers' {...register('offer', { required: false })} />
            </InputContainer>
            <ButtonContainer>
              <ButtonSubmit type='submit'>Update</ButtonSubmit>
            </ButtonContainer>
          </Form>
  )
}

export default EditProductForm