import '@babel/polyfill';
import { query } from '../models/connect';
import { responseHandler } from '../helpers/response';
import queries from '../models/queries';

export class Office {
	static async createOffice(req, res) {
		try {
			const { type, name} = req.body;
			if(req.authorizedUser.isAdmin === 'false') return responseHandler(res, 403, { status: 403 ,Error: 'You are not allowed to perform this action'});
			const officeExist = await query(queries.officeExist, [type, name]);
			if(officeExist.rowCount) return responseHandler(res, 409, { status: 409, Error: 'Office already exists' });
			const newOffice = await query(queries.insertOffice, [type, name]);
			return responseHandler(res, 201, { status: 201, data: newOffice.rows });
		} catch (error) {
			return responseHandler(res, 500, { status: 500, Error: error.message });
		}
	}

	static async getOffices(req, res) {
		try {
		   const offices = await query(queries.getOffices);
		   if(!offices.rowCount) return responseHandler(res, 404, {status: 404, Error: 'No government offices registered'});
		   return responseHandler(res, 200, {
			   "status": 200,
			   "data": offices.rows
		   });
		} catch (error) {
			return responseHandler(res, 500, { status: 500, Error: error.message });
		}
	}

	static async getOffice(req, res) {
		try {
		   const office = await query(queries.getOffice, [req.params.id]);
		   if(!office.rowCount) return responseHandler(res, 404, {status: 404, Error: 'No government office found'});
		   return responseHandler(res, 200, {
			   "status": 200,
			   "data": office.rows
		   })
		} catch (error) {
			return responseHandler(res, 500, { status: 500, Error: error.message });
		}
	}

	static async editOffice(req, res) {
		try {
			const { type, name } = req.body;
			if(req.authorizedUser.isAdmin === 'false') return responseHandler(res, 403, { status: 403, Error: 'You are not allowed to perform this action'});
			const office = await query(queries.getOffice, [req.params.id]);
			if(!office.rowCount) return responseHandler(res, 404, { status:404, Error: 'No government office found'});
			const officeExist = await query(queries.officeExist, [type, name]);
			if(officeExist.rowCount) return responseHandler(res, 409, { status: 409, Error: 'type and name already taken'});
			const updateOffice = await query(queries.editOffice, [type, name, req.params.id]);
			return responseHandler(res, 200, {
				status: 200,
				data: updateOffice.rows
			});
		} catch (error) {
			return responseHandler(res, 500, { status: 500, Error: error.message });
		}
	}

	static async deleteOffice(req, res) {
		try {
			if(req.authorizedUser.isAdmin == 'false') return responseHandler(res, 403, { status: 403 ,Error: 'You are not allowed to perform this action'});
			const office = await query(queries.getOffice, [req.params.id]);
			if(!office.rowCount) return responseHandler(res, 404, {status: 404, Error: 'No government office found'});
			await query(queries.deleteOffice, [req.params.id]);
			return responseHandler(res, 200, {
				"status": 200,
				"data": [{
					'message': 'government office removed successfully'
				}]
			});
		} catch (error) {
			return responseHandler(res, 500, { status: 500, Error: error.message });
		}
	}
}
