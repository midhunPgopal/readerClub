import React from 'react'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newsletter'
import PaymentForm from '../../components/User/PaymentForm'

const Payment = () => {
    return (
        <>
            <Announcement />
            <Navbar />
            <PaymentForm />
            <Newsletter />
            <Footer />
        </>
    )
}

export default Payment