import { Schema } from "mongoose";

import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class UsuariosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(
      "User",
      new Schema(
        {
          email: {
            type: String,
            require: true,
            unique: true,
            index: true,
            validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
          },
          password: { type: String, require: true },
          nombre: { type: String, required: true },
          direccion: { type: String, required: true },
          avatar: { type: String, required: true },
          edad: { type: Number, required: true },
          telefono: { type: Number, required: true },
          status: {
            type: String,
            default: "active",
            enum: ["active", "inactive"],
          },
        },
        { timestamps: true }
      )
    );
  }
}

export default UsuariosDaoMongoDb;
