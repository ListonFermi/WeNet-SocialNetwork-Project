import httpServer from './src/app';
import './src/config';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT  || 5003;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});