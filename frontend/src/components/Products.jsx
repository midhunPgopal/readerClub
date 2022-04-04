import styled from "styled-components"
import Product from "./Product"
import { useEffect, useState } from "react"
import axios from 'axios'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
  }, [cat])

  useEffect(() => {
    cat &&
      setFilteredProducts(products.filter((item) => Object.entries(filters).every(([key, value]) =>
        item.chapters[key].includes(value)
      )))
  }, [products, filters])

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
    <Container>
      {cat ? filteredProducts.map(item => (
        <Product item={item} key={item.id} />
      )) : products
        .slice(0, 5)
        .map(item => (
          <Product item={item} key={item.id} />
        ))
      }
    </Container>
  )
}

export default Products