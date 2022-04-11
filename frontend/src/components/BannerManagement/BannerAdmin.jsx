import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { confirm } from 'react-confirm-box'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
toast.configure()
const BannerAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [banner, setBanner] = useState()
    const [flag, setFlag] = useState(false)

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getBanner = async () => {
        const res = await axios.get('http://localhost:3001/api/banner/')
        setBanner(res.data)
    }
    const getFlag = () => {
        setFlag(true)
    }
    const addBanner = async (data) => {
        const res = await axios.post('http://localhost:3001/api/banner/', data, { headers: { header } })
        notify(res.data.msg)
        getBanner()
        setFlag(false)
    }
    const deleteBanner = async (id) => {
        const result = await confirm("Are you sure?")
        if (result) {
            const res = await axios.delete('http://localhost:3001/api/products/' + id, { headers: { header } })
            getBanner()
            notify(res.data.msg)
        }
    }
    useEffect(() => {
        getBanner()
    }, [])

    return (
        <Container>
            <TopButton>
                <Title>Your Banner</Title>
                <Button onClick={getFlag}>Add Banner</Button>
            </TopButton>
            <AddProduct>
                {flag &&
                    <Form onSubmit={handleSubmit(addBanner)}>
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
                            <ButtonSubmit type='submit' >Add Banner</ButtonSubmit>
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
                            <Th scope="col">Image source</Th>
                            <Th scope="col">Title</Th>
                            <Th scope="col">Description</Th>
                            <Th scope="col">Offer Description</Th>
                            <Th scope='col'></Th>
                            <Th scope='col'></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {banner?.map(data => (
                            <Tr key={data._id}>
                                <Td><Image src={data.img}></Image></Td>
                                <Td>{data.title}</Td>
                                <Td>{data.description}</Td>
                                <Td>₹{data.offerDescription}</Td>
                                <Td>
                                    <Link to={`/editbanner/${data._id}`} style={{ textDecoration: 'none' }}>
                                        <EditIcon />
                                    </Link>
                                </Td>
                                <Td>
                                    <DeleteForeverIcon onClick={() => deleteBanner(data._id)} />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Product>
        </Container>
    )
}

export default BannerAdmin