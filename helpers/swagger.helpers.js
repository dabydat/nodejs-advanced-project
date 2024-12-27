import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

/**
 * Clase para manejar la configuración y carga de Swagger
 */
class SwaggerHelper {
    constructor(swaggerFilePath) {
        this.swaggerFilePath = swaggerFilePath;
    }

    /**
     * Carga el archivo Swagger JSON
     * @returns {object} El documento Swagger cargado
     */
    loadSwaggerDocument() {
        try {
            const swaggerDocument = JSON.parse(fs.readFileSync(this.swaggerFilePath, 'utf8'));
            return swaggerDocument;
        } catch (error) {
            console.error("Error cargando el archivo Swagger: ", error);
            throw new Error("No se pudo cargar el archivo Swagger.");
        }
    }

    /**
     * Monta la documentación Swagger en la aplicación Express
     * @param {object} app Instancia de Express
     */
    setupSwagger(app) {
        const swaggerDocument = this.loadSwaggerDocument();
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}

export default SwaggerHelper;
