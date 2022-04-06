import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import UsersAdmin from '../../components/UserManagement/UsersAdmin'

const AdminUser = () => {
  return (
    <>
    <AdminNavbar/>
    <UsersAdmin/>
    <AdminFooter/>
    </>
  )
}

export default AdminUser