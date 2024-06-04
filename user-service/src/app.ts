import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json());
app.get('/',(req,res)=>res.send('hello'+req.ip))
app.use('/api/user-service/', userRoutes);

export default app;