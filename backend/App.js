import express from "express";
import cors from "cors";
import connectDB from './db.js'; 
import booksRoute from './routes/booksRoute.js';
import userRoute from './routes/userRoute.js';
import publisherRoutes from './routes/publisherRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import book_authorRoutes from './routes/book_authorRoute.js';
import commentRoute from './routes/commentRoute.js';

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
app.use('/api/users', userRoute);
app.use('/authors', authorRoutes);
app.use('/publishers', publisherRoutes);
app.use('/relations', book_authorRoutes);
//app.use('/comment', commentRoute);


// Sunucu Dinleme
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
