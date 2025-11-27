import { Update } from './update';



export interface Ticket {

    id: string;

    titulo: string;
    descripcion: string;

    tipoMaquina: string;

    estado: 'pendiente' | 'en_progreso' | 'finalizado';

    fechaCreacion: string;
    fechaFinalizacion?: string;

    idCliente: string;
    idTecnico: string;

    updates: Update[];
}
