import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HealthCheckPro API Documentation",
            version: "1.1.5",
            description: "All the APIs of HealthCheckPro",
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

