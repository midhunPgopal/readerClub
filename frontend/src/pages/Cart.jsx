import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

import { mobile } from '../responsive' 
import { useSelector } from 'react-redux'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ pading: '10px'})}
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
    ${mobile({ display: 'none'})}
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
    ${mobile({ flexDirection: 'column'})}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column'})}
`
const ProductDetails = styled.div`
    flex: 2;
    display: flex;
    ${mobile({ margin: '20px'})}
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
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
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
    ${mobile({ marginBottom: '5px'})}
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: '5px 15px'})}
`
const ProductPrize = styled.div`
    font-size: 30px;
    font-weight: 200;
`
const Hr = styled.hr`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px'})}
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 55vh;
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
`

const Cart = () => {
    const cart = useSelector(state => state.cart)
  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Wrapper>
            <Title>Your CART</Title>
            <Top>
                <TopButton>Continue Shopping</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist</TopText>
                </TopTexts>
                <TopButton type='filled'>CheckOut now</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.product?.map(product => (
                        <Product>
                        <ProductDetails>
                            <Image src={product.img}/>
                            <Details>
                                <ProductName><b>Product:</b>{product.title}</ProductName>
                                <ProductId><b>ID:</b>{product._id}</ProductId>
                                <ProductColor color='black'/>
                                <ProductSize><b>Size:</b>{product.size}</ProductSize>
                            </Details>
                        </ProductDetails>
                        <PriceDetails>
                            <ProductAmountContainer>
                                <RemoveIcon/>
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <AddIcon/>
                            </ProductAmountContainer>
                            <ProductPrize>INR {product.price}</ProductPrize>
                        </PriceDetails>
                        <Hr/>
                    </Product>
                    ))}   
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>SubTotal</SummaryItemText>
                        <SummaryItemPrice>INR {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>INR 0</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Coupon Discount</SummaryItemText>
                        <SummaryItemPrice>INR 125</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type='total'>
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>INR {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <Button>CHECKOUT NOW</Button>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart