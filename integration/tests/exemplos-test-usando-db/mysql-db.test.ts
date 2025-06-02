import { mysqlPool } from '../../../db-connection/mysql-connection';

describe('Teste de conexão MYSQL DB', () => {

    afterAll(async () => {
        await mysqlPool.end(); // fecha a conexão ao fim dos testes
    });

    it('Deve conectar ao banco e retornar 1', async () => {
        const [rows] = await mysqlPool.query('SELECT 1 as result');
        expect((rows as any[])[0].result).toBe(1);
    });

});