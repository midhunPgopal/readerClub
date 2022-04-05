import styled from "styled-components"
import Product from "./Product"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

const Main = styled.div`
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px; 
`
const Button = styled.button`
  margin: 20px;
  padding: 10px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #26e090fe;
  }
`

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  useEffect(() => {
    const getproducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:3001/api/products?category=${cat}`
          : `http://localhost:3001/api/products`)
        setProducts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getproducts()
  }, [])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products, cat, filters])

  useEffect(() => {
    const getFilteredProducts = async () => {
      const res = await axios.get(`http://localhost:3001/api/products?category=${filters}`)
      setFilteredProducts(res.data)
    }
    getFilteredProducts()
  }, [filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(prev => [...prev].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)))
    } else if (sort === 'oldest') {
      setFilteredProducts(prev => [...prev].sort((a, b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt)))
    } else if (sort === 'asc') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Main>
      <Container>
        {cat ? filteredProducts.map(item => (
          <Product item={item} key={item.id} />
        )) : 
        products.map(item => (
          <Product item={item} key={item.id} />
        ))}
      </Container>
      {!cat && !filters && <ButtonContainer>
        <Link to='/products' style={{ textDecoration: 'none' }}>
          <Button>View All Books</Button>
        </Link>
      </ButtonContainer>}
    </Main>
  )
}

export default Products