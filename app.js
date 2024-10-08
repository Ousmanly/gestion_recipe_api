import express from 'express';
import bodyParser from 'body-parser';
import RecipeRouter from './routes/RecipeRoute.js';
import Categoryrouter from './routes/CategoryRoute.js';
// import CategoryRouter from './routes/CategoryRoute.js'
import cors from 'cors';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use('/api', RecipeRouter);
app.use('/api', Categoryrouter);

const port = 3005;
app.listen(port, () => {
  console.log(`Server in runing in port ${port}`);
});
