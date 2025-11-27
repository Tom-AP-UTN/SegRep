export type RolUsuario = 'tecnico' | 'cliente';

export interface Usuario {

    id: number;
    email: string;
    password: string;
    celular: string;
    direccion: string;
    rol: RolUsuario;
}
