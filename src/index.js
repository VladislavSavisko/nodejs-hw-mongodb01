import express from 'express';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getAllContacts } from './controllers/contactsController.js'; // додано

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Маршрут для головної сторінки — віддає всі контакти
app.get('/', getAllContacts);

app.use('/contacts', contactRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const MONGO_URI = process.env.MONGODB_URL;

const startServer = async () => {
  await initMongoConnection(MONGO_URI);
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
};

startServer();
