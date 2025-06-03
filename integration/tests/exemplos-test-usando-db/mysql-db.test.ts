import { mysqlPool } from '../../../db-connection/mysql-connection';

describe('Teste de conexão MYSQL DB', () => {

    afterAll(async () => {
        await mysqlPool.end(); // fecha a conexão ao fim dos testes
    });

    it('Deve inserir um usuário na tabela users', async () => {
        const [result]: any = await mysqlPool.query(
            'INSERT INTO users (name, age, city) VALUES (?, ?, ?)',
            ['Maria Teste', 27, 'Florianópolis']
        );
        expect(result.affectedRows).toBe(1);
    });

    it('Deve buscar o usuário inserido', async () => {
        const [rows]: any = await mysqlPool.query(
            'SELECT * FROM users WHERE name = ?',
            ['Maria Teste']
        );
        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0].name).toBe('Maria Teste');
        expect(rows[0].age).toBe(27);
        expect(rows[0].city).toBe('Florianópolis');
    });

});