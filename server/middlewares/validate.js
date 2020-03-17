import Joi from '@hapi/joi';
import { responseHandler } from '../helpers/response';

export const validate = {
	createUser(req, res, next) {
		const schema = Joi.object({
			fullName: Joi.string().trim().regex(/^[A-Za-z\\s]+$/i).required().messages({
				"string.empty": `full name can't be empty`,
				"any.required": `full name is required`
			}),
			email: Joi.string().trim().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i).required().messages({
				"string.empty": `email can't be empty`,
				"string.pattern.base": `A valid email is required`,
				"any.required": `email is required`
			}),
			phoneNumber: Joi.string().trim().min(10).max(10).regex(/[0-9]{10}$/i).required().messages({
				"string.empty": `PhoneNumber can't be empty`,
				"string.min": `PhoneNumber digits must be 10`,
				"string.max": `PhoneNumber digits must be 10`,
				"string.pattern.base": `A valid phone Number is required`,
				"any.required": `PhoneNumber is required`
			}),
			national_id: Joi.string().trim().min(16).max(16).regex(/[0-9]{16}$/i).required().messages({
				"string.empty": `national_id can't be empty`,
				"string.min": `national_id digits can't be less 16`,
				"string.max": `national_id digits can't exceed 16`,
				"string.pattern.base": `A valid national_id is required`,
				"any.required": `national_id is required`
			}),
			passportUrl: Joi.string().trim().required().messages({
				"string.empty": `passportUrl can't be empty`,
				"any.required": `PassportUrl is required`
			}),
			password: Joi.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().messages({
				"string.empty": `Password can't be empty`,
				"string.pattern.base": `Password must be at least 8 long with at least 1 number and one capital letter`,
				"any.required": `A valid full name is required`
			})
		});

		const { error } = schema.validate(req.body, { abortEarly: false});
		if (error) return responseHandler(res, 400, {"Error": error.details[0].message});
		next();
	},

	login(req, res, next) {
		const schema = Joi.object({
			national_id: Joi.string().trim().min(16).max(16).regex(/[0-9]{16}$/i).required().messages({
				"string.empty": `national_id can't be empty`,
				"string.min": `national_id digits must be 16`,
				"string.max": `national_id digits must be 16`,
				"string.pattern.base": `A valid national_id is required`,
				"any.required": `national_id is required`
			}),
			password: Joi.string().trim().required().messages({
				"string.empty": `Password can't be empty`,
				"any.required": `Password is required`
			})
		})
		const { error } = schema.validate(req.body);
		if (error) return responseHandler(res, 400, {"Error": error.details[0].message});
		next();
	},

	party(req, res, next) {
		const schema = Joi.object({
			logoUrl: Joi.string().required().messages({
				"string.empty": `logoUrl can't be empty`,
				"any.required": `logoUrl is required`
			}),
			name: Joi.string().required().messages({
				"string.empty": `name can't be empty`,
				"any.required": `name is required`
			}),
			hqAddress: Joi.string().required().messages({
				"string.empty": `hqAddress can't be empty`,
				"any.required": `hqAddress is required`
			}),
		})
		const { error } = schema.validate(req.body);
		if (error) return responseHandler(res, 400, {"Error": error.details[0].message});
		next();
	},

	office(req, res, next) {
		const schema = Joi.object({
			name: Joi.string().required().messages({
				"string.empty": `name can't be empty`,
				"any.required": `name is required`
			}),
			type: Joi.string().required().messages({
				"string.empty": `type can't be empty`,
				"any.required": `type is required`
			}),
		})
		const { error } = schema.validate(req.body);
		if (error) return responseHandler(res, 400, {"Error": error.details[0].message});
		next();
	},

	candidate(req, res, next) {
		const schema = Joi.object({
			candidateName: Joi.string().required().messages({
				"string.empty": `name can't be empty`,
				"any.required": `name is required`
			})
		})
		const { error } = schema.validate(req.body);
		if (error) return responseHandler(res, 400, {"Error": error.details[0].message});
		next();
	},

	paramValidation(req, res, next) {
		const schema = Joi.object({
			id: Joi.number().required().messages({
				"number.base": 'ID must be integer',
				"number.unsafe": 'ID is too large',
				"any.required": 'A valid Id is required'
			})
		})
		const { error } = schema.validate(req.params);
		if (error) return responseHandler(res, 400, {"Error": error.details[0].message});
		next();
	}
};
