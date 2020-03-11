import { pool } from './connect';

const tablesQuery =`
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(50) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    phoneNumber VARCHAR(30) NOT NULL,
    passportUrl VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    isAdmin VARCHAR(20) DEFAULT false,
    created_on TIMESTAMP DEFAULT now() NOT NULL
    );
`;

const createTables = () => {
	pool.query(tablesQuery, (err, res) => {
		if(err) console.log(err);
	})
}

export default createTables;
