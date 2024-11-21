"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db"); // Import the SQLite database instance
const signupRouter_1 = __importDefault(require("./routes/signupRouter"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const habits_1 = __importDefault(require("./routes/habits"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Attach the database instance to app.locals
app.locals.db = db_1.db;
// Routes
app.use('/api/signup', signupRouter_1.default);
app.use('/api/login', loginRouter_1.default);
app.use('/api/habits', habits_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
