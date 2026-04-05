import axios from 'axios';

const geoapi = axios.create({
    baseURL: 'https://geoapi.info/api/',
})

export const getFlagUrl = (code) => {
    return `https://data.geoapi.info/flags/1x1/${code.toLowerCase()}.svg`
}

export default geoapi;