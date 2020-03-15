const queries = {
	insertUser : 'INSERT INTO users (fullName,email,phoneNumber,national_id,passportUrl,password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
	userExist: 'SELECT * FROM users WHERE national_id=$1',
	partyExist: 'SELECT * FROM parties WHERE name=$1 or logoUrl=$2',
	insertParty: 'INSERT INTO parties (logoUrl, name, hqAddress) VALUES ($1, $2, $3) RETURNING *',
	getParties: 'SELECT * FROM parties',
	getParty: 'SELECT * FROM parties where id=$1',
	deleteParty: 'DELETE FROM parties where id=$1',
	officeExist: 'SELECT * FROM offices where type=$1 or name=$2',
	insertOffice: 'INSERT INTO offices (type, name) VALUES ($1, $2) returning *',
	getOffices: 'SELECT * FROM offices',
	getOffice: 'SELECT * FROM offices where id=$1'
}
export default queries;
