import {createContext,useContext,useState} from 'react'; import {api} from '../api';
const C=createContext(null); export const useAuth=()=>useContext(C);
export function AuthProvider({children}){const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('urms_user'));}catch{return null;}});
 const login=async(credentials)=>{const {data}=await api.post('/auth/login',credentials);localStorage.setItem('urms_token',data.data.token);localStorage.setItem('urms_user',JSON.stringify(data.data.user));setUser(data.data.user);return data.data.user;};
 const register=async(form)=>{const {data}=await api.post('/auth/register',form);localStorage.setItem('urms_token',data.data.token);localStorage.setItem('urms_user',JSON.stringify(data.data.user));setUser(data.data.user);return data.data.user;};
 const logout=()=>{localStorage.removeItem('urms_token');localStorage.removeItem('urms_user');setUser(null);}; return <C.Provider value={{user,login,register,logout}}>{children}</C.Provider>;}
