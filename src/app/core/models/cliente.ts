import { Usuario } from "./usuario";



export interface Cliente extends Usuario {
    
    nombre: string;
    apellido: string;
}
