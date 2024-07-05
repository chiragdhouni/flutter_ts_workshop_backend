"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Express configuration
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('PORT', process.env.PORT || 3000);
app.set('HOST', process.env.HOST || 'localhost'); // Default to '0.0.0.0'
// MongoDB URI
const mongoURI = process.env.MONGO_DB_URI;
if (!mongoURI) {
    console.error("Mongo URI is missing in .env file");
    process.exit(1);
}
mongoose_1.default.connect(mongoURI, {}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error while connecting to MongoDB", error);
    process.exit(1);
});
// Defining routes
app.use("/api/v1", routes_1.default);
// Starting server
try {
    server.listen(app.get('PORT'), app.get('HOST'), () => {
        console.log(`Server is running on http://${app.get('HOST')}:${app.get('PORT')}`);
    });
}
catch (error) {
    console.error(`Error while starting server: ${error}`);
}
exports.default = server;
