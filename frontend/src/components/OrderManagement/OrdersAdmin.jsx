import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import dateFormat from 'dateformat'
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
    margin: 20px 0px 20px 0px;
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
const Button = styled.button`
    padding: 5px;
    border: none;
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

const OrdersAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const status = admin.currentAdmin.status

    const [orders, setOrders] = useState()

    const getOrders = async () => {
        const res = await axios.get('http://localhost:3001/api/orders/', { headers: { header, status } })
        setOrders(res.data)
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <Container>
            <Wrapper>
                <Title>Your Orders</Title>
                <Hr />
                <Table>
                    <Thead >
                        <Tr>
                            <Th scope="col">Created Date</Th>
                            <Th scope="col">Last Update</Th>
                            <Th scope="col">Name</Th>
                            <Th scope="col">Shipping To</Th>
                            <Th scope="col">Quantity</Th>
                            <Th scope="col">Price</Th>
                            <Th scope='col'>Payment</Th>
                            <Th scope='col'>Status</Th>
                            <Th scope='col'></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders?.map(data => (
                            <Tr key={data._id}>
                                <Td >{dateFormat(data.createdAt, "mmmm dS, yyyy")}</Td>
                                <Td >{dateFormat(data.updatedAt, "mmmm dS, yyyy")}</Td>
                                <Td>{data.deliveryAddress.name}</Td>
                                <Td>{data.deliveryAddress.address} , {data.deliveryAddress.pincode}</Td>
                                <Td>{data.products.length}</Td>
                                <Td>₹{data.total}</Td>
                                <Td>{data.payment}</Td>
                                <Td >{data.status}</Td>
                                {data.status === 'Cancelled' ? <></> :
                                <Td>
                                    <Link to={`/editorder/${data._id}`} style={{textDecoration: 'none'}}>
                                        <Button>Update</Button>
                                    </Link>
                                </Td>}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Wrapper>
        </Container>
    )
}

export default OrdersAdmin