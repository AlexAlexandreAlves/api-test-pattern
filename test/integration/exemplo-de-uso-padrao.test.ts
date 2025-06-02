import { expect } from '@jest/globals';
import * as request from 'supertest';
import { BASE_URL } from '../../constants/constants';

describe('Get list request example test', () => {

    it('Should find the register and return status code 200', async () => {
        const response = await request(BASE_URL).get('/api/v1/Authors');

        expect(response.status).toBe(200);
        expect(response.body[0]).toEqual(expect.objectContaining(
            {
                id: 1,
                idBook: 1,
                firstName: "First Name 1",
                lastName: "Last Name 1"
            }
        ));
    });

    describe('Get by id request example test', () => {

        it('Should find the register by id and return status code 200', async () => {
            const response = await request(BASE_URL).get('/api/v1/Authors/2');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    id: 2,
                    idBook: 1,
                    firstName: "First Name 2",
                    lastName: "Last Name 2"
                }
            );
        });

        it('Should try to find the register by id but not found and return 404 status code', async () => {
            const response = await request(BASE_URL).get('/api/v1/Authors/1000');

            expect(response.status).toBe(404);
            expect(response.body).toEqual(expect.objectContaining(
                {
                    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
                    title: 'Not Found',
                    status: 404,

                }
            ));
        });
    });

    describe('Post request example test', () => {

        it('Should create an author then check response data and check the return status code 200', async () => {
            const novoAutor = {
                id: 650,
                idBook: 1,
                firstName: "Luke",
                lastName: "Skywalker"
            };

            const response = await request(BASE_URL)
                .post('/api/v1/Authors')
                .send(novoAutor);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining(
                {
                    id: 650,
                    idBook: 1,
                    firstName: "Luke",
                    lastName: "Skywalker"

                }
            ));

        });

        it('Should try to create an author with invalid data then check response and check the return status code 400', async () => {
            const invalidAuthor = {
                id: 650,
                idBook: 1,
                firstName: 1,
                lastName: 1
            };

            const response = await request(BASE_URL)
                .post('/api/v1/Authors')
                .send(invalidAuthor);

            expect(response.status).toBe(400);
            expect(response.body).toEqual(expect.objectContaining(
                {
                    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
                    title: 'One or more validation errors occurred.',
                    status: 400,

                }
            ));

        });
    });
});
