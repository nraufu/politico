import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';
import data from './data';
import { pool } from '../models/connect';
import { token } from './parties.test';
import { cachedToken } from './users.test';

const { expect } = chai;
chai.use(chaiHttp);

describe('Government offices', () => {

	it('should return 403 forbidden status when action not permitted', (done) => {
		chai
			.request(app)
			.post('/offices/')
			.send(data.office)
			.set('x-auth-token', cachedToken)
			.end((err, res) => {
				expect(res).to.have.status(403);
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

	it('should return 400 bad request status when passed invalid input', (done) => {
		chai
			.request(app)
			.post('/offices/')
			.send({
				"type": "",
				"name": ""
			})
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when an office is created', (done) => {
		chai
			.request(app)
			.post('/offices/')
			.send(data.office)
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 409 conflict status when an office is created', (done) => {
		chai
			.request(app)
			.post('/offices/')
			.send(data.office)
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when a list of government offices is found', (done) => {
		chai
			.request(app)
			.get('/offices/')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
					done();
			});
	});

	it('should return 200 ok status when a list government office is found', (done) => {
		chai
			.request(app)
			.get(`/offices/1`)
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 404 not found status when no office found', (done) => {
		chai
			.request(app)
			.get('/offices/0')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 401 unauthorized status when passed an invalid Token', (done) => {
		chai
			.request(app)
			.get('/offices/')
			.set('x-auth-token', data.invalidToken)
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when no token passed', (done) => {
		chai
			.request(app)
			.get('/offices/')
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});
});


describe('Database failure', () => {
	it('should return 500 on database failure when trying to create a user account', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.post('/offices/')
			.set('x-auth-token', token)
			.send(data.office)
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});

	it('should return 500 on database failure when trying to create a user account', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.get('/offices/')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});

	it('should return 500 on database failure when trying to create a user account', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.get('/offices/1')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});
});
