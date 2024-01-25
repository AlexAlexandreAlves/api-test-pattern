import { expect } from '@jest/globals';
import * as request from 'supertest';
import { BASE_URL } from '../../constants/constants';

export class EntityService {

    public async getList(route: string, statusCode: number, content?: any, checkResponseMessage?: string) {
        const response = await request(BASE_URL)
            .get(route)

        expect(response.statusCode).toBe(statusCode)

        if (content) {
            expect(response.body[0]).toBeDefined();
            expect(response.body[0]).toEqual(expect.objectContaining(content));
        }

        if (checkResponseMessage) {
            expect(response.body.message).toBe(checkResponseMessage);
        }

        return response
    };

    public async getById(route: string, id: number, statusCode: number, content?: any, checkResponseMessage?: string) {
        const response = await request(BASE_URL)
            .get(`${route}` + `${id}`)

        expect(response.statusCode).toBe(statusCode)

        if (content) {
            expect(response.body).toBeDefined();
            expect(response.body).toEqual(expect.objectContaining(content));
        }

        if (checkResponseMessage) {
            expect(response.body.message).toBe(checkResponseMessage);
        }

        return response
    };

    public async create(route: string, data: object, statusCode: number, content?: any, checkResponseMessage?: string) {
        const response = await request(BASE_URL)
            .post(route)
            .send(data)

        expect(response.statusCode).toBe(statusCode)

        if (content) {
            expect(response.body).toBeDefined();
            expect(response.body).toEqual(expect.objectContaining(content));
        }

        if (checkResponseMessage) {
            expect(response.body.message).toBe(checkResponseMessage);
        }

        return response
    };
};