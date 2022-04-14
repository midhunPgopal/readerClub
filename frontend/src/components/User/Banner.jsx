import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { mobile } from '../../responsive';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ display: 'none' })}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${(props) => props.direction === 'left' && '10px'};
    right: ${(props) => props.direction === 'right' && '10px'};
    cursor: pointer;
    opacity: 0.7;   
    z-index: 2; 
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`

const Slide = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    background-color: ${props => props.bg};
`

const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
`

const Image = styled.img`
    height: 100%;
    object-fit: cover;
`

const InfoContainer = styled.div`
    flex:1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Offer = styled.p`
    margin: 50px 0px;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 1px;
`

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: trasperant;
    cursor: pointer;
`

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [banner, setBanner] = useState()

    const handleClick = (direction) => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else if (direction === 'right') {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    const getBanner = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/banner')
            setBanner(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBanner()
    }, [])

    return (
        <Container>
            <Arrow direction='left' onClick={() => handleClick('left')}>
                <ArrowLeftRoundedIcon />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {banner?.map(item => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.description}</Desc>
                            <Offer>{item.offerDescription}</Offer>
                            <Link to={`/products/offer/${item.offerCode}`}>
                                <Button>BUY NOW</Button>
                            </Link>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction='right' onClick={() => handleClick('right')}>
                <ArrowRightRoundedIcon />
            </Arrow>
        </Container>
    )
}

export default Slider