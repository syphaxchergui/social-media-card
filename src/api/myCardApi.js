import axios from 'axios';

export default axios.create({
    baseURL: "http://mycard.com/api/",
    headers: { "Content-Type": "application/json" },
  });