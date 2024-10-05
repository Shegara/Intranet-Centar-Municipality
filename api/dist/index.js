"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const docs_1 = __importDefault(require("./routes/docs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8800;
// Serve static files from the uploads directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Middleware setup
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API routes
app.use('/api/users', users_1.default);
app.use('/api/docs', docs_1.default);
// Root route
app.get('/', (req, res) => {
    res.send('Server is running and connected to the PostgreSQL database.');
});
// Start the server
app.listen(8800, '0.0.0.0', () => {
    console.log(`Server is successfully running at http://192.168.1.2:${port}`);
});
