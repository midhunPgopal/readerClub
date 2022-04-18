import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { mobile } from '../../responsive'
import { confirm } from 'react-confirm-box'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ pading: '10px' })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Table = styled.table`
    padding: 20px;
    margin: 20px 0 20px 0px;
    width: 100%;
`
const Td = styled.td`
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
`
const Th = styled.th`
    height: 60px;
    padding: 10px;
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
const ButtonEdit = styled.button`
    padding: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8bf1a5fe;
    color: white;
    text-align: center;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 2px 4px lightgrey;

    &:hover {
        background-color: #00ff40fe;
    }
`
const ButtonDelete = styled.button`
    padding: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(249, 121, 121);
    color: white;
    text-align: center;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 2px 4px lightgrey;

    &:hover {
        background-color: rgb(246, 0, 0);
    }
`
const TopButton = styled.div`
  flex: 1;
  display: flex;
  aling-items: center;
  justify-content: space-around;
`
const Button = styled.button`
  width: 15%;
  padding: 10px;
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
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`

toast.configure()
const CategoryAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const [categories, setCategories] = useState()
    const [check, setCheck] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const notifyCategory = () => toast.success('Category added', {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getCheck = () => {
        setCheck(true)
    }

    const notifyDelete = () => toast.success('Category deleted', {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getCategories = async () => {
        const res = await axios.get('http://localhost:3001/api/categories')
        setCategories(res.data)
    }
    const addCategory = async (data) => {
        await axios.post('http://localhost:3001/api/categories/', data, { headers: { header } })
        notifyCategory()
        getCategories()
        setCheck(false)
    }

    const deleteCat = async (id) => {
        const result = await confirm('Are you sure?')
        if (result) {
            await axios.delete('http://localhost:3001/api/categories/' + id, { headers: { header } })
            notifyDelete()
            getCategories()
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Container>
            <Wrapper>
                <TopButton>
                    <Title>Your Categories</Title>
                    <Button onClick={getCheck}>Add Category</Button>
                </TopButton>
                <AddCategory>
                    {check &&
                        <Form onSubmit={handleSubmit(addCategory)}>
                            <InputContainer>
                                <Label>Category
                                    <Input id="category" type='text' placeholder='Category' {...register('category', { required: true })} />
                                    <Error>
                                        {errors.category && errors.category.type === "required" && <span>This is required</span>}
                                    </Error>
                                </Label>
                                <Label>Image source link
                                    <Input id="img" type='text' placeholder='Image source link' {...register('img', { required: true })} />
                                    <Error>
                                        {errors.img && errors.img.type === "required" && <span>This is required</span>}
                                    </Error>
                                </Label>
                            </InputContainer>
                            <ButtonContainer>
                                <ButtonSubmit type='submit' >Add Category</ButtonSubmit>
                                <ButtonClose onClick={() => setCheck(false)}>Close</ButtonClose>
                            </ButtonContainer>
                        </Form>
                    }
                </AddCategory>
                <Hr />
                <Table>
                    <Thead >
                        <Tr>
                            <Th scope="col">Name</Th>
                            <Th scope="col">Edit</Th>
                            <Th scope="col">Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories?.map(data => (
                            <>
                                <Tr key={data._id}>
                                    <Td>{data.category}</Td>
                                    <Td>
                                        <ButtonEdit>
                                            <Link to={`/editcategory/${data._id}`} style={{ textDecoration: 'none' }}>
                                                <EditIcon />
                                            </Link>
                                        </ButtonEdit>
                                    </Td>
                                    <Td><ButtonDelete onClick={() => deleteCat(data._id)}><DeleteForeverIcon /></ButtonDelete></Td>
                                </Tr>
                            </>
                        ))}
                    </Tbody>
                </Table>
                <Hr />
            </Wrapper>
        </Container>
    )
}

export default CategoryAdmin