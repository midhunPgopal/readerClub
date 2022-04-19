import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import { mobile } from '../../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../redux/userRedux'
import ErrorNotice from '../../error/ErrorNotice'
import successNotice from '../../success/SuccessNotice'
import SuccessNotice from '../../success/SuccessNotice'

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
const Content = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
    padding: 10px;
`
const End = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 20px;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    ${mobile({ flexDirection: 'column' })}
`
const Middle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 20px;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    ${mobile({ flexDirection: 'column' })}
`
const Address = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
`
const Summary = styled.div`
    flex: 1;
    margin: 20px;
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
    font-weight: ${props => props.type === 'totalPrice' && '500'}
    font-size: ${props => props.type === 'totalPrice' && '24px'}
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
    width: 100%;
    flex: 1;

    ${mobile({ flexDirection: 'column' })}
`
const InputContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 10px 0px 0px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const InputRadio = styled.input`
    flex: 1;
    min-width: 10%;
    margin: 10px 10px 0px 0px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const Error = styled.span`
    font-size: 14px;
    padding: 5px;
    color: red;
`
const Success = styled.span`
    font-size: 14px;
    padding: 5px;
    color: green;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
const RadioLabel = styled.p`
`
const FormCoupon = styled.form``
const InputCoupon = styled.input`
    width: 300px;
    margin: 10px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const ButtonCheck = styled.button`
    width: 30%;
    padding: 10px;
    background-color: teal;
    color: white;
    font-weight: 600;
    cursor: pointer;
    border: none;
`
const CouponContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}
toast.configure()
const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const paypal = useRef()

    const { register, handleSubmit } = useForm()

    const user = useSelector(state => state.user.currentUser)
    let userId = null
    let header = null
    if (user) {
        userId = user.user._id
        header = user.accessToken
    }

    const [totalPrice, setTotalPrice] = useState()
    const [grandTotal, setGrandTotal] = useState()
    const [products, setProducts] = useState()
    const [discount, setDiscount] = useState(0)
    const [maxDiscount, setMaxDiscount] = useState(0)
    const [coupon, setCoupon] = useState()
    const [buttonFlag, setButtonFlag] = useState(true) 
    const [errCoupon, setErrCoupon] = useState()
    const [succCoupon, setSuccCoupon] = useState()
    const [address, setAddress] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState(0)
    const [fullAddress, setFullAddress] = useState('')
    const [pincode, setPincode] = useState(0)
    const [landmark, setLandmark] = useState('')
    const [wallet, setWallet] = useState(0)
    const [money, setMoney] = useState(0)
    const [amount, setAmount] = useState(0)
    const [errWallet, setErrWallet] = useState()
    const [succWallet, setSuccWallet] = useState()
    const [walletFlag, setWalletFlag] = useState(true)

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/preorder/` + userId, { headers: { header, userId } })
            let [resData] = response.data
            setTotalPrice(resData.grandTotal)
            setProducts(resData.products)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const getUserCredentials = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/users/find/' + userId, { headers: { header } })
            setName(res.data.name)
            setEmail(res.data.email)
            setMobile(res.data.mobile)
            setWallet(res.data.wallet)
        } catch (error) {
            console.log(error);
        }
    }
    const getAddress = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/address/' + userId, { headers: { header } })
            setAddress(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const onSubmit = async (value) => {
        const deliveryAddress = { name, email, mobile, fullAddress, pincode, landmark }
        const total = grandTotal
        const payment = value.payment
        const payload = { userId, products, total, deliveryAddress, payment }
        if (payment === 'Cash on delivery') {
            try {
                const res = await axios.post('http://localhost:3001/api/orders/', payload, { headers: { header, userId } })
                if (coupon) {
                    await axios.put('http://localhost:3001/api/coupon/add/' + coupon, { userId })
                }
                await axios.delete('http://localhost:3001/api/cart/' + userId, { headers: { header, userId } })
                await axios.put('http://localhost:3001/api/users/wallet/' + userId, amount)
                notify(res.data.msg)
                navigate('/success')
            } catch (error) {
                console.log(error)
                error.response.data.status && dispatch(logOut())
            }
        } else if (payment === 'Razorpay') {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?')
                return
            }
            try {
                const data = await axios.post('http://localhost:3001/api/orders/razorpay', payload)
                const options = {
                    key: 'rzp_test_teiWvQe7PwRGVv',
                    currency: data.data.currency,
                    amount: data.data.amount.toString(),
                    order_id: data.data.id,
                    name: 'Order',
                    description: 'Place your order',
                    image: 'https://st2.depositphotos.com/1364916/6359/v/600/depositphotos_63590137-stock-illustration-blue-book-logo-vector.jpg',
                    handler: async () => {
                        const res = await axios.post('http://localhost:3001/api/orders/', payload, { headers: { header, userId } })
                        if (coupon) {
                            await axios.put('http://localhost:3001/api/coupon/add/' + coupon, { userId })
                        }
                        await axios.delete('http://localhost:3001/api/cart/' + userId, { headers: { header, userId } })
                        await axios.put('http://localhost:3001/api/users/wallet/' + userId, amount)
                        notify(res.data.msg)
                        navigate('/success')
                    },
                    prefill: {
                        name: name,
                        email: email,
                        contact: mobile
                    }
                }
                const paymentObject = new window.Razorpay(options)
                paymentObject.open()
            } catch (error) {
                console.log(error)
            }
        } else if (payment === 'Paypal') {
            window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                //description: "Cool looking table",
                                amount: {
                                    currency_code: "USD",
                                    value: (total/71)
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log('success : '+order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
                .render(paypal.current)
        }
    }
    const checkCoupon = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get('http://localhost:3001/api/coupon/check/' + coupon, { headers: { userId } })
            setMaxDiscount(res.data.maximumOfffer)
            setDiscount(res.data.discount)
            setButtonFlag(false)
            setSuccCoupon('Coupon applied')
        } catch (error) {
            console.log(error)
            error.response.data.coupon && setErrCoupon(error.response.data.coupon)
        }
    }
    const removeCoupon = () => {
        setButtonFlag(true)
        setMaxDiscount(0)
        setDiscount(0)
        setSuccCoupon()

    }
    const checkWallet = async (e) => {
        e.preventDefault()
        if(wallet < money) {
            setErrWallet('Not enough money in wallet')
        } else {
            setGrandTotal(totalPrice - money)
            setAmount(wallet - money)
            setWalletFlag(false)
            setSuccWallet('Wallet money added')
        }
    }
    const removeWallet = () => {
        setWalletFlag(true)
        setAmount(wallet)
        setSuccWallet()
    }
    const choose = (data) => {
        setFullAddress(data.address)
        setPincode(data.pincode)
        setLandmark(data.landmark)
    }

    useEffect(() => {
        getData()
        getAddress()
        getUserCredentials()
    }, [])
    useEffect(() => {
        setGrandTotal(totalPrice)
    }, [totalPrice])
    useEffect(() => {
        const discountValue = totalPrice * discount
        if (discountValue <= maxDiscount) {
            setGrandTotal(totalPrice - (totalPrice * discount))
        } else {
            setGrandTotal(totalPrice - maxDiscount)
        }
    }, [discount, maxDiscount])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Payment Page</Title>
                <Top>
                    <TopButton><Link to='/cart' style={{ textDecoration: 'none' }}>Back to your Cart</Link></TopButton>
                </Top>
                <Content>
                    <Summary>
                        <SummaryTitle><b>Final Payment</b></SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
                        </SummaryItem>
                        <FormCoupon >
                            <CouponContainer>
                                <Label>Coupon code
                                    <InputCoupon type='text' placeholder='Copon code' onChange={(e) => setCoupon(e.target.value)} />
                                </Label>
                                    <Error>
                                        {errCoupon && <ErrorNotice message={errCoupon} />}
                                    </Error>
                                    <Success>
                                        {succCoupon && <SuccessNotice message={succCoupon} />}
                                    </Success>
                                {buttonFlag ?
                                    <ButtonCheck onClick={checkCoupon} >Check</ButtonCheck> :
                                    <ButtonCheck style={{ backgroundColor: 'red', padding: 'px' }} onClick={removeCoupon} >Remove Coupon</ButtonCheck>
                                }
                            </CouponContainer>
                        </FormCoupon>
                        <FormCoupon >
                            <CouponContainer>
                                <Label>Wallte money
                                    <InputCoupon type='number' placeholder='amount tobe added' onChange={(e) => setMoney(e.target.value)} />
                                </Label>
                                    <Error>
                                        {errWallet && <ErrorNotice message={errWallet} />}
                                    </Error>
                                    <Success>
                                        {succWallet && <SuccessNotice message={succWallet} />}
                                    </Success>
                                {walletFlag ?
                                    <ButtonCheck onClick={checkWallet} >Add</ButtonCheck> :
                                    <ButtonCheck style={{ backgroundColor: 'red', padding: 'px' }} onClick={removeWallet} >Remove wallet Money</ButtonCheck>
                                }
                            </CouponContainer>
                        </FormCoupon>
                        <SummaryItem type='totalPrice'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>₹ {grandTotal}</SummaryItemPrice>
                        </SummaryItem>
                    </Summary>
                    <Middle>
                        <SummaryTitle>Saved Address</SummaryTitle>
                        {address?.map(data => (
                            <Address>
                                <SummaryItemText>Address: {data.address}</SummaryItemText>
                                <SummaryItemText>Pincode: {data.pincode}</SummaryItemText>
                                <SummaryItemText>Landmark: {data.landmark}</SummaryItemText>
                                <ButtonCheck style={{ padding: '10px' }} onClick={() => choose(data)} >Choose</ButtonCheck>
                            </Address>
                        ))}
                    </Middle>
                    <End>
                        <SummaryTitle>Delivery Address</SummaryTitle>
                        <Input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} required value={name} />
                        <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required value={email} />
                        <Input type='number' placeholder='Mobile' onChange={(e) => setMobile(e.target.value)} required value={mobile} />
                        <Input type='text' placeholder='Full address' onChange={(e) => setFullAddress(e.target.value)} required value={fullAddress} />
                        <Input type='number' placeholder='Pincode' onChange={(e) => setPincode(e.target.value)} required value={pincode} />
                        <Input type='text' placeholder='Landmark (optional)' onChange={(e) => setLandmark(e.target.value)} required value={landmark} />
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <InputContainer>
                                <Label>Payment method</Label>
                                <RadioLabel><InputRadio type="radio" value="Cash on delivery" id="Cash on delivery" {...register("payment")} />Cash on Delivery</RadioLabel>
                                <RadioLabel><InputRadio type="radio" value="Razorpay" id="Razorpay" {...register("payment")} />Domestic transaction with razorpay</RadioLabel>
                                <RadioLabel><InputRadio type="radio" value="Paypal" id="Paypal" {...register("payment")} />International transaction with paypal</RadioLabel>
                                <Button type='submit'>Complete your Order</Button>
                            </InputContainer>
                        </Form>
                        <div ref={paypal}></div>
                    </End>
                </Content>
            </Wrapper>
            <Footer />
        </Container >
    )
}

export default Cart