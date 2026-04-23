// Note: Database configuration file...!

import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "DB_B16",
    password: "smit123",
    port: 5432
});

pool
    .connect()
    .then((res) => {
        console.log('Postgres DB connected successfully!: ', res);
        res.release();
    })
    .catch((err) => {
        console.log('Something went wrong while connecting to Postgress DB: ', err);
    });

export default pool;