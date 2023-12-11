import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';

chai.use(chaiHttp);

const { expect } = chai;

describe('User API Tests', () => {
    it('Signin user', async () => {
        const task = {
            email: "prr",
            password: "11"
        };

        try {
            const res = await chai.request(app)
                .post('/')
                .send(task);

            expect(res).to.have.status(200);
        } catch (err) {
            console.error('Error during user sign-in test:', err);
            throw err;
        }
    });
});
