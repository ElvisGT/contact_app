"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("./src/entities/index");
exports.db = new typeorm_1.DataSource({
    host: 'localhost',
    type: 'mysql',
    username: 'root',
    password: 'elvisgt99',
    database: 'contacts',
    port: 3306,
    entities: [index_1.User, index_1.Contact, index_1.Contact_User],
    synchronize: true,
});
