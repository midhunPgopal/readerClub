import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 60vh;
    background-color: #89eaa4fe;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 90px;
    margin-bottom: 20px;
    color: white;
`

const PaymentForm  = () => {
  return (
    <Container>
      <Title>Order Successfull..!!</Title>
    </Container>
  )
}

export default PaymentForm