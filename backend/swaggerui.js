import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "All HealthCheckPro API",
            version: "1.0.0",
            description: "For now, this is a User Authentication API for HealthCheckPro",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
            {
                url: "https://healthcheckpro-infosys-fullstack.onrender.com/",
            }
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);

export const swaggerUiServe = swaggerUi.serve;

