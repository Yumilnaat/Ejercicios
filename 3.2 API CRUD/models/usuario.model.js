import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'favor de ingresar el nombre'],
        },
        edad: {
            type: Number,
            required: [true, 'favor de ingresar la edad'],
        },
        correo: {
            type: String,
            required: [true, 'favor de ingresar el correo'],
            unique: true,
        },
    }
    ,
    {
        timestamps: true
    },
);


const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;