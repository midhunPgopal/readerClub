import styled from 'styled-components'
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../../responsive'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/userRedux'
import  { previousCart } from '../../redux/cartRedux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from "react-confirm-box"
import axios from 'axios';
import { useEffect, useState } from 'react';


const Container = styled.div`
    height: 80px;
    ${mobile({ height: '50px' })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: '10px 0px' })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size:14px;
    cursor: pointer;
    ${mobile({ display: 'none' })}
`

const SearchContainer = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    ${mobile({ width: '50px' })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: '2', justifyContent: 'center' })}
`

const MenuItem = styled.div`
    font-size: 18px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`
const Title = styled.div`
    font-size: 18px;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: '20px' })}
`

toast.configure()
const Navbar = () => {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.currentUser)
    const cart = useSelector((state) => state.cart.currentCart)

    let userId = null
    let header = null

    const [quantity, setQuantity] = useState()

    if (user) { 
        userId = user.user._id
        header = user.accessToken
    }

    const notify = () => {
        toast('Come back soon', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const getCartItems = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/cart/find/' + userId, { headers: {header, userId} })
            setQuantity(res.data.length)
            dispatch(previousCart(res.data.length))
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async () => {
        const logout = (dispatch) => {
            dispatch(logOut())
            notify()
        }
        const result = await confirm("Are you sure?");
        if (result) {
            logout(dispatch)
        }
    }
    useEffect(() => {
        if(user) {
            getCartItems()
        }
    }, [])

    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>
                        <Language>EN</Language>
                        <SearchContainer>
                            <Input placeholder='search' />
                            <SearchIcon style={{ color: 'grey', fontSize: 16 }} />
                        </SearchContainer>
                    </Left>
                    <Center>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Logo>Reader Club©</Logo>
                        </Link>
                    </Center>
                    <Right>
                        {user ? <>
                            <Title >Welcome <b style={{ textTransform: 'uppercase', color: 'teal' }}>{user.user.name}</b></Title>
                            <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                            <Link to='/cart'>
                                <MenuItem>
                                    <Badge badgeContent={cart} color="secondary">
                                        <ShoppingCartOutlinedIcon />
                                    </Badge>
                                </MenuItem>
                            </Link>
                        </> :
                            <>
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <MenuItem>LOGIN</MenuItem>
                                </Link>
                                <Link to='/register' style={{ textDecoration: 'none' }}>
                                    <MenuItem>REGISTER</MenuItem>
                                </Link>
                            </>}
                    </Right>
                </Wrapper>
            </Container>
        </div>
    )
}

export default Navbar