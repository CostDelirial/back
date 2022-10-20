// importaciones de terceros
import express from "express";
import cors from 'cors';
import fileUpload from "express-fileupload";

// importaciones de clases  y docs propios
import ServerHttp from "./clases/server";

// Instancia servidor http
const server = ServerHttp.instance;
server.app.enable('trusty proxy');

// Uso de body parser
server.app.use(express.urlencoded({limit: '50mb', extended: true}));
server.app.use(express.json({ limit: '50mb' }));

// FileUpload
server.app.use( fileUpload() );

// Seteo de cors
server.app.use(cors({ origin: '*', credentials: true }));

// Importación de rutas
import authTallerRoutes from "./rutas/authRuta";

// Seteo de rutas
server.app.use('/api/taller', authTallerRoutes);

server.iniciar();


