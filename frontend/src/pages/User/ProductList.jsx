import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newsletter'
import Products from '../../components/User/Products'
import { mobile } from '../../responsive'

const Container = styled.div`

`
const Title = styled.h1`
    margin: 20px;
    text-transform: capitalize;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column'})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: '0px'})}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: '10px 0px'})}
`
const Option = styled.option``

const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split('/')[2]
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState('newest')
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('http://localhost:3001/api/categories')
            setCategories(res.data)
        }
        getCategories()
    }, [])

  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products</FilterText>
                <Select  onChange={e => setFilters(e.target.value)}>
                    <Option disabled >Categories</Option>
                    <Option >{undefined}</Option>
                    {categories?.map(item => (
                        <Option>{item.category}</Option>
                    ))}
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products</FilterText>
                <Select onChange={e => setSort(e.target.value)}>
                    <Option value='newest'>Newest</Option>
                    <Option value='oldest'>Oldest</Option>
                    <Option value='asc'>Price (asc)</Option>
                    <Option value='desc'>Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList