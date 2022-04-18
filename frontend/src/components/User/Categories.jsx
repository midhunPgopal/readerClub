import styled from "styled-components"
import CategoryItems from "./CategoryItems"
import { mobile } from "../../responsive"
import { useEffect, useState } from "react"
import axios from "axios"

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: row;
    ${mobile({ padding: '0px', flexDirection: 'column' })}
`

const Categories = () => {

  const [category, setCategory] = useState()

  const getCategory = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/categories')
      setCategory(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <Container>
      {category?.map(item => (
        <CategoryItems item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default Categories