import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import data from './data';
import {cachedToken} from './users.test';

const { expect } = chai;
chai.use(chaiHttp);

export let token;
let cachedPartyId;

describe('Political parties test', () => {
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

	it('should return 404 not found when no political party is found', (done) => {
		chai
			.request(app)
			.get('/parties/')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).have.property('Error');
				done();
			});
	});
	
	it('should return 403 forbidden status when non-admin user try to create a political party', (done) => {
		chai
			.request(app)
			.post('/parties/')
			.set('x-auth-token', cachedToken)
			.send(data.party)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body).have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when party is created successfully', (done) => {
		chai
			.request(app)
			.post('/parties/')
			.set('x-auth-token', token)
			.send(data.party)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				cachedPartyId = res.body.data.id;
				done();
			});
	});

	it('should return 200 ok status when a list of political parties is found', (done) => {
		chai
			.request(app)
			.get('/parties/')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
					done();
			});
	});

	it('should return 200 ok status when a specific party is requested', (done) => {
		chai
			.request(app)
			.get('/parties/1')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
					done();
			});
	});

	it('should return 404 not fount status when a specific party is not found', (done) => {
		chai
			.request(app)
			.get('/parties/0')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property('Error');
					done();
			});
	});

	it('should return 400 bad request status when passed an invalid ID', (done) => {
		chai
			.request(app)
			.get('/parties/url')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
					done();
			});
	});

	it('should return 409 conflict status when party already exist', (done) => {
		chai
			.request(app)
			.post('/parties/')
			.set('x-auth-token', token)
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
			.set('x-auth-token', token)
			.send({})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 401 unauthorized status when passed an invalid Token', (done) => {
		chai
			.request(app)
			.get('/parties/')
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
			.get('/parties/')
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 404 not found status when deleting a non-existing party', (done) => {
		chai
			.request(app)
			.delete('/parties/0')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 400 bad request status when an invalid ID is passed', (done) => {
		chai
			.request(app)
			.delete('/parties/name')
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 403 forbidden status when access to delete is not permitted', (done) => {
		chai
			.request(app)
			.delete(`/parties/${cachedPartyId}`)
			.set('x-auth-token',cachedToken)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body).to.have.property('Error');
				done();
			});
	});

	it('should return 200 ok status when a party is deleted successfully', (done) => {
		chai
			.request(app)
			.delete(`/parties/${cachedPartyId}`)
			.set('x-auth-token', token)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data');
				done();
			});
	});
});
