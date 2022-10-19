export interface ITaller {
    id?: string,
    email: string,
    nombre: string,
    nombreTaller: string,
    password: string,
    telefono: number,
    lat: number,
    lng: number,
    role: string,
    status: string,
    saltTA: string
}

export interface ITallerUpdate {
    id: string,
    nombre: string
}