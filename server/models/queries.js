const queries = {
	insertUser : 'INSERT INTO users (fullName,email,phoneNumber,national_id,passportUrl,password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
	userExist: 'SELECT * FROM users WHERE national_id=$1',
	partyExist: 'SELECT * FROM parties WHERE name=$1 or logoUrl=$2',
	insertParty: 'INSERT INTO parties (logoUrl, name, hqAddress) VALUES ($1, $2, $3) RETURNING *'
}
export default queries;
