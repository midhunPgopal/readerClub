import React from 'react'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import PaymentForm from '../components/PaymentForm'

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