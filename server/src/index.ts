import { PORT } from './config';
import cors from 'cors';
import express from 'express';
import { clientRoutes } from './routes/clientes.routes';
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://172.20.1.70:5173'
}));

app.use('/', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

