import Joi from '@hapi/joi';
import { responseHandler } from '../helpers/response';

export const validate = {
	createUser(req, res, next) {
		const schema = Joi.object({
			fullName: Joi.string().required(),
			email: Joi.string().email().required(),
			phoneNumber: Joi.string().alphanum(0-9).required(),
			passportUrl: Joi.string().required(),
			password: Joi.string().required(),
			isAdmin: Joi.optional()
		});

		const { error } = schema.validate(req.body);
		if (error) return responseHandler(res, 400, {"Error": error.details[0].message});
		next();
	}
};
