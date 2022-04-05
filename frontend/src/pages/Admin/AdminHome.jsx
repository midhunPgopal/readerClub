import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import AdminProduct from '../../components/Admin/AdminProduct'

const AdminHome = () => {
  return (
    <>
    <AdminNavbar/>
    <AdminProduct/>
    <AdminFooter/>
    </>
  )
}

export default AdminHome