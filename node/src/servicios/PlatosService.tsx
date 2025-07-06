import axios from "axios";

export async function getNegocioPorUsuario(id:number)
{
    let datos = axios.get(`${import.meta.env.VITE_API_URL}negocio-por-usuario/${id}`, 
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

export async function getDatosPorNegocio(id:number)
{
    let datos = axios.get(`${import.meta.env.VITE_API_URL}platos?negocio_id=${id}`, 
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
export async function addData(platoscategoria_id: number, negocio_id:number, nombre:string, ingredientes:string, precio:number, file: File)
{
    let formData = new FormData();
    formData.append('file', file);
    formData.append('negocio_id', `${negocio_id}`);
    formData.append('platoscategoria_id', `${platoscategoria_id}`);
    formData.append('nombre', nombre);
    formData.append('ingredientes', ingredientes);
    formData.append('precio', `${precio}`);
    return axios.post(`${import.meta.env.VITE_API_URL}platos`, formData, {headers:{'content-type':'multipart/form-data', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}})
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
    return axios.delete(`${import.meta.env.VITE_API_URL}platos/${id}`, {headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}})
    .then((response)=>
        {
            return response.status;
        })
    .catch((error)=>
        {
            console.log(error);
        });
}