import express from 'express';
import { API_CONFIG } from '../config.js';
import SwaggerHelper from '../helpers/swagger.helpers.js';
import path from 'path';
import USER_ROUTER from './components/user/routes.js';
import AUTH_ROUTER from './components/auth/routes.js';
import PERMISSIONS_ROUTER from './components/permissions/routes.js';

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
APP.use("/api/user", USER_ROUTER);
APP.use("/api/auth", AUTH_ROUTER);
APP.use("/api/permissions", PERMISSIONS_ROUTER);

APP.listen(API_CONFIG.PORT, () => console.log("Server is running on port " + API_CONFIG.PORT));
