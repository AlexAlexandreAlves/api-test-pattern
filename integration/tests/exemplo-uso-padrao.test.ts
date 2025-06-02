import { expect } from '@jest/globals';
import * as request from 'supertest';
import { BASE_URL } from '../../constants/constants';
import { TOKEN } from '../../constants/constants';

describe('Exemplos de teste usando o Get list', () => {

    it('Deve encontrar o registro e retornar o código de status 200', async () => {
        const response = await request(BASE_URL).get('api/v1/Authors')
        // .set('Authorization', `Bearer ${TOKEN}`); Configura o TOKEN aqui

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

    describe('Exemplos de teste usando o Get by id', () => {

        it('Deve encontrar o registro pelo id e retornar o código de status 200', async () => {
            const response = await request(BASE_URL).get('api/v1/Authors/2');
            // .set('Authorization', `Bearer ${TOKEN}`); 

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

        it('Deve tentar encontrar o registro pelo id, mas não encontrado e retornar o código de status 404', async () => {
            const response = await request(BASE_URL).get('api/v1/Authors/1000');
            // .set('Authorization', `Bearer ${TOKEN}`); 

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

    describe('Exemplos de teste usando o Create', () => {

        it('Deve criar um autor e verificar os dados da resposta e o código de status 200', async () => {
            const novoAutor = {
                id: 650,
                idBook: 1,
                firstName: "Luke",
                lastName: "Skywalker"
            };

            const response = await request(BASE_URL)
                // .set('Authorization', `Bearer ${TOKEN}`); 
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

        it('Deve tentar criar um autor com dados inválidos e verificar a resposta e o código de status 400', async () => {
            const invalidAuthor = {
                id: 650,
                idBook: 1,
                firstName: 1,
                lastName: 1
            };

            const response = await request(BASE_URL)
                // .set('Authorization', `Bearer ${TOKEN}`); 
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
