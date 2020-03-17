import { pool } from './connect';

const tablesQuery =`
DROP TABLE IF EXISTS users, parties, offices, candidates, votes, petitions;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(50) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    phoneNumber VARCHAR(30) NOT NULL,
    national_id VARCHAR(30) UNIQUE NOT NULL,
    passportUrl VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    isAdmin VARCHAR(20) DEFAULT false,
    created_on TIMESTAMP DEFAULT now() NOT NULL
	);
CREATE TABLE IF NOT EXISTS parties (
	id SERIAL PRIMARY KEY,
    logoUrl VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
	hqAddress VARCHAR(100) NOT NULL,
	created_on TIMESTAMP DEFAULT now() NOT NULL
);
CREATE TABLE IF NOT EXISTS offices (
	id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
	created_on TIMESTAMP DEFAULT now() NOT NULL
);
CREATE TABLE IF NOT EXISTS candidates (
	id SERIAL PRIMARY KEY,
    officeId VARCHAR(20) NOT NULL,
    candidate_name VARCHAR(100) NOT NULL,
	created_on TIMESTAMP DEFAULT now() NOT NULL
);
CREATE TABLE IF NOT EXISTS votes (
	id SERIAL PRIMARY KEY,
    office_name VARCHAR(50) NOT NULL,
    candidate_name VARCHAR(100) NOT NULL,
    voter_id VARCHAR(100) NOT NULL,
	created_on TIMESTAMP DEFAULT now() NOT NULL
);
CREATE TABLE IF NOT EXISTS petitions (
	id SERIAL PRIMARY KEY,
    officeId VARCHAR(50) NOT NULL,
    createdBy VARCHAR(100) NOT NULL,
    text VARCHAR(100) NOT NULL,
    evidence VARCHAR(100) NOT NULL,
	created_on TIMESTAMP DEFAULT now() NOT NULL
);

	INSERT INTO users (fullName, email, phoneNumber, national_id, passportUrl, password, isAdmin) Values ('admin', 'admin@email.com', '0788880000', '1180074714845726', 'https://passports.com/adminPassport', '$2b$05$LVOyO0oevk/xNsfvBU7seO2DmeWBoMHS6gz8fkeJw5QTxUv/eWvaS', true);
`;

const createTables = () => {
	pool.query(tablesQuery)
}

export default createTables;
