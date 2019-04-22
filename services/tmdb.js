const axios = require('axios')
const config = require('../config')

module.exports = axios.create({
    baseUrl: 'https://api.themoviedb.org/3',
    params: {
        api_key: config.tmdb.api_key
    }
})