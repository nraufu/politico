import '@babel/polyfill';
import { query } from '../models/connect';
import { responseHandler } from '../helpers/response';
import queries from '../models/queries';

export class Party {
	 static createParty = async (req, res) => {
		 try {
			const { logoUrl, name, hqAddress } = req.body;
			if(req.authorizedUser.isAdmin === 'false') return responseHandler(res, 403, {Error: 'You are not allowed to perform this action'});
			const party = await query(queries.partyExist, [name, logoUrl]);
			if(party.rowCount) return responseHandler(res, 409, {Error: 'Party already exists'});
			const newParty = await query(queries.insertParty, [logoUrl, name, hqAddress]);
			const newPartyInfo = newParty.rows[0];
			return responseHandler(res, 200, {
			   "status": 200,
			   "data": newPartyInfo
			});
		 } catch (error) {
			return responseHandler(res, 500, { "Error": error.message }); 
		 } 
	 }

	 static getParties = async (req, res) => {
		 try {
			const parties = await query(queries.getParties);
			if(!parties.rowCount) return responseHandler(res, 404, {Error: 'No political parties registered'});
			return responseHandler(res, 200, {
				"status": 200,
				"data": parties.rows
			});
		 } catch (error) {
			return responseHandler(res, 500, { "Error": error.message });
		 }
	 }

	 static getParty = async (req, res) => {
		 try {
			const party = await query(queries.getParty, [req.params.id]);
			if(!party.rowCount) return responseHandler(res, 404, {Error: 'No political party found'});
			return responseHandler(res, 200, {
				"status": 200,
				"data": party.rows
			})
		 } catch (error) {
			return responseHandler(res, 500, { "Error": error.message });
		 }
	 } 

	 static deleteParty = async (req, res) => {
		 try {
			if(req.authorizedUser.isAdmin == 'false') return responseHandler(res, 403, {Error: 'You are not allowed to perform this action'});
			const PartyExists = await query(queries.getParty, [req.params.id]);
			if(!PartyExists.rowCount) return responseHandler(res, 404, {Error: 'No political party found'});
			await query(queries.deleteParty, [req.params.id]);
			return responseHandler(res, 200, {
				"status": 200,
				"data": [{
					'message': 'political Party removed successfully'
				}]
			});
		 } catch (error) {
			return responseHandler(res, 500, { "Error": error.message });
		 }
	 }
}
