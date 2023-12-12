import app from 'backend/src/app.js'
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;


describe('User API Tests', () => {

    it('Signin user', async () => {
        const task = {
            username: "prr",
            password: "22"
        };

        try {
            const res = await chai.request(app)
                .post('/')
                .send(task);

            expect(res.body).to.equal("crctpswd");
        } catch (err) {
            console.error('Error during user sign-in test:', err);
            throw err;
        }
    }, 20000);

    it('user deosnt exist', async () => {
        const task = {
            username: "prasanth",
            password: "22"
        };

        try {
            const res = await chai.request(app)
                .post('/')
                .send(task);

            expect(res.body).to.equal("notexist");
        } catch (err) {
            console.error('Error during user sign-in test:', err);
            throw err;
        }
    }, 20000);

    it('wrong password', async () => {
        const task = {
            username: "prr",
            password: "11"
        };

        try {
            const res = await chai.request(app)
                .post('/')
                .send(task);

            expect(res.body).to.equal("wrngpswd");
        } catch (err) {
            console.error('Error during user sign-in test:', err);
            throw err;
        }
    }, 20000);
});
