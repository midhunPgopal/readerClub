import styled from 'styled-components'
import { mobile } from '../../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
    margin: 3px;
    height: 400px;
    width: 350px;
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: '30vh' })}
`

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    text-transform: capitalize;
`

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItems = ({ item }) => {
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title >{item.category}</Title>
                <Link to={`/products/cat/${item.category}`}>
                    <Button>Shop Now</Button>
                </Link> 
            </Info>
        </Container>
    )
}

export default CategoryItems