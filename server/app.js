import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if( process.env.NODE_ENV == 'development') app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        Message: 'Welcome To Politico 👋'
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}....`));
