export async function getDatosPorId(id:number)
{
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}usuarios/${id}`,
        {
            method:'GET',
            headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}
        });
    return [await respuesta.json(), respuesta.status];
}