import styled from 'styled-components'
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { mobile } from '../responsive'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../redux/userRedux'

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


const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector((state) => state.user.currentUser)

    const dispatch = useDispatch()
    const handleClick = () => {
        const logout = async (dispatch) => {
            alert('User logged out')
            dispatch(logOut())
        }
        logout(dispatch)
    }

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
                            <Title >Welcome <b style={{textTransform: 'uppercase', color: 'teal'}}>{user.user.name}</b></Title>
                            <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                        </>
                            : <>
                                <Link to='/register' style={{ textDecoration: 'none' }}>
                                    <MenuItem>REGISTER</MenuItem>
                                </Link>
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <MenuItem>LOGIN</MenuItem>
                                </Link>
                            </>}
                        <Link to='/cart'>
                            <MenuItem>
                                <Badge badgeContent={quantity} color="secondary">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </MenuItem>
                        </Link>
                    </Right>
                </Wrapper>
            </Container>
        </div>
    )
}

export default Navbar