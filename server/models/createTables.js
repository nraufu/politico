import { pool } from './connect';

const tablesQuery =`
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(50) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    phoneNumber VARCHAR(30) NOT NULL,
    national_id VARCHAR(30) NOT NULL,
    passportUrl VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    isAdmin VARCHAR(20) DEFAULT false,
    created_on TIMESTAMP DEFAULT now() NOT NULL
	);
	INSERT INTO users (fullName, email, phoneNumber, national_id, passportUrl, password, isAdmin) Values ('admin', 'admin@email.com', '0788880000', '1180074714845726', 'https://passports.com/adminPassport', '$2b$05$LVOyO0oevk/xNsfvBU7seO2DmeWBoMHS6gz8fkeJw5QTxUv/eWvaS', true);
`;

const createTables = () => {
	pool.query(tablesQuery, (err, res) => {
		if(err) console.log(err);
	})
}

export default createTables;
