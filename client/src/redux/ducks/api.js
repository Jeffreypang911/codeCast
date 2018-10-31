const axios = require('axios');

module.exports = axios.create({
  timeout: 60000,
  baseURL: 'http://localhost:8080',
  maxContentLength: ((5000 * 1000) * 1000)
});