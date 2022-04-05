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
    margin: 20px;
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
       background-color: #c8edd2fe;
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
const Button = styled.div`
   cursor: pointer;
`
toast.configure()
const CategoryAdmin = () => {

    const [categories, setCategories] = useState()

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const notifyDelete = () => toast.success('Product deleted', {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getCategories = async () => {
        const res = await axios.get('http://localhost:3001/api/categories')
        setCategories(res.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const deleteCat = async (id) => {
        const result = await confirm('Are you sure?')
        if (result) {
            await axios.delete('http://localhost:3001/api/categories/' + id, { headers: { header } })
            notifyDelete()
            getCategories()
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>Your Categories</Title>
                <Hr />
                <Table>
                    <Thead >
                        <Tr>
                            <Th scope="col">Name</Th>
                            <Th scope="col">Image source</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories?.map(data => (
                            <>
                                <Tr key={data._id}>
                                    <Td>{data.category}</Td>
                                    <Td>{data.img}</Td>
                                    <Td>
                                        <Button>
                                            <Link to={`/editcategory/${data._id}`}>
                                                <EditIcon />
                                            </Link>
                                        </Button>
                                    </Td>
                                    <Td><Button onClick={() => deleteCat(data._id)}><DeleteForeverIcon /></Button></Td>
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