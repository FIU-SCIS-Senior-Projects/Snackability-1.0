import { createConnection } from "mysql2";

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'snackability_2'
});


export default db;