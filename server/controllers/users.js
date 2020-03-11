import '@babel/polyfill';
import bcrypt from 'bcrypt';
import { query } from '../models/connect';
import { responseHandler } from '../helpers/response';
import { assignToken } from '../helpers/assignToken';
import queries from '../models/queries';

export class User {
	static createUser = async (req, res) => {
		try {
			const { fullName, email, phoneNumber, passportUrl, password , isAdmin } = req.body;
			const user = await query(queries.userExist, [email]);
			if(user.rows.length) return responseHandler(res, 409, {"Error": "User already Exists"});
			const hashPassword = bcrypt.hashSync(password, 5);
			const newUser = await query(queries.insertUser, [fullName, email, phoneNumber, passportUrl, hashPassword, isAdmin]);
			const newUserInfo = newUser.rows[0];
			const token = assignToken({ email : newUserInfo.email});
			return responseHandler(res, 201, {
				"status" : 201,
				"data": [{
					"token": token,
					"user": {
						"Full name": newUserInfo.fullname,
						"email": newUserInfo.email,
						"phone Number": newUserInfo.phonenumber,
						"passport Url": newUserInfo.passporturl,
						"Created On": newUserInfo.created_on
					}
				}]
			});
		} catch (error) {
			return responseHandler(res, 500, { "Error": error.message });
		}
	}
}
