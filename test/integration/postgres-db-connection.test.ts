import { testConnection, pool } from '../../db-connection/postgres-connection';

afterAll(async () => {
  await pool.end(); // fecha a conexão ao fim dos testes
});

describe('Database connection test', () => {

  it('should connect successfully', async () => {
    await expect(testConnection()).resolves.not.toThrow();
  });

  it('should return user with id = 1 and name = "Ana Souza"', async () => {
    const result = await pool.query('SELECT name FROM users WHERE id = $1', [1]);
    expect(result.rows.length).toBe(1);
    expect(result.rows[0].name).toBe('Ana Souza');
  });

});