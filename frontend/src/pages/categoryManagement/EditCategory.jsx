import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditCategoryForm from '../../components/CategoryManagement/EditCategoryForm'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import styled from 'styled-components'

const Container = styled.div`
  margin: 70px;
  padding: 10px;
`
const Title = styled.h1`
  font-weight: 600;
  color: #30163efe;
`
const FormContainer = styled.div`
  margin: 10px;
  padding: 10px;
`

const EditCategory = () => {

  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const [category, setCategory] = useState()

  const getCategory = async () => {
    const res = await axios.get('http://localhost:3001/api/categories/find/' + id)
    let {category, img} = res.data
    const data = {category, img}
    setCategory(data)
  }

  useEffect(() => {
    getCategory()
  }, [id])

  return (
    <> 
      <AdminNavbar />
      <Container>
        <Title>Update Category</Title>
        <FormContainer>
          {category ? <EditCategoryForm preloadedData={category} /> : <h1 style={{ textAlign: 'center' }}>Loading..</h1>}
        </FormContainer>
      </Container>
      <AdminFooter />
    </>
  )
}

export default EditCategory