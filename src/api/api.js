import axios from 'axios';

const api = axios.create({
     baseURL: 'https://api.hatchways.io/assessment/sentences/'
});

export const fetchData = (id) => api.get(`${ id }`);


