import styled from "styled-components"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import EmailIcon from '@mui/icons-material/Email'

import { Link } from 'react-router-dom';
import { mobile } from "../../responsive"

const Container = styled.div`
    display: flex;
    background-color: #91cfad;
    ${mobile({ flexDirection: 'column' })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-left: 10px;
`
const Logo = styled.h1`

`
const Description = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
    flex: 1;
    padding: 10px;
    ${mobile({ display: 'none' })}
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.div`
    width: 50%;
    margin-bottom: 20px;
`
const Right = styled.div`
    padding: 10px;
    flex: 1;
    margin-right: 10px;
`
const ContactItem = styled.div`
 margin-bottom: 20px;
 display: flex;
 align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Reader Club©</Logo>
                <Description>Best online portal for the ones who loves to read</Description>
                <SocialContainer>
                    <SocialIcon color='3B5999'>
                        <FacebookRoundedIcon />
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <TwitterIcon />
                    </SocialIcon>
                    <SocialIcon color='E60023'>
                        <PinterestIcon />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></ListItem>
                    <ListItem><Link to='/cart' style={{ textDecoration: 'none' }}>Cart</Link></ListItem>
                    <ListItem><Link to='/orders' style={{ textDecoration: 'none' }}>Order tracking</Link></ListItem>
                    <ListItem><Link to='/' style={{ textDecoration: 'none' }}>My Account</Link></ListItem>
                    <ListItem><Link to='/wishlist' style={{ textDecoration: 'none' }}>Wishlist</Link></ListItem>
                    <ListItem><Link to='/' style={{ textDecoration: 'none' }}>Categories</Link></ListItem>
                    <ListItem><Link to='/' style={{ textDecoration: 'none' }}>Terms and Conditions</Link></ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <LocationOnIcon style={{ marginRight: '10px' }} />Crossroads, Kochi
                </ContactItem>
                <ContactItem>
                    <PermPhoneMsgIcon style={{ marginRight: '10px' }} />+91 9778147103
                </ContactItem>
                <ContactItem>
                    <EmailIcon style={{ marginRight: '10px' }} />readerclub@club.co.in
                </ContactItem>
                <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
            </Right>
        </Container>
    )
}

export default Footer