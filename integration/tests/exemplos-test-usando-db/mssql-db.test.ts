import { getMSSQLConnection } from '../../../db-connection/mssql-connection';


afterAll(async () => {
    const pool = await getMSSQLConnection(); // fecha a conexão ao fim dos testes
    await pool.close();
});

describe('Teste de conexão MSSQL DB', () => {

    it('Deve conectar ao MSSQL e executar uma consulta básica', async () => {
        const pool = await getMSSQLConnection();
        const result = await pool.query`SELECT 1 AS value`;

        expect(result.recordset[0].value).toBe(1);
    });


});
