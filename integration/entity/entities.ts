import { expect } from '@jest/globals';
import * as request from 'supertest';
import { BASE_URL } from '../../constants/constants';
// import { TOKEN } from '../../constants/constants'; // Descomente para usar token global

export class EntityService {

    public async getList(route: string, statusCode: number, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).get(route);
        // req = req.set('Authorization', `Bearer ${TOKEN}`); // Descomente para definir token global
        const response = await req

        expect(response.statusCode).toBe(statusCode)

        // Validações pré definidas, podem ser ajustadas conforme o contexto de validação
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
        let req = request(BASE_URL).get(`${route}${id}`);
        // req = req.set('Authorization', `Bearer ${TOKEN}`); 
        const response = await req

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
        let req = request(BASE_URL).post(route).send(data);
        // req = req.set('Authorization', `Bearer ${TOKEN}`); 
        const response = await req

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

    public async update(route: string, id: number, data: object, statusCode: number, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).put(`${route}${id}`).send(data);
        // req = req.set('Authorization', `Bearer ${TOKEN}`); 
        const response = await req

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

    public async delete(route: string, id: number, statusCode: number, content?: any, checkResponseMessage?: string) {
        let req = request(BASE_URL).delete(`${route}${id}`);
        // req = req.set('Authorization', `Bearer ${TOKEN}`); 
        const response = await req

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