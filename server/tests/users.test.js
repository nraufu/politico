import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import data from './data';

const { expect } = chai;
chai.use(chaiHttp);

describe('/server running', () => {
	it('should return 200 ok status', (done) => {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('object');
				done();
			});
	});
});

describe('/POST signup user create an account', () => {
	it('should return 201 created status on new User signUp', (done) => {
		chai
			.request(app)
			.post('/auth/signup')
			.send(data.user)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body).to.be.an('object');
				expect(res.body.data[0]).to.have.property('token');
				done();
			});
	});

	it('should return 409 conflict status when user already exists', (done) => {
		chai
			.request(app)
			.post('/auth/signup')
			.send(data.user)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when input fields are not fulfilled correctly', (done) => {
		chai
			.request(app)
			.post('/auth/signup')
			.send({
				fullName: 'another user name',
				email: 'another Email'
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});
});
