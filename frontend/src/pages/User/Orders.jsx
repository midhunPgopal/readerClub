import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import { mobile } from '../../responsive'
import dateFormat from 'dateformat'
import { confirm } from 'react-confirm-box'
import { toast } from 'react-toastify'
import { logOut } from '../../redux/userRedux'
import { DataGrid } from '@mui/x-data-grid';

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ pading: '10px' })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
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
   background-color: #ef4242fe;
   color: white;
   text-align: center;
   cursor: pointer;
   border-radius: 20px;
   border: none;

   &:hover {
    background-color: #f52626fe;
   }
   &:disabled {
       cursor: not-allowed;
   }
`
toast.configure()
const Orders = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    const [orders, setOrders] = useState()

    const notify = (msg) => {
        toast.success(msg, {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const getOrders = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/orders/findusercart/' + userId, { headers: { header, userId } })
            setOrders(res.data)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const cancelOrder = async (id) => {
        try {
            let result
            result = await confirm('Do you want to cancel ?')
            if (result) {
                const res = await axios.put('http://localhost:3001/api/orders/cancel/' + id, { headers: { header, userId } })
                notify(res.data.msg)
                getOrders()
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const cancelButton = (params) => {
        return (
            <Button
                disabled={params.row.status === 'Cancelled' || params.row.status === 'Shipped' || params.row.status === 'Delivered'}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    cancelOrder(params.row.id)
                }}
            >
                Cancel
            </Button>
        )
    }
    const columns = [
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'name', headerName: 'Full Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'payment', headerName: 'Payment', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'cancel', headerName: '', width: 100, renderCell: cancelButton, disableClickEventBubbling: true, },
    ]
    const rows = orders?.map((data) => (
        {
            id: data._id,
            date: dateFormat(data.createdAt, "mmmm dS, yyyy"),
            name: data.deliveryAddress.name,
            quantity: data.products.length,
            price: data.total,
            payment: data.payment,
            status: data.status
        })
    )

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your Orders</Title>
                <Hr />
                <div style={{ height: 400, width: '90%', margin: '50px', padding: '20px' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        sx={{
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                    />
                </div>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Orders