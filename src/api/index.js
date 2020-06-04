import axios from 'axios'

const server = axios.create({
  baseURL: 'https://digi-store.herokuapp.com'
})

export default server
