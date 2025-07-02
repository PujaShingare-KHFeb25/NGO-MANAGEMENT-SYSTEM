import { createConnection } from 'mysql2';

const conn = createConnection({
    host: "localhost",
    user: "root",
    password: "cdac123",
    database: "nodejs"
});

conn.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Database Connected...!!");
    }
});

export default conn;