import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/routes';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

// Express configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('PORT', 3000);
app.set('HOST', process.env.HOST || 'localhost'); // Default to '0.0.0.0'

// MongoDB URI
const mongoURI = process.env.MONGO_DB_URI;
if (!mongoURI) {
    console.error("Mongo URI is missing in .env file");
    process.exit(1);
}

mongoose.connect(mongoURI, {}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error while connecting to MongoDB", error);
    process.exit(1);
});

// Defining routes
app.use("/api/v1", router);

// Starting server
try {
    server.listen(app.get('PORT'), app.get('HOST'), () => {
        console.log(`Server is running on http://${app.get('HOST')}:${app.get('PORT')}`);
    });
} catch (error) {
    console.error(`Error while starting server: ${error}`);
}

export default server;
