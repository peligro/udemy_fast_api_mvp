import axios from 'axios'; 

export async function getDatosPorSlug(slug:string)
{
    let datos = axios.get(`${import.meta.env.VITE_API_URL}carta-menu/${slug}`, 
    {
        headers:{'content-type':'application/json'}
    })
    .then((response)=>
        {
            if(response.status==200)
            {
                return response.data;
            }else
            {
                window.location.href="/error";
                
            }
            
        })
    .catch(()=>
        {
            window.location.href="/error"; 
        });
    return datos;
}
