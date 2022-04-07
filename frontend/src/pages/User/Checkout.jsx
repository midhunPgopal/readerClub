import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import { mobile } from '../../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../redux/userRedux'

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
    margin: 20px ;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transperant'};
    color: ${props => props.type === 'filled' && 'white'};
`
const Bottom = styled.div`

    ${mobile({ flexDirection: 'column' })}
`
const Summary = styled.div`
    margin: 20px;
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
`
const SummaryTitle = styled.h2`
    font-weight: 220;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === 'total' && '500'}
    font-size: ${props => props.type === 'total' && '24px'}
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
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
    margin: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;

    ${mobile({ flexDirection: 'column' })}
`
const InputContainer = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 20px;
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
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
const RadioLabel = styled.p`

`

toast.configure()
const Cart = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [price, setPrice] = useState()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken 

    const notify = () => toast.success('Order succesful', {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/preorder/` + userId, { headers: { header, userId } })
            let [resData] = response.data
            setPrice(resData.grandTotal)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }

    useEffect(() => {
        getData()
    }, [header])

    const onSubmit = async (data) => {
        let { name, email, mobile, address, pincode, payment } = data
        const deliveryAddress = { name, email, mobile, address, pincode }
        const total = price
        const products = total
        const payload = { userId, products, total, deliveryAddress, payment }
        try {
            if(payment === 'Cash on delivery'){
                await axios.post('http://localhost:3001/api/orders/', payload, { headers: { header, userId } })
                await axios.delete('http://localhost:3001/api/cart/' + userId, { headers: { header } })
                notify()
                navigate('/success')
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Payment Page</Title>
                <Top>
                    <TopButton><Link to='/cart' style={{ textDecoration: 'none' }}>Back to your Cart</Link></TopButton>
                </Top>
                <Bottom>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <InputContainer>
                            <SummaryTitle>Delivery Address</SummaryTitle>
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
                            <Label>Payment method</Label>
                            <RadioLabel><Input type="radio" value="Cash on delivery" id="Cash on delivery" {...register("payment")}/>Cash on Delivery</RadioLabel>
                            <RadioLabel><Input type="radio" value="Online Payment" id="Online Payment" {...register("payment")}/>Online Payment</RadioLabel>
                        </InputContainer>
                        <Summary>
                            <SummaryTitle><b>Final Payment</b></SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>₹ {price}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Coupon Discount</SummaryItemText>
                                <SummaryItemPrice>₹ 125</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type='total'>
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>₹ {price - 125}</SummaryItemPrice>
                            </SummaryItem>
                            <Button type='submit'>Complete your Order</Button>
                        </Summary>
                    </Form>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart