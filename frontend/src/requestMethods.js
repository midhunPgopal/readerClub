import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api/'

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2MyYTUyNWZmYWQyZjA4ZmU0Zjc4MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODExNjE3MSwiZXhwIjoxNjQ4MjAyNTcxfQ.n5wRea-Tg7_NGrwLMMGvN4cx7CQDFvms7DdMLc7uaTE'

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})