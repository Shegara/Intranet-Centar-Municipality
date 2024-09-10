"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const docs_1 = __importDefault(require("./routes/docs"));
const services_1 = __importDefault(require("./routes/services"));
// Load environment variables
dotenv_1.default.config();
// Create an Express application
const app = (0, express_1.default)();
const port = process.env.PORT || 8800;
// Middleware setup
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Route handling
app.use('/api/users', users_1.default);
app.use('/api/docs', docs_1.default);
app.use('/api/services', services_1.default);
// Default route
app.get('/', (req, res) => {
    res.send('Server is running and connected to the PostgreSQL database.');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is successfully running at http://localhost:${port}`);
});
