import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';
import data from './data';
import { pool } from '../models/connect';
import { token } from './parties.test';

const { expect } = chai;
chai.use(chaiHttp);

describe('User votes', () => {
	it('should return 404 not found when no political party is found', (done) => {
		chai
			.request(app)
			.post('/votes/')
			.set('x-auth-token', token)
			.send({
				"officeId": "0",
				"candidateName": "candidate"
			})
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 404 not found when no candidate is found', (done) => {
		chai
			.request(app)
			.post('/votes/')
			.set('x-auth-token', token)
			.send({
				"officeId": "1",
				"candidateName": "candidate"
			})
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
				"type": "new local government",
				"name": "new cabinet of minister"
			})
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 200 ok status when new candidate is registered', (done) => {
		chai
			.request(app)
			.post(`/offices/2/register`)
			.set('x-auth-token', token)
			.send({
				"candidateName": "another candidate"
			})
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});

	it('should return 200 ok status when a user place a vote', (done) => {
		chai
			.request(app)
			.post('/votes/')
			.set('x-auth-token', token)
			.send({
				"officeId": "2",
				"candidateName": "another candidate"
			})
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).have.property('data');
				done(err);
			});
	});

	it('should return 409 conflict status when a user place the same vote', (done) => {
		chai
			.request(app)
			.post('/votes/')
			.set('x-auth-token', token)
			.send({
				"officeId": "2",
				"candidateName": "another candidate"
			})
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when a user input invalid fields', (done) => {
		chai
			.request(app)
			.post('/votes/')
			.set('x-auth-token', token)
			.send({
				"officeId": ""
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).have.property('Error');
				done();
			});
	});
});

describe('Database failure', () => {
	it('should return 500 on database failure when failing to place a vote due to database failure', (done) => {
		const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
		chai
			.request(app)
			.post('/votes/')
			.set('x-auth-token', token)
			.send({
				"officeId": "1",
				"candidateName": "politician Name"
			})
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body).to.have.property('Error');
				queryStub.restore();
				done();
			});
	});
});
