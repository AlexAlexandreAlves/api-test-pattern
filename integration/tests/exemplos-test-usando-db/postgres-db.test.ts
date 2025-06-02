import { testConnection, pgPool } from '../../../db-connection/postgres-connection';

afterAll(async () => {
  await pgPool.end(); // fecha a conexão ao fim dos testes
});

describe('Teste de conexão postgres DB', () => {

  it('Deve conectar com sucesso', async () => {
    await expect(testConnection()).resolves.not.toThrow();
  });
});