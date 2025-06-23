export interface LoginInterface {
    correo: string;
    password: string;
}


export interface UsuarioInterface {
    id: number,
    nombre: string,
    correo: string,
    telefono: string,
    estado_id: number,
    estado: string,
    perfil_id: number,
    perfil: string,
    fecha: string
}