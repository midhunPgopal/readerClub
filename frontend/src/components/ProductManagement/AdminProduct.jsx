import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { mobile } from '../../responsive'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from "react-confirm-box"

const Container = styled.div`
  margin: 30px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  `
const Info = styled.div`
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.2);
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s ease;
  `
const Icon = styled.div`
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      transition: all 0.1s ease;
      cursor: pointer;
      text-decoration: none;
  
      &:hover{
          transform: scale(1.2);
      }
  `
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Wrapper = styled.div`
  flex: 1;
  margin: 5px;
  width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;

  &:hover ${Info}{
    opacity: 1;
  }
`
const TopButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`
const Button = styled.button`
  width: 10%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 50px;

  &:hover {
    background-color: #26e090fe;
  }
`
const Product = styled.div`
display: flex;
flex-direction: row;
`
const Image = styled.img`
height: 250px;
width: 180px;
object-fit: cover;
z-index: 2;
`
const Title = styled.h3`
margin: 10px;
text-align: center;
color: #4b1f4cfe;
`
const AddProduct = styled.div`
  margin: 0px;
`
const AddCategory = styled.div`
  margin: 0px;
`
const InputContainer = styled.div`
  flex: 1;
`
const ButtonContainer = styled.div`
flex: 1;
margin: 20px;
display: flex;
justify-content: flex-start;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
`
const ButtonClose = styled.button`
  width: 10%;
  border: none;
  margin-left: 20px;
  background-color: #f43b3bfe;
  color: white;
  cursor: pointer;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
toast.configure()
const AdminProduct = () => {

  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const [product, setProduct] = useState()
  const [flag, setFlag] = useState(false)
  const [check, setCheck] = useState(false)
  
  const notify = () => toast.success('Product added', {
    position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
  })
  const notifyDelete = () => toast.success('Product deleted', {
    position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
  })
  const notifyCategory = () => toast.success('Category deleted', {
    position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
  })

  const getProducts = async () => {
    const res = await axios.get('http://localhost:3001/api/products/')
    setProduct(res.data)
  }
  const getFlag = () => {
    setFlag(true)
  }
  const getCheck = () => {
    setCheck(true)
  }
  const addProduct = async (data) => {
    await axios.post('http://localhost:3001/api/products/', data, { headers: { header } })
    notify()
    setFlag(false)
  }
  const deleteProduct = async (id) => {
    const result = await confirm("Are you sure?")
    if (result) {
      await axios.delete('http://localhost:3001/api/products/' + id, { headers: { header } })
      getProducts()
      notifyDelete()
    }
  }
  const addCategory = async (data) => {
    await axios.post('http://localhost:3001/api/categories/', data, { headers: { header } })
    notifyCategory()
    setCheck(false)
  }

  useEffect(() => {
    getProducts()
  }, [flag])
  
  return (
    <Container>
      <TopButton>
        <Button onClick={getFlag}>Add Product</Button>
        <Button onClick={getCheck}>Add Category</Button>
      </TopButton>
      <AddProduct>
        {flag &&
          <Form onSubmit={handleSubmit(addProduct)}>
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
              <ButtonSubmit type='submit' >Add Book</ButtonSubmit>
              <ButtonClose onClick={() => setFlag(false)}>Close</ButtonClose>
            </ButtonContainer>
          </Form>
        }
      </AddProduct>
      <AddCategory>
        {check &&
          <Form onSubmit={handleSubmit(addCategory)}>
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
              <ButtonSubmit type='submit' >Add Category</ButtonSubmit>
              <ButtonClose onClick={() => setCheck(false)}>Close</ButtonClose>
            </ButtonContainer>
          </Form>
        }
      </AddCategory>
      <Product>
        {product?.map(data => (
          <Wrapper>
            <Circle />
            <Image src={data.img}></Image>
            <Title>{data.title}</Title>
            <Info>
              <Icon>
                <Link to={`/viewproduct/${data._id}`} >
                  <RemoveRedEyeOutlinedIcon />
                </Link>
              </Icon>
              <Icon>
                <Link to={`/editproduct/${data._id}`} >
                  <EditIcon />
                </Link>
              </Icon>
              <Icon>
                <DeleteForeverOutlinedIcon onClick={() => deleteProduct(data._id)} />
              </Icon>
            </Info>
          </Wrapper>
        ))}
      </Product>
    </Container>
  )
}

export default AdminProduct