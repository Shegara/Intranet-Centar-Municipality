"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const users_1 = __importDefault(require("./routes/users"));
const docs_1 = __importDefault(require("./routes/docs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8800;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
app.use('/api/users', users_1.default);
app.use('/api/docs', docs_1.default);
app.get('/', (req, res) => {
    res.send('Server is running and connected to the PostgreSQL database.');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(port, () => {
    console.log(`Server is successfully running at http://localhost:${port}`);
});
