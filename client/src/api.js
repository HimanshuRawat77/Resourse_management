import axios from 'axios';
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL || '/api'});
api.interceptors.request.use(config=>{const token=localStorage.getItem('urms_token');if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
export const dataOf=promise=>promise.then(r=>r.data.data);
