import axios from 'axios';
import type { CategoriaInterface } from '../interfaces/Interfaces';

export async function getDatos()
{
    let datos = axios.get(`${import.meta.env.VITE_API_URL}categoria`, 
    {
        headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}
    })
    .then((response)=>
        {
            if(response.status==200)
            {
                return response.data;
            }else
            {
                console.log("falló ");
                
            }
            
        })
    .catch((err)=>
        {
            console.log("falló "+err); 
        });
    return datos;
}
export async function addData(dto:CategoriaInterface)
{
    return axios.post(`${import.meta.env.VITE_API_URL}categoria`, dto, {headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}})
    .then((response)=>
        {
            return response.status;
        })
    .catch((error)=>
        {
            console.log(error);
        });
}
export async function setData(dto:CategoriaInterface)
{
    return axios.put(`${import.meta.env.VITE_API_URL}categoria/${dto.id}`, dto, {headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}})
    .then((response)=>
        {
            return response.status;
        })
    .catch((error)=>
        {
            console.log(error);
        });
}
export async function deleteData(id:number)
{
    return axios.delete(`${import.meta.env.VITE_API_URL}categoria/${id}`, {headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}})
    .then((response)=>
        {
            return response.status;
        })
    .catch((error)=>
        {
            console.log(error);
        });
}