import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import { mobile } from '../../responsive'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../redux/userRedux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { confirm } from "react-confirm-box"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const Wrapper = styled.div`
    padding: 40px;
    margin: 20px;
    ${mobile({ pading: '10px' })}
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
const MainTitle = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Bottom = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: row;
    ${mobile({ flexDirection: 'column' })}
`
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
`
const Container = styled.div`
    margin: 5px;
    width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`
const Image = styled.img`
    margin: 10px;
    height: 70%;
    width: 70%;
    z-index: 2;
    object-fit: cover;
`
const Title = styled.h1`
    font-size: 20px;
    color: teal;
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.1s ease;
    cursor: pointer;
    text-decoration: none;

    &:hover{
        transform: scale(1.6);
    }
`

toast.configure()
const Wishlist = () => {

    const dispatch = useDispatch()

    const [resData, setResData] = useState()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    const notifyClear = () => toast.warning('Wishlist cleared', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })
    const notify = () => toast.success('Product added to cart', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })
    const notifyDelete = () => toast.warning('Product removed from wishlist', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/wishlist/' + userId, { headers: { header, userId } })
            console.log(response.data)
            setResData(response.data)
        } catch (error) {
            console.log(error);
            error.response.data.status && dispatch(logOut())
        }
    }
    const emptyWishlist = async () => {
        try {
            const result = await confirm('Are you sure want to clear your Wishlist')
            if (result) {
                await axios.delete('http://localhost:3001/api/wishlist/' + userId, { headers: { header, userId } })
                getData()
                notifyClear()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async (id) => {
        try {
            const result = await confirm("Are you sure about this?");
            if (result) {
                await axios.delete('http://localhost:3001/api/wishlist/find/' + id, { headers: { header, userId } })
                getData()
                notifyDelete()
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const addToCart = async (product) => {
        const total = product.price
        const productId = product._id
        const payload = { userId, productId, product, total } 
        const id = product._id
        try {
            await axios.post('http://localhost:3001/api/cart/', payload, { headers: { header, userId } })
            await axios.delete('http://localhost:3001/api/wishlist/find/' + id, { headers: { header, userId } })
            getData()
            notify()
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Announcement />
            <Navbar />
            <Wrapper>
                <MainTitle>Your WISHLIST</MainTitle>
                <Top>
                    <TopButton><Link to='/cart' style={{ textDecoration: 'none' }}>Your Cart</Link></TopButton>
                    <TopButton onClick={emptyWishlist}>Empty Wishlist</TopButton>
                </Top>
                <Bottom >
                    {resData?.map(data => (
                        <Container>
                            <Circle />
                            <Card>
                                <Image src={data.product.img} />
                                <Title>{data.product.title}</Title>
                            </Card>
                            <Info>
                                <Icon>
                                    <AddShoppingCartIcon
                                        style={{ cursor: 'pointer', color: 'teal' }}
                                        onClick={() => addToCart(data.product)}
                                    />
                                </Icon>
                                <Icon>
                                    <DeleteForeverIcon
                                        style={{ cursor: 'pointer', color: 'red' }}
                                        onClick={() => handleDelete(data.productId)}
                                    />
                                </Icon>
                            </Info>
                        </Container>
                    ))}
                </Bottom>
            </Wrapper>
            <Footer />
        </>
    )
}

export default Wishlist