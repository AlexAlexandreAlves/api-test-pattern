import { getMSSQLConnection } from '../../../db-connection/mssql-connection';

let mssqlPool: any;

beforeAll(async () => {
    mssqlPool = await getMSSQLConnection();
});

afterAll(async () => {
    await mssqlPool.close();
});

describe('Teste de conexão MSSQL DB', () => {

    it('Deve conectar ao MSSQL e executar uma consulta básica', async () => {
        const result = await mssqlPool.query`SELECT 1 AS value`;
        expect(result.recordset[0].value).toBe(1);
    });

    it('Deve inserir um usuário na tabela users', async () => {
        const insertResult = await mssqlPool.query`
            INSERT INTO users (name, age, city)
            OUTPUT INSERTED.id, INSERTED.name, INSERTED.age, INSERTED.city
            VALUES ('João Teste', 30, 'Curitiba')
        `;
        expect(insertResult.recordset[0]).toMatchObject({
            name: 'João Teste',
            age: 30,
            city: 'Curitiba'
        });
    });

    it('Deve consultar usuários da tabela users', async () => {
        const result = await mssqlPool.query`SELECT * FROM users WHERE name = 'João Teste'`;
        expect(result.recordset.length).toBeGreaterThan(0);
        expect(result.recordset[0].name).toBe('João Teste');
    });

});