import { clientRoutes } from './routes/clientes.routes';
import { infoRouter } from './routes/info.routes';
import { PORT } from './config';
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: process.env.CLIENT_URL || '',
    credentials: true
  }
));

app.use('/', clientRoutes);
app.use('/', infoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

