import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { mobile } from '../responsive' 
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { publicRequest } from '../requestMethods'

const Container = styled.div``
const Wrapper = styled.div`
    margin: 20px 20px;
    padding: 50px;
    display: flex;
    ${mobile({ padding: '10px', flexDirection: 'column'})}
`
const ImageContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    margin-left: 40px;
    width: 70%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: '40vh'})}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: '10px'})}
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
    ${mobile({ width: '100%'})}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
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
    ${mobile({ width: '100%'})}
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

const Product = () => {

    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get('/products/find/'+id)
                console.log(res)
                setProduct(res.data)
            } catch (error) {
                console.log(error)
            }   
        }
        getProduct() 
    }, [id])

  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Wrapper>
            <ImageContainer>
                <Image src={product.img}/>
            </ImageContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Description>{product.description}</Description>
                <Price>{product.price}</Price>
                <FilterContainer>
                <Filter>
                    <FilterTitle>Color</FilterTitle>
                        {product.color.map(clr => {
                            <FilterColor color = {clr} key={clr}/>
                        })}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            {product.size.map(sizes => {
                                <FilterSizeOption>{sizes}</FilterSizeOption>
                            })}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <RemoveIcon/>
                        <Amount>1</Amount>
                        <AddIcon/>
                    </AmountContainer>
                    <Button>Add to Cart</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product