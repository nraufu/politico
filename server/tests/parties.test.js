import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import data from './data';

const { expect } = chai;
chai.use(chaiHttp);

describe('/POST create a political party', () => {
	it('should return 200 ok status when party is created successfully', (done) => {
		chai
			.request(app)
			.post('/parties/')
			.send(data.party)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 409 conflict status when party already exist', (done) => {
		chai
			.request(app)
			.post('/parties/')
			.send(data.party)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when input filled incorrectly', (done) => {
		chai
			.request(app)
			.post('/parties/')
			.send({})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});
});
