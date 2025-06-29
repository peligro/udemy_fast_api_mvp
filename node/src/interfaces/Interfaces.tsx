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
export interface UsuarioDtoInterface {
    id?:number;
    nombre: string,
    correo: string,
    telefono: string,
    password:string,
    perfil_id: number,
    estado_id?:number,
    editar?:number,
}
export interface PerfilInterface {
    id?: number;
    nombre: string;
}
export interface EstadoInterface {
    id?: number;
    nombre: string;
}
export interface CategoriaInterface {
    id?: number;
    nombre: string;
    slug?:string;
}
export interface RestablecerInterface {
    correo: string;
}
export interface RestablecerRecoveryUpdateInterface {
    token: string;
    password:string;
}