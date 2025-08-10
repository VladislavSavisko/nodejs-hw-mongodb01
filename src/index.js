import express from 'express';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Формуємо повний URI для MongoDB Atlas
const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

app.use(express.json());

// Маршрут з контактами
app.use('/contacts', contactRoutes);

// Якщо не знайдено маршрут
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const startServer = async () => {
  await initMongoConnection(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
