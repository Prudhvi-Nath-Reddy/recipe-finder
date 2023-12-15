import app from 'backend/src/app.js'
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;

describe('Recipe API Tests', () => {


    it('should get all recipes', async () => {
        try {
            const res = await chai.request(app)
                .post('/getrecipe');  

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').that.is.not.empty;
        } catch (err) {
            console.error('Error during getRecipes test:', err);
            throw err;
        }
    }, 50000);

});
