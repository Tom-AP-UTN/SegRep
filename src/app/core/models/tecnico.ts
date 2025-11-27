import { Cliente } from "./cliente";



export interface Tecnico extends Cliente {
    
    nombreComercial?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
}
