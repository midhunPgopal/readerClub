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
import { addCart } from '../../redux/cartRedux'
import { useForm } from 'react-hook-form'


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
    display: flex;
    flex-direction: column;
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
const InputContainer = styled.div`
flex: 1;
`
const Form = styled.form`
display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Input = styled.input`
  width: 300px;
  margin: 10px;
  padding: 10px;
  ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
  `
const Error = styled.span`
  font-size: 14px;
  padding: 5px;
  color: #f16969;
  `
const ButtonContainer = styled.div`
flex: 1;
margin: 20px;
display: flex;
justify-content: flex-start;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
  `
const ButtonClose = styled.button`
  width: 10%;
  border: none;
  margin-left: 20px;
  background-color: #f43b3bfe;
  color: white;
  cursor: pointer;
`
const ReviewWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 20px 50px 20px 50px;
    padding: 10px;
`
const ButtonReview = styled.button`
    width: 10%;
    padding: 10px;
    border: none;
    background-color: #94150cf0;
    color : white;
    cursor: pointer;
    border-radius: 20px;
    
    &:hover {
        background-color: #f53022f0;
    }
    `
const Review = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px 0px 0px;
`
const UserName = styled.span`
    margin-right: 15px;
`
const Rating = styled.span`
margin-right: 15px;
`
const Details = styled.span`
margin-right: 15px;
`
toast.configure()
const Product = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const user = useSelector((state) => state.user.currentUser)
    let userId = null
    let header = null
    let userName = null

    if (user) {
        userId = user.user._id
        userName = user.user.name
        header = user.accessToken
    }

    const id = location.pathname.split('/')[2]

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [chapter, setChapter] = useState(1)
    const [price, setPrice] = useState()
    const [review, setReview] = useState()
    const [flag, setFlag] = useState(false)
    const [offer, setoffer] = useState()
    const [discount, setDiscount] = useState()
    const [final, setFinal] = useState()

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
            const amount = price * quantity
            let total = 0
            if (discount) {
                total = amount - (amount * discount)
            } else {
                total = amount
            }
            const productId = product._id
            const data = { userId, productId, product, quantity, chapter, total }
            const res = await axios.post('http://localhost:3001/api/cart/', data, { headers: { header, userId } })
            dispatch(addCart(1))
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }

    const getProduct = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/products/find/' + id)
            setProduct(res.data)
            setPrice(res.data.price)
            const [offerArray] = res.data.offers
            if (offerArray !== '') {
                setoffer(res.data.offers)
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const getReview = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/review/' + product._id)
            setReview(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const addReview = async (data) => {
        const payload = { productId: product._id, name: userName, rating: data.rating, details: data.details }
        try {
            const res = await axios.post('http://localhost:3001/api/review', payload, { headers: { header, userId } })
            setFlag(false)
            getReview()
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    }

    const getOffer = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/banner/get/' + offer)
            setDiscount(res.data.discount)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProduct()
    }, [])
    useEffect(() => {
        getReview()
    }, [product])
    useEffect(() => {
        getOffer()
        setFinal(price - (price * discount))
    }, [offer])
    useEffect(() => {
        setFinal(price - (price * discount))
    }, [discount])

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
                    {!offer &&
                        <Price>₹ {product.price}</Price>
                    }
                    {offer &&
                        <>
                            <Price style={{ textDecoration: 'line-through' }}>₹ {price}</Price>
                            <Price style={{ color: 'green' }}>₹ {final}</Price>
                        </>
                    }
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
            {user &&
                <ButtonContainer style={{ padding: '20px' }}>
                    <ButtonReview onClick={() => setFlag(true)}>Add review</ButtonReview>
                </ButtonContainer>
            }
            {flag &&
                <Form onSubmit={handleSubmit(addReview)} style={{ marginLeft: '20px' }}>
                    <InputContainer>
                        <Input id="rating" type='number' step="0.01" placeholder='Your rating out of 10' {...register('rating', { required: true })} />
                        <Error>
                            {errors.rating && errors.rating.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="details" type='text' placeholder='About the book' {...register('details', { minLength: 10 })} />
                        <Error>
                            {errors.details && errors.details.type === "minLength" && <span>Min length of 10 letters required</span>}
                        </Error>
                    </InputContainer>
                    <ButtonContainer>
                        <ButtonSubmit type='submit' >Add Review</ButtonSubmit>
                        <ButtonClose onClick={() => setFlag(false)}>Close</ButtonClose>
                    </ButtonContainer>
                </Form>
            }
            <ReviewWrapper>
                {review?.map(item => (
                    <Review>
                        <>
                            <UserName><b>Name</b> : {item.name}</UserName>
                            <Rating><b>Rating </b> : {item.rating} / 10</Rating>
                            <Details><b>Review</b> : {item.details}</Details>
                        </>
                    </Review>
                ))}
            </ReviewWrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product