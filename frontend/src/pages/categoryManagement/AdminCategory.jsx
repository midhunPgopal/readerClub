import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import CategoryAdmin from '../../components/CategoryManagement/CategoryAdmin'

const AdminCategory = () => {
  return (
    <>
      <AdminNavbar />
      <CategoryAdmin />
      <AdminFooter />
    </>
  )
}

export default AdminCategory