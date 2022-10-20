import  mongoose, { Schema } from "mongoose";
const rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    menssage: "{VALUE} no es un role permitido"
}
const tallerSchema: Schema = new Schema ({
    email: { type: String, uppercase: false},
    nombre: { type: String, uppercase: true},
    nombreTaller: { type: String, uppercase: true},
    password: { type: String },
    telefono: { type: Number},
    lat: { type: Number},
    lng: { type: Number},
    role: { type: String, enum: rolesValidos,default: 'ADMIN_ROLE'},
    status: { type: String},
    saltTA: { type: String }
}, { collection: "talleres" } );

export default mongoose.model( "Taller", tallerSchema);