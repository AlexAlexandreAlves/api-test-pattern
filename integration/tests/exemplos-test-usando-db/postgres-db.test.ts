import { testConnection, pgPool } from '../../../db-connection/postgres-connection';

afterAll(async () => {
  await pgPool.end(); // fecha a conexão ao fim dos testes
});

describe('Teste de conexão postgres DB', () => {

  it('Deve conectar com sucesso', async () => {
    await expect(testConnection()).resolves.not.toThrow();
  });

  it('Deve retornar o usuário com id = 1 e nome = "Ana Souza"', async () => {
    const result = await pgPool.query('SELECT name FROM users WHERE id = $1', [1]);

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].name).toBe('Ana Souza');
  });

});