import express from "express";
import cors from "cors";
import connectDB from './db.js'; // .js uzantısını ekleyin
import booksRoute from './routes/booksRoute.js'; // .js uzantısını ekleyin
import userRoute from './routes/userRoute.js';
import authorRoutes from './routes/authorRoutes.js';

const app = express();

// Veritabanına Bağlan
connectDB();

// Middleware'ler
app.use(express.json()); // JSON verisi için
app.use(cors()); // CORS Politikası için

// CORS Politikası (Eğer belirli bir URL'den erişimi kısıtlamak isterseniz)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend'in çalıştığı URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // İzin verilen HTTP metotları
  allowedHeaders: ['Content-Type'], // İzin verilen header türleri
}));

// Route'lar
app.use('/books', booksRoute);
app.use('/auth', userRoute);
app.use('/authors', authorRoutes);

// Sunucu Dinleme
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
