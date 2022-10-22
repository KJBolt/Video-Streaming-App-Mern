import axios from 'axios';
const url = 'http://localhost:5000/api/';

let token

if (!JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken) {
    token = null
} else {
    token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
}

export const publicRequest = axios.create({
    baseURL: url,
})

export const userRequest = axios.create({
    baseURL: url,
    headers: {
        authorization: `Bearer ${token}`
    }
})
