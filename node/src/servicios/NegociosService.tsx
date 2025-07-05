import type { NegociosInterface } from "../interfaces/Interfaces";

export async function getDatos()
{
    
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}negocio`,
        {
            method:'GET',
            headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}
        });
    return [await respuesta.json(), respuesta.status];
}
export async function getDatosPorId(id:number)
{
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}negocio/${id}`,
        {
            headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}
        });
    return [await respuesta.json(), respuesta.status];
}


export async function addData(dto:NegociosInterface)
{
    let respuesta=await fetch(`${import.meta.env.VITE_API_URL}negocio`, 
        {
            method:'POST',
            body: JSON.stringify(dto),
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`}
        }); 
    return respuesta.status;
}
export async function setData(dto:NegociosInterface)
{
    let respuesta=await fetch(`${import.meta.env.VITE_API_URL}negocio/${dto.id}`, 
        {
            method:'PUT',
            body: JSON.stringify(dto),
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`}
        }); 
    return respuesta.status;
}
export async function deleteData(id:number)
{
    let respuesta=await fetch(`${import.meta.env.VITE_API_URL}negocio/${id}`, 
        {
            method:'DELETE',
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`}
        }); 
    return respuesta.status;
}
export async function setLogo(id: number, file: File) {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('file', file);
    
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}negocio-logo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`
                
            },
            body: formData
        });
        
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        
        return {
            status: respuesta.status,
            data: await respuesta.json() // Si tu API devuelve algún JSON
        };
    } catch (error) {
        console.error('Error al subir el logo:', error);
        throw error;
    }
}
