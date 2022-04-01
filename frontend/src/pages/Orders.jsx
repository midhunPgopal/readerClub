import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import dateFormat from 'dateformat'

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


const Orders = () => {

    const [resData, setResData] = useState()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    useEffect(() => {
        const getOrders = async () => {
            const res = await axios.get('http://localhost:3001/api/orders/find/' + userId, { headers: { header } })
            setResData(res.data.orders)
        }
        getOrders()
    }, [userId, header])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your Orders</Title>
                <Hr />
                <Table>
                    <Thead >
                        <Tr>
                            <Th scope="col">Date</Th>
                            <Th scope="col">Name</Th>
                            <Th scope="col">Quantity</Th>
                            <Th scope="col">Price</Th>
                            <Th scope='col'>Payment</Th>
                            <Th scope='col'>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {resData?.map(data => (
                            <Tr key={data._id}>
                                <Td >{dateFormat(data.createdAt, "mmmm dS, yyyy")}</Td>
                                <Td>{data.address.name}</Td>
                                <Td>{data.products.length}</Td>
                                <Td>{data.total}</Td>
                                <Td>{data.payment}</Td>
                                <Td>{data.status}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Hr />
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Orders