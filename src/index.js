import express from 'express';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import { initMongoConnection } from './db/initMongoConnection.js';

// Завантажуємо змінні середовища (для локальної розробки)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Маршрут з контактами
app.use('/contacts', contactRoutes);

// Обробка неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const startServer = async () => {
  try {
    await initMongoConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
