import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';
import data from './data';
import { pool } from '../models/connect';

const { expect } = chai;
chai.use(chaiHttp);

export let cachedToken;
let token;

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

	it('should return 200 ok status on api documentation request', (done) => {
		chai
			.request(app)
			.get('/api-docs')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('object');
				done();
			});
	});
});

describe('/invalid routes', () => {
	it('should return 400 bad request status when invalid routes invoked', (done) => {
		chai
			.request(app)
			.post('/url')
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			})
	});
});

describe('user create an account', () => {
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

	it('should return 500 on database failure when trying to create a user account', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.post('/auth/signup')
			.send(data.user)
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});

});

describe('user login into an account', () => {
	it('should return a token', (done) => {
		chai
			.request(app)
			.post('/auth/login')
			.send(data.pUser)
			.end((err, res) => {
				expect(res).to.have.status(200);
				token  = res.body.data[0].token;
				done();
			})

	});

	it('should return 200 ok status on user login', (done) => {
		chai
			.request(app)
			.post('/auth/login')
			.send({
				national_id: data.user.national_id,
				password: data.user.password
			})
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('object');
				expect(res.body.data[0]).to.have.property('token');
				cachedToken = res.body.data[0].token;
				done();
			});
	});

	it('should return 404 not found status when user doesn\'t exist', (done) => {
		chai
			.request(app)
			.post('/auth/login')
			.send({
				national_id: '1000000000000001',
				password: 'userPassword'
			})
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when password is incorrect', (done) => {
		chai
			.request(app)
			.post('/auth/login')
			.send({
				national_id: data.user.national_id,
				password: 'anotherPassword'
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when input field are empty', (done) => {
		chai
			.request(app)
			.post('/auth/login')
			.send({
				national_id: '',
				password: 'anotherPassword'
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});
	
	it('should return 500 on database failure when trying to create a user account', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.post('/auth/login')
			.send({
				national_id: data.user.national_id,
				password: data.user.password
			})
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});
});

describe('User reset password', () => {
	it('should return 404 not found status when no email is registered', (done) => {
		chai
			.request(app)
			.post('/auth/reset')
			.send({
				"email": "noemail@email.com"
			})
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when input is invalid', (done) => {
		chai
			.request(app)
			.post('/auth/reset')
			.send({
				"email": ""
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when email is sent successfully on password reset', (done) => {
		chai
			.request(app)
			.post('/auth/reset')
			.send({
				"email": data.user.email
			})
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 500 on database failure when failing to reset password', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.post('/auth/reset')
			.send({
				"email": data.user.email
			})
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});
});

describe('Petitions', () => {
	it('should return 404 when requested office is not found', (done) => {
		chai
			.request(app)
			.post('/petitions/')
			.set('x-auth-token', token)
			.send({
				"officeId": "0",
				"createdBy": "name",
				"text": "petition text",
				"evidence": "imageurl"
			})
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 404 not found when no political party is found', (done) => {
		chai
			.request(app)
			.get('/offices/')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 201 created status when an office is created', (done) => {
		chai
			.request(app)
			.post('/offices/')
			.send({
				"type": "new type",
				"name": "new name"
			})
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 200 ok status when a petition is recorded successfully', (done) => {
		chai
			.request(app)
			.post('/petitions/')
			.set('x-auth-token', token)
			.send(data.petition)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 409 conflict status when a petition is already recorded by the same user', (done) => {
		chai
			.request(app)
			.post('/petitions/')
			.set('x-auth-token', token)
			.send(data.petition)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when an input field is not valid', (done) => {
		chai
			.request(app)
			.post('/petitions/')
			.set('x-auth-token', token)
			.send(data.InvalidPetition)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 500 on database failure when trying to create a petition', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.post('/petitions/')
			.send(data.petition)
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});
});
