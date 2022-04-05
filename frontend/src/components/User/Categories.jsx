import styled from "styled-components"
import CategoryItems from "./CategoryItems"
import { mobile } from "../../responsive"
import { useEffect, useState } from "react"
import axios from "axios"

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: '0px', flexDirection: 'column'})}
`

const Categories = () => {

  const [category, setCategory] = useState()

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get('http://localhost:3001/api/categories')
      setCategory(res.data)
    }
    getCategory()
  })

  return (
    <Container>
        {category?.map(item => (
            <CategoryItems item={item} key = {item.id}/>
        ))}
    </Container>
  )
}

export default Categories