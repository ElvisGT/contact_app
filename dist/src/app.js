"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
//paths
const paths = {
    users: '/api/v1/users'
};
//middlewares
app.use((0, cors_1.default)());
//routes
app.use(paths.users, users_routes_1.default);
exports.default = app;
