import { getMSSQLConnection } from '../../db/mssql-connection';


afterAll(async () => {
    const pool = await getMSSQLConnection();
    await pool.close();
});

describe('MSSQL Connection test', () => {

    it('should connect to MSSQL and run a basic query', async () => {
        const pool = await getMSSQLConnection();
        const result = await pool.query`SELECT 1 AS value`;
        expect(result.recordset[0].value).toBe(1);
    });


});
