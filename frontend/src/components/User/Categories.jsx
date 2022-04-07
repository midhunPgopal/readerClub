import styled from "styled-components"
import CategoryItems from "./CategoryItems"
import { mobile } from "../../responsive"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../redux/userRedux"

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: '0px', flexDirection: 'column' })}
`

const Categories = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const userId = user.currentUser.user._id
  const header = user.currentUser.accessToken

  const [category, setCategory] = useState()

  const getCategory = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/categories', { headers: { header, userId } })
      setCategory(res.data)
    } catch (error) {
      console.log(error)
      error.response.data.status && dispatch(logOut())   
    }
  }

  useEffect(() => {
    getCategory()
  })

  return (
    <Container>
      {category?.map(item => (
        <CategoryItems item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default Categories