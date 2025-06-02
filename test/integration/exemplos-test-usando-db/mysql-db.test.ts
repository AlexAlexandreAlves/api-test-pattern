import { mysqlPool } from '../../../db-connection/mysql-connection';

describe('MySQL connection', () => {

    afterAll(async () => {
        await mysqlPool.end(); // fecha a conexão ao fim dos testes
    });

    it('should fetch user with id = 1', async () => {
        const [rows] = await mysqlPool.query('SELECT name FROM users WHERE id = ?', [1]);
        const user = (rows as any[])[0];
        expect(user.name).toBe('Ana Paula'); // Busca na base de dados teste criada via docker
    });


});