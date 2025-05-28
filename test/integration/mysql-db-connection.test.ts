import { mysqlPool } from '../../db/mysql-connection';

describe('MySQL connection', () => {
    it('should fetch user with id = 1', async () => {
        const [rows] = await mysqlPool.query('SELECT name FROM users WHERE id = ?', [1]);
        const user = (rows as any[])[0];
        expect(user.name).toBe('Ana Paula');
    });

    afterAll(async () => {
        await mysqlPool.end();
    });
});