import express , {Request , Response} from 'express';
import dotenv from 'dotenv';
import indexRouter from './Router/Router.js';
import cors from 'cors';
// import bodyParser  from "body-parser"

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: '*'
}));

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended:true }))


app.get('/', (req:Request, res:Response) => {
  res.send('lets run the game');
});

app.listen(port, () => {
  console.log(`[server]:  Server is running at http://localhost:${port}`);
});

app.use(indexRouter)