export interface IUserTaller {
    _id?: string,
    nombre: string,
    nombreTaller: string,
    email: string,
    telefono: string,
    password: string,
    role: string,
    status: string,
    salt?: string
}