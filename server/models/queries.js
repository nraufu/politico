const queries = {
	insertUser : 'INSERT INTO users (fullName,email,phoneNumber,national_id,passportUrl,password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
	userExist: 'SELECT * FROM users WHERE national_id=$1',
	partyExist: 'SELECT * FROM parties WHERE name=$1 or logoUrl=$2',
	insertParty: 'INSERT INTO parties (logoUrl, name, hqAddress) VALUES ($1, $2, $3) RETURNING *',
	getParties: 'SELECT * FROM parties',
	getParty: 'SELECT * FROM parties where id=$1',
	deleteParty: 'DELETE FROM parties where id=$1',
	editParty: 'UPDATE parties SET logoUrl=$1, name=$2, hqAddress=$3 WHERE id=$4 RETURNING *',
	officeExist: 'SELECT * FROM offices where type=$1 or name=$2',
	insertOffice: 'INSERT INTO offices (type, name) VALUES ($1, $2) returning *',
	getOffices: 'SELECT * FROM offices',
	getOffice: 'SELECT * FROM offices where id=$1',
	deleteOffice: 'DELETE FROM offices where id=$1',
	editOffice: 'UPDATE offices SET type=$1, name=$2 WHERE id=$3 RETURNING *',
	insertCandidate: 'INSERT INTO candidates (officeId, candidate_name) VALUES ($1, $2) RETURNING *',
	candidateExist: 'SELECT * FROM candidates WHERE candidate_name=$1 AND officeId=$2'
}
export default queries;
