import type { LoginInterface } from "../interfaces/Interfaces";

export async function sendDataLogin(datos:LoginInterface)
{
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}auth/login`,
        {
            method:'POST',
            body: JSON.stringify(datos),
            headers:{'content-type':'application/json'}
        });
    return [await respuesta.json(), respuesta.status];
}