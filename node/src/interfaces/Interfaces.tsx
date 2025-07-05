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
    id?: number;
    nombre: string,
    correo: string,
    telefono: string,
    password: string,
    perfil_id: number,
    estado_id?: number,
    editar?: number,
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
    slug?: string;
}
export interface RestablecerInterface {
    correo: string;
}
export interface RestablecerRecoveryUpdateInterface {
    token: string;
    password: string;
}
export interface NegociosInterface {
    id?: number,
    nombre: string,
    logo?: string,
    mapa: string,
    facebook: string,
    descripcion: string,
    instagram: string,
    twitter: string,
    slug?: string,
    correo: string,
    tiktok: string,
    telefono: string,
    estado_id?: number,
    estado?: string,
    usuario_id: number,
    usuario?: string,
    categoria_id: number,
    categoria?: string,
    direccion: string,
    fecha?: string
}