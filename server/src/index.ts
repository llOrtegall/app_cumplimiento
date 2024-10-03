import { clientRoutes } from './routes/clientes.routes';
import { PORT } from './config';
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

