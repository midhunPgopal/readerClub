import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditAnnouncementForm from '../../components/AnnouncementManagement/EditAnnouncementForm'
import AdminNavbar from '../../components/Admin/AdminNavbar'
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

const EditAnnouncement = () => {

  const location = useLocation()

  const [announcement, setAnnouncement] = useState()
  
  const id = location.pathname.split('/')[2] 

  const getAnnouncement = async () => {
    const res = await axios.get('http://localhost:3001/api/announcement')
    const [data] = res.data
    setAnnouncement(data)
  }

  useEffect(() => {
    getAnnouncement()
  }, [])

  return (
    <> 
      <AdminNavbar />
      <Container>
        <Title>Update Announcement</Title>
        <FormContainer>
          {announcement ? <EditAnnouncementForm preloadedData={announcement} /> : <h1 style={{ textAlign: 'center' }}>Loading..</h1>}
        </FormContainer>
      </Container>
      <AdminFooter />
    </>
  )
}

export default EditAnnouncement