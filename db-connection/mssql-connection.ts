import * as sql from 'mssql';
import * as dotenv from 'dotenv';

dotenv.config();

const config: sql.config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER || 'localhost',
    database: process.env.MSSQL_DATABASE,
    port: Number(process.env.MSSQL_PORT) || 1433,
    options: {
        encrypt: false, // true se estiver usando Azure
        trustServerCertificate: true, // necessário para conexões locais
    },
};

let pool: sql.ConnectionPool;

export async function getMSSQLConnection(): Promise<sql.ConnectionPool> {
    if (!pool) {
        pool = await sql.connect(config);
    }
    return pool;
}
