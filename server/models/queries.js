const queries = {
	insertUser : 'INSERT INTO users (fullName,email,phoneNumber,passportUrl,password,isAdmin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
	userExist: 'SELECT * FROM users WHERE email=$1'
}
export default queries;
