
export type RolUsuario = 'tecnico' | 'cliente';

export interface Usuario {

    id: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    rol: RolUsuario;
}
