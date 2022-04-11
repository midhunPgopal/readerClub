import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { confirm } from 'react-confirm-box'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import dateFormat from 'dateformat'

const Container = styled.div`
  margin: 30px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  `
const TopButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`
const Button = styled.button`
  width: 10%;
  border: none;
  border-radius: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 50px;

  &:hover {
    background-color: #26e090fe;
  }
`
const Product = styled.div`
display: flex;
flex-direction: row;
`
const Title = styled.h3`
margin: 10px;
text-align: center;
color: #4b1f4cfe;
`
const AddProduct = styled.div`
  margin: 0px;
`
const InputContainer = styled.div`
  flex: 1;
`
const ButtonContainer = styled.div`
flex: 1;
margin: 20px;
display: flex;
justify-content: flex-start;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
`
const ButtonClose = styled.button`
  width: 10%;
  border: none;
  margin-left: 20px;
  background-color: #f43b3bfe;
  color: white;
  cursor: pointer;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Input = styled.input`
  width: 300px;
  margin: 10px;
  padding: 10px;
  ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const Error = styled.span`
  font-size: 14px;
  padding: 5px;
  color: #f16969;
`
const Table = styled.table`
    width: 100%;
`
const Td = styled.td`
    text-align: left;
    border-bottom: 1px solid #ddd;
`
const Th = styled.th`
    height: 30px;
    border-bottom: 1px solid #ddd;
`
const Thead = styled.thead`
    text-align: left;
`
const Tr = styled.tr`
   &:hover {
       background-color: #ccf6d678;
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
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
toast.configure()
const AnnouncementAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [announcement, setAnnouncement] = useState()
    const [flag, setFlag] = useState(false)

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getAnnouncement = async () => {
        const res = await axios.get('http://localhost:3001/api/announcement/')
        setAnnouncement(res.data)
    }
    const getFlag = () => {
        setFlag(true)
    }
    const addAnnouncement = async (data) => {
        const res = await axios.post('http://localhost:3001/api/announcement/', data, { headers: { header } })
        notify(res.data.msg)
        getAnnouncement()
        setFlag(false)
    }
    const deleteAnnouncement = async (id) => {
        const result = await confirm("Are you sure?")
        if (result) {
            const res = await axios.delete('http://localhost:3001/api/products/' + id, { headers: { header } })
            getAnnouncement()
            notify(res.data.msg)
        }
    }
    useEffect(() => {
        getAnnouncement()
    }, [])

    return (
        <Container>
            <TopButton>
                <Title>Your Announcements</Title>
                <Button onClick={getFlag}>Add Announcement</Button>
            </TopButton>
            <AddProduct>
                {flag &&
                    <Form onSubmit={handleSubmit(addAnnouncement)}>
                        <InputContainer>
                            <Label>Announcement</Label>
                            <Input id="announcement" type='text' placeholder='Announcement' {...register('announcement', { required: true })} />
                            <Error>
                                {errors.announcement && errors.announcement.type === "required" && <span>This is required</span>}
                            </Error>
                        </InputContainer>
                        <ButtonContainer>
                            <ButtonSubmit type='submit' >Add Banner</ButtonSubmit>
                            <ButtonClose onClick={() => setFlag(false)}>Close</ButtonClose>
                        </ButtonContainer>
                    </Form>
                }
            </AddProduct>
            <Product>
                <Hr />
                <Table>
                    <Thead >
                        <Tr>
                            <Th scope="col">Created At</Th>
                            <Th scope="col">Updated At</Th>
                            <Th scope="col">Description</Th>
                            <Th scope='col'></Th>
                            <Th scope='col'></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {announcement?.map(data => (
                            <Tr key={data._id}>
                                <Td>{dateFormat(data.createdAt, "mmmm dS, yyyy")}</Td>
                                <Td>{dateFormat(data.updatedAt, "mmmm dS, yyyy")}</Td>
                                <Td>{data.announcement}</Td>
                                <Td>
                                    <Link to={`/editannouncement/${data._id}`} style={{ textDecoration: 'none' }}>
                                        <EditIcon />
                                    </Link>
                                </Td>
                                <Td>
                                    <DeleteForeverIcon onClick={() => deleteAnnouncement(data._id)} />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Product>
        </Container>
    )
}

export default AnnouncementAdmin