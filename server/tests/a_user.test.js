import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import data from './data';

const { expect } = chai;
chai.use(chaiHttp);

export let cachedToken;

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

describe('/POST login into an account', () => {
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
});
