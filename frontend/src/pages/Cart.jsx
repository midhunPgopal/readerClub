import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
// import RemoveIcon from '@mui/icons-material/Remove'
// import AddIcon from '@mui/icons-material/Add'

import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ pading: '10px' })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transperant'};
    color: ${props => props.type === 'filled' && 'white'};
`
const TopTexts = styled.div`
    ${mobile({ display: 'none' })}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 30px;
    ${mobile({ flexDirection: 'column' })}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`
const ProductDetails = styled.div`
    flex: 2;
    display: flex;
    ${mobile({ margin: '20px' })}
`
const Image = styled.img`
    height: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductSize = styled.span``
const PriceDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    ${mobile({ marginBottom: '5px' })}
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: '5px 15px' })}
`
const ProductPrize = styled.div`
    font-size: 30px;
    font-weight: 200;
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px' })}
`
const Box = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 140vh;
`
const Summary = styled.div`
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 65vh;
`
const SummaryTitle = styled.h1`
    font-weight: 220;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === 'total' && '500'}
    font-size: ${props => props.type === 'total' && '24px'}
`
const SummaryItemText = styled.div``
const SummaryItemPrice = styled.div``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    ${mobile({ flexDirection: 'column' })}
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 10px 0px 0px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const Error = styled.span`
    font-size: 14px;
    padding: 5px;
    color: #f16969;
`
toast.configure()
const Cart = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const [resData, setResData] = useState()
    const [subTotal, setSubTotal] = useState()
    const [grandTotal, setGrandTotal] = useState()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    const notify = () => toast.success('Order succesful', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:3001/api/cart/find/` + userId, { headers: { header } })
            setResData(response.data.cart)
        }
        getData()
    }, [header, userId])
    useEffect(() => {
        let total = resData?.reduce((acc, data) => acc + data.total, 0)
        setSubTotal(total)
    }, [resData])
    useEffect(() => {
        setGrandTotal(subTotal)
    }, [subTotal])

    const onSubmit = async (data) => {
        let {name, email, mobile, deliveryAddress, pincode} = data
        const address = {name, email, mobile, deliveryAddress, pincode}
        let { payment } = data
        const total = grandTotal
        const products = resData
        const payload = { userId, products, total, address, payment }
        await axios.post('http://localhost:3001/api/orders/', payload, { headers: { header } })
        await axios.delete('http://localhost:3001/api/cart/' + userId, { headers: { header } })
        notify()
        navigate('/payment')
    }

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your CART</Title>
                <Top>
                    <TopTexts>
                        <TopText>Your Wishlist</TopText>
                    </TopTexts>
                    <TopButton><Link to='/' style={{ textDecoration: 'none' }}>Continue Shopping</Link></TopButton>
                </Top>
                <Bottom>
                    <Info>
                        <Hr />
                        {resData?.map(data => (
                            <>
                                <Product>
                                    <ProductDetails>
                                        <Image src={data.product.img} />
                                        <Details>
                                            <ProductName><b>Product : </b>{data.product.title}</ProductName>
                                            <ProductId><b>ID : </b>{data.product._id}</ProductId>
                                            <ProductSize><b>Chapter : </b>{data.chapter}</ProductSize>
                                            <ProductSize><b>Price : </b>{data.product.price}</ProductSize>
                                        </Details>
                                    </ProductDetails>
                                    <PriceDetails>
                                        <ProductAmountContainer>
                                            {/* <RemoveIcon /> */}
                                            <ProductAmount>Quantity : {data.quantity}</ProductAmount>
                                            {/* <AddIcon /> */}
                                        </ProductAmountContainer>
                                        <ProductPrize>INR {data.total}</ProductPrize>
                                    </PriceDetails>
                                </Product>
                                <Hr />
                            </>
                        ))}
                    </Info>
                    <Box>
                        <Title>Create an Account</Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Input id="name" type='text' placeholder='Name' {...register('name', { required: true, maxLength: 15, minLength: 3 })} />
                            <Error>
                                {errors.name && errors.name.type === "required" && <span>This is required</span>}
                                {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                                {errors.name && errors.name.type === "minLength" && <span>Min length of 3 required</span>}
                            </Error>
                            <Input id="email" placeholder='Email' {...register('email', {
                                required: true,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })} />
                            <Error>
                                {errors.email && errors.email.type === "required" && <span>This is required</span>}
                                {errors.email && errors.email.type === "pattern" && <span>Invalid email</span>}
                            </Error>
                            <Input id="mobile" type='number' placeholder='Mobile number' {...register('mobile', { required: true, maxLength: 10, minLength: 10 })} />
                            <Error>
                                {errors.mobile && errors.mobile.type === "required" && <span>This is required</span>}
                                {errors.mobile && errors.mobile.type === "maxLength" && <span>Mobile number should be 10 digits</span>}
                                {errors.mobile && errors.mobile.type === "minLength" && <span>Mobile number should be 10 digits</span>}
                            </Error>
                            <Input id="address" type='text' placeholder='Full address' {...register('address', { required: true })} />
                            <Error>
                                {errors.address && errors.address.type === "required" && <span>This is required</span>}
                            </Error>
                            <Input id="pincode" type='number' placeholder='Pincode' {...register('pincode', { required: true, maxLength: 6, minLength: 6 })} />
                            <Error>
                                {errors.pincode && errors.pincode.type === "required" && <span>This is required</span>}
                                {errors.pincode && errors.pincode.type === "maxLength" && <span>Pincode should be 6 digits</span>}
                                {errors.pincode && errors.pincode.type === "minLength" && <span>Pincode should be 6 digits</span>}
                            </Error>
                            <select {...register("payment", {required: true})}>
                                <option value="">Select</option>
                                <option value="cash on delivery">Cash on delivery</option>
                                <option value="internet banking">Internet Banking</option>
                                <option value="card">Credit/Debit card</option>
                            </select>
                            <Error>
                                {errors.payment && errors.payment.type === "required" && <span>This is required</span>}
                            </Error>
                            <Summary>
                                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                                <SummaryItem>
                                    <SummaryItemText>SubTotal</SummaryItemText>
                                    <SummaryItemPrice>INR {subTotal}</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                                    <SummaryItemPrice>INR 125</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryItemText>Coupon Discount</SummaryItemText>
                                    <SummaryItemPrice>INR 125</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem type='total'>
                                    <SummaryItemText>Total</SummaryItemText>
                                    <SummaryItemPrice>INR {grandTotal}</SummaryItemPrice>
                                </SummaryItem>
                                <Button type='submit'>CHECKOUT NOW</Button>
                            </Summary>
                        </Form>
                    </Box>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart