import axios from 'axios';

const geoapi = axios.create({
    baseURL: 'https://geoapi.info/api/',
})

export default geoapi;