import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import assessmentRouter from "./routes/assessment.route.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import path from 'path';
import { fileURLToPath } from "url";
import { swaggerUiServe,swaggerUiSetup } from "./swaggerui.js";

const __dirname1 = path.dirname(fileURLToPath(import.meta.url));
const __dirname2 = path.join(__dirname1, '../');



app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUiServe, swaggerUiSetup);
app.use('/api/user', userRouter);
app.use('/api/assessment', assessmentRouter);


// DEPLOYMENT CODE
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname2, '/frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname2, 'frontend', 'dist', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('Server is running in dev mode');
    });
    console.log('=== Dev Mode server.js ===');
}


// In Api testing throws custom url not found message
app.use(notFound);

// Give error message in response in frontend
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// Connect to the database

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('=== Mongodb Connected ===');
    })
    .catch((err) => {
        console.log('Error while connecting to the db: ', err);
    })



