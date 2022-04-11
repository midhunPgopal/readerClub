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
import dateFormat from 'dateformat'

const Container = styled.div`
  margin: 30px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  `
const TopButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`
const Button = styled.button`
  width: 10%;
  border: none;
  border-radius: 10px;
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
height: 60px;
width: 40px;
object-fit: cover;
`
const Title = styled.h3`
margin: 10px;
text-align: center;
color: #4b1f4cfe;
`
const AddProduct = styled.div`
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
const Table = styled.table`
    width: 100%;
`
const Td = styled.td`
    text-align: left;
    border-bottom: 1px solid #ddd;
`
const Th = styled.th`
    height: 30px;
    border-bottom: 1px solid #ddd;
`
const Thead = styled.thead`
    text-align: left;
`
const Tr = styled.tr`
   &:hover {
       background-color: #ccf6d678;
   }
`
const Tbody = styled.tbody`
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px' })}
`
toast.configure()
const AdminProduct = () => {

  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [product, setProduct] = useState()
  const [flag, setFlag] = useState(false)

  const notify = (msg) => toast.success(msg, {
    position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
  })

  const getProducts = async () => {
    const res = await axios.get('http://localhost:3001/api/products/')
    setProduct(res.data)
  }
  const getFlag = () => {
    setFlag(true)
  }
  const addProduct = async (data) => {
    const res = await axios.post('http://localhost:3001/api/products/', data, { headers: { header } })
    notify(res.data.msg)
    setFlag(false)
  }
  const deleteProduct = async (id) => {
    const result = await confirm("Are you sure?")
    if (result) {
      const res = await axios.delete('http://localhost:3001/api/products/' + id, { headers: { header } })
      getProducts()
      notify(res.data.msg)
    }
  }

  useEffect(() => {
    getProducts()
  }, [flag])

  return (
    <Container>
      <TopButton>
        <Title>Your Products</Title>
        <Button onClick={getFlag}>Add Product</Button>
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
      <Product>
        <Hr />
        <Table>
          <Thead >
            <Tr>
              <Th scope="col">Created Date</Th>
              <Th scope="col">Last Update</Th>
              <Th scope="col"></Th>
              <Th scope="col">Name</Th>
              <Th scope="col">Author</Th>
              <Th scope="col">Price</Th>
              <Th scope='col'></Th>
              <Th scope='col'></Th>
              <Th scope='col'></Th>
            </Tr>
          </Thead>
          <Tbody>
            {product?.map(data => (
              <Tr key={data._id}>
                <Td >{dateFormat(data.createdAt, "mmmm dS, yyyy")}</Td>
                <Td >{dateFormat(data.updatedAt, "mmmm dS, yyyy")}</Td>
                <Td><Image src={data.img}></Image></Td>
                <Td>{data.title}</Td>
                <Td>{data.author}</Td>
                <Td>₹{data.price}</Td>
                <Td>
                  <Link to={`/viewproduct/${data._id}`} >
                    <RemoveRedEyeOutlinedIcon />
                  </Link>
                </Td>
                <Td>
                  <Link to={`/editproduct/${data._id}`} style={{ textDecoration: 'none' }}>
                    <EditIcon />
                  </Link>
                </Td>
                <Td>
                  <DeleteForeverOutlinedIcon onClick={() => deleteProduct(data._id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Product>
    </Container>
  )
}

export default AdminProduct