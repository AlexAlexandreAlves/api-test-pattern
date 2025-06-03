import { testConnection, pgPool } from '../../../db-connection/postgres-connection';

afterAll(async () => {
  await pgPool.end(); // fecha a conexão ao fim dos testes
});

describe('Teste de conexão postgres DB', () => {

  it('Deve conectar com sucesso', async () => {
    await expect(testConnection()).resolves.not.toThrow();
  });

  it('Deve inserir um usuário na tabela users', async () => {
    const result = await pgPool.query(
      'INSERT INTO users (name, age, city) VALUES ($1, $2, $3) RETURNING *',
      ['Pedro Teste', 31, 'Porto Alegre']
    );
    expect(result.rows.length).toBe(1);
    expect(result.rows[0].name).toBe('Pedro Teste');
    expect(result.rows[0].age).toBe(31);
    expect(result.rows[0].city).toBe('Porto Alegre');
  });

  it('Deve buscar o usuário inserido', async () => {
    const result = await pgPool.query(
      'SELECT * FROM users WHERE name = $1',
      ['Pedro Teste']
    );
    expect(result.rows.length).toBeGreaterThan(0);
    expect(result.rows[0].name).toBe('Pedro Teste');
    expect(result.rows[0].age).toBe(31);
    expect(result.rows[0].city).toBe('Porto Alegre');
  });

});