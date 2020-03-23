import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRouter from './routes/users';
import partyRouter from './routes/parties';
import officeRouter from './routes/offices';
import voteRouter from "./routes/votes";
import petitionRouter from './routes/petition';
import createTables from './models/createTables';

createTables();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        Message: 'Welcome To Politico 👋'
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//api routes
app.use('/auth/', userRouter);
app.use('/parties/', partyRouter);
app.use('/offices/', officeRouter);
app.use('/votes/', voteRouter);
app.use('/petitions/', petitionRouter);

//invalid route handler
app.use((req, res, next) => {
	res.status(400).json({Error: 'Invalid Request'});
	next();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}....`));

export default app;
