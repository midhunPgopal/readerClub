import styled from "styled-components"
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Link } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logOut } from "../../redux/userRedux";

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
    flex: 1;
    margin: 5px;
    min-width: 280px;
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
    width: 280px;
    height: 350px;
`
const Image = styled.img`
    margin: 10px;
    height: 80%;
    width: 80%;
    z-index: 2;
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
        transform: scale(1.5);
    }
`
toast.configure()
const Product = ({ item }) => {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.currentUser)
    
    let userId = null 
    let header = null

    if(user) { 
        userId = user.user._id
        header = user.accessToken
    }
    
    const quantity = 1
    const chapter = 1
    const total = item.price

    const notifySuccess = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })
    const notifyError = (msg) => toast.error(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })
    

    const addToCart = async (product) => {
        const productId = product._id
        const data = { userId, productId, product, quantity, chapter, total }
        try {
            const res = await axios.post('http://localhost:3001/api/cart/', data, { headers: { header, userId } })
            notifySuccess(res.data.msg)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut()) && notifyError(error.response.data.msg)
        }
    }
    const addToWishlist = async (product) => {
        const productId = product._id
        const payload = { userId, productId, product }
        try {
            const res = await axios.post('http://localhost:3001/api/wishlist/', payload, { headers: { header, userId } })
            notifySuccess(res.data.msg)
        } catch (error) {
            console.log(error.response)
            error.response.data.msg && notifyError(error.response.data.msg)
            error.response.data.status && dispatch(logOut()) && notifyError(error.response.data.msg)
        }
    }

    return (
        <Container>
            <Circle />
            <Card>
                <Image src={item.img} />
                <Title>{item.title}</Title>
            </Card>
            <Info>
                {user &&
                <Icon>
                    <ShoppingCartRoundedIcon onClick={() => addToCart(item)}/>
                </Icon> }
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchRoundedIcon />
                    </Link>
                </Icon>
                {user &&
                <Icon>
                    <FavoriteRoundedIcon onClick={() => addToWishlist(item)}/>
                </Icon> }
            </Info>
        </Container>
    )
}

export default Product