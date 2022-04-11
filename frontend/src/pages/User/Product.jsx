import styled from 'styled-components'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newsletter'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { mobile } from '../../responsive'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios'
import dateFormat from 'dateformat'
import { logOut } from '../../redux/userRedux'


const Container = styled.div``
const Wrapper = styled.div`
    margin: 20px 20px;
    padding: 50px;
    display: flex;
    ${mobile({ padding: '10px', flexDirection: 'column' })}
`
const ImageContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    margin-left: 40px;
    width: 70%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: '40vh' })}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
    font-weight: 200;
    font-size: 45px;
`
const Description = styled.p`
    margin: 20px 0px;
    font-size: 25px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: '100%' })}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: '100%' })}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;

`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    border-radius: 10%;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #accfddf3;
    }
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
toast.configure()
const Product = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const user = useSelector((state) => state.user.currentUser)
    let userId = null
    let header = null

    if (user) {
        userId = user.user._id
        header = user.accessToken
    }

    const id = location.pathname.split('/')[2]

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [chapter, setChapter] = useState('')
    const [price, setPrice] = useState()

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }
    const handleClick = async (product) => {
        try {
            const total = price * quantity
            const productId = product._id
            const data = { userId, productId, product, quantity, chapter, total }
            const res = await axios.post('http://localhost:3001/api/cart/', data, { headers: { header, userId } })
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }

    const getProduct = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/products/find/' + id )
            setProduct(res.data)
            console.log(res.data);
            setPrice(res.data.price)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Description>{product.description}</Description>
                    <Description>Author : <b>{product.author}</b></Description>
                    <Description>Category : <b>{product.categories?.map(category => category + ' ,')}</b></Description>
                    <Description>Published by <b>{product.publisher}</b> on {dateFormat(product.publishedAt, "mmmm dS, yyyy")}</Description>
                    <Price>₹ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Chapter</FilterTitle>
                            <FilterSize onChange={(e) => setChapter(e.target.value)}>
                                {product.chapters?.map(chapter => (
                                    <FilterSizeOption>{chapter}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    {user &&
                        <AddContainer>
                            <AmountContainer>
                                <RemoveIcon onClick={() => handleQuantity('dec')} />
                                <Amount>{quantity}</Amount>
                                <AddIcon onClick={() => handleQuantity('inc')} />
                            </AmountContainer>
                            <Button onClick={() => handleClick(product)} >Add to Cart</Button>
                        </AddContainer>
                    }
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product