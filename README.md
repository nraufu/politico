[![Build Status](https://travis-ci.org/nraufu/politico.svg?branch=develop)](https://travis-ci.org/nraufu/politico)
[![Coverage Status](https://coveralls.io/repos/github/nraufu/politico/badge.svg?branch=develop)](https://coveralls.io/github/nraufu/politico?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/5027448a196432bdb2be/maintainability)](https://codeclimate.com/github/nraufu/politico/maintainability)

# politico
 Politico enables citizens to give their mandate to politicians running for different government offices while building trust in the process through transparency.

# features

- A user can create an account.
- A user can log into his/her account.
- A user can reset his password.
- An admin can create a political party.
- A user can view all political parties information.
- A user can view a specific political party.
- An admin can modify a specific political party detail.
- An admin can delete a specific political party.
- An admin can create a government office.
- A user can view all government offices information.
- A user can view a specific government office.
- An admin can modify a specific government office information.
- An admin can delete a specific government office information.
- An admin can register a politician running for a specific government office.
- A user can vote for one politician per a specific government office.
- A user can view vote results for a specific government office.
- A user can create a petition challenging the outcome of a concluded election.

# UI Template
To view the UI Template [click here](https://nraufu.github.io/politico/UI/)

# API Host
API endpoints are hosted on [Heroku](https://politico-01.herokuapp.com/)

## Technologies && Tools

* [NodeJS](https://nodejs.org/) - JavaScript Runtime Environment
* [ExpressJs](https://expressjs.com/) - A Minimal  Web Application Framework
* [PostgreSQL](https://postgresql.org) - A free and open-source relational database management system
* [Mocha](mochajs.org) - A JavaScript test framework for Node.js programs, asynchronous testing, test coverage reports, and use of any assertion library
* [Airbnb](https://github.com/airbnb/javascript) - A set of standards that outline how code should be written and organized.
* [ESlint](eslint.org) - A static code analysis tool for identifying problematic patterns found in JavaScript code.

## Getting Started

 ### Prerequisites

 Ensure you have NodeJS installed on your computer by entering  `node -v ` on your terminal. If you don't have NodeJS installed go to the [NodeJS Website](https://nodejs.org/en/download/), and follow the download instructions
 
### Installation

Clone the app
* ``` git clone https://github.com/nraufu/politico.git```

Install all the packages
* ``` npm install ```

Run the server
*  ``` npm start ```

## Testing
Run Test case
* ```npm run test```


## Working Routes

|   Endpoint                      | Functionality                                           |
|---------------------------------|:-------------------------------------------------------:|
|POST /auth/signup                | create an account                                       |
|POST /auth/login                 | log into his account                                    |
|POST /auth/reset                 | reset password                                          |
|POST /parties/                   | create a political party                                |
|GET  /parties/                   | retrieve all political parties information              |
|GET  /parties/:partyId           | retrieve a specific  political parties information      |
|PATCH /parties/:partyId          | modify a specific political party                       |
|DELETE /parties/:partyId         | delete a specific political party                       |
|POST /offices/                   | create a government office                              |
|GET  /offices/                   | retrieve all government offices information             |
|GET  /offices/:officeId          | retrieve a specific government office information       |
|PATCH /offices/:officeId         | modify a specific government office info                |
|DELETE /offices/:officeId        | delete a specific government office                     |
|POST /offices/:officeId/register | register a politician for a specific office elections   |
|POST /votes/                     | vote for a specific politician in a specific office     |
|GET /offices/:officeId/result    | view election results for a specific office             |
|POST /petitions/                 | create a petition                                       |

### Author

[NIYONZI Raufu](https://github.com/nraufu/)
