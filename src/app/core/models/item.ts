export interface Item {

    id: string;                      
    idUser: number; 
    
    usarTituloManual: boolean;  // Flag para título
    tituloItem?: string;

    tipo?: string;
    marca?: string;
    modelo?: string;

    cantidad: number;
    condicion: 'Nuevo' | 'Excelente' | 'Bueno' | 'Detalle técnico' | 'Regular'; 

    /*
        Nuevo        = Caja sellada
        Excelente    = Usado, estética ok,      funcionamiento ok
        Bueno        = Usado, estética regular, funcionamiento ok
        Detalle tec. = Usado, estética ok,      funcionamiento regular
        Regular      = Usado, estética regular, funcionamiento regular
    */
}
