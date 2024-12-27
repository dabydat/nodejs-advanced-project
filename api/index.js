import express from 'express';
import { API_CONFIG } from '../config.js';
import USER_ROUTER from './components/user/routes.js';
import SwaggerHelper from '../helpers/swagger.helpers.js';
import path from 'path';

// Inicialización de Express
const APP = express();

// Definir la ruta del archivo swagger.json
const swaggerFilePath = path.join(path.resolve(), 'docs', 'swagger.json');
const swagger = new SwaggerHelper(swaggerFilePath);

// Montar la documentación de Swagger en la app
swagger.setupSwagger(APP);

// Ruta básica de prueba
APP.get("/", (req, res) => res.send("I'm working"));

// Middleware
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

// Rutas de usuario
APP.use("/api/v1/user", USER_ROUTER);

APP.listen(API_CONFIG.PORT, () => console.log("Server is running on port " + API_CONFIG.PORT));