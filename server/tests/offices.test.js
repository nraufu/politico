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

	it('should return 201 created status when an office is created', (done) => {
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

	it('should return 201 created status when another office is created', (done) => {
		chai
			.request(app)
			.post('/offices/')
			.send({
				"type": "government",
				"name": "office name"
			})
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

	it('should return 403 forbidden status when non-admin user try to modify a government office', (done) => {
		chai
			.request(app)
			.patch(`/offices/1`)
			.set('x-auth-token', cachedToken)
			.send(data.modifyOffice)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 404 not found status when user try to modify a government office which doesn\'t exist', (done) => {
		chai
			.request(app)
			.patch(`/offices/0`)
			.set('x-auth-token', token)
			.send(data.modifyOffice)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when Office is modified successfully', (done) => {
		chai
			.request(app)
			.patch(`/offices/1`)
			.set('x-auth-token', token)
			.send(data.modifyOffice)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 409 conflict status when trying to modify office with already existing info name and type', (done) => {
		chai
			.request(app)
			.patch(`/offices/1`)
			.set('x-auth-token', token)
			.send(data.modifyOffice)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 403 forbidden status when non-admin user try to register a candidate', (done) => {
		chai
			.request(app)
			.post(`/offices/1/register`)
			.set('x-auth-token', cachedToken)
			.send(data.candidate)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 404 not found status when user try to register a candidate in a non existing office', (done) => {
		chai
			.request(app)
			.post(`/offices/0/register`)
			.set('x-auth-token', token)
			.send(data.candidate)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when candidate name is not valid', (done) => {
		chai
			.request(app)
			.post(`/offices/1/register`)
			.set('x-auth-token', token)
			.send({})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when new candidate is registered', (done) => {
		chai
			.request(app)
			.post(`/offices/1/register`)
			.set('x-auth-token', token)
			.send(data.candidate)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 404 not found status when no office found', (done) => {
		chai
			.request(app)
			.get('/offices/0/result')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when no results found', (done) => {
		chai
			.request(app)
			.get('/offices/3/result')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when a certain office results are out', (done) => {
		chai
			.request(app)
			.get('/offices/1/result')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});
	
	it('should return 400 bad request status when no token passed', (done) => {
		chai
			.request(app)
			.delete('/offices/')
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 401 unauthorized status when passed an invalid Token', (done) => {
		chai
			.request(app)
			.delete('/offices/1')
			.set('x-auth-token', data.invalidToken)
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 404 not found status when passed invalid ID', (done) => {
		chai
			.request(app)
			.delete('/offices/0')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when office deleted', (done) => {
		chai
			.request(app)
			.delete('/offices/1')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});
});


describe('Database failure', () => {
	it('should return 500 on database failure when failing to create an office due to database error', (done) => {
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

	it('should return 500 on database failure when failing to retrieve all office due to database error', (done) => {
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

	it('should return 500 on database failure when failing to retrieve an office due to database failure', (done) => {
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

	it('should return 500 on database failure when failing to modify an office due to database failure', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.patch('/offices/1')
			.send(data.modifyOffice)
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});

	it('should return 500 on database failure when failing to create a candidate due to database failure', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.post('/offices/1/register')
			.send(data.candidate)
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});

	it('should return 500 on database failure when failing to delete a political party due to database failure', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.delete('/offices/1')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});
});
