import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { mobile } from '../../responsive'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../redux/userRedux'
import { addCart } from '../../redux/cartRedux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { confirm } from "react-confirm-box"
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
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
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
`
const Summary = styled.div`
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
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
const Icons = styled.div`
    display: flex;
    flex-direction: row;
`
toast.configure()
const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    const [resData, setResData] = useState()
    const [subTotal, setSubTotal] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [productQuantity, setProductQuantity] = useState()
    const [cartId, setCartId] = useState()
    const [productPrice, setProductPrice] = useState()
    const [shipping, setShipping] = useState(99)
    

    const notify = (msg) => toast(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })
    const notifyDelete = () => toast.success('Item removed from your cart', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/cart/find/` + userId, { headers: { header, userId } })
            setResData(response.data)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const handleDelete = async (id) => {
        try {
            const result = await confirm("Are you sure about this?");
            if (result) {
                await axios.delete('http://localhost:3001/api/cart/find/' + id, { headers: { header, userId } })
                dispatch(addCart(-1))
                notifyDelete()
                getData()
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const updateCart = async () => {
        const total = productQuantity * productPrice
        try {
            await axios.put('http://localhost:3001/api/cart/quantity/' + cartId, { productQuantity, total }, { headers: { header, userId } })
            getData()
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const handleQuantity = async (id, quantity, price, value) => {
        setCartId(id)
        setProductPrice(price / quantity)
        try {
            if (value === 'dec' && quantity > 1) {
                setProductQuantity(quantity - 1)
            } else if (value === 'dec' && quantity === 1) {
                const result = await confirm("Do you want to remove it?");
                if (result) {
                    await axios.delete('http://localhost:3001/api/cart/find/' + id, { headers: { header, userId } })
                    dispatch(addCart(-1))
                    notifyDelete()
                    getData()
                }
            } else if (value === 'inc') {
                setProductQuantity(quantity + 1)
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const preOrder = async () => {
        const products = resData
        await axios.post('http://localhost:3001/api/preorder', { userId, grandTotal, products }, { headers: { header } })
        navigate('/checkout')
        notify()
    }
    const removePreOrders = async () => {
        try {
            await axios.delete('http://localhost:3001/api/preorder/' + userId, { headers: { header } })
        } catch (error) {
            console.log(error)
        }
    }
    const addToWishlist = async (cart) => {
        const productId = cart.product._id
        const product = cart.product
        const payload = { userId, productId, product }
        try {
            const result = await confirm("Do you want to move this to wishlist?")
            if (result) {
                await axios.post('http://localhost:3001/api/wishlist/', payload, { headers: { header, userId } })
                await axios.delete('http://localhost:3001/api/cart/find/' + cart._id, { headers: { header, userId } })
                dispatch(addCart(-1))
                notifyDelete()
                getData()
            }
        } catch (error) {
            console.log(error)
            error.response.data.msg && notify(error.response.data.msg)
            error.response.data.status && dispatch(logOut()) && notify(error.response.data.msg)
        }
    }

    useEffect(() => {
        removePreOrders()
        getData()
    }, [header])
    useEffect(() => {
        updateCart()
    }, [productQuantity])
    useEffect(() => {
        let total = resData?.reduce((acc, data) => acc + data.total, 0)
        setSubTotal(total)
    }, [resData])
    useEffect(() => {
        setGrandTotal(subTotal + shipping)
    }, [subTotal])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your CART</Title>
                <Top>
                    <TopButton><Link to='/wishlist' style={{ textDecoration: 'none' }}>Your Wishlist</Link></TopButton>
                    <TopButton><Link to='/products' style={{ textDecoration: 'none' }}>Continue Shopping</Link></TopButton>
                </Top>
                <Bottom>
                    <Info>
                        <Hr />
                        {resData?.map(data => (
                            <>
                                <Product key={data._id}>
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
                                            <RemoveIcon
                                                style={{ cursor: 'pointer', color: 'rgb(103, 88, 219)' }}
                                                onClick={() => handleQuantity(data._id, data.quantity, data.total, 'dec')}
                                            />
                                            <ProductAmount>{data.quantity}</ProductAmount>
                                            <AddIcon
                                                style={{ cursor: 'pointer', color: 'rgba(18, 231, 36, 0.981)' }}
                                                onClick={() => handleQuantity(data._id, data.quantity, data.total, 'inc')}
                                            />
                                        </ProductAmountContainer>
                                        <Icons>
                                            <DeleteForeverIcon
                                                style={{ cursor: 'pointer', margin: '10px' }}
                                                onClick={() => handleDelete(data._id)}
                                            />
                                            <FavoriteRoundedIcon
                                                style={{ cursor: 'pointer', color: 'red', margin: '10px' }}
                                                onClick={() => addToWishlist(data)}
                                            />
                                        </Icons>
                                        <ProductPrize>₹ {data.total}</ProductPrize>
                                    </PriceDetails>
                                </Product>
                                <Hr />
                            </>
                        ))}
                    </Info>
                    <Box>
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>SubTotal</SummaryItemText>
                                <SummaryItemPrice>₹ {subTotal}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>₹{shipping}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type='total'>
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>₹ {grandTotal}</SummaryItemPrice>
                            </SummaryItem>
                        </Summary>
                        <Button onClick={preOrder}>Proceed to Checkout</Button>
                    </Box>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart