import React, { useState } from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import AdminProduct from '../../components/ProductManagement/AdminProduct'
import CategoryAdmin from '../../components/CategoryManagement/CategoryAdmin'
import OrdersAdmin from '../../components/OrderManagement/OrdersAdmin'
import UsersAdmin from '../../components/UserManagement/UsersAdmin'
import BannerAdmin from '../../components/BannerManagement/BannerAdmin'
import AnnouncementAdmin from '../../components/AnnouncementManagement/AnnouncementAdmin'
import styled from 'styled-components'
import { mobile } from '../../responsive'

const Wrapper = styled.div`
  display: flex;
`
const SideBarDiv = styled.div`
  flex:1;
  height: 100%;
  margin: 20px;
  padding: 20px;
`
const Content = styled.div`
  flex: 5;
  height: 100%;
`
const Container = styled.div`
    display: flex;
    background-color: lightgrey;
    flex-direction: column;
    ${mobile({ flexDirection: 'column' })}
`
const List = styled.ul`
    margin: 10px;
    padding: 10px;
    list-style: none;
`
const ListItem = styled.div`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
`


const AdminHome = () => {

  const [homeFlag, setHomeFlag] = useState(false)
  const [productFlag, setProductFlag] = useState(false)
  const [userFlag, setUserFlag] = useState(false)
  const [orderFlag, setOrderFlag] = useState(false)
  const [categoryFlag, setCategoryFlag] = useState(false)
  const [bannerFlag, setBannerFlag] = useState(false)
  const [announcementFlag, setAnnouncementFlag] = useState(false)

  const getHome = () => {
    setHomeFlag(true)
    setProductFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setCategoryFlag(false)
    setBannerFlag(false)
    setAnnouncementFlag(false)
  }
  const getProduct = () => {
    setProductFlag(true)
    setHomeFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setCategoryFlag(false)
    setBannerFlag(false)
    setAnnouncementFlag(false)
  }
  const getUser = () => {
    setUserFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setOrderFlag(false)
    setCategoryFlag(false)
    setBannerFlag(false)
    setAnnouncementFlag(false)
  }
  const getOrder = () => {
    setOrderFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setUserFlag(false)
    setCategoryFlag(false)
    setBannerFlag(false)
    setAnnouncementFlag(false)
  }
  const getCategory = () => {
    setCategoryFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setBannerFlag(false)
    setAnnouncementFlag(false)
  }
  const getBanner = () => {
    setBannerFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setCategoryFlag(false)
    setAnnouncementFlag(false)
  }
  const getAnnouncement = () => {
    setAnnouncementFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setCategoryFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setBannerFlag(false)
  }

  return (
    <>
      <AdminNavbar />
      <Wrapper>
        <SideBarDiv>
          <Container>
            <List>
              <ListItem onClick={getHome}>Admin Home</ListItem>
              <ListItem onClick={getProduct}>Product Management</ListItem>
              <ListItem onClick={getUser}>User Management</ListItem>
              <ListItem onClick={getOrder}>Order Management</ListItem>
              <ListItem onClick={getCategory}>Category Management</ListItem>
              <ListItem onClick={getBanner}>Banner Management</ListItem>
              <ListItem onClick={getAnnouncement}>Announcement Management</ListItem>
            </List>
          </Container>
        </SideBarDiv>
        <Content>
        {productFlag && <AdminProduct /> }
        {categoryFlag && <CategoryAdmin /> }
        {orderFlag && <OrdersAdmin /> }
        {userFlag && <UsersAdmin /> }
        {bannerFlag && <BannerAdmin /> }
        {announcementFlag && <AnnouncementAdmin /> }
        </Content>
      </Wrapper>
      <AdminFooter />
    </>
  )
}

export default AdminHome