import type { RestablecerInterface, RestablecerRecoveryUpdateInterface } from "../interfaces/Interfaces";

export async function sendData(dto:RestablecerInterface)
{
    let respuesta=await fetch(`${import.meta.env.VITE_API_URL}recovery/restablecer`, 
        {
            method:'POST',
            body: JSON.stringify(dto),
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`}
        }); 
    return respuesta.status;
}

export async function sendDataRecovery(dto:RestablecerRecoveryUpdateInterface)
{
    let respuesta=await fetch(`${import.meta.env.VITE_API_URL}recovery/update/${dto.token}`, 
        {
            method:'POST',
            body: JSON.stringify({password:dto.password}),
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`}
        }); 
    return respuesta.status;
}