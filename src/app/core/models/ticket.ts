import { Update } from './update';



export interface Ticket {

    id: number;

    titulo: string;
    descripcion: string;

    tipoMaquina: string;

    estado: 'pendiente' | 'en_progreso' | 'finalizado';

    fechaCreacion: string;
    fechaFinalizacion?: string;

    idCliente: number;
    idTecnico: number;

    updates: Update[];
}
