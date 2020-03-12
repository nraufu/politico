import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/users';
import createTables from './models/createTables';

createTables();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

if( process.env.NODE_ENV == 'development') app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        Message: 'Welcome To Politico 👋'
    });
});

//api routes
app.use('/auth/', userRouter);

//invalid route handler
app.use((req, res, next) => {
	res.status(400).json({Error: 'Invalid Request'});
	next();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}....`));

export default app;
