import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import OrdersAdmin from '../../components/OrderManagement/OrdersAdmin'

const AdminOrder = () => {
  return (
    <>
      <AdminNavbar />
      <OrdersAdmin />
      <AdminFooter />
    </>
  )
}

export default AdminOrder