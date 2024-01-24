import * as request from 'supertest';
import { BASE_URL } from '../../constants/constants';

export class EntityService{
    constructor(public route: string) { }

    public async getOne(token: string, statusCode: number, unauthorizedAccessMessage?: string, content?: any) {
        const response = await request(BASE_URL)
            .get(`${this.route}?prisma=${JSON.stringify(prisma)}`)
            .set('Authorization', token)

        expect(response.statusCode).toBe(statusCode);

        if (unauthorizedAccessMessage) {
            expect(response.body.message).toBe(unauthorizedAccessMessage);
        }

        if (content) {
            expect(response.body).toBeDefined();
            expect(response.body).toEqual(content);
        }

        return response
    };