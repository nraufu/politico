import '@babel/polyfill';
import bcrypt from 'bcrypt';
import { query } from '../models/connect';
import { responseHandler } from '../helpers/response';
import { assignToken } from '../helpers/assignToken';
import queries from '../models/queries';

export class User {
	static createUser = async (req, res) => {
		try {
			const { fullName, email, phoneNumber, national_id, passportUrl, password} = req.body;
			const user = await query(queries.userExist, [national_id]);
			if(user.rows.length) return responseHandler(res, 409, {"Error": "User already Exists"});
			const hashPassword = bcrypt.hashSync(password, 5);
			const newUser = await query(queries.insertUser, [fullName, email, phoneNumber, national_id, passportUrl, hashPassword]);
			const newUserInfo = newUser.rows[0];
			const token = assignToken({ national_id : newUserInfo.national_id, isAdmin:newUserInfo.isadmin });
			return responseHandler(res, 201, {
				"status" : 201,
				"data": [{
					"token": token,
					"user": {
						"Full name": newUserInfo.fullname,
						"email": newUserInfo.email,
						"phone Number": newUserInfo.phonenumber,
						"national_id": newUserInfo.national_id,
						"passport Url": newUserInfo.passporturl,
						"Created On": newUserInfo.created_on
					}
				}]
			});
		} catch (error) {
			return responseHandler(res, 500, { "Error": error.message });
		}
	}

	static login = async (req, res) => {
		try {
			const { national_id, password} = req.body;
			const user = await query(queries.userExist, [national_id]);
			if(!user.rows.length) return responseHandler(res, 404, {"Error": "Account not registered"});
			const userInfo = user.rows[0];
			const isPasswordValid = bcrypt.compareSync(password, userInfo.password);
			if(!isPasswordValid) return responseHandler(res, 400, { Error: 'Incorrect Password'});
			const token = assignToken({ national_id : userInfo.national_id, isAdmin: userInfo.isadmin});
			return responseHandler(res, 200, {
				"status" : 200,
				"data": [{
					"token": token,
					"user": {
						"Full name": userInfo.fullname,
						"email": userInfo.email,
						"phone Number": userInfo.phonenumber,
						"national_id": userInfo.national_id,
						"passport Url": userInfo.passporturl
					}
				}]
			});
		} catch (error) {
			return responseHandler(res, 500, { "Error": error.message });
		}
	}
}
