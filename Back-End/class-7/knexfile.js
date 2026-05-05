// Knex JS configuration...!

// knexfile.js
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'smit123',
            database: 'DB_B16',
            port: 5432
        },
        migrations: {
            directory: './migrations'
        }
    }
};