import '@babel/polyfill';
import { query } from '../models/connect';
import { responseHandler } from '../helpers/response';
import queries from '../models/queries';

export class Vote {
	static async vote(req, res) {
		try {
			const { officeId, candidateName } = req.body;
			const office = await query(queries.getOffice, [officeId]);
			if(!office.rowCount) return responseHandler(res, 404, {status: 404, Error: 'No government office with this ID found'});
			const candidate = await query(queries.candidateName, [candidateName, officeId]);
			if(!candidate.rowCount) return responseHandler(res, 404, {status: 404, Error: 'no candidate registered under this office found'});
			const alreadyVoted = await query(queries.checkVotes, [office.rows[0].name, req.authorizedUser.national_id]);
			if(alreadyVoted.rowCount) return responseHandler(res, 409, {status: 409, Error: 'You have already voted for this Office'});
			const vote = await query(queries.vote, [office.rows[0].name, candidate.rows[0].candidate_name, req.authorizedUser.national_id]);
			return responseHandler(res, 200, {
				"status": 200,
				"data": vote.rows
			})
		} catch (error) {
			return responseHandler(res, 500, { status: 500, Error: error.message});
		}
	}

}
