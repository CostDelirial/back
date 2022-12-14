import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const rolesvalidos = {
    values: [ 'USER_ROLE' ],
    message: '{VALUE} no es un rol permitido'
}
const statusValidos = {
    values: [ 'ACTIVO', 'DESACTIVADO'],
    message: '{VALUE} no es un estatus permitido'
}
const userTallerSchema: Schema = new Schema({
    nombre: { type: String, uppercase: true },
    nombreTaller: { type: Schema.Types.ObjectId, ref: 'talleres'},
    email: { type: String, lowercase: true },
    telefono: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: rolesvalidos, default: 'USER_ROLE'},
    status: { type: String, enum: statusValidos, default: 'ACTIVO'},
    salt: { type: String}
},{collection: "tallerUsuarios"});

userTallerSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico'})

export default mongoose.model("UserTaller", userTallerSchema)
