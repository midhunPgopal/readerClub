import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import { mobile } from '../../responsive'
import dateFormat from 'dateformat'
import { confirm } from 'react-confirm-box'
import { toast } from 'react-toastify'

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
   padding: 5px 0px;
   background-color: #ef4242fe;
   color: white;
   text-align: center;
   cursor: pointer;
   border-radius: 20px;
   box-shadow: 2px 4px lightgrey;

   &:hover {
    background-color: #f52626fe;
   }
`

toast.configure()
const Orders = () => {

    const notify = () => {
        toast.error('Order Cancelled', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const [orders, setOrders] = useState()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    const getOrders = async () => {
        const res = await axios.get('http://localhost:3001/api/orders/findusercart/' + userId, { headers: { header } })
        console.log(res);
        setOrders(res.data)
    }

    useEffect(() => {
        getOrders()
    }, [user])

    const cancelOrder = async (id) => {
        const result = await confirm('Do you want to cancel ?')
        if (result) {
            await axios.put('http://localhost:3001/api/orders/cancel/' + id)
            notify()
            getOrders()
        }
    }

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
                            <Th scope='col'></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders?.map(data => (
                            <Tr key={data._id}>
                                <Td >{dateFormat(data.createdAt, "mmmm dS, yyyy")}</Td>
                                <Td>{data.deliveryAddress.name}</Td>
                                <Td>{data.products.length}</Td>
                                <Td>₹{data.total}</Td>
                                <Td>{data.payment}</Td>
                                {data.status === 'Cancelled' ?
                                <Td style={{ color: 'red' }}>{data.status}</Td> : <>
                                    <Td >{data.status}</Td>
                                    <Td><Button onClick={() => cancelOrder(data._id)}>Cancel</Button></Td>
                                    </>
                                }
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Orders