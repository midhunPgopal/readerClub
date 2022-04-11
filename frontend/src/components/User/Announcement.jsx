import {useEffect, useState} from 'react'
import styled from 'styled-components'
import { mobile } from '../../responsive';
import axios from 'axios';

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font weight: 500;
`

const Announcement = () => {

  const [announcement, setAnnouncement] = useState()

  const getAnnouncement = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/announcement')
      const [data] = res.data
      setAnnouncement(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAnnouncement()
  }, [])
  

  return (
    <Container>{announcement?.announcement}</Container>
  )
}

export default Announcement