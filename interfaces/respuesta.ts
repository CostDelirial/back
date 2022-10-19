export default interface IRespuesta {
    ok: boolean,
    mensaje: string,
    respuesta: any,
    codigo: number,
    id?: string,
    token?: string,
}

export interface IRespuestaOP {
    ok: boolean,
    mensaje: string,
    respuesta: any,
    codigo: number,
    error_code: number
}