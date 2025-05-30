import { expect } from '@jest/globals';
import * as request from 'supertest';
import { BASE_URL } from '../../constants/constants';


const randomId = Math.floor(Math.random() * 1000) + 1;

describe('Post request example test', () => {

    it('Should create an author then check response data and check the return status code 200', async () => {
        const novoAutor = {
            // id: 550,
            idBook: randomId,
            firstName: "Luke" + randomId,
            lastName: "Skywalker" + randomId
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
});