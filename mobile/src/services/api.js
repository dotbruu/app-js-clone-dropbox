import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nextbox.herokuapp.com',
})

export default api