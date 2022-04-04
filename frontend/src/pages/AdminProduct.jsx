import styled from 'styled-components'
import Announcement from '../components/Announcement'
import AdminFooter from '../components/AdminFooter'
import AdminNavbar from '../components/AdminNavbar'

import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'
import Newsletter from '../components/Newsletter'


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
    flex-direction: row;
    ${mobile({ width: '100%' })}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
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

const AdminProduct = () => {

    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/products/find/' + id)
                setProduct(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [id])

    return (
        <Container>
            <Announcement />
            <AdminNavbar />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Description>{product.description}</Description>
                    <Description>Author : <b>{product.author}</b></Description>
                    <Description>Published by <b>{product.publisher}</b> on <b>{dateFormat(product.publishedAt, "mmmm dS, yyyy")}</b></Description>
                    <Price>₹ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Chapter</FilterTitle>
                            <FilterSize >
                                {product.chapters?.map(chapter => (
                                    <FilterSizeOption>{chapter}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                        <Filter>
                            <FilterTitle>Category</FilterTitle>
                            <FilterSize >
                                {product.categories?.map(category => (
                                    <FilterSizeOption>{category}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                        {product.offers?.length>1 && (
                            <Filter>
                                <FilterTitle>Offers</FilterTitle>
                                <FilterSize >
                                    {product.offers?.map(offer => (
                                        <FilterSizeOption>{offer}</FilterSizeOption>
                                    ))}
                                </FilterSize>
                            </Filter>
                        )}
                    </FilterContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <AdminFooter />
        </Container>
    )
}

export default AdminProduct