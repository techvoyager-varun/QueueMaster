import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

app.get('/', (req, res) => {
  res.send('QueueMaster API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
