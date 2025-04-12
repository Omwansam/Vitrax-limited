import React from 'react'
import AdminHeader from '../AdminHeader'
import AdminSidebar from '../AdminSidebar'
import { Outlet } from 'react-router'
import './AdminLayout.css'


const AdminLayout = () => {
  return (
    <div className='admin-dashboard'>
        <AdminHeader />
        <div className='admin-container'>
            <AdminSidebar />
            <main className='admin-content'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout
