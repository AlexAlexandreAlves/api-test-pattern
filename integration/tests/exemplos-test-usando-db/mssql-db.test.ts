import { getMSSQLConnection } from '../../../db-connection/mssql-connection';


afterAll(async () => {
    const mssqlPool = await getMSSQLConnection(); // fecha a conexão ao fim dos testes
    await mssqlPool.close();
});

describe('Teste de conexão MSSQL DB', () => {

    it('Deve conectar ao MSSQL e executar uma consulta básica', async () => {
        const mssqlPool = await getMSSQLConnection();
        const result = await mssqlPool.query`SELECT 1 AS value`;

        expect(result.recordset[0].value).toBe(1);
    });


});
