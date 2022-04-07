import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'
import { confirm } from 'react-confirm-box'
import { toast } from 'react-toastify'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ pading: '10px' })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Table = styled.table`
    padding: 20px;
    margin: 20px 0px 20px;
    width: 100%;
`
const Td = styled.td`
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
`
const Th = styled.th`
    height: 60px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`
const Thead = styled.thead`
    text-align: left;
`
const Tr = styled.tr`
   &:hover {
       background-color: #c8edd2fe;
   }
`
const Tbody = styled.tbody`
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px' })}
`
const Button = styled.button`
    padding: 5px;
    border: none;
   background-color: #8bf1a5fe;
   color: white;
   text-align: center;
   cursor: pointer;
   border-radius: 20px;
   box-shadow: 2px 4px lightgrey;

   &:hover {
    background-color: #00ff40fe;
   }
`
const ButtonBlock = styled.button`
    padding: 5px;
    border: none;
    background-color: rgb(249, 121, 121);
    color: white;
    text-align: center;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 2px 4px lightgrey;

    &:hover {
        background-color: rgb(246, 0, 0);
    }
`
const ButtonUnblock = styled.button`
    padding: 5px;
    border: none;
    background-color: #6f85e678;
    color: white;
    text-align: center;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 2px 4px lightgrey;

    &:hover {
        background-color: #0b34eb78;
    }
`
toast.configure()
const UsersAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const [users, setUsers] = useState()
    const [flag, setFlag] = useState(null)

    const notifyBlocked = () => {
        toast.warning('User blocked', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const notifyUnblocked = () => {
        toast.info('User unblocked', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const getUsers = async () => {
        const res = await axios.get('http://localhost:3001/api/users', { headers: { header } })
        setUsers(res.data)
    }
    const block = async (id) => {
        const result = await confirm('Do you want to block this user?')
        if(result) {
            await axios.put('http://localhost:3001/api/users/status/' + id, {status: false}, {headers: {header}} )
            notifyBlocked()
            setFlag(true)
        }
    }
    const unblock = async (id) => {
        const result = await confirm('Do you want to unblock this user?')
        if(result) {
            await axios.put('http://localhost:3001/api/users/status/' + id, {status: true}, {headers: {header}} )
            notifyUnblocked()
            setFlag(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [flag])

    return (
        <Container>
            <Wrapper>
                <Title>All users</Title>
                <Hr />
                <Table>
                    <Thead >
                        <Tr>
                            <Th scope="col">Created Date</Th>
                            <Th scope="col">Last Update</Th>
                            <Th scope="col">Name</Th>
                            <Th scope="col">Email</Th>
                            <Th scope="col">Mobile</Th>
                            <Th scope="col">Admin Status</Th>
                            <Th scope='col'></Th>
                            <Th scope='col'></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users?.map(data => (
                            <Tr key={data._id}>
                                <Td >{dateFormat(data.createdAt, "mmmm dS, yyyy")}</Td>
                                <Td >{dateFormat(data.updatedAt, "mmmm dS, yyyy")}</Td>
                                <Td>{data.name}</Td>
                                <Td>{data.email}</Td>
                                <Td>{data.mobile}</Td>
                                {data.isAdmin === true ? <Td>True</Td> : <Td>False</Td>}
                                {data.status ?
                                    <Td><ButtonBlock onClick={() => block(data._id)}>Block</ButtonBlock></Td> :
                                    <Td><ButtonUnblock onClick={() => unblock(data._id)}>Unblock</ButtonUnblock></Td>
                                }
                                <Td>
                                    <Link to={`/edituser/${data._id}`} style={{ textDecoration: 'none' }}>
                                        <Button>Modify</Button>
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Wrapper>
        </Container>
    )
}

export default UsersAdmin