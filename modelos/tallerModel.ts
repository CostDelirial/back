import  mongoose, { Schema } from "mongoose";

const tallerSchema: Schema = new Schema ({
    email: { type: String, uppercase: false},
    nombre: { type: String, uppercase: true},
    nombreTaller: { type: String, uppercase: true},
    password: { type: String },
    telefono: { type: Number},
    lat: { type: Number},
    lng: { type: Number},
    role: { type: String},
    status: { type: String},
    saltTA: { type: String }
}, { collection: 'talleres' } );
export 