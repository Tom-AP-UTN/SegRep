export interface Update {


    fechaUpdate: string;           // ISO string, se convierte después

    nroUpdate: number;             // Número correlativo dentro del ticket

    updateImportante: boolean;     // Flag para saber si se notifica o no

    nuevoEstado?: 'pendiente' | 'en_progreso' | 'finalizado';
    // Opcional: solo se completa cuando el update cambia el estado

    detalleUpdate: string;         // Descripción del update

    imagenUpdate?: string;         // URL o base64 de la imagen (si la hay)
}
