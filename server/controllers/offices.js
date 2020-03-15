import '@babel/polyfill';
import { query } from '../models/connect';
import { responseHandler } from '../helpers/response';
import queries from '../models/queries';

export class Office {
	static createOffice = async (req, res) => {
		try {
			const { type, name} = req.body;
			if(req.authorizedUser.isAdmin === 'false') return responseHandler(res, 403, {Error: 'You are not allowed to perform this action'});
			const officeExist = await query(queries.officeExist, [type, name]);
			if(officeExist.rowCount) return responseHandler(res, 409, { status: 409, Error: 'Office already exists' });
			const newOffice = await query(queries.insertOffice, [type, name]);
			return responseHandler(res, 201, { status: 201, data: newOffice.rows });
		} catch (error) {
			return responseHandler(res, 500, { status: 500, Error: error.message });
		}
	}
}
