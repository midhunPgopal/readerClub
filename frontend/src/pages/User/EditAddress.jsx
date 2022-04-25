import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditAddressForm from '../../components/AddressManagement/EditAddressForm'
import NavBar from '../../components/User/Navbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import styled from 'styled-components'

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
    url('https://mcdn.wallpapersafari.com/medium/96/49/1qkOeG.jpg') center;
  background-size: cover;
`
const Title = styled.h1`
  margin: 50px 0px 0px 50px;
  text-align: left;
  font-weight: 600;
  color: #30163efe;
`
const FormContainer = styled.div`
  margin: 10px;
  padding: 10px;
`

const EditAddress = () => {

  const location = useLocation()

  const [address, setAddress] = useState()
  
  const id = location.pathname.split('/')[2] 

  const getAddress = async () => {
    const res = await axios.get('http://localhost:3001/api/address/find/' + id,)
    console.log(res.data);
    setAddress(res.data)
  }

  useEffect(() => {
    getAddress()
  }, [])

  return (
    <> 
      <NavBar />
      <Container>
        <Title>Update Address</Title>
        <FormContainer>
          {address ? <EditAddressForm preloadedData={address} /> : <h1 style={{ textAlign: 'center' }}>Loading..</h1>}
        </FormContainer>
      </Container>
      <AdminFooter />
    </>
  )
}

export default EditAddress